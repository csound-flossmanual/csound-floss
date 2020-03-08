15 B. GLOSSARY
==============

Math Symbols
------------

**Multiplication** in formulars is usually denoted with the dot operator:

$2 \cdot 3 = 6$

In text, the `*` is also used (as in Csound and other programming languages), or with the cross `x`.

**Proportionality** is written as: $\propto$.


Csound Terms
------------

**control cycle**, **control period** or **k-loop** is a pass during the
performance of an instrument, in which all k- and a-variables are
renewed. The time for one control cycle is measured in samples and
determined by the [ksmps](https://csound.com/docs/manual/ksmps.html)
constant in the orchestra header. If your sample rate is 44100 and your
ksmps value is 10, the time for one control cycle is 1/4410 = 0.000227
seconds. See the chapter about [Initialization And Performance
Pass](http://en.flossmanuals.net/bin/view/Csound/InitAndPerfPass) for
more information.



**control rate** or **k-rate**
([kr](https://csound.com/docs/manual/kr.html)) is the number of
control cycles per second. It can be calculated as the relationship of
the sample rate [sr](https://csound.com/docs/manual/sr.html) and the
number of samples in one control period
[ksmps](https://csound.com/docs/manual/ksmps.html). If your sample
rate is 44100 and your ksmps value is 10, your control rate is 4410, so
you have 4410 control cycles per second.



**dummy f-statement** see **f-statement**



**f-statement** or **function table statement** is a score line which
starts with a \"f\" and generates a function table. See the chapter
about [function
tables](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES) for
more information. A **dummy f-statement** is a statement like \"f 0
3600\" which looks like a function table statement, but instead of
generating any table, it serves just for running Csound for a certain
time (here 3600 seconds = 1 hour).





**FFT** Fast Fourier Transform is a system whereby audio data is stored
or represented in the frequency domain as opposed to the time domain as
amplitude values as is more typical. Working with FFT data facilitates
transformations and manipulations that are not possible, or are at least
more difficult, with audio data stored in other formats.





**GEN rountine** a GEN (generation) routine is a mechanism within Csound
used to create function tables of data that will be held in RAM for all
or part of the performance. A GEN routine could be a waveform, a stored
sound sample, a list of explicitly defined number such as tunings for a
special musical scale or an amplitude envelope. In the past function
tables could only be created only in the Csound score but now they can
also be created (and deleted and over-written) within the orchestra.



**GUI** Graphical User Interface refers to a system of on-screen
sliders, buttons etc. used to interact with Csound, normally in
realtime.



**i-time** or **init-time** or **i-rate** signify the time in which all
the variables starting with an \"i\" get their values. These values are
just given once for an instrument call. See the chapter about
[Initialization And Performance
Pass](http://en.flossmanuals.net/bin/view/Csound/InitAndPerfPass) for
more information.



**k-loop** see **control cycle**



**k-time** is the time during the performance of an instrument, after
the initialization. Variables starting with a \"k\" can alter their
values in each -\>control cycle. See the chapter about [Initialization
And Performance
Pass](http://en.flossmanuals.net/bin/view/Csound/InitAndPerfPass) for
more information.



**k-rate** see **control rate**





**opcode** the code word of a basic building block with which Csound
code is written. As well as the opcode code word an opcode will commonly
provide output arguments (variables), listed to the left of the opcode,
and input arguments (variables). listed to the right of the opcode. An
opcode is equivalent to a \'ugen\' (unit generator) in other languages.



**orchestra** as in the Csound orchestra, is the section of Csound code
where traditionally the instruments are written. In the past the
\'orchestra\' was one of two text files along with the \'score\' that
were needed to run Csound. Most people nowadays combine these two
sections, along with other optional sections in a .csd (unified) Csound
file. The orchestra will also normally contain header statements which
will define global aspects of the Csound performance such as sampling
rate.



**p-field** a \'p\' (parameter) field normally refers to a value
contained within the list of values after an event item with the Csound
score.



**performance pass** see **control cycle**



**score** as in the Csound score, is the section of Csound code where
note events are written that will instruct instruments within the Csound
orchestra to play. The score can also contain function tables. In the
past the \'score\' was one of two text files along with the
\'orchestra\' that were needed to run Csound. Most people nowadays
combine these two sections, along with other optional sections in a .csd
(unified) Csound file.



**time stretching** can be done in various ways in Csound. See
[sndwarp](https://csound.com/docs/manual/sndwarp.html),
[waveset](https://csound.com/docs/manual/waveset.html),
[pvstanal](https://csound.com/docs/manual/pvstanal.html)
[mincer](https://csound.com/docs/manual/mincer.html),
[pvsfread](https://csound.com/docs/manual/pvsfread.html),
[pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) and the
Granular Synthesis opcodes.





**widget** normally refers to some sort of standard GUI element such as
a slider or a button. GUI widgets normally permit some user
modifications such as size, positioning colours etc. A variety options
are available for the creation of widgets usable by Csound, from it own
built-in FLTK widgets to those provided by front-ends such as CsoundQt,
Cabbage and Blue.


