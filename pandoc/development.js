const chokidar = require("chokidar");
const path = require("path");
const R = require("ramda");
const { spawn } = require("child_process");
const { execMarkdownToHtml } = require("./build_html");
const { buildAllHtml } = require("./build_all_html");
const { BOOK_DIRECTORY, OTHER_DIRECTORY } = require("./constants");

// Build everything just once
buildAllHtml();

const bookDirectory = path.resolve(__dirname, "../book");

const react_process = spawn(
  "npx",
  ["react-scripts", "--openssl-legacy-provider", "start"],
  {
    env: R.assoc("EXTEND_ESLINT", "true", process.env),
  }
);

react_process.stdout.on("data", (s) => console.log(s.toString()));

react_process.stderr.on("data", (s) => console.error(s.toString()));

react_process.on("close", (s) => console.log(s.toString()));

const watcher = chokidar.watch(
  [`${BOOK_DIRECTORY}/*.md`, `${OTHER_DIRECTORY}/*.md`],
  {
    persistent: true,
  }
);

// react-scripts start

watcher.on("change", (path) => {
  console.log(`${path} modified`);
  execMarkdownToHtml(path);
});
