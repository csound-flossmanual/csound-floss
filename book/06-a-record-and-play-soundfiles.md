06 A. RECORD AND PLAY SOUNDFILES
================================

Playing Soundfiles From Disk - diskin2^1^ 
------------------------------------------

The simplest way of playing a sound file from Csound is to use the
[diskin2](https://csound.com/docs/manual/diskin2.html) opcode. This
opcode reads audio directly from the hard drive location where it is
stored, i.e. it does not pre-load the sound file at initialisation time.
This method of sound file playback is therefore good for playing back
very long, or parts of very long, sound files. It is perhaps less well
suited to playing back sound files where dense polyphony, multiple
iterations and rapid random access to the file is required. In these
situations reading from a function table or buffer is preferable.

[diskin2](https://csound.com/docs/manual/diskin2.html) has
additional parameters for speed of playback, and interpolation.

   ***EXAMPLE 06A01\_Play\_soundfile.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -odac ; activate real-time audio output
    </CsOptions>
    <CsInstruments>
    ; example written by Iain McCurdy

    sr      =       44100
    ksmps   =       32
    nchnls  =       1

      instr 1 ; play audio from disk
    kSpeed  init     1           ; playback speed
    iSkip   init     0           ; inskip into file (in seconds)
    iLoop   init     0           ; looping switch (0=off 1=on)
    ; read audio from disk using diskin2 opcode
    a1      diskin2  "loop.wav", kSpeed, iSkip, iLoop
            out      a1          ; send audio to outputs
      endin
    </CsInstruments>

    <CsScore>
    i 1 0 6
    e
    </CsScore>
    </CsoundSynthesizer>

 

Writing Audio to Disk
---------------------

The traditional method of rendering Csound\'s audio to disk is to
specify a sound file as the audio destination in the Csound command or
under \<CsOptions\>. In fact before real-time performance became a
possibility this was the only way in which Csound was used. With this
method, all audio that is piped to the output using *out, outs* etc.
will be written to this file. The number of channels that the file will
contain will be determined by the number of channels specified in the
orchestra header using \'nchnls\'. The disadvantage of this method is
that we cannot simultaneously listen to the audio in real-time.

   ***EXAMPLE 06A02\_Write\_soundfile.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    ; audio output destination is given as a sound file (wav format specified)
    ; this method is for deferred time performance,
    ; simultaneous real-time audio will not be possible
    -oWriteToDisk1.wav -W
    </CsOptions>

    <CsInstruments>
    ; example written by Iain McCurdy

    sr     =  44100
    ksmps  =  32
    nchnls =  1     
    0dbfs  =  1

    giSine  ftgen  0, 0, 4096, 10, 1             ; a sine wave

      instr 1 ; a simple tone generator
    aEnv    expon    0.2, p3, 0.001              ; a percussive envelope
    aSig    poscil   aEnv, cpsmidinn(p4), giSine ; audio oscillator
            out      aSig                        ; send audio to output
      endin
    </CsInstruments>

    <CsScore>
    ; two chords
    i 1   0 5 60
    i 1 0.1 5 65
    i 1 0.2 5 67
    i 1 0.3 5 71

    i 1   3 5 65
    i 1 3.1 5 67
    i 1 3.2 5 73
    i 1 3.3 5 78
    e
    </CsScore>
    </CsoundSynthesizer>

 

Writing Audio to Disk with Simultaneous Real-time Audio Output - fout and monitor
---------------------------------------------------------------------------------

Recording audio output to disk whilst simultaneously monitoring in
real-time is best achieved through combining the opcodes
[monitor](https://csound.com/docs/manual/monitor.html) and
[fout](https://csound.com/docs/manual/fout.html). \'monitor\' can be
used to create an audio signal that consists of a mix of all audio
output from all instruments. This audio signal can then be rendered to a
sound file on disk using \'fout\'. \'monitor\' can read multi-channel
outputs but its number of outputs should correspond to the number of
channels defined in the header using \'nchnls\'. In this example it is
read just in mono. \'fout\' can write audio in a number of formats and
bit depths and it can also write multi-channel sound files. 

   ***EXAMPLE 06A03\_Write\_RT.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -odac ; activate real-time audio output
    </CsOptions>

    <CsInstruments>
    ;example written by Iain McCurdy

    sr      =       44100
    ksmps   =       32
    nchnls  =       1       
    0dbfs   =       1

    giSine  ftgen  0, 0, 4096, 10, 1 ; a sine wave
    gaSig   init   0; set initial value for global audio variable (silence)

      instr 1 ; a simple tone generator
    aEnv    expon    0.2, p3, 0.001              ; percussive amplitude envelope
    aSig    poscil   aEnv, cpsmidinn(p4), giSine ; audio oscillator
            out      aSig
      endin

      instr 2 ; write to a file (always on in order to record everything)
    aSig    monitor                              ; read audio from output bus
            fout     "WriteToDisk2.wav",4,aSig   ; write audio to file (16bit mono)
      endin

    </CsInstruments>
    <CsScore>
    ; activate recording instrument to encapsulate the entire performance
    i 2 0 8.3

    ; two chords
    i 1   0 5 60
    i 1 0.1 5 65
    i 1 0.2 5 67
    i 1 0.3 5 71

    i 1   3 5 65
    i 1 3.1 5 67
    i 1 3.2 5 73
    i 1 3.3 5 78
    e
    </CsScore>
    </CsoundSynthesizer

 

1.  [diskin2 is an improved version of diskin. In Csound 6, both will
    use the same code, so it should make no difference whether you use
    diskin or diskin2.]{#endnote-b1e0d781-9120-4d7a-bd17-0762cdd78cad}
