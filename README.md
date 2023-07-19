## Building

```
# first install npm dependencies
yarn
# then build with
yarn build
# build pdf with
yarn build:pdf
```

### Requirements

- pandoc 2.3+
- nodejs 17.x or later
- yarn 1.x but no later (make sure it's less than 2.x)

## Developing

```
# first install npm dependencies
yarn
# then start writing the book (this will auto-reload any change in the browser)
yarn start
```

## Tests

To run tests locally:

```
# Recommended
yarn test

# Alternatively (either)
npx jest
yarn jest

# Avoid those two
yarn add jest --global && jest
npm i jest --globall && jest
```

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

After each merge into develop, a preview of the manual is built and hosted
as from firebase, it's available at: [https://csound-floss-dev.firebaseapp.com/](https://csound-floss-dev.firebaseapp.com/).
