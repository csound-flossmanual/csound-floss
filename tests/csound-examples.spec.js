import { execFileSync } from "node:child_process";

it("compiles the book with Csound 7 and checks delay and plugin output", () => {
  const output = execFileSync(
    process.execPath,
    ["scripts/check-csound-examples.mjs"],
    {
      cwd: new URL("../", import.meta.url),
      encoding: "utf8",
      timeout: 60000,
    },
  );
  expect(output).toContain(
    "Delay output and all four WASM plugins passed runtime checks.",
  );
}, 65000);
