## Requirements

- Node.js 22.22.2+, 24.15+, or 26+ (required by the current test and watch tools)
- npm 10+ (included with Node.js)
- Pandoc 2.3+ for chapter generation and tests
- XeLaTeX and the fonts in `shell.nix` for PDF builds

## Developing

```sh
npm ci
npm start
```

This builds the English, French, and Persian chapters, starts Vite at
[localhost:3000](http://localhost:3000), and watches the book sources for changes.

## Building

```sh
npm run build
npm run preview
```

The build writes the website to `build/`. Vite handles JSX and bundles the
site without Babel. To rebuild only the frontend after generating chapters,
run `npm run build:site`.

Document builds resolve chapter links against the exported headings and fail on
unresolved links or Pandoc warnings. Links to chapters not yet translated open
the English website.

Build downloadable documents with:

```sh
npm run build:pdf
npm run build:epub
npm run build:odt
LANG=fr npm run build:pdf
```

## Tests

```sh
npm test
npm run test:watch
```

Vitest runs the book checks and playback logic tests. The book checks need
Pandoc on `PATH`.

The Csound check compiles complete CSD examples in all three books with the site's
WASM engine and fails on errors or warnings. It also checks the delay example's
audio output and all four WASM plugins. Native-only plugins and external score
generators are outside this check. To run it alone, use
`node scripts/check-csound-examples.mjs`.

## Dependencies

Use `npm ci` for a clean install from `package-lock.json`. Use `npm install`
when adding or changing packages, and commit the updated lockfile.

```sh
npm run update:dependencies
npm install
npm test
npm run build
```

The dependency update command runs `ncu -u`, including prereleases.
The Csound editor uses `@kunstmusik/codemirror-lang-csound` for CSD, ORC, and SCO
syntax, completion, and opcode help. The help catalog loads on demand.
The HTML-to-JSX converter uses current Cheerio and its encoding helper through
npm overrides. CodeMirror shares one state package to keep extensions compatible.
MathJax 4 loads from jsDelivr when a chapter contains equations. Csound loads its
upstream module and embedded WASM as a separate asset when playback starts.
Playback also loads `@csound/plugins` for Chua, STK, image, and linear algebra
opcodes. STK includes its raw-wave samples. Examples that need other plugins,
such as Python or FLTK, still report Csound errors in the console.

## Contributing

- [Conventions for writing](contribute/conventions.md)
- [Writing in Markdown](contribute/writing-in-markdown.md)
- [Todo list](contribute/todo.md)

## Writing Tools

- [Panwriter: a GUI for editing Pandoc files](https://panwriter.com/)
- [Atom Package for Pandoc edit and preview](https://atom.io/packages/pandoc)
- [Emacs Mode for editing Pandoc files](http://joostkremers.github.io/pandoc-mode/)
- [Vim plugin for Pandoc integration and utilities](https://github.com/vim-pandoc/vim-pandoc)

## Further Read

- [Pandoc Official Manual](https://pandoc.org/MANUAL.html)
- [Pandoc alternative manual](https://rmarkdown.rstudio.com/authoring_pandoc_markdown.html%23raw-tex)

## Continuous Integration and Firebaseapp Build

Each merge into `develop` builds a [preview on Firebase](https://csound-floss-dev.firebaseapp.com/).
Both build workflows pin Nixpkgs to a commit of `nixpkgs-unstable` for the document tools.
