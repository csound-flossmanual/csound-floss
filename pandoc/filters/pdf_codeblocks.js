#!/usr/bin/env node

const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");
const { buildLink } = require("../utils");

const isAbsoluteUrl = url => /^https?:\/\//i.test(url);

function action({ t: type, c: value }, format, meta) {
  if (type === "CodeBlock") {
    if (R.last(value).match(/\n\s*\n/g)) {
      // console.error(
      //   "Replacing multiple empty lines in example for 1 empty line"
      // );
      value[R.dec(R.length(value))] = R.last(value).replace(/\n\s*\n/g, "\n\n");
    }
  }
}

stdio(action);
