import { parseDocument } from "htmlparser2";
import { strFromU8, unzipSync, zipSync } from "fflate";
import { nameExamples } from "../pandoc/examples";
import postProcessHtml from "../pandoc/filters/html_post_process";
import {
  exampleFiles,
  materialReferences,
} from "../src/csound/example-files.mjs";

const csd =
  '<CsoundSynthesizer>\n<CsInstruments>\na1 diskin2 "fox.wav"\n</CsInstruments>\n</CsoundSynthesizer>';
const html = (source) =>
  `<pre><code class="sourceCode csound">${source.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code></pre>`;

it("uses printed example names in both editors and ZIPs, and names unlabelled examples", () => {
  const input = `<h4>EXAMPLE 05B01_routing.csd</h4>${html(csd)}${html(csd)}`;
  const examples = nameExamples(
    parseDocument(input).children,
    "05-b-routing.md",
  );
  expect(examples.map((e) => e.filename)).toEqual([
    "05B01_routing.csd",
    "05-b-routing-1.csd",
  ]);
  expect(examples[0].source).toBe(csd);
  const processed = postProcessHtml(input, "05-b-routing.md");
  for (const { filename } of examples)
    expect(processed).toContain(`filename="${filename}"`);
});

it("includes edited code and only needed samples, resolving nested includes without duplicates", async () => {
  const source = `${csd}\n#include "../SourceMaterials/voice.inc"\n; "unused.wav"\n// fox.wav.backup\n/* "unused.wav" */`;
  const read = vi.fn(async (name) =>
    new TextEncoder().encode(
      name === "voice.inc" ? '#include "voice.inc"\nSfile = "fox.wav"' : name,
    ),
  );
  const files = await exampleFiles(
    source,
    "edited.csd",
    ["voice.inc", "fox.wav", "unused.wav"],
    read,
  );
  const archive = unzipSync(zipSync(files));
  expect(Object.keys(archive).sort()).toEqual([
    "SourceMaterials/fox.wav",
    "SourceMaterials/voice.inc",
    "examples/edited.csd",
    "examples/fox.wav",
  ]);
  expect(strFromU8(archive["examples/edited.csd"])).toBe(source);
  expect(strFromU8(archive["examples/fox.wav"])).toBe("fox.wav");
  expect(read).toHaveBeenCalledTimes(3);
});

it("does not include filenames mentioned only in comments or as part of another name", () => {
  expect(
    materialReferences(
      '; fox.wav\n// fox.wav\nS = "fox.wav.bak"\nS = "myfox.wav"',
      ["fox.wav"],
    ),
  ).toEqual([]);
  expect(materialReferences('S = "fox.wav" ; comment', ["fox.wav"])).toEqual([
    { reference: "fox.wav", file: "fox.wav" },
  ]);
});

it("keeps sample aliases and rejects paths outside the ZIP", async () => {
  const read = vi.fn(async () => new Uint8Array([1, 2]));
  const files = await exampleFiles(
    'S = "circularstring"',
    "wave.csd",
    ["circularstring"],
    read,
  );
  expect(read).toHaveBeenCalledWith("circularstring-128");
  expect(files["examples/circularstring"]).toEqual(new Uint8Array([1, 2]));
  await expect(
    exampleFiles('S = "../../fox.wav"', "bad.csd", ["fox.wav"], read),
  ).rejects.toThrow("leaves the archive");
});

it("fails the download when a required sample cannot be fetched", async () => {
  await expect(
    exampleFiles(csd, "example.csd", ["fox.wav"], async () => {
      throw new Error("Network error");
    }),
  ).rejects.toThrow("Network error");
});
