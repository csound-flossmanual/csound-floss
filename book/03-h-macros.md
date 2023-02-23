# 03 H. MACROS

Macros within Csound provide a mechanism whereby a line or a block of
code can be referenced using a macro codeword. Whenever the user-defined
macro codeword for that block of code is subsequently encountered in a
Csound orchestra or score it will be replaced by the code text contained
within the macro. This mechanism can be extremely useful in situations
where a line or a block of code will be repeated many times - if a
change is required in the code that will be repeated, it need only be
altered once in the macro definition rather than having to be edited in
each of the repetitions.

Csound utilises a subtly different mechanism for orchestra and score
macros so each will be considered in turn. There are also additional
features offered by the macro system such as the ability to create a
macro that accepts arguments - which can be thought of as the main macro
containing sub-macros that can be repeated multiple times within the
main macro - the inclusion of a block of text contained within a
completely separate file and other macro refinements.

It is important to realise that a macro can contain any text, including
carriage returns, and that Csound will be ignorant to its use of syntax
until the macro is actually used and expanded elsewhere in the orchestra
or score. Macro expansion is a feature of the orchestra and score preprocessor
and is not part of the compilation itself.

### Orchestra Macros

Macros are defined using the syntax:

    #define NAME # replacement text #

_NAME_ is the user-defined name that will be used to call the macro
at some point later in the orchestra; it must begin with a letter but
can then contain any combination of numbers and letters. A limited range
of special characters can be employed in the name. Apostrophes, hash
symbols and dollar signs should be avoided. _replacement text_,
bounded by hash symbols will be the text that will replace the macro
name when later called. Remember that the replacement text can stretch
over several lines. A macro can be defined anywhere within the
_\<CsInstruments\> ... \</CsInstruments\>_ sections of a .csd file. A macro
can be redefined or overwritten by reusing the same macro name in
another macro definition. Subsequent expansions of the macro will then
use the new version.

To expand the macro later in the orchestra the macro name needs to be
preceded with a _$_ symbol thus:

      $NAME

The following example illustrates the basic syntax needed to employ
macros. The name of a sound file is referenced twice in the score so it
is defined as a macro just after the header statements. Instrument 1
derives the duration of the sound file and instructs instrument 2 to
play a note for this duration. Instrument 2 plays the sound file. The
score as defined in the _\<CsScore\> ... \</CsScore\>_ section only lasts for
0.01 seconds but the _event_i_ statement in instrument 1 will extend this
for the required duration. The sound file is a mono file so you can
replace it with any other mono file.

#### **_EXAMPLE 03H01_Macros_basic.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       16
nchnls  =       1
0dbfs   =       1

; define the macro
#define SOUNDFILE # "loop.wav" #

 instr  1
; use an expansion of the macro in deriving the duration of the sound file
idur  filelen   $SOUNDFILE
      event_i   "i",2,0,idur
 endin

 instr  2
; use another expansion of the macro in playing the sound file
a1  diskin2  $SOUNDFILE,1
    out      a1
 endin

</CsInstruments>
<CsScore>
i 1 0 0.01
e
</CsScore>
</CsoundSynthesizer>
; example written by Iain McCurdy
```

In more complex situations where we require slight variations, such as
different constant values or different sound files in each reuse of the
macro, we can use a macro with arguments. A macro's arguments are
defined as a list of sub-macro names within brackets after the name of
the primary macro with each macro argument being separated using an
apostrophe as shown below.

    #define NAME(Arg1'Arg2'Arg3...) # replacement text #

Arguments can be any text string permitted as Csound code, they should
not be likened to opcode arguments where each must conform to a certain
type such as i, k, a etc. Macro arguments are subsequently referenced in
the macro text using their names preceded by a _$_ symbol. When the
main macro is called later in the orchestra its arguments are then
replaced with the values or strings required. The Csound Reference
Manual states that up to five arguments are permitted but this still
refers to an earlier implementation and in fact many more are actually
permitted.

In the following example a 6 partial additive synthesis engine with a
percussive character is defined within a macro. Its fundamental
frequency and the ratios of its six partials to this fundamental
frequency are prescribed as macro arguments. The macro is reused within
the orchestra twice to create two different timbres, it could be reused
many more times however. The fundamental frequency argument is passed to
the macro as p4 from the score.

#### **_EXAMPLE 03H02_Macro_6partials.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       16
nchnls  =       1
0dbfs   =       1

gisine  ftgen  0,0,2^10,10,1

; define the macro
#define ADDITIVE_TONE(Frq'Ratio1'Ratio2'Ratio3'Ratio4'Ratio5'Ratio6) #
iamp =      0.1
aenv expseg  1,p3*(1/$Ratio1),0.001,1,0.001
a1  poscil  iamp*aenv,$Frq*$Ratio1,gisine
aenv expseg  1,p3*(1/$Ratio2),0.001,1,0.001
a2  poscil  iamp*aenv,$Frq*$Ratio2,gisine
aenv expseg  1,p3*(1/$Ratio3),0.001,1,0.001
a3  poscil  iamp*aenv,$Frq*$Ratio3,gisine
aenv expseg  1,p3*(1/$Ratio4),0.001,1,0.001
a4  poscil  iamp*aenv,$Frq*$Ratio4,gisine
aenv expseg  1,p3*(1/$Ratio5),0.001,1,0.001
a5  poscil  iamp*aenv,$Frq*$Ratio5,gisine
aenv expseg  1,p3*(1/$Ratio6),0.001,1,0.001
a6  poscil  iamp*aenv,$Frq*$Ratio6,gisine
a7  sum     a1,a2,a3,a4,a5,a6
    out     a7
#

 instr  1 ; xylophone
; expand the macro with partial ratios that reflect those of a xylophone
; the fundemental frequency macro argument (the first argument -
; - is passed as p4 from the score
$ADDITIVE_TONE(p4'1'3.932'9.538'16.688'24.566'31.147)
 endin

 instr  2 ; vibraphone
$ADDITIVE_TONE(p4'1'3.997'9.469'15.566'20.863'29.440)
 endin

</CsInstruments>
<CsScore>
i 1 0  1 200
i 1 1  2 150
i 1 2  4 100
i 2 3  7 800
i 2 4  4 700
i 2 5  7 600
e
</CsScore>
</CsoundSynthesizer>
; example written by Iain McCurdy
```

### Score Macros

Score macros employ a similar syntax. Macros in the score can be used in
situations where a long string of p-fields are likely to be repeated or,
as in the next example, to define a palette of score patterns that
repeat but with some variation such as transposition. In this example
two _riffs_ are defined which each employ two macro arguments: the
first to define when the riff will begin and the second to define a
transposition factor in semitones. These riffs are played back using a
bass guitar-like instrument using the [wgpluck2](http://www.csound.com/docs/manual/wgpluck2.html) opcode.
Remember that mathematical expressions within the Csound score must be
bound within square brackets `[]`.

#### **_EXAMPLE 03H03_Score_macro.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       16
nchnls  =       1
0dbfs   =       1


 instr  1 ; bass guitar
a1   wgpluck2 0.98, 0.4, cpsmidinn(p4), 0.1, 0.6
aenv linseg   1,p3-0.1,1,0.1,0
 out    a1*aenv
 endin

</CsInstruments>
<CsScore>
; p4 = pitch as a midi note number
#define RIFF_1(Start'Trans)
#
i 1 [$Start     ]  1     [36+$Trans]
i 1 [$Start+1   ]  0.25  [43+$Trans]
i 1 [$Start+1.25]  0.25  [43+$Trans]
i 1 [$Start+1.75]  0.25  [41+$Trans]
i 1 [$Start+2.5 ]  1     [46+$Trans]
i 1 [$Start+3.25]  1     [48+$Trans]
#
#define RIFF_2(Start'Trans)
#
i 1 [$Start     ]  1     [34+$Trans]
i 1 [$Start+1.25]  0.25  [41+$Trans]
i 1 [$Start+1.5 ]  0.25  [43+$Trans]
i 1 [$Start+1.75]  0.25  [46+$Trans]
i 1 [$Start+2.25]  0.25  [43+$Trans]
i 1 [$Start+2.75]  0.25  [41+$Trans]
i 1 [$Start+3   ]  0.5   [43+$Trans]
i 1 [$Start+3.5 ]  0.25  [46+$Trans]
#
t 0 90
$RIFF_1(0 ' 0)
$RIFF_1(4 ' 0)
$RIFF_2(8 ' 0)
$RIFF_2(12'-5)
$RIFF_1(16'-5)
$RIFF_2(20'-7)
$RIFF_2(24' 0)
$RIFF_2(28' 5)
e
</CsScore>
</CsoundSynthesizer>
; example written by Iain McCurdy
```

Score macros can themselves contain macros so that, for example, the
above example could be further expanded so that a verse, chorus
structure could be employed where verses and choruses, defined using
macros, were themselves constructed from a series of riff macros.

UDOs and macros can both be used to reduce code repetition and there are
many situations where either could be used with equal justification but
each offers its own strengths. UDOs strengths lies in their ability to
be used just like an opcode with inputs and outputs, the ease with which
they can be shared - between Csound projects and between Csound users -
their ability to operate at a different k-rate to the rest of the
orchestra and in how they facilitate recursion. The fact that macro
arguments are merely blocks of text, however, offers up new
possibilities and unlike UDOs, macros can span several instruments. Of
course UDOs have no use in the Csound score unlike macros. Macros can
also be used to simplify the creation of complex FLTK GUI where panel
sections might be repeated with variations of output variable names and
location.

Csound's orchestra and score macro system offers many additional
refinements and this chapter serves merely as an introduction to their
basic use. To learn more it is recommended to refer to the relevant
sections of the [Csound Reference Manual](http://www.csound.com/docs/manual/OrchMacros.html).
