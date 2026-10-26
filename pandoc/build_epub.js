const { buildDocument } = require("./document");
const { EPUB_OUTPUT } = require("./constants");

buildDocument("epub", EPUB_OUTPUT, [
  "--epub-metadata=resources/epub-metadata.yml",
  "--mathml",
]);
