const each = require("jest-each").default;
const path = require("path");
const R = require("ramda");
const chalk = require("chalk");
const { BOOK_DIRECTORY } = require("../pandoc/constants");
const fg = require("fast-glob");
const allChapters = fg.sync([`${BOOK_DIRECTORY}/*.md`], { dot: false });
const { execSync } = require("child_process");

expect.extend({
  toBeShorterThan(received, limit) {
    if (received.length < limit) {
      return { pass: true };
    }
    const helpfulMessage =
      chalk.rgb(23, 255, 24).inverse(received.substring(0, 78)) +
      chalk.rgb(230, 10, 24).inverse(received.substring(78));
    return {
      message: () => `Too long line: \n\t${helpfulMessage}`,
      pass: false,
    };
  },
});

each(allChapters).describe(`Testing %s`, mdPath => {
  let ast = {};
  it("Pandoc can parse it", () => {
    const out = execSync(`pandoc -t json ${mdPath}`, { encoding: "utf-8" });
    expect(() => {
      const maybeObj = JSON.parse(out);
      ast = maybeObj.blocks || [];
    }).not.toThrow();
  });

  it("CodeBlocks lines never exceed 78 characters", () => {
    const codeBlocks = R.pipe(
      R.filter(R.propEq("t", "CodeBlock")),
      R.pluck("c"),
      R.map(R.last)
    )(ast);

    codeBlocks.forEach(txt => {
      const lines = txt.split(/\r?\n/);
      lines.forEach(line => {
        expect(line).toBeShorterThan(79);
      });
    });
  });
});
