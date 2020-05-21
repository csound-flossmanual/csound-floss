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

const allChapters_ = R.reject(
  md => md.includes("00--aa-toc.md"),
  fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false })
).sort();

const allChapters = R.take(20, allChapters_);

const tmpDest = path.join(tmpdir(), "csound_flossmanual_single.md");

const deleteLinesHack = [
  "![](https://gogins.github.io/csound-extended/scrims.html){width=100% height=600px object-fit=contain}",
  /width=50%/g,
];

R.pipe(
  R.reduce((acc, chapterLocation) => {
    const chapter = fs.readFileSync(chapterLocation).toString();
    return (
      acc +
      "\n" +
      chapter.replace(/\.\.\/resources\//g, `${RESOURCES_DIRECTORY}/`)
    );
  }, ""),
  x => R.reduce((a, v) => a.replace(v, ""), x, deleteLinesHack),
  singleMd => fs.writeFileSync(tmpDest, singleMd)
)(allChapters);

execSync(
  `pandoc ${tmpDest} -f ${MARKDOWN_EXTENSIONS.join("+")} \
      -N --template=pandoc/latex/template.tex \
      --syntax-definition pandoc/csound-theme.xml \
      --highlight-style=kate \
      --include-in-header pandoc/latex/chapter_break.tex \
      --pdf-engine=xelatex \
      --filter=pandoc/filters/pdf_interlinks.js \
      -o ${PDF_OUTPUT}`,
  { encoding: "utf-8" }
);

console.log(null);
