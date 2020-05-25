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
} = require("./constants");

execSync(
  `pandoc book/*.md \
      --filter=pandoc/filters/epub_images.js \
      -o ${ODT_OUTPUT} \
      --mathjax`,
  { encoding: "utf-8" }
);

console.log(null);
