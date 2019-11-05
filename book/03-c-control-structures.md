03 C. CONTROL STRUCTURES
========================

Csound: CONTROLSTRUCTURES

In a way, control structures are the core of a programming language. The
fundamental element in each language is the conditional **if** branch.
Actually all other control structures like for-, until- or while-loops
can be traced back to if-statements.

So, Csound provides mainly the if-statement; either in the usual
*if-then-else* form, or in the older way of an *if-goto* statement.
These will be covered first. Though all necessary loops can be built
just by if-statements, Csound\'s *while, until* and *loop* facility
offer a more comfortable way of performing loops. They will be
introduced later, in the Loop and the While / Until section of this
chapter. Finally, time loops are shown, which are particulary important
in audio programming languages. **\
**

If i-Time Then Not k-Time!
--------------------------

The fundamental difference in Csound between i-time and k-time which has
been explained in chapter 03A, must be regarded very carefully when you
work with control structures. If you make a conditional branch at
**i-time**, the condition will be tested **just once for each note**, at
the initialization pass. If you make a conditional branch at **k-time**,
the condition will be tested **again and again in each control-cycle**.

For instance, if you test a soundfile whether it is mono or stereo, this
is done at init-time. If you test an amplitude value to be below a
certain threshold, it is done at performance time (k-time). If you get
user-input by a scroll number, this is also a k-value, so you need a
k-condition.

Thus, all [if](http://www.csounds.com/manual/html/if.html) and
[loop](http://www.csounds.com/manual/html/loop_lt.html) opcodes have an
\"i\" and a \"k\" descendant. In the next few sections, a general
introduction into the different control tools is given, followed by
examples both at i-time and at k-time for each tool.

If - then - \[elseif - then -\] else
------------------------------------

The use of the if-then-else statement is very similar to other
programming languages. Note that in Csound, \"then\" must be written in
the same line as \"if\" and the expression to be tested, and that you
must close the if-block with an \"endif\" statement on a new line:

    if <condition> then
    ...
    else
    ...
    endif

It is also possible to have no \"else\" statement:

    if <condition> then
    ...
    endif

Or you can have one or more \"elseif-then\" statements in between:

    if <condition1> then
    ...
    elseif <condition2> then
    ...
    else
    ...
    endif

If statements can also be nested. Each level must be closed with an
\"endif\". This is an example with three levels:

    if <condition1> then; first condition opened
     if <condition2> then; second condition openend
      if <condition3> then; third condition openend
      ...
      else
      ...
      endif; third condition closed
     elseif <condition2a> then
     ...
     endif; second condition closed
    else
    ...
    endif; first condition closed

### i-Rate Examples

A typical problem in Csound: You have either mono or stereo files, and
want to read both with a stereo output. For the real stereo ones that
means: use soundin (diskin / diskin2) with two output arguments. For the
mono ones it means: use
[soundin](http://www.csounds.com/manual/html/soundin.html) /
[diskin](http://www.csounds.com/manual/html/diskin.html) /
[diskin2](http://www.csounds.com/manual/html/diskin2.html) with one
output argument, and throw it to both output channels:

   ***EXAMPLE 03C01\_IfThen\_i.csd*** 

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

      instr 1
    Sfile     =          "/my/file.wav" ;your soundfile path here
    ifilchnls filenchnls Sfile
     if ifilchnls == 1 then ;mono
    aL        soundin    Sfile
    aR        =          aL
     else   ;stereo
    aL, aR    soundin    Sfile
     endif
              outs       aL, aR
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>

If you use CsoundQt, you can browse in the widget panel for the
soundfile. See the corresponding example in the CsoundQt Example menu.

### k-Rate Examples

The following example establishes a moving gate between 0 and 1. If the
gate is above 0.5, the gate opens and you hear a tone.  If the gate is
equal or below 0.5, the gate closes, and you hear nothing.

   ***EXAMPLE 03C02\_IfThen\_k.csd*** 

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

              seed      0; random values each time different
    giTone    ftgen     0, 0, 2^10, 10, 1, .5, .3, .1

      instr 1

    ; move between 0 and 1 (3 new values per second)
    kGate     randomi   0, 1, 3
    ; move between 300 and 800 hz (1 new value per sec)
    kFreq     randomi   300, 800, 1
    ; move between -12 and 0 dB (5 new values per sec)
    kdB       randomi   -12, 0, 5
    aSig      oscil3    1, kFreq, giTone
    kVol      init      0
     if kGate > 0.5 then; if kGate is larger than 0.5
    kVol      =         ampdb(kdB); open gate
     else
    kVol      =         0; otherwise close gate
     endif
    kVol      port      kVol, .02; smooth volume curve to avoid clicks
    aOut      =         aSig * kVol
              outs      aOut, aOut
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 30
    </CsScore>
    </CsoundSynthesizer>

### Short Form: (a v b ? x : y)

If you need an if-statement to give a value to an (i- or k-) variable,
you can also use a traditional short form in parentheses: [(a v b ? x :
y)](http://www.csounds.com/manual/html/equals.html).^1^  It asks whether
the condition a or b is true. If a, the value is set to x; if b, to y.
For instance, the last example could be written in this way:

   ***EXAMPLE 03C03\_IfThen\_short\_form.csd*** 

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
    giTone    ftgen     0, 0, 2^10, 10, 1, .5, .3, .1

      instr 1
    kGate     randomi   0, 1, 3; moves between 0 and 1 (3 new values per second)
    kFreq     randomi   300, 800, 1; moves between 300 and 800 hz
                                   ;(1 new value per sec)
    kdB       randomi   -12, 0, 5; moves between -12 and 0 dB
                                 ;(5 new values per sec)
    aSig      oscil3    1, kFreq, giTone
    kVol      init      0
    kVol      =         (kGate > 0.5 ? ampdb(kdB) : 0); short form of condition
    kVol      port      kVol, .02; smooth volume curve to avoid clicks
    aOut      =         aSig * kVol
              outs      aOut, aOut
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 20
    </CsScore>
    </CsoundSynthesizer>

If - goto
---------

An older way of performing a conditional branch - but still useful in
certain cases - is an \"if\" statement which is not followed by a
\"then\", but by a label name. The \"else\" construction follows (or
doesn\'t follow) in the next line. Like the if-then-else statement, the
if-goto works either at i-time or at k-time. You should declare the type
by either using **i**goto or **k**goto. Usually you need an additional
igoto/kgoto statement for omitting the \"else\" block if the first
condition is true. This is the general syntax:

i-time

    if <condition> igoto this; same as if-then
     igoto that; same as else
    this: ;the label "this" ...
    ...
    igoto continue ;skip the "that" block
    that: ; ... and the label "that" must be found
    ...
    continue: ;go on after the conditional branch
    ...

k-time

    if <condition> kgoto this; same as if-then
     kgoto that; same as else
    this: ;the label "this" ...
    ...
    kgoto continue ;skip the "that" block
    that: ; ... and the label "that" must be found
    ...
    continue: ;go on after the conditional branch
    ...

### i-Rate Examples

This is the same example as above in the if-then-else syntax for a
branch depending on a mono or stereo file. If you just want to know
whether a file is mono or stereo, you can use the \"pure\" if-igoto
statement:

   ***EXAMPLE 03C04\_IfGoto\_i.csd*** 

    <CsoundSynthesizer>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

      instr 1
    Sfile     = "/Joachim/Materialien/SamplesKlangbearbeitung/Kontrabass.aif"
    ifilchnls filenchnls Sfile
    if ifilchnls == 1 igoto mono; condition if true
     igoto stereo; else condition
    mono:
              prints     "The file is mono!%n"
              igoto      continue
    stereo:
              prints     "The file is stereo!%n"
    continue:
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    </CsScore>
    </CsoundSynthesizer>

But if you want to play the file, you must also use a k-rate if-kgoto,
because, not only do you have an event at i-time (initializing the
soundin opcode) but also at k-time (producing an audio signal). So the
code in this case is much more cumbersome, or obfuscated, than the
previous if-then-else example.

   ***EXAMPLE 03C05\_IfGoto\_ik.csd*** 

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

      instr 1
    Sfile     =          "my/file.wav"
    ifilchnls filenchnls Sfile
     if ifilchnls == 1 kgoto mono
      kgoto stereo
     if ifilchnls == 1 igoto mono; condition if true
      igoto stereo; else condition
    mono:
    aL        soundin    Sfile
    aR        =          aL
              igoto      continue
              kgoto      continue
    stereo:
    aL, aR    soundin    Sfile
    continue:
              outs       aL, aR
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>

### k-Rate Examples

This is the same example as above (03C02) in the if-then-else syntax for
a moving gate between 0 and 1:

   ***EXAMPLE 03C06\_IfGoto\_k.csd*** 

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
    giTone    ftgen     0, 0, 2^10, 10, 1, .5, .3, .1

      instr 1
    kGate     randomi   0, 1, 3; moves between 0 and 1 (3 new values per second)
    kFreq     randomi   300, 800, 1; moves between 300 and 800 hz
                                  ;(1 new value per sec)
    kdB       randomi   -12, 0, 5; moves between -12 and 0 dB
                                 ;(5 new values per sec)
    aSig      oscil3    1, kFreq, giTone
    kVol      init      0
     if kGate > 0.5 kgoto open; if condition is true
      kgoto close; "else" condition
    open:
    kVol      =         ampdb(kdB)
    kgoto continue
    close:
    kVol      =         0
    continue:
    kVol      port      kVol, .02; smooth volume curve to avoid clicks
    aOut      =         aSig * kVol
              outs      aOut, aOut
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 30
    </CsScore>
    </CsoundSynthesizer>

Loops
-----

Loops can be built either at i-time or at k-time just with the \"if\"
facility. The following example shows an i-rate and a k-rate loop
created using the if-i/kgoto facility:

   ***EXAMPLE 03C07\_Loops\_with\_if.csd*** 

    <CsoundSynthesizer>
    <CsInstruments>
    ;Example by Joachim Heintz

      instr 1 ;i-time loop: counts from 1 until 10 has been reached
    icount    =         1
    count:
              print     icount
    icount    =         icount + 1
     if icount < 11 igoto count
              prints    "i-END!%n"
      endin

      instr 2 ;k-rate loop: counts in the 100th k-cycle from 1 to 11
    kcount    init      0
    ktimek    timeinstk ;counts k-cycle from the start of this instrument
     if ktimek == 100 kgoto loop
      kgoto noloop
    loop:
              printks   "k-cycle %d reached!%n", 0, ktimek
    kcount    =         kcount + 1
              printk2   kcount
     if kcount < 11 kgoto loop
              printks   "k-END!%n", 0
    noloop:
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    i 2 0 1
    </CsScore>
    </CsoundSynthesizer>

But Csound offers a slightly simpler syntax for this kind of i-rate or
k-rate loops. There are four variants of the loop opcode. All four refer
to a *label* as the starting point of the loop, an *index variable* as a
counter, an *increment* or *decrement*, and finally a *reference value*
(maximum or minimum) as comparision:

-   [loop\_lt](http://www.csounds.com/manual/html/loop_lt.html) counts
    upwards and looks if the index variable is **lower than** the
    reference value;
-   [loop\_le](http://www.csounds.com/manual/html/loop_le.html) also
    counts upwards and looks if the index is **lower than or equal to**
    the reference value;
-   [loop\_gt](http://www.csounds.com/manual/html/loop_gt.html) counts
    downwards and looks if the index is **greater than** the reference
    value;
-   [loop\_ge](http://www.csounds.com/manual/html/loop_ge.html) also
    counts downwards and looks if the index is **greater than or equal
    to** the reference value.

As always, all four opcodes can be applied either at i-time or at
k-time. Here are some examples, first for i-time loops, and then for
k-time loops.

### i-Rate Examples

The following .csd provides a simple example for all four loop opcodes:

   ***EXAMPLE 03C08\_Loop\_opcodes\_i.csd*** 

    <CsoundSynthesizer>
    <CsInstruments>
    ;Example by Joachim Heintz

      instr 1 ;loop_lt: counts from 1 upwards and checks if < 10
    icount    =         1
    loop:
              print     icount
              loop_lt   icount, 1, 10, loop
              prints    "Instr 1 terminated!%n"
      endin

      instr 2 ;loop_le: counts from 1 upwards and checks if <= 10
    icount    =         1
    loop:
              print     icount
              loop_le   icount, 1, 10, loop
              prints    "Instr 2 terminated!%n"
      endin

      instr 3 ;loop_gt: counts from 10 downwards and checks if > 0
    icount    =         10
    loop:
              print     icount
              loop_gt   icount, 1, 0, loop
              prints    "Instr 3 terminated!%n"
      endin

      instr 4 ;loop_ge: counts from 10 downwards and checks if >= 0
    icount    =         10
    loop:
              print     icount
              loop_ge   icount, 1, 0, loop
              prints    "Instr 4 terminated!%n"
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    i 2 0 0
    i 3 0 0
    i 4 0 0
    </CsScore>
    </CsoundSynthesizer>

The next example produces a random string of 10 characters and prints it
out:

   ***EXAMPLE 03C09\_Random\_string.csd*** 

    <CsoundSynthesizer>
    <CsInstruments>
    ;Example by Joachim Heintz

      instr 1
    icount    =         0
    Sname     =         ""; starts with an empty string
    loop:
    ichar     random    65, 90.999
    Schar     sprintf   "%c", int(ichar); new character
    Sname     strcat    Sname, Schar; append to Sname
              loop_lt   icount, 1, 10, loop; loop construction
              printf_i  "My name is '%s'!\n", 1, Sname; print result
      endin

    </CsInstruments>
    <CsScore>
    ; call instr 1 ten times
    r 10
    i 1 0 0
    </CsScore>
    </CsoundSynthesizer>

You can also use an i-rate loop to fill a function table (= buffer) with
any kind of values. This table can then be read, or manipulated and then
be read again. In the next example, a function table with 20 positions
(indices) is filled with random integers between 0 and 10 by instrument
1. Nearly the same loop construction is used afterwards to read these
values by instrument 2. **\
**

   ***EXAMPLE 03C10\_Random\_ftable\_fill.csd*** 

    <CsoundSynthesizer>
    <CsInstruments>
    ;Example by Joachim Heintz

    giTable   ftgen     0, 0, -20, -2, 0; empty function table with 20 points
              seed      0; each time different seed

      instr 1 ; writes in the table
    icount    =         0
    loop:
    ival      random    0, 10.999 ;random value
    ; --- write in giTable at first, second, third ... position
              tableiw   int(ival), icount, giTable
              loop_lt   icount, 1, 20, loop; loop construction
      endin

      instr 2; reads from the table
    icount    =         0
    loop:
    ; --- read from giTable at first, second, third ... position
    ival      tablei    icount, giTable
              print     ival; prints the content
              loop_lt   icount, 1, 20, loop; loop construction
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    i 2 0 0
    </CsScore>
    </CsoundSynthesizer>

### k-Rate Examples

The next example performs a loop at k-time. Once per second, every value
of an existing function table is changed by a random deviation of 10%.
Though there are some vectorial opcodes for this task (and in Csound 6
probably array), it can also be done by a k-rate loop like the one shown
here:

   ***EXAMPLE 03C11\_Table\_random\_dev.csd*** 

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    sr = 44100
    ksmps = 441
    nchnls = 2
    0dbfs = 1

    giSine    ftgen     0, 0, 256, 10, 1; sine wave
              seed      0; each time different seed

      instr 1
    ktiminstk timeinstk ;time in control-cycles
    kcount    init      1
     if ktiminstk == kcount * kr then; once per second table values manipulation:
    kndx      =         0
    loop:
    krand     random    -.1, .1;random factor for deviations
    kval      table     kndx, giSine; read old value
    knewval   =         kval + (kval * krand); calculate new value
              tablew    knewval, kndx, giSine; write new value
              loop_lt   kndx, 1, 256, loop; loop construction
    kcount    =         kcount + 1; increase counter
     endif
    asig      poscil    .2, 400, giSine
              outs      asig, asig
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 10
    </CsScore>
    </CsoundSynthesizer>

###  

While / Until
-------------

Since the release of Csound 6, it has been possible to write loops in a
manner similar to that used by many other programming languages, using
the keywords **while** or **until**. The general syntax is:^2^

    while <condition> do
       ...
    od
    until <condition> do
       ...
    od

The body of the **while** loop will be performed again and again, as
long as \<condition\> is **true**. The body of the **until** loop will
be performed, as long as \<condition\> is **false** (not true). This is
a simple example at i-rate:

   ***EXAMPLE 03C12\_while\_until\_i-rate.csd*** 

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    instr 1
    iCounter = 0
    while iCounter < 5 do
      print iCounter
    iCounter += 1
    od
    prints "\n"
    endin

    instr 2
    iCounter = 0
    until iCounter >= 5 do
      print iCounter
    iCounter += 1
    od
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 .1
    i 2 .1 .1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

instr 1:  iprint = 0.000\
instr 1:  iprint = 1.000\
instr 1:  iprint = 2.000\
instr 1:  iprint = 3.000\
instr 1:  iprint = 4.000\
\
instr 2:  iprint = 0.000\
instr 2:  iprint = 1.000\
instr 2:  iprint = 2.000\
instr 2:  iprint = 3.000\
instr 2:  iprint = 4.000

The most important thing in using the while/until loop is to
**increment** the variable you are using in the loop (here: *iCounter*).
This is done by the statement

    iCounter += 1

which is equivalent to the \"old\" way of writing as

    iCounter = iCounter + 1

If you miss this increment, Csound will perform an endless loop, and you
will have to terminate it by the operating system.

The next example shows a similar process at k-rate. It uses a while loop
to print the values of an array, and also set new values. As this
procedure is repeated in each control cycle, the instrument is being
turned off after the third cycle.

   ***EXAMPLE 03C13\_while\_until\_k-rate.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

      ;create and fill an array
    gkArray[] fillarray 1, 2, 3, 4, 5

    instr 1
      ;count performance cycles and print it
    kCycle timeinstk
    printks "kCycle = %d\n", 0, kCycle
      ;set index to zero
    kIndex = 0
      ;perform the loop
    while kIndex < lenarray(gkArray) do
        ;print array value
      printf "  gkArray[%d] = %d\n", kIndex+1, kIndex, gkArray[kIndex]
        ;square array value
      gkArray[kIndex] = gkArray[kIndex] * gkArray[kIndex]
      ;increment index
    kIndex += 1
    od
      ;stop after third control cycle
    if kCycle == 3 then
      turnoff
    endif
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

kCycle = 1\
  gkArray\[0\] = 1\
  gkArray\[1\] = 2\
  gkArray\[2\] = 3\
  gkArray\[3\] = 4\
  gkArray\[4\] = 5\
kCycle = 2\
  gkArray\[0\] = 1\
  gkArray\[1\] = 4\
  gkArray\[2\] = 9\
  gkArray\[3\] = 16\
  gkArray\[4\] = 25\
kCycle = 3\
  gkArray\[0\] = 1\
  gkArray\[1\] = 16\
  gkArray\[2\] = 81\
  gkArray\[3\] = 256\
  gkArray\[4\] = 625

Time Loops
----------

Until now, we have just discussed loops which are executed \"as fast as
possible\", either at i-time or at k-time. But, in an audio programming
language, time loops are of particular interest and importance. A time
loop means, repeating any action after a certain amount of time. This
amount of time can be equal to or different to the previous time loop.
The action can be, for instance: playing a tone, or triggering an
instrument, or calculating a new value for the movement of an envelope.

In Csound, the usual way of performing time loops, is the
[timout](http://www.csounds.com/manual/html/timout.html) facility. The
use of timout is a bit intricate, so some examples are given, starting
from very simple to more complex ones.

Another way of performing time loops is by using a measurement of time
or k-cycles. This method is also discussed and similar examples to those
used for the [timout](http://www.csounds.com/manual/html/timout.html)
opcode are given so that both methods can be compared.

### timout Basics

The [timout](http://www.csounds.com/manual/html/timout.html) opcode
refers to the fact that in the traditional way of working with Csound,
each \"note\" (an \"i\" score event) has its own time. This is the
duration of the note, given in the score by the duration parameter,
abbreviated as \"p3\". A
[timout](http://www.csounds.com/manual/html/timout.html) statement says:
\"I am now jumping out of this p3 duration and establishing my own
time.\" This time will be repeated as long as the duration of the note
allows it.

Let\'s see an example. This is a sine tone with a moving frequency,
starting at 400 Hz and ending at 600 Hz. The duration of this movement
is 3 seconds for the first note, and 5 seconds for the second note:

   ***EXAMPLE 03C14\_Timout\_pre.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    kFreq     expseg    400, p3, 600
    aTone     poscil    .2, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 1 4 5
    </CsScore>
    </CsoundSynthesizer>

Now we perform a time loop with
[timout](http://www.csounds.com/manual/html/timout.html) which is 1
second long. So, for the first note, it will be repeated three times,
and five times for the second note:

   ***EXAMPLE 03C15\_Timout\_basics.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    loop:
              timout    0, 1, play
              reinit    loop
    play:
    kFreq     expseg    400, 1, 600
    aTone     poscil    .2, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 1 4 5
    </CsScore>
    </CsoundSynthesizer>

This is the general syntax of
[timout](http://www.csounds.com/manual/html/timout.html):

    first_label:
              timout    istart, idur, second_label
              reinit    first_label
    second_label:
    ... <any action you want to have here>

The **first\_label** is an arbitrary word (followed by a colon) to mark
the beginning of the time loop section. The **istart** argument for
timout tells Csound, when the **second\_label** section is to be
executed. Usually istart is zero, telling Csound: execute the
second\_label section immediately, without any delay. The **idur**
argument for timout defines for how many seconds the **second\_label**
section is to be executed before the time loop begins again. Note that
the **reinit first\_label** is necessary to start the second loop after
**idur** seconds with a resetting of all the values. (See the
explanations about reinitialization in the chapter [Initialization And
Performance
Pass](http://en.flossmanuals.net/bin/view/Csound/InitAndPerfPass)
section 03A.)

As usual when you work with the
[reinit](http://www.csounds.com/manual/html/reinit.html) opcode, you can
use a [rireturn](http://www.csounds.com/manual/html/rireturn.html)
statement to constrain the reinit-pass. In this way you can have both,
the timeloop section and the non-timeloop section in the body of an
instrument:

   ***EXAMPLE 03C16\_Timeloop\_and\_not.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    loop:
              timout    0, 1, play
              reinit    loop
    play:
    kFreq1    expseg    400, 1, 600
    aTone1    oscil3    .2, kFreq1, giSine
              rireturn  ;end of the time loop
    kFreq2    expseg    400, p3, 600
    aTone2    poscil    .2, kFreq2, giSine

              outs      aTone1+aTone2, aTone1+aTone2
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 1 4 5
    </CsScore>
    </CsoundSynthesizer>

### timout Applications

In a time loop, it is very important to change the duration of the loop.
This can be done either by referring to the duration of this note (p3)
\...

   ***EXAMPLE 03C17\_Timout\_different\_durations.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    loop:
              timout    0, p3/5, play
              reinit    loop
    play:
    kFreq     expseg    400, p3/5, 600
    aTone     poscil    .2, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 1 4 5
    </CsScore>
    </CsoundSynthesizer>

\... or by calculating new values for the loop duration on each reinit
pass, for instance by random values:

   ***EXAMPLE 03C18\_Timout\_random\_durations.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    loop:
    idur      random    .5, 3 ;new value between 0.5 and 3 seconds each time
              timout    0, idur, play
              reinit    loop
    play:
    kFreq     expseg    400, idur, 600
    aTone     poscil    .2, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 20
    </CsScore>
    </CsoundSynthesizer>

The applications discussed so far have the disadvantage that all the
signals inside the time loop must definitely be finished or interrupted,
when the next loop begins. In this way it is not possible to have any
overlapping of events. To achieve this, the time loop can be used to
simply **trigger an event**. This can be done with
[event\_i](http://www.csounds.com/manual/html/event_i.html) or
[scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html). In
the following example, the time loop in instrument 1 triggers a new
instance of instrument 2 with a duration of 1 to 5 seconds, every 0.5 to
2 seconds. So in most cases, the previous instance of instrument 2 will
still be playing when the new instance is triggered. Random calculations
are executed in instrument 2 so that each note will have a different
pitch,creating a glissando effect:

   ***EXAMPLE 03C19\_Timout\_trigger\_events.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1

      instr 1
    loop:
    idurloop  random    .5, 2 ;duration of each loop
              timout    0, idurloop, play
              reinit    loop
    play:
    idurins   random    1, 5 ;duration of the triggered instrument
              event_i   "i", 2, 0, idurins ;triggers instrument 2
      endin

      instr 2
    ifreq1    random    600, 1000 ;starting frequency
    idiff     random    100, 300 ;difference to final frequency
    ifreq2    =         ifreq1 - idiff ;final frequency
    kFreq     expseg    ifreq1, p3, ifreq2 ;glissando
    iMaxdb    random    -12, 0 ;peak randomly between -12 and 0 dB
    kAmp      transeg   ampdb(iMaxdb), p3, -10, 0 ;envelope
    aTone     poscil    kAmp, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 30
    </CsScore>
    </CsoundSynthesizer>

The last application of a time loop with the
[timout](http://www.csounds.com/manual/html/timout.html) opcode which is
shown here, is a **randomly moving envelope**. If you want to create an
envelope in Csound which moves between a lower and an upper limit, and
has one new random value in a certain time span (for instance, once a
second), the time loop with
[timout](http://www.csounds.com/manual/html/timout.html) is one way to
achieve it. A line movement must be performed in each time loop, from a
given starting value to a new evaluated final value. Then, in the next
loop, the previous final value must be set as the new starting value,
and so on. Here is a possible solution:

   ***EXAMPLE 03C20\_Timout\_random\_envelope.csd*** 

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

    giSine    ftgen     0, 0, 2^10, 10, 1
              seed      0

      instr 1
    iupper    =         0; upper and ...
    ilower    =         -24; ... lower limit in dB
    ival1     random    ilower, iupper; starting value
    loop:
    idurloop  random    .5, 2; duration of each loop
              timout    0, idurloop, play
              reinit    loop
    play:
    ival2     random    ilower, iupper; final value
    kdb       linseg    ival1, idurloop, ival2
    ival1     =         ival2; let ival2 be ival1 for next loop
              rireturn  ;end reinit section
    aTone     poscil    ampdb(kdb), 400, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 30
    </CsScore>
    </CsoundSynthesizer>

Note that in this case the oscillator has been put after the time loop
section (which is terminated by the
[rireturn](http://www.csounds.com/manual/html/rireturn.html) statement.
Otherwise the oscillator would start afresh with zero phase in each time
loop, thus producing clicks.

### Time Loops by using the *metro* Opcode

The [metro](http://www.csounds.com/manual/html/metro.html) opcode
outputs a \"1\" at distinct times, otherwise it outputs a \"0\". The
frequency of this \"banging\" (which is in some way similar to the metro
objects in PD or Max) is given by the *kfreq* input argument. So the
output of [metro](http://www.csounds.com/manual/html/metro.html) offers
a simple and intuitive method for controlling time loops, if you use it
to trigger a separate instrument which then carries out another job.
Below is a simple example for calling a subinstrument twice per second:

   ***EXAMPLE 03C21\_Timeloop\_metro.csd*** 

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

      instr 1; triggering instrument
    kTrig     metro     2; outputs "1" twice a second
     if kTrig == 1 then
              event     "i", 2, 0, 1
     endif
      endin

      instr 2; triggered instrument
    aSig      oscils    .2, 400, 0
    aEnv      transeg   1, p3, -10, 0
              outs      aSig*aEnv, aSig*aEnv
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 10
    </CsScore>
    </CsoundSynthesizer>

The example which is given above (03C19\_Timout\_trigger\_events.csd) as
a flexible time loop by
[timout](http://www.csounds.com/manual/html/timout.html), can be done
with the [metro](http://www.csounds.com/manual/html/metro.html) opcode
in this way:

   ***EXAMPLE 03C22\_Metro\_trigger\_events.csd***

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

    giSine    ftgen     0, 0, 2^10, 10, 1
              seed      0

      instr 1
    kfreq     init      1; give a start value for the trigger frequency
    kTrig     metro     kfreq
     if kTrig == 1 then ;if trigger impulse:
    kdur      random    1, 5; random duration for instr 2
              event     "i", 2, 0, kdur; call instr 2
    kfreq     random    .5, 2; set new value for trigger frequency
     endif
      endin

      instr 2
    ifreq1    random    600, 1000; starting frequency
    idiff     random    100, 300; difference to final frequency
    ifreq2    =         ifreq1 - idiff; final frequency
    kFreq     expseg    ifreq1, p3, ifreq2; glissando
    iMaxdb    random    -12, 0; peak randomly between -12 and 0 dB
    kAmp      transeg   ampdb(iMaxdb), p3, -10, 0; envelope
    aTone     poscil    kAmp, kFreq, giSine
              outs      aTone, aTone
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 30
    </CsScore>
    </CsoundSynthesizer>  

Note the differences in working with the
[metro](http://www.csounds.com/manual/html/metro.html) opcode compared
to the [timout](http://www.csounds.com/manual/html/timout.html) feature:

-   As [metro](http://www.csounds.com/manual/html/metro.html) works at
    k-time, you must use the k-variants of
    [event](http://www.csounds.com/manual/html/event.html) or
    [scoreline](http://www.csounds.com/manual/html/scoreline.html) to
    call the subinstrument. With
    [timout](http://www.csounds.com/manual/html/timout.html) you must
    use the i-variants of *event* or *scoreline*
    ([event\_i](http://www.csounds.com/manual/html/event_i.html) and
    [scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html)),
    because it uses reinitialization for performing the time loops.
-   You must select the one k-cycle where the
    [metro](http://www.csounds.com/manual/html/metro.html) opcode sends
    a \"1\". This is done with an if-statement. The rest of the
    instrument is not affected. If you use
    [timout](http://www.csounds.com/manual/html/timout.html), you
    usually must seperate the reinitialized from the not reinitialized
    section by a
    [rireturn](http://www.csounds.com/manual/html/rireturn.html)
    statement.

Links
-----

Steven Yi: Control Flow ([Part
I](http://www.csounds.com/journal/2006spring/controlFlow.html) = Csound
Journal Spring 2006, [Part
2](http://www.csounds.com/journal/2006summer/controlFlow_part2.html) =
Csound Journal Summer 2006)

 

1.  [Since the release of the new parser (Csound 5.14), you can also
    write without
    parentheses.]{#endnote-7ebb3e2b-2705-4f3d-9da0-10a356654503}
2.  [Instead of using \"od\" you can also use \"enduntil\" in the until
    loop.]{#endnote-be72b234-749d-40bd-a759-6d045fefc40b}
