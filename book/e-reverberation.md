E. REVERBERATION
================

Reverb is the effect a room or space has on a sound where the sound we
perceive is a mixture of the direct sound and the dense overlapping
echoes of that sound reflecting off walls and objects within the space.

Csound\'s earliest reverb opcodes are *reverb* and *nreverb*. By
today\'s standards they sound rather crude and as a consequence modern
Csound users tend to prefer the more recent opcodes *freeverb* and
*reverbsc*.

The typical way to use a reverb is to run as a effect throughout the
entire Csound performance and to send it audio from other instruments to
which it adds reverb. This is more efficient than initiating a new
reverb effect for every note that is played. This arrangement is a
reflection of how a reverb effect would be used with a mixing desk in a
conventional studio. There are several methods of sending audio from
sound producing instruments to the reverb instrument, three of which
will be introduced in the coming examples

The first method uses Csound\'s global variables, so that an audio
variable created in one instrument and be read in another instrument.
There are several points to highlight here. First the global audio
variable that is used to send audio to the reverb instrument is
initialized to zero (silence) in the header area of the orchestra.

This is done so that if no sound generating instruments are playing at
the beginning of the performance this variable still exists and has a
value. An error would result otherwise and Csound would not run. When
audio is written into this variable in the sound generating instrument
it is added to the current value of the global variable.

This is done in order to permit polyphony and so that the state of this
variable created by other sound producing instruments is not
overwritten. Finally it is important that the global variable is cleared
(assigned a value of zero) when it is finished with at the end of the
reverb instrument. If this were not done then the variable would quickly
\'explode\' (get astronomically high) as all previous instruments are
merely adding values to it rather that redeclaring it. Clearing could be
done simply by setting to zero but the *clear* opcode might prove useful
in the future as it provides us with the opportunity to clear many
variables simultaneously.

This example uses the
[freeverb](http://www.csounds.com/manual/html/freeverb.html) opcode and
is based on a plugin of the same name. Freeverb has a smooth reverberant
tail and is perhaps similar in sound to a plate reverb. It provides us
with two main parameters of control: \'room size\' which is essentially
a control of the amount of internal feedback and therefore reverb time,
and \'high frequency damping\' which controls the amount of attenuation
of high frequencies. Both there parameters should be set within the
range 0 to 1. For room size a value of zero results in a very short
reverb and a value of 1 results in a very long reverb. For high
frequency damping a value of zero provides minimum damping of higher
frequencies giving the impression of a space with hard walls, a value of
1 provides maximum high frequency damping thereby giving the impression
of a space with soft surfaces such as thick carpets and heavy curtains. 

**   *EXAMPLE 05E01\_freeverb.csd*** 

    <CsoundSynthesizer>
    <CsOptions>
    -odac ; activates real time sound output
    </CsOptions>

    <CsInstruments>
    ;Example by Iain McCurdy

    sr =  44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    gaRvbSend    init      0 ; global audio variable initialized to zero

      instr 1 ; sound generating instrument (sparse noise bursts)
    kEnv         loopseg   0.5,0,0,1,0.003,1,0.0001,0,0.9969,0,0; amp. env.
    aSig         pinkish   kEnv              ; noise pulses
                 outs      aSig, aSig        ; audio to outs
    iRvbSendAmt  =         0.8               ; reverb send amount (0 - 1)
    ; add some of the audio from this instrument to the global reverb send variable
    gaRvbSend    =         gaRvbSend + (aSig * iRvbSendAmt)
      endin

      instr 5 ; reverb - always on
    kroomsize    init      0.85          ; room size (range 0 to 1)
    kHFDamp      init      0.5           ; high freq. damping (range 0 to 1)
    ; create reverberated version of input signal (note stereo input and output)
    aRvbL,aRvbR  freeverb  gaRvbSend, gaRvbSend,kroomsize,kHFDamp
                 outs      aRvbL, aRvbR ; send audio to outputs
                 clear     gaRvbSend    ; clear global audio variable
      endin

    </CsInstruments>

    <CsScore>
    i 1 0 300 ; noise pulses (input sound)
    i 5 0 300 ; start reverb
    e
    </CsScore>
    </CsoundSynthesizer>

The next example uses Csound\'s zak patching system to send audio from
one instrument to another. The zak system is a little like a patch bay
you might find in a recording studio. Zak channels can be a, k or
i-rate. These channels will be addressed using numbers so it will be
important to keep track of what each numbered channel is used for. Our
example will be very simple in that we will only be using one zak audio
channel. Before using any of the zak opcodes for reading and writing
data we must initialize zak storage space. This is done in the orchestra
header area using the
[zakinit](http://www.csounds.com/manual/html/zakinit.html) opcode. This
opcode initializes both a and k rate channels; we must intialize at
least one of each even if we don\'t require both.

    zakinit    1, 1

 

The audio from the sound generating instrument is mixed into a zak audio
channel the [zawm](http://www.csounds.com/manual/html/zawm.html) opcode
like this:

    zawm    aSig * iRvbSendAmt, 1

This channel is read from in the reverb instrument using the
[zar](http://www.csounds.com/manual/html/zar.html) opcode like this:

    aInSig  zar   1

 

Because audio is begin mixed into our zak channel but it is never
redefined (only mixed into) it needs to be cleared after we have
finished with it. This is accomplished at the bottom of the reverb
instrument using the
[zacl](http://www.csounds.com/manual/html/zacl.html) opcode like this:

    zacl      0, 1

 

This example uses the
[reverbsc](http://www.csounds.com/manual/html/reverbsc.html) opcode. It
too has a stereo input and output. The arguments that define its
character are feedback level and cutoff frequency. Feedback level should
be in the range zero to 1 and controls reverb time. Cutoff frequency
should be within the range of human hearing (20Hz -20kHz) and less than
the Nyqvist frequency (sr/2) - it controls the cutoff frequencies of low
pass filters within the algorithm.

**   *EXAMPLE 05E02\_reverbsc.csd***

    <CsoundSynthesizer>

    <CsOptions>
    -odac ; activates real time sound output
    </CsOptions>

    <CsInstruments>
    ; Example by Iain McCurdy

    sr =  44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    ; initialize zak space  - one a-rate and one k-rate variable.
    ; We will only be using the a-rate variable.
                 zakinit   1, 1

      instr 1 ; sound generating instrument - sparse noise bursts
    kEnv         loopseg   0.5,0, 0,1,0.003,1,0.0001,0,0.9969,0,0; amp. env.
    aSig         pinkish   kEnv       ; pink noise pulses
                 outs      aSig, aSig ; send audio to outputs
    iRvbSendAmt  =         0.8        ; reverb send amount (0 - 1)
    ; write to zak audio channel 1 with mixing
                 zawm      aSig*iRvbSendAmt, 1
      endin

      instr 5 ; reverb - always on
    aInSig       zar       1    ; read first zak audio channel
    kFblvl       init      0.88 ; feedback level - i.e. reverb time
    kFco         init      8000 ; cutoff freq. of a filter within the reverb
    ; create reverberated version of input signal (note stereo input and output)
    aRvbL,aRvbR  reverbsc  aInSig, aInSig, kFblvl, kFco
                 outs      aRvbL, aRvbR ; send audio to outputs
                 zacl      0, 1         ; clear zak audio channels
      endin

    </CsInstruments>

    <CsScore>
    i 1 0 10 ; noise pulses (input sound)
    i 5 0 12 ; start reverb
    e
    </CsScore>

    </CsoundSynthesizer>

*reverbsc* contains a mechanism to modulate delay times internally which
has the effect of harmonically blurring sounds the longer they are
reverberated. This contrasts with *freeverb*\'s rather static
reverberant tail. On the other hand *screverb*\'s tail is not as smooth
as that of *freeverb,* inidividual echoes are sometimes discernible so
it may not be as well suited to the reverberation of percussive sounds.
Also be aware that as well as reducing the reverb time, the feedback
level parameter reduces the overall amplitude of the effect to the point
where a setting of 1 will result in silence from the opcode.

A more recent option for sending sound from instrument to instrument in
Csound is to use the *chn\...* opcodes. These opcodes can also be used
to allow Csound to interface with external programs using the software
bus and the Csound API.

 

**   *EXAMPLE 05E03\_reverb\_with\_chn.csd***

    <CsoundSynthesizer>

    <CsOptions>
    -odac ; activates real time sound output
    </CsOptions>

    <CsInstruments>
    ; Example by Iain McCurdy

    sr =  44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

      instr 1 ; sound generating instrument - sparse noise bursts
    kEnv         loopseg   0.5,0, 0,1,0.003,1,0.0001,0,0.9969,0,0 ; amp. envelope
    aSig         pinkish   kEnv                                 ; noise pulses
                 outs      aSig, aSig                           ; audio to outs
    iRvbSendAmt  =         0.4                        ; reverb send amount (0 - 1)
    ;write audio into the named software channel:
                 chnmix    aSig*iRvbSendAmt, "ReverbSend"
      endin

      instr 5 ; reverb (always on)
    aInSig       chnget    "ReverbSend"   ; read audio from the named channel
    kTime        init      4              ; reverb time
    kHDif        init      0.5            ; 'high frequency diffusion' (0 - 1)
    aRvb         nreverb   aInSig, kTime, kHDif ; create reverb signal
    outs         aRvb, aRvb               ; send audio to outputs
                 chnclear  "ReverbSend"   ; clear the named channel
    endin

    </CsInstruments>

    <CsScore>
    i 1 0 10 ; noise pulses (input sound)
    i 5 0 12 ; start reverb
    e
    </CsScore>

    </CsoundSynthesizer>

The Schroeder Reverb Design
---------------------------

Many reverb algorithms including Csound\'s freeverb, reverb and reverbn
are based on what is known as the Schroeder reverb design. This was a
design proposed in the early 1960s by the physicist Manfred Schroeder.
In the Schroeder reverb a signal is passed into four parallel comb
filters the outputs of which are summed and then passed through two
allpass filters as shown in the diagram below. Essentially the comb
filters provide the body of the reverb effect and the allpass filters
smear their resultant sound to reduce ringing artefacts the comb filters
might produce. More modern designs might extent the number of filters
used in an attempt to create smoother results. The freeverb opcode
employs eight parallel comb filters followed by four series allpass
filters on each channel. The two main indicators of poor implementations
of the Schoeder reverb are individual echoes being excessively apparent
and ringing artefacts. The results produced by the freeverb opcode are
very smooth but a criticism might be that it is lacking in character and
is more suggestive of a plate reverb than of a real room.

::: {.group_img}
::: {.image}
![schroeder.jpg](static/csound-picts-05_soundmod-schroeder-en.jpg)
:::
:::

\
\
The next example implements the basic Schroeder reverb with four
parallel comb filters followed by three series allpass filters. This
also proves a useful exercise in routing audio signals within Csound.
Perhaps the most crucial element of the Schroeder reverb is the choice
of loop times for the comb and allpass filters -- careful choices here
should obviate the undesirable artefacts mentioned in the previous
paragraph. If loop times are too long individual echoes will become
apparent, if they are too short the characteristic ringing of comb
filters will become apparent. If loop times between filters differ too
much the outputs from the various filters will not fuse. It is also
important that the loop times are prime numbers so that echoes between
different filters do not reinforce each other. It may also be necessary
to adjust loop times when implementing very short reverbs or very long
reverbs. The duration of the reverb is effectively determined by the
reverb times for the comb filters. There is certainly scope for
experimentation with the design of this example and exploration of
settings other than the ones suggested here.\
\
This example consists of five instruments. The fifth instrument
implements the reverb algorithm described above. The first four
instruments act as a kind of generative drum machine to provide source
material for the reverb. Generally sharp percussive sounds provide the
sternest test of a reverb effect. Instrument 1 triggers the various
synthesized drum sounds (bass drum, snare and closed hi-hat) produced by
instruments 2 to 4.

####  

***  EXAMPLE 05E04\_schroeder\_reverb.csd***

####  

    <CsoundSynthesizer>

    <CsOptions>
    -odac -m0
    ; activate real time sound output and suppress note printing
    </CsOptions>

    <CsInstruments>
    ;Example by Iain McCurdy

    sr =  44100
    ksmps = 1
    nchnls = 2
    0dbfs = 1

    giSine       ftgen       0, 0, 2^12, 10, 1 ; a sine wave
    gaRvbSend    init        0                 ; global audio variable initialized
    giRvbSendAmt init        0.4               ; reverb send amount (range 0 - 1)

      instr 1 ; trigger drum hits
    ktrigger    metro       5                  ; rate of drum strikes
    kdrum       random      2, 4.999           ; randomly choose which drum to hit
                schedkwhen  ktrigger, 0, 0, kdrum, 0, 0.1 ; strike a drum
      endin

      instr 2 ; sound 1 - bass drum
    iamp        random      0, 0.5               ; amplitude randomly chosen
    p3          =           0.2                  ; define duration for this sound
    aenv        line        1,p3,0.001           ; amplitude envelope (percussive)
    icps        exprand     30                   ; cycles-per-second offset
    kcps        expon       icps+120,p3,20       ; pitch glissando
    aSig        oscil       aenv*0.5*iamp,kcps,giSine  ; oscillator
                outs        aSig, aSig           ; send audio to outputs
    gaRvbSend   =           gaRvbSend + (aSig * giRvbSendAmt) ; add to send
      endin

      instr 3 ; sound 3 - snare
    iAmp        random      0, 0.5                   ; amplitude randomly chosen
    p3          =           0.3                      ; define duration
    aEnv        expon       1, p3, 0.001             ; amp. envelope (percussive)
    aNse        noise       1, 0                     ; create noise component
    iCps        exprand     20                       ; cps offset
    kCps        expon       250 + iCps, p3, 200+iCps ; create tone component gliss.
    aJit        randomi     0.2, 1.8, 10000          ; jitter on freq.
    aTne        oscil       aEnv, kCps*aJit, giSine  ; create tone component
    aSig        sum         aNse*0.1, aTne           ; mix noise and tone components
    aRes        comb        aSig, 0.02, 0.0035       ; comb creates a 'ring'
    aSig        =           aRes * aEnv * iAmp       ; apply env. and amp. factor
                outs        aSig, aSig               ; send audio to outputs
    gaRvbSend   =           gaRvbSend + (aSig * giRvbSendAmt); add to send
      endin

      instr 4 ; sound 4 - closed hi-hat
    iAmp        random      0, 1.5               ; amplitude randomly chosen
    p3          =           0.1                  ; define duration for this sound
    aEnv        expon       1,p3,0.001           ; amplitude envelope (percussive)
    aSig        noise       aEnv, 0              ; create sound for closed hi-hat
    aSig        buthp       aSig*0.5*iAmp, 12000 ; highpass filter sound
    aSig        buthp       aSig,          12000 ; -and again to sharpen cutoff
                outs        aSig, aSig           ; send audio to outputs
    gaRvbSend   =           gaRvbSend + (aSig * giRvbSendAmt) ; add to send
      endin


      instr 5 ; schroeder reverb - always on
    ; read in variables from the score
    kRvt        =           p4
    kMix        =           p5

    ; print some information about current settings gleaned from the score
                prints      "Type:"
                prints      p6
                prints      "\\nReverb Time:%2.1f\\nDry/Wet Mix:%2.1f\\n\\n",p4,p5

    ; four parallel comb filters
    a1          comb        gaRvbSend, kRvt, 0.0297; comb filter 1
    a2          comb        gaRvbSend, kRvt, 0.0371; comb filter 2
    a3          comb        gaRvbSend, kRvt, 0.0411; comb filter 3
    a4          comb        gaRvbSend, kRvt, 0.0437; comb filter 4
    asum        sum         a1,a2,a3,a4 ; sum (mix) the outputs of all comb filters

    ; two allpass filters in series
    a5          alpass      asum, 0.1, 0.005 ; send mix through first allpass filter
    aOut        alpass      a5, 0.1, 0.02291 ; send 1st allpass through 2nd allpass

    amix        ntrpol      gaRvbSend, aOut, kMix  ; create a dry/wet mix
                outs        amix, amix             ; send audio to outputs
                clear       gaRvbSend              ; clear global audio variable
      endin

    </CsInstruments>

    <CsScore>
    ; room reverb
    i 1  0 10                     ; start drum machine trigger instr
    i 5  0 11 1 0.5 "Room Reverb" ; start reverb

    ; tight ambience
    i 1 11 10                          ; start drum machine trigger instr
    i 5 11 11 0.3 0.9 "Tight Ambience" ; start reverb

    ; long reverb (low in the mix)
    i 1 22 10                                      ; start drum machine
    i 5 22 15 5 0.1 "Long Reverb (Low In the Mix)" ; start reverb

    ; very long reverb (high in the mix)
    i 1 37 10                                            ; start drum machine
    i 5 37 25 8 0.9 "Very Long Reverb (High in the Mix)" ; start reverb
    e
    </CsScore>

    </CsoundSynthesizer>

This chapter has introduced some of the more recent Csound opcodes for
delay-line based reverb algorithms which in most situations can be used
to provide high quality and efficient reverberation. Convolution offers
a whole new approach for the creation of realistic reverbs that imitate
actual spaces - this technique is demonstrated in the
[Convolution](http://en.flossmanuals.net/csound/ch038_h-convolution/)
chapter.
