03 G. USER DEFINED OPCODES
==========================

Opcodes are the core units of everything that Csound does. They are like
little machines that do a job, and programming is akin to connecting
these little machines to perform a larger job. An opcode usually has
something which goes into it: the inputs or arguments, and usually it
has something which comes out of it: the output which is stored in one
or more variables. Opcodes are written in the programming language C
(that is where the name *Csound* comes from). If you want to create a
new opcode in Csound, you must write it in C. How to do this is
described in the
[Extending Csound](13-a-developing-plugin-opcodes.md)
chapter of this manual, and is also described in the relevant
[chapter](http://www.csound.com/docs/manual/csound5extending.html)
of the
[Canonical Csound Reference Manual](http://www.csound.com/docs/manual/index.html).

There is, however, a way of writing your own opcodes in the Csound
Language itself. The opcodes which are written in this way, are called
*User Defined Opcodes* or *UDO*s. A *UDO* behaves in the same way as a
standard opcode: it has input arguments, and usually one or more output
variables. It runs at i-time or at k-time. You use them as part of the
Csound Language after you have defined and loaded them.

User Defined Opcodes have many valuable properties. They make your
instrument code clearer because they allow you to create abstractions
of  blocks of code. Once a *UDO* has been defined it can be recalled and
repeated many times within an orchestra, each repetition requiring only
a single line of code. *UDO*s allow you to build up your own library of
functions you need and return to frequently in your work. In this way,
you build your own Csound dialect within the Csound Language. *UDO*s also
represent a convenient format with which to share your work in Csound
with other users.

This chapter explains, initially with a very basic example, how you can
build your own *UDO*s, and what options they offer. Following this, the
practice of loading *UDO*s in your .csd file is shown, followed by some
tips in regard to some unique capabilities of *UDO*s.
Finally some examples are shown for
different User Defined Opcode definitions and applications.

If you want to write a User Defined Opcode in Csound6 which uses arrays,
have a look at the end of chapter
[03E](03-e-arrays.md) to see their usage and naming
conventions.

Transforming Csound Instrument Code to a User Defined Opcode
------------------------------------------------------------

Writing a User Defined Opcode is actually very easy and straightforward.
It mainly means to extract a portion of usual Csound instrument code,
and put it in the frame of a UDO. Let us start with the instrument code:

   ***EXAMPLE 03G01_Pre_UDO.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine    ftgen     0, 0, 2^10, 10, 1
          seed      0

  instr 1
aDel init 0; initialize delay signal
iFb = .7; feedback multiplier
aSnd rand .2; white noise
kdB randomi -18, -6, .4; random movement between -18 and -6
aSnd = aSnd * ampdb(kdB); applied as dB to noise
kFiltFq randomi 100, 1000, 1; random movement between 100 and 1000
aFilt reson aSnd, kFiltFq, kFiltFq/5; applied as filter center frequency
aFilt balance aFilt, aSnd; bring aFilt to the volume of aSnd
aDelTm randomi .1, .8, .2; random movement between .1 and .8 as delay time
aDel vdelayx aFilt + iFb*aDel, aDelTm, 1, 128; variable delay
kdbFilt randomi -12, 0, 1; two random movements between -12 and 0 (dB) ...
kdbDel randomi -12, 0, 1; ... for the filtered and the delayed signal
aOut = aFilt*ampdb(kdbFilt) + aDel*ampdb(kdbDel); mix it
outs aOut, aOut
  endin

</CsInstruments>
<CsScore>
i 1 0 60
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

This is a filtered noise, and its delay, which is fed back again into
the delay line at a certain ratio *iFb*. The filter is moving as *kFiltFq*
randomly between 100 and 1000 Hz. The volume of the filtered noise is
moving as *kdB* randomly between -18 dB and -6 dB. The delay time moves
between 0.1 and 0.8 seconds, and then both signals are mixed together.

### Basic Example

If this signal processing unit is to be transformed into a User Defined
Opcode, the first question is about the extend of the code that will be
encapsulated: where the UDO code will begin and end? The first solution
could be a radical, and possibly bad, approach: to transform the whole
instrument into a UDO.

   ***EXAMPLE 03G02_All_to_UDO.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine    ftgen     0, 0, 2^10, 10, 1
          seed      0

  opcode FiltFb, 0, 0
aDel init 0; initialize delay signal
iFb = .7; feedback multiplier
aSnd rand .2; white noise
kdB randomi -18, -6, .4; random movement between -18 and -6
aSnd = aSnd * ampdb(kdB); applied as dB to noise
kFiltFq randomi 100, 1000, 1; random movement between 100 and 1000
aFilt reson aSnd, kFiltFq, kFiltFq/5; applied as filter center frequency
aFilt balance aFilt, aSnd; bring aFilt to the volume of aSnd
aDelTm randomi .1, .8, .2; random movement between .1 and .8 as delay time
aDel vdelayx aFilt + iFb*aDel, aDelTm, 1, 128; variable delay
kdbFilt randomi -12, 0, 1; two random movements between -12 and 0 (dB) ...
kdbDel randomi -12, 0, 1; ... for the filtered and the delayed signal
aOut = aFilt*ampdb(kdbFilt) + aDel*ampdb(kdbDel); mix it
out aOut, aOut
  endop

instr 1
          FiltFb
endin

</CsInstruments>
<CsScore>
i 1 0 60
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Before we continue the discussion about the quality of this
transformation, we should have a look at the syntax first. The general
syntax for a User Defined Opcode is:

    opcode name, outtypes, intypes
    ...
    endop

Here, the **name** of the UDO is **FiltFb**. You are free to use any
name, but it is suggested that you begin the name with a capital letter.
By doing this, you avoid duplicating the name of most of the
pre-existing opcodes which normally start with a lower case letter.
As we have no input arguments and no output arguments for this first
version of FiltFb, both **outtypes** and **intypes** are set to zero.

Similar to the
[instr](http://www.csound.com/docs/manual/instr.html)
...
[endin](http://www.csounds.com/docs/manual/endin.html)
block of a normal instrument definition, for a UDO the **opcode ...
endop** keywords begin and end the UDO definition block. In the
instrument, the UDO is called like a normal opcode by using its name,
and in the same line the input arguments are listed on the right and the
output arguments on the left. In the previous a example, *FiltFb* has
no input and output arguments so it is called by just using its name:

    instr 1
     FiltFb
    endin

Now - why is this UDO more or less useless? It achieves nothing, when
compared to the original non UDO version, and in fact looses some of the
advantages of the instrument defined version. Firstly, it is not
advisable to include this line in the UDO:

    out       aOut, aOut

This statement writes the audio signal aOut from inside the UDO to the
output device. Imagine you want to change the output channels, or you
want to add any signal modifier after the opcode. This would be
impossible with this statement. So instead of including the *out*
opcode, we give the *FiltFb* UDO an audio output:

    xout      aOut

The [xout](http://www.csound.com/docs/manual/xout.html)
statement of a UDO definition works like the "outlets" in PD or Max,
sending the result(s) of an opcode back to the caller instrument.

Now let us consider the UDO's input arguments, choose which processes
should be carried out within the *FiltFb* unit, and what aspects would
offer greater flexibility if controllable from outside the UDO. First,
the **aSnd** parameter should not be restricted to a white noise with
amplitude 0.2, but should be an input (like a "signal inlet" in
PD/Max). This is implemented using the line:

    aSnd      xin

Both the output and the input type must be declared in the first line of
the UDO definition, whether they are i-, k- or a-variables. So instead
of *opcode FiltFb, 0, 0* the statement has changed now to *opcode
FiltFb, a, a*, because we have both input and output as a-variable.

The UDO is now much more flexible and logical: it takes any audio input,
it performs the filtered delay and feedback processing, and returns the
result as another audio signal. In the next example, instrument 1 does
exactly the same as before. Instrument 2 has live input instead.

   ***EXAMPLE 03G03_UDO_more_flex.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine    ftgen     0, 0, 2^10, 10, 1
          seed      0

  opcode FiltFb, a, a
aSnd      xin
aDel init 0; initialize delay signal
iFb = .7; feedback multiplier
kdB randomi -18, -6, .4; random movement between -18 and -6
aSnd = aSnd * ampdb(kdB); applied as dB to noise
kFiltFq randomi 100, 1000, 1; random movement between 100 and 1000
aFilt reson aSnd, kFiltFq, kFiltFq/5; applied as filter center frequency
aFilt balance aFilt, aSnd; bring aFilt to the volume of aSnd
aDelTm randomi .1, .8, .2; random movement between .1 and .8 as delay time
aDel vdelayx aFilt + iFb*aDel, aDelTm, 1, 128; variable delay
kdbFilt randomi -12, 0, 1; two random movements between -12 and 0 (dB) ...
kdbDel randomi -12, 0, 1; ... for the filtered and the delayed signal
aOut = aFilt*ampdb(kdbFilt) + aDel*ampdb(kdbDel); mix it
          xout      aOut
  endop

  instr 1; white noise input
aSnd      rand      .2
aOut      FiltFb    aSnd
          outs      aOut, aOut
  endin

  instr 2; live audio input
aSnd      inch      1; input from channel 1
aOut      FiltFb    aSnd
          outs      aOut, aOut
  endin

</CsInstruments>
<CsScore>
i 1 0 60 ;change to i 2 for live audio input
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Is There an Optimal Design for a User Defined Opcode?

Is this now the optimal version of the *FiltFb* User Defined Opcode?
Obviously there are other parts of the opcode definiton which could be
controllable from outside: the feedback multiplier **iFb**, the random
movement of the input signal **kdB**, the random movement of the filter
frequency **kFiltFq**, and the random movements of the output mix
**kdbSnd** and **kdbDel**. Is it better to put them outside of the
opcode definition, or is it better to leave them inside?

There is no general answer. It depends on the degree of abstraction you
desire or you prefer to relinquish. If you are working on a piece for
which all of the parameters settings are already defined as required in
the UDO, then control from the caller instrument may not be necessary.
The advantage of minimizing the number of input and output arguments is
the simplification in using the UDO. The more flexibility you require
from your UDO however, the greater the number of input arguments that
will be required. Providing more control is better for a later
reusability, but may be unnecessarily complicated.

Perhaps it is the best solution to have one abstract definition which
performs one task, and to create a derivative - also as UDO - fine tuned
for the particular project you are working on. The final example
demonstrates the definition of a general and more abstract UDO *FiltFb*,
and its various applications: instrument 1 defines the specifications in
the instrument itself; instrument 2 uses a second UDO *Opus123_FiltFb*
for this purpose; instrument 3 sets the general *FiltFb* in a new
context of two varying delay lines with a buzz sound as input signal.

   ***EXAMPLE 03G04_UDO_calls_UDO.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine    ftgen     0, 0, 2^10, 10, 1
          seed      0

  opcode FiltFb, aa, akkkia
; -- DELAY AND FEEDBACK OF A BAND FILTERED INPUT SIGNAL --
;input: aSnd = input sound
; kFb = feedback multiplier (0-1)
; kFiltFq: center frequency for the reson band filter (Hz)
; kQ = band width of reson filter as kFiltFq/kQ
; iMaxDel = maximum delay time in seconds
; aDelTm = delay time
;output: aFilt = filtered and balanced aSnd
; aDel = delay and feedback of aFilt

aSnd, kFb, kFiltFq, kQ, iMaxDel, aDelTm xin
aDel      init      0
aFilt     reson     aSnd, kFiltFq, kFiltFq/kQ
aFilt     balance   aFilt, aSnd
aDel      vdelayx   aFilt + kFb*aDel, aDelTm, iMaxDel, 128; variable delay
          xout      aFilt, aDel
  endop

  opcode Opus123_FiltFb, a, a
;;the udo FiltFb here in my opus 123 :)
;input = aSnd
;output = filtered and delayed aSnd in different mixtures
aSnd      xin
kdB       randomi   -18, -6, .4; random movement between -18 and -6
aSnd      =         aSnd * ampdb(kdB); applied as dB to noise
kFiltFq   randomi   100, 1000, 1; random movement between 100 and 1000
iQ        =         5
iFb       =         .7; feedback multiplier
aDelTm randomi .1, .8, .2; random movement between .1 and .8 as delay time
aFilt, aDel FiltFb    aSnd, iFb, kFiltFq, iQ, 1, aDelTm
kdbFilt   randomi   -12, 0, 1; two random movements between -12 and 0 (dB) ...
kdbDel    randomi   -12, 0, 1; ... for the noise and the delay signal
aOut      =         aFilt*ampdb(kdbFilt) + aDel*ampdb(kdbDel); mix it
          xout      aOut
  endop

  instr 1; well known context as instrument
aSnd      rand      .2
kdB       randomi   -18, -6, .4; random movement between -18 and -6
aSnd      =         aSnd * ampdb(kdB); applied as dB to noise
kFiltFq   randomi   100, 1000, 1; random movement between 100 and 1000
iQ        =         5
iFb       =         .7; feedback multiplier
aDelTm randomi .1, .8, .2; random movement between .1 and .8 as delay time
aFilt, aDel FiltFb    aSnd, iFb, kFiltFq, iQ, 1, aDelTm
kdbFilt   randomi   -12, 0, 1; two random movements between -12 and 0 (dB) ...
kdbDel    randomi   -12, 0, 1; ... for the noise and the delay signal
aOut      =         aFilt*ampdb(kdbFilt) + aDel*ampdb(kdbDel); mix it
aOut      linen     aOut, .1, p3, 3
          outs      aOut, aOut
  endin

  instr 2; well known context UDO which embeds another UDO
aSnd      rand      .2
aOut      Opus123_FiltFb aSnd
aOut      linen     aOut, .1, p3, 3
          outs      aOut, aOut
  endin

  instr 3; other context: two delay lines with buzz
kFreq     randomh   200, 400, .08; frequency for buzzer
aSnd      buzz      .2, kFreq, 100, giSine; buzzer as aSnd
kFiltFq   randomi   100, 1000, .2; center frequency
aDelTm1   randomi   .1, .8, .2; time for first delay line
aDelTm2   randomi   .1, .8, .2; time for second delay line
kFb1      randomi   .8, 1, .1; feedback for first delay line
kFb2      randomi   .8, 1, .1; feedback for second delay line
a0, aDel1 FiltFb    aSnd, kFb1, kFiltFq, 1, 1, aDelTm1; delay signal 1
a0, aDel2 FiltFb    aSnd, kFb2, kFiltFq, 1, 1, aDelTm2; delay signal 2
aDel1     linen     aDel1, .1, p3, 3
aDel2     linen     aDel2, .1, p3, 3
          outs      aDel1, aDel2
  endin

</CsInstruments>
<CsScore>
i 1 0 30
i 2 31 30
i 3 62 120
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The good thing about the different possibilities of writing a more
specified UDO, or a more generalized: You needn't decide this at the
beginning of your work. Just start with any formulation you find useful
in a certain situation. If you continue and see that you should have
some more parameters accessible, it should be easy to rewrite the UDO.
Just be careful not to confuse the different versions you create. Use
names like Faulty1, Faulty2 etc. instead of overwriting Faulty. Making
use of extensive commenting when you initially create the UDO will make
it easier to adapt the UDO at a later time. What are the inputs
(including the measurement units they use such as Hertz or seconds)?
What are the outputs? - How you do this, is up to you and depends on
your style and your preference.

How to Use the User Defined Opcode Facility in Practice
-------------------------------------------------------

In this section, we will address the main points of using UDOs: what you
must bear in mind when loading them, what special features they offer,
what restrictions you must be aware of and how you can build your own
language with them.

### Loading User Defined Opcodes in the Orchestra Header

As can be seen from the examples above, User Defined Opcodes must be
defined in the orchestra header (which is sometimes called *instrument
0*).

You can load as many User Defined Opcodes into a Csound orchestra as you
wish. As long as they do not depend on each other, their order is
arbitrarily. If UDO *Opus123_FiltFb* uses the UDO *FiltFb* for its
definition (see the example above), you must first load *FiltFb*, and
then *Opus123_FiltFb*. If not, you will get an error like this:

    orch compiler:
            opcode  Opus123_FiltFb  a       a
    error:  no legal opcode, line 25:
    aFilt, aDel FiltFb    aSnd, iFb, kFiltFq, iQ, 1, aDelTm

### Loading by an #include File

Definitions of User Defined Opcodes can also be loaded into a .csd file
by an
[#include](https://csound.com/docs/manual/include.html)
statement. What you must do is the following:

1.  Save your opcode definitions in a plain text file, for instance
    *MyOpcodes.txt*.
2.  If this file is in the same directory as your .csd file, you can
    just call it by the statement:

        #include "MyOpcodes.txt"

3.  If *MyOpcodes.txt* is in a different directory, you must call it
    by the full path name, for instance:

        #include "/Users/me/Documents/Csound/UDO/MyOpcodes.txt"

As always, make sure that the *#include* statement is the last one in
the orchestra header, and that the logical order is accepted if one
opcode depends on another.

If you work with User Defined Opcodes a lot, and build up a collection
of them, the *#include* feature allows you easily import several or all
of them to your .csd file.

### The setksmps Feature

The [ksmps](http://www.csound.com/docs/manual/ksmps.html)
assignment in the orchestra header cannot be changed during the
performance of a .csd file. But in a User Defined Opcode you have the
possibility of changing this value by a local assignment. If you
use a [setksmps](http://www.csounds.com/docs/manual/setksmps.html)
statement in your UDO, you can have a locally smaller value for the
number of samples per control cycle in the UDO. In the following
example, the print statement in the UDO prints ten times compared to one
time in the instrument, because ksmps in the UDO is 10 times smaller:

   ***EXAMPLE 03G06_UDO_setksmps.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-nm0
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 44100 ;very high because of printing

  opcode Faster, 0, 0
setksmps 4410 ;local ksmps is 1/10 of global ksmps
printks "UDO print!%n", 0
  endop

  instr 1
printks "Instr print!%n", 0 ;print each control period (once per second)
Faster ;print 10 times per second because of local ksmps
  endin

</CsInstruments>
<CsScore>
i 1 0 2
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Default Arguments

For i-time arguments, you can use a simple feature to set default
values:

-   *o* (instead of *i*) defaults to 0
-   *p* (instead of *i*) defaults to 1
-   *j* (instead of *i*) defaults to -1

For k-time arguments, you can use since Csound 5.18 these default
values:

-   *O* (instead of *k*) defaults to 0
-   *P* (instead of *k*) defaults to 1
-   *V* (instead of *k*) defaults to 0.5
-   *J* (instead of *k*) defaults to -1

So you can omit these arguments - in this case the default values will
be used. If you give an input argument instead, the default value will
be overwritten:

   ***EXAMPLE 03G07_UDO_default_args.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-nm0
</CsOptions>
<CsInstruments>

  opcode Defaults, iii, opj
ia, ib, ic xin
xout ia, ib, ic
  endop

instr 1
ia, ib, ic Defaults
           print     ia, ib, ic
ia, ib, ic Defaults  10
           print     ia, ib, ic
ia, ib, ic Defaults  10, 100
           print     ia, ib, ic
ia, ib, ic Defaults  10, 100, 1000
           print     ia, ib, ic
endin

</CsInstruments>
<CsScore>
i 1 0 0
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Overloading

Extending this example a bit shows an important feature of *UDO*s.
If we have different input and/or output types, we can use the
**same** name for the *UDO*. Csound will choose the appropriate version
depending on the context. This is a well-known practice in many
programming languages as *overloading a function*.

In the simple example below, the *i*-rate and the *k*-rate version of
the UDO are both called *Default*. Depending on the variable type and the
number of outputs, the correct version is used by Csound.

   ***EXAMPLE 03G08_UDO_overloading.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-nm0
</CsOptions>
<CsInstruments>
ksmps  = 32

  opcode Defaults, iii, opj
ia, ib, ic xin
xout ia, ib, ic
  endop

  opcode Defaults, kkkk, OPVJ
k1, k2, k3, k4 xin
xout k1, k2, k3, k4
  endop


instr 1
ia, ib, ic Defaults
           prints    "ia = %d, ib = %d, ic = %d\n", ia, ib, ic
ia, ib, ic Defaults  10
           prints    "ia = %d, ib = %d, ic = %d\n", ia, ib, ic
ia, ib, ic Defaults  10, 100
           prints    "ia = %d, ib = %d, ic = %d\n", ia, ib, ic
ia, ib, ic Defaults  10, 100, 1000
           prints    "ia = %d, ib = %d, ic = %d\n", ia, ib, ic
ka1, kb1, kc1, kd1 Defaults
printks   "ka = %d, kb = %d, kc = %.1f, kd = %d\n", 0, ka1, kb1, kc1, kd1
ka2, kb2, kc2, kd2 Defaults 2
printks   "ka = %d, kb = %d, kc = %.1f, kd = %d\n", 0, ka2, kb2, kc2, kd2
ka3, kb3, kc3, kd3 Defaults 2, 4
printks   "ka = %d, kb = %d, kc = %.1f, kd = %d\n", 0, ka3, kb3, kc3, kd3
ka4, kb4, kc4, kd4 Defaults 2, 4, 6
printks   "ka = %d, kb = %d, kc = %.1f, kd = %d\n", 0, ka4, kb4, kc4, kd4
ka5, kb5, kc5, kd5 Defaults 2, 4, 6, 8
printks   "ka = %d, kb = %d, kc = %.1f, kd = %d\n", 0, ka5, kb5, kc5, kd5
			turnoff
endin

</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Prints:

    ia = 0, ib = 1, ic = -1
    ia = 10, ib = 1, ic = -1
    ia = 10, ib = 100, ic = -1
    ia = 10, ib = 100, ic = 1000
    ka = 0, kb = 1, kc = 0.5, kd = -1
    ka = 2, kb = 1, kc = 0.5, kd = -1
    ka = 2, kb = 4, kc = 0.5, kd = -1
    ka = 2, kb = 4, kc = 6.0, kd = -1
    ka = 2, kb = 4, kc = 6.0, kd = 8


### Recursive User Defined Opcodes

Recursion means that a function can call itself. This is a feature which
can be useful in many situations. Also User Defined Opcodes can be
recursive. You can do many things with a recursive UDO which you cannot
do in any other way; at least not in a simliarly simple way. This is an
example of generating eight partials by a recursive UDO. See the last
example in the next section for a more musical application of a
recursive UDO.

   ***EXAMPLE 03G09_Recursive_UDO.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  opcode Recursion, a, iip
;input: frequency, number of partials, first partial (default=1)
ifreq, inparts, istart xin
iamp = 1/inparts/istart ;decreasing amplitudes for higher partials
 if istart < inparts then ;if inparts have not yet reached
acall Recursion ifreq, inparts, istart+1 ;call another instance of this UDO
 endif
aout      oscils    iamp, ifreq*istart, 0 ;execute this partial
aout      =         aout + acall ;add the audio signals
          xout      aout
  endop

  instr 1
amix      Recursion 400, 8 ;8 partials with a base frequency of 400 Hz
aout      linen     amix, .01, p3, .1
          outs      aout, aout
  endin

</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Examples
--------

We will focus here on some examples which will hopefully show the wide
range of User Defined Opcodes. Some of them are adaptions of examples
from previous chapters about the Csound Syntax.

### Play A Mono Or Stereo Soundfile

Csound is often very strict and gives errors where other applications
might *turn a blind eye*. This is also the case if you read a
soundfile using Csound's
[diskin](http://www.csound.com/docs/manual/diskin.html) opcode.
If your soundfile is mono, you must use the mono version, which has one
audio signal as output. If your soundfile is stereo, you must use the
stereo version, which outputs two audio signals. If you want a stereo
output, but you happen to have a mono soundfile as input, you will get
the error message:

    INIT ERROR in ...: number of output args inconsistent with number
    of file channels

It may be more useful to have an opcode which works for both, mono and
stereo files as input. This is a ideal job for a UDO. Two versions are
implemented here by overloading.
FilePlay either returns one audio signal (if the file is
stereo it uses just the first channel), or it returns two
audio signals (if the file is mono it duplicates this to both channels).
We can use the default arguments to make this opcode behave exactly as
a *tolerant diskin* ...

   ***EXAMPLE 03G10_UDO_FilePlay.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac --env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  opcode FilePlay, a, SKoo
;gives mono output (if file is stereo, just the first channel is used)
Sfil, kspeed, iskip, iloop xin
 if filenchnls(Sfil) == 1 then
aout      diskin   Sfil, kspeed, iskip, iloop
 else
aout, a0  diskin   Sfil, kspeed, iskip, iloop
 endif
          xout      aout
  endop

  opcode FilePlay, aa, SKoo
;gives stereo output (if file is mono, the channel is duplicated)
Sfil, kspeed, iskip, iloop xin
ichn      filenchnls Sfil
 if filenchnls(Sfil) == 1 then
aL        diskin    Sfil, kspeed, iskip, iloop
aR        =          aL
 else
aL, aR      diskin    Sfil, kspeed, iskip, iloop
 endif
          xout       aL, aR
  endop

  instr 1
aMono     FilePlay  "fox.wav", 1
          outs       aMono, aMono
  endin

  instr 2
aL, aR    FilePlay  "fox.wav", 1
          outs       aL, aR
  endin

</CsInstruments>
<CsScore>
i 1 0 4
i 2 4 4
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Change the Content of a Function Table

In example *03C11_Table_random_dev.csd*, a function table has been
changed at performance time, once a second, by random deviations. This
can be easily transformed to a User Defined Opcode. It takes the
function table variable, a trigger signal, and the random deviation in
percent as input. In each control cycle where the trigger signal is
*1*, the table values are read. The random deviation is applied, and
the changed values are written again into the table.


   ***EXAMPLE 03G11_UDO_rand_dev.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine ftgen 0, 0, 256, 10, 1; sine wave

opcode TabDirtk, 0, ikk
 ;"dirties" a function table by applying random deviations at a k-rate trigger
 ;input: function table, trigger (1 = perform manipulation),
 ;deviation as percentage
 ift, ktrig, kperc xin
 if ktrig == 1 then ;just work if you get a trigger signal
  kndx      =         0
  while kndx < ftlen(ift) do
   kval table kndx, ift; read old value
   knewval = kval + rnd31:k(kperc/100,0); calculate new value
   tablew knewval, kndx, giSine; write new value
   kndx += 1
  od
 endif
endop

  instr 1
kTrig metro 1 ;trigger signal once per second
kPerc linseg 0, p3, 100
TabDirtk giSine, kTrig, kPerc
aSig poscil .2, 400, giSine
out aSig, aSig
  endin

</CsInstruments>
<CsScore>
i 1 0 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The next example permutes a series of numbers randomly each
time it is called. For this purpose, one random element of the input array [^1]
is taken and written to the first position of the output array. Then
all elements which are "right of" this one random element are copied
one position to the left. As result the previously chosen
element is being overwritten, and the number of values to read is
shrinked by one. This process is done again and again, until each
*old* element has placed to a (potentially) *new* position in the
resulting output array.

[^1]: More precisely the random element is taken from a *copy* of
      the input array. This copy is always created by the UDO, so
      the original array is left untouched. This is visible in the
      last line of the printout.


   ***EXAMPLE 03G12_ArrPermRnd.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-nm0
</CsOptions>
<CsInstruments>
ksmps = 32
seed 0

opcode ArrPermRnd, i[], i[]
 iInArr[]     xin
 iLen         =        lenarray(iInArr)
 ;create output array and set index
 iOutArr[]    init     iLen
 iWriteIndx   =        0
 iReadLen     =        iLen
 ;for all elements:
 while iWriteIndx < iLen do
  ;get one random element and put it in iOutArr
  iRndIndx    =        int(random:i(0, iReadLen-.0001))
  iOutArr[iWriteIndx] = iInArr[iRndIndx]
  ;shift the elements after this one to the left
  while iRndIndx < iReadLen-1 do
   iInArr[iRndIndx] =  iInArr[iRndIndx+1]
   iRndIndx   +=       1
  od
  ;decrease length to read in and increase write index
  iReadLen    -=       1
  iWriteIndx  +=       1
  od
              xout     iOutArr
  endop

;create i-array as 1, 2, 3, ... 12
giArr[] genarray 1, 12

;permutation of giArr ...
instr Permut
 iPermut[] ArrPermRnd giArr
 printarray iPermut, "%d"
endin

;... which has not been touched by these operations
instr Print
 printarray giArr, "%d"
endin

</CsInstruments>
<CsScore>
i "Permut" 0  .01
i "Permut" +  .
i "Permut" +  .
i "Permut" +  .
i "Permut" +  .
i "Print" .05 .01
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Prints (for example):

    8 2 1 7 4 11 5 12 10 6 9 3
    7 5 3 2 11 12 9 8 1 10 6 4
    7 9 6 2 5 3 12 8 10 1 11 4
    1 12 10 11 9 5 4 8 6 7 2 3
    7 12 8 2 10 4 5 1 11 3 6 9
    1 2 3 4 5 6 7 8 9 10 11 12


### A Recursive User Defined Opcode for Additive Synthesis

In example 03F11
a number of partials were synthesized, each with a random frequency
deviation of up to 10% compared to precise harmonic spectrum frequencies
and a unique duration for each partial. This can also be written as a
recursive UDO. Each UDO generates one partial, and calls the UDO again
until the last partial is generated. Now the code can be reduced to two
instruments: instrument 1 performs the time loop, calculates the basic
values for one note, and triggers the event. Then instrument 11 is
called which feeds the UDO with the values and passes the audio signals
to the output.

   ***EXAMPLE 03G13_UDO_Recursive_AddSynth.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giSine    ftgen     0, 0, 2^10, 10, 1
          seed      0

  opcode PlayPartials, aa, iiipo
;plays inumparts partials with frequency deviation and own envelopes and
;durations for each partial
;ibasfreq: base frequency of sound mixture
;inumparts: total number of partials
;ipan: panning
;ipartnum: which partial is this (1 - N, default=1)
;ixtratim: extra time in addition to p3 needed for this partial (default=0)

ibasfreq, inumparts, ipan, ipartnum, ixtratim xin
ifreqgen  =         ibasfreq * ipartnum; general frequency of this partial
ifreqdev  random    -10, 10; frequency deviation between -10% and +10%
ifreq     =         ifreqgen + (ifreqdev*ifreqgen)/100; real frequency
ixtratim1 random    0, p3; calculate additional time for this partial
imaxamp   =         1/inumparts; maximum amplitude
idbdev    random    -6, 0; random deviation in dB for this partial
iamp = imaxamp * ampdb(idbdev-ipartnum); higher partials are softer
ipandev   random    -.1, .1; panning deviation
ipan      =         ipan + ipandev
aEnv      transeg   0, .005, 0, iamp, p3+ixtratim1-.005, -10, 0; envelope
aSine     poscil    aEnv, ifreq, giSine
aL1, aR1  pan2      aSine, ipan
 if ixtratim1 > ixtratim then
ixtratim  =  ixtratim1 ;set ixtratim to the ixtratim1 if the latter is larger
 endif
 if ipartnum < inumparts then ;if this is not the last partial
; -- call the next one
aL2, aR2  PlayPartials ibasfreq, inumparts, ipan, ipartnum+1, ixtratim
 else               ;if this is the last partial
p3        =         p3 + ixtratim; reset p3 to the longest ixtratim value
 endif
          xout      aL1+aL2, aR1+aR2
  endop

  instr 1; time loop with metro
kfreq     init      1; give a start value for the trigger frequency
kTrig     metro     kfreq
 if kTrig == 1 then ;if trigger impulse:
kdur      random    1, 5; random duration for instr 10
knumparts random    8, 14
knumparts =         int(knumparts); 8-13 partials
kbasoct   random    5, 10; base pitch in octave values
kbasfreq  =         cpsoct(kbasoct) ;base frequency
kpan      random    .2, .8; random panning between left (0) and right (1)
          event     "i", 11, 0, kdur, kbasfreq, knumparts, kpan; call instr 11
kfreq     random    .25, 1; set new value for trigger frequency
 endif
  endin

  instr 11; plays one mixture with 8-13 partials
aL, aR    PlayPartials p4, p5, p6
          outs      aL, aR
  endin

</CsInstruments>
<CsScore>
i 1 0 300
</CsScore>
</CsoundSynthesizer>
;Example by Joachim Heintz
~~~


### Filter implementation via Sample-by-Sample Processing

At the end of chapter 03A the ability of sample-by-sample processing has
been shown at some basic examples. This feature is really substantial
for writing digital filters. This can perfectly be done in the Csound
language itself. The next example shows an implementation of the zero
delay state variable filter by Steven Yi. In his collection at
[www.github.com/kunstmusik/libsyi](www.github.com/kunstmusik/libsyi)
more details and other implementaions can be found. --- Note also that
this code is another example of overloading a UDO definition. The same opcode
name is defined here twice; first with the input types aKK (one audio
signal and two k-signals with initialization), then with the input types
aaa.

   ***EXAMPLE 03G14_UDO_zdf_svf.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

    opcode zdf_svf,aaa,aKK

ain, kcf, kR     xin

; pre-warp the cutoff- these are bilinear-transform filters
kwd = 2 * $M_PI * kcf
iT  = 1/sr
kwa = (2/iT) * tan(kwd * iT/2)
kG  = kwa * iT/2

;; output signals
alp init 0
ahp init 0
abp init 0

;; state for integrators
kz1 init 0
kz2 init 0

;;
kindx = 0
while kindx < ksmps do
  khp = (ain[kindx] - (2*kR+kG) * kz1 - kz2) / (1 + (2*kR*kG) + (kG*kG))
  kbp = kG * khp + kz1
  klp = kG * kbp + kz2

  ; z1 register update
  kz1 = kG * khp + kbp
  kz2 = kG * kbp + klp

  alp[kindx] = klp
  ahp[kindx] = khp
  abp[kindx] = kbp
  kindx += 1
od

xout alp, abp, ahp


    endop

    opcode zdf_svf,aaa,aaa

ain, acf, aR     xin

iT  = 1/sr

;; output signals
alp init 0
ahp init 0
abp init 0

;; state for integrators
kz1 init 0
kz2 init 0

;;
kindx = 0
while kindx < ksmps do

  ; pre-warp the cutoff- these are bilinear-transform filters
  kwd = 2 * $M_PI * acf[kindx]
  kwa = (2/iT) * tan(kwd * iT/2)
  kG  = kwa * iT/2

  kR = aR[kindx]

  khp = (ain[kindx] - (2*kR+kG) * kz1 - kz2) / (1 + (2*kR*kG) + (kG*kG))
  kbp = kG * khp + kz1
  klp = kG * kbp + kz2

  ; z1 register update
  kz1 = kG * khp + kbp
  kz2 = kG * kbp + klp

  alp[kindx] = klp
  ahp[kindx] = khp
  abp[kindx] = kbp
  kindx += 1
od

xout alp, abp, ahp


    endop

giSine ftgen 0, 0, 2^14, 10, 1

instr 1

 aBuzz buzz 1, 100, 50, giSine
 aLp, aBp, aHp zdf_svf aBuzz, 1000, 1

 out aHp, aHp

endin


</CsInstruments>
<CsScore>
i 1 0 10
</CsScore>
</CsoundSynthesizer>
;example by steven yi
~~~
