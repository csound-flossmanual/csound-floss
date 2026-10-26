const path = require("node:path");
const { execFileSync } = require("node:child_process");
const fg = require("fast-glob");
const { BOOK_DIRECTORY, MARKDOWN_EXTENSIONS, LANG } = require("./constants");

function buildDocument(format, output, extraArgs = []) {
  const chapters = fg
    .sync(`${BOOK_DIRECTORY}/*.md`)
    .sort()
    .filter((file) => !file.endsWith("00--aa-toc.md"))
    .map((file) => path.relative(process.cwd(), file));
  const title =
    LANG === "fr"
      ? "Le Manuel FLOSS Csound"
      : LANG === "fa"
        ? "راهنمای FLOSS Csound"
        : "The Csound FLOSS Manual";
  execFileSync(
    "pandoc",
    [
      ...chapters,
      "-f",
      MARKDOWN_EXTENSIONS.join("+"),
      "--file-scope",
      "--fail-if-warnings",
      "--filter=pandoc/filters/document-links.js",
      "--filter=pandoc/filters/epub_math.js",
      "--filter=pandoc/filters/epub_images.js",
      "--metadata",
      `title=${title}`,
      ...extraArgs,
      ...(format === "pdf" ? [] : ["--to", format]),
      "-o",
      output,
    ],
    { stdio: "inherit" },
  );
}
module.exports = { buildDocument };
