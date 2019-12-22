#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const pandoc = require("pandoc-filter-promisified");
const R = require("ramda");

const isAbsoluteUrl = url => /^https?:\/\//i.test(url);
const isInternalUrl = url => /^\/(?!\/)/.test(url);

async function action(elt, pandocOutputFormat, meta) {
  if (typeof elt === "object" && R.propOr(false, "t", elt) === "Link") {
    const url = R.path(["c", elt.c.length - 1, 0], elt);

    const newElem = R.pipe(
      R.assocPath(["c", elt.c.length - 1], ["preface.md"]),
      // R.assocPat(["c", 0], ["AA", [], []]),
      R.prop("c")
    )(elt);

    return pandoc.Link.apply(this, newElem);

    if (isAbsoluteUrl(url)) {
    }
  }
  // return [elt, pandocOutputFormat, meta];
  // const [headers, content] = elt.c;
  // console.warn(Object.keys(elt));
  // pandoc.walk(elt)

  // console.warn(pandocOutputFormat);
  // console.warn(meta);
  // if (elt.t === `CodeBlock`) {
  //   const [headers, content] = elt.c;
  //   const includePath = getIncludeHeader(headers);
  //   // it's a normal code block, no need to do anything
  //   if (!includePath) return;
  //   // filter out the include value if another filter processes this code block
  //   const newHeaders = filterOutOwnHeaders(headers);
  //   let newContent = replaceWithFile(include);
  //   return CodeBlock(newHeaders, newContent);
  // }
}

pandoc.stdio(action);
