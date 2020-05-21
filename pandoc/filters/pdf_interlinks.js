#!/usr/bin/env node

const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");
const { buildLink } = require("../utils");

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

    // console.error(value);

    // value = R.assocPath(
    //   p,
    //   R.toLower(relUrl)
    //     .replace(".md", "")
    //     .replace(/^[0-9]+\-/i, ""),
    //   value
    // );
    // return value;
    // const pdfUrl = buildLink(relUrl);
    // console.error(
    //   R.toLower(relUrl)
    //     .replace(".md", "")
    //     .replace(/^[0-9]+\-/i, "")
    // );
    // return Str(value.toUpperCase());
  }
}

stdio(action);
