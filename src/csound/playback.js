import mime from "mime/lite";
import SourceMaterials from "../assets/source_materials.json";
import { requestsFileOutput } from "./options";
import { beginPlaybackAudioSession } from "./audio-session";

export async function loadSourceMaterials(engine, source) {
  let includesDirectory = false;
  for (const name of SourceMaterials) {
    if (!source.includes(name)) continue;
    const fileName = name === "circularstring" ? "circularstring-128" : name;
    const response = await fetch(`/resources/SourceMaterials/${fileName}`);
    if (!response.ok)
      throw new Error(`Could not load ${fileName} (${response.status}).`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    await engine.fs.writeFile(fileName, bytes);
    // The downloaded examples also refer to ../SourceMaterials for UDO includes.
    if (source.includes(`SourceMaterials/${fileName}`)) {
      if (!includesDirectory) {
        await engine.fs.mkdir("/SourceMaterials");
        includesDirectory = true;
      }
      await engine.fs.writeFile(`/SourceMaterials/${fileName}`, bytes);
    }
  }
}

async function listFiles(fs, directory = "/") {
  const files = [];
  for (const name of await fs.readdir(directory)) {
    if (name === "." || name === "..") continue;
    const path = `${directory}${name}`;
    // STK unpacks these bundled inputs during compilation, after our snapshot.
    if (path === "/.csound-stk-rawwaves") continue;
    const stat = await fs.stat(path);
    if (stat?.isDirectory) files.push(...(await listFiles(fs, `${path}/`)));
    else if (stat?.isFile) files.push(path);
  }
  return files;
}

export async function collectOutputFiles(engine, originalFiles) {
  const files = [];
  try {
    for (const path of await listFiles(engine.fs)) {
      if (originalFiles.has(path)) continue;
      const bytes = await engine.fs.readFile(path);
      const type = mime.getType(path) || "application/octet-stream";
      const url = URL.createObjectURL(new Blob([bytes], { type }));
      files.push({ name: path.slice(1), type, url, size: bytes.byteLength });
    }
    return files;
  } catch (error) {
    files.forEach(({ url }) => URL.revokeObjectURL(url));
    throw error;
  }
}

const createEngine = async (options) => {
  const { Csound } = await import("./engine");
  return Csound(options);
};
const createContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext({ latencyHint: "interactive" });
};

// One controller per provider, shared by every example on the page.
export function createPlaybackController(
  dispatch,
  {
    factory = createEngine,
    audioContext = createContext,
    audioSession = beginPlaybackAudioSession,
    loadSamples = loadSourceMaterials,
  } = {},
) {
  let active;
  const reportError = (error) => {
    dispatch({ type: "STORE_LOG", log: `${error.message || error}\n` });
    dispatch({ type: "OPEN_LOG_DIALOG" });
  };
  const playState = (change) =>
    dispatch({ type: "HANDLE_PLAY_STATE_CHANGE", change });

  const finish = (run, collect = true) => {
    if (run.finished) return run.finished;
    // Defer work so duplicate end events see the same promise.
    run.finished = Promise.resolve().then(async () => {
      dispatch({ type: "SET_IS_LOADING", isLoading: true });
      try {
        if (collect && !run.discardFiles && run.engine) {
          // Reset closes files before we copy them out of the engine's filesystem.
          await run.engine.reset();
          const filesGenerated = await collectOutputFiles(
            run.engine,
            run.originalFiles,
          );
          if (run.discardFiles) {
            filesGenerated.forEach(({ url }) => URL.revokeObjectURL(url));
          } else {
            dispatch({ type: "NOTIFY_NEW_FILES", filesGenerated });
          }
        }
      } catch (error) {
        reportError(error);
      } finally {
        try {
          if (run.engine) {
            run.engine.removeAllListeners();
            await run.engine.terminateInstance();
          }
        } catch (error) {
          reportError(error);
        } finally {
          try {
            if (run.context && run.context.state !== "closed")
              await run.context.close();
          } catch (error) {
            reportError(error);
          }
          run.session?.release();
          if (active === run) {
            active = undefined;
            dispatch({ type: "STORE_LIBCSOUND", libcsound: null });
            dispatch({ type: "CLOSE_GUI_DIALOG" });
            playState("stop");
          }
        }
      }
    });
    return run.finished;
  };

  const play = async (source, filename = "example.csd") => {
    if (active) return;
    const run = { starting: true, originalFiles: new Set() };
    active = run;
    dispatch({ type: "STORE_EXAMPLE", example: { source, filename } });
    dispatch({ type: "CLEAR_LOGS" });
    dispatch({ type: "NOTIFY_NEW_FILES", filesGenerated: [] });
    dispatch({ type: "SET_IS_LOADING", isLoading: true });
    const check = () => {
      if (run.cancelled) throw new Error("Playback cancelled.");
    };
    try {
      // Keep these calls within the Play gesture, before importing WASM or fetching samples.
      const fileOutput = requestsFileOutput(source);
      if (!fileOutput) run.session = audioSession();
      run.context = audioContext();
      const resumed = fileOutput
        ? Promise.resolve()
        : Promise.resolve(run.context.resume());
      // Observe rejection now, even if the factory is still loading.
      resumed.catch(() => {});
      run.engine = await factory({
        audioContext: run.context,
        useWorker: true,
        useSAB: false,
      });
      if (!run.engine) throw new Error("Csound could not create an engine.");
      check();
      await resumed;
      check();
      const engine = run.engine;
      dispatch({ type: "STORE_LIBCSOUND", libcsound: engine });
      engine.on("message", (log) => dispatch({ type: "STORE_LOG", log }));
      const ended = () => {
        run.ended = true;
        if (!run.starting && !run.stopping) void finish(run);
      };
      engine.on("realtimePerformanceEnded", ended);
      engine.on("renderEnded", ended);
      engine.on("realtimePerformancePaused", () => playState("pause"));
      engine.on("realtimePerformanceResumed", () => playState("play"));
      await engine.setOption("-odac");
      // The browser worker sets a device-rate override during creation. Clear it
      // for file output so the CSD's sr and sample-rate options retain their meaning.
      if (fileOutput) await engine.setOption("--sample-rate=0");
      await loadSamples(engine, source);
      check();
      // Snapshot before compile, since i-time opcodes can create output files.
      run.originalFiles = new Set(await listFiles(engine.fs));
      const compiled = await engine.compileCSD(source, 1);
      check();
      if (compiled !== 0)
        throw new Error(
          "Csound could not compile this example. See the console for details.",
        );
      const output = await engine.getOutputName();
      run.rendering = !output?.startsWith("dac");
      if (run.rendering) run.session?.release();
      else if ((await engine.getInputName())?.startsWith("adc"))
        run.session?.enableInput();
      check();
      const guiCode =
        source.match(/<CsoundWebElements>[\s\S]*?<\/CsoundWebElements>/)?.[0] ||
        "";
      dispatch({ type: "STORE_GUI_CODE", guiCode });
      if (guiCode) dispatch({ type: "OPEN_GUI_DIALOG" });
      const started = await engine.start();
      check();
      if (started !== 0)
        throw new Error(
          "Csound could not start this example. See the console for details.",
        );
      run.starting = false;
      dispatch({ type: "SET_IS_RENDERING", isRendering: run.rendering });
      playState("play");
      if (run.ended) await finish(run);
    } catch (error) {
      if (!run.cancelled) reportError(error);
      await finish(run, false);
    } finally {
      run.starting = false;
    }
  };

  const stop = async () => {
    const run = active;
    if (!run || run.finished) return run?.finished;
    run.cancelled = true;
    // Startup checks dispose of the engine once any pending factory/compile resolves.
    if (run.starting) return;
    if (run.stopping) return run.stopped;
    run.stopping = true;
    run.stopped = (async () => {
      try {
        await run.engine.stop();
      } catch (error) {
        reportError(error);
      }
      await finish(run);
    })();
    return run.stopped;
  };
  const transport = async (method) => {
    const run = active;
    if (!run || run.starting || run.finished || run.stopping || run.rendering)
      return;
    try {
      if (method === "resume") await run.context.resume();
      await run.engine[method]();
    } catch (error) {
      reportError(error);
      await stop();
    }
  };
  return {
    play,
    stop,
    dispose: () => {
      if (active) active.discardFiles = true;
      return stop();
    },
    pause: () => transport("pause"),
    resume: () => transport("resume"),
  };
}
