const path = require("node:path");
const { DomUtils } = require("htmlparser2");

// Use the same names in the rendered editors and the downloadable collection.
function nameExamples(dom, chapter) {
  let label;
  let count = 0;
  const examples = [];
  const visit = (nodes) => {
    for (const node of nodes) {
      if (/^h[1-6]$/.test(node.name) || node.name === "p") {
        const text = DomUtils.textContent(node);
        const match = text.match(/(?:EXAMPLE|EXEMPLE)\s+([^\s]+\.csd)/i);
        if (match) label = match[1];
      }
      if (node.name === "code") {
        const source = DomUtils.textContent(node);
        if (
          source.includes("<CsoundSynthesizer>") &&
          source.includes("</CsoundSynthesizer>")
        ) {
          const filename =
            label || `${path.basename(chapter, ".md")}-${++count}.csd`;
          node.attribs.filename = filename;
          examples.push({ filename, source });
          label = undefined;
        }
      } else if (node.children) visit(node.children);
    }
  };
  visit(dom);
  return examples;
}

module.exports = { nameExamples };
