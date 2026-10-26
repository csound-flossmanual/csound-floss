import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" })],
  // Csound publishes a browser module without a Node main entry for the test runner.
  resolve: {
    alias: [
      {
        find: /^@csound\/browser$/,
        replacement: fileURLToPath(
          new URL(
            "./node_modules/@csound/browser/dist/csound.js",
            import.meta.url,
          ),
        ),
      },
    ],
  },
  build: { outDir: "build" },
  server: { port: 3000 },
  test: {
    globals: true,
    include: ["tests/**/*.spec.js"],
  },
});
