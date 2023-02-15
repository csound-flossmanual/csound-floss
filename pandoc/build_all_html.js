const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const { execMarkdownToHtml } = require("./build_html");
const { ensureEmptyDir } = require("./utils");
const { BOOK_DIRECTORY, JSX_OUTPUT } = require("./constants");

const allChapters = fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false });

const buildAllHtml = () => {
  ensureEmptyDir(JSX_OUTPUT);
  R.pipe(
    R.map((chapter) => execMarkdownToHtml(chapter)),
    JSON.stringify,
    (json) => fs.writeFileSync(path.join(JSX_OUTPUT, `routes.json`), json)
  )(allChapters);

  const otherDir = path.resolve(__dirname, "../other");
  const interactiveDemo = path.join(otherDir, "interactive-demo.md");
  R.pipe(execMarkdownToHtml)(interactiveDemo);
};

module.exports = { buildAllHtml };

if (require.main === module) {
  buildAllHtml();
}
