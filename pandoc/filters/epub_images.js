#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");

const isAbsoluteUrl = (url) => /^https?:\/\//i.test(url);
const isInternalUrl = (url) => /^\/(?!\/)/.test(url);

function action({ t: type, c: value }, format, meta) {
  if (R.equals("Image", type)) {
    const imgPath = R.head(R.last(value));
    if (/^https?:.*\.html(?:[?#].*)?$/.test(imgPath)) {
      return {
        t: "Link",
        c: [
          value[0],
          value[1].length ? value[1] : [Str("Open interactive example")],
          value[2],
        ],
      };
    }
    if (!isAbsoluteUrl(imgPath)) {
      // console.error(path.resolve(__dirname, "../" + imgPath));
      value[R.dec(R.length(value))][0] = path.resolve(
        __dirname,
        "../" + imgPath,
      );
    }
  }
}

stdio(action);
