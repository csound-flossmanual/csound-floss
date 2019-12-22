const R = require("ramda");
const { DomHandler, DomUtils, Parser } = require("htmlparser2");
const mjAPI = require("mathjax-node");
const { buildLink } = require("../utils");
const he = require("he");

const isAbsoluteUrl = url => /^https?:\/\//i.test(url);

const newArray = arr => arr.map(a => Object.assign({}, a));

const parse = str => {
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

const insertLinkElement = dom => {
  DomUtils.findAll(elem => elem.name === "a", dom).forEach(elem => {
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
};

const fixPreTags = dom => {
  DomUtils.findAll(elem => elem.name === "pre", dom).forEach(elem => {
    if (
      R.hasPath(["children", 0, "name"], elem) &&
      R.path(["children", 0, "name"], elem) === "code"
    ) {
      elem.name = "div";
      elem.attribs.class = "code-container";
    }
  });
  return dom;
};

const fixCodeTags = dom => {
  DomUtils.findAll(elem => elem.name === "code", dom).forEach(elem => {
    if (
      R.hasPath(["children", 0, "data"], elem) &&
      R.pathOr(false, ["parent", "name"], elem) === "div"
    ) {
      elem.name = "CodeElement";
      elem.attribs.data = he
        .decode(elem.children[0].data)
        .replace(/\n/g, "\\n");
      elem.children[0].data = "";
    }
  });
  return dom;
};

// mjAPI.start();
// const mathjax_to_svg = (tex, isInline) => {
//   let result = "";
//   mjAPI.typeset(
//     {
//       math: tex,
//       format: isInline ? "inline-TeX" : "TeX",
//       svg: true
//     },
//     function(data) {
//       if (data.errors) {
//         console.error("MathJax Error: " + data.errors);
//       } else {
//         result = data.svg;
//       }
//     }
//   );
//   return result;
// };

const wrapMathJax = dom => {
  DomUtils.findAll(
    elem => R.pathOr("", ["attribs", "class"], elem).startsWith("math"),
    dom
  ).forEach(elem => {
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
      // R.mergeAll({
      //   formula: ,
      //   inline: true
      // };
      // elem.children[0] = {};
      // elem.children = parse(
      //   mathjax_to_svg(
      //     he.decode(R.path(["children", 0, "data"], elem)).replace(/\\/g, ""),
      //     elem.attribs.class.includes("inline")
      //   )
      // );
    }
  });
  return dom;
};

module.exports = R.pipe(
  parse,
  insertLinkElement,
  fixPreTags,
  fixCodeTags,
  wrapMathJax,
  elems => DomUtils.getOuterHTML(elems, { decodeEntities: true, xmlMode: true })
);
