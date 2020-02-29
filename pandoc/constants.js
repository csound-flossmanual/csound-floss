const path = require("path");

const JSX_OUTPUT = path.resolve(__dirname, "../src/book_fragments");
const BOOK_DIRECTORY = path.resolve(__dirname, "../book");
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
  "definition_lists"
];

module.exports = { JSX_OUTPUT, BOOK_DIRECTORY, MARKDOWN_EXTENSIONS };
