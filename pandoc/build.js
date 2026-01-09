const { buildAllHtml } = require("./build_all_html");
const { spawn } = require("child_process");
const R = require("ramda");

// Build content for both languages
console.log("Building English content...");
buildAllHtml("en");

console.log("Building French content...");
buildAllHtml("fr");

console.log("Building Persian content...");
buildAllHtml("fa");

const react_process = spawn(
  "npx",
  ["react-scripts", "--openssl-legacy-provider", "build"],
  {
    env: R.assoc("EXTEND_ESLINT", "true", process.env),
  }
);

react_process.stdout.on("data", (s) => console.log(s.toString()));

react_process.stderr.on("data", (s) => console.error(s.toString()));

react_process.on("close", (code) => {
  if (code !== 0) {
    console.error(`React build failed with exit code ${code}`);
    process.exit(code);
  } else {
    console.log("React build completed successfully");
    process.exit(0);
  }
});
