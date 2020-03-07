WRITING IN MARKDOWN
===================

We use Pandoc Markdown here. For a full description,
see https://pandoc.org/MANUAL.html#pandocs-markdown or
https://rmarkdown.rstudio.com/authoring_pandoc_markdown.html%23raw-tex#pandoc_markdown

For anyone who writes on this book, these features are in particular important:

# 1. HEADINGS
   
`level one heading`
`=================`

is preferred but

`# level one heading`

is also possible.

`level two heading`
`-----------------`

is preferred but

`## level two heading`

is also possible.

`### level three heading`
`#### level four heading`

gets

### level three heading
#### level four heading


# 2. ITALICS

please use `*this*` not `_that_`


3. BOLD
=======

please usw `**this**` not `__that__`


4. CODE EXAMPLES
================

a) full .csd examples
---------------------

MUST be written as fenced code: three `~~~` before and after:

    ~~~
    <CsoundSynthesizer>
    ...
    </CsoundSynthesizer>
    ~~~

NOTE **that this is for examples which can be extracted and played
as they are** (no requirement except files in resources/SourceMaterials)


b) other code snippets
----------------------

are preceded by four spaces:

&nbsp;&nbsp;&nbsp;&nbsp;this is a small code snippet

gets

    this is a small code snippet


c) code snippets inside normal text
-----------------------------------

this is an `inside code snippet` which must by surronded by backticks \`.

    
5. IMAGES
=========

this is the way an image is specified with caption and resizing:

    ![my caption](../resources/images/01-a-my-image.png){width=50%}

- avoid underscore `_`, use minus `-` instead
- alway start with the section-chapter 
- caption and resizing are optional


6. FOOTNOTES
============

inside the text use `[^1]` for the first footnote in the chapter.
    
the footnote itself is then written below the paragraph preceded 
by a newline as:

    [^1]: this is the footnote text
          and this is the text continued


7. MATH FORMULAS
================

are written in [tex math](https://en.wikibooks.org/wiki/LaTeX/Mathematics), surrounded by dollar signs `$` in the text, or by two dollar signs `$$` for paragraphs.

here are some tex math examples from <https://github.com/kikofernandez/pandoc-examples/blob/master/math/math.tex#L1>

    $a^2 + b^2 = c^2$
    $v(t) = v_0 + \frac{1}{2}at^2$
    $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$
    $\exists x \forall y (Rxy \equiv Ryx)$
    $p \wedge q \models p$
    $\Box\diamond p\equiv\diamond p$
    $\int_{0}^{1} x dx = \left[ \frac{1}{2}x^2 \right]_{0}^{1} = \frac{1}{2}$
    $e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = \lim_{n\rightarrow\infty} (1+x/n)^n$

![](../resources/images/tex_math_examples.png)
