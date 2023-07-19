const pandoc = require("pandoc-filter-promisified");
const { execSync } = require("child_process");
const { tmpdir } = require("os");
const fs = require("fs");
const path = require("path");
const postProcessHtml = require("./filters/html_post_process");
const {
  buildLink,
  ensureEmptyDir,
  makeWrapChapterInTemplate,
  readFileWithFallback,
} = require("./utils");
const {
  JSX_OUTPUT,
  BOOK_DIRECTORY,
  MARKDOWN_EXTENSIONS,
} = require("./constants");
const html2jsx = require("html-to-jsx");
const R = require("ramda");

const wrapChapterInTemplate = makeWrapChapterInTemplate();

function execMarkdownToHtml(fileName) {
  const chapterBasename = path.basename(fileName, ".md");
  const tmpDest = path.join(tmpdir(), chapterBasename) + ".html";
  const stdout = execSync(
    `pandoc --to=html5 --wrap=auto ${fileName} -f ${MARKDOWN_EXTENSIONS.join(
      "+"
    )} -o ${tmpDest} --mathjax`
  );
  const htmlString = readFileWithFallback(tmpDest);
  const escapedHtmlString = htmlString
    .replace(/{/g, "&amp;#123;")
    .replace(/}/g, "&amp;#125;")
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");

  const processedHtmlString = postProcessHtml(escapedHtmlString);
  // evil and neccecary hack
  // console.log(processedHtmlString);
  const jsxElements = html2jsx(processedHtmlString)
    .replaceAll("&amp;", "&")
    .replaceAll(' data="REPLACEME_BEG', " data={`")
    .replaceAll('REPLACEME_END"', "`}")
    .replaceAll("undefined</CodeElement>", "</CodeElement>")
    // .replaceAll('"></CodeElement>', "`}></CodeElement>")
    .replace(/^</gm, "{' '}<")
    .replace(/>$/gm, ">{' '}");

  const linkData = buildLink(path.basename(fileName));

  fs.writeFileSync(
    path.join(JSX_OUTPUT, `${chapterBasename}.jsx`),
    wrapChapterInTemplate(
      jsxElements,
      R.propOr("Untitled Chapter", "sectionName", linkData)
    )
  );
  return {
    module: `${chapterBasename}`,
    ...linkData,
  };
}

module.exports = { execMarkdownToHtml };
// execMarkdownToHtml("book/12-a-the-csound-api.md");
// execMarkdownToHtml("henda.md");
