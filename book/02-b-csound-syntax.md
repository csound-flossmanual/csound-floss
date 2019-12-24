02 B. CSOUND SYNTAX
===================

This chapter is a brief introduction about how to write Csound code. For a detailed discussion of Csound Syntax see section 3 of this manual.

Orchestra and Score
-------------------

In Csound, you must define *instruments*, which are units which *do
things*, for instance creating a sine wave as audio signal and play it
(= output it to the audio card). These instruments must be called or
*turned on* by a *score*. The Csound *score* is a list of events
which describe how the instruments are to be played in time. It can be
thought of as a timeline in text.

A Csound instrument is contained within an Instrument Block, which
starts with the keyword
[instr](http://csound.github.io/docs/manual/html/instr.html) and
ends with the keyword
[endin](http://csound.github.io/docs/manual/html/endin.html).
All instruments are given a number (or a name) to identify them.

    instr 1
     ... instrument instructions come here...
    endin

Score events in Csound are individual text lines, which can turn on
instruments for a certain time. For example, to turn on instrument 1, at
time 0, for 2 seconds you will use:

    i 1 0 2

Note that orchestra and score are two completely different types of
code. The orchestra contains the actual Csound code.[^1] The instruments
are written in the Csound Programming Language. The score is mainly a
list of events. The Score Language is poor and offers only some very
basic tools.

In modern Csound code, the score often remains empty. The events derive
from orchestra code,[^2] or from real-time interaction, like MIDI, OSC,
mouse clicks or any other live input.

The Csound Document Structure
-----------------------------

A Csound document is structured into three main sections:

-   **CsOptions**: Contains the configuration options for Csound. For
    example using *-o dac* in this section will make Csound run in
    real-time instead of writing a sound file.
-   **CsInstruments**: Contains the instrument definitions and
    optionally some global settings and definitions like sample rate,
    etc.
-   **CsScore**: Contains the score events which trigger the
    instruments.

Each of these sections is opened with a \<xyz\> tag and closed with a
\</xyz\> tag. Every Csound file starts with the \<CsoundSynthesizer\>
tag, and ends with \</CsoundSynthesizer\>. Only the text in-between will
be used by Csound.

   ***EXAMPLE 02B01\_DocStruct.csd***

~~~
<CsoundSynthesizer>; START OF A CSOUND FILE

<CsOptions> ; CSOUND CONFIGURATION
-odac
</CsOptions>

<CsInstruments> ; INSTRUMENT DEFINITIONS GO HERE

; Set the audio sample rate to 44100 Hz
sr = 44100

instr 1
; a 440 Hz Sine Wave
aSin      poscil    0dbfs/4, 440
          out       aSin
endin
</CsInstruments>

<CsScore> ; SCORE EVENTS GO HERE
i 1 0 1
</CsScore>

</CsoundSynthesizer> ; END OF THE CSOUND FILE
; Anything after a semicolon is ignored by Csound
~~~

Comments, which are lines of text that Csound will ignore, are started
with the \";\" character or two slashes \"//\". Multi-line comments can
be made by encasing them between \"/\*\" and  \"\*/\".

Opcodes
-------

*Opcodes* or *Unit generators* are the basic building blocks of
Csound. Opcodes can do many things like produce oscillating signals,
filter signals, perform mathematical functions or even turn on and off
instruments. Opcodes, depending on their function, will take inputs and
outputs. Each input or output is called, in programming terms, an
*argument*. Opcodes always take input arguments on the right and
output their results on the left, like this:

    output    OPCODE    input1, input2, input3, .., inputN

For example the
[poscil](http://csound.github.io/docs/manual/html/poscil.html)
opcode has two mandatory inputs: amplitude and frequency, and
produces a sine wave signal:

    aSin      poscil    0dbfs/4, 440

In this case, a 440 Hertz oscillation with an amplitude of *0dbfs/4* (a
quarter of 0 dB as full scale) will be created and its output will be
stored in a container called *aSin*. The order of the arguments is
important: the first input to *poscil* will always be amplitude and the
second input will always be read by Csound as frequency.

Since Csound6, the code can be written in a way which is knows from many
other programming languages:

    aSin = poscil(0dbfs/4,440)

Many opcodes include optional input arguments and occasionally optional
output arguments. These will always be placed after the essential
arguments. In the Csound Manual documentation they are indicated using
square brackets \"\[\]\". If optional input arguments are omitted they
are replaced with the default values indicated in the Csound Manual. The
addition of optional output arguments normally initiates a different
mode of that opcode: for example, a stereo as opposed to mono version of
the opcode.

Variables
---------

A variable is a named container. It is a place to store things like
signals or values from where they can be recalled by using their name.
In Csound there are various types of variables. The easiest way to deal
with variables when getting to know Csound is to imagine them as cables.

If you want to patch this together:

  Sound Generator -\> Filter -\> Output,

you need two cables, one going out from the generator into the filter
and one from the filter to the output. The cables carry audio signals,
which are variables beginning with the letter **a**.

    aSource    buzz       0.8, 200, 10, 1
    aFiltered  moogladder aSource, 400, 0.8
               out        aFiltered

In the example above, the
[buzz](http://csound.github.io/docs/manual/html/buzz.html)
opcode produces a complex waveform as signal *aSource*. This signal is
fed into the
[moogladder](http://csound.github.io/docs/manual/html/moogladder.html)
opcode, which in turn produces the signal *aFiltered*. The
[out](http://csound.github.io/docs/manual/html/out.html) opcode
takes this signal, and sends it to the output whether that be to the
speakers or to a rendered file.

Other common variable types are **k** variables which store control
signals, which are updated less frequently than audio signals, and **i**
variables which are constants within each instrument note.

You can find more information about variable types in chapter
[03 B](03-b-local-and-global-variables.md) in this manual, or
[here](http://csoundjournal.com/issue10/CsoundRates.html) in the
Csound Journal.

Using the Manual
----------------

The [Csound Reference
Manual](http://csound.github.io/docs/manual/index.html) is a
comprehensive source regarding Csound's syntax and opcodes. All opcodes
have their own manual entry describing their syntax and behavior, and
the manual contains a detailed reference on the Csound language and
options.

In [CsoundQt](http://csoundqt.github.io) you can find
the Csound Manual in the Help Menu. You can quickly go to a particular
opcode entry in the manual by putting the cursor on the opcode and
pressing Shift+F1. [WinXsound](http://winxound.codeplex.com) ,
[Cabbage](http://cabbageaudio.com/) and
[Blue](http://blue.kunstmusik.com/) also provide easy access to
the manual.

[^1]:  Its characteristics are described in detail in section 03 CSOUND
    LANGUAGE.
[^2]:  For instance using the schedule or event
    opcode.
