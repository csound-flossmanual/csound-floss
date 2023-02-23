# 05 D. DELAY AND FEEDBACK

A delay in DSP is a special kind of buffer, sometimes called a _circular
buffer_. The length of this buffer is finite and must be declared upon
initialization as it is stored in RAM. One way to think of the circular
buffer is that as new items are added at the beginning of the buffer the
oldest items at the end of the buffer are being "shoved" out.

Besides their typical application for creating echo effects, delays can
also be used to implement chorus, flanging, pitch shifting and filtering
effects.

Csound offers many opcodes for implementing delays. Some of these offer
varying degrees of quality - often balanced against varying degrees of
efficiency whilst some are for quite specialized purposes.

## Basic Delay Line Read-Write Unit

To begin with, this section is going to focus upon a pair of opcodes,&nbsp;
[delayr](https://csound.com/docs/manual/delayr.html) and&nbsp;
[delayw](https://csound.com/docs/manual/delayw.html). Whilst not
the most efficient to use in terms of the number of lines of code
required, the use of _delayr_ and _delayw_ helps to clearly illustrate
how a delay buffer works. Besides this, _delayr_ and _delayw_ actually
offer a lot more flexibility and versatility than many of the other
delay opcodes.

When using _delayr_ and _delayw_ the establishement of a delay buffer is
broken down into two steps: reading from the end of the buffer using&nbsp;
_delayr_ (and by doing this defining the length or duration of the
buffer) and then writing into the beginning of the buffer using&nbsp;
_delayw_.

The code employed might look like this:

    aSigOut  delayr  1
             delayw  aSigIn

where _aSigIn_ is the input signal written into the beginning of the
buffer and _aSigOut_ is the output signal read from the end of the
buffer. The fact that we declare reading from the buffer before writing
to it is sometimes initially confusing but, as alluded to before, one
reason this is done is to declare the length of the buffer. The buffer
length in this case is 1 second and this will be the apparent time delay
between the input audio signal and audio read from the end of the
buffer.

The following example implements the delay described above in a
&nbsp;_.csd_ file. An input sound of sparse sine tone pulses is created. This is
written into the delay buffer from which a new audio signal is created
by read from the end of this buffer. The input signal (sometimes
referred to as the dry signal) and the delay output signal (sometimes
referred to as the wet signal) are mixed and set to the output. The
delayed signal is attenuated with respect to the input signal.

#### **_EXAMPLE 05D01_delay.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
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
aOut    =        aSig + (aBufOut*0.4)
        out      aOut/2, aOut/2
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
```

## Delay with Feedback

If we mix some of the delayed signal into the input signal that is
written into the buffer then we will delay some of the delayed signal
thus creating more than a single echo from each input sound. Typically
the sound that is fed back into the delay input is attenuated, so that
sound cycles through the buffer indefinitely but instead will eventually
die away. We can attenuate the feedback signal by multiplying it by a
value in the range zero to 1. The rapidity with which echoes will die
away is defined by how close to zero this value is. The following
example implements a simple delay with feedback.

#### **_EXAMPLE 05D02_delay_feedback.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ;activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
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
aOut    =        aSig + (aBufOut*0.4)
        out      aOut/2, aOut/2
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
```

An alternative for implementing a simple delay-feedback line in Csound would be to use
the [delay](https://csound.com/docs/manual/delay.html) opcode.
This is the same example done in this way:

#### **_EXAMPLE 05D03_delay_feedback_2.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

  instr 1
kEnv    loopseg  0.5,0,0,0,0.0005,1,0.1,0,1.9,0,0
kCps    randomh  400, 600, 0.5
aSig    poscil   a(kEnv), kCps

iFdback =        0.7           ; feedback ratio
aDelay  init     0             ; initialize delayed signal
aDelay  delay    aSig+(aDelay*iFdback), .3 ;delay 0.3 seconds

aOut    =        aSig + (aDelay*0.4)
        out      aOut/2, aOut/2
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy and joachim heintz
```

## Tap Delay Line

Constructing a delay effect in this way is rather limited as the delay
time is static. If we want to change the delay time we need to
reinitialise the code that implements the delay buffer. A more flexible
approach is to read audio from within the buffer using one of Csounds
opcodes for _tapping_ a delay buffer,&nbsp;
[deltap](https://csound.com/docs/manual/deltap.html),&nbsp;
[deltapi](https://csound.com/docs/manual/deltapi.html),&nbsp;
[deltap3](https://csound.com/docs/manual/deltap3.html) or&nbsp;
[deltapx](https://csound.com/docs/manual/deltapx.html).
The opcodes are listed in order of increasing quality
which also reflects an increase in computational expense. In the next
example a delay tap is inserted within the delay buffer (between the
_delayr_ and the _delayw_ opcodes). As our delay time is modulating
quite quickly we will use _deltapi_ which uses linear interpolation as
it rebuilds the audio signal whenever the delay time is moving. Note
that this time we are not using the audio output from the _delayr_
opcode as we are using the audio output from _deltapi_ instead. The
delay time used by _deltapi_ is created by _randomi_ which creates a
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
does not exceed the length of the buffer as defined in the _delayr_
line. If it does it will attempt to read data beyond the end of the RAM
buffer -- the results of this are unpredictable. The user must also take
care that the delay time does not go below zero, in fact the minumum
delay time that will be permissible will be the duration of one k cycle
(ksmps/sr).

#### **_EXAMPLE 05D04_deltapi.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
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
aOut          linen    aSig + (aTap*0.4), .1, p3, 1
              out      aOut/2, aOut/2
  endin

</CsInstruments>
<CsScore>
i 1 0 30
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
```

We are not limited to inserting only a single delay tap within the
buffer. If we add further taps we create what is known as a _multi-tap
delay_. The following example implements a multi-tap delay with three
delay taps. Note that only the final delay (the one closest to the end
of the buffer) is fed back into the input in order to create feedback
but all three taps are mixed and sent to the output. There is no reason
not to experiment with arrangements other than this, but this one is
most typical.

#### **_EXAMPLE 05D05_multi-tap_delay.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
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
aOut    linen    aSig + ((aTap1+aTap2+aTap3)*0.4), .1, p3, 1
        out      aOut/2, aOut/2
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
```

## Flanger

As mentioned at the top of this section many familiar effects are
actually created from using delay buffers in various ways. We will
briefly look at one of these effects: the flanger. Flanging derives from
a phenomenon which occurs when the delay time becomes so short that we
begin to no longer perceive individual echoes. Instead a stack of
harmonically related resonances are perceived whichs frequencies are in
simple ratio with _1/delay_time_. This effect is known as a comb filter and is explained in the previous chapter.
When the delay time is slowly modulated and the resonances shifting up
and down in sympathy the effect becomes known as a flanger. In this
example the delay time of the flanger is modulated using an LFO that
employs an U-shaped parabola as its waveform as this seems to provide
the smoothest comb filter modulations.

#### **_EXAMPLE 05D06_flanger.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
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
aOut    linen    (aSig + aTap)/2, .1, p3, 1
        out      aOut, aOut
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
```

As alternative to using the _deltap_ group of opcodes, Csound provides opcodes which start
with _vdel_ (for _variable delay line_). They establish one single delay line per opcode.
This may be easier to write for one or few taps, whereas for a large number of taps the
method which has been described in the previous examples is preferable.

Basically all these opcode have three main arguments:

1. The audio input signal.
2. The delay time as audio signal.
3. The maximum possible delay time.

Some caution must be given to the unit in argument 2 and 3:&nbsp;
[vdelay](https://csound.com/docs/manual/vdelay.html) and&nbsp;
[vdelay3](https://csound.com/docs/manual/vdelay3.html) use _milliseconds_ here,
whereas [vdelayx](https://csound.com/docs/manual/vdelayx.html) uses seconds (as nearly every other opcode in Csound).

This is an identical version of the previous _flanger_ example which
uses _vdelayx_ instead of _deltap3_.
The _vdelayx_ opcode has an additional parameter which allows the user to set
the number of samples to be used for interpolation between 4 and 1024.
The higher the number, the better the quality, requiring yet more rendering power.

#### **_EXAMPLE 05D07_flanger_2.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giLFOShape  ftgen   0, 0, 2^12, 19, 0.5, 1, 180, 1

  instr 1
aSig    pinkish  0.1

aMod    poscil   0.005, 0.05, giLFOShape
iOffset =        ksmps/sr
kFdback linseg   0.8,(p3/2)-0.5,0.95,1,-0.95

aDelay  init     0
aDelay  vdelayx  aSig+aDelay*kFdback, aMod+iOffset, 0.5, 128

aOut    linen    (aSig+aDelay)/2, .1, p3, 1
        out      aOut, aOut
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy and joachim heintz
```

## Custom Delay Line

As an advanced insight into sample-by-sample processing in Csound, we end here with an intruiging example by Steven Yi (showed on the Csound mailing list 2019/12/11). It demonstrates how a delay line can be created as Csound array which is written and read as circular buffer. Here are some comments:

- Line 15: The array is created with the size _delay-time times sample-rate_,
  in our case 0.25 \* 44100 = 11025. So 11025 samples can be stored in this array.
- Line 16-17: The read pointer _kread_ptr_ is set to the second element (index=1),
  the write pointer _kwrite_ptr_ is set to the first element (index=0) at beginning.
- Line 19-20: The audio signal as input for the delay line — it can be anything.
- Line 22-23, 30-31:
  The [while](https://csound.com/docs/manual/while.html) loop iterates through each
  sample of the audio vector: from _kindx_=0 to _kindx_=31
  if [ksmps](https://csound.com/docs/manual/ksmps.html) is 32.
- Line 24: Each element of the audio vector is copied into the appropriate position of the array.
  At the beginning, the first element of the audio vector is copied to position 0,
  the second element to position 1, and so on.
- Line 25: The element in the array to which the read index
  "kread_ptr* points is copied to the appropriate element of the delayed audio signal.
  As *kread_ptr\* starts with 1 (not 0), at first it can only copy zeros.
- Line 27-28: Both pointers are incremented by one and then the _modulo_ is taken.
  This ensures that the array is not read or written beyond its boundaries, but used as a circular buffer.

  **_EXAMPLE 05D08_custom_delay_line.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activates real time sound output
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr CustomDelayLine

  ;; 0.25 second delay
  idel_size = 0.25 * sr
  kdelay_line[] init idel_size
  kread_ptr init 1
  kwrite_ptr init 0

  asig = vco2(0.3, 220 * (1 + int(lfo:k(3, 2, 2))) * expon(1, p3, 4), 10)
  asig = zdf_ladder(asig, 2000, 4)

  kindx = 0
  while (kindx < ksmps) do
    kdelay_line[kwrite_ptr] = asig[kindx]
    adel[kindx] = kdelay_line[kread_ptr]

    kwrite_ptr = (kwrite_ptr + 1) % idel_size
    kread_ptr = (kread_ptr + 1) % idel_size

    kindx += 1
  od

  out(linen:a(asig,0,p3,1),linen:a(adel,0,p3,1))

endin

</CsInstruments>
<CsScore>
i "CustomDelayLine" 0 10
</CsScore>
</CsoundSynthesizer>
;example by Steven Yi
```
