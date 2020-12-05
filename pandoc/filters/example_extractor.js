#!/usr/bin/env node

const { Str, stdio } = require("pandoc-filter");
const R = require("ramda");
const { buildLink } = require("../utils");
const fs = require("fs");

let secondLastBlock;
let lastBlock;
let tmpFileNameName = "./__tmp_last_file_name.txt";

function action({ t: type, c: value }, format, meta) {
  if (type === "Str" && /\d\d[A-Z]\d\d.*\.csd$/g.test(value)) {
    fs.writeFileSync(tmpFileNameName, value);
  }
  if (type === "CodeBlock") {
    if (value[0][1].length === 0) {
      value[0][1] = ["default"];
    }
    if (R.last(value).match(/\n\s*\n/g)) {
      value[R.dec(R.length(value))] = R.last(value).replace(/\n\s*\n/g, "\n\n");
    }
    const nextFileName = fs.readFileSync(tmpFileNameName).toString();
    const nextFileLocation = "examples/" + nextFileName;
    fs.writeFileSync(nextFileLocation, value[R.dec(R.length(value))]);
  }
}

stdio(action);
