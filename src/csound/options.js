// Read output options before creating audio, so file renders do not change iOS audio policy.
export function requestsFileOutput(source) {
  const visible = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .split(/<CsInstruments\s*>/i)[0];
  const body =
    visible.match(/<CsOptions\s*>([\s\S]*?)<\/CsOptions\s*>/i)?.[1] || "";
  const tokens = [];
  for (let i = 0; i < body.length; ) {
    if (/\s/.test(body[i])) {
      i++;
      continue;
    }
    if (body[i] === ";" || body.startsWith("//", i)) {
      const end = body.indexOf("\n", i);
      i = end < 0 ? body.length : end + 1;
      continue;
    }
    let value = "";
    let quote = "";
    for (; i < body.length; i++) {
      const char = body[i];
      if (quote) {
        if (char === quote) quote = "";
        else value += char;
      } else if (char === '"' || char === "'") quote = char;
      else if (/\s/.test(char) || char === ";") break;
      else value += char;
    }
    tokens.push(value);
  }
  let output = "dac";
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === "-o" || token === "--output") output = tokens[++i] || "dac";
    else if (token.startsWith("-o")) output = token.slice(2);
    else if (token.startsWith("--output=")) output = token.slice(9);
  }
  // Match the browser engine's routing rule, including dac device suffixes.
  return !output.includes("dac");
}
