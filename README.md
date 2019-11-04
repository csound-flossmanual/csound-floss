[![Build Status](https://travis-ci.com/csound-flossmanual/csound-floss.svg?branch=master)](https://travis-ci.com/csound-flossmanual/csound-floss)

## Building
If you wish to render the FLOSS Manual, you're going to need to install
some dependencies. This will vary depending on your operating system and
package manager.

### Requirements
- Python 3.6+
- pip
- pandoc
- pandoc-citeproc
- pyyaml
- weasyprint

First install the Python dependencies from requirements.txt

```
pip install -r requirements.txt
```

Then build the standalone html file by running

```
python3 build.py html
```

## Building with Docker
Using Docker may or may not be an easier solution.
Docker offers an isolated build environment with all the configuration
and dependencies already set up. But this may cost a few gigabytes on your
hard drive.

First install docker either by using your package manager (homebrew/apt-get) or run
the official installation script:

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

In your terminal, navigate to the csound-floss directory and run

```
sh docker-build.sh
```

This may take a while the first time, but subsequent build should be faster
(except when the docker image is updated, in which case you would need to download the latest one).

## Writing Tools
- [Panwriter: a GUI for editing Pandoc files](https://panwriter.com/)
- [Atom Package for Pandoc edit and preview](https://atom.io/packages/pandoc)
- [Emacs Mode for editing Pandoc files](http://joostkremers.github.io/pandoc-mode/)
- [Vim plugin for Pandoc integration and utilities](https://github.com/vim-pandoc/vim-pandoc)

## Further Read
- [Pandoc Official Manual](https://pandoc.org/MANUAL.html)
- [Pandoc alternative manual](https://rmarkdown.rstudio.com/authoring_pandoc_markdown.html%23raw-tex)
