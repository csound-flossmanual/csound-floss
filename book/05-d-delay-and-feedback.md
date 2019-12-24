05 D. DELAY AND FEEDBACK
========================

A delay in DSP is a special kind of buffer, sometimes called a *circular
buffer*. The length of this buffer is finite and must be declared upon
initialization as it is stored in RAM. One way to think of the circular
buffer is that as new items are added at the beginning of the buffer the
oldest items at the end of the buffer are being "shoved" out.

Besides their typical application for creating echo effects, delays can
also be used to implement chorus, flanging, pitch shifting and filtering
effects.

Csound offers many opcodes for implementing delays. Some of these offer
varying degrees of quality - often balanced against varying degrees of
efficiency whilst some are for quite specialized purposes.


Basic Delay Line Read-Write Unit
--------------------------------

To begin with, this section is going to focus upon a pair of opcodes,
[delayr](https://csound.com/docs/manual/delayr.html) and
[delayw](https://csound.com/docs/manual/delayw.html). Whilst not
the most efficient to use in terms of the number of lines of code
required, the use of *delayr* and *delayw* helps to clearly illustrate
how a delay buffer works. Besides this, *delayr* and *delayw* actually
offer a lot more flexibility and versatility than many of the other
delay opcodes.

When using *delayr* and *delayw* the establishement of a delay buffer is
broken down into two steps: reading from the end of the buffer using
*delayr* (and by doing this defining the length or duration of the
buffer) and then writing into the beginning of the buffer using
*delayw*.

The code employed might look like this:

    aSigOut  delayr  1
             delayw  aSigIn

where *aSigIn* is the input signal written into the beginning of the
buffer and *aSigOut* is the output signal read from the end of the
buffer. The fact that we declare reading from the buffer before writing
to it is sometimes initially confusing but, as alluded to before, one
reason this is done is to declare the length of the buffer. The buffer
length in this case is 1 second and this will be the apparent time delay
between the input audio signal and audio read from the end of the
buffer.

The following example implements the delay described above in a *.csd*
file. An input sound of sparse sine tone pulses is created. This is
written into the delay buffer from which a new audio signal is created
by read from the end of this buffer. The input signal (sometimes
referred to as the dry signal) and the delay output signal (sometimes
referred to as the wet signal) are mixed and set to the output. The
delayed signal is attenuated with respect to the input signal.


   ***EXAMPLE 05D01_delay.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

  instr 1
; -- create an input signal: short 'blip' sounds --
kEnv    loopseg  0.5, 0, 0, 0,0.0005, 1 , 0.1, 0, 1.9, 0, 0
kCps    randomh  400, 600, 0.5
aEnv    interp   kEnv
aSig    poscil   aEnv, kCps

; -- create a delay buffer --
aBufOut delayr   0.3
        delayw   aSig

; -- send audio to output (input and output to the buffer are mixed)
        out      aSig + (aBufOut*0.4)
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Delay with Feedback
-------------------

If we mix some of the delayed signal into the input signal that is
written into the buffer then we will delay some of the delayed signal
thus creating more than a single echo from each input sound. Typically
the sound that is fed back into the delay input is attenuated, so that
sound cycles through the buffer indefinitely but instead will eventually
die away. We can attenuate the feedback signal by multiplying it by a
value in the range zero to 1. The rapidity with which echoes will die
away is defined by how close to zero this value is. The following
example implements a simple delay with feedback.


   ***EXAMPLE 05D02_delay_feedback.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac ;activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

  instr 1
; -- create an input signal: short 'blip' sounds --
kEnv    loopseg  0.5,0,0,0,0.0005,1,0.1,0,1.9,0,0 ; repeating envelope
kCps    randomh  400, 600, 0.5                    ; 'held' random values
aEnv    interp   kEnv                             ; a-rate envelope
aSig    poscil   aEnv, kCps                       ; generate audio

; -- create a delay buffer --
iFdback =        0.7                    ; feedback ratio
aBufOut delayr   0.3                    ; read audio from end of buffer
; write audio into buffer (mix in feedback signal)
        delayw   aSig+(aBufOut*iFdback)

; send audio to output (mix the input signal with the delayed signal)
        out      aSig + (aBufOut*0.4)
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Tap Delay Line
--------------

Constructing a delay effect in this way is rather limited as the delay
time is static. If we want to change the delay time we need to
reinitialise the code that implements the delay buffer. A more flexible
approach is to read audio from within the buffer using one of Csounds
opcodes for *tapping* a delay buffer,
[deltap](https://csound.com/docs/manual/deltap.html),
[deltapi](https://csound.com/docs/manual/deltapi.html),
[deltap3](https://csound.com/docs/manual/deltap3.html) or
[deltapx](https://csound.com/docs/manual/deltapx.html).
The opcodes are listed in order of increasing quality
which also reflects an increase in computational expense. In the next
example a delay tap is inserted within the delay buffer (between the
*delayr* and the *delayw* opcodes). As our delay time is modulating
quite quickly we will use *deltapi* which uses linear interpolation as
it rebuilds the audio signal whenever the delay time is moving. Note
that this time we are not using the audio output from the *delayr*
opcode as we are using the audio output from *deltapi* instead. The
delay time used by *deltapi* is created by *randomi* which creates a
random function of straight line segments. A-rate is used for the delay
time to improve the accuracy of its values, use of k-rate would result
in a noticeably poorer sound quality. You will notice that as well as
modulating the time gap between echoes, this example also modulates the
pitch of the echoes -- if the delay tap is static within the buffer
there would be no change in pitch, if it is moving towards the beginning
of the buffer then pitch will rise and if it is moving towards the end
of the buffer then pitch will drop. This side effect has led to digital
delay buffers being used in the design of many pitch shifting effects.

The user must take care that the delay time demanded from the delay tap
does not exceed the length of the buffer as defined in the *delayr*
line. If it does it will attempt to read data beyond the end of the RAM
buffer -- the results of this are unpredictable. The user must also take
care that the delay time does not go below zero, in fact the minumum
delay time that will be permissible will be the duration of one k cycle
(ksmps/sr).


   ***EXAMPLE 05D03_deltapi.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

  instr 1
; -- create an input signal: short 'blip' sounds --
kEnv          loopseg  0.5,0,0,0,0.0005,1,0.1,0,1.9,0,0
aEnv          interp   kEnv
aSig          poscil   aEnv, 500

aDelayTime    randomi  0.05, 0.2, 1      ; modulating delay time
; -- create a delay buffer --
aBufOut       delayr   0.2               ; read audio from end of buffer
aTap          deltapi  aDelayTime        ; 'tap' the delay buffer
              delayw   aSig + (aTap*0.9) ; write audio into buffer

; send audio to the output (mix the input signal with the delayed signal)
              out      aSig + (aTap*0.4)
  endin

</CsInstruments>
<CsScore>
i 1 0 30
e
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


We are not limited to inserting only a single delay tap within the
buffer. If we add further taps we create what is known as a *multi-tap
delay*. The following example implements a multi-tap delay with three
delay taps. Note that only the final delay (the one closest to the end
of the buffer) is fed back into the input in order to create feedback
but all three taps are mixed and sent to the output. There is no reason
not to experiment with arrangements other than this, but this one is
most typical.

   ***EXAMPLE 05D04_multi-tap_delay.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

  instr 1
; -- create an input signal: short 'blip' sounds --
kEnv    loopseg  0.5,0,0,0,0.0005,1,0.1,0,1.9,0,0; repeating envelope
kCps    randomh  400, 1000, 0.5                 ; 'held' random values
aEnv    interp   kEnv                           ; a-rate envelope
aSig    poscil   aEnv, kCps                     ; generate audio

; -- create a delay buffer --
aBufOut delayr   0.5                    ; read audio end buffer
aTap1   deltap   0.1373                 ; delay tap 1
aTap2   deltap   0.2197                 ; delay tap 2
aTap3   deltap   0.4139                 ; delay tap 3
        delayw   aSig + (aTap3*0.4)     ; write audio into buffer

; send audio to the output (mix the input signal with the delayed signals)
        out      aSig + ((aTap1+aTap2+aTap3)*0.4)
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~



Flanger
-------

As mentioned at the top of this section many familiar effects are
actually created from using delay buffers in various ways. We will
briefly look at one of these effects: the flanger. Flanging derives from
a phenomenon which occurs when the delay time becomes so short that we
begin to no longer perceive individual echoes. Instead a stack of
harmonically related resonances are perceived whichs frequencies are in
simple ratio with *1/delay_time*. This effect is known as a comb filter and is explained in the previous chapter.
When the delay time is slowly modulated and the resonances shifting up
and down in sympathy the effect becomes known as a flanger. In this
example the delay time of the flanger is modulated using an LFO that
employs an U-shaped parabola as its waveform as this seems to provide
the smoothest comb filter modulations.


   ***EXAMPLE 05D05_flanger.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

giLFOShape  ftgen   0, 0, 2^12, 19, 0.5, 1, 180, 1 ; u-shaped parabola

  instr 1
aSig    pinkish  0.1                               ; pink noise

aMod    poscil   0.005, 0.05, giLFOShape           ; delay time LFO
iOffset =        ksmps/sr                          ; minimum delay time
kFdback linseg   0.8,(p3/2)-0.5,0.95,1,-0.95       ; feedback

; -- create a delay buffer --
aBufOut delayr   0.5                   ; read audio from end buffer
aTap    deltap3  aMod + iOffset        ; tap audio from within buffer
        delayw   aSig + (aTap*kFdback) ; write audio into buffer

; send audio to the output (mix the input signal with the delayed signal)
        out      aSig + aTap
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Delay buffers can be used to implement a wide variety of signal
processing effects beyond simple echo effects. This chapter has
introduced the basics of working with Csound's delay opcodes and also
hinted at some of the further possibilities available.
