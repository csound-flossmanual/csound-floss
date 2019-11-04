#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Build script. Uses doit: http://pydoit.org/
# ---------------------------------------------------------------------------
# Copyright © 2017-2019 Brian M. Clapper
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program. If not, see <http://www.gnu.org/licenses/>.
# ---------------------------------------------------------------------------

import sys
import os
import codecs
import shutil
from glob import glob
from string import Template
from pathlib import Path
from livereload import Server

sys.path.insert(0, os.path.dirname(__file__))
from lib import *

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

VERSION = "0.8.0"

BOOK_SRC_DIR = "book"
TMP_DIR  = "tmp"
TMP_DEV_DIR  = os.path.join(TMP_DIR, "dev")
RESOURCES_DIR = "resources"

BUILD_FILE = "build.py"
BUILD_LIB  = "lib/__init__.py"

# Generated files

OUTPUT_BASENAME            = "csound-floss-export"

EPUB_METADATA              = os.path.join(TMP_DIR, "epub-metadata.xml")
LATEX_COVER_PAGE           = os.path.join(TMP_DIR, "latex-title.latex")

OUTPUT_HTML                = f"{OUTPUT_BASENAME}.html"
OUTPUT_PDF                 = f"{OUTPUT_BASENAME}.pdf"
OUTPUT_EPUB                = f"{OUTPUT_BASENAME}.epub"
# OUTPUT_DOCX                = f"{OUTPUT_BASENAME}.docx"
OUTPUT_LATEX               = f"{OUTPUT_BASENAME}.latex"
OUTPUT_JSON                = f"{OUTPUT_BASENAME}.json"

COMBINED_METADATA          = os.path.join(TMP_DIR, "metadata.yaml")

# Input files

HTML_HEAD_INCLUDE          = os.path.join(RESOURCES_DIR, "html", "head_include.html")
HTML_BODY_INCLUDE          = os.path.join(RESOURCES_DIR, "html", "body_include.html")

EPUB_METADATA_TEMPLATE     = os.path.join(RESOURCES_DIR, "epub-metadata.xml")

LATEX_COVER_PAGE_TEMPLATE  = os.path.join(RESOURCES_DIR, "cover-page.latex")
LATEX_METADATA_YAML        = os.path.join(RESOURCES_DIR, "latex-metadata.yaml")
REFERENCES_YAML            = os.path.join(BOOK_SRC_DIR, "references.yaml")
REFERENCES                 = os.path.join(RESOURCES_DIR, "references.md")
METADATA_YAML              = os.path.join(BOOK_SRC_DIR, "metadata.yaml")

metadata                   = load_metadata(METADATA_YAML)
uses_references            = os.path.exists(REFERENCES_YAML)
use_weasyprint             = metadata.get("use_weasyprint", False)
uses_plantuml              = metadata.get("use_plantuml", False)

# COVER_IMAGE                = os.path.join(BOOK_SRC_DIR, "cover.png")
# COVER_IMAGE_PDF            = os.path.join(BOOK_SRC_DIR, "cover-pdf.png")
# CHAPTERS                   = sorted(glob(os.path.join(BOOK_SRC_DIR, "chapter-*.md")))
COPYRIGHT                  = os.path.join(BOOK_SRC_DIR, "copyright.md")
LATEX_HEADER               = os.path.join(RESOURCES_DIR, "header.latex")
# APPENDICES                 = glob(os.path.join(BOOK_SRC_DIR, "appendix-*.md"))

BOOK_MD_FILES = [];

for file in glob("book/*.md"):
    BOOK_MD_FILES.append(file)

BOOK_MD_FILES.sort()

BOOK_FILE_LIST = (
    [COMBINED_METADATA] +
    BOOK_MD_FILES +
    ([REFERENCES] if uses_references else [])
)

LOCAL_IMAGES       = find_local_images(BOOK_FILE_LIST)

FONTS_CSS          = os.path.join(RESOURCES_DIR, "styles", "fonts.css")
HTML_CSS           = os.path.join(RESOURCES_DIR, "styles", "html.css")
EPUB_CSS           = os.path.join(RESOURCES_DIR, "styles", "epub.css")
# When generating PDF from HTML via weasyprint.
HTML_PDF_CSS       = os.path.join(RESOURCES_DIR, "styles", "html-pdf.css")
LATEX_TEMPLATE     = os.path.join(RESOURCES_DIR, "latex.template")
# REF_DOCX           = os.path.join(RESOURCES_DIR, "custom-reference.docx")
PANDOC_FILTER      = os.path.join("scripts", "pandoc-filter.py")
PLANTUML_FILTER    = os.path.join("scripts", "plantuml-filter.py")

# Lists of dependencies, for ease of reference.
BUILD_FILE_DEPS = [BUILD_FILE, BUILD_LIB]
METADATA_DEPS = (
    [METADATA_YAML, LATEX_METADATA_YAML] +
    ([REFERENCES_YAML] if uses_references else [])
)

DEPS          = (BOOK_FILE_LIST + BUILD_FILE_DEPS + LOCAL_IMAGES +
                 [PANDOC_FILTER, COMBINED_METADATA])

EPUB_DEPS     = DEPS + [EPUB_METADATA, EPUB_CSS, FONTS_CSS]
HTML_DEPS     = DEPS + [HTML_CSS, FONTS_CSS]
LATEX_DEPS    = DEPS + [LATEX_COVER_PAGE, LATEX_TEMPLATE,
                        LATEX_HEADER, LATEX_METADATA_YAML]
# DOCX_DEPS     = DEPS + [REF_DOCX]
HTML_PDF_DEPS = DEPS + [HTML_PDF_CSS, FONTS_CSS]

PANDOC        = find_in_path("pandoc")

# +RTS and -RTS delimit Haskell runtime options. See
# http://www.haskell.org/ghc/docs/6.12.2/html/users_guide/runtime-control.html
#
# -Ksize sets the stack size. -K10m uses a 10 Mb stack, for instance. The
# default size is 8M.

HASKELL_OPTS = "+RTS -K4096m -RTS"
# HASKELL_OPTS = ""

PANDOC_EXTENSIONS = (
    "line_blocks",
    "escaped_line_breaks",
    "smart",
    "fenced_code_blocks",
    "fenced_code_attributes",
    "backtick_code_blocks",
    "yaml_metadata_block",
    "implicit_figures",
    "tex_math_dollars"
)

INPUT_FORMAT = "markdown+{}".format("+".join(PANDOC_EXTENSIONS))

COMMON_PANDOC_OPTS = (
    f"-f {INPUT_FORMAT} {HASKELL_OPTS} -F {PANDOC_FILTER}" +
    (" -F pandoc-citeproc" if uses_references else "") +
    (f" -F {PLANTUML_FILTER}" if uses_plantuml else "") +
    (" --standalone --mathjax")
)
NON_LATEX_PANDOC_OPTS = f"{COMMON_PANDOC_OPTS} "
LATEX_PANDOC_OPTS = (f"{COMMON_PANDOC_OPTS} --template={LATEX_TEMPLATE} " +
                     f"-t latex -H {LATEX_HEADER} -B {LATEX_COVER_PAGE} " +
                     "--toc")
HTML_PANDOC_OPTS = (f"{NON_LATEX_PANDOC_OPTS} -t html " +
                    f"--css={FONTS_CSS} --css={HTML_CSS} " +
                    f"-H {HTML_HEAD_INCLUDE} " +
                    f"-B {HTML_BODY_INCLUDE}")
EPUB_PANDOC_OPTS = (f"{NON_LATEX_PANDOC_OPTS} -t epub --toc " +
                    "--epub-embed-font=resources/styles/fonts/*.ttf " +
                    f"--epub-chapter-level=1 --css={EPUB_CSS} " +
                    f"--epub-metadata={EPUB_METADATA} "
                    # f"--epub-cover-image={COVER_IMAGE}"
)
# DOCX_PANDOC_OPTS = f"{NON_LATEX_PANDOC_OPTS} -t docx --reference-doc={REF_DOCX}"

HTML_PDF_PANDOC_OPTS = (f"{NON_LATEX_PANDOC_OPTS} -t html " +
                        f"--css={HTML_PDF_CSS} --pdf-engine=weasyprint")

# ---------------------------------------------------------------------------
# Tasks
# ---------------------------------------------------------------------------

DOIT_DB = "doit-db.json"

DEFAULT_TASKS = ["html", "pdf", "epub"] # "docx"

DOIT_CONFIG = {
    "default_tasks": DEFAULT_TASKS,
    "backend": "json",
    "dep_file": DOIT_DB
}

def task_version():
    """
    Display the version of this tooling.
    """
    def run(targets):
        msg(f"eBook generation tooling, version {VERSION}")

    return {
        "actions": [run]
    }

def task_all():
    """
    Convenient way to generate all default book formats.
    """
    return {
        "actions":  [_no_op],
        "task_dep": DEFAULT_TASKS
    }

def task_clobber():
    """
    Convenient way to run: ./build clean -a
    """
    def run(targets):
        sh("./build clean -a")
        rm_f(glob("*.bak"))
        rm_rf("__pycache__")
        rm_rf("lib/__pycache__")
        rm_rf(f"{BOOK_SRC_DIR}__pycache__")
        rm_rf("tmp")

    return {
        "actions": [run]
    }

# html doesn't have coverpage
# HTML_SOURCES = BOOK_FILE_LIST.copy()[2:]

def task_html():
    """
    Generate HTML output.
    """
    def run(targets):
        with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST, divs=True) as files:
            files_str = " ".join(files)
            sh(f"{PANDOC} {HTML_PANDOC_OPTS} -o {targets[0]} {files_str} ")
    return {
        "actions": [run],
        "file_dep": HTML_DEPS,
        "targets": [OUTPUT_HTML],
        "clean":   True
    }

def task_dev():
    """
    Autoreload for book development
    """
    def create_index():
        uris = []
        for p in BOOK_MD_FILES:
            html = os.path.basename(p).replace(".md", ".html")
            uris.append(f"<li><a href=\"{html}\">{html}</a></li>")
        template = '''<!DOCTYPE html>
        <html>
        <head>
        <title>Live Reload Index</title>
        </head>
        <body>
        <ul>%s</ul>
        </body>
        </html>''' %("\n".join(uris))
        with open(os.path.join(TMP_DEV_DIR, "index.html"), "w") as index_html:
            index_html.write(template)
    def render_single_file(p):
        with preprocess_markdown(TMP_DEV_DIR, [p], divs=True, autoremove=False) as files:
            files_str = " ".join(files)
            html = os.path.basename(p).replace(".md", ".html")
            output = os.path.join(TMP_DEV_DIR, html)
            sh(f"{PANDOC} {HTML_PANDOC_OPTS} --metadata-file={TMP_DIR}/metadata.yaml -o {output} {files_str}")
    def render_single_file_closure(p):
        return lambda: render_single_file(p)
    def run(targets):
        server = Server()
        shutil.rmtree(TMP_DEV_DIR, ignore_errors=True)
        os.makedirs(TMP_DEV_DIR, exist_ok=True)
        os.symlink("../../resources", os.path.join(TMP_DEV_DIR, "resources"), target_is_directory=True)
        create_index()
        for p in BOOK_FILE_LIST:
            render_single_file(p)
            server.watch(p, render_single_file_closure(p), delay=2)
        server.serve(port=8080, host='localhost', root=f"{TMP_DEV_DIR}", open_url_delay=1)

    return {
        "actions": [run],
        "clean":   True,
        "task_dep": ["combined_metadata"]
    }

# def task_html_body_include():
#     """
#     Generate the HTML embedded cover image.
#     """
#     def run(targets):
#         import base64
#         with target_dir_for(HTML_BODY_INCLUDE):
#             with open(HTML_BODY_INCLUDE, "w") as out:
#                 with open(COVER_IMAGE, "rb") as img:
#                     image_bytes = img.read()

#                 b64_bytes = base64.encodebytes(image_bytes)
#                 b64_str = "".join(chr(b) for b in b64_bytes).replace("\n", "")
#                 with open(HTML_BODY_INCLUDE_TEMPLATE) as template:
#                     data = {"base64_image": b64_str}
#                     out.write(Template(template.read()).substitute(data))

#     return {
#         "actions":  [run],
#         "file_dep": [COVER_IMAGE, HTML_BODY_INCLUDE_TEMPLATE] + BUILD_FILE_DEPS,
#         "targets":  [HTML_BODY_INCLUDE],
#         "clean":    True
#     }


def task_pdf():
    """
    Generate PDF output.
    """
    def run(targets):
        with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST) as files:
            files_str = " ".join(files)
            target = targets[0]
            sh(f"{PANDOC} {HTML_PDF_PANDOC_OPTS} -o {target} {files_str}")
    return {"actions":  [run],
            "file_dep": HTML_PDF_DEPS,
            "targets":  [OUTPUT_PDF],
            "clean":    True }

def task_latex():
    """
    Generate LaTeX output (for debugging).
    """
    return {
        "actions": [(_latex, [OUTPUT_LATEX])],
        "file_dep": LATEX_DEPS,
        "targets": [OUTPUT_LATEX],
        "clean":   True
    }

def task_json():
    """
    Generate Pandoc AST JSON, pretty-printed (for debugging).
    """
    def run(targets):
        with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST) as files:
            files_str = " ".join(files)
            temp = "_ast.json"
            try:
                sh(f"{PANDOC} {NON_LATEX_PANDOC_OPTS} -o _ast.json -t json " +
                   files_str)
                with open(temp, "r") as f:
                    import json
                    js = json.load(f)
                    with open(targets[0], "w") as out:
                        out.write(json.dumps(js, sort_keys=False, indent=2))
            finally:
                rm_f(temp, silent=True)


    return {
        "actions":  [run],
        "file_dep": HTML_DEPS,
        "targets":  [OUTPUT_JSON],
        "clean":    True
    }

# def task_docx():
#     """
#     Generate MS Word output.
#     """
#     def run(targets):
#         with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST) as files:
#             files_str = " ".join(files)
#             sh(f"{PANDOC} {DOCX_PANDOC_OPTS} -o {targets[0]} {files_str}")

#     return {
#         "actions": [run],
#         "file_dep": DOCX_DEPS,
#         "targets": [OUTPUT_DOCX],
#         "clean":   True
#     }

def task_epub():
    """
    Generate ePub output.
    """

    def run(targets):
        markdown = [f for f in BOOK_FILE_LIST if f.endswith(".md")]
        yamls = [f for f in BOOK_FILE_LIST if f.endswith(".yaml")]
        with preprocess_markdown(TMP_DIR, markdown) as files:
            files_str = " ".join(yamls + files)
            alert("Ignore any Pandoc warnings about 'title' or 'pagetitle'.")
            sh(f"{PANDOC} {EPUB_PANDOC_OPTS} -o {targets[0]} {files_str}")
            fix_epub(epub=targets[0],
                     book_title=metadata["title"],
                     temp_dir=os.path.join(TMP_DIR, "book-epub"))

    return {
        "actions": [run],
        "file_dep": EPUB_DEPS,
        "targets": [OUTPUT_EPUB],
        "clean":   True
    }

# def task_latex_title():
#     """
#     Generate LaTeX title file.
#     """
#     # Note: The following requires a custom LaTeX template with
#     # \usepackage{graphicx} in the preamble.
#     def run(targets):
#         with target_dir_for(LATEX_COVER_PAGE):
#             with open(LATEX_COVER_PAGE_TEMPLATE) as template:
#                 with open(LATEX_COVER_PAGE, "w") as out:
#                     data = {"cover_image": COVER_IMAGE}
#                     out.write(Template(template.read()).substitute(data))

#     return {
#         "actions":  [run],
#         "file_dep": BUILD_FILE_DEPS + [LATEX_COVER_PAGE_TEMPLATE, COVER_IMAGE],
#         "targets":  [LATEX_COVER_PAGE],
#         "clean":    True
#     }

def task_combined_metadata():
    """
    Generate the consolidated metadata file.
    """
    def run(targets):
        target = targets[0]
        with target_dir_for(target):
            with open(target, "w") as out:
                for f in METADATA_DEPS:
                    if not os.path.exists(f):
                        continue

                    out.write("---\n")
                    with codecs.open(f, "r", encoding="UTF-8") as input:
                        for line in input.readlines():
                            out.write(line)
                    out.write("...\n\n")

                # Special cases. Put these at the bottom. Pandoc will
                # ignore them if they"re already specified (i.e., first one
                # wins, according to the Pandoc documentation).

                out.write("---\n")
                language = metadata.get("language", "en-US")
                out.write("lang: {}\n".format(language.split("-")[0]))
                out.write("...\n\n")

    return {
        "actions":  [run],
        "file_dep": BUILD_FILE_DEPS + METADATA_DEPS,
        "targets":  [COMBINED_METADATA],
        "clean":    True
    }

def task_epub_metadata():
    """
    Generate the ePub metadata file.
    """
    def run(targets):
        import io
        with open(targets[0], "w") as out:
            with open(EPUB_METADATA_TEMPLATE, "r") as input:
                template = "".join(input.readlines())

            identifier = metadata.get("identifier", {}).get("text", "")
            scheme = metadata.get("identifier", {}).get("scheme", "")
            copyright = metadata["copyright"]
            data = {
                "identifier":        identifier,
                "identifier_scheme": scheme,
                "copyright_owner":   copyright["owner"],
                "copyright_year":    copyright["year"],
                "publisher":         metadata["publisher"],
                "language":          metadata.get("language", "en-US"),
                "genre":             metadata.get("genre", "")
            }
            sbuf = io.StringIO(Template(template).substitute(data))
            for line in sbuf.readlines():
                if not identifier and line.strip().startswith("<dc:identifier"):
                    continue
                out.write(line)

    return {
        "actions":  [run],
        "file_dep": ([EPUB_METADATA_TEMPLATE, COMBINED_METADATA] +
                     BUILD_FILE_DEPS),
        "targets":  [EPUB_METADATA],
        "clean":    True
    }

def task_combined():
    """
    Generated one big combined Markdown file (for debugging).
    """
    def run(targets):
        target = targets[0]
        msg(f"Generating {target}.")

        with target_dir_for(target):
            with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST) as files:
                with open(target, "w") as out:
                    for f in files:
                        with open(f, "r") as input:
                            copyfileobj(input, out)

    return {
        "actions":  [run],
        "file_dep": DEPS,
        "targets":  [os.path.join(TMP_DIR, "temp.md")],
        "clean":    True
    }

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def _latex(target):
    with preprocess_markdown(TMP_DIR, BOOK_FILE_LIST) as files:
        files_str = " ".join(files)
        sh(f"pandoc {LATEX_PANDOC_OPTS} -o {target} {files_str}")


def _no_op(targets):
    pass

def _check_pandoc():
    import subprocess
    with subprocess.Popen((f"{PANDOC}", "--version"),
                          stdout=subprocess.PIPE,
                          encoding="ascii") as p:
        stdout, _ = p.communicate()

    version_pat = re.compile(r"^\s*pandoc\s+(\d+\.\d+[\d.]*).*$")
    version = None
    for l in stdout.split("\n"):
        m = version_pat.search(l)
        if m:
            version = m.group(1).split(".")
            break

    if (version is None) or (len(version) < 2):
        raise Exception("Unable to determine pandoc version.")

    version = tuple(int(v) for v in version)
    if version[0:2] < (2, 7):
        raise Exception(
            "Pandoc version is {0}. Version 2.0.4 or newer is required.".format(
                ".".join([str(i) for i in version])
            )
        )

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import doit
    _check_pandoc()
    doit.run(globals())
