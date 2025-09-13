const chokidar = require("chokidar");
const path = require("path");
const R = require("ramda");
const { spawn } = require("child_process");

// Helper function to execute build functions with specific language
const execWithLang = (lang, buildFn, ...args) => {
  return buildFn(lang, ...args);
};

// Build everything for both languages
console.log("Building English content...");
execWithLang("en", () => {
  const { buildAllHtml } = require("./build_all_html");
  buildAllHtml();
});

console.log("Building French content...");
execWithLang("fr", () => {
  const { buildAllHtml } = require("./build_all_html");
  buildAllHtml();
});

const bookDirectory = path.resolve(__dirname, "../book");
const bookDirectoryFr = path.resolve(__dirname, "../book-fr");
const otherDirectory = path.resolve(__dirname, "../other");

const watcher = chokidar.watch(
  [
    `${bookDirectory}/*.md`,
    `${bookDirectoryFr}/*.md`,
    `${otherDirectory}/*.md`,
  ],
  {
    persistent: true,
  }
);

// Initial build for both languages on startup
console.log("Building initial content for both languages...");

// Build English content
console.log("Building English content...");
execWithLang("en", () => {
  const { buildAllHtml } = require("./build_all_html");
  buildAllHtml("en");
});

// Build French content
console.log("Building French content...");
execWithLang("fr", () => {
  const { buildAllHtml } = require("./build_all_html");
  buildAllHtml("fr");
});

// react-scripts start

watcher.on("change", (filePath) => {
  console.log(`${filePath} modified`);

  // Determine language based on file path
  const isFrenchFile = filePath.includes("book-fr");
  const lang = isFrenchFile ? "fr" : "en";

  console.log(
    `Processing ${lang.toUpperCase()} file: ${path.basename(filePath)}`
  );

  // Build overview pages and process the specific file with correct language
  execWithLang(lang, () => {
    const { buildOverviewPages } = require("./build_html_overview_pages");
    const { execMarkdownToHtml } = require("./build_html");

    buildOverviewPages(lang);
    execMarkdownToHtml(filePath, lang);
  });
});

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
