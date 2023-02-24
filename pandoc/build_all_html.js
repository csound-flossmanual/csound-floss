const path = require("path");
const R = require("ramda");
const fg = require("fast-glob");
const fs = require("fs");
const { tmpdir } = require("os");
const { execMarkdownToHtml } = require("./build_html");
const { ensureEmptyDir } = require("./utils");
const { BOOK_DIRECTORY, JSX_OUTPUT } = require("./constants");
const toc = require("../toc.json");

const allChapters = fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false });

const buildOverviewPages = () => {
  for (const { chapter, with_overview_page = false, name } of toc) {
    if (with_overview_page) {
      const chapterPrefix = chapter < 10 ? `0${chapter}` : `${chapter}`;
      const chapterFiles = fg
        .sync([`${BOOK_DIRECTORY}/${chapterPrefix}*.md`], { dot: false })
        .sort();

      const sections = [];
      let overviewMarkdown = `# ${name}: overview\n\n`;

      for (const chapterFile of chapterFiles) {
        const content = fs.readFileSync(chapterFile).toString();
        const sectionsMatches = Array.from(
          content.matchAll(/#{1,6}.+(?=\n)/g)
        ).map((m) => Array.isArray(m) && m[0]);

        const sectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^# .*/.test(s)
        );

        const subSectionNameMatches = sectionsMatches.filter(
          (s) => typeof s === "string" && /^## .*/.test(s)
        );

        const sectionName =
          sectionNameMatches.length > 0
            ? sectionNameMatches[0]
            : "Undefined chapter";

        overviewMarkdown = `${overviewMarkdown}\n\n## ${sectionName.replace(
          /#/g,
          ""
        )}\n\n`;

        for (const subsectionMatch of subSectionNameMatches) {
          const subsubSections = [];
          let withinSubsection = true;
          let currentIndex = sectionsMatches.indexOf(subsectionMatch) + 1;

          while (withinSubsection && currentIndex < sectionsMatches.length) {
            if (/^### .*/.test(sectionsMatches[currentIndex])) {
              subsubSections.push(sectionsMatches[currentIndex]);
            }
            if (
              /^## .*/.test(sectionsMatches[currentIndex]) ||
              /^# .*/.test(sectionsMatches[currentIndex])
            ) {
              withinSubsection = false;
            }
            currentIndex += 1;
          }

          overviewMarkdown = `${overviewMarkdown}\n\n### ${subsectionMatch.replace(
            /#/g,
            ""
          )}\n\n`;

          subsubSectionsMd = subsubSections
            .map((s) => `- ${(s || "undefined subchapter").replace(/#/g, "")}`)
            .join("\n");
          overviewMarkdown = `${overviewMarkdown}${subsubSectionsMd}\n`;
        }
      }
      const tmpLoc = path.join(tmpdir(), `${chapterPrefix}-overview.md`);
      fs.writeFileSync(tmpLoc, overviewMarkdown);
      execMarkdownToHtml(tmpLoc);
    }
  }
};

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
              url: `${thisToc.url_prefix}/overview`,
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
