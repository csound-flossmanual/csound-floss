const chokidar = require("chokidar");
const path = require("path");
const { buildAllHtml } = require("./build_all_html");

async function main() {
  const books = new Map([
    [path.resolve(__dirname, "../book"), "en"],
    [path.resolve(__dirname, "../book-fr"), "fr"],
    [path.resolve(__dirname, "../book-fa"), "fa"],
  ]);
  for (const lang of books.values()) buildAllHtml(lang);

  const { createServer } = await import("vite");
  const server = await createServer();
  await server.listen();
  server.printUrls();

  // Chokidar 4+ watches directories rather than glob patterns.
  const otherDirectory = path.resolve(__dirname, "../other");
  const watcher = chokidar.watch([...books.keys(), otherDirectory], {
    ignoreInitial: true,
  });
  watcher.on("all", (event, file) => {
    if (!["add", "change", "unlink"].includes(event) || !file.endsWith(".md"))
      return;
    const lang =
      path.dirname(file) === otherDirectory
        ? "en"
        : books.get(path.dirname(file));
    if (!lang) return;
    try {
      buildAllHtml(lang);
    } catch (error) {
      console.error(error);
    }
  });
  const close = async () => {
    await watcher.close();
    await server.close();
  };
  process.once("SIGINT", close);
  process.once("SIGTERM", close);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
