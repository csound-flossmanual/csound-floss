01 B. PITCH AND FREQUENCY
=========================

FREQUENCIES
-----------

As mentioned in the previous section, frequency is defined as the number
of cycles or periods per second. Frequency is measured in Hertz. If a
tone has a frequency of 440Hz it completes 440 cycles every second.
Given a tone\'s frequency, one can easily calculate the period of any
sound. Mathematically, the period is the reciprocal of the frequency and
vice versa. In equation form, this is expressed as follows.

     Frequency = 1/Period         Period = 1/Frequency

 

Therefore the frequency is the inverse of the period, so a wave of 100Hz
frequency has a period of 1/100 or 0.01 seconds, likewise a frequency of
256Hz has a period of 1/256, or 0.004 seconds. To calculate the
wavelength of a sound in any given medium we can use the following
equation:

    λ = Velocity/Frequency

For instance, a wave of 1000 Hz in air (velocity of diffusion about 340
m/s) has a length of approximately 340/1000 m = 34 cm.

### Upper and Lower Limits of Hearing

It is generally stated that the human ear can hear sounds in the range
20Hz to 20,000Hz (20kHz). This upper limit tends to decrease with age
due to a condition known as presbyacusis, or age related hearing loss.
Most adults can hear to about 16 kHz while most children can hear beyond
this. At the lower end of the spectrum the human ear does not respond to
frequencies below 20 Hz, with 40 of 50 Hz being the lowest most people
can perceive. 

So, in the following example, you will not hear the first (10 Hz) tone,
and probably not the last (20 kHz) one, but hopefully the other ones
(100 Hz, 1000 Hz, 10000 Hz):

***EXAMPLE 01B01\_LimitsOfHearing.csd***

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
brightnesses. Musical frequencies also work on a logarithmic scale; more
on this later.

Intervals in music describe the distance between two notes. When dealing
with standard musical notation it is easy to determine an interval
between two adjacent notes. For example a perfect 5th is always made up
of 7 semitones. When dealing with Hz values things are different. A
difference of say 100Hz does not always equate to the same musical
interval. This is because musical intervals as we hear them are
represented in Hz as frequency ratios. An octave for example is always
2:1. That is to say every time you double a Hz value you will jump up by
a musical interval of an octave.

Consider the following. A flute can play the note A at 440Hz. If the
player plays another A an octave above it at 880 Hz the difference in Hz
is 440. Now consider the piccolo, the highest pitched instrument of the
orchestra. It can play a frequency of 2000Hz but it can also play an
octave above this at 4000Hz (2 x 2000Hz). While the difference in Hertz
between the two notes on the flute is only 440Hz, the difference between
the two high pitched notes on a piccolo is 1000Hz yet they are both only
playing notes one octave apart.

What all this demonstrates is that the higher two pitches become, the
greater the difference in Hertz required for us to recognize the spacing
as the same musical interval. We can use simple ratios to represent a
number of familiar intervals; for example the unison: (1:1), the octave:
(2:1), the perfect fifth (3:2), the perfect fourth (4:3), the major
third (5:4) and the minor third (6:5); but it should be noted that most
of these intervals are only represented with absolute precision when
using just intonation. In equal temperament, the dominant method used in
the tuning of many instruments, only unison and the octave are
represented with these precise ratios.

The following example shows the difference between adding a certain
frequency and applying a ratio. First, the frequencies of 100, 400 and
800 Hz all get an addition of 100 Hz. This sounds very different, though
the added frequency is the same. Second, the ratio 3/2 (perfect fifth)
is applied to the same frequencies. This spacing sounds constant,
although the frequency displacement is different each time.

***EXAMPLE 01B02\_Adding\_vs\_ratio.csd*** 

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

    instr 2
     prints  "Adding %d Hertz to %d Hertz!\n", p5, p4
     asig    poscil  .2, p4+p5
     outs    asig, asig
    endin

    instr 3
     prints  "Applying the ratio of %f (adding %d Hertz) to %d Hertz!\n", p5, p4*p5, p4
     asig    poscil  .2, p4*p5
     outs    asig, asig
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

So what of the algorithms mentioned above. As some readers will know the
current preferred method of tuning western instruments is based on equal
temperament. Essentially this means that all octaves are split into 12
equal intervals. Therefore a semitone has a ratio of 2^(1/12)^, which is
approximately 1.059463.

So what about the reference to logarithms in the heading above? As
stated previously, logarithms are shorthand for exponents. 2^(1/12)^=
1.059463 can also be written as log2(1.059463)= 1/12. Therefore musical
frequency works on a logarithmic scale. 

### MIDI Notes

Csound can easily deal with MIDI notes and comes with functions that
will convert MIDI notes to Hertz values and back again. In MIDI speak
A440 is equal to A4 and is MIDI note 69. You can think of A4 as being
the fourth A from the lowest A we can hear; well, almost hear.

*Caution: like many standards there is occasional disagreement about
the mapping between frequency and octave number. You may occasionally
encounter A440 being described as A3.*
