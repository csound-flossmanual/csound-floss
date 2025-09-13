const path = require("path");

// Get language from environment variable, default to 'en'
const LANG = process.env.LANG || "en";
const IS_FRENCH = LANG === "fr";

// Language-aware paths
const LANG_SUFFIX = IS_FRENCH ? "_fr" : "";
const LANG_DIR_SUFFIX = IS_FRENCH ? "-fr" : "";
const FRAGMENTS_DIR_SUFFIX = IS_FRENCH ? "_fr" : "";

const PDF_OUTPUT = path.resolve(
  __dirname,
  `../csound_flossmanual${LANG_SUFFIX}.pdf`
);
const EPUB_OUTPUT = path.resolve(
  __dirname,
  `../csound_flossmanual${LANG_SUFFIX}.epub`
);
const ODT_OUTPUT = path.resolve(
  __dirname,
  `../csound_flossmanual${LANG_SUFFIX}.odt`
);
const JSX_OUTPUT = path.resolve(
  __dirname,
  `../src/book_fragments${FRAGMENTS_DIR_SUFFIX}`
);
const BOOK_DIRECTORY = path.resolve(__dirname, `../book${LANG_DIR_SUFFIX}`);
const BOOK_DIRECTORY_FR = path.resolve(__dirname, `../book_fr`);

const OTHER_DIRECTORY = path.resolve(__dirname, "../other");
const RESOURCES_DIRECTORY = path.resolve(__dirname, "../resources");

// TOC file path
const TOC_FILE = IS_FRENCH ? "../toc-fr.json" : "../toc.json";
const MARKDOWN_EXTENSIONS = [
  "markdown",
  "line_blocks",
  "escaped_line_breaks",
  "smart",
  "fenced_code_blocks",
  "backtick_code_blocks",
  "fenced_code_attributes",
  "backtick_code_blocks",
  "yaml_metadata_block",
  "implicit_figures",
  "tex_math_dollars",
  "link_attributes",
  "inline_notes",
  "citations",
  "footnotes",
  "definition_lists",
  "raw_tex",
  "raw_attribute",
];

module.exports = {
  EPUB_OUTPUT,
  JSX_OUTPUT,
  PDF_OUTPUT,
  ODT_OUTPUT,
  BOOK_DIRECTORY,
  BOOK_DIRECTORY_FR,
  OTHER_DIRECTORY,
  RESOURCES_DIRECTORY,
  MARKDOWN_EXTENSIONS,
  TOC_FILE,
  LANG,
  IS_FRENCH,
};
