01 B. PITCH AND FREQUENCY
=========================

Pitch and frequency are related but different terms.[^1] *Pitch* is used by musicians to describe the "height" of a tone, most obvious on a keyboard. *Frequency* is a technical term. We will start with the latter and then return to pitch in some of its numerous aspects, including intervals, tuning systems and different conversions between pitch and frequency in Csound.

[^1]: Similar to *volume* and *amplitude* -- see
      [next chapter](01-c-intensities.md).


Frequencies
-----------

As mentioned in the previous chapter, frequency is defined as the number
of cycles or periods per second. The SI unit is Hertz where 1 Hertz means 1 period per second. If a tone has a frequency of 100 Hz it completes 100 cycles every second. If a tone has a frequency of 200 Hz it completes 200 cycles every second.

Given a tone's frequency, the time for one period can be calculated straightforwardly. For 100 periods per seconds (100 Hz), the time for one period is 1/100 or 0.01 seconds. For 200 periods per second (200 Hz), the time for each period is only half as much: 1/200 or 0.005 seconds. Mathematically, the period is the reciprocal of the frequency and vice versa. In equation form, this is expressed as follows:

$Frequency = \frac{1}{Period}$
$Period = \frac{1}{Frequency}$


### Wavelength

In physical reality, one cycle of a periodic sound can not only be measured in time, but also as extension in space. This is called the wavelength. It is usually abbreviated with the greek letter λ (lambda). It can be calculated as the ratio between the velocity and the frequency of the wave.

$\lambda = \frac{Velocity}{Frequency}$

As the velocity of a sound in air (at 20° Celsius) is about 340 m/s, we can calculate the wavelength of a sound as

$\lambda = \frac{\frac{340 m}{s}}{\frac{Number\ of\ Cycles}{s}} =
\frac{340}{Number\ of\ Cycles} m$

For instance, a sine wave of 1000 Hz has a length of approximately 340/1000 m = 34 cm, whereas a wave of 100 Hz has a length of 340/100 m = 3.4 m.


### Periodic and Nonperiodic Sounds

Not all sounds are periodic. In fact, periodic sounds are only one end of a spectrum. The other end is noise. In between is a continuum which can be described from both points of view: a periodic sound which has noisy parts, or a noise which has periodic parts. The following example shows these aspects in one of their numerous possibilities. It starts with a sine tone of 1000 Hz and slowly adds aperiodicity. This is done by changing the frequency of the sine oscillator faster and faster, and in a wider and wider range.  At the end noise is reached. The other way, from noise to a periodic tone, is shown with a band filter the band width of which is at first 10000 Hz around a center frequency of 1000 Hz, i.e. essentially not altering the white noise. Then the band width decreases dramatically (from 10000 Hz to 0.1 Hz) so that at the end a sine tone is nearly reached.

   ***EXAMPLE 01B01_PeriodicAperiodic.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
nchnls = 2
0dbfs = 1
ksmps = 32

instr SineToNoise
 kMinFreq expseg 1000, p3*1/5, 1000, p3*3/5, 20, p3*1/5, 20
 kMaxFreq expseg 1000, p3*1/5, 1000, p3*3/5, 20000, p3*1/5, 20000
 kRndFreq expseg 1, p3*1/5, 1, p3*3/5, 10000, p3*1/5, 10000
 aFreq randomi kMinFreq, kMaxFreq, kRndFreq
 aSine poscil .1, aFreq
 aOut linen aSine, .5, p3, 1
 out aOut, aOut
endin

instr NoiseToSine
 aNoise rand .1, 2, 1
 kBw expseg 10000, p3*1/5, 10000, p3*3/5, .1, p3*1/5, .1
 aFilt reson aNoise, 1000, kBw, 2
 aOut linen aFilt, .5, p3, 1
 out aOut, aOut
endin

</CsInstruments>
<CsScore>
i "SineToNoise" 0 10
i "NoiseToSine" 11 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

This is what the signal looks like at the start and the end of the *SineToNoise* process:

![Sine to noise](../resources/images/01-b-sinetonoise.png)

And this is what the signal looks like at the start and the end of the *NoiseToSine* process:

![Noise to sine](../resources/images/01-b-noisetosine.png)

Only when a sound is periodic, we perceive a pitch. But the human ear is very sensitive, and it is quite fascinating to observe how little periodicity is needed to sense some pitch.


### Upper and Lower Limits of Hearing

It is generally stated that the human ear can hear sounds in the range
20 Hz to 20,000 Hz (20kHz). This upper limit tends to decrease with age
due to a condition known as presbyacusis, or age related hearing loss.
Most adults can hear frequencies up to about 16 kHz while most children can hear beyond
this. At the lower end of the spectrum the human ear does not respond to
frequencies below 20 Hz, and very low frequencies need more power to be heard than medium or high frequencies. (This is explained more in detail in the paragraph about the Fletscher-Munson-Curves in the [next chapter](01-c-intensities.md).)

So, in the following example, you will not hear the first (10 Hz) tone,
and probably not the last (20 kHz) one, but hopefully the other ones
(100 Hz, 1000 Hz, 10000 Hz):

   ***EXAMPLE 01B02_LimitsOfHearing.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac -m0
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
 prints  "Playing %d Hertz!\n", p4
 asig    poscil  .2, p4
 outs    asig, asig
endin

</CsInstruments>
<CsScore>
i 1 0 2 10
i . + . 100
i . + . 1000
i . + . 10000
i . + . 20000
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


Pitches
-------

Musicians tune their instruments, and theorists concern themselves with the rationale, describing intervals and scales. This has happened in different cultures, for ages, long before the term frequency was invented and long before it was possible to measure a certain frequency by technical devices. What is the relationship between musical terms like octave, major third, semitone and the frequency we have to specify for an oscillator? And why are frequencies often described as being on a "logarithmic scale"?


### Logarithms, Frequency Ratios and Intervals

A lot of basic maths is about simplification of complex equations.
Shortcuts are taken all the time to make things easier to read and
equate. Multiplication can be seen as a shorthand for repeated
additions, for example, 5x10 = 5+5+5+5+5+5+5+5+5+5. Exponents are
shorthand for repeated multiplications, 3^5^ = 3x3x3x3x3. Logarithms are
shorthand for exponents and are used in many areas of science and
engineering in which quantities vary over a large range. Examples of
logarithmic scales include the decibel scale, the Richter scale for
measuring earthquake magnitudes and the astronomical scale of stellar
brightnesses.

Intervals in music describe the distance between two notes. When dealing
with standard musical notation it is easy to determine an interval
between two adjacent notes. For example a perfect 5th is always made up
of seven semitones, so seven adjacent keys on a keyboard. When dealing with Hz values things are different. A difference of say 100 Hz does not always equate to the same musical interval. This is because musical intervals are
represented as ratios between two frequencies. An octave for example is always
2:1. That is to say every time you double a Hz value you will jump up by
a musical interval of an octave.

Consider the following. A flute can play the note A4 at 440 Hz. If the
player plays A5 an octave above it at 880 Hz the difference in Hz
is 440. Now consider the piccolo, the highest pitched instrument of the
orchestra. It can play A6 with a frequency of 1760 Hz but it can also play A7 an octave above this at 3520 Hz (2 x 1760 Hz). While the difference in Hertz
between A4 and A5 on the flute is only 440 Hz, the difference between
A6 and A7 on a piccolo is 1760 Hz yet they are both only playing notes one octave apart.

The following example shows the difference between adding a certain
frequency and applying a ratio. First, the frequencies of 100, 400 and
800 Hz all get an addition of 100 Hz. This sounds very different, though
the added frequency is the same. Second, the ratio 3/2 (perfect fifth)
is applied to the same frequencies. This spacing sounds constant,
although the frequency displacement is different each time.

   ***EXAMPLE 01B03_Adding_vs_ratio.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac -m0
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
 prints "Playing %d Hertz!\n", p4
 asig poscil .2, p4
 aout linen asig, 0, p3, p3
 outs aout, aout
endin

instr 2
 prints  "Adding %d Hertz to %d Hertz!\n", p5, p4
 asig    poscil  .2, p4+p5
 aout linen asig, 0, p3, p3
 outs aout, aout
endin

instr 3
 prints  "Applying the ratio of %f (adding %d Hertz) to %d Hertz!\n", 
         p5, p4*p5, p4
 asig    poscil  .2, p4*p5
 aout linen asig, 0, p3, p3
 outs aout, aout
endin

</CsInstruments>
<CsScore>
;adding a certain frequency (instr 2)
i 1 0 1 100
i 2 1 1 100 100
i 1 3 1 400
i 2 4 1 400 100
i 1 6 1 800
i 2 7 1 800 100
;applying a certain ratio (instr 3)
i 1 10 1 100
i 3 11 1 100 [3/2]
i 1 13 1 400
i 3 14 1 400 [3/2]
i 1 16 1 800
i 3 17 1 800 [3/2]
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

### Equal tempered scale

As some readers will know, the current preferred method of tuning western instruments is based on equal temperament. Essentially this means that all octaves are split into 12 equal intervals, called semitones. Therefore a semitone has a ratio of 2^1/12^, which is approximately 1.059463.[^2] The next semitone will have the ratio 2^2/12^ (1.122462...), the third one 2^3/12^ (1.189207...), and so on. The exponents increase linear (1/12, 2/12, 3/12, ...), thus yielding the same proportion between each subsequent semitone.

So what about the reference to logarithms? As stated previously, logarithms are shorthand for exponents. 2^1/12^ = 1.059463 can also be written as log~2~(1.059463) = 1/12. Therefore, frequencies representing musical scales or intervals can be described on a logarithmic scale. The linear progression of the exponents (with base 2) as 1/12, 2/12, 3/12 ... represent the linear progression of semitones.

[^2]: 2^1/12^ is the same as $\sqrt[12]{2}$ thus the number which yields 2 if multiplied by itself 12 times.


### MIDI Notes

The equal-tempered scale is present on each [MIDI](https://www.midi.org/) keyboard. So the most common way to work with pitches is to use MIDI note numbers. In MIDI speak A4 (= 440 Hz) is MIDI note 69.[^3] The semitone below, called A flat or G sharp, is MIDI note 68, and so on. The MIDI notes 1-127 cover the frequency range from 9 Hz to 12544 Hz which is pretty well suited to the human hearing (and to a usual grand piano which would correspond to MIDI keys 21-108).

[^3]: Caution: like many standards there is occasional disagreement about
      the mapping between frequency and octave number. You may occasionally
      encounter A 440 Hz being described as A3.

Csound can easily deal with MIDI notes and comes with functions that
will convert MIDI notes to Hertz values (*mtof*) and back again (*ftom*). The next example shows a small chromatic melody which is given as MIDI notes in the array iMidiKeys[], and then converted to the corresponding frequencies, related to the definition of A4 (440 Hz as default). The opcode [mton](https://csound.com/docs/manual/mton.html) returns the note names.


   ***EXAMPLE 01B04_Midi_to_frequency.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac -m128
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1
A4 = 457

instr LetPlay

 iMidiKeys[] fillarray 69, 69, 69, 68, 67, 66, 65, 64
 iDurations[] fillarray 2, 1, 1, 1, 1, 1, 1, 4
 iIndex = 0
 iStart = 0
 while iIndex < lenarray(iMidiKeys) do
  schedule "Play", iStart, iDurations[iIndex]*3/2, iMidiKeys[iIndex]
  iStart += iDurations[iIndex]
  iIndex += 1
 od

endin

instr Play

 iMidiKey = p4
 iFreq mtof iMidiKey
 S_name mton iMidiKey
 printf_i "Midi Note = %d, Frequency = %f, Note name = %s\n", 
          1, iMidiKey, iFreq, S_name
 aPluck pluck .2, iFreq, iFreq, 0, 1
 aOut linen aPluck, 0, p3, p3/2
 aL, aR pan2 aOut, (iMidiKey-61)/10
 out aL, aR

endin

</CsInstruments>
<CsScore>
i "LetPlay" 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

As A4 is set in the header to 457 Hz (overwriting the default 440 Hz), this is the printout:

    Midi Note = 69, Frequency = 457.000000, Note name = 4A
    Midi Note = 69, Frequency = 457.000000, Note name = 4A
    Midi Note = 69, Frequency = 457.000000, Note name = 4A
    Midi Note = 68, Frequency = 431.350561, Note name = 4G#
    Midi Note = 67, Frequency = 407.140714, Note name = 4G
    Midi Note = 66, Frequency = 384.289662, Note name = 4F#
    Midi Note = 65, Frequency = 362.721140, Note name = 4F
    Midi Note = 64, Frequency = 342.363167, Note name = 4E


### Other Pitch Representation

In addition to raw frequency input and MIDI note numbers, Csound offers two more possibilities to specify a certain pitch. The *pch* notation is a floating point number, in which the integer part denotes the octave number and the fractional part denotes the semitones. The octave numbers are not the same as in the common system -- the middle octave is number 8 rather than 4. So C4, the "middle c" on a piano, has the number 8.00. Semitones upwards are then 8.01, 8.02 and so on, reaching A4 as 8.09. B4 is 8.11 and C5 is 9.00.

The *oct* notation also uses floating point numbers. The integer part has the same meaning as in the *pch* notation. The fractional part divides one octave in acoustically equal steps. For 8.00 as C4 and 9.00 as C5, 8.5 denotes a pitch which is acoustically in the middle between C4 and C5, which means that the proportion between this frequency and the C4 frequency is the same as the proportion between the C5 frequency and this tone's frequency. Csound calculates this as:

~~~csound
    instr 1
     iC4 = cpsoct(8)
     iC5 = cpsoct(9)
     iNew = cpsoct(8.5)
     prints "C4 = %.3f Hz, C5 = %.3f Hz, oct(8.5) = %.3f Hz.\n",
       iC4, iC5, iNew
     prints "Proportion New:C4 = %.3f, C5:New = %.3f\n",
       iNew/iC4, iC5/iNew
    endin
    schedule(1,0,0)
~~~

And the output is:

~~~
    C4 = 261.626 Hz, C5 = 523.251 Hz, oct(8.5) = 369.994 Hz.
    Proportion New:C4 = 1.414, C5:New = 1.414
~~~

On a keyboard, this pitch which divides the octave in two acoustically equal halves, is F#4. It can be notated in *pch* notation as 8.06, or in MIDI notation as key number 66. So why was *oct* notation added? -- The reason is that by this notation it becomes very simple to introduce for instance the division of an octave into 10 equal steps: 8.1, 8.2, ..., or in 8 equal steps as 8.125, 8.25, 8.375, ...

The following code shows that things like these can also be achieved with a bit of math, but for simple cases it is quite convenient to use the *oct* notation. A scale consisting of ten equal steps based on A3 (= 220 Hz) is constructed.

~~~csound
    instr 1
     puts "Calculation with octpch():", 1
     iOctDiff = 0
     while iOctDiff < 1 do
      prints "oct(%.2f)=%.3f  ", 7.75+iOctDiff, cpsoct(7.75+iOctDiff)
      iOctDiff += 1/10
     od
     puts "",1
     puts "Calculation with math:", 1
     iExp = 0
     while iExp < 1 do
      prints "pow(2,%.1f)=%.3f  ", pow(2,iExp), pow(2,iExp) * 220
      iExp += 1/10
     od
     puts "",1
    endin
    schedule(1,0,0)
~~~

### Cent

One semitone in the equal-tempered tuning system can be divided into 100 Cent. It is a common way to denote small or "microtonal" deviations. It can be used in Csound's MIDI notation as fractional part. MIDI note number 69.5 is a quarter tone (50 Cent) above A4; 68.75 is an eight tone (25 Cent) below A4. In the *pch* notation we would write 8.095 for the first and 8.0875 for the second pitch.

All musical intervals can be described as ratios or multipliers. The ratio for the perfect fifth is 3:2, or 1.5 when used as multiplier. Also one Cent is a multiplier. As one octave consists of 12 semitones, and each semitone consists of 100 Cent, one octave consists of 1200 Cent. So one Cent, described as multiplier, is 2^1/1200^ (1.000577...), and 50 Cent is 2^50/1200^ (1.0293022...). To return this multiplier, Csound offers the [cent](https://csound.com/docs/manual/cent.html) converter. So `cent(50)` returns the number by which we must multiply a certain frequency to get a quarter tone higher, and `cent(-25)` returns the multiplier for calculating an eighth tone lower.

~~~csound
    instr 1
     prints "A quater tone above A4 (440 Hz):\n"
     prints " 1. as mtof:i(69.5) = %f\n", mtof:i(69.5)
     prints " 2. as cpspch(8.095) = %f\n", cpspch(8.095)
     prints " 3. as 2^(50/1200)*440 = %f\n", 2^(50/1200)*440
     prints " 4. as cent(50)*440 = %f\n", cent(50)*440
    endin
    schedule(1,0,0)
~~~

The result of this comparison is:

~~~
    A quater tone above A4 (440 Hz):
     1. as mtof:i(69.5) = 452.892984
     2. as cpspch(8.095) = 452.880211
     3. as 2\^(50/1200)*440 = 452.892984
     4. as cent(50)*440 = 452.892984
~~~


Tuning Systems
--------------

The equal-tempered tuning system which can be found on each MIDI keyboard is not the only tuning system in existence. For many musical contexts it is not approriate. In european history there were many different systems, for instance the Pythagorean and the Meantone tuning. Each of the countless traditional music cultures all over the world, for instance Arabic Maqam, Iranian Dastgah, Indian Raga, has its own tuning system. And in comtemporary music we find also numerous different tuning systems.

Audio programming languages like Csound, which can synthesize sounds with any frequency, are particularily suited for this approach. It is even simple to "tune" a MIDI keyboard in quarter tones or to any historical tuning using Csound. The following example shows the fundamentals. It plays the five notes C D E F G (= MIDI 60 62 64 65 67) first in Pythoagorean tuning, then in Meantone, then as quatertones, then as partials 1-5.

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac -m128
</CsOptions>
<CsInstruments>

sr = 44100
nchnls = 2
0dbfs = 1
ksmps = 32

instr Pythagorean
 giScale[] fillarray 1, 9/8, 81/64, 4/3, 3/2
 schedule("LetPlay",0,0)
 puts "Pythagorean scale",1
endin

instr Meantone
 giScale[] fillarray 1, 10/9, 5/4, 4/3, 3/2
 schedule("LetPlay",0,0)
 puts "Meantone scale",1
endin

instr Quatertone
 giScale[] fillarray 1, 2^(1/24), 2^(2/24), 2^(3/24), 2^(4/24)
 schedule("LetPlay",0,0)
 puts "Quatertone scale",1
endin

instr Partials
 giScale[] fillarray 1, 2, 3, 4, 5
 schedule("LetPlay",0,0)
 puts "Partials scale",1
endin

instr LetPlay
 indx = 0
 while indx < 5 do
  schedule("Play",indx,2,giScale[indx])
  indx += 1
 od
endin

instr Play
 iFreq = mtof:i(60) * p4
 print iFreq
 aSnd vco2 .2, iFreq, 8
 aOut linen aSnd, .1, p3, p3/2
 out aOut, aOut
endin

</CsInstruments>
<CsScore>
i "Pythagorean" 0 10
i "Meantone" 10 10
i "Quatertone" 20 10
i "Partials" 30 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~



Frequently Used Formulas
------------------------

### New Frequency from Frequency and Proportion

**Given**:

- Frequency $f$
- Proportion $p$

**Searched**:

- New Frequency $f_{new}$

**Solution**:
$f_{new} = f \cdot p$

**Example**:
Which frequency is in 5/4 proportion to 440 Hz?
$\to f_{new} = 440 Hz \cdot 5/4 = 550\ Hz$

**Csound code**:
`iFreq_new = 440 * 5/4`{.Csound}


### New Frequency from Frequency and Cent Difference

**Given**:

- Frequency $f$
- Cent difference $c$

**Searched**:

- New Frequency $f_{new}$

**Solution**:
$f_{new} = f \cdot 2^{c/1200}$

**Example**:
Which frequency is 50 Cent below 440 Hz?
$f_{new} = 440 \cdot 2^{-50/1200} = 427.474\ Hz$

**Csound code**:
`iFreq_new = 440 * 2^(-50/1200)`{.Csound}


### Cent Difference of two Frequencies

**Given**:

- Frequency_1 $f_1$
- Frequency_2 $f_2$

**Searched**:

- Cent difference $c$

**Solution**:
$c = \log_2{\frac{f1}{f2}} \cdot 1200$

**Example**:
What is the Cent difference between 550 Hz and 440 Hz?
$\to c = \log_2{\frac{550}{440}} \cdot 1200 = 386.314\ Cent$

**Csound code**:
`iCent = log2(550/440) * 1200`{.Csound}
