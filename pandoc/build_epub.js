const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const { execSync } = require("child_process");
const { tmpdir } = require("os");
const R = require("ramda");
const {
  EPUB_OUTPUT,
  BOOK_DIRECTORY,
  MARKDOWN_EXTENSIONS,
  RESOURCES_DIRECTORY,
  IS_FRENCH,
} = require("./constants");

execSync(
  `pandoc ${BOOK_DIRECTORY}/*.md -f ${MARKDOWN_EXTENSIONS.join("+")} \
      --filter=pandoc/filters/epub_math.js \
      --filter=pandoc/filters/epub_images.js \
      --epub-metadata=resources/epub-metadata.yml \
      --metadata title="${IS_FRENCH ? "Le Manuel FLOSS Csound" : "The Csound FLOSS Manual"}" \
      -o ${EPUB_OUTPUT} \
      --mathml`,
  { encoding: "utf-8" }
);

console.log(null);
