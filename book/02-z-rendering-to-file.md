# 02 E. RENDERING TO FILE

## When to Render to File

Csound can also render audio straight to a sound file stored on your
hard drive instead of as live audio sent to the audio hardware. This
gives you the possibility to hear the results of very complex processes
which your computer can't produce in realtime. Or you want to render
something in Csound to import it in an audio editor, or as the final
result of a "tape" piece.^[or bit-depth, see the section about
Bit-depth Resolution in chapter 01A (Digital Audio)]

Csound can render to formats like wav, aiff or ogg (and other less
popular ones), but not mp3 due to its patent and licencing problems.

## Rendering to File

Save the following code as Render.csd:

**_EXAMPLE 02E01_Render.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-o Render.wav
</CsOptions>
<CsInstruments>
instr 1
aSin      poscil    0dbfs/4, 440
          out       aSin
endin
</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;Example by Alex Hofmann
```

Open the Terminal / Prompt / Console and type:

    csound /path/to/Render.csd

Now, because you changed the _-o_ flag in the \<CsOptions\> from \"-o
dac\" to \"-o _filename_\", the audio output is no longer written in
realtime to your audio device, but instead to a file. The file will be
rendered to the default directory (usually the user home directory).
This file can be opened and played in any audio player or editor, e.g.
Audacity.

The _-o_ flag can also be used to write the output file to a certain
directory. Something like this for Windows \...

    <CsOptions>
    -o c:/music/samples/Render.wav
    </CsOptions>

\... and this for Linux or Mac OSX:

    <CsOptions>
    -o /Users/JSB/organ/tatata.wav
    </CsOptions>

### Rendering Options

The internal rendering of audio data in Csound is done with 64-bit
floating point numbers. Depending on your needs, you should decide the
precision of your rendered output file:

- If you want to render 32-bit floats, use the option flag **-f**.
- If you want to render 24-bit, use the flag **-3** (= 3 bytes).
- If you want to render 16-bit, use the flag **-s** (or nothing,
  because this is also the default in Csound).

For making sure that the header of your soundfile will be written
correctly, you should use the **-W** flag for a WAV file, or
the **-A** flag for a AIFF file. So these options will render the
file \"Wow.wav\" as WAV file with 24-bit accuracy:

    <CsOptions>
    -o Wow.wav -W -3
    </CsOptions>

### Realtime and Render-To-File at the Same Time

Sometimes you may want to simultaneously have realtime output and file
rendering to disk, like recording your live performance. This can be
achieved by using the [fout](http://www.csounds.com/manual/html/fout.html)
&nbsp;opcode. You just have to specify your output file name. File type and
format are given by a number, for instance 18 specifies \"wav 24 bit\"
(see the manual page for more information). The following example
creates a random frequency and panning movement of a sine wave, and
writes it to the file \"live_record.wav\" (in the same directory as
your .csd file):

**_EXAMPLE 02E02_RecordRT.csd_**

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

          seed      0 ;each time different seed for random

  instr 1
kFreq     randomi   400, 800, 1 ;random sliding frequency
aSig      poscil    .2, kFreq ;sine with this frequency
kPan      randomi   0, 1, 1 ;random panning
aL, aR    pan2      aSig, kPan ;stereo output signal
          outs      aL, aR ;live output
          fout      "live_record.wav", 18, aL, aR ;write to soundfile
  endin

</CsInstruments>
<CsScore>
i 1 0 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```
