const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const { tmpdir } = require("os");
const { execMarkdownToHtml } = require("./build_html");
const { ensureEmptyDir } = require("./utils");
const { BOOK_DIRECTORY, JSX_OUTPUT } = require("./constants");
const { buildOverviewPages } = require("./build_html_overview_pages");
const toc = require("../toc.json");

const allChapters = fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false });

const buildAllHtml = () => {
  ensureEmptyDir(JSX_OUTPUT);
  buildOverviewPages();
  R.pipe(
    R.map((chapter) => execMarkdownToHtml(chapter)),
    (routesOrig) => {
      const routes = [];
      let currentChapterNumber = -1;

      for (const routeData of routesOrig) {
        if (
          routeData.chapter !== currentChapterNumber &&
          routeData.with_overview_page
        ) {
          const thisChapterNum = currentChapterNumber + 1;
          const thisChapterPrefix =
            thisChapterNum < 10 ? `0${thisChapterNum}` : `${thisChapterNum}`;
          const thisToc = toc.find((t) => t.chapter === thisChapterNum);
          if (thisToc) {
            routes.push({
              ...thisToc,
              chapter: thisChapterNum,
              module: `${thisChapterPrefix}-overview`,
              url: `${thisToc.url_prefix}`,
              sectionName: "Overview",
            });
          } else {
            console.error("Didn't find matching chapter defined in TOC!");
          }
        }
        routes.push(routeData);
        currentChapterNumber = routeData.chapter;
      }
      fs.writeFileSync(
        path.join(JSX_OUTPUT, `routes.json`),
        JSON.stringify(routes)
      );
    }
  )(allChapters);

  const otherDir = path.resolve(__dirname, "../other");
  const interactiveDemo = path.join(otherDir, "interactive-demo.md");
  R.pipe(execMarkdownToHtml)(interactiveDemo);
};

module.exports = { buildAllHtml };

if (require.main === module) {
  // buildOverviewPages();
  buildAllHtml();
}
