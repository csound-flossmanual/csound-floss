// Indented Markdown blocks have no language label. Infer only clear Csound
// forms; keep other unlabelled code plain and respect explicit languages.
export function csoundMode(source, label) {
  if (["csd", "orc", "sco"].includes(label)) return label;
  if (label && label !== "undefined" && label !== "csound") return undefined;
  if (
    /<\/?(?:CsoundSynthesizer|CsOptions|CsInstruments|CsScore)\b/.test(source)
  )
    return "csd";

  const lines = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^(?:;|\/\/)/.test(line));
  const event = /^[if]\s*(?:"[^"]+"|[+-]?\d+(?:\.\d+)?)\s+\S+/;
  if (
    lines.some((line) => event.test(line)) &&
    lines.every(
      (line) => event.test(line) || /^[es]\s*(?:;.*|\/\/.*)?$/.test(line),
    )
  )
    return "sco";
  return label === "csound" ? "orc" : undefined;
}
