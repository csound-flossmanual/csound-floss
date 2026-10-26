import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { plugins } from "@csound/plugins";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const examples = [];
for (const directory of ["book", "book-fr", "book-fa"]) {
  for (const name of readdirSync(new URL(directory, root)).sort()) {
    if (!name.endsWith(".md")) continue;
    const file = `${directory}/${name}`;
    const text = read(file);
    const fences = /^([ \t]*)(`{3,}|~{3,})[^\n]*\n([\s\S]*?)^\1\2[ \t]*$/gm;
    for (const fence of text.matchAll(fences)) {
      for (const match of fence[3].matchAll(
        /<CsoundSynthesizer>[\s\S]*?<\/CsoundSynthesizer>/g,
      )) {
        // The getting-started chapters also show an empty document template.
        if (!match[0].includes("<CsInstruments>")) continue;
        const offset = fence.index + fence[0].indexOf("\n") + 1 + match.index;
        examples.push({
          file,
          line: text.slice(0, offset).split("\n").length,
          code: match[0],
        });
      }
    }
  }
}
assert.ok(
  examples.length > 450,
  "find complete CSD examples in all three books",
);

// Run the site's exact WASM binary without an audio device or browser worker.
globalThis.self = globalThis;
globalThis.window = globalThis;
const { libcsound } = await import("@csound/browser/dist/csound.js");
const withPlugins = Object.values(plugins).map(
  (url) => new Uint8Array(readFileSync(new URL(url))),
);
const logs = [];
const savedConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
};
for (const method of Object.keys(savedConsole))
  console[method] = (...args) => logs.push(args.join(" "));
const diagnostics = () => logs.join("\n");
const hasWarning = () =>
  /\bwarning:|\bdeprecated\b|\bsread:|\bswrite:/i.test(diagnostics());
const failures = [];
let passed = 0;
const unsupported = [];
const externalScores = [];

try {
  const api = await libcsound({ withPlugins });
  assert.deepEqual(logs, [], "plugins must load without errors");
  // Match the browser loader's root and SourceMaterials include paths.
  api.mkdir(0, "/SourceMaterials");
  for (const name of readdirSync(new URL("resources/SourceMaterials", root))) {
    if (!name.endsWith(".txt")) continue;
    const bytes = new Uint8Array(
      readFileSync(new URL(`resources/SourceMaterials/${name}`, root)),
    );
    api.writeFile(0, name, bytes);
    api.writeFile(0, `/SourceMaterials/${name}`, bytes);
  }
  for (const example of examples) {
    const label = `${example.file}:${example.line}`;
    // These examples run Perl or Python to create a score outside Csound.
    if (/<CsScore\b[^>]*\bbin\s*=/.test(example.code)) {
      externalScores.push(label);
      continue;
    }
    logs.length = 0;
    const cs = api.csoundCreate();
    try {
      for (const flag of ["--syntax-check-only", "-n", "-d", "-m4"])
        api.csoundSetOption(cs, flag);
      const source = example.code.replace(
        /<CsOptions>[\s\S]*?<\/CsOptions>/,
        "<CsOptions>\n</CsOptions>",
      );
      const status = api.csoundCompileCSD(cs, source, 1);
      // Accept only a known missing native plugin, not arbitrary compiler failures.
      const missing = diagnostics().match(
        /unable to find opcode with name: (FLpanel|oscinit|serialbegin|pyinit|newopc),/,
      );
      if (status !== 0 && missing && !hasWarning()) {
        unsupported.push(`${label} (${missing[1]})`);
      } else if (status !== 0 || hasWarning()) {
        failures.push(`${label}\n${diagnostics()}`);
      } else {
        passed++;
      }
    } finally {
      api.csoundDestroy(cs);
    }
  }

  function render(source, check, limit) {
    logs.length = 0;
    const cs = api.csoundCreate();
    try {
      source = source.replace(
        /<CsOptions>[\s\S]*?<\/CsOptions>/,
        "<CsOptions>\n-n -d -m4\n</CsOptions>",
      );
      assert.equal(api.csoundCompileCSD(cs, source, 1), 0, diagnostics());
      assert.equal(api.csoundStart(cs), 0, diagnostics());
      const channels = api.csoundGetNchnls(cs);
      const blockSize = api.csoundGetKsmps(cs);
      let frame = 0;
      let status = 0;
      for (let block = 0; block < limit && status === 0; block++) {
        status = api.csoundPerformKsmps(cs);
        const samples = new Float64Array(
          api.getMemory().buffer,
          api.csoundGetSpout(cs),
          blockSize * channels,
        );
        assert.ok(samples.every(Number.isFinite), "audio must stay finite");
        check(samples, frame, cs);
        frame += blockSize;
      }
      assert.ok(frame > 0);
      assert.ok(
        status >= 0 && !/\b(?:INIT|PERF) ERROR/i.test(diagnostics()),
        diagnostics(),
      );
      assert.ok(!hasWarning(), diagnostics());
      return status;
    } finally {
      api.csoundDestroy(cs);
    }
  }

  // Check the book's actual delay output, including silence before the buffer fills.
  const delay = examples.find(
    ({ file, code }) =>
      file === "book/05-d-delay-and-feedback.md" &&
      code.includes("instr CustomDelayLine"),
  );
  assert.ok(delay);
  let dryPeak = 0;
  let delayedPeak = 0;
  render(
    delay.code,
    (samples, frame) => {
      for (let i = 0; i < samples.length; i += 2) {
        dryPeak = Math.max(dryPeak, Math.abs(samples[i]));
        if (frame + i / 2 < 11024)
          assert.equal(samples[i + 1], 0, "delay starts with an empty buffer");
        else delayedPeak = Math.max(delayedPeak, Math.abs(samples[i + 1]));
      }
    },
    700,
  );
  assert.ok(
    dryPeak > 0 && delayedPeak > 0,
    "both delay channels must produce audio",
  );

  // Exercise every bundled plugin; STK must also find its embedded raw-wave files.
  const pluginSource = `<CsoundSynthesizer>
<CsOptions></CsOptions>
<CsInstruments>
sr = 48000
ksmps = 32
nchnls = 2
0dbfs = 1
instr 1
a1, a2, a3 chuap 0.018, 0, 1e-7, 1/1500, -0.0008, -0.0005, 1, 1e-8, 0, 0, 0.1, 1e-5
aStk STKMandolin 220, 0.5
iv la_i_vr_create 2
iv la_i_vr_set 0, 3
iv la_i_vr_set 1, 4
inorm la_i_norm_euclid_vr iv
chnset inorm, "norm"
ih imagecreate 2, 3
imagesave ih, "plugin-test.png"
iload imageload "plugin-test.png"
iw, ihgt imagesize iload
chnset iw, "width"
chnset ihgt, "height"
out a3 * 0.1, aStk
endin
</CsInstruments>
<CsScore>
i 1 0 0.02
</CsScore>
</CsoundSynthesizer>`;
  const peaks = [0, 0];
  const status = render(
    pluginSource,
    (samples, frame, cs) => {
      assert.equal(api.csoundGetControlChannel(cs, "norm"), 5);
      assert.equal(api.csoundGetControlChannel(cs, "width"), 2);
      assert.equal(api.csoundGetControlChannel(cs, "height"), 3);
      for (let i = 0; i < samples.length; i++)
        peaks[i % 2] = Math.max(peaks[i % 2], Math.abs(samples[i]));
    },
    100,
  );
  assert.notEqual(status, 0, "plugin score must finish");
  assert.ok(
    peaks.every((peak) => peak > 0),
    "Chua and STK must produce audio",
  );
} finally {
  Object.assign(console, savedConsole);
}

for (const failure of failures) console.error(failure);
console.log(
  `${passed} CSD examples compile without warnings; ${unsupported.length} need native plugins; ${externalScores.length} need external score generators.`,
);
console.log("Delay output and all four WASM plugins passed runtime checks.");
if (failures.length) process.exitCode = 1;
