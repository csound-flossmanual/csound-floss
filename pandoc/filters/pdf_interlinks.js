#!/usr/bin/env node

const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");

const isAbsoluteUrl = url => /^https?:\/\//i.test(url);

function action({ t: type, c: value }, format, meta) {
  if (
    type === "Link" &&
    R.is(Array, value) &&
    !isAbsoluteUrl(R.head(R.last(value)))
  ) {
    const p = [R.dec(R.length(value)), 0];
    // console.error(p);
    const relUrl = R.path(p, value); // R.head(R.last(value));
    // console.error(value);
    value[p[0]][p[1]] =
      "#" +
      R.toLower(relUrl)
        .replace(".md", "")
        .replace(/^[0-9]+\-/i, "")
        .replace("-", ".-");
  }
}

stdio(action);
