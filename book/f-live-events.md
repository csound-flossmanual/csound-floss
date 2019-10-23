F. LIVE EVENTS
==============

The basic concept of Csound from the early days of the program is still
valid and useful because it is a musically familiar one: you create a
set of instruments and instruct them to play at various times. These
calls of instrument instances, and their execution, are called
\"instrument events\".

Whenever any Csound code is executed, it has to be compiled first. Since
Csound6, you can change the code of any running Csound instance, and
recompile it on the fly. There are basically two opcodes for this \"live
coding\":
[compileorc](http://www.csounds.com/manual/html/compileorc.html)
re-compiles any existing orc file, whereas
[compilestr](http://www.csounds.com/manual/html/compilestr.html)
compiles any string. At the end of this chapter, we will present some
simple examples for both methods, followed by a description how to
re-compile code on the fly in CsoundQt.

The scheme of instruments and events can be instigated in a number of
ways. In the classical approach you think of an \"orchestra\" with a
number of musicians playing from a \"score\", but you can also trigger
instruments using any kind of live input: from MIDI, from OSC, from the
command line, from a GUI (such as Csound\'s FLTK widgets or CsoundQt\'s
widgets), from the API (also used in CsoundQt\'s Live Event Sheet). Or
you can create a kind of \"master instrument\", which is always on, and
triggers other instruments using opcodes designed for this task, perhaps
under certain conditions: if the live audio input from a singer has been
detected to have a base frequency greater than 1043 Hz, then start an
instrument which plays a soundfile of broken glass\...

Order of Execution Revisited
----------------------------

Whatever you do in Csound with instrument events, you must bear in mind
the order of execution that has been explained in the first chapter of
this section about the *Initialization and Performance Pass*:
instruments are executed one by one, both in the initialization pass and
in each control cycle, and the order is determined **by the instrument
number**.

It is worth to have a closer look to what is happening exactly in time
if you trigger an instrument from inside another instrument. The first
example shows the result when instrument 2 triggers instrument 1 and
instrument 3 **at init-time**.

   ***EXAMPLE 03F01\_OrderOfExc\_event\_i.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    sr = 44100
    ksmps = 441

    instr 1
    kCycle timek
    prints "Instrument 1 is here at initialization.\n"
    printks "Instrument 1: kCycle = %d\n", 0, kCycle
    endin

    instr 2
    kCycle timek
    prints "  Instrument 2 is here at initialization.\n"
    printks "  Instrument 2: kCycle = %d\n", 0, kCycle
    event_i "i", 3, 0, .02
    event_i "i", 1, 0, .02
    endin

    instr 3
    kCycle timek
    prints "    Instrument 3 is here at initialization.\n"
    printks "    Instrument 3: kCycle = %d\n", 0, kCycle
    endin

    </CsInstruments>
    <CsScore>
    i 2 0 .02
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

This is the output:\
  Instrument 2 is here at initialization.\
    Instrument 3 is here at initialization.\
Instrument 1 is here at initialization.\
Instrument 1: kCycle = 1\
  Instrument 2: kCycle = 1\
    Instrument 3: kCycle = 1\
Instrument 1: kCycle = 2\
  Instrument 2: kCycle = 2\
    Instrument 3: kCycle = 2

Instrument 2 is the first one to initialize, because it is the only one
which is called by the score. Then instrument 3 is initialized, because
it is called first by instrument 2. The last one is instrument 1. All
this is done before the actual performance begins. In the performance
itself, starting from the first control cycle, all instruments are
executed by their order.

Let us compare now what is happening when instrument 2 calls instrument
1 and 3 **during the performance** (= at k-time):

   ***EXAMPLE 03F02\_OrderOfExc\_event\_k.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    sr = 44100
    ksmps = 441
    0dbfs = 1
    nchnls = 1

    instr 1
    kCycle timek
    prints "Instrument 1 is here at initialization.\n"
    printks "Instrument 1: kCycle = %d\n", 0, kCycle
    endin

    instr 2
    kCycle timek
    prints "  Instrument 2 is here at initialization.\n"
    printks "  Instrument 2: kCycle = %d\n", 0, kCycle
     if kCycle == 1 then
    event "i", 3, 0, .02
    event "i", 1, 0, .02
     endif
    printks "  Instrument 2: still in kCycle = %d\n", 0, kCycle
    endin

    instr 3
    kCycle timek
    prints "    Instrument 3 is here at initialization.\n"
    printks "    Instrument 3: kCycle = %d\n", 0, kCycle
    endin

    instr 4
    kCycle timek
    prints "      Instrument 4 is here at initialization.\n"
    printks "      Instrument 4: kCycle = %d\n", 0, kCycle
    endin

    </CsInstruments>
    <CsScore>
    i 4 0 .02
    i 2 0 .02
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

This is the output:\
  Instrument 2 is here at initialization.\
      Instrument 4 is here at initialization.\
  Instrument 2: kCycle = 1\
  Instrument 2: still in kCycle = 1\
      Instrument 4: kCycle = 1\
    Instrument 3 is here at initialization.\
Instrument 1 is here at initialization.\
Instrument 1: kCycle = 2\
  Instrument 2: kCycle = 2\
  Instrument 2: still in kCycle = 2\
    Instrument 3: kCycle = 2\
      Instrument 4: kCycle = 2

Instrument 2 starts with its init-pass, and then instrument 4 is
initialized. As you see, the reverse order of the scorelines has no
effect; the instruments which start at the same time are executed in
ascending order, depending on their numbers.

In this first cycle, instrument 2 calls instrument 3 and 1. As you see
by the output of instrument 4, the whole control cycle is finished
first, before instrument 3 and 1 (in this order) are initialized.^1^ 
These both instruments start their performance in cycle number two,
where they find themselves in the usual order: instrument 1 before
instrument 2, then instrument 3 before instrument 4.

Usually you will not need to know all of this with such precise timing.
But in case you experience any problems, a clearer awareness of the
process may help.

Instrument Events From The Score
--------------------------------

This is the classical way of triggering instrument events: you write a
list in the score section of a .csd file. Each line which begins with an
\"i\", is an instrument event. As this is very simple, and examples can
be found easily, let us focus instead on some additional features which
can be useful when you work in this way. Documentation for these
features can be found in the [Score
Statements](http://www.csounds.com/manual/html/ScoreStatements.html)
section of the Canonical Csound Reference Manual. Here are some
examples:

   ***EXAMPLE 03F03\_Score\_tricks.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    giWav     ftgen     0, 0, 2^10, 10, 1, .5, .3, .1

      instr 1
    kFadout   init      1
    krel      release   ;returns "1" if last k-cycle
     if krel == 1 && p3 < 0 then ;if so, and negative p3:
              xtratim   .5       ;give 0.5 extra seconds
    kFadout   linseg    1, .5, 0 ;and make fade out
     endif
    kEnv      linseg    0, .01, p4, abs(p3)-.1, p4, .09, 0; normal fade out
    aSig      poscil    kEnv*kFadout, p5, giWav
              outs      aSig, aSig
      endin

    </CsInstruments>
    <CsScore>
    t 0 120                      ;set tempo to 120 beats per minute
    i    1    0    1    .2   400 ;play instr 1 for one second
    i    1    2   -10   .5   500 ;play instr 1 indefinetely (negative p3)
    i   -1    5    0             ;turn it off (negative p1)
    ; -- turn on instance 1 of instr 1 one sec after the previous start
    i    1.1  ^+1  -10  .2   600
    i    1.2  ^+2  -10  .2   700 ;another instance of instr 1
    i   -1.2  ^+2  0             ;turn off 1.2
    ; -- turn off 1.1 (dot = same as the same p-field above)
    i   -1.1  ^+1  .
    s                            ;end of a section, so time begins from new at zero
    i    1    1    1    .2   800
    r 5                          ;repeats the following line (until the next "s")
    i    1   .25  .25   .2   900
    s
    v 2                          ;lets time be double as long
    i    1    0    2    .2   1000
    i    1    1    1    .2   1100
    s
    v 0.5                        ;lets time be half as long
    i    1    0    2    .2   1200
    i    1    1    1    .2   1300
    s                            ;time is normal now again
    i    1    0    2    .2   1000
    i    1    1    1    .2   900
    s
    ; -- make a score loop (4 times) with the variable "LOOP"
    {4 LOOP
    i    1    [0 + 4 * $LOOP.]    3    .2   [1200 - $LOOP. * 100]
    i    1    [1 + 4 * $LOOP.]    2    .    [1200 - $LOOP. * 200]
    i    1    [2 + 4 * $LOOP.]    1    .    [1200 - $LOOP. * 300]
    }
    e
    </CsScore>
    </CsoundSynthesizer>

Triggering an instrument with an indefinite duration by setting p3 to
any negative value, and stopping it by a negative p1 value, can be an
important feature for live events. If you turn instruments off in this
way you may have to add a fade out segment. One method of doing this is
shown in the instrument above with a combination of the
[release](http://www.csounds.com/manual/html/release.html) and the
[xtratim](http://www.csounds.com/manual/html/xtratim.html) opcodes. Also
note that you can start and stop certain instances of an instrument with
a floating point number as p1.

Using MIDI Note-On Events
-------------------------

Csound has a particular feature which makes it very simple to trigger
instrument events from a MIDI keyboard. Each MIDI Note-On event can
trigger an instrument, and the related Note-Off event of the same key
stops the related instrument instance. This is explained more in detail
in the chapter *Triggering Instrument Instances* in the MIDI section of
this manual. Here, just a small example is shown. Simply connect your
MIDI keyboard and it should work.

   ***EXAMPLE 03F04\_Midi\_triggered\_events.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -Ma -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    giSine    ftgen     0, 0, 2^10, 10, 1
              massign   0, 1; assigns all midi channels to instr 1

      instr 1
    iFreq     cpsmidi   ;gets frequency of a pressed key
    iAmp      ampmidi   8 ;gets amplitude and scales 0-8
    iRatio    random    .9, 1.1 ;ratio randomly between 0.9 and 1.1
    aTone     foscili   .1, iFreq, 1, iRatio/5, iAmp+1, giSine ;fm
    aEnv      linenr    aTone, 0, .01, .01 ; avoiding clicks at the note-end
              outs      aEnv, aEnv
      endin

    </CsInstruments>
    <CsScore>
    f 0 36000; play for 10 hours
    e
    </CsScore>
    </CsoundSynthesizer>

Using Widgets
-------------

If you want to trigger an instrument event in realtime with a Graphical
User Interface, it is usually a \"Button\" widget which will do this
job. We will see here a simple example; first implemented using
Csound\'s FLTK widgets, and then using CsoundQt\'s widgets.

### FLTK Button

This is a very simple example demonstrating how to trigger an instrument
using an [FLTK
button](http://www.csounds.com/manual/html/FLbutton.html). A more
extended example can be found
[here](http://www.csounds.com/manual/html/examples/FLbutton.csd).

   ***EXAMPLE 03F05\_FLTK\_triggered\_events.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

          ; -- create a FLTK panel --
              FLpanel   "Trigger By FLTK Button", 300, 100, 100, 100
          ; -- trigger instr 1 (equivalent to the score line "i 1 0 1")k1, ih1   FLbutton  "Push me!", 0, 0, 1, 150, 40, 10, 25, 0, 1, 0, 1
          ; -- trigger instr 2
    k2, ih2   FLbutton  "Quit", 0, 0, 1, 80, 40, 200, 25, 0, 2, 0, 1
              FLpanelEnd; end of the FLTK panel section
              FLrun     ; run FLTK
              seed      0; random seed different each time

      instr 1
    idur      random    .5, 3; recalculate instrument duration
    p3        =         idur; reset instrument duration
    ioct      random    8, 11; random values between 8th and 11th octave
    idb       random    -18, -6; random values between -6 and -18 dB
    aSig      poscil    ampdb(idb), cpsoct(ioct)
    aEnv      transeg   1, p3, -10, 0
              outs      aSig*aEnv, aSig*aEnv
      endin

    instr 2
              exitnow
    endin

    </CsInstruments>
    <CsScore>
    f 0 36000
    e
    </CsScore>
    </CsoundSynthesizer>

Note that in this example the duration of an instrument event is
recalculated when the instrument is initialised. This is done using the
statement \"p3 = i\...\". This can be a useful technique if you want the
duration that an instrument plays for to be different each time it is
called. In this example duration is the result of a random function\'.
The duration defined by the FLTK button will be overwritten by any other
calculation within the instrument itself at i-time.

### CsoundQt Button

In CsoundQt, a button can be created easily from the submenu in a widget
panel:

::: {.group_img}
::: {.image}
![](static//_v/1.0/http://en.flossmanuals.net/floss/pub/Csound/){width="0"
height="0"}
:::
:::

::: {.group_img}
::: {.image}
![qcbutton1](static/csound-picts-03_cslanguage-qcbutton1-en.png "qcbutton1"){width="373"
height="520"} 
:::
:::

In the Properties Dialog of the button widget, make sure you have
selected \"event\" as Type. Insert a Channel name, and at the bottom
type in the event you want to trigger - as you would if writing a line
in the score.

::: {.group_img}
::: {.image}
![qcbutton3](static/csound-picts-03_cslanguage-qcbutton3-en.png "qcbutton3"){width="542"
height="326"}
:::
:::

In your Csound code, you need nothing more than the instrument you want
to trigger:

::: {.group_img}
::: {.image}
![qcbutton4](static/csound-picts-03_cslanguage-qcbutton4-en.png "qcbutton4"){width="549"
height="364"} 
:::
:::

For more information about CsoundQt, read the CsoundQt chapter in the
\'Frontends\' section of this manual.

Using A Realtime Score
----------------------

### Command Line With The -L stdin Option

If you use any .csd with the option \"-L stdin\" (and the -odac option
for realtime output), you can type any score line in realtime (sorry,
this does not work for Windows). For instance, save this .csd anywhere
and run it from the command line:

   ***EXAMPLE 03F06\_Commandline\_rt\_events.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -L stdin -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

              seed      0; random seed different each time

      instr 1
    idur      random    .5, 3; calculate instrument duration
    p3        =         idur; reset instrument duration
    ioct      random    8, 11; random values between 8th and 11th octave
    idb       random    -18, -6; random values between -6 and -18 dB
    aSig      oscils    ampdb(idb), cpsoct(ioct), 0
    aEnv      transeg   1, p3, -10, 0
              outs      aSig*aEnv, aSig*aEnv
      endin

    </CsInstruments>
    <CsScore>
    f 0 36000
    e
    </CsScore>
    </CsoundSynthesizer>

If you run it by typing and returning a command line like this \...

::: {.group_img}
::: {.image}
![cmdline](static/csound-picts-03_cslanguage-cmdline-en.png "cmdline"){width="640"
height="74"}
:::
:::

\... you should get a prompt at the end of the Csound messages:

::: {.group_img}
::: {.image}
![\_L1](static/csound-picts-03_cslanguage-_l1-en.png "_L1"){width="632"
height="444"} 
:::
:::

If you now type the line \"i 1 0 1\" and press return, you should hear
that instrument 1 has been executed. After three times your messages may
look like this:

::: {.group_img}
::: {.image}
![\_L2](static/csound-picts-03_cslanguage-_l2-en.png "_L2"){width="509"
height="448"} 
:::
:::

### CsoundQt\'s Live Event Sheet

In general, this is the method that CsoundQt uses and it is made
available to the user in a flexible environment called the Live Event
Sheet. Have a look in the CsoundQt frontend to see more of the
possibilities of \"firing\" live instrument events using the Live Event
Sheet.^2^ 

::: {.group_img}
::: {.image}
![qcs\_lesheet](static/csound-picts-03_cslanguage-qcs_lesheet-en.png "qcs_lesheet"){width="740"
height="483"} 
:::
:::

By Conditions
-------------

We have discussed first the classical method of triggering instrument
events from the score section of a .csd file, then we went on to look at
different methods of triggering real time events using MIDI, by using
widgets, and by using score lines inserted live. We will now look at the
Csound orchestra itself and to some methods by which an instrument can
internally trigger another instrument. The pattern of triggering could
be governed by conditionals, or by different kinds of loops. As this
\"master\" instrument can itself be triggered by a realtime event, you
have unlimited options available for combining the different methods.

Let\'s start with conditionals. If we have a realtime input, we may want
to define a threshold, and trigger an event

1.  if we cross the threshold from below to above;
2.  if we cross the threshold from above to below.

In Csound, this could be implemented using an orchestra of three
instruments. The first instrument is the master instrument. It receives
the input signal and investigates whether that signal is crossing the
threshold and if it does whether it is crossing from low to high or from
high to low. If it crosses the threshold from low ot high the second
instrument is triggered, if it crosses from high to low the third
instrument is triggered.

   ***EXAMPLE 03F07\_Event\_by\_condition.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -iadc -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

              seed      0; random seed different each time

      instr 1; master instrument
    ichoose   =         p4; 1 = real time audio, 2 = random amplitude movement
    ithresh   =         -12; threshold in dB
    kstat     init      1; 1 = under the threshold, 2 = over the threshold
    ;;CHOOSE INPUT SIGNAL
     if ichoose == 1 then
    ain       inch      1
     else
    kdB       randomi   -18, -6, 1
    ain       pinkish   ampdb(kdB)
     endif
    ;;MEASURE AMPLITUDE AND TRIGGER SUBINSTRUMENTS IF THRESHOLD IS CROSSED
    afoll     follow    ain, .1; measure mean amplitude each 1/10 second
    kfoll     downsamp  afoll
     if kstat == 1 && dbamp(kfoll) > ithresh then; transition down->up
              event     "i", 2, 0, 1; call instr 2
              printks   "Amplitude = %.3f dB%n", 0, dbamp(kfoll)
    kstat     =         2; change status to "up"
     elseif kstat == 2 && dbamp(kfoll) < ithresh then; transition up->down
              event     "i", 3, 0, 1; call instr 3
              printks   "Amplitude = %.3f dB%n", 0, dbamp(kfoll)
    kstat     =         1; change status to "down"
     endif
      endin

      instr 2; triggered if threshold has been crossed from down to up
    asig      poscil    .2, 500
    aenv      transeg   1, p3, -10, 0
              outs      asig*aenv, asig*aenv
      endin

      instr 3; triggered if threshold has been crossed from up to down
    asig      poscil    .2, 400
    aenv      transeg   1, p3, -10, 0
              outs      asig*aenv, asig*aenv
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 1000 2 ;change p4 to "1" for live input
    e
    </CsScore>
    </CsoundSynthesizer>

Using i-Rate Loops For Calculating A Pool Of Instrument Events
--------------------------------------------------------------

You can perform a number of calculations at init-time which lead to a
list of instrument events. In this way you are producing a score, but
inside an instrument. The score events are then executed later.

Using this opportunity we can introduce the
[scoreline](http://www.csounds.com/manual/html/scoreline.html) /
[scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html)
opcode. It is quite similar to the
[event](http://www.csounds.com/manual/html/event.html) /
[event\_i](http://www.csounds.com/manual/html/event_i.html) opcode but
has two major benefits:

-   You can write more than one scoreline by using \"{{\" at the
    beginning and \"}}\" at the end.
-   You can send a string to the subinstrument (which is not possible
    with the event opcode).

Let\'s look at a simple example for executing score events from an
instrument using the scoreline opcode:

   ***EXAMPLE 03F08\_Generate\_event\_pool.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

              seed      0; random seed different each time

      instr 1 ;master instrument with event pool
              scoreline_i {{i 2 0 2 7.09
                            i 2 2 2 8.04
                            i 2 4 2 8.03
                            i 2 6 1 8.04}}
      endin

      instr 2 ;plays the notes
    asig      pluck     .2, cpspch(p4), cpspch(p4), 0, 1
    aenv      transeg   1, p3, 0, 0
              outs      asig*aenv, asig*aenv
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 7
    e
    </CsScore>
    </CsoundSynthesizer>

With good right, you might say: \"OK, that\'s nice, but I can also write
scorelines in the score itself!\" That\'s right, but the advantage with
the *scoreline\_i* method is that you can **render** the score events in
an instrument, and **then** send them out to one or more instruments to
execute them. This can be done with the
[sprintf](http://www.csounds.com/manual/html/sprintf.html) opcode, which
produces the string for scoreline in an i-time loop (see the chapter
about control structures).

   ***EXAMPLE 03F09\_Events\_sprintf.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    giPch     ftgen     0, 0, 4, -2, 7.09, 8.04, 8.03, 8.04
              seed      0; random seed different each time

      instr 1 ; master instrument with event pool
    itimes    =         7 ;number of events to produce
    icnt      =         0 ;counter
    istart    =         0
    Slines    =         ""
    loop:               ;start of the i-time loop
    idur      random    1, 2.9999 ;duration of each note:
    idur      =         int(idur) ;either 1 or 2
    itabndx   random    0, 3.9999 ;index for the giPch table:
    itabndx   =         int(itabndx) ;0-3
    ipch      table     itabndx, giPch ;random pitch value from the table
    Sline     sprintf   "i 2 %d %d %.2f\n", istart, idur, ipch ;new scoreline
    Slines    strcat    Slines, Sline ;append to previous scorelines
    istart    =         istart + idur ;recalculate start for next scoreline
              loop_lt   icnt, 1, itimes, loop ;end of the i-time loop
              puts      Slines, 1 ;print the scorelines
              scoreline_i Slines ;execute them
    iend      =         istart + idur ;calculate the total duration
    p3        =         iend ;set p3 to the sum of all durations
              print     p3 ;print it
      endin

      instr 2 ;plays the notes
    asig      pluck     .2, cpspch(p4), cpspch(p4), 0, 1
    aenv      transeg   1, p3, 0, 0
              outs      asig*aenv, asig*aenv
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 1 ;p3 is automatically set to the total duration
    e
    </CsScore>
    </CsoundSynthesizer>

In this example, seven events have been rendered in an i-time loop in
instrument 1. The result is stored in the string variable *Slines*. This
string is given at i-time to scoreline\_i, which executes them then one
by one according to their starting times (p2), durations (p3) and other
parameters.

Instead of collecting all score lines in a single string, you can also
execute them inside the i-time loop. Also in this way all the single
score lines are added to Csound\'s event pool. The next example shows an
alternative version of the previous one by adding the instrument events
one by one in the i-time loop, either with event\_i (instr 1) or with
scoreline\_i (instr 2):

   ***EXAMPLE 03F10\_Events\_collected.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    giPch     ftgen     0, 0, 4, -2, 7.09, 8.04, 8.03, 8.04
              seed      0; random seed different each time

      instr 1; master instrument with event_i
    itimes    =         7; number of events to produce
    icnt      =         0; counter
    istart    =         0
    loop:               ;start of the i-time loop
    idur      random    1, 2.9999; duration of each note:
    idur      =         int(idur); either 1 or 2
    itabndx   random    0, 3.9999; index for the giPch table:
    itabndx   =         int(itabndx); 0-3
    ipch      table     itabndx, giPch; random pitch value from the table
              event_i   "i", 3, istart, idur, ipch; new instrument event
    istart    =         istart + idur; recalculate start for next scoreline
              loop_lt   icnt, 1, itimes, loop; end of the i-time loop
    iend      =         istart + idur; calculate the total duration
    p3        =         iend; set p3 to the sum of all durations
              print     p3; print it
      endin

      instr 2; master instrument with scoreline_i
    itimes    =         7; number of events to produce
    icnt      =         0; counter
    istart    =         0
    loop:               ;start of the i-time loop
    idur      random    1, 2.9999; duration of each note:
    idur      =         int(idur); either 1 or 2
    itabndx   random    0, 3.9999; index for the giPch table:
    itabndx   =         int(itabndx); 0-3
    ipch      table     itabndx, giPch; random pitch value from the table
    Sline     sprintf   "i 3 %d %d %.2f", istart, idur, ipch; new scoreline
              scoreline_i Sline; execute it
              puts      Sline, 1; print it
    istart    =         istart + idur; recalculate start for next scoreline
              loop_lt   icnt, 1, itimes, loop; end of the i-time loop
    iend      =         istart + idur; calculate the total duration
    p3        =         iend; set p3 to the sum of all durations
              print     p3; print it
      endin

      instr 3; plays the notes
    asig      pluck     .2, cpspch(p4), cpspch(p4), 0, 1
    aenv      transeg   1, p3, 0, 0
              outs      asig*aenv, asig*aenv
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 1
    i 2 14 1
    e
    </CsScore>
    </CsoundSynthesizer>

Using Time Loops
----------------

As discussed above in the chapter about control structures, a time loop
can be built in Csound either with the
[timout](http://www.csounds.com/manual/html/timout.html) opcode or with
the [metro](http://www.csounds.com/manual/html/metro.html) opcode. There
were also simple examples for triggering instrument events using both
methods. Here, a more complex example is given: A master instrument
performs a time loop (choose either instr 1 for the timout method or
instr 2 for the metro method) and triggers once in a loop a
subinstrument. The subinstrument itself (instr 10) performs an i-time
loop and triggers several instances of a sub-subinstrument (instr 100).
Each instance performs a partial with an independent envelope for a
bell-like additive synthesis.

   ***EXAMPLE 03F11\_Events\_time\_loop.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

              seed      0

      instr 1; time loop with timout. events are triggered by event_i (i-rate)
    loop:
    idurloop  random    1, 4; duration of each loop
              timout    0, idurloop, play
              reinit    loop
    play:
    idurins   random    1, 5; duration of the triggered instrument
              event_i   "i", 10, 0, idurins; triggers instrument 10
      endin

      instr 2; time loop with metro. events are triggered by event (k-rate)
    kfreq     init      1; give a start value for the trigger frequency
    kTrig     metro     kfreq
     if kTrig == 1 then ;if trigger impulse:
    kdur      random    1, 5; random duration for instr 10
              event     "i", 10, 0, kdur; call instr 10
    kfreq     random    .25, 1; set new value for trigger frequency
     endif
      endin

      instr 10; triggers 8-13 partials
    inumparts random    8, 14
    inumparts =         int(inumparts); 8-13 as integer
    ibasoct   random    5, 10; base pitch in octave values
    ibasfreq  =         cpsoct(ibasoct)
    ipan      random    .2, .8; random panning between left (0) and right (1)
    icnt      =         0; counter
    loop:
              event_i   "i", 100, 0, p3, ibasfreq, icnt+1, inumparts, ipan
              loop_lt   icnt, 1, inumparts, loop
      endin

      instr 100; plays one partial
    ibasfreq  =         p4; base frequency of sound mixture
    ipartnum  =         p5; which partial is this (1 - N)
    inumparts =         p6; total number of partials
    ipan      =         p7; panning
    ifreqgen  =         ibasfreq * ipartnum; general frequency of this partial
    ifreqdev  random    -10, 10; frequency deviation between -10% and +10%
    ; -- real frequency regarding deviation
    ifreq     =         ifreqgen + (ifreqdev*ifreqgen)/100
    ixtratim  random    0, p3; calculate additional time for this partial
    p3        =         p3 + ixtratim; new duration of this partial
    imaxamp   =         1/inumparts; maximum amplitude
    idbdev    random    -6, 0; random deviation in dB for this partial
    iamp      =   imaxamp * ampdb(idbdev-ipartnum); higher partials are softer
    ipandev   random    -.1, .1; panning deviation
    ipan      =         ipan + ipandev
    aEnv      transeg   0, .005, 0, iamp, p3-.005, -10, 0
    aSine     poscil    aEnv, ifreq
    aL, aR    pan2      aSine, ipan
              outs      aL, aR
              prints    "ibasfreq = %d, ipartial = %d, ifreq = %d%n",\
                         ibasfreq, ipartnum, ifreq
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 300 ;try this, or the next line (or both)
    ;i 2 0 300
    </CsScore>
    </CsoundSynthesizer>

Which Opcode Should I Use? 
---------------------------

Csound users are often confused about the variety of opcodes available
to trigger instrument events. Should I use event, scoreline, schedule or
schedkwhen? Should I use event or event\_i?

Let us start with the latter, which actually leads to the general
question about \"i-rate\" and \"k-rate\" opcodes.^3^ In short: Using
**event\_i** (the i-rate version) will only trigger an event **once**,
when the instrument in which this opcode works is initiated. Using
**event** (the k-rate version) will trigger an event potentially **again
and again**, as long as the instrument runs, in each control cycle. This
is a very simple example:

   ***EXAMPLE 03F12\_event\_i\_vs\_event.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    sr=44100
    ksmps = 32

    ;set counters for the instances of Called_i and Called_k
    giInstCi init 1
    giInstCk init 1

    instr Call_i
    ;call another instrument at i-rate
    event_i "i", "Called_i", 0, 1
    endin

    instr Call_k
    ;call another instrument at k-rate
    event "i", "Called_k", 0, 1
    endin

    instr Called_i
    ;report that instrument starts and which instance
    prints "Instance #%d of Called_i is starting!\n", giInstCi
    ;increment number of instance for next instance
    giInstCi += 1
    endin

    instr Called_k
    ;report that instrument starts and which instance
    prints "  Instance #%d of Called_k is starting!\n", giInstCk
    ;increment number of instance for next instance
    giInstCk += 1
    endin

    </CsInstruments>
    <CsScore>
    ;run "Call_i" for one second
    i "Call_i" 0 1
    ;run "Call_k" for 1/100 seconds
    i "Call_k" 0 0.01
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Although instrument \"Call\_i\" runs for one second, the call to
instrument \"Called\_i\" is only performed once, because it is done with
event\_i: at initialization only. But instrument \"Call\_k\" calls one
instance of \"Called\_k\" in each control cycle; so for the duration of
0.01 seconds of running instrument \"Call\_k\", fourteen instances of
instrument \"Called\_k\" are being started.^4^ So this is the output:

Instance \#1 of Called\_i is starting!\
  Instance \#1 of Called\_k is starting!\
  Instance \#2 of Called\_k is starting!\
  Instance \#3 of Called\_k is starting!\
  Instance \#4 of Called\_k is starting!\
  Instance \#5 of Called\_k is starting!\
  Instance \#6 of Called\_k is starting!\
  Instance \#7 of Called\_k is starting!\
  Instance \#8 of Called\_k is starting!\
  Instance \#9 of Called\_k is starting!\
  Instance \#10 of Called\_k is starting!\
  Instance \#11 of Called\_k is starting!\
  Instance \#12 of Called\_k is starting!\
  Instance \#13 of Called\_k is starting!\
  Instance \#14 of Called\_k is starting!

So the first (and probably most important) decision in asking \"which
opcode should I use\", is the answer to the question: \"Do I need an
i-rate or a k-rate opcode?\"

### i-rate Versions: schedule, event\_i, scoreline\_i

If you need an i-rate opcode to trigger an instrument event, schedule is
the most basic choice. You use it actually exactly the same as writing
any score event; just separting the parameter fields by commas rather by
spaces:

    schedule iInstrNum (or "InstrName"), iStart, iDur [, ip4] [, ip5] [...]

event\_i is very similar:

    event_i "i", iInstrNum (or "InstrName"), iStart, iDur [, ip4] [, ip5] [...]

The only difference between schedule and event\_i is this: schedule can
only trigger instruments, whereas event\_i can also trigger \"f\" events
(= build function tables).

Both, schedule and event\_i have a restriction: they are not able to
send strings in the parameter fields p4, p5, \...  So, if you execute
this code \...

    schedule "bla", 0, 1, "blu"

\... you will get this error message in the console:

ERROR:  Unable to find opcode entry for \'schedule\' with matching
argument types:\
Found: (null) schedule SccS

scoreline\_i is designed to make this possible. It takes one or more
lines of score statements which follow the same conventions as if
written in the score section itself.^5^ If you enclose the line(s) by {{
and }}, you can include as many strings in it as you wish:

    scoreline_i {{
                  i "bla" 0 1 "blu" "sound"
                  i "bla" 1 1 "brown" "earth"
                }}

### k-rate versions: event, scoreline, schedkwhen

If you need a k-rate opcode to trigger an instrument event, event is the
basic choice. Its syntax is very similar to event\_i, but as described
above, it works at k-rate and you can also change all its arguments at
k-rate:

    event "i", kInstrNum (or "InstrName"), kStart, kDur [, kp4] [, kp5] [...]

Usually, you will not want to trigger another instrument each control
cycle, but based on certain conditions. A very common case is a
\"ticking\" periodic signal, whichs ticks are being used as trigger
impulses. The typical code snippel using a metro and the event opcode
would be:

    kTrigger  metro    1 ;"ticks" once a second
    if kTrigger == 1 then ;if it ticks
      event "i", "my_instr", 0, 1 ;call the instrument
    endif

In other words: This code would only use one control-cycle per second to
call my\_instr, and would do nothing in the other control cycles. The
schedkwhen opcode simplifies such typical use cases, and adds some other
useful arguments. This is the syntax:

    schedkwhen kTrigger, kMinTim, kMaxNum, kInsrNum (or "InstrName"), kStart, kDur [, kp4] [, kp5] [...]

The kMinTim parameter specifies the time which has to be spent between
two subsequent calls of the subinstrument. This is often quite useful as
you may want to state: \"Do not call the next instance of the
subinstrument unless 0.1 seconds have been passed.\" If you set this
parameter to zero, there will be no time limit for calling the
subinstrument.

The kMaxNum parameter specifies the maximum number of instances which
run simultaneously. Say, kMaxNum = 2 and there are indeed two instances
of the subinstrument running, no other instance will be initiated. if
you set this parameter to zero, there will be no limit for calling new
instances.

So, with schedkwhen, we can write the above code snippet in two lines
instead of four:

    kTrigger  metro    1 ;"ticks" once a second
    schedkwhen kTrigger, 0, 0, "my_instr", 0, 1

Only, you cannot pass strings as p-fields via schedkwhen (and event).
So, very much similar as described above for i-rate opcodes, scoreline
fills this gap. Usually we will use it with a condition,  as we did for
the event opcode:

    kTrigger  metro    1 ;"ticks" once a second
    if kTrigger == 1 then
      ;if it ticks, call two instruments and pass strings as p-fields
      scoreline {{
                  i "bla" 0 1 "blu" "sound"
                  i "bla" 1 1 "brown" "earth"
                }}
    endif

Recompilation
-------------

As it has been mentioned at the start of this chapter, since Csound6 you
can re-compile any code in an already running Csound instance. Let us
first see some simple examples for the general use, and then a more
practical approach in CsoundQt.

### compileorc / compilestr

The opcode compileorc refers to a definition of instruments which has
been saved as an .orc (\"orchestra\") file. To see how it works, save
this text in a simple text (ASCII) format as \"to\_recompile.orc\":

    instr 1
    iAmp = .2
    iFreq = 465
    aSig oscils iAmp, iFreq, 0
    outs aSig, aSig
    endin

Then save this csd in the same directory:

   ***EXAMPLE 03F13\_compileorc.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -o dac -d -L stdin -Ma
    </CsOptions>
    <CsInstruments>
    sr = 44100
    nchnls = 2
    ksmps = 32
    0dbfs = 1

    massign 0, 9999

    instr 9999
    ires compileorc "to_recompile.orc"
    print ires ; 0 if compiled successfully
    event_i "i", 1, 0, 3 ;send event
    endin

    </CsInstruments>
    <CsScore>
    i 9999 0 1
    </CsScore>
    </CsoundSynthesizer>

If you run this csd in the terminal, you should hear a three seconds
beep, and the output should be like this:\
SECTION 1:\
new alloc for instr 9999:\
instr 9999:  ires = 0.000\
new alloc for instr 1:\
B  0.000 ..  1.000 T  1.000 TT  1.000 M:  0.20000  0.20000\
B  1.000 ..  3.000 T  3.000 TT  3.000 M:  0.20000  0.20000\
Score finished in csoundPerform().\
inactive allocs returned to freespace\
end of score.           overall amps:  0.20000  0.20000\
       overall samples out of range:        0        0\
0 errors in performance

Having understood this, it is easy to do the next step. Remove (or
comment out) the score line \"i 9999 0 1\" so that the score is empty.
If you start the csd now, Csound will run indefinitely. Now call instr
9999 by typing \"i 9999 0 1\" in the terminal window (if the option -L
stdin works for your setup), or by pressing any MIDI key (if you have
connected a keyboard). You should hear the same beep as before. But as
the recompile.csd keeps running, you can change now the
to\_recompile.orc instrument. Try, for instance, another value for
kFreq. Whenever this is done (do not forget to save the file) and you
call again instr 9999 in recompile.csd, the new version of this
instrument is compiled and then called immediately.

The other possibility to recompile code by using an opcode is
compilestr. It will compile any instrument definition which is contained
in a string. As this will be a string with several lines, you will
usually use the \'{{\' delimiter for the start and \'}}\' for the end of
the string. This is a basic example:

   ***EXAMPLE 03F14\_compilestr.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -o dac -d
    </CsOptions>
    <CsInstruments>
    sr = 44100
    nchnls = 1
    ksmps = 32
    0dbfs = 1

    instr 1

     ;will fail because of wrong code
    ires compilestr {{
    instr 2
    a1 oscilb p4, p5, 0
    out a1
    endin
    }}
    print ires ; returns -1 because not successfull

     ;will compile ...
    ires compilestr {{
    instr 2
    a1 oscils p4, p5, 0
    out a1
    endin
    }}
    print ires ; ... and returns 0

     ;call the new instrument
     ;(note that the overall performance is extended)
    scoreline_i "i 2 0 3 .2 415"

    endin

    </CsInstruments>
    <CsScore>
    i1 0 1
    </CsScore>
    </CsoundSynthesizer>

As you see, instrument 2 is defined inside instrument 1, and compiled
via compilestr. in case you can change this string in real-time (for
instance in receiving it via OSC), you can add any new definition of
instruments on the fly. But much more elegant is to use the related
method of the Csound API, as CsoundQt does.

### Re-Compilation in CsoundQt

(The following description is only valid if you have CsoundQt with
PythonQt support. If so, your CsoundQt application should be called
CsoundQt-d-py-cs6 or similar. If the \"-py\" is missing, you will
probably not have PythonQt support.)

To see how easy it is to re-compile code of a running Csound instance,
load this csd in CsoundQt:

   ***EXAMPLE 03F15\_Recompile\_in\_CsoundQt.csd***   

    <CsoundSynthesizer>
    <CsInstruments>
    sr = 44100
    nchnls = 1
    ksmps = 32
    0dbfs = 1

    instr 1
    a1 poscil .2, 500
    out a1
    endin

    </CsInstruments>
    <CsScore>
    r 1000
    i 1 0 1
    </CsScore>
    </CsoundSynthesizer>

The r-statement repeats the call to instr 1 for 1000 times. Now change
the frequency of 500 in instr 1 to say 800. You will hear no change,
because this has not been compiled yet. But when you now select the
instrument definition (including the instr \... endin) and then choose
Edit -\> Evaluate selection, you will hear that in the next call of
instrument 1 the frequency has changed. (Instead of selecting code and
evaluation the selection, you can also place the cursor inside an
instrument and then choose Edit -\> Evaluate section.)

You can also insert new instrument definitions, and then call it with
CsoundQt\'s Live event sheet. You even need not save it - instead you
can save several results of your live coding without stopping Csound.
Have fun \...

 

 

Links And Related Opcodes
-------------------------

### Links

A great collection of interactive examples with FLTK widgets by Iain
McCurdy can be found [here](http://iainmccurdy.org/csound.html). See
particularily the \"Realtime Score Generation\" section. Recently, the
collection has been ported to QuteCsound by René Jopi, and is part of
QuteCsound\'s example menu.

An extended example for calculating score events at i-time can be found
in the [Re-Generation of Stockhausen\'s \"Studie
II\"](http://www.joachimheintz.de/soft/popsoft.html) by Joachim Heintz
(also included in the QuteCsound Examples menu).

### Related Opcodes

[event\_i](http://www.csounds.com/manual/html/event_i.html) /
[event](http://www.csounds.com/manual/html/event.html): Generate an
instrument event at i-time (event\_i) or at k-time (event). Easy to use,
but you cannot send a string to the subinstrument.

[scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html) /
[scoreline](http://www.csounds.com/manual/html/scoreline.html): Generate
an instrument at i-time (scoreline\_i) or at k-time (scoreline). Like
event\_i/event, but you can send to more than one instrument but unlike
event\_i/event you can send strings. On the other hand, you must usually
preformat your scoreline-string using sprintf.

[sprintf](http://www.csounds.com/manual/html/sprintf.html) /
[sprintfk](http://www.csounds.com/manual/html/sprintfk.html): Generate a
formatted string at i-time (sprintf) or k-time (sprintfk), and store it
as a string-variable.

[-+max\_str\_len=10000](http://www.csounds.com/manual/html/CommandFlags.html):
Option in the \"CsOptions\" tag of a .csd file which extend the maximum
string length to 9999 characters.

[massign](http://www.csounds.com/manual/html/massign.html): Assigns the
incoming MIDI events to a particular instrument. It is also possible to
prevent any assigment by this opcode.

[cpsmidi](http://www.csounds.com/manual/html/cpsmidi.html) /
[ampmidi](http://www.csounds.com/manual/html/ampmidi.html): Returns the
frequency / velocity of a pressed MIDI key.

[release](http://www.csounds.com/manual/html/release.html): Returns
\"1\" if the last k-cycle of an instrument has begun.

[xtratim](http://www.csounds.com/manual/html/xtratim.html): Adds an
additional time to the duration (p3) of an instrument.

[turnoff](http://www.csounds.com/manual/html/turnoff.html) /
[turnoff2](http://www.csounds.com/manual/html/turnoff2.html): Turns an
instrument off; either by the instrument itself (turnoff), or from
another instrument and with several options (turnoff2).

[-p3 / -p](http://www.csounds.com/manual/html/i.html)1: A negative
duration (p3) turns an instrument on \"indefinitely\"; a negative
instrument number (p1) turns this instrument off. See the examples at
the beginning of this chapter.

[-L stdin](http://www.csounds.com/manual/html/CommandFlags.html): Option
in the \"CsOptions\" tag of a .csd file which lets you type in realtime
score events.

[timout](http://www.csounds.com/manual/html/timout.html): Allows you to
perform time loops at i-time with reinitalization passes.

[metro](http://www.csounds.com/manual/html/metro.html): Outputs
momentary 1s with a definable (and variable) frequency. Can be used to
perform a time loop at k-rate.

[follow](http://www.csounds.com/manual/html/follow.html): Envelope
follower.

1.  [This has been described incorrectly in the first two issues of this
    manual.]{#endnote-37d38393-1ab8-4662-afaa-e483370944dd}
2.  [There are also some video tutorials:
    http://www.youtube.com/watch?v=O9WU7DzdUmE
    http://www.youtube.com/watch?v=Hs3eO7o349k
    http://www.youtube.com/watch?v=yUMzp6556Kw]{#endnote-80b051c6-af18-431c-b8da-2073b8c34ea2}
3.  [See chapter 03A about Initialization and Performance Pass for a
    detailed discussion.]{#endnote-8d964af5-419b-4bfa-bdce-1b725892226c}
4.  [As for a sample rate of 44100 Hz (sr=44100) and a control period od
    32 samples (ksmps=32), we have 1378 control periods in one second.
    So 0.01 seconds will perform 14 control
    cycles.]{#endnote-c9c86f79-f31b-4388-8cd8-93026db5c426}
5.  [This means that score parameter fields are separated by spaces, not
    by commas.]{#endnote-045763f0-9197-4550-b5aa-d60bac85700b}
