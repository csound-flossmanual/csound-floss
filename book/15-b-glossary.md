# 15 B. GLOSSARY

## Math Symbols

**Multiplication** in formulars is usually denoted with the dot operator:

$2 \cdot 3 = 6$

In text, the `*` is also used (as in Csound and other programming languages), or with the cross `x`.

**Proportionality** is written as: $\propto$.

## Csound Terms

**block size** is the number of samples which are processed as vector or "block". In Csound, we usually speak
of [ksmps](https://csound.com/docs/manual/ksmps.html): The number of samples in one control period.

**control cycle**, **control period** or **k-loop** is a pass during the
performance of an instrument, in which all k- and a-variables are
renewed. The time for one control cycle is measured in samples and
determined by the [ksmps](https://csound.com/docs/manual/ksmps.html)
&nbsp;constant in the orchestra header. For a sample rate of 44100 Hz and a
ksmps value of 32, the time for one control cycle is 32/44100 = 0.000726
seconds. See the chapter about&nbsp;
[Initialization And Performance Pass](03-a-initialization-and-performance-pass.md) for a detailed discussion.

**control rate** or **k-rate**
&nbsp;([kr](https://csound.com/docs/manual/kr.html)) is the number of
control cycles per second. It can be calculated as the relationship of
the sample rate [sr](https://csound.com/docs/manual/sr.html) and the
number of samples in one control period [ksmps](https://csound.com/docs/manual/ksmps.html).
For a sample rate of 44100 Hz and a ksmps value of 32, the control rate is 1378.125,
so 1378.125 control cycles will be performed in one second.
(Note that this value is not necessarily an integer, whilst ksmps is always an integer.)

**.csd file** is a text file containing a Csound program to be compiled and run by Csound.
This file format contains several sections or _tags_ (similar to XML or HTML),
amongst them the _CsOptions_ (Csound options),
the _CsInstruments_ (a collection of the Csound instruments)
and the _CsScore_ (the Csound score).

**DSP** means _Digital Signal Processing_ and is used as a
general term to describe any modification we apply on sounds in the digital domain.

**f-statement** or **function table statement** is a score line which
starts with \"f\" and generates a function table. See the chapter
about [function tables](03-d-function-tables.md) for
more information. A **dummy f-statement** is a statement like \"f 0
3600\" which looks like a function table statement, but instead of
generating any table, it serves just for running Csound for a certain
time (here 3600 seconds = 1 hour). (This is usually not any more required since Csound now runs "endless" with empty score.)

**frequency domain** means to look at a signal considering its frequency components.
The mathematical procedure to transform a time-domain signal into frequency-domain is
called ""Fourier Transform\*\*. See the chapters about [Additive Synthesis](04-a-additive-synthesis.md) and
about [Spectral Processing](05-i-fourier-analysis-spectral-processing.md).

**functional style** is a way of coding where a function is written and the arguments of
the function following in parentheses behind.
Traditionally, Csound uses another convention to write code,
but since Csound 6 functional style can be used as well.
See the [functional syntax](03-i-functional-syntax.md) chapter for more information.

**GEN routine** is a subroutine which generates a **function table** (mostly called _buffer_ in other
audio programming languages).
GEN Routines are very different; they can load a sound file (GEN01),
create segmented lines (GEN05 and others), composite waveforms (GEN10 and others),
window functions (GEN20) or random distributions (GEN40). See the chapter about&nbsp;
[function tables](03-d-function-tables.md) and the&nbsp;
[Gen Routines Overview](https://csound.com/docs/manual/ScoreGenRef.html) in the Csound Manual.

**GUI** Graphical User Interface refers to a system of on-screen
sliders, buttons etc. used to interact with Csound, normally in
real-time.

**i-time** or **init-time** or **i-rate** denotes the moment in which an instrument instance is initialized. In this initialization all variables starting with an \"i\" get their values. These values are
just given once for an instrument call. See the chapter about&nbsp;
[Initialization And Performance Pass](03-a-initialization-and-performance-pass.md) for more information.

**k-loop** see **control cycle**

**k-time** is the time during the performance of an instrument, after
the initialization. Variables starting with a \"k\" can alter their
values in each control cycle. See the chapter about&nbsp;
[Initialization And Performance Pass](03-a-initialization-and-performance-pass.md) for more information.

**k-rate** see **control rate**

**opcode** is a basic unit in Csound to perform any job,
for instance generate noise, read an audio file, create an envelope or oscillate through a table.
In other audio programming languages it is called UGen (Unit Generator) or object.
An opcode can also be compared to a build-in function (e.g. in Python),
whereas a User Defined Opcode (UDO) can be compared to a function which is written by the user.
For an overview, see the [Opcode Guide](15-a-opcode-guide.md).

**options** comprised as **csound options** and also called **command line flags** contain
important decisions about how Csound has to run a _.csd_ file.
The _-o_ option, for instance, tells Csound whether to output audio in realtime to the audio card,
or to a sound file instead.
See the [overiew in the Csound Manual](https://csound.com/docs/manual/CommandFlagsCategory.html) for
a detailed list of these options. Options are usually specified in the _CsOptions_ tag of a _.csd_ file.
Modern frontends mostly pass the options to Csound via their settings.

**orchestra** is a collection of Csound instruments in a program, or referring to the _.csd_ file,
the _CsInstruments_ tag. The term is somehow outdated,
as it points to the early years of Csound where an _.orc_ file was separated from
the _.sco_ (score) file.

**p-field** refers to the _score_ section of a _.csd_ file.
A _p-field_ can be compared to a column in a spread sheet or table.
An instrument, called by a line of score, receives any _p-field_ parameter
as _p1_, _p2_ etc: _p1_ will receive the parameter of the first
column, _p2_ the parameter of the second column, and so on.

**performance pass** see **control cycle**

**score** as in the Csound score, is the section of Csound code
where events are written in the score language (which is completely different from
the Csound orchestra language).
The main events are _instrument_ event, where each line starts with
the character **i**. Another type of events is the **f** event which creates a function table.
In modern Csound usage the score can be omitted,
as all score jobs can also be done from inside the Csound instruments.
See the [score chapter](14-a-methods-of-writing-csound-scores.md) for more information.

**time domain** means to look at a signal considering the changes of amplitudes over time.
It is the common way to plot audio signals (time as x-axis, amplitudes as y-axis).

**time stretching** can be done in various ways in Csound. See&nbsp;
[filescal](https://csound.com/docs/manual/filescal.html),&nbsp;
[sndwarp](https://csound.com/docs/manual/sndwarp.html),&nbsp;
[waveset](https://csound.com/docs/manual/waveset.html),&nbsp;
[pvstanal](https://csound.com/docs/manual/pvstanal.html),&nbsp;
[mincer](https://csound.com/docs/manual/mincer.html),&nbsp;
[pvsfread](https://csound.com/docs/manual/pvsfread.html),&nbsp;
[pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) and the
Granular Synthesis opcodes.

**UDO** or User-Defined Opcode is the definition of an opcode written in the Csound language itself.
See the [UDO chapter](03-g-user-defined-opcodes.md) for more information.

**widget** normally refers to some sort of standard GUI element such as
a slider or a button. GUI widgets normally permit some user
modifications such as size, positioning colours etc. A variety of options
are available for the creation of widgets usable by Csound, from its own
built-in FLTK widgets to those provided by front-ends such as CsoundQt,
Cabbage and Blue.
