#!/usr/bin/env node

const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");
const { buildLink } = require("../utils");

const isAbsoluteUrl = url => /^https?:\/\//i.test(url);

function action({ t: type, c: value }, format, meta) {
  if (type === "CodeBlock") {
    if (value[0][1].length === 0) {
      value[0][1] = ["default"];
    }
    if (R.last(value).match(/\n\s*\n/g)) {
      value[R.dec(R.length(value))] = R.last(value).replace(/\n\s*\n/g, "\n\n");
    }
  }
}

stdio(action);
