#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const fg = require("fast-glob");
const { buildLink } = require("../utils");
const { BOOK_DIRECTORY, LANG } = require("../constants");

function walk(value, visit) {
  if (!value || typeof value !== "object") return;
  if (value.t) visit(value);
  for (const child of Object.values(value)) {
    if (Array.isArray(child)) child.forEach((item) => walk(item, visit));
    else if (child && typeof child === "object") walk(child, visit);
  }
}

function resolveDocumentLinks(doc, files, lang) {
  const chapters = files.map((file) => ({
    file: path.basename(file),
    prefix: file.toLowerCase().replaceAll(path.sep, "__") + "__",
    route: buildLink(path.basename(file), lang).url,
    ids: new Map(),
  }));
  const ids = new Set();
  walk(doc, (node) => {
    const attr =
      node.t === "Header"
        ? node.c[1]
        : ["Span", "Div", "CodeBlock", "Code", "Link", "Image"].includes(node.t)
          ? node.c[0]
          : null;
    if (!Array.isArray(attr) || !attr[0]) return;
    ids.add(attr[0]);
    const chapter = chapters.find((item) => attr[0].startsWith(item.prefix));
    if (chapter) {
      if (node.t === "Header") chapter.first ??= attr[0];
      chapter.ids.set(attr[0].slice(chapter.prefix.length), attr[0]);
    }
  });
  const englishFiles = fg.sync("book/*.md").map((file) => ({
    file: path.basename(file),
    route: buildLink(path.basename(file), "en").url,
  }));
  const unresolved = new Set();
  walk(doc, (node) => {
    if (node.t !== "Link") return;
    const target = node.c[2][0];
    if (target.startsWith("../resources/")) {
      node.c[2][0] = "https://flossmanual.csound.com/" + target.slice(3);
      return;
    }
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target)) return;
    if (target.startsWith("#") && ids.has(target.slice(1))) return;
    const [url, fragment] = target.split("#");
    const filename = path.basename(url);
    const chapter =
      chapters.find(
        (item) =>
          item.file.toLowerCase() === filename.toLowerCase() ||
          item.route.toLowerCase() === url.toLowerCase() ||
          buildLink(item.file, "en").url.toLowerCase() === url.toLowerCase(),
      ) ||
      chapters.find((item) =>
        [item.route, buildLink(item.file, "en").url].some(
          (route) => route.slice(0, route.lastIndexOf("/")) === url,
        ),
      );
    const resolved =
      chapter &&
      (fragment
        ? chapter.ids.get(decodeURIComponent(fragment))
        : chapter.first);
    if (resolved) node.c[2][0] = "#" + resolved;
    else {
      const english = englishFiles.find(
        (item) =>
          item.file.toLowerCase() === filename.toLowerCase() ||
          item.route.toLowerCase() === url.toLowerCase() ||
          item.route.slice(0, item.route.lastIndexOf("/")) === url,
      );
      if (!chapter && english)
        node.c[2][0] =
          "https://flossmanual.csound.com" +
          english.route +
          (fragment ? "#" + fragment : "");
      else unresolved.add(target);
    }
  });
  if (unresolved.size)
    throw new Error(
      "Unresolved document links:\n" + [...unresolved].join("\n"),
    );
  return doc;
}

if (require.main === module) {
  const files = fg
    .sync(`${BOOK_DIRECTORY}/*.md`)
    .sort()
    .filter((file) => !file.endsWith("00--aa-toc.md"))
    .map((file) => path.relative(process.cwd(), file));
  process.stdout.write(
    JSON.stringify(
      resolveDocumentLinks(JSON.parse(fs.readFileSync(0, "utf8")), files, LANG),
    ),
  );
}
module.exports = { resolveDocumentLinks };
