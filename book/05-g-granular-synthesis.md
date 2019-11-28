05 G. GRANULAR SYNTHESIS
========================

This chapter will focus upon granular synthesis used as a DSP technique
upon recorded sound files and will introduce techniques including time
stretching, time compressing and pitch shifting. The emphasis will be
upon asynchronous granulation. For an introduction to synchronous
granular synthesis using simple waveforms please refer to chapter 
[04 F](04-f-granular-synthesis.md).

Csound offers a wide range of opcodes for sound granulation. Each has
its own strengths and weaknesses and suitability for a particular task.
Some are easier to use than others, some, such as
[granule](https://csound.com/docs/manual/granule.html) and
[partikkel](https://csound.com/docs/manual/partikkel.html), are
extremely complex and are, at least in terms of the number of input
arguments they demand, amongst Csound's most complex opcodes.


sndwarp - Time Stretching and Pitch Shifting
--------------------------------------------

[sndwarp](https://csound.com/docs/manual/sndwarp.html) 
may not be Csound's newest or most advanced opcode for sound
granulation but it is quite easy to use and is certainly up to the task
of time stretching and pitch shifting. *sndwarp* has two modes by which we
can modulate time stretching characteristics, one in which we define a
*stretch factor*, a value of 2 defining a stretch to twice the normal
length, and the other in which we directly control a pointer into the
file. The following example uses *sndwarp's* first mode to produce a
sequence of time stretches and pitch shifts. An overview of each
procedure will be printed to the terminal as it occurs. *sndwarp* does not
allow for k-rate modulation of grain size or density so for this level
we need to look elsewhere.

You will need to make sure that a sound file is available to sndwarp via
a GEN01 function table. You can replace the one used in this example
with one of your own by replacing the reference to
*ClassicalGuitar.wav*. This sound file is stereo therefore instrument
1 uses the stereo version 
[sndwarpst](https://csound.com/docs/manual/sndwarpst.html). 
A mismatch between the number
of channels in the sound file and the version of sndwarp used will
result in playback at an unexpected pitch. 

sndwarp describes grain size as *window size* and it is defined in
samples so therefore a window size of 44100 means that grains will last
for 1s each (when sample rate is set at 44100). Window size
randomization (irandw) adds a random number within that range to the
duration of each grain. As these two parameters are closely related it
is sometime useful to set irandw to be a fraction of window size. If
irandw is set to zero we will get artefacts associated with synchronous
granular synthesis.

sndwarp (along with many of Csound's other granular synthesis opcodes)
requires us to supply it with a window function in the form of a
function table according to which it will apply an amplitude envelope to
each grain. By using different function tables we can alternatively
create softer grains with gradual attacks and decays (as in this
example), with more of a percussive character (short attack, long decay)
or *gate*-like (short attack, long sustain, short decay).


   ***EXAMPLE 05G01_sndwarp.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac -m128
--env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1

; waveform used for granulation
giSound  ftgen 1, 0, 0, 1, "ClassGuit.wav", 0, 0, 0

; window function - used as an amplitude envelope for each grain
; (first half of a sine wave)
giWFn   ftgen 2, 0, 16384, 9, 0.5, 1, 0

  instr 1
kamp        =          0.1
ktimewarp   expon      p4,p3,p5  ; amount of time stretch, 1=none 2=double
kresample   line       p6,p3,p7  ; pitch change 1=none 2=+1oct
ifn1        =          giSound   ; sound file to be granulated
ifn2        =          giWFn     ; window shaped used to envelope every grain
ibeg        =          0
iwsize      =          3000      ; grain size (in sample)
irandw      =          3000      ; randomization of grain size range
ioverlap    =          50        ; density
itimemode   =          0         ; 0=stretch factor 1=pointer
            prints     p8        ; print a description
aSigL,aSigR sndwarpst  kamp,ktimewarp,kresample,ifn1,ibeg, \
                                 iwsize,irandw,ioverlap,ifn2,itimemode
            outs       aSigL,aSigR
  endin

</CsInstruments>

<CsScore>
;p3 = stretch factor begin / pointer location begin
;p4 = stretch factor end / pointer location end
;p5 = resample begin (transposition)
;p6 = resample end (transposition)
;p7 = procedure description
;p8 = description string
; p1 p2   p3 p4 p5  p6    p7    p8
i 1  0    10 1  1   1     1     "No time stretch. No pitch shift."
i 1  10.5 10 2  2   1     1     "%nTime stretch x 2."
i 1  21   20 1  20  1     1     \
                 "%nGradually increasing time stretch factor from x 1 to x 20."
i 1  41.5 10 1  1   2     2     "%nPitch shift x 2 (up 1 octave)."
i 1  52   10 1  1   0.5   0.5   "%nPitch shift x 0.5 (down 1 octave)."
i 1  62.5 10 1  1   4     0.25  \
 "%nPitch shift glides smoothly from 4 (up 2 octaves) to 0.25 (down 2 octaves)."
i 1  73   15 4  4   1     1     \
"%nA chord containing three transpositions: unison, +5th, +10th. (x4 time stretch.)"
i 1  73   15 4  4   [3/2] [3/2] ""
i 1  73   15 4  4   3     3     ""
e
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
~~~

The next example uses sndwarp's other timestretch mode with which we
explicitly define a pointer position from where in the source file
grains shall begin. This method allows us much greater freedom with how
a sound will be time warped; we can even freeze movement and go
backwards in time - something that is not possible with timestretching
mode.

This example is self generative in that instrument 2, the instrument
that actually creates the granular synthesis textures, is repeatedly
triggered by instrument 1. Instrument 2 is triggered once every 12.5s
and these notes then last for 40s each so will overlap. Instrument 1 is
played from the score for 1 hour so this entire process will last that
length of time. Many of the parameters of granulation are chosen
randomly when a note begins so that each note will have unique
characteristics. The timestretch is created by a
[line](https://csound.com/docs/manual/line.html) function: the start
and end points of which are defined randomly when the note begins.
Grain/window size and window size randomization are defined randomly
when a note begins - notes with smaller window sizes will have a fuzzy
airy quality wheres notes with a larger window size will produce a
clearer tone. Each note will be randomly transposed (within a range of
+/- 2 octaves) but that transposition will be quantized to a rounded
number of semitones - this is done as a response to the equally tempered
nature of source sound material used.

Each entire note is enveloped by an amplitude envelope and a resonant
lowpass filter in each case encasing each note under a smooth arc.
Finally a small amount of reverb is added to smooth the overall texture
slightly

   ***EXAMPLE 05G02_selfmade_grain.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac --env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

; the name of the sound file used is defined as a string variable -
; - as it will be used twice in the code.
; This simplifies adapting the orchestra to use a different sound file
gSfile = "ClassGuit.wav"

; waveform used for granulation
giSound  ftgen 1,0,0,1,gSfile,0,0,0

; window function - used as an amplitude envelope for each grain
giWFn   ftgen 2,0,16384,9,0.5,1,0

seed 0 ; seed the random generators from the system clock
gaSendL init 0  ; initialize global audio variables
gaSendR init 0

  instr 1 ; triggers instrument 2
ktrigger   metro       1/12.5  ;metronome of triggers. One every 12.5s
schedkwhen ktrigger,0,0,2,0,40 ;trigger instr. 2 for 40s
  endin

  instr 2 ; generates granular synthesis textures
;define the input variables
ifn1        =          giSound
ilen        =          nsamp(ifn1)/sr
iPtrStart   random     1,ilen-1
iPtrTrav    random     -1,1
ktimewarp   line       iPtrStart,p3,iPtrStart+iPtrTrav
kamp        linseg     0,p3/2,0.2,p3/2,0
iresample   random     -24,24.99
iresample   =          semitone(int(iresample))
ifn2        =          giWFn
ibeg        =          0
iwsize      random     400,10000
irandw      =          iwsize/3
ioverlap    =          50
itimemode   =          1
; create a stereo granular synthesis texture using sndwarp
aSigL,aSigR sndwarpst  kamp,ktimewarp,iresample,ifn1,ibeg,\
                              iwsize,irandw,ioverlap,ifn2,itimemode
; envelope the signal with a lowpass filter
kcf         expseg     50,p3/2,12000,p3/2,50
aSigL       moogvcf2    aSigL, kcf, 0.5
aSigR       moogvcf2    aSigR, kcf, 0.5
; add a little of our audio signals to the global send variables -
; - these will be sent to the reverb instrument (2)
gaSendL     =          gaSendL+(aSigL*0.4)
gaSendR     =          gaSendR+(aSigR*0.4)
            outs       aSigL,aSigR
  endin

  instr 3 ; reverb (always on)
aRvbL,aRvbR reverbsc   gaSendL,gaSendR,0.85,8000
            outs       aRvbL,aRvbR
;clear variables to prevent out of control accumulation
            clear      gaSendL,gaSendR
  endin

</CsInstruments>
<CsScore>
; p1 p2 p3
i 1  0  3600 ; triggers instr 2
i 3  0  3600 ; reverb instrument
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
~~~


granule - Clouds of Sound
-------------------------

The [granule](https://csound.com/docs/manual/granule.html) opcode is
one of Csound's most complex opcodes requiring up to 22 input arguments
in order to function. Only a few of these arguments are available during
performance (*k-rate*) so it is less well suited for real-time modulation,
for real-time a more nimble implementation such as
[syncgrain](https://csound.com/docs/manual/syncgrain.html),
[fog](https://csound.com/docs/manual/fog.html), or
[grain3](https://csound.com/docs/manual/grain3.html) would be
recommended. For more complex realtime granular techniques, the
[partikkel](http://csounds.com/manual/html/partikkel.html)
opcode can be used. The granule opcode as used here, proves itself
ideally suited at the production of massive clouds of granulated sound
in which individual grains are often completely indistinguishable. There
are still two important k-rate variables that have a powerful effect on
the texture created when they are modulated during a note, they are:
grain gap - effectively density - and grain size which will affect the
clarity of the texture - textures with smaller grains will sound fuzzier
and airier, textures with larger grains will sound clearer. In the
following example
[transeg](https://csound.com/docs/manual/transeg.html) envelopes
move the grain gap and grain size parameters through a variety of
different states across the duration of each note.

With *granule* we define a number of grain streams for the opcode using its
*ivoice* input argument. This will also have an effect on the density
of the texture produced. Like *sndwarp's* first timestretching mode,
granule also has a stretch ratio parameter. Confusingly it works the
other way around though, a value of 0.5 will slow movement through the
file by 1/2, 2 will double is and so on. Increasing grain gap will also
slow progress through the sound file. granule also provides up to four
pitch shift voices so that we can create chord-like structures without
having to use more than one iteration of the opcode. We define the
number of pitch shifting voices we would like to use using the
*ipshift* parameter. If this is given a value of zero, all pitch
shifting intervals will be ignored and grain-by-grain transpositions
will be chosen randomly within the range +/-1 octave. granule contains
built-in randomizing for several of it parameters in order to easier
facilitate asynchronous granular synthesis. In the case of grain gap and
grain size randomization these are defined as percentages by which to
randomize the fixed values.

Unlike Csound's other granular synthesis opcodes, granule does not use
a function table to define the amplitude envelope for each grain,
instead attack and decay times are defined as percentages of the total
grain duration using input arguments. The sum of these two values should
total less than 100.

Five notes are played by this example. While each note explores grain
gap and grain size in the same way each time, different permutations for
the four pitch transpositions are explored in each note. Information
about what these transpositions are, are printed to the terminal as each
note begins.


   ***EXAMPLE 05G03_granule.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac -m128
--env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

;waveforms used for granulation
giSoundL ftgen 1,0,1048576,1,"ClassGuit.wav",0,0,1
giSoundR ftgen 2,0,1048576,1,"ClassGuit.wav",0,0,2

seed 0; seed the random generators from the system clock
gaSendL init 0
gaSendR init 0

  instr 1 ; generates granular synthesis textures
            prints     p9
;define the input variables
kamp        linseg     0,1,0.1,p3-1.2,0.1,0.2,0
ivoice      =          64
iratio      =          0.5
imode       =          1
ithd        =          0
ipshift     =          p8
igskip      =          0.1
igskip_os   =          0.5
ilength     =          nsamp(giSoundL)/sr
kgap        transeg    0,20,14,4,       5,8,8,     8,-10,0,    15,0,0.1
igap_os     =          50
kgsize      transeg    0.04,20,0,0.04,  5,-4,0.01, 8,0,0.01,   15,5,0.4
igsize_os   =          50
iatt        =          30
idec        =          30
iseedL      =          0
iseedR      =          0.21768
ipitch1     =          p4
ipitch2     =          p5
ipitch3     =          p6
ipitch4     =          p7
;create the granular synthesis textures; one for each channel
aSigL  granule  kamp,ivoice,iratio,imode,ithd,giSoundL,ipshift,igskip,\
     igskip_os,ilength,kgap,igap_os,kgsize,igsize_os,iatt,idec,iseedL,\
     ipitch1,ipitch2,ipitch3,ipitch4
aSigR  granule  kamp,ivoice,iratio,imode,ithd,giSoundR,ipshift,igskip,\
     igskip_os,ilength,kgap,igap_os,kgsize,igsize_os,iatt,idec,iseedR,\
     ipitch1,ipitch2,ipitch3,ipitch4
;send a little to the reverb effect
gaSendL     =          gaSendL+(aSigL*0.3)
gaSendR     =          gaSendR+(aSigR*0.3)
            outs       aSigL,aSigR
  endin

  instr 2 ; global reverb instrument (always on)
; use reverbsc opcode for creating reverb signal
aRvbL,aRvbR reverbsc   gaSendL,gaSendR,0.85,8000
            outs       aRvbL,aRvbR
;clear variables to prevent out of control accumulation
            clear      gaSendL,gaSendR
  endin

</CsInstruments>
<CsScore>
; p4 = pitch 1
; p5 = pitch 2
; p6 = pitch 3
; p7 = pitch 4
; p8 = number of pitch shift voices (0=random pitch)
; p1 p2  p3   p4  p5    p6    p7    p8    p9
i 1  0   48   1   1     1     1     4    "pitches: all unison"
i 1  +   .    1   0.5   0.25  2     4    \
  "%npitches: 1(unison) 0.5(down 1 octave) 0.25(down 2 octaves) 2(up 1 octave)"
i 1  +   .    1   2     4     8     4    "%npitches: 1 2 4 8"
i 1  +   .    1   [3/4] [5/6] [4/3] 4    "%npitches: 1 3/4 5/6 4/3"
i 1  +   .    1   1     1     1     0    "%npitches: all random"

i 2 0 [48*5+2]; reverb instrument
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
~~~


Grain delay effect
------------------

Granular techniques can be used to implement a flexible delay effect,
where we can do transposition, time modification and disintegration of
the sound into small particles, all within the delay effect itself. To
implement this effect, we record live audio into a buffer (Csound
table), and let the granular synthesizer/generator read sound for the
grains from this buffer. We need a granular synthesizer that allows
manual control over the read start point for each grain, since the
relationship between the write position and the read position in the
buffer determines the delay time. We've used the fof2 opcode for this
purpose here. 


   ***EXAMPLE 05G04_grain_delay.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
--env:SSDIR+=../SourceMaterials
-odac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 128
nchnls = 2
0dbfs = 1

; empty table, live audio input buffer used for granulation
giTablen  = 131072
giLive    ftgen 0,0,giTablen,2,0

; sigmoid rise/decay shape for fof2, half cycle from bottom to top
giSigRise ftgen 0,0,8192,19,0.5,1,270,1         

; test sound
giSample  ftgen 0,0,0,1,"fox.wav", 0,0,0

instr 1
; test sound, replace with live input
  a1      loscil 1, 1, giSample, 1
          outch 1, a1
          chnmix a1, "liveAudio"
endin

instr 2
; write live input to buffer (table)
  a1      chnget "liveAudio"
  gkstart tablewa giLive, a1, 0
  if gkstart < giTablen goto end
  gkstart = 0
  end:
  a0      = 0
          chnset a0, "liveAudio"
endin

instr 3
; delay parameters
  kDelTim = 0.5                 ; delay time in seconds (max 2.8 seconds)
  kFeed   = 0.8
; delay time random dev
  kTmod   = 0.2
  kTmod   rnd31 kTmod, 1
  kDelTim = kDelTim+kTmod
; delay pitch random dev
  kFmod   linseg 0, 1, 0, 1, 0.1, 2, 0, 1, 0
  kFmod   rnd31 kFmod, 1
 ; grain delay processing
  kamp    = ampdbfs(-8)
  kfund   = 25 ; grain rate
  kform   = (1+kFmod)*(sr/giTablen) ; grain pitch transposition
  koct    = 0
  kband   = 0
  kdur    = 2.5 / kfund ; duration relative to grain rate
  kris    = 0.5*kdur
  kdec    = 0.5*kdur
  kphs    = (gkstart/giTablen)-(kDelTim/(giTablen/sr)) ; calculate grain phase based on delay time
  kgliss  = 0
  a1     fof2 1, kfund, kform, koct, kband, kris, kdur, kdec, 100, \
      giLive, giSigRise, 86400, kphs, kgliss
          outch     2, a1*kamp
          chnset a1*kFeed, "liveAudio"
endin

</CsInstruments>
<CsScore>
i 1 0 20
i 2 0 20
i 3 0 20
</CsScore>
</CsoundSynthesizer>
;example by Oeyvind Brandtsegg
~~~


In the last example we will use the
[grain](https://csound.com/docs/manual/grain.html) opcode. This
opcode is part of a little group of opcodes which also includes
[grain2](https://csound.com/docs/manual/grain2.html) and
[grain3](https://csound.com/docs/manual/grain3.html). *grain* is
the oldest opcode, *Grain2* is a more easy-to-use opcode, while
*Grain3* offers more control.


   ***EXAMPLE 05G05_grain.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
 -o dac  --env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>
sr     = 44100
ksmps  = 128
nchnls = 2
0dbfs  = 1

; First we hear each grain, but later on it sounds more like a drum roll.
gareverbL  init       0
gareverbR  init       0
giFt1      ftgen      0, 0, 1025, 20, 2, 1 ; GEN20, Hanning window for grain envelope
giFt2      ftgen      0, 0, 0, 1, "fox.wav", 0, 0, 0

instr 1 ; Granular synthesis of soundfile
ipitch     =          sr/ftlen(giFt2) ; Original frequency of the input sound
kdens1     expon      3, p3, 500
kdens2     expon      4, p3, 400
kdens3     expon      5, p3, 300
kamp       line       1, p3, 0.05
a1         grain      1, ipitch, kdens1, 0, 0, 1, giFt2, giFt1, 1
a2         grain      1, ipitch, kdens2, 0, 0, 1, giFt2, giFt1, 1
a3         grain      1, ipitch, kdens3, 0, 0, 1, giFt2, giFt1, 1
aleft      =          kamp*(a1+a2)
aright     =          kamp*(a2+a3)
           outs       aleft, aright ; Output granulation
gareverbL  =          gareverbL + a1+a2 ; send granulation to Instr 2 (Reverb)
gareverbR  =          gareverbR + a2+a3
endin

instr 2 ; Reverb
kkamp      line       0, p3, 0.08
aL         reverb     gareverbL, 10*kkamp ; reverberate what is in gareverbL
aR         reverb     gareverbR, 10*kkamp ; and garaverbR
           outs       kkamp*aL, kkamp*aR ; and output the result
gareverbL  =          0 ; empty the receivers for the next loop
gareverbR  =          0
endin
</CsInstruments>
<CsScore>
i1 0 20 ; Granulation
i2 0 21 ; Reverb
</CsScore>
</CsoundSynthesizer>
;example by Bjørn Houdorf
~~~


Several opcodes for granular synthesis have been considered in this
chapter but this is in no way meant to suggest that these are the best,
in fact it is strongly recommended to explore all of Csound's other
opcodes as they each have their own unique character. The
[syncgrain](https://csound.com/docs/manual/syncgrain.html) family of
opcodes (including also
[syncloop](https://csound.com/docs/manual/syncloop.html) and
[diskgrain](https://csound.com/docs/manual/diskgrain.html)) are
deceptively simple as their k-rate controls encourages further
abstractions of grain manipulation,
[fog](https://csound.com/docs/manual/fog.html) is designed for FOF
synthesis type synchronous granulation but with sound files and
[partikkel](https://csound.com/docs/manual/partikkel.html) offers a
comprehensive control of grain characteristics on a grain-by-grain basis
inspired by Curtis Roads' encyclopedic book on granular synthesis
*Microsound*.
