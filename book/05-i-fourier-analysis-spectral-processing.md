05 I. FOURIER ANALYSIS / SPECTRAL PROCESSING
============================================

FOURIER TRANSFORMATION / SPECTRAL PROCESSING
--------------------------------------------

A Fourier Transformation (FT) is used to transfer an audio-signal from
the time-domain to the frequency-domain. This can, for instance, be used
to analyze and visualize the spectrum of the signal appearing in a
certain time span. Fourier transform and subsequent manipulations in the
frequency domain open a wide area of interesting sound transformations,
like time stretching, pitch shifting and much more.

### **How does it work?**

The mathematician J.B. Fourier (1768-1830) developed a method to
approximate periodic functions by using sums of trigonometric functions.
The advantage of this was that the properties of the trigonometric
functions (sin & cos) were well-known and helped to describe the
properties of the unknown function.

In audio DSP, a fourier transformed signal is decomposed into its sum of
sinoids. Put simply, Fourier transform is the opposite of additive
synthesis. Ideally, a sound can be dissected by Fourier transformation
into its partial components, and resynthesized again by adding these
components back together again.

On account of the fact that sound is represented as discrete samples in
the computer, the computer implementation of the FT calculates a
discrete Fourier transform (DFT). As each transformation needs a certain
number of samples, one key decision in performing DFT is about the
number of samples used. The analysis of the frequency components will be
more accurate if more samples are used, but as samples represent a
progression of time, a caveat must be found for each FT between either
better time resolution (fewer samples) or better frequency resolution
(more samples). A typical value for FT in music is to have about 20-100
\"snapshots\" per second (which can be compared to the single frames in
a film or video).

At a sample rate of 48000 samples per second, these are about 500-2500
samples for one frame or window. It is normal in DFT in computer music
to use window sizes which are a power-of-two in size, such as 512, 1024
or 2048 samples. The reason for this restriction is that DFT for these
power-of-two sized frames can be calculated much faster. This is called
Fast Fourier Transform (FFT), and this is the standard implementation of
the Fourier transform in audio applications.

### **How is FFT done in Csound?**

As usual, there is not just one way to work with FFT and spectral
processing in Csound. There are several families of opcodes. Each family
can be very useful for a specific approach to working in the frequency
domain. Have a look at the [\"Spectral
Processing\"](http://www.csounds.com/manual/html/SpectralTop.html)
overview in the Csound Manual. This introduction will focus on the
so-called \"Phase Vocoder Streaming\" opcodes. All of these opcodes
begin with the characters \"pvs\". These opcodes became part of Csound
through the work of Richard Dobson, Victor Lazzarini and others. They
are designed to work in realtime in the frequency domain in Csound and
indeed they are not just very fast but also easier to use than FFT
implementations in many other applications.

### Changing from Time-domain to Frequency-domain

For dealing with signals in the frequency domain, the pvs opcodes
implement a new signal type, the **f-signals**. Csound shows the type of
a variable in the first letter of its name. Each audio signal starts
with an **a**, each control signal with a **k**, and so each signal in
the frequency domain used by the pvs-opcodes starts with an **f**.

There are several ways to create an f-signal. The most common way is to
convert an audio signal to a frequency signal. The first example covers
two typical situations:

-   the audio signal derives from playing back a soundfile from the hard
    disc (instr 1)
-   the audio signal is the live input (instr 2)

(Caution - this example can quickly start feeding back. Best results are
with headphones.)

***EXAMPLE 05I01\_pvsanal.csd*** ^1^ 

    <CsoundSynthesizer>
    <CsOptions>
    -i adc -o dac
    </CsOptions>
    <CsInstruments>
    ;Example by Joachim Heintz
    ;uses the file "fox.wav" (distributed with the Csound Manual)
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    ;general values for fourier transform
    gifftsiz  =         1024
    gioverlap =         256
    giwintyp  =         1 ;von hann window

    instr 1 ;soundfile to fsig
    asig      soundin   "fox.wav"
    fsig      pvsanal   asig, gifftsiz, gioverlap, gifftsiz*2, giwintyp
    aback     pvsynth   fsig
              outs      aback, aback
    endin

    instr 2 ;live input to fsig
              prints    "LIVE INPUT NOW!%n"
    ain       inch      1 ;live input from channel 1
    fsig      pvsanal   ain, gifftsiz, gioverlap, gifftsiz, giwintyp
    alisten   pvsynth   fsig
              outs      alisten, alisten
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 2 3 10
    </CsScore>
    </CsoundSynthesizer>

You should hear first the \"fox.wav\" sample, and then the slightly
delayed live input signal. The delay (or latency) that you will observe
will depend first of all on the general settings for realtime input
(ksmps, -b and -B: see chapter 2D), but it will also be added to by the
FFT process. The window size here is 1024 samples, so the additional
delay is 1024/44100 = 0.023 seconds. If you change the window size
*gifftsiz* to 2048 or to 512 samples, you should notice a larger or
shorter delay. For realtime applications, the decision about the FFT
size is not only a question of better time resolution versus better
frequency resolution, but it will also be a question concerning
tolerable latency.

What happens in the example above? Firstly, the audio signal (*asig,
ain*) is being analyzed and transformed to an f-signal. This is done via
the opcode [pvsanal](http://www.csounds.com/manual/html/pvsanal.html).
Then nothing more happens than the f-signal being transformed from the
frequency domain signal back into the time domain (an audio signal).
This is called inverse Fourier transformation (IFT or IFFT) and is
carried out by the opcode
[pvsynth](http://www.csounds.com/manual/html/pvsynth.html).^2^  In this
case, it is just a test: to see if everything works, to hear the results
of different window sizes and to check the latency, but potentially you
can insert any other pvs opcode(s) in between this analysis and
resynthesis:

 

::: {.group_img}
::: {.image}
![](../resources/images/04ischema_1.png){width="600" height="104"}
:::
:::

 

### Pitch shifting

Simple pitch shifting can be carried out by the opcode
[pvscale](http://www.csounds.com/manual/html/pvscale.html). All the
frequency data in the f-signal are scaled by a certain value.
Multiplying by 2 results in transposing by an octave upwards;
multiplying by 0.5 in transposing by an octave downwards. For accepting
cent values instead of ratios as input, the
[cent](http://www.csounds.com/manual/html/cent.html) opcode can be used.

***EXAMPLE 05I02\_pvscale.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;example by joachim heintz
    sr = 44100
    ksmps = 32
    nchnls = 1
    0dbfs = 1

    gifftsize =         1024
    gioverlap =         gifftsize / 4
    giwinsize =         gifftsize
    giwinshape =        1; von-Hann window

    instr 1 ;scaling by a factor
    ain       soundin  "fox.wav"
    fftin     pvsanal  ain, gifftsize, gioverlap, giwinsize, giwinshape
    fftscal   pvscale  fftin, p4
    aout      pvsynth  fftscal
              out      aout
    endin

    instr 2 ;scaling by a cent value
    ain       soundin  "fox.wav"
    fftin     pvsanal  ain, gifftsize, gioverlap, giwinsize, giwinshape
    fftscal   pvscale  fftin, cent(p4)
    aout      pvsynth  fftscal
              out      aout/3
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 3 1; original pitch
    i 1 3 3 .5; octave lower
    i 1 6 3 2 ;octave higher
    i 2 9 3 0
    i 2 9 3 400 ;major third
    i 2 9 3 700 ;fifth
    e
    </CsScore>
    </CsoundSynthesizer>

Pitch shifting via FFT resynthesis is very simple in general, but rather
more complicated in detail. With speech for instance, there is a problem
because of the formants. If you simply scale the frequencies, the
formants are shifted, too, and the sound gets the typical \'helium
voice\' effect. There are some parameters in the *pvscale* opcode, and
some other pvs-opcodes which can help to avoid this, but the quality of
the results will always depend to an extend upon the nature of the input
sound.

### Time-stretch/compress

As the Fourier transformation separates the spectral information from
its progression in time, both elements can be varied independently.
Pitch shifting via the *pvscale* opcode, as in the previous example, is
independent of the speed of reading the audio data. The complement is
changing the time without changing the pitch: time-stretching or
time-compression.

The simplest way to alter the speed of a sampled sound is using
[pvstanal](http://www.csounds.com/manual/html/pvstanal.html) (new in
Csound 5.13). This opcode transforms a sound stored in a function table
(transformation to an f-signal is carried out internally by the opcode)
with time manipulations simply being done by altering its *ktimescal*
parameter.

***EXAMPLE 05I03\_pvstanal.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;example by joachim heintz
    sr = 44100
    ksmps = 32
    nchnls = 1
    0dbfs = 1

    ;store the sample "fox.wav" in a function table (buffer)
    gifil     ftgen     0, 0, 0, 1, "fox.wav", 0, 0, 1

    ;general values for the pvstanal opcode
    giamp     =         1 ;amplitude scaling
    gipitch   =         1 ;pitch scaling
    gidet     =         0 ;onset detection
    giwrap    =         0 ;no loop reading
    giskip    =         0 ;start at the beginning
    gifftsiz  =         1024 ;fft size
    giovlp    =         gifftsiz/8 ;overlap size
    githresh  =         0 ;threshold

    instr 1 ;simple time stretching / compressing
    fsig      pvstanal  p4, giamp, gipitch, gifil, gidet, giwrap, giskip,
                        gifftsiz, giovlp, githresh
    aout      pvsynth   fsig
              out       aout
    endin

    instr 2 ;automatic scratching
    kspeed    randi     2, 2, 2 ;speed randomly between -2 and 2
    kpitch    randi     p4, 2, 2 ;pitch between 2 octaves lower or higher
    fsig      pvstanal  kspeed, 1, octave(kpitch), gifil
    aout      pvsynth   fsig
    aenv      linen     aout, .003, p3, .1
              out       aenv
    endin

    </CsInstruments>
    <CsScore>
    ;         speed
    i 1 0 3   1
    i . + 10   .33
    i . + 2   3
    s
    i 2 0 10 0;random scratching without ...
    i . 11 10 2 ;... and with pitch changes
    </CsScore>
    </CsoundSynthesizer>

 

### Cross Synthesis 

Working in the frequency domain makes it possible to combine or
\'cross\' the spectra of two sounds. As the Fourier transform of an
analysis frame results in a frequency and an amplitude value for each
frequency \'bin\', there are many different ways of performing cross
synthesis. The most common methods are:

-   Combine the amplitudes of sound A with the frequencies of sound B.
    This is the classical phase vocoder approach. If the frequencies are
    not completely from sound B, but represent an interpolation between
    A and B, the cross synthesis is more flexible and adjustable. This
    is what [pvsvoc](http://www.csounds.com/manual/html/pvsvoc.html)
    does. 
-   Combine the frequencies of sound A with the amplitudes of sound B.
    Give user flexibility by scaling the amplitudes between A and B:
    [pvscross](http://www.csounds.com/manual/html/pvscross.html).
-   Get the frequencies from sound A. Multiply the amplitudes of A
    and B. This can be described as spectral filtering.
    [pvsfilter](http://www.csounds.com/manual/html/pvsfilter.html) gives
    a flexible portion of this filtering effect.

This is an example of phase vocoding. It is nice to have speech as sound
A, and a rich sound, like classical music, as sound B. Here the \"fox\"
sample is being played at half speed and \'sings\' through the music of
sound B: 

***EXAMPLE 05I04\_phase\_vocoder.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;example by joachim heintz
    sr = 44100
    ksmps = 32
    nchnls = 1
    0dbfs = 1

    ;store the samples in function tables (buffers)
    gifilA    ftgen     0, 0, 0, 1, "fox.wav", 0, 0, 1
    gifilB    ftgen     0, 0, 0, 1, "ClassGuit.wav", 0, 0, 1


    ;general values for the pvstanal opcode
    giamp     =         1 ;amplitude scaling
    gipitch   =         1 ;pitch scaling
    gidet     =         0 ;onset detection
    giwrap    =         1 ;loop reading
    giskip    =         0 ;start at the beginning
    gifftsiz  =         1024 ;fft size
    giovlp    =         gifftsiz/8 ;overlap size
    githresh  =         0 ;threshold

    instr 1
    ;read "fox.wav" in half speed and cross with classical guitar sample
    fsigA     pvstanal  .5, giamp, gipitch, gifilA, gidet, giwrap, giskip,\
                         gifftsiz, giovlp, githresh
    fsigB     pvstanal  1, giamp, gipitch, gifilB, gidet, giwrap, giskip,\
                         gifftsiz, giovlp, githresh
    fvoc      pvsvoc    fsigA, fsigB, 1, 1
    aout      pvsynth   fvoc
    aenv      linen     aout, .1, p3, .5
              out       aenv
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 11
    </CsScore>
    </CsoundSynthesizer>

 

The next example introduces *pvscross*:

***EXAMPLE 05I05\_pvscross.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;example by joachim heintz
    sr = 44100
    ksmps = 32
    nchnls = 1
    0dbfs = 1

    ;store the samples in function tables (buffers)
    gifilA    ftgen     0, 0, 0, 1, "BratscheMono.wav", 0, 0, 1
    gifilB    ftgen     0, 0, 0, 1, "fox.wav", 0, 0, 1

    ;general values for the pvstanal opcode
    giamp     =         1 ;amplitude scaling
    gipitch   =         1 ;pitch scaling
    gidet     =         0 ;onset detection
    giwrap    =         1 ;loop reading
    giskip    =         0 ;start at the beginning
    gifftsiz  =         1024 ;fft size
    giovlp    =         gifftsiz/8 ;overlap size
    githresh  =         0 ;threshold

    instr 1
    ;cross viola with "fox.wav" in half speed
    fsigA     pvstanal  1, giamp, gipitch, gifilA, gidet, giwrap, giskip,\
                        gifftsiz, giovlp, githresh
    fsigB     pvstanal  .5, giamp, gipitch, gifilB, gidet, giwrap, giskip,\
                         gifftsiz, giovlp, githresh
    fcross    pvscross  fsigA, fsigB, 0, 1
    aout      pvsynth   fcross
    aenv      linen     aout, .1, p3, .5
              out       aenv
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 11
    </CsScore>
    </CsoundSynthesizer>

The last example shows spectral filtering via *pvsfilter*. The
well-known \"fox\" (sound A) is now filtered by the viola (sound B). Its
resulting intensity is dependent upon the amplitudes of sound B, and if
the amplitudes are strong enough, you will hear a resonating effect:

***EXAMPLE 05I06\_pvsfilter.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>
    ;example by joachim heintz
    sr = 44100
    ksmps = 32
    nchnls = 1
    0dbfs = 1

    ;store the samples in function tables (buffers)
    gifilA    ftgen     0, 0, 0, 1, "fox.wav", 0, 0, 1
    gifilB    ftgen     0, 0, 0, 1, "BratscheMono.wav", 0, 0, 1

    ;general values for the pvstanal opcode
    giamp     =         1 ;amplitude scaling
    gipitch   =         1 ;pitch scaling
    gidet     =         0 ;onset detection
    giwrap    =         1 ;loop reading
    giskip    =         0 ;start at the beginning
    gifftsiz  =         1024 ;fft size
    giovlp    =         gifftsiz/4 ;overlap size
    githresh  =         0 ;threshold

    instr 1
    ;filters "fox.wav" (half speed) by the spectrum of the viola (double speed)
    fsigA     pvstanal  .5, giamp, gipitch, gifilA, gidet, giwrap, giskip,\
                         gifftsiz, giovlp, githresh
    fsigB     pvstanal  2, 5, gipitch, gifilB, gidet, giwrap, giskip,\
                         gifftsiz, giovlp, githresh
    ffilt     pvsfilter fsigA, fsigB, 1
    aout      pvsynth   ffilt
    aenv      linen     aout, .1, p3, .5
              out       aenv
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 11
    </CsScore>
    </CsoundSynthesizer>

There are many more tools and opcodes for transforming FFT signals in
Csound. Have a look at the *Signal Processing II* section of the
*Opcodes Overview* for some hints.

1.  [All soundfiles used in this manual are free and can be downloaded
    at
    www.csound-tutorial.net]{#endnote-517035d8-f940-4d5a-a9aa-b45b872fa695}
2.  [In some cases it might be interesting to use pvsadsyn instead of
    pvsynth. It employs a bank of oscillators for resynthesis, the
    details of which can be controlled by the
    user.]{#endnote-204b82f4-5490-4878-afa0-2c2897b5306f}
