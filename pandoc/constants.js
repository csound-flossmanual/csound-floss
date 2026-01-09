const path = require("path");

// Get language from environment variable, default to 'en'
const LANG = process.env.LANG || "en";
const IS_FRENCH = LANG === "fr";
const IS_FARSI = LANG === "fa";

// Language-aware paths
const LANG_SUFFIX = LANG === "en" ? "" : `_${LANG}`;
const LANG_DIR_SUFFIX = LANG === "en" ? "" : `-${LANG}`;
const FRAGMENTS_DIR_SUFFIX = LANG === "en" ? "" : `_${LANG}`;

const PDF_OUTPUT = path.resolve(__dirname, `../csound-flossmanual-${LANG}.pdf`);
const EPUB_OUTPUT = path.resolve(
  __dirname,
  `../csound-flossmanual-${LANG}.epub`
);
const ODT_OUTPUT = path.resolve(__dirname, `../csound-flossmanual-${LANG}.odt`);
const JSX_OUTPUT = path.resolve(
  __dirname,
  `../src/book_fragments${FRAGMENTS_DIR_SUFFIX}`
);
const BOOK_DIRECTORY = path.resolve(__dirname, `../book${LANG_DIR_SUFFIX}`);
const BOOK_DIRECTORY_EN = path.resolve(__dirname, `../book`);
const BOOK_DIRECTORY_FR = path.resolve(__dirname, `../book-fr`);
const BOOK_DIRECTORY_FA = path.resolve(__dirname, `../book_fa`);

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
  BOOK_DIRECTORY_EN,
  BOOK_DIRECTORY_FA,
  BOOK_DIRECTORY_FR,
  OTHER_DIRECTORY,
  RESOURCES_DIRECTORY,
  MARKDOWN_EXTENSIONS,
  TOC_FILE,
  LANG,
  IS_FRENCH,
  IS_FARSI,
};
