const { buildDocument } = require("./document");
const { PDF_OUTPUT } = require("./constants");

buildDocument("pdf", PDF_OUTPUT, [
  "-N",
  "--template=pandoc/latex/template.tex",
  "--syntax-definition=pandoc/csound-theme.xml",
  "--highlight-style=tango",
  "--top-level-division=chapter",
  "--include-in-header=pandoc/latex/codesize.tex",
  "--include-in-header=pandoc/latex/disable_float.tex",
  "--pdf-engine=xelatex",
  "--filter=pandoc/filters/pdf_codeblocks.js",
]);
