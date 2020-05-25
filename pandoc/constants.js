const path = require("path");

const PDF_OUTPUT = path.resolve(__dirname, "../csound_flossmanual.pdf");
const EPUB_OUTPUT = path.resolve(__dirname, "../csound_flossmanual.epub");
const ODT_OUTPUT = path.resolve(__dirname, "../csound_flossmanual.odt");
const JSX_OUTPUT = path.resolve(__dirname, "../src/book_fragments");
const BOOK_DIRECTORY = path.resolve(__dirname, "../book");
const RESOURCES_DIRECTORY = path.resolve(__dirname, "../resources");
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
  "implicit_figures",
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
  RESOURCES_DIRECTORY,
  MARKDOWN_EXTENSIONS,
};
