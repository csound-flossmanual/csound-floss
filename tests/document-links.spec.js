import { execFileSync } from "node:child_process";
import fg from "fast-glob";
import { resolveDocumentLinks } from "../pandoc/filters/document-links";
import { MARKDOWN_EXTENSIONS } from "../pandoc/constants";

it.each([
  ["en", "book"],
  ["fr", "book-fr"],
  ["fa", "book-fa"],
])("resolves every internal link in the %s export", (lang, directory) => {
  const files = fg
    .sync(`${directory}/*.md`)
    .sort()
    .filter((file) => !file.endsWith("00--aa-toc.md"));
  const doc = JSON.parse(
    execFileSync(
      "pandoc",
      [
        ...files,
        "--file-scope",
        "-f",
        MARKDOWN_EXTENSIONS.join("+"),
        "-t",
        "json",
      ],
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
    ),
  );
  expect(() => resolveDocumentLinks(doc, files, lang)).not.toThrow();
});

it("resolves file, section, and overview links against actual headings", () => {
  const header = (id) => ({
    t: "Header",
    c: [1, [id, [], []], [{ t: "Str", c: "Title" }]],
  });
  const link = (url) => ({ t: "Link", c: [["", [], []], [], [url, ""]] });
  const doc = {
    blocks: [
      header("book__01-gs-01.md__hello-csound"),
      header("book__01-gs-01.md__details"),
      link("01-GS-01.md"),
      link("/get-started/GS-01#details"),
      link("/get-started"),
    ],
  };
  resolveDocumentLinks(doc, ["book/01-GS-01.md"], "en");
  expect(doc.blocks.slice(2).map((node) => node.c[2][0])).toEqual([
    "#book__01-gs-01.md__hello-csound",
    "#book__01-gs-01.md__details",
    "#book__01-gs-01.md__hello-csound",
  ]);
});

it("rejects missing anchors instead of writing broken PDF references", () => {
  expect(() =>
    resolveDocumentLinks(
      {
        blocks: [
          { t: "Link", c: [["", [], []], [], ["#missing-section", ""]] },
        ],
      },
      [],
      "en",
    ),
  ).toThrow("#missing-section");
});
