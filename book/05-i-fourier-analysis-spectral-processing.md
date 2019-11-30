05 I. FOURIER ANALYSIS / SPECTRAL PROCESSING
============================================

An audio signal can be described as continuous changes of amplitudes in time.[^1] This is what we call *time-domain*. With a Fourier Transform (FT), we can transfer this time-domain signal to the *frequency domain*. This can, for instance, be used to analyze and visualize the spectrum of the signal. Fourier transform and subsequent manipulations in the frequency domain open a wide area of far-reaching sound transformations, like time stretching, pitch shifting, cross synthesis and any kind of spectral modification.

[^1]: *Silence* in the digital domain is not only when the ampltitudes are
      always zero. Silence is any constant amplitude, it be 0 or 1 or -0.2.


### FT, STFT, DFT and FFT

As described in chapter [04 A](04-a-additive-synthesis.md), the mathematician J.B. Fourier (1768-1830) developed a method to approximate periodic functions by weighted sums of the trigonometric functions *sine* and *cosine*. As many sounds, for instance a violin or a flute tone, can be described as *periodic functions*,[^2] we should be able to analyse their spectral components by means of the Fourier Transform.

[^2]: To put this simply: If we *zoom* into recordings of any pitched sound,
      we will see periodic repetitions. If a flute is playing a 440 Hz (A4) 
      tone, we will see every 2.27 milliseconds (1/440 second) the same shape.
      
As continuous changes are inherent to sounds, the FT used in musical applications follows a principle which is well known from film or video. The continuous flow of time is divided into a number of fixed *frames*. If this number is big enough (at least 20 frames per second), the continuous flow can reasonably be divided to this sequence of FT *snapshots*. This is called the *Short Time Fourier Transform (STFT)*.

Some care has to be taken to minimise the side effects of cutting the time into snippets. Firstly an *envelope* for the analysis frame is applied. As one analysis frame is often called *window*, the envelope shapes are called *window function*, *window shape* or *window type*. Most common are the *Hamming* and the *von Hann* (or *Hanning*) window functions:

![Hamming and Hanning window (1024 samples)](../resources/images/05-i-fft-wins.png){width=70%}

Secondly the analysis windows are not put side by side but as *overlapping* each other. The minimal overlap would be to start the next window at the middle of the previous one. More common is to have four overlaps which would result in this image:[^3]

![Four overlapping Hanning windows (each of size=1024 samples)](../resources/images/05-i-overlap.png)

[^3]: It can be a good choice to have 8 overlaps if CPU speed allows it.

We already measured the size of the analysis window in these figures in samples rather than in milliseconds. As we are dealing with *digital* audio, the Fourier Transform has become a *Digital Fourier Transform* (*DFT*). It offers some simplifications compared to the analogue FT as the number of amplitudes in one frame is finite. And moreover, there is a considerable gain of speed in the calculation if the window size is a power of two. This version of the DFT is called *Fast Fourier Transform* (*FFT*) and is implemented in all audio programming languages.


### Window Size, Bins and Time-Frequency-Tradeoff

Given that one FFT analysis window size should last about 10-50 ms and that a power-of-two number of samples must be matched, for *sr=44100* the sizes 512, 1024 or 2048 samples would be most suitable for one FFT window, thus resulting in a window length of about 11, 23 and 46 milliseconds respectively. Whether a smaller or lager window size is better, depends on different decisions.

First thing to know about this is that the frequency resolution in a FFT analysis window directly relates to its size. This is based on two aspects: the fundamental frequency and the number of potenial harmonics which are analysed and weighted via the Fourier Transform.

The *fundamental frequency* of one given FFT window is the inverse of its size in seconds related to the sample rate. For *sr=44100* Hz, the fundamental frequencies are:

- 86.13 Hz for a window size of 512 samples
- 43.07 Hz for a window size of 1024 samples
- 21.53 Hz for a window size of 2048 sample.

It is obvious that a larger window is better for frequency analysis at least for low frequencies. This is even more the case as the estimated harmonics which are scanned by the Fourier Transform are *integer multiples* of the fundamental frequency.[^3] These estimated harmonics or partials are usually called *bins* in FT terminology. So, again for *sr=44100* Hz, the bins are:

[³3]: Remember that FT is based on the assumption that the signal to be 
      analysed is a periodic function.

- bin 1 = 86.13 Hz, bin 2 = 172.26 Hz, bin 3 = 258.40 Hz for size=512
- bin 1 = 43.07 Hz, bin 2 = 86.13 Hz, bin 3 = 129.20 Hz for size=1024
- bin 1 = 21.53 Hz, bin 2 = 43.07 Hz, bin 3 = 64.60 Hz for size=2048

This means that a larger window is not only better to analyse low frequencies, it also has a better frequency resolution in general. In fact, the window of size 2048 samples has 1024 analysis bins from the fundamental frequency 21.53 Hz to the Nyquist frequency 22050 Hz, each of them covering a frequency range of 21.53 Hz, whilst the window of size 512 samples has 256 analysis bins from the fundamental frequency 86.13 Hz to the Nyquist frequency 22050 Hz, each of them covering a frequency range of 86.13 Hz.[^4]

[^4]: For both, the *bin 0* is to be added which analyses the energy at 0 Hz.
      So in general the number of bins is half of the window size plus one:
      257 bins for size 512, 513 bins for size 1924, 1025 bins for size 2048.

![Bins up to 1000 Hz for different window sizes](../resources/images/05-i-bins.png)

Why then not always use the larger window? — Because a larger window needs more time, or in other words: the time resolution is worse for a window size of 2048, is fair for a window size of 1024 and is better for a window size of 512.

This dilemma is known as *time-frequency tradeoff*. We must decide for each FFT situation whether the frequency resolution or the time resolution is more important. If, for instance, we have long piano chords with low frequencies, we may use the bigger window size. If we analyse spoken words of a female voice, we may use the smaller window size. Or to put it very pragmatic: We will use the medium FFT size (1024 samples) first, and in case we experience unsatisfying results (bad frequency response or smearing time resolution) we will change the window size.


### FFT in Csound

The raw output of a Fourier Transform is a number of *amplitude-phase* pairs per analysis window frame. Most Csound opcodes use another format which transforms the *phase* values to *frequencies*. This format is related to the *phase vocoder* implementation, so the Csound opcodes of this class are called *phase vocoder opcodes* and start with *pv* or *pvs*.

The *pv* opcodes belong to the early implementation of FFT in Csound. This group comprises the opcodes
[pvadd](https://csound.com/docs/manual/pvadd.html),
[pvbufread](https://csound.com/docs/manual/pvbufread.html),
[pvcross](https://csound.com/docs/manual/pvcross.html),
[pvinterp](https://csound.com/docs/manual/pvinterp.html),
[pvoc](https://csound.com/docs/manual/pvov.html),
[pvread](https://csound.com/docs/manual/pvread.html) and
[vpvoc](https://csound.com/docs/manual/vpvoc.html).
Note that these **pv** opcodes are ***not designed to work in real-time**.

The opcodes which **are** designed *for real-time spectral processing* are called *phase vocoder streaming* opcodes. They all start with **pvs**; a rather complete list can be found on the 
[Spectral Processing](https://csound.com/docs/manual/SpectralTop.html)
site in the Csound Manual. They are fast and easy to use. Because of their power and diversity they are one of the biggest strengths in using Csound.

We will focus on these *pvs* opcodes here, which for most use cases offer all what is desirable to work in the spectral domain. There is, however, a group of opcodes which allow to go back to the *raw* FFT output (without the phase vocoder format). They are listed as 
[array-based spectral opcodes](https://csound.com/docs/manual/arraysfft.html)
in the Csound Manual.


From Time Domain to Frequency Domain: *pvsanal*
-----------------------------------------------

For dealing with signals in the frequency domain, the *pvs* opcodes
implement a new signal type, the *frequency-* or *f-signal*. If we start with an audio signal in time-domain as *aSig*, it will become *fSig* as result of the Fourier Transform.

There are several opcodes to perform this transform. The most simple one is 
[pvsanal](https://csound.com/docs/manual/pvsanal.html). It performs on-the-fly transformation of an input audio signal *aSig* to a frequency signal *fSig*. In addition to the audio signal input it requires some basic FFT settings:

- *ifftsize* is the size of the FFT. As explained above, 512, 1024 or 2048 
  samples are reasonable values here.
- *ioverlap* is the number of samples after which the next (overlapping)
  FFT frame starts (often refered to as *hop size*). Usually it is 1/4
  of the FFT size, so for instance 256 samples for a FFT size of 1024.
  Below is a figure for these settings.
- *iwinsize* is the size of the analysis window. Usually this is set to
  the same size as *ifftsize*.[^4]
- *iwintype* is the shape of the analysis window. 0 will use a Hamming
  window, 1 will use a von-Hann (or Hanning) window.

[^4]: It can be an integral multiple of *ifftsize*, so a window twice as 
      large as the FFT size would be possible and may improve the quality
      of the anaylysis. But it also induces more latency which usually
      is not desirable.

The first example covers two typical situations:
-   the audio signal derives from playing back a soundfile from the hard
    disk (instr 1)
-   the audio signal is the live input (instr 2)

(Caution - this example can quickly start feeding back. Best results are
with headphones.)

   ***EXAMPLE 05I01_pvsanal.csd*** 

~~~
<CsoundSynthesizer>
<CsOptions>
-i adc -o dac
--env:SSDIR+=../resources/SourceMaterials
</CsOptions>
<CsInstruments>
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
;example by joachim heintz
~~~

You should hear first the *fox.wav* sample, and then the slightly
delayed live input signal. The delay (or latency) that you will observe
will depend first of all on the general settings for realtime input
(ksmps, -b and -B: see chapter [02 D](02-d-live-audio.md)), 
but it will also be added to by the
FFT process. The window size here is 1024 samples, so the additional
delay is 1024/44100 = 0.023 seconds. If you change the window size
*gifftsiz* to 2048 or to 512 samples, you should notice a larger or
shorter delay. For realtime applications, the decision about the FFT
size is not only a question of better time resolution versus better
frequency resolution, but it will also be a question concerning
tolerable latency.

What happens in the example above? Firstly, the audio signal (*asig* or
*ain*) is being analyzed and transformed to an f-signal. This is done via
the opcode [pvsanal](https://csound.com/docs/manual/pvsanal.html).
Then nothing more happens than the f-signal being transformed from the
frequency domain signal back into the time domain (an audio signal).
This is called inverse Fourier transformation (IFT or IFFT) and is
carried out by the opcode
[pvsynth](https://csound.com/docs/manual/pvsynth.html). In this
case, it is just a test: to see if everything works, to hear the results
of different window sizes and to check the latency, but potentially you
can insert any other pvs opcode(s) in between this analysis and
resynthesis:

![](../resources/images/05-i-schema-1.png)


### Alternatives: pvstanal, pvsbufread


### Pitch shifting

Simple pitch shifting can be carried out by the opcode
[pvscale](https://csound.com/docs/manual/pvscale.html). All the
frequency data in the f-signal are scaled by a certain value.
Multiplying by 2 results in transposing by an octave upwards;
multiplying by 0.5 in transposing by an octave downwards. For accepting
cent values instead of ratios as input, the
[cent](https://csound.com/docs/manual/cent.html) opcode can be used.

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
[pvstanal](https://csound.com/docs/manual/pvstanal.html) (new in
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
    is what [pvsvoc](https://csound.com/docs/manual/pvsvoc.html)
    does. 
-   Combine the frequencies of sound A with the amplitudes of sound B.
    Give user flexibility by scaling the amplitudes between A and B:
    [pvscross](https://csound.com/docs/manual/pvscross.html).
-   Get the frequencies from sound A. Multiply the amplitudes of A
    and B. This can be described as spectral filtering.
    [pvsfilter](https://csound.com/docs/manual/pvsfilter.html) gives
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
