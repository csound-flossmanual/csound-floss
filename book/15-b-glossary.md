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

**block size** is the number of samples which are processed as vector or "block". In Csound, we usually speak of [ksmps](https://csound.com/docs/manual/ksmps.html): The number of samples in one control period.

**control cycle**, **control period** or **k-loop** is a pass during the
performance of an instrument, in which all k- and a-variables are
renewed. The time for one control cycle is measured in samples and
determined by the [ksmps](https://csound.com/docs/manual/ksmps.html)
constant in the orchestra header. For a sample rate of 44100 Hz and a
ksmps value of 32, the time for one control cycle is 32/44100 = 0.000726
seconds. See the chapter about [Initialization And Performance
Pass](03-a-initialization-and-performance-pass.md) for a detailed discussion.

**control rate** or **k-rate**
([kr](https://csound.com/docs/manual/kr.html)) is the number of
control cycles per second. It can be calculated as the relationship of
the sample rate [sr](https://csound.com/docs/manual/sr.html) and the
number of samples in one control period
[ksmps](https://csound.com/docs/manual/ksmps.html). For a sample rate of 44100 Hz and a ksmps value of 32, the control rate is 1378.125, so 1378.125 control cycles will be performed in one second. (Note that this value is not necessarily an integer, whilst ksmps is always an integer.)

**f-statement** or **function table statement** is a score line which
starts with \"f\" and generates a function table. See the chapter
about [function tables](03-d-function-tables.md) for
more information. A **dummy f-statement** is a statement like \"f 0
3600\" which looks like a function table statement, but instead of
generating any table, it serves just for running Csound for a certain
time (here 3600 seconds = 1 hour). (This is usually not any more required since Csound 6 runs "endless" with empty score.)

**DSP**

**Frequency Domain** is the look at a signal considering its frequency components. The mathematical procedure to transform a time-domain signal into frequency-domain is called ""Fourier Transform**. See the chapters about [Additive Synthesis](04-a-additive-synthesis.md) and about 
[Spectral Processing](05-i-fourier-analysis-spectral-processing.md).

**GEN routine** is a subroutine which generates a **function table** (mostly called buffer in other audio programming languages). GEN Routines are very different; they can load a sound file (GEN01), create segmented lines (GEN05 and others), composite waveforms (GEN10 and others), window functions (GEN20) or random distributions (GEN40). See the chapter about 
[function tables](03-d-function-tables.md) and the
[Gen Routines Overview](https://csound.com/docs/manual/ScoreGenRef.html) in the Csound Manual.

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


