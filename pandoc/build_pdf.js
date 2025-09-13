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
  IS_FRENCH,
} = require("./constants");

const allChapters = R.reject(
  (md) => md.includes("00--aa-toc.md"),
  fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false })
).sort();

// const allChapters = R.take(10, allChapters_);

const tmpDest = path.join(
  tmpdir(),
  `csound_flossmanual_single${IS_FRENCH ? "_fr" : ""}.md`
);

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
  (x) => R.reduce((a, v) => a.replace(v, ""), x, deleteLinesHack),
  (singleMd) => fs.writeFileSync(tmpDest, singleMd)
)(allChapters);

execSync(
  `pandoc ${tmpDest} -f ${MARKDOWN_EXTENSIONS.join("+")} \
      -N --template=pandoc/latex/template.tex \
      --syntax-definition=pandoc/csound-theme.xml \
      --highlight-style=tango \
      --top-level-division=chapter \
      --include-in-header pandoc/latex/chapter_break.tex \
      --include-in-header pandoc/latex/codesize.tex \
      --include-in-header pandoc/latex/disable_float.tex \
      --pdf-engine=xelatex \
      --filter=pandoc/filters/pdf_interlinks.js \
      --filter=pandoc/filters/pdf_codeblocks.js \
      --metadata title="${IS_FRENCH ? "Le Manuel FLOSS Csound" : "The Csound FLOSS Manual"}" \
      -o ${PDF_OUTPUT}`,
  { encoding: "utf-8" }
);

console.log(null);
