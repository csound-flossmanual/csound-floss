05 C. FILTERS
=============

Audio filters can range from devices that subtly shape the tonal
characteristics of a sound to ones that dramatically remove whole
portions of a sound spectrum to create new sounds. Csound includes
several versions of each of the commonest types of filters and some more
esoteric ones also. The full list of Csound's standard filters can be
found [here](https://csound.com/docs/manual/SigmodStandard.html). A
list of the more specialised filters can be found
[here](https://csound.com/docs/manual/SigmodSpeciali.html).


Lowpass Filters
---------------

The first type of filter encountered is normally the lowpass filter. As
its name suggests it allows lower frequencies to pass through unimpeded
and therefore filters higher frequencies. The crossover  frequency is
normally referred to as the *cutoff* frequency. Filters of this type
do not really cut frequencies off at the cutoff point like a brick wall
but instead attenuate increasingly according to a cutoff slope.
Different filters offer cutoff slopes of different steepness. Another
aspect of a lowpass filter that we may be concerned with is a ripple
that might emerge at the cutoff point. If this is exaggerated
intentionally it is referred to as resonance or *Q*.

In the following example, three lowpass filters filters are
demonstrated: [tone](https://csound.com/docs/manual/tone.html),
[butlp](https://csound.com/docs/manual/butterlp.html) and
[moogladder](https://csound.com/docs/manual/moogladder.html). *tone*
offers a quite gentle cutoff slope and therefore is better suited to
subtle spectral enhancement tasks. *butlp* is based on the Butterworth
filter design and produces a much sharper cutoff slope at the expense of
a slightly greater CPU overhead. *moogladder* is an interpretation of an
analogue filter found in a moog synthesizer -- it includes a resonance
control.

In the example a sawtooth waveform is played in turn through each
filter. Each time the cutoff frequency is modulated using an envelope,
starting high and descending low so that more and more of the spectral
content of the sound is removed as the note progresses. A sawtooth
waveform has been chosen as it contains strong higher frequencies and
therefore demonstrates the filters characteristics well; a sine wave
would be a poor choice of source sound on account of its lack of
spectral richness.


   ***EXAMPLE 05C01_tone_butlp_moogladder.csd***

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
        prints       "tone%n"    ; indicate filter type in console
aSig    vco2         0.5, 150    ; input signal is a sawtooth waveform
kcf     expon        10000,p3,20 ; descending cutoff frequency
aSig    tone         aSig, kcf   ; filter audio signal
        out          aSig        ; filtered audio sent to output
  endin

  instr 2
        prints       "butlp%n"   ; indicate filter type in console
aSig    vco2         0.5, 150    ; input signal is a sawtooth waveform
kcf     expon        10000,p3,20 ; descending cutoff frequency
aSig    butlp        aSig, kcf   ; filter audio signal
        out          aSig        ; filtered audio sent to output
  endin

  instr 3
        prints       "moogladder%n" ; indicate filter type in console
aSig    vco2         0.5, 150       ; input signal is a sawtooth waveform
kcf     expon        10000,p3,20    ; descending cutoff frequency
aSig    moogladder   aSig, kcf, 0.9 ; filter audio signal
        out          aSig           ; filtered audio sent to output
  endin

</CsInstruments>
<CsScore>
; 3 notes to demonstrate each filter in turn
i 1 0  3; tone
i 2 4  3; butlp
i 3 8  3; moogladder
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Highpass Filters
----------------

A highpass filter is the converse of a lowpass filter; frequencies
higher than the cutoff point are allowed to pass whilst those lower are
attenuated. [atone](https://csound.com/docs/manual/atone.html) and
[buthp](https://csound.com/docs/manual/butterhp.html) are the
analogues of *tone* and *butlp*. Resonant highpass filters are harder to
find but Csound has one in
[bqrez](https://csound.com/docs/manual/bqrez.html). *bqrez* is
actually a multi-mode filter and could also be used as a resonant
lowpass filter amongst other things. We can choose which mode we want by
setting one of its input arguments appropriately. Resonant highpass is
mode 1. In this example a sawtooth waveform is again played through each
of the filters in turn but this time the cutoff frequency moves from low
to high. Spectral content is increasingly removed but from the opposite
spectral direction.


   ***EXAMPLE 05C02_atone_buthp_bqrez.csd***

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
        prints       "atone%n"     ; indicate filter type in console
aSig    vco2         0.2, 150      ; input signal is a sawtooth waveform
kcf     expon        20, p3, 20000 ; define envelope for cutoff frequency
aSig    atone        aSig, kcf     ; filter audio signal
        out          aSig          ; filtered audio sent to output
  endin

  instr 2
        prints       "buthp%n"     ; indicate filter type in console
aSig    vco2         0.2, 150      ; input signal is a sawtooth waveform
kcf     expon        20, p3, 20000 ; define envelope for cutoff frequency
aSig    buthp        aSig, kcf     ; filter audio signal
        out          aSig          ; filtered audio sent to output
  endin

  instr 3
        prints       "bqrez(mode:1)%n" ; indicate filter type in console
aSig    vco2         0.03, 150         ; input signal is a sawtooth waveform
kcf     expon        20, p3, 20000     ; define envelope for cutoff frequency
aSig    bqrez        aSig, kcf, 30, 1  ; filter audio signal
        out          aSig              ; filtered audio sent to output
  endin

</CsInstruments>
<CsScore>
; 3 notes to demonstrate each filter in turn
i 1 0  3 ; atone
i 2 5  3 ; buthp
i 3 10 3 ; bqrez(mode 1)
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Bandpass Filters
----------------

A bandpass filter allows just a narrow band of sound to pass through
unimpeded and as such is a little bit like a combination of a lowpass
and highpass filter connected in series. We normally expect at least one
additional parameter of control: control over the width of the band of
frequencies allowed to pass through, or *bandwidth*.

In the next example cutoff frequency and bandwidth are demonstrated
independently for two different bandpass filters offered by Csound.
First of all a sawtooth waveform is passed through a
[reson](https://csound.com/docs/manual/reson.html) filter and a
[butbp](https://csound.com/docs/manual/butterbp.html) filter in turn
while the cutoff frequency rises (bandwidth remains static). Then pink
noise is passed through *reson* and *butbp* in turn again but this time
the cutoff frequency remains static at 5000Hz while the bandwidth
expands from 8 to 5000Hz. In the latter two notes it will be heard how
the resultant sound moves from almost a pure sine tone to unpitched
noise. *butbp* is obviously the Butterworth based bandpass filter.
*reson* can produce dramatic variations in amplitude depending on the
bandwidth value and therefore some balancing of amplitude in the output
signal may be necessary if out of range samples and distortion are to be
avoided. Fortunately the opcode itself includes two modes of amplitude
balancing built in but by default neither of these methods are active
and in this case the use of the balance opcode may be required. Mode 1
seems to work well with spectrally sparse sounds like harmonic tones
while mode 2 works well with spectrally dense sounds such as white or
pink noise.


   ***EXAMPLE 05C03_reson_butbp.csd***

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
        prints       "reson%n"          ; indicate filter type in console
aSig    vco2         0.5, 150           ; input signal: sawtooth waveform
kcf     expon        20,p3,10000        ; rising cutoff frequency
aSig    reson        aSig,kcf,kcf*0.1,1 ; filter audio signal
        out          aSig               ; send filtered audio to output
  endin

  instr 2
        prints       "butbp%n"          ; indicate filter type in console
aSig    vco2         0.5, 150           ; input signal: sawtooth waveform
kcf     expon        20,p3,10000        ; rising cutoff frequency
aSig    butbp        aSig, kcf, kcf*0.1 ; filter audio signal
        out          aSig               ; send filtered audio to output
  endin

  instr 3
        prints       "reson%n"          ; indicate filter type in console
aSig    pinkish      0.5                ; input signal: pink noise
kbw     expon        10000,p3,8         ; contracting bandwidth
aSig    reson        aSig, 5000, kbw, 2 ; filter audio signal
        out          aSig               ; send filtered audio to output
  endin

  instr 4
        prints       "butbp%n"          ; indicate filter type in console
aSig    pinkish      0.5                ; input signal: pink noise
kbw     expon        10000,p3,8         ; contracting bandwidth
aSig    butbp        aSig, 5000, kbw    ; filter audio signal
        out          aSig               ; send filtered audio to output
  endin

</CsInstruments>
<CsScore>
i 1 0  3 ; reson - cutoff frequency rising
i 2 4  3 ; butbp - cutoff frequency rising
i 3 8  6 ; reson - bandwidth increasing
i 4 15 6 ; butbp - bandwidth increasing
e
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Comb Filtering
--------------

A comb filter is a special type of filter that creates a harmonically
related stack of resonance peaks on an input sound file. A comb filter
is really just a very short delay effect with feedback. Typically the
delay times involved would be less than 0.05 seconds. Many of the comb
filters documented in 
[the Csound Manual](https://csound.com/docs/manual/) term this delay time,
*loop time*. The fundamental of the harmonic stack of resonances
produced will be *1/loop* time. Loop time and the frequencies of the
resonance peaks will be inversely proportional -- as loop time gets
smaller, the frequencies rise. For a loop time of 0.02 seconds, the
fundamental resonance peak will be 50Hz, the next peak 100Hz, the next
150Hz and so on. Feedback is normally implemented as reverb time -- the
time taken for amplitude to drop to 1/1000 of its original level or by
60dB. This use of reverb time as opposed to feedback alludes to the use
of comb filters in the design of reverb algorithms. Negative reverb
times will result in only the odd numbered partials of the harmonic
stack being present.

The following example demonstrates a comb filter using the
[vcomb](https://csound.com/docs/manual/vcomb.html) opcode. This
opcode allows for performance time modulation of the loop time
parameter. For the first 5 seconds of the demonstration the reverb time
increases from 0.1 seconds to 2 while the loop time remains constant at
0.005 seconds. Then the loop time decreases to 0.0005 seconds over 6
seconds (the resonant peaks rise in frequency), finally over the course
of 10 seconds the loop time rises to 0.1 seconds (the resonant peaks
fall in frequency). A repeating noise impulse is used as a source sound
to best demonstrate the qualities of a comb filter.


   ***EXAMPLE 05C04_comb.csd***

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
; -- generate an input audio signal (noise impulses) --
; repeating amplitude envelope:
kEnv         loopseg   1,0, 0,1,0.005,1,0.0001,0,0.9949,0
aSig         pinkish   kEnv*0.6                     ; pink noise pulses

; apply comb filter to input signal
krvt    linseg  0.1, 5, 2                           ; reverb time
alpt    expseg  0.005,5,0.005,6,0.0005,10,0.1,1,0.1 ; loop time
aRes    vcomb   aSig, krvt, alpt, 0.1               ; comb filter
        out     aRes                                ; audio to output
  endin

</CsInstruments>
<CsScore>
i 1 0 25
</CsScore>
</CsoundSynthesizer>
;example by Iain McCurdy
~~~


Other Filters Worth Investigating
---------------------------------

In addition to a wealth of low and highpass filters, Csound offers
several more unique filters. Multimode such as
[bqrez](https://csound.com/docs/manual/bqrez.html) provide several
different filter types within a single opcode. Filter type is normally
chosen using an i-rate input argument that functions like a switch.
Another multimode filter,
[clfilt](https://csound.com/docs/manual/clfilt.html), offers
additional filter controls such as *filter design* and *number of
poles* to create unusual sound filters. unfortunately some parts of
this opcode are not implemented yet.

[eqfil](https://csound.com/docs/manual/eqfil.html) is essentially a
parametric equaliser but multiple iterations could be used as modules in
a graphic equaliser bank. In addition to the capabilities of eqfil,
[pareq](https://csound.com/docs/manual/pareq.html) adds the
possibility of creating low and high shelving filtering which might
prove useful in mastering or in spectral adjustment of more developed
sounds.

[rbjeq](https://csound.com/docs/manual/rbjeq.html) offers a quite
comprehensive multimode filter including highpass, lowpass, bandpass,
bandreject, peaking, low-shelving and high-shelving, all in a single
opcode.

[statevar](https://csound.com/docs/manual/statevar.html) offers the
outputs from four filter types - highpass, lowpass, bandpass and
bandreject - simultaneously so that the user can morph between them
smoothly. [svfilter](https://csound.com/docs/manual/svfilter.html)
does a similar thing but with just highpass, lowpass and bandpass filter
types. 

[phaser1](https://csound.com/docs/manual/phaser1.html) and
[phaser2](https://csound.com/docs/manual/phaser2.html) offer
algorithms containing chains of first order and second order allpass
filters respectively. These algorithms could conceivably be built from
individual allpass filters, but these ready-made versions provide
convenience and added efficiency.

[hilbert](https://csound.com/docs/manual/hilbert.html) is a
specialist IIR filter that implements the Hilbert transformer.

For those wishing to devise their own filter using coefficients Csound
offers [filter2](https://csound.com/docs/manual/filter2.html) and
[zfilter2](https://csound.com/docs/manual/zfilter2.html).


Filter Comparision
------------------

The following example shows a nice comparision between a number of
common used filters.


   ***EXAMPLE 05C05_filter_compar.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

gaOut init 0
giSpb init 0.45


; Filter types
#define MOOG_LADDER #1#
#define MOOG_VCF    #2# 
#define LPF18       #3#
#define BQREZ       #4#
#define CLFILT      #5#
#define BUTTERLP    #6#
#define LOWRES      #7#
#define REZZY       #8#
#define SVFILTER    #9# 
#define VLOWRES     #10#
#define STATEVAR    #11#
#define MVCLPF1     #12#
#define MVCLPF2     #13#
#define MVCLPF3     #14#


opcode Echo, 0, S
Smsg xin
    printf_i "\n%s\n\n", 1, Smsg
endop

opcode EchoFilterName, 0, i
iType xin

if iType == $MOOG_LADDER then
    Echo "moogladder"
elseif iType == $MOOG_VCF then
    Echo "moogvcf"
elseif iType == $LPF18 then
    Echo "lpf18"
elseif iType == $BQREZ then
    Echo "bqrez"
elseif iType == $CLFILT then
    Echo "clfilt"
elseif iType == $BUTTERLP then
    Echo "butterlp"
elseif iType == $LOWRES then
    Echo "lowres"
elseif iType == $REZZY then
   Echo "rezzy"
elseif iType == $SVFILTER then
  Echo "svfilter"
elseif iType == $VLOWRES then
    Echo "vlowres"
elseif iType == $STATEVAR then
    Echo "statevar"
elseif iType == $MVCLPF1 then
    Echo "mvclpf1"
elseif iType == $MVCLPF2 then
    Echo "mvclpf2"
elseif iType == $MVCLPF3 then
    Echo "mvclpf3"
else    
endif
endop

opcode MultiFilter, a, akki
ain, kcfq, kres, iType xin

kType init iType
if kType == $MOOG_LADDER then
    aout    moogladder ain, kcfq, kres
elseif kType == $MOOG_VCF then
    aout    moogvcf ain, kcfq, kres    
elseif kType == $LPF18 then
    aout    lpf18 ain, kcfq, kres, 0.5
elseif kType == $BQREZ then
    aout    bqrez ain, kcfq, 99 * kres + 1
elseif kType == $CLFILT then
    aout    clfilt ain, kcfq, 0, 2
elseif kType == $BUTTERLP then
    aout    butterlp ain, kcfq
elseif kType == $LOWRES then
    aout    lowres ain, kcfq, kres
elseif kType == $REZZY then
   aout     rezzy ain, kcfq, kres
elseif kType == $SVFILTER then
  aout, ahigh, aband  svfilter ain, kcfq, (499 / 10) * kres + 1 ; rescales to make it musical
elseif kType == $VLOWRES then
    aout    vlowres ain, kcfq, kres, 2, 0
elseif kType == $STATEVAR then
    ahp, aout, abp, abr     statevar ain, kcfq, kres
elseif kType == $MVCLPF1 then
    aout mvclpf1 ain, kcfq, kres
elseif kType == $MVCLPF2 then
    aout mvclpf2 ain, kcfq, kres
elseif kType == $MVCLPF3 then
    aout mvclpf3 ain, kcfq, kres
else
    aout = 0
endif
    xout aout
endop


opcode Wave, a, k
kcps    xin

asqr    vco2 1, kcps * 0.495, 10      ; square
asaw    vco2 1, kcps * 1.005, 0       ; wave
        xout    0.5 * (asqr + asaw)
endop


opcode Filter, a, aiii
ain, iFilterType, iCoeff, iCps  xin

iDivision = 1 / (iCoeff * giSpb)
kLfo    loopseg iDivision, 0, 0, 0, 0.5, 1, 0.5, 0
iBase   = iCps
iMod    = iBase * 9

kcfq    = iBase + iMod * kLfo
kres    init 0.6

aout    MultiFilter ain,   kcfq, kres, iFilterType
aout    balance aout, ain

        xout aout
endop

opcode Reverb, aa, aaii
adryL, adryR, ifeedback, imix xin
awetL, awetR reverbsc adryL, adryR, ifeedback, 10000

aoutL  = (1 - imix) * adryL  + imix * awetL
aoutR  = (1 - imix) * adryR  + imix * awetR

       xout aoutL, aoutR
endop

instr Bass
    iCoeff      = p4
    iCps        = p5    
    iFilterType = p6    
    
    aWave   Wave iCps
    aOut    Filter aWave, iFilterType, iCoeff, iCps
    aOut    linen aOut, .01, p3, .1

    gaOut   = gaOut + aOut
endin

opcode Note, 0, iiii   
    idt = 2 * giSpb
    iNum, iCoeff, iPch, iFilterType xin
    event_i "i", "Bass", idt * iNum, idt, iCoeff, cpspch(iPch), iFilterType
endop

instr Notes
    iFilterType = p4
    EchoFilterName iFilterType

    Note 0, 2, 6.04, iFilterType
    Note 1, 1/3, 7.04, iFilterType
    Note 2, 2, 6.04, iFilterType
    Note 3, 1/1.5, 7.07, iFilterType

    Note 4, 2, 5.09, iFilterType
    Note 5, 1, 6.09, iFilterType
    Note 6, 1/1.5, 5.09, iFilterType
    Note 7, 1/3, 6.11, iFilterType

    Note 8, 1, 6.04, iFilterType
    Note 9, 1/3, 7.04, iFilterType
    Note 10, 2, 6.04, iFilterType
    Note 11, 1/1.5, 7.07, iFilterType
    
    Note 12, 2, 6.09, iFilterType
    Note 13, 1, 7.09, iFilterType
    Note 14, 1/1.5, 6.11, iFilterType
    Note 15, 1/3, 6.07, iFilterType
    
    Note 16, 2, 6.04, iFilterType
    Note 17, 1/3, 7.04, iFilterType
    Note 18, 2, 6.04, iFilterType
    Note 19, 1/1.5, 7.07, iFilterType

    turnoff
endin

opcode TrigNotes, 0, ii
iNum, iFilterType xin
idt = 20
    event_i "i", "Notes", idt * iNum, 0, iFilterType
endop

instr PlayAll
iMixLevel = p4
event_i "i", "Main", 0, (14 * 20), iMixLevel

TrigNotes 0, $MOOG_LADDER
TrigNotes 1, $MOOG_VCF
TrigNotes 2, $LPF18 
TrigNotes 3, $BQREZ
TrigNotes 4, $CLFILT
TrigNotes 5, $BUTTERLP
TrigNotes 6, $LOWRES 
TrigNotes 7, $REZZY  
TrigNotes 8, $SVFILTER
TrigNotes 9, $VLOWRES 
TrigNotes 10, $STATEVAR
TrigNotes 11, $MVCLPF1 
TrigNotes 12, $MVCLPF2 
TrigNotes 13, $MVCLPF3 

turnoff
endin

opcode DumpNotes, 0, iiSi
iNum, iFilterType, SFile, iMixLevel xin
idt = 30   
Sstr    sprintf {{i "%s" %f %f "%s" %f}}, "Dump", idt * iNum, idt, SFile, iMixLevel
        scoreline_i Sstr
        event_i "i", "Notes", idt * iNum, 0, iFilterType
endop


instr DumpAll
iMixLevel = p4

DumpNotes 0, $MOOG_LADDER,  "moogladder-dubstep.wav", iMixLevel
DumpNotes 1, $MOOG_VCF,     "moogvcf-dubstep.wav",  iMixLevel
DumpNotes 2, $LPF18 ,       "lpf18-dubstep.wav",    iMixLevel
DumpNotes 3, $BQREZ,        "bqrez-dubstep.wav",    iMixLevel
DumpNotes 4, $CLFILT,       "clfilt-dubstep.wav",   iMixLevel
DumpNotes 5, $BUTTERLP,     "butterlp-dubstep.wav", iMixLevel
DumpNotes 6, $LOWRES,       "lowres-dubstep.wav",   iMixLevel
DumpNotes 7, $REZZY,        "rezzy-dubstep.wav",    iMixLevel
DumpNotes 8, $SVFILTER,     "svfilter-dubstep.wav", iMixLevel
DumpNotes 9, $VLOWRES ,     "vlowres-dubstep.wav",  iMixLevel
DumpNotes 10, $STATEVAR,    "statevar-dubstep.wav", iMixLevel
DumpNotes 11, $MVCLPF1 ,    "mvclpf1-dubstep.wav",  iMixLevel
DumpNotes 12, $MVCLPF2 ,    "mvclpf2-dubstep.wav",  iMixLevel
DumpNotes 13, $MVCLPF3 ,    "mvclpf3-dubstep.wav",  iMixLevel

turnoff
endin

instr Main
iVolume = 0.2
iReverbFeedback = 0.3
iMixLevel       = p4

aoutL, aoutR Reverb gaOut, gaOut, iReverbFeedback, iMixLevel
outs (iVolume * aoutL), (iVolume * aoutR)

gaOut = 0
endin

instr Dump
SFile       = p4
iMixLevel   = p5

iVolume     = 0.2
iReverbFeedback = 0.85

aoutL, aoutR Reverb gaOut, gaOut, iReverbFeedback, iMixLevel
fout SFile, 14, (iVolume * aoutL), (iVolume * aoutR)

gaOut = 0
endin

</CsInstruments>
<CsScore>
; the fourth parameter is a reverb mix level
i "PlayAll" 0 1 0.35
; uncomment to save output to wav files
;i "DumpAll" 0 1 0.35
</CsScore>
</CsoundSynthesizer>
;example by Anton Kholomiov
;based on the Jacob Joaquin wobble bass sound
~~~

