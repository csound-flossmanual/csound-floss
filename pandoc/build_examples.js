const fs = require("node:fs");
const path = require("node:path");
const { zipSync, strToU8 } = require("fflate");
const { exampleFiles } = require("../src/csound/example-files.mjs");

async function buildExamples(examples, lang) {
  const materials = path.resolve(__dirname, "../resources/SourceMaterials");
  const names = fs.readdirSync(materials);
  if (names.includes("circularstring-128")) names.push("circularstring");
  const files = {};
  for (const { filename, source } of examples) {
    if (files[`examples/${filename}`])
      throw new Error(`Duplicate example filename: ${filename}`);
    Object.assign(
      files,
      await exampleFiles(
        source,
        filename,
        names,
        async (name) =>
          new Uint8Array(fs.readFileSync(path.join(materials, name))),
      ),
    );
  }
  files["README.txt"] = strToU8(
    "Csound FLOSS Manual\n\nExtract the whole ZIP. Open the .csd files in examples/. Keep the folders together for sample and include paths. Some examples need plugins, hardware, or files created by earlier examples.\n\nhttps://flossmanual.csound.com\n",
  );
  const output = path.resolve(__dirname, "../public/examples");
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(
    path.join(output, `csound-floss-examples-${lang}.zip`),
    zipSync(files),
  );
}

module.exports = { buildExamples };
