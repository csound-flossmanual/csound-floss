const { buildAllHtml } = require("./build_all_html");
const { spawn } = require("child_process");
const R = require("ramda");

buildAllHtml();

const react_process = spawn(
  "npx",
  ["react-scripts", "--openssl-legacy-provider", "build"],
  {
    env: R.assoc("EXTEND_ESLINT", "true", process.env),
  }
);

react_process.stdout.on("data", (s) => console.log(s.toString()));

react_process.stderr.on("data", (s) => console.error(s.toString()));

react_process.on("close", (s) => console.log(s.toString()) || process.exit(0));
