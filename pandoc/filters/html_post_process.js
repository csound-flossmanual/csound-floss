const R = require("ramda");
const { DomHandler, DomUtils, Parser } = require("htmlparser2");
const mjAPI = require("mathjax-node");
const util = require("util");
const { buildLink } = require("../utils");

const isAbsoluteUrl = (url) => /^https?:\/\//i.test(url);

const newArray = (arr) => arr.map((a) => Object.assign({}, a));

const parse = (str) => {
  let result;
  const handler = new DomHandler((error, dom) => {
    if (error) {
      console.error("Error in DomHandler while parsing", error);
      process.exit(1);
    } else {
      result = dom;
    }
  });
  const parser = new Parser(handler);
  parser.write(str);
  parser.end();
  return result;
};

const insertLinkElement = (dom) => {
  try {
    DomUtils.findAll((elem) => elem.name === "a", dom).forEach((elem) => {
      if (
        elem.attribs.href &&
        !isAbsoluteUrl(elem.attribs.href) &&
        !elem.attribs.href.startsWith("#")
      ) {
        elem.name = "Link";
        elem.attribs = R.pipe(
          R.assoc("to", buildLink(elem.attribs.href).url),
          R.dissoc("href")
        )(elem.attribs || {});
      }
    });
    return dom;
  } catch (error) {
    throw new Error(`Error in insertLinkElement: ${error.message}`);
  }
};

const fixPreTags = (dom) => {
  try {
    DomUtils.findAll((elem) => elem.name === "pre", dom).forEach((elem) => {
      if (
        R.hasPath(["children", 0, "name"], elem) &&
        R.path(["children", 0, "name"], elem) === "code"
      ) {
        elem.name = "div";
        elem.attribs.class = "code-container " + elem.attribs.class;
      }
    });
    return dom;
  } catch (error) {
    throw new Error(`Error in fixPreTags: ${error.message}`);
  }
};

const escapeCodeData = (str) =>
  str
    .replace(/\\n/g, "\\\\n")
    .replace(/\\'/g, "\\\\'")
    .replace(/\\"/g, '\\\\"')
    .replace(/\\&/g, "\\\\&")
    .replace(/\\r/g, "\\\\r")
    .replace(/\\t/g, "\\\\t")
    .replace(/\\b/g, "\\\\b")
    .replace(/\\f/g, "\\\\f");

const fixCodeTags = (dom) => {
  try {
    DomUtils.findAll((elem) => elem.name === "code", dom).forEach((elem) => {
      if (R.pathOr("", ["attribs", "class"], elem).match(/^sourceCode +/g)) {
        elem.name = "CodeElement";
        elem.attribs.data = DomUtils.getText(elem);
        console.log(elem.attribs.data);
        elem.attribs = {
          data:
            "REPLACEME_BEG" +
            escapeCodeData(elem.attribs.data) +
            "REPLACEME_END",
          lang: elem.attribs.class.toString().replace("sourceCode ", ""),
        };
        elem.children = [[]];
      } else if (
        R.hasPath(["children", 0, "data"], elem) &&
        R.pathOr(false, ["parent", "name"], elem) === "div"
      ) {
        elem.name = "CodeElement";
        elem.attribs.lang = (
          elem.attribs?.class?.toString() ||
          (elem.parent?.attribs?.class?.toString() ?? "")
        )
          .replace("sourceCode ", "")
          .replace("code-container ", "");

        elem.attribs.data =
          "REPLACEME_BEG" +
          escapeCodeData(elem.children[0].data) +
          "REPLACEME_END";
        elem.children[0].data = "";
      }
    });
    return dom;
  } catch (error) {
    throw new Error(`Error in fixCodeTags: ${error.message}`);
  }
};

const wrapMathJax = (dom) => {
  try {
    DomUtils.findAll(
      (elem) => R.pathOr("", ["attribs", "class"], elem).startsWith("math"),
      dom
    ).forEach((elem) => {
      if (R.hasPath(["children", 0, "data"], elem)) {
        elem.name = "MathJax.Node";
        elem.attribs = R.pipe(
          R.assoc(
            "formula",
            R.path(["children", 0, "data"], elem)
              .replace(/\\\[/g, "")
              .replace(/\\\(/g, "")
              .replace(/\\\)/g, "")
              .replace(/\\\]/g, "")
          ),
          R.assoc("inline", "true")
        )(elem.attribs);
        elem.children = [];
      }
    });
    return dom;
  } catch (error) {
    throw new Error(`Error in wrapMathJax: ${error.message}`);
  }
};

module.exports = (htmlString, fileName = "unknown file") => {
  try {
    return R.pipe(
      parse,
      insertLinkElement,
      fixPreTags,
      fixCodeTags,
      wrapMathJax,
      (elems) =>
        DomUtils.getOuterHTML(elems, { decodeEntities: true, xmlMode: true })
    )(htmlString);
  } catch (error) {
    console.error(`Error in HTML post-processing pipeline for ${fileName}:`);
    console.error(`Error details:`, error.message);
    console.error(`Stack trace:`, error.stack);
    throw new Error(
      `HTML post-processing failed for ${fileName}: ${error.message}`
    );
  }
};
