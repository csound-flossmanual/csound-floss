import { buildLink } from "../pandoc/utils";
import { BOOK_DIRECTORY_FA } from "../pandoc/constants";
import { existsSync } from "node:fs";

it.each([
  ["en", "/get-started/GS-01"],
  ["fr", "/fr/premiers-pas/gs-01"],
  ["fa", "/fa/get-started/GS-01"],
])("keeps %s chapter links in their language", (lang, expected) => {
  expect(buildLink("01-GS-01.md", lang).url).toBe(expected);
});

it("includes the Persian book directory in layout checks", () => {
  expect(existsSync(BOOK_DIRECTORY_FA)).toBe(true);
});
