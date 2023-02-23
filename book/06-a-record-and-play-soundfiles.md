# 06 A. RECORD AND PLAY SOUNDFILES

## Playing Soundfiles from Disk - _diskin_

The simplest way of playing a sound file from Csound is to use the&nbsp;
[diskin](https://csound.com/docs/manual/diskin.html) opcode. This
opcode reads audio directly from the hard drive location where it is
stored, i.e. it does not pre-load the sound file at initialisation time.
This method of sound file playback is therefore good for playing back
very long, or parts of very long, sound files. It is perhaps less well
suited to playing back sound files where dense polyphony, multiple
iterations and rapid random access to the file is required. In these
situations reading from a function table (buffer) is preferable.^[
As this is a matter of speed, it depends both, on the complexity of
the csound file(s) you are running, and the speed of the hard disk.
A Solid State Disk is much faster than a traditional HDD, so a Csound
file with a lot of *diskin* processes may run fine on a SSD which
did not run on a HDD.]

### Sound File Name, Absolute or Relative Path

The first input argument for _diskin_ denotes the file which is to me read.
It is called _ifilcod_ which stems from old Csound times where a sound file should be named "soundin.1"
and could then be read by the opcode [soundin](https://csound.com/docs/manual/soundin.html) as _1_ for _ifilcod_.
For now we usually give a string here as input, so _Sfilcod_ would be a better name for the variable.
The string can be either a _name_ like "loop.wav", or it can contain the full _path_ to the sound file
like "/home/me/Desktop/loop.wav". Usually we will prefer to give a name instead of full
path -- not only because it is shorter, but also because it makes our csd more portable.
Csound will recognize a sound file by its _name_ in these cases:

1. The _csd_ file and the sound file are in the same directory (folder).
   This is the most simple way and gives full flexibility to run the same
   &nbsp;_csd_ from any other computer, just by copying the whole folder.
2. The folder which contains the sound file is known to Csound. This can
   be done with the option _--env:SSDIR+=/path/to/sound/folder_. Csound will
   then add this folder to the _Sound Sample Directory_ (SSDIR) in which it
   will look for sound samples.

A path to look for sound files can not only be given as _absolute_ path but also as _relative_ path.
Let us assume we have this structure for the _csd_ file and the _sound_ file:

    |-home
      |-me
        superloop.csd
        |-Desktop
          loop.wav

The _superloop.csd_ Csound file is not in the same directory as the _loop.wav_ sound file.
But relative to the _csd_ file, the sound is in _Desktop_,
and _Desktop_ is indeed in the same folder as the _superloop.csd_ file.
So we could write this:

    aSound diskin "Desktop/loop.wav"

Or we could use this in the _CsOptions_ tag:

    --env:SSDIR+=Desktop

And then again just give the raw name to _diskin_:

    aSound diskin "loop.wav"

This is another example for a possible file structure:

    |-home
      |-me
        |-samples
          loop.wav
        |-Desktop
          superloop.csd

Now the _loop.wav_ is relative to the _csd_ file not in a subfolder,
but on the higher level folder called _me_, and then in the folder _samples_.
So we have to specify the relative path like this:
"Go up, then look into the folder _samples_." _Going up_ is specified as two dots,
so this would be relative path for _diskin_:

    aSound diskin "../samples/loop.wav"

Again, we could alternatively use _--env:SSDIR+=../samples_ in the _CsOptions_ and then simple refer to "loop.wav".

### Diskins Output Arguments: Single or Array

In the [Csound Manual](https://csound.com/docs/manual/diskin.html) we see two different options for outputs,
left hand side of the _diskin_ opcode:

    ar1 [, ar2 [, ar3 [, ... arN]]] diskin      ...
    ar1[]                           diskin      ...

The first line is the traditional way.
We will output here as many audio signals as the sound file has channels.
Many Csound user will have read this message:

    INIT ERROR in instr 1 line 17: diskin2:
    number of output args inconsistent with number of file channels

This _inconsistency_ of the _number of output arguments_ and the _number of file channels_ happens,
if we use the _stereo_ file "magic.wav" but write:

    aSample diskin "magic.wav"

Or vice versa, we use the _mono_ file "nice.wav" but write:

    aLeft, aRight diskin "nice.wav"

Since Csound6, however, we have the second option mentioned on Csound's manual page for _diskin_:

    ar1[] diskin ...

If the output variable name is followed by square brackets,
&nbsp;_diskin_ will write its output in an audio _array_.^[
Chapter [03 E](03-e-arrays.md) gives more explanations about arrays in Csound.
] The _size_ (_length_) of this array mirrors the number of channels in the audio file:
1 for a mono file, 2 for a stereo file, 4 for a quadro file, etc.

This is a very convenient method to avoid the mismatch error between output arguments and file channels.
In the example below we will use this method.
We write the audio in an array and will only use the first element for the output.
So this will work with any number of channels for the input file.

### Speed, Skiptime and Loop

After the mandatory file name or path string, we can pass some optional input arguments:

- _kpitch_ specifies the speed of reading the sound file. The _default_ is _1_
  &nbsp;here, which means normal speed. _2_ would result in double speed (octave
  higher and half time to read through the sound file), _0.5_ would result
  in half speed (octave lower and twice as much time needed for reading).
  Negative values read backwards. As this is a _k-rate_ parameter, it
  offers a lot of possibilities for modification already.
- _iskiptim_ specifies the point in the sound file where reading starts.
  The default is _0_ (= from the beginning); _2_ would mean to skip the first
  two seconds of the sound file.
- _iwraparound_ answers the question what _diskin_ will do when reading
  reaches the end of the file. The default is here _0_ which means that
  reading stops. If we put _1_ here, diskin will loop the sound file.

#### **_EXAMPLE 06A01_Play_soundfile.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac --env:SSDIR+=../SourceMaterials
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

;file should be found in the 'SourceMaterials' folder
gS_file = "fox.wav"

instr Defaults
 kSpeed = p4   ; playback speed
 iSkip = p5    ; inskip into file (in seconds)
 iLoop = p6    ; looping switch (0=off 1=on)
 aRead[] diskin gS_file, kSpeed, iSkip, iLoop
 out aRead[0], aRead[0] ;output first channel twice
endin

instr Scratch
 kSpeed randomi -1, 1.5, 5, 3
 aRead[] diskin gS_file, kSpeed, 1, 1
 out aRead[0], aRead[0]
endin
</CsInstruments>
<CsScore>
;      dur speed skip loop
i 1 0  4   1     0    0    ;default values
i . 4  3   1     1.7  0    ;skiptime
i . 7  6   0.5   0    0    ;speed
i . 13 6   1     0    1    ;loop
i 2 20 20
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy and joachim heintz
```

## Writing Audio to Disk

The traditional method of rendering Csound's audio to disk is to
specify a sound file as the audio destination in the Csound command or
under \<CsOptions\>. In fact before real-time performance became a
possibility this was the only way in which Csound was used. With this
method, all audio that is piped to the output using _out_ and
will be written to this file. The number of channels that the file will
contain will be determined by the number of channels specified in the
orchestra header using _nchnls_. The disadvantage of this method is
that we cannot simultaneously listen to the audio in real-time.

#### **_EXAMPLE 06A02_Write_soundfile.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
; audio output destination is given as a sound file (wav format specified)
; this method is for deferred time performance,
; simultaneous real-time audio will not be possible
-oWriteToDisk1.wav -W
</CsOptions>
<CsInstruments>
sr     =  44100
ksmps  =  32
nchnls =  1
0dbfs  =  1

  instr 1 ; a simple tone generator
aEnv    expon    0.2, p3, 0.001           ; a percussive envelope
aSig    poscil   aEnv, cpsmidinn(p4)      ; audio oscillator
        out      aSig                     ; send audio to output
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
</CsScore>
</CsoundSynthesizer>
; example written by Iain McCurdy
```

## Both Audio to Disk and RTAudio Output - _fout_ with _monitor_

Recording audio output to disk whilst simultaneously monitoring in
real-time is best achieved through combining the opcodes&nbsp;
[monitor](https://csound.com/docs/manual/monitor.html) and&nbsp;
[fout](https://csound.com/docs/manual/fout.html). _monitor_ can be
used to create an audio signal that consists of a mix of all audio
output from all instruments. This audio signal can then be rendered to a
sound file on disk using _fout_. _monitor_ can read multi-channel
outputs but its number of outputs should correspond to the number of
channels defined in the header using _nchnls_. In this example it is
read just in mono. _fout_ can write audio in a number of formats and
bit depths and it can also write multi-channel sound files.

#### **_EXAMPLE 06A03_Write_RT.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activate real-time audio output
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       32
nchnls  =       1
0dbfs   =       1

gaSig   init   0; set initial value for global audio variable (silence)

  instr 1 ; a simple tone generator
aEnv    expon    0.2, p3, 0.001              ; percussive amplitude envelope
aSig    poscil   aEnv, cpsmidinn(p4)         ; audio oscillator
        out      aSig
  endin

  instr 2 ; write to a file (always on in order to record everything)
aSig    monitor                              ; read audio from output bus
        fout "WriteToDisk2.wav",4,aSig   ; write audio to file (16bit mono)
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
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
```
