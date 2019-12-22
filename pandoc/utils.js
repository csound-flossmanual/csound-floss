const R = require("ramda");
const fs = require("fs");
const path = require("path");
const toc = require("../toc.json");

const deleteFolderRecursive = dirPath => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

const ensureEmptyDir = dirPath => {
  if (fs.existsSync(dirPath)) {
    deleteFolderRecursive(dirPath);
  }
  fs.mkdirSync(dirPath, { recursive: true });
};

const readFileWithFallback = filePath => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath).toString();
  } else {
    return "";
  }
};

const makeWrapChapterInTemplate = () => {
  const prepend = fs
    .readFileSync(path.resolve(__dirname, "./templates/prepend.txt"))
    .toString();
  const append = fs.readFileSync(
    path.resolve(__dirname, "./templates/append.txt")
  );
  return (chapter, title) =>
    `${prepend.replace("CHANGEME", title)}${chapter}${append}`;
};

const startsWithChapterMark = url => /^\d\d/i.test(url);

const buildLink = url => {
  const urlWithoutHash = url.replace(/#+.*/, "");
  if (urlWithoutHash.endsWith(".md") && startsWithChapterMark(urlWithoutHash)) {
    const chapterNumber = parseInt(urlWithoutHash.match(/^\d\d/i).toString());
    const sectionBasename = urlWithoutHash
      .replace(/\d\d-/i, "")
      .replace(".md", "")
      .replace(/^[a-z]-/i, "");
    const prefixData = R.find(R.propEq("chapter", chapterNumber))(toc);
    if (!prefixData) {
      console.error(
        "ERROR: missing table of content entry for markdown data: " + url
      );
      process.exit(1);
    }
    return {
      url: `${prefixData.url_prefix}/${sectionBasename}`,
      ...prefixData
    };
  } else {
    return { url };
  }
};

module.exports = {
  buildLink,
  ensureEmptyDir,
  makeWrapChapterInTemplate,
  readFileWithFallback
};
