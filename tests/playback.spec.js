import { vi } from "vitest";
/** @vitest-environment jsdom */
import {
  createPlaybackController,
  collectOutputFiles,
  loadSourceMaterials,
} from "../src/csound/playback";
import SourceMaterials from "../src/assets/source_materials.json";

function setup(overrides = {}) {
  const events = {};
  const engine = {
    on: vi.fn((event, fn) => {
      events[event] = fn;
    }),
    removeAllListeners: vi.fn(),
    setOption: vi.fn().mockResolvedValue(0),
    compileCSD: vi.fn().mockResolvedValue(0),
    getOutputName: vi.fn().mockResolvedValue("dac"),
    getInputName: vi.fn().mockResolvedValue(""),
    start: vi.fn().mockResolvedValue(0),
    stop: vi
      .fn()
      .mockImplementation(async () => events.realtimePerformanceEnded()),
    pause: vi
      .fn()
      .mockImplementation(async () => events.realtimePerformancePaused()),
    resume: vi
      .fn()
      .mockImplementation(async () => events.realtimePerformanceResumed()),
    reset: vi.fn().mockResolvedValue(0),
    terminateInstance: vi.fn().mockResolvedValue(),
    fs: { readdir: vi.fn().mockResolvedValue([]) },
    ...overrides,
  };
  const context = {
    state: "running",
    resume: vi.fn().mockResolvedValue(),
    close: vi.fn().mockResolvedValue(),
  };
  const session = { release: vi.fn(), enableInput: vi.fn() };
  const dispatch = vi.fn();
  const factory = vi.fn().mockResolvedValue(engine);
  const audioContext = vi.fn(() => context);
  const audioSession = vi.fn(() => session);
  const loadSamples = vi.fn().mockResolvedValue();
  const controller = createPlaybackController(dispatch, {
    factory,
    audioContext,
    audioSession,
    loadSamples,
  });
  return {
    controller,
    engine,
    events,
    context,
    session,
    dispatch,
    factory,
    audioContext,
    audioSession,
    loadSamples,
  };
}
const deferred = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
};
const tick = () => new Promise((r) => setTimeout(r, 0));

it("unlocks audio in the Play gesture and prevents overlapping starts", async () => {
  const s = setup();
  const pending = deferred();
  s.factory.mockReturnValueOnce(pending.promise);
  const playing = s.controller.play("first");
  expect(s.context.resume).toHaveBeenCalled();
  expect(s.audioSession.mock.invocationCallOrder[0]).toBeLessThan(
    s.audioContext.mock.invocationCallOrder[0],
  );
  await s.controller.play("second");
  expect(s.factory).toHaveBeenCalledTimes(1);
  pending.resolve(s.engine);
  await playing;
  expect(s.engine.compileCSD).toHaveBeenCalledWith("first", 1);
  await s.controller.stop();
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
  expect(s.context.close).toHaveBeenCalledTimes(1);
  expect(s.session.release).toHaveBeenCalledTimes(1);
  await s.controller.play("second");
  expect(s.factory).toHaveBeenCalledTimes(2);
  await s.controller.stop();
});
it.each(["factory", "compile", "start", "samples"])(
  "recovers from %s failure and allows retry",
  async (phase) => {
    const s = setup();
    if (phase === "factory")
      s.factory.mockRejectedValueOnce(new Error("factory failed"));
    if (phase === "compile") s.engine.compileCSD.mockResolvedValueOnce(-1);
    if (phase === "start") s.engine.start.mockResolvedValueOnce(-1);
    if (phase === "samples")
      s.loadSamples.mockRejectedValueOnce(new Error("sample missing"));
    await s.controller.play("example");
    if (phase !== "start") expect(s.engine.start).not.toHaveBeenCalled();
    expect(s.context.close).toHaveBeenCalledTimes(1);
    expect(s.session.release).toHaveBeenCalledTimes(1);
    expect(s.dispatch).toHaveBeenCalledWith({ type: "OPEN_LOG_DIALOG" });
    expect(s.dispatch).toHaveBeenCalledWith({
      type: "HANDLE_PLAY_STATE_CHANGE",
      change: "stop",
    });
    await s.controller.play("retry");
    expect(s.factory).toHaveBeenCalledTimes(2);
    await s.controller.stop();
  },
);
it("keeps pause/resume listeners and the same engine", async () => {
  const s = setup();
  await s.controller.pause();
  expect(s.engine.pause).not.toHaveBeenCalled();
  await s.controller.play("example");
  await s.controller.pause();
  await s.controller.resume();
  expect(s.dispatch).toHaveBeenCalledWith({
    type: "HANDLE_PLAY_STATE_CHANGE",
    change: "pause",
  });
  expect(s.dispatch).toHaveBeenLastCalledWith({
    type: "HANDLE_PLAY_STATE_CHANGE",
    change: "play",
  });
  expect(s.factory).toHaveBeenCalledTimes(1);
  await s.controller.stop();
});
it("switches the audio session before microphone startup", async () => {
  const s = setup({ getInputName: vi.fn().mockResolvedValue("adc") });
  await s.controller.play("input");
  expect(s.session.enableInput.mock.invocationCallOrder[0]).toBeLessThan(
    s.engine.start.mock.invocationCallOrder[0],
  );
  await s.controller.stop();
});
it("handles a render ending before start resolves and duplicate end events", async () => {
  const s = setup({ getOutputName: vi.fn().mockResolvedValue("output.wav") });
  s.engine.start.mockImplementation(async () => {
    s.events.renderEnded();
    s.events.renderEnded();
    return 0;
  });
  await s.controller.play("render");
  expect(s.engine.reset).toHaveBeenCalledTimes(1);
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
  expect(s.dispatch).toHaveBeenLastCalledWith({
    type: "HANDLE_PLAY_STATE_CHANGE",
    change: "stop",
  });
});
it("disposes a factory result that arrives after cancellation", async () => {
  const s = setup();
  const pending = deferred();
  s.factory.mockReturnValueOnce(pending.promise);
  const playing = s.controller.play("example");
  await s.controller.stop();
  pending.resolve(s.engine);
  await playing;
  expect(s.engine.compileCSD).not.toHaveBeenCalled();
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
  expect(s.context.close).toHaveBeenCalledTimes(1);
});
it("cleans up once on natural completion", async () => {
  const s = setup();
  await s.controller.play("example");
  s.events.realtimePerformanceEnded();
  s.events.realtimePerformanceEnded();
  await tick();
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
  expect(s.context.close).toHaveBeenCalledTimes(1);
});
it("closes audio and clears loading even when output collection fails", async () => {
  const s = setup();
  await s.controller.play("example");
  s.engine.reset.mockRejectedValueOnce(new Error("reset failed"));
  await s.controller.stop();
  expect(s.context.close).toHaveBeenCalledTimes(1);
  expect(s.session.release).toHaveBeenCalledTimes(1);
  expect(s.dispatch).toHaveBeenLastCalledWith({
    type: "HANDLE_PLAY_STATE_CHANGE",
    change: "stop",
  });
});
it("collects nested files, skips directories and source samples, and supplies unknown MIME types", async () => {
  URL.createObjectURL = vi.fn(() => "blob:output");
  const engine = {
    fs: {
      readdir: vi.fn(async (path) =>
        path === "/" ? [".", "..", "samples.wav", "out"] : ["data.unknown"],
      ),
      stat: vi.fn(async (path) => ({
        isDirectory: path === "/out",
        isFile: path !== "/out",
      })),
      readFile: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
    },
  };
  const files = await collectOutputFiles(engine, new Set(["/samples.wav"]));
  expect(engine.fs.readFile).toHaveBeenCalledTimes(1);
  expect(files).toEqual([
    {
      name: "out/data.unknown",
      type: "application/octet-stream",
      url: "blob:output",
      size: 3,
    },
  ]);
});
it("reports missing samples instead of compiling with missing input", async () => {
  const sample = SourceMaterials[0];
  global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
  const engine = { fs: { writeFile: vi.fn() } };
  await expect(loadSourceMaterials(engine, sample)).rejects.toThrow("404");
  expect(engine.fs.writeFile).not.toHaveBeenCalled();
});
it("handles repeated Stop clicks without racing engine disposal", async () => {
  const s = setup();
  await s.controller.play("example");
  const pending = deferred();
  s.engine.stop.mockReturnValue(pending.promise);
  const first = s.controller.stop();
  const second = s.controller.stop();
  expect(s.engine.stop).toHaveBeenCalledTimes(1);
  expect(s.engine.terminateInstance).not.toHaveBeenCalled();
  pending.resolve(0);
  await Promise.all([first, second]);
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
});
it("disposes without creating download URLs after the provider unmounts", async () => {
  const s = setup();
  await s.controller.play("example");
  await s.controller.dispose();
  expect(s.engine.reset).not.toHaveBeenCalled();
  expect(s.engine.terminateInstance).toHaveBeenCalledTimes(1);
  expect(s.context.close).toHaveBeenCalledTimes(1);
});
it("revokes files if the provider unmounts during output collection", async () => {
  URL.createObjectURL = vi.fn(() => "blob:late-output");
  URL.revokeObjectURL = vi.fn();
  const s = setup();
  await s.controller.play("example");
  const pending = deferred();
  s.engine.fs.readdir.mockResolvedValue(["output.wav"]);
  s.engine.fs.stat = vi.fn().mockResolvedValue({ isFile: true });
  s.engine.fs.readFile = vi.fn().mockReturnValue(pending.promise);
  s.events.realtimePerformanceEnded();
  await tick();
  const disposed = s.controller.dispose();
  pending.resolve(new Uint8Array([1]));
  await disposed;
  expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:late-output");
  expect(s.dispatch).not.toHaveBeenCalledWith(
    expect.objectContaining({
      type: "NOTIFY_NEW_FILES",
      filesGenerated: expect.arrayContaining([
        expect.objectContaining({ url: "blob:late-output" }),
      ]),
    }),
  );
});
it("preserves the CSD render rate without requesting an iOS playback session", async () => {
  const s = setup({ getOutputName: vi.fn().mockResolvedValue("render.wav") });
  await s.controller.play('<CsOptions>-o "render.wav"</CsOptions>');
  expect(s.audioSession).not.toHaveBeenCalled();
  expect(s.context.resume).not.toHaveBeenCalled();
  expect(s.engine.setOption).toHaveBeenCalledWith("--sample-rate=0");
  expect(s.engine.setOption.mock.invocationCallOrder[1]).toBeLessThan(
    s.engine.compileCSD.mock.invocationCallOrder[0],
  );
  await s.controller.stop();
});
it("keeps the device sample rate for live playback", async () => {
  const s = setup();
  await s.controller.play("<CsOptions>-odac</CsOptions>");
  expect(s.engine.setOption).not.toHaveBeenCalledWith("--sample-rate=0");
  await s.controller.stop();
});
