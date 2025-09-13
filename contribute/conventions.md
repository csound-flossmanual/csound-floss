# Conventions for contributions

## Image names

Name images starting with section number (00, 01, ...) and chapter (a, b, ...)
before the name. Substitute spaces and slashes by minus.

For instance:

    04-d-flowchart-fm.png

for the figure "flowchart fm.png" in the chapter "D. FREQUENCY MODULATION" in the
section "04 SOUND SYNTHESIS".

## Image sources

If possible, put a source file for the generated figure with the same name in
resources/image_sources

## Code examples

_Full_ .csd examples must be enclosed by three backticks:

<pre>```</pre>

and _not_ indented.

If playback of the csd example is desired, you can add the keyword 'csound'
immedietly after the three backticks:

<pre>```csound</pre>

Remember to close the example with three backticks followed by a newline:

<pre>```</pre>

If playback is not desired, the following tags will highlight the csound code
without a wasm playback engine. Pick the one depending on the snippet type.

<pre>```csd</pre>
<pre>```orc</pre>
<pre>```sco</pre>

Few additional languages are supported

<pre>```python</pre>
<pre>```c</pre>

The full examples (which are collected and distributed separately) must be
preceded by four hashes(\#) a number and a title of the example,
starting with the word EXAMPLE (\#\#\#\# \*\*EXAMPLE\*\*):

<pre>#### _EXAMPLE 16D01_different_seed.csd_</pre>

_Small_ example snippets must be _indented by four spaces_.

Make sure that the examples marked as **full** are **executable out of the box**. If not, format them
as _small_ examples. (For instance, the example at the end of chapter 13A is formatted as _small_ because it requires to build the plugin opcode first.)

See [writing-in-markdown.txt](writing-in-markdown.txt) for more details.

## Run `yarn prettify`

Run `yarn prettify` before you add/commit your changes. If there is a
terrible issue which our master (H.S.) cannot solve, you may prevent
[prettier](https://prettier.io) from crushing things which work by using
`<!-- prettier-ignore -->`. See
[prettier markdown explanations](https://prettier.io/docs/en/ignore.html#markdown)
for more.
