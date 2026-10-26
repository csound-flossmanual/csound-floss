// Preserve quoted strings while removing both Csound comment styles.
export function withoutComments(source) {
  return source.replace(
    /"(?:\\.|[^"\\])*"|\/\*[\s\S]*?\*\/|(?:;|\/\/)[^\n]*/g,
    (token) => (token.startsWith('"') ? token : " "),
  );
}

export function materialReferences(source, names) {
  const code = withoutComments(source);
  const references = new Map();
  for (const token of code.matchAll(/[A-Za-z0-9_./,+-]+/g)) {
    const reference = token[0];
    const basename = reference.split("/").pop();
    if (!names.includes(basename)) continue;
    if (reference.startsWith("/")) continue;
    const file =
      basename === "circularstring" ? "circularstring-128" : basename;
    references.set(reference, { reference, file });
  }
  return [...references.values()];
}

export function resolveArchivePath(directory, reference) {
  const parts = directory.split("/").filter(Boolean);
  for (const part of reference.split("/")) {
    if (part === "..") {
      if (!parts.length)
        throw new Error(`Sample path leaves the archive: ${reference}`);
      parts.pop();
    } else if (part && part !== ".") parts.push(part);
  }
  return parts.join("/");
}

export async function exampleFiles(source, filename, names, readMaterial) {
  const files = { [`examples/${filename}`]: new TextEncoder().encode(source) };
  const visited = new Set();
  const add = async (code, directory) => {
    for (const { reference, file } of materialReferences(code, names)) {
      const path = resolveArchivePath(directory, reference);
      if (visited.has(path)) continue;
      visited.add(path);
      const bytes = await readMaterial(file);
      files[path] = bytes;
      if (/\.(txt|inc|udo|csd|orc)$/i.test(file))
        await add(
          new TextDecoder().decode(bytes),
          path.split("/").slice(0, -1).join("/"),
        );
    }
  };
  await add(source, "examples");
  return files;
}
