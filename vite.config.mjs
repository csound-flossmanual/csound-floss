import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" })],
  build: {
    outDir: "build",
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: (id) =>
                id
                  .match(/node_modules\/(@[^/]+\/[^/]+|[^/]+)/)?.[1]
                  .replaceAll("/", "-") ?? null,
              test: /node_modules/,
            },
          ],
        },
      },
    },
  },
  server: { port: 3000 },
  test: {
    globals: true,
    include: ["tests/**/*.spec.js"],
  },
});
