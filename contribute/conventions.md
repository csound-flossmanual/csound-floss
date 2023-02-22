Conventions for contributions
=============================

Image names
-----------

Name images starting with section number (00, 01, ...) and chapter (a, b, ...)
before the name. Substitute spaces and slashes by minus.

For instance:

    04-d-flowchart-fm.png

for the figure "flowchart fm.png" in the chapter "D. FREQUENCY MODULATION" in the 
section "04 SOUND SYNTHESIS".

Image sources
-------------

If possible, put a source file for the generated figure with the same name in
resources/image_sources


Code examples
-------------

*Full* .csd examples must be enclosed by three tildes:  

`~~~`  

and *not* indented.  

They must be preceded by a number and a title of the example,
starting with the word **EXAMPLE**.

*Small* example snippets must be *indented by four spaces*.

Make sure that the examples marked as **full** are **executable out of the box**. If not, format them as *small* examples. (For instance, the example at the end of chapter 13A is formatted as *small* because it requires to build the plugin opcode first.)

See [writing-in-markdown.txt](writing-in-markdown.txt) for more details.


Run `yarn prettify`
-------------------

Run `yarn prettify` before you add/commit your changes. If there is a
terrible issue which our master (H.S.) cannot solve, you may prevent
[prettier](https://prettier.io) from crushing things which work by using
`<!-- prettier-ignore -->`. See 
[prettier markdown explanations](https://prettier.io/docs/en/ignore.html#markdown)
for more.
