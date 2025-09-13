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
  IS_FRENCH,
  LANG,
} = require("./constants");
const html2jsx = require("html-to-jsx");
const R = require("ramda");

const wrapChapterInTemplate = makeWrapChapterInTemplate();

function execMarkdownToHtml(fileName, lang = null) {
  // Determine language: prioritize argument, fall back to env var, default to 'en'
  const currentLang = lang || process.env.LANG || "en";
  const isFrench = currentLang === "fr";

  // Load language-specific constants
  const fragmentsDirSuffix = isFrench ? "_fr" : "";
  const jsxOutput = path.resolve(
    __dirname,
    `../src/book_fragments${fragmentsDirSuffix}`
  );

  const chapterBasename = path.basename(fileName, ".md");
  const tmpDest = path.join(tmpdir(), chapterBasename) + ".html";

  try {
    const pandocCommand = `pandoc --to=html5 --wrap=auto ${fileName} -f ${MARKDOWN_EXTENSIONS.join(
      "+"
    )} -o ${tmpDest} --mathjax`;

    console.log(`Processing ${LANG.toUpperCase()} ${fileName} with pandoc...`);
    const stdout = execSync(pandocCommand, { encoding: "utf8" });

    // Log stdout if there's any output from pandoc
    if (stdout && stdout.trim()) {
      console.log(`Pandoc output for ${fileName}:`, stdout);
    }
  } catch (error) {
    console.error(`Error executing pandoc for file ${fileName}:`);
    console.error(
      `Command: pandoc --to=html5 --wrap=auto ${fileName} -f ${MARKDOWN_EXTENSIONS.join("+")} -o ${tmpDest} --mathjax`
    );
    console.error(`Exit code: ${error.status}`);
    console.error(
      `Stderr: ${error.stderr ? error.stderr.toString() : "No stderr output"}`
    );
    console.error(
      `Stdout: ${error.stdout ? error.stdout.toString() : "No stdout output"}`
    );
    throw new Error(`Failed to convert ${fileName} to HTML: ${error.message}`);
  }

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

  let processedHtmlString;
  try {
    console.log(`Post-processing HTML for ${fileName}...`);
    processedHtmlString = postProcessHtml(
      escapedHtmlString,
      fileName,
      currentLang
    );
  } catch (error) {
    console.error(`Error in postProcessHtml for file ${fileName}:`);
    console.error(`Error details:`, error.message);
    console.error(`Stack trace:`, error.stack);
    throw new Error(
      `Failed to post-process HTML for ${fileName}: ${error.message}`
    );
  }

  let jsxElements;
  try {
    console.log(`Converting HTML to JSX for ${fileName}...`);
    // evil and neccecary hack
    jsxElements = html2jsx(processedHtmlString.replaceAll("`", "&#96;"))
      .replaceAll("&amp;", "&")
      .replaceAll(' data="REPLACEME_BEG', " data={`")
      .replaceAll('REPLACEME_END"', "`}")
      .replaceAll("undefined</CodeElement>", "</CodeElement>")
      // .replaceAll('"></CodeElement>', "`}></CodeElement>")
      .replace(/^</gm, "{' '}<")
      .replace(/>$/gm, ">{' '}");
  } catch (error) {
    console.error(`Error in html2jsx conversion for file ${fileName}:`);
    console.error(`Error details:`, error.message);
    console.error(`Stack trace:`, error.stack);
    throw new Error(
      `Failed to convert HTML to JSX for ${fileName}: ${error.message}`
    );
  }

  const linkData = buildLink(path.basename(fileName), currentLang);

  try {
    fs.writeFileSync(
      path.join(jsxOutput, `${chapterBasename}.jsx`),
      wrapChapterInTemplate(
        jsxElements,
        R.propOr(
          isFrench ? "Chapitre Sans Titre" : "Untitled Chapter",
          "sectionName",
          linkData
        )
      )
    );
    console.log(`Successfully generated ${chapterBasename}.jsx`);
  } catch (error) {
    console.error(`Error writing JSX file for ${fileName}:`);
    console.error(
      `Output path: ${path.join(jsxOutput, `${chapterBasename}.jsx`)}`
    );
    console.error(`Error details:`, error.message);
    throw new Error(
      `Failed to write JSX file for ${fileName}: ${error.message}`
    );
  }

  return {
    module: `${chapterBasename}`,
    ...linkData,
  };
}

module.exports = { execMarkdownToHtml };
// execMarkdownToHtml("book/12-a-the-csound-api.md");
// execMarkdownToHtml("henda.md");
