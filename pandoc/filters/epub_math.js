#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { stdio } = require("pandoc-filter");
const R = require("ramda");

function processMathContent(mathContent) {
  // Clean up the math content and handle multi-line equations
  let cleaned = mathContent.trim();

  // If the content contains \\, wrap it in an align* environment for proper LaTeX
  if (cleaned.includes("\\\\")) {
    // Split by \\ and join with proper line breaks for align environment
    const lines = cleaned
      .split("\\\\")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    cleaned = `\\begin{align*}\n${lines.join(" \\\\\n")}\n\\end{align*}`;
  }

  return cleaned;
}

function action({ t: type, c: value }, format, meta) {
  // Only process for EPUB format
  if (format !== "epub" && format !== "epub3") {
    return;
  }

  // Handle Math elements directly
  if (type === "Math") {
    const mathType = value[0].t; // "DisplayMath" or "InlineMath"
    const mathContent = value[1];

    if (mathType === "DisplayMath") {
      const processedContent = processMathContent(mathContent);
      return { t: "Math", c: [{ t: "DisplayMath" }, processedContent] };
    } else if (mathType === "InlineMath") {
      // For inline math, just clean up but don't wrap in align
      const cleaned = mathContent.trim();
      return { t: "Math", c: [{ t: "InlineMath" }, cleaned] };
    }
  }

  // Handle RawInline HTML that contains math expressions
  if (type === "RawInline" && value[0] === "html") {
    const htmlContent = value[1];

    // Check if this HTML contains math expressions wrapped in $$ or $
    const mathRegex = /\$\$([^$]+)\$\$/g;
    const inlineMathRegex = /\$([^$]+)\$/g;

    let match;

    // Handle display math ($$...$$)
    if ((match = mathRegex.exec(htmlContent)) !== null) {
      const mathContent = processMathContent(match[1]);
      return { t: "Math", c: [{ t: "DisplayMath" }, mathContent] };
    }

    // Handle inline math ($...$)
    if ((match = inlineMathRegex.exec(htmlContent)) !== null) {
      const mathContent = match[1].trim();
      return { t: "Math", c: [{ t: "InlineMath" }, mathContent] };
    }
  }

  // Handle RawBlock HTML that contains math expressions
  if (type === "RawBlock" && value[0] === "html") {
    const htmlContent = value[1];

    // Look for math expressions in HTML blocks
    const mathRegex = /\$\$([^$]+)\$\$/g;
    let match;

    if ((match = mathRegex.exec(htmlContent)) !== null) {
      const mathContent = processMathContent(match[1]);
      return { t: "Math", c: [{ t: "DisplayMath" }, mathContent] };
    }
  }
}

stdio(action);
