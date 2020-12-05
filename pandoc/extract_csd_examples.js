const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const { execSync } = require("child_process");
const { tmpdir } = require("os");
const R = require("ramda");
const {
  PDF_OUTPUT,
  BOOK_DIRECTORY,
  MARKDOWN_EXTENSIONS,
  RESOURCES_DIRECTORY,
} = require("./constants");

const allChapters = R.reject(
  (md) => md.includes("00--aa-toc.md"),
  fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false })
).sort();

const tmpDest1 = path.join(tmpdir(), "__tmp_csound_floss.md");
const tmpDest2 = path.join(tmpdir(), "__tmp_csound_floss.pdf");

R.pipe(
  R.reduce((acc, chapterLocation) => {
    const chapter = fs.readFileSync(chapterLocation).toString();
    return (
      acc +
      "\n" +
      chapter.replace(/\.\.\/resources\//g, `${RESOURCES_DIRECTORY}/`)
    );
  }, ""),
  // (x) => R.reduce((a, v) => a.replace(v, ""), x, deleteLinesHack),
  (singleMd) => fs.writeFileSync(tmpDest1, singleMd)
)(allChapters);

execSync(
  `pandoc ${tmpDest1} \
      --filter=pandoc/filters/example_extractor.js \
      --pdf-engine=xelatex \
      -o ${tmpDest2}`,
  { encoding: "utf-8" }
);

console.log(null);
