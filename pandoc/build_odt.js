const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const { execSync } = require("child_process");
const { tmpdir } = require("os");
const R = require("ramda");
const {
  ODT_OUTPUT,
  BOOK_DIRECTORY,
  MARKDOWN_EXTENSIONS,
  RESOURCES_DIRECTORY,
  IS_FRENCH,
} = require("./constants");

execSync(
  `pandoc ${BOOK_DIRECTORY}/*.md \
      --filter=pandoc/filters/epub_images.js \
      --metadata title="${IS_FRENCH ? "Le Manuel FLOSS Csound" : "The Csound FLOSS Manual"}" \
      -o ${ODT_OUTPUT} \
      --mathjax`,
  { encoding: "utf-8" }
);

console.log(null);
