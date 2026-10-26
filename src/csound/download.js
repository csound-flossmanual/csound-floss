import { zip, strToU8 } from "fflate";
import names from "../assets/source_materials.json";
import { exampleFiles } from "./example-files.mjs";

export const archiveReadme = `Csound FLOSS Manual examples

Extract the whole ZIP before opening a .csd file in examples/.
Keep the folders together so relative sample and include paths still work.
Individual downloads contain your current editor text and the bundled files it references.
Files made by other examples, your own files, and paths built at runtime may need to be supplied separately.
Some examples require native plugins, hardware, or other software.

https://flossmanual.csound.com
`;

export async function downloadExample(source, filename) {
  const files = await exampleFiles(source, filename, names, async (file) => {
    const response = await fetch(
      `/resources/SourceMaterials/${encodeURIComponent(file)}`,
    );
    if (!response.ok)
      throw new Error(`Could not download ${file}. Please try again.`);
    return new Uint8Array(await response.arrayBuffer());
  });
  files["README.txt"] = strToU8(archiveReadme);
  const bytes = await new Promise((resolve, reject) =>
    zip(files, { level: 6 }, (error, data) =>
      error ? reject(error) : resolve(data),
    ),
  );
  const url = URL.createObjectURL(
    new Blob([bytes], { type: "application/zip" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.replace(/\.csd$/i, "") + ".zip";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
