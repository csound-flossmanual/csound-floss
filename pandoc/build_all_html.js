const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const { tmpdir } = require("os");
const { execMarkdownToHtml } = require("./build_html");
const { ensureEmptyDir } = require("./utils");
const {
  BOOK_DIRECTORY,
  JSX_OUTPUT,
  TOC_FILE,
  IS_FRENCH,
} = require("./constants");
const { buildOverviewPages } = require("./build_html_overview_pages");
const toc = require(TOC_FILE);

const allChapters = fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false });

const buildAllHtml = (lang = null) => {
  // Determine language: prioritize argument, fall back to env var, default to 'en'
  const currentLang = lang || process.env.LANG || "en";
  const isFrench = currentLang === "fr";

  // Load language-specific constants
  const langSuffix = isFrench ? "_fr" : "";
  const langDirSuffix = isFrench ? "-fr" : "";
  const fragmentsDirSuffix = isFrench ? "_fr" : "";

  const jsxOutput = path.resolve(
    __dirname,
    `../src/book_fragments${fragmentsDirSuffix}`
  );
  const bookDirectory = path.resolve(__dirname, `../book${langDirSuffix}`);
  const tocFile = isFrench ? "../toc-fr.json" : "../toc.json";
  const toc = require(tocFile);

  const allChapters = fg.sync([`${bookDirectory}/*.md`], { dot: false });

  ensureEmptyDir(jsxOutput);
  buildOverviewPages(currentLang);
  R.pipe(
    R.map((chapter) => execMarkdownToHtml(chapter, currentLang)),
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
              sectionName: isFrench ? "Aperçu" : "Overview",
            });
          } else {
            console.error("Didn't find matching chapter defined in TOC!");
          }
        }
        routes.push(routeData);
        currentChapterNumber = routeData.chapter;
      }
      fs.writeFileSync(
        path.join(jsxOutput, `routes.json`),
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
