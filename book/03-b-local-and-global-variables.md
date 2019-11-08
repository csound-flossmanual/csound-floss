03 B. LOCAL AND GLOBAL VARIABLES
================================

Variable Types
--------------

In Csound, there are several types of variables. It is important to
understand the differences between these types. There are

-   **initialization** variables, which are updated at each
    initialization pass, i.e. at the beginning of each note or score
    event. They start with the character **i**. To this group count also
    the score parameter fields, which always starts with a **p**,
    followed by any number: *p1* refers to the first parameter field in
    the score, *p2* to the second one, and so on. 
-   **control** variables, which are updated at each control cycle
    during the performance of an instrument. They start with the
    character **k**.
-   **audio** variables, which are also updated at each control cycle,
    but instead of a single number (like control variables) they consist
    of a vector (a collection of numbers), having in this way one number
    for each sample. They start with the character **a**.
-   **string** variables, which are updated either at i-time or at
    k-time (depending on the opcode which produces a string). They start
    with the character **S**.

Except these four standard types, there are two other variable types
which are used for spectral processing:

-   **f**-variables are used for the streaming phase vocoder opcodes
    (all starting with the characters **pvs**), which are very important
    for doing realtime FFT (Fast Fourier Transform) in Csound. They are
    updated at k-time, but their values depend also on the FFT
    parameters like frame size and overlap.
-   **w**-variables are used in some older spectral processing opcodes.

The following example exemplifies all the variable types (except the
w-type):

   ***EXAMPLE 03B01\_Variable\_types.csd***   

~~~
<CsoundSynthesizer>
<CsOptions>
--env:SSDIR+=../SourceMaterials -o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
0dbfs = 1
nchnls = 2

          seed      0; random seed each time different

  instr 1; i-time variables
iVar1     =         p2; second parameter in the score
iVar2     random    0, 10; random value between 0 and 10
iVar      =         iVar1 + iVar2; do any math at i-rate
          print     iVar1, iVar2, iVar
  endin

  instr 2; k-time variables
kVar1     line       0, p3, 10; moves from 0 to 10 in p3
kVar2     random     0, 10; new random value each control-cycle
kVar      =          kVar1 + kVar2; do any math at k-rate
; --- print each 0.1 seconds
printks   "kVar1 = %.3f, kVar2 = %.3f, kVar = %.3f%n", 0.1, kVar1, kVar2, kVar
  endin

  instr 3; a-variables
aVar1     poscil     .2, 400; first audio signal: sine
aVar2     rand       1; second audio signal: noise
aVar3     butbp      aVar2, 1200, 12; third audio signal: noise filtered
aVar      =          aVar1 + aVar3; audio variables can also be added
          outs       aVar, aVar; write to sound card
  endin

  instr 4; S-variables
iMyVar    random     0, 10; one random value per note
kMyVar    random     0, 10; one random value per each control-cycle
 ;S-variable updated just at init-time
SMyVar1   sprintf   "This string is updated just at init-time: kMyVar = %d\n", iMyVar
          printf_i  "%s", 1, SMyVar1
 ;S-variable updates at each control-cycle
          printks   "This string is updated at k-time: kMyVar = %.3f\n", .1, kMyVar
  endin

  instr 5; f-variables
aSig      rand       .2; audio signal (noise)
; f-signal by FFT-analyzing the audio-signal
fSig1     pvsanal    aSig, 1024, 256, 1024, 1
; second f-signal (spectral bandpass filter)
fSig2     pvsbandp   fSig1, 350, 400, 400, 450
aOut      pvsynth    fSig2; change back to audio signal
          outs       aOut*20, aOut*20
  endin

</CsInstruments>
<CsScore>
; p1    p2    p3
i 1     0     0.1
i 1     0.1   0.1
i 2     1     1
i 3     2     1
i 4     3     1
i 5     4     1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

You can think of variables as named connectors between opcodes. You can
connect the output from an opcode to the input of another. The type of
connector (audio, control, etc.) is determined by the first letter of
its name.

For a more detailed discussion, see the article 
[An overview Of Csound Variable Types](http://csoundjournal.com/issue10/CsoundRates.html) 
by Andrés Cabrera in the 
[Csound Journal](http://csoundjournal.com/index.html), and the
page about 
[Types, Constants and Variables](https://csound.com/docs/manual/OrchKvar.html) in the
[Canonical Csound Manual](https://csound.com/docs/manual/index.html).

Local Scope
-----------

The **scope** of these variables is usually the **instrument** in which
they are defined. They are **local** variables. In the following
example, the variables in instrument 1 and instrument 2 have the same
names, but different values.

   ***EXAMPLE 03B02\_Local\_scope.csd***    

~~~
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
nchnls = 2
0dbfs = 1

  instr 1
;i-variable
iMyVar    init      0
iMyVar    =         iMyVar + 1
          print     iMyVar
;k-variable
kMyVar    init      0
kMyVar    =         kMyVar + 1
          printk    0, kMyVar
;a-variable
aMyVar    oscils    .2, 400, 0
          outs      aMyVar, aMyVar
;S-variable updated just at init-time
SMyVar1   sprintf   "This string is updated just at init-time:
                     kMyVar = %d\n", i(kMyVar)
          printf    "%s", kMyVar, SMyVar1
;S-variable updated at each control-cycle
SMyVar2   sprintfk  "This string is updated at k-time:
                     kMyVar = %d\n", kMyVar
          printf    "%s", kMyVar, SMyVar2
  endin

  instr 2
;i-variable
iMyVar    init      100
iMyVar    =         iMyVar + 1
          print     iMyVar
;k-variable
kMyVar    init      100
kMyVar    =         kMyVar + 1
          printk    0, kMyVar
;a-variable
aMyVar    oscils    .3, 600, 0
          outs      aMyVar, aMyVar
;S-variable updated just at init-time
SMyVar1   sprintf   "This string is updated just at init-time:
                     kMyVar = %d\n", i(kMyVar)
          printf    "%s", kMyVar, SMyVar1
;S-variable updated at each control-cycle
SMyVar2   sprintfk  "This string is updated at k-time:
                     kMyVar = %d\n", kMyVar
          printf    "%s", kMyVar, SMyVar2
  endin

</CsInstruments>
<CsScore>
i 1 0 .3
i 2 1 .3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

This is the output (first the output at init-time by the print opcode,
then at each k-cycle the output of printk and the two printf opcodes):

    new alloc for instr 1:
    instr 1:  iMyVar = 1.000
     i   1 time     0.10000:     1.00000
    This string is updated just at init-time: kMyVar = 0
    This string is updated at k-time: kMyVar = 1
     i   1 time     0.20000:     2.00000
    This string is updated just at init-time: kMyVar = 0
    This string is updated at k-time: kMyVar = 2
     i   1 time     0.30000:     3.00000
    This string is updated just at init-time: kMyVar = 0
    This string is updated at k-time: kMyVar = 3
     B  0.000 ..  1.000 T  1.000 TT  1.000 M:  0.20000  0.20000
    new alloc for instr 2:
    instr 2:  iMyVar = 101.000
     i   2 time     1.10000:   101.00000
    This string is updated just at init-time: kMyVar = 100
    This string is updated at k-time: kMyVar = 101
     i   2 time     1.20000:   102.00000
    This string is updated just at init-time: kMyVar = 100
    This string is updated at k-time: kMyVar = 102
     i   2 time     1.30000:   103.00000
    This string is updated just at init-time: kMyVar = 100
    This string is updated at k-time: kMyVar = 103
    B  1.000 ..  1.300 T  1.300 TT  1.300 M:  0.29998  0.29998

 

Global Scope
------------

If you need variables which are recognized beyond the scope of an
instrument, you must define them as **global**. This is done by
prefixing the character **g** before the types i, k, a or S. See the
following example:

   ***EXAMPLE 03B03\_Global\_scope.csd***    

~~~
<CsoundSynthesizer>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
nchnls = 2
0dbfs = 1

 ;global scalar variables should be inititalized in the header
giMyVar   init      0
gkMyVar   init      0

  instr 1
 ;global i-variable
giMyVar   =         giMyVar + 1
          print     giMyVar
 ;global k-variable
gkMyVar   =         gkMyVar + 1
          printk    0, gkMyVar
 ;global S-variable updated just at init-time
gSMyVar1  sprintf   "This string is updated just at init-time:
                     gkMyVar = %d\n", i(gkMyVar)
          printf    "%s", gkMyVar, gSMyVar1
 ;global S-variable updated at each control-cycle
gSMyVar2  sprintfk  "This string is updated at k-time:
                     gkMyVar = %d\n", gkMyVar
          printf    "%s", gkMyVar, gSMyVar2
  endin

  instr 2
 ;global i-variable, gets value from instr 1
giMyVar   =         giMyVar + 1
          print     giMyVar
 ;global k-variable, gets value from instr 1
gkMyVar   =         gkMyVar + 1
          printk    0, gkMyVar
 ;global S-variable updated just at init-time, gets value from instr 1
          printf    "Instr 1 tells: '%s'\n", gkMyVar, gSMyVar1
 ;global S-variable updated at each control-cycle, gets value from instr 1
          printf    "Instr 1 tells: '%s'\n\n", gkMyVar, gSMyVar2
  endin

</CsInstruments>
<CsScore>
i 1 0 .3
i 2 0 .3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The output shows the global scope, as instrument 2 uses the values which
have been changed by instrument 1 in the same control cycle:

    new alloc for instr 1:
    instr 1:  giMyVar = 1.000
    new alloc for instr 2:
    instr 2:  giMyVar = 2.000
     i   1 time     0.10000:     1.00000
    This string is updated just at init-time: gkMyVar = 0
    This string is updated at k-time: gkMyVar = 1
     i   2 time     0.10000:     2.00000
    Instr 1 tells: 'This string is updated just at init-time: gkMyVar = 0'
    Instr 1 tells: 'This string is updated at k-time: gkMyVar = 1'
     i   1 time     0.20000:     3.00000
    This string is updated just at init-time: gkMyVar = 0
    This string is updated at k-time: gkMyVar = 3
     i   2 time     0.20000:     4.00000
    Instr 1 tells: 'This string is updated just at init-time: gkMyVar = 0'
    Instr 1 tells: 'This string is updated at k-time: gkMyVar = 3'
     i   1 time     0.30000:     5.00000
    This string is updated just at init-time: gkMyVar = 0
    This string is updated at k-time: gkMyVar = 5
     i   2 time     0.30000:     6.00000
    Instr 1 tells: 'This string is updated just at init-time: gkMyVar = 0'
    Instr 1 tells: 'This string is updated at k-time: gkMyVar = 5'


How To Work With Global Audio Variables
---------------------------------------

Some special considerations must be taken if you work with global audio
variables. Actually, Csound behaves basically the same whether you work
with a local or a global audio variable. But usually you work with
global audio variables if you want to **add** several audio signals to a
global signal, and that makes a difference.

The next few examples are going into a bit more detail. If you just want
to see the result (= global audio usually must be cleared), you can skip
the next examples and just go to the last one of this section.

It should be understood first that a global audio variable is treated
the same by Csound if it is applied like a local audio signal:

   ***EXAMPLE 03B04\_Global\_audio\_intro.csd***     

~~~
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  instr 1; produces a 400 Hz sine
gaSig     oscils    .1, 400, 0
  endin

  instr 2; outputs gaSig
          outs      gaSig, gaSig
  endin

</CsInstruments>
<CsScore>
i 1 0 3
i 2 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Of course there is no need to use a global variable in this case. If you
do it, you risk your audio will be overwritten by an instrument with a
higher number using the same variable name. In the following example,
you will just hear a 600 Hz sine tone, because the 400 Hz sine of
instrument 1 is overwritten by the 600 Hz sine of instrument 2:

   ***EXAMPLE 03B05\_Global\_audio\_overwritten.csd***      

~~~
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  instr 1; produces a 400 Hz sine
gaSig     oscils    .1, 400, 0
  endin

  instr 2; overwrites gaSig with 600 Hz sine
gaSig     oscils    .1, 600, 0
  endin

  instr 3; outputs gaSig
          outs      gaSig, gaSig
  endin

</CsInstruments>
<CsScore>
i 1 0 3
i 2 0 3
i 3 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

In general, you will use a global audio variable like a bus to which
several local audio signal can be **added**. It's this addition of a
global audio signal to its previous state which can cause some trouble.
Let's first see a simple example of a control signal to understand what
is happening:

   ***EXAMPLE 03B06\_Global\_audio\_added.csd***       

~~~
<CsoundSynthesizer>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
nchnls = 2
0dbfs = 1

  instr 1
kSum      init      0; sum is zero at init pass
kAdd      =         1; control signal to add
kSum      =         kSum + kAdd; new sum in each k-cycle
          printk    0, kSum; print the sum
  endin

</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

In this case, the \"sum bus\" kSum increases at each control cycle by 1,
because it adds the kAdd signal (which is always 1) in each k-pass to
its previous state. It is no different if this is done by a local
k-signal, like here, or by a global k-signal, like in the next example:

   ***EXAMPLE 03B07\_Global\_control\_added.csd***        

~~~
<CsoundSynthesizer>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
nchnls = 2
0dbfs = 1

gkSum     init      0; sum is zero at init

  instr 1
gkAdd     =         1; control signal to add
  endin

  instr 2
gkSum     =         gkSum + gkAdd; new sum in each k-cycle
          printk    0, gkSum; print the sum
  endin

</CsInstruments>
<CsScore>
i 1 0 1
i 2 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

What happens when working with audio signals instead of control signals
in this way, repeatedly adding a signal to its previous state? Audio
signals in Csound are a collection of numbers (a vector). The size of
this vector is given by the ksmps constant. If your sample rate is
44100, and ksmps=100, you will calculate 441 times in one second a
vector which consists of 100 numbers, indicating the amplitude of each
sample.

So, if you add an audio signal to its previous state, different things
can happen, depending on the vector's present and previous states. If
both previous and present states (with ksmps=9) are 
\[0 0.1 0.2 0.1 0 -0.1 -0.2 -0.1 0\] 
you will get a signal which is twice as strong: 
\[0 0.2 0.4 0.2 0 -0.2 -0.4 -0.2 0\]. But if the present state is opposite
\[0 -0.1 -0.2 -0.1 0 0.1 0.2 0.1 0\], you will only get zeros when you
add them. This is shown in the next example with a local audio variable,
and then in the following example with a global audio variable.

   ***EXAMPLE 03B08\_Local\_audio\_add.csd***     
    
~~~
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
            ;(change to 441 to see the difference)
nchnls = 2
0dbfs = 1

  instr 1
 ;initialize a general audio variable
aSum      init      0
 ;produce a sine signal (change frequency to 401 to see the difference)
aAdd      oscils    .1, 400, 0
 ;add it to the general audio (= the previous vector)
aSum      =         aSum + aAdd
kmax      max_k     aSum, 1, 1; calculate maximum
          printk    0, kmax; print it out
          outs      aSum, aSum
  endin

</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

 prints:

     i   1 time     0.10000:     0.10000
     i   1 time     0.20000:     0.20000
     i   1 time     0.30000:     0.30000
     i   1 time     0.40000:     0.40000
     i   1 time     0.50000:     0.50000
     i   1 time     0.60000:     0.60000
     i   1 time     0.70000:     0.70000
     i   1 time     0.80000:     0.79999
     i   1 time     0.90000:     0.89999
     i   1 time     1.00000:     0.99999


   ***EXAMPLE 03B09\_Global\_audio\_add.csd***         

~~~
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 4410; very high because of printing
            ;(change to 441 to see the difference)
nchnls = 2
0dbfs = 1

 ;initialize a general audio variable
gaSum     init      0

  instr 1
 ;produce a sine signal (change frequency to 401 to see the difference)
aAdd      oscils    .1, 400, 0
 ;add it to the general audio (= the previous vector)
gaSum     =         gaSum + aAdd
  endin

  instr 2
kmax      max_k     gaSum, 1, 1; calculate maximum
          printk    0, kmax; print it out
          outs      gaSum, gaSum
  endin

</CsInstruments>
<CsScore>
i 1 0 1
i 2 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

In both cases, you get a signal which increases each 1/10 second,
because you have 10 control cycles per second (ksmps=4410), and the
frequency of 400 Hz can be evenly divided by this. If you change the
ksmps value to 441, you will get a signal which increases much faster
and is out of range after 1/10 second. If you change the frequency to
401 Hz, you will get a signal which increases first, and then decreases,
because each audio vector has 40.1 cycles of the sine wave. So the
phases are shifting; first getting stronger and then weaker. If you
change the frequency to 10 Hz, and then to 15 Hz (at ksmps=44100), you
cannot hear anything, but if you render to file, you can see the whole
process of either enforcing or erasing quite clear:

![*<small>Self-reinforcing global audio signal on account of its state in one
control cycle being the same as in the previous one</small>*](../resources/images/03-b-add-freq10hz-1.png)

![*<small>Partly self-erasing global audio signal because of phase inversions in
two subsequent control cycles</small>*](../resources/images/03-b-add-freq15hz-1.png)


So the result of all is: If you work with global audio variables in a
way that you add several local audio signals to a global audio variable
(which works like a bus), you must **clear** this global bus at each
control cycle. As in Csound all the instruments are calculated in
ascending order, it should be done either at the beginning of the
**first**, or at the end of the **last** instrument. Perhaps it is the
best idea to declare all global audio variables in the orchestra header
first, and then clear them in an \"always on\" instrument with the
highest number of all the instruments used. This is an example of a
typical situation:

 

   ***EXAMPLE 03B10\_Global\_with\_clear.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

 ;initialize the global audio variables
gaBusL    init      0
gaBusR    init      0
 ;make the seed for random values each time different
          seed      0

  instr 1; produces short signals
 loop:
iDur      random    .3, 1.5
          timout    0, iDur, makenote
          reinit    loop
 makenote:
iFreq     random    300, 1000
iVol      random    -12, -3; dB
iPan      random    0, 1; random panning for each signal
aSin      oscil3    ampdb(iVol), iFreq, 1
aEnv      transeg   1, iDur, -10, 0; env in a-rate is cleaner
aAdd      =         aSin * aEnv
aL, aR    pan2      aAdd, iPan
gaBusL    =         gaBusL + aL; add to the global audio signals
gaBusR    =         gaBusR + aR
  endin

  instr 2; produces short filtered noise signals (4 partials)
 loop:
iDur      random    .1, .7
          timout    0, iDur, makenote
          reinit    loop
 makenote:
iFreq     random    100, 500
iVol      random    -24, -12; dB
iPan      random    0, 1
aNois     rand      ampdb(iVol)
aFilt     reson     aNois, iFreq, iFreq/10
aRes      balance   aFilt, aNois
aEnv      transeg   1, iDur, -10, 0
aAdd      =         aRes * aEnv
aL, aR    pan2      aAdd, iPan
gaBusL    =         gaBusL + aL; add to the global audio signals
gaBusR    =         gaBusR + aR
  endin

  instr 3; reverb of gaBus and output
aL, aR    freeverb  gaBusL, gaBusR, .8, .5
          outs      aL, aR
  endin

  instr 100; clear global audios at the end
          clear     gaBusL, gaBusR
  endin

</CsInstruments>
<CsScore>
f 1 0 1024 10 1 .5 .3 .1
i 1 0 20
i 2 0 20
i 3 0 20
i 100 0 20
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~
 

The *chn* Opcodes for Global Variables
----------------------------------------

Instead of using the traditional g-variables for any values or signals
which are to transfer between several instruments, many users prefer 
to use the [chn](https://csound.com/docs/manual/chn.html) opcodes.
An i-, k-, a- or S-value or signal can be set by
[chnset](https://csound.com/docs/manual/chnset.html) and received by
[chnget](https://csound.com/docs/manual/chnget.html). One advantage
is to have strings as names, so that you can choose intuitive names.

For audio variables, instead of performing an addition, you can use the
[chnmix](https://csound.com/docs/manual/chnmix.html) opcode. For
clearing an audio variable, the
[chnclear](https://csound.com/docs/manual/chnclear.html) opcode can
be used.

   ***EXAMPLE 03B11\_Chn\_demo.csd*** 

~~~
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  instr 1; send i-values
          chnset    1, "sio"
          chnset    -1, "non"
  endin

  instr 2; send k-values
kfreq     randomi   100, 300, 1
          chnset    kfreq, "cntrfreq"
kbw       =         kfreq/10
          chnset    kbw, "bandw"
  endin

  instr 3; send a-values
anois     rand      .1
          chnset    anois, "noise"
 loop:
idur      random    .3, 1.5
          timout    0, idur, do
          reinit    loop
 do:
ifreq     random    400, 1200
iamp      random    .1, .3
asig      oscils    iamp, ifreq, 0
aenv      transeg   1, idur, -10, 0
asine     =         asig * aenv
          chnset    asine, "sine"
  endin

  instr 11; receive some chn values and send again
ival1     chnget    "sio"
ival2     chnget    "non"
          print     ival1, ival2
kcntfreq  chnget    "cntrfreq"
kbandw    chnget    "bandw"
anoise    chnget    "noise"
afilt     reson     anoise, kcntfreq, kbandw
afilt     balance   afilt, anoise
          chnset    afilt, "filtered"
  endin

  instr 12; mix the two audio signals
amix1     chnget     "sine"
amix2     chnget     "filtered"
          chnmix     amix1, "mix"
          chnmix     amix2, "mix"
  endin

  instr 20; receive and reverb
amix      chnget     "mix"
aL, aR    freeverb   amix, amix, .8, .5
          outs       aL, aR
  endin

  instr 100; clear
          chnclear   "mix"
  endin

</CsInstruments>
<CsScore>
i 1 0 20
i 2 0 20
i 3 0 20
i 11 0 20
i 12 0 20
i 20 0 20
i 100 0 20
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

