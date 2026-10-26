const { buildAllHtml } = require("./build_all_html");

async function main() {
  for (const lang of ["en", "fr", "fa"]) buildAllHtml(lang);
  const { build } = await import("vite");
  await build();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
