06 B. RECORD AND PLAY BUFFERS
=============================

Playing Audio from RAM - *flooper2*
-----------------------------------

Csound offers many opcodes for playing back sound files that have first
been loaded into a function table (and therefore are loaded into RAM).
Some of these offer higher quality at the expense of computation speed;
some are simpler and less fully featured.

One of the newer and easier to use opcodes for this task is
[flooper2](https://csound.com/docs/manual/flooper2.html). As its
name might suggest it is intended for the playback of files with
looping. *flooper2* can also apply a cross-fade between the end and
the beginning of the loop in order to smooth the transition where
looping takes place.

In the following example a sound file that has been loaded into a
[GEN01](https://csound.com/docs/manual/GEN01.html)
function table is played back using *flooper2*. The opcode also
includes a parameter for modulating playback speed/pitch. There is
also the option of modulating the loop points at k-rate. In this example
the entire file is simply played and looped. As always, you can replace the sound file with one of your own. Note that *GEN01* accepts mono or stereo files; the number of output arguments for *flooper2* must correspond with the mono or stereo table.


   ***EXAMPLE 06B01_flooper2.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac ; activate real-time audio
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       32
nchnls  =       2
0dbfs   =       1

; STORE AUDIO IN RAM USING GEN01 FUNCTION TABLE
giSoundFile   ftgen   0, 0, 0, 1, "loop.wav", 0, 0, 0

  instr 1 ; play audio from function table using flooper2 opcode
kAmp         =         1   ; amplitude
kPitch       =         p4  ; pitch/speed
kLoopStart   =         0   ; point where looping begins (in seconds)
kLoopEnd     =         nsamp(giSoundFile)/sr; loop end (end of file)
kCrossFade   =         0   ; cross-fade time
; read audio from the function table using the flooper2 opcode
aSig         flooper2  kAmp,kPitch,kLoopStart,kLoopEnd,kCrossFade,giSoundFile
             out       aSig, aSig ; send audio to output
  endin

</CsInstruments>
<CsScore>
; p4 = pitch
; (sound file duration is 4.224)
i 1 0 [4.224*2] 1
i 1 + [4.224*2] 0.5
i 1 + [4.224*1] 2
e
</CsScore>
</CsoundSynthesizer>
; example written by Iain McCurdy
~~~


Csound's Built-in Record-Play Buffer - *sndloop*
------------------------------------------------

Csound has an opcode called
[sndloop](https://csound.com/docs/manual/sndloop.html) which
provides a simple method of recording some audio into a buffer and then
playing it back immediately. The duration of audio storage required is
defined when the opcode is initialized. In the following example two
seconds is provided. Once activated, as soon as two seconds of live
audio has been recorded by *sndloop*, it immediately begins playing it
back in a loop. *sndloop* allows us to modulate the speed/pitch of the
played back audio as well as providing the option of defining a
crossfade time between the end and the beginning of the loop. In the
example pressing "r" on the computer keyboard activates record
followed by looped playback, pressing "s" stops record or playback,
pressing "+" increases the speed and therefore the pitch of playback
and pressing "-" decreases the speed/pitch of playback. If playback
speed is reduced below zero it enters the negative domain, in which case
playback will be reversed.

You will need to have a microphone connected to your computer in order
to use this example.


   ***EXAMPLE 06B02_sndloop.csd***

~~~csound
<CsoundSynthesize>
<CsOptions>
; real-time audio in and out are both activated
-iadc -odac
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       32
nchnls  =       2
0dbfs   =       1

  instr 1
; PRINT INSTRUCTIONS
           prints  "Press 'r' to record, 's' to stop playback, "
           prints  "'+' to increase pitch, '-' to decrease pitch.\\n"
; SENSE KEYBOARD ACTIVITY
kKey sensekey; sense activity on the computer keyboard
aIn        inch    1             ; read audio from first input channel
kPitch     init    1             ; initialize pitch parameter
iDur       init    2             ; inititialize duration of loop parameter
iFade      init    0.05          ; initialize crossfade time parameter
 if kKey = 114 then              ; if 'r' has been pressed...
kTrig      =       1             ; set trigger to begin record-playback
 elseif kKey = 115 then          ; if 's' has been pressed...
kTrig      =       0             ; set trigger to turn off record-playback
 elseif kKey = 43 then           ; if '+' has been pressed...
kPitch     =       kPitch + 0.02 ; increment pitch parameter
 elseif kKey = 45 then           ; if '-' has been pressed
kPitch     =       kPitch - 0.02 ; decrement pitch parameter
 endif                           ; end of conditional branches
; CREATE SNDLOOP INSTANCE
aOut, kRec sndloop aIn, kPitch, kTrig, iDur, iFade ; (kRec output is not used)
           out     aOut, aOut    ; send audio to output
  endin

</CsInstruments>
<CsScore>
i 1 0 3600 ; instr 1 plays for 1 hour
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
~~~


Recording to and Playback from a Function Table
-----------------------------------------------

Writing to and reading from buffers can also be achieved through the use
of Csound's opcodes for table reading and writing operations. Although
the procedure is a little more complicated than that required for
*sndloop* it is ultimately more flexible. In the next example separate
instruments are used for recording to the table and for playing back
from the table. Another instrument which runs constantly scans for
activity on the computer keyboard and activates the record or playback
instruments accordingly. For writing to the table we will use the
[tablew](https://csound.com/docs/manual/tablew.html) opcode and for
reading from the table we will use the
[table](https://csound.com/docs/manual/table.html) opcode (if we
were to modulate the playback speed it would be better to use one of
Csound's interpolating variations of *table* such as
[tablei](https://csound.com/docs/manual/tablei.html) or
[table3](https://csound.com/docs/manual/table3.html). Csound writes
individual values to table locations, the exact table locations being
defined by an *index*. For writing continuous audio to a table this
index will need to be continuously moving to the next location for every sample. This moving index (or *pointer*) can be created with an a-rate
[line](https://csound.com/docs/manual/line.html) or a
[phasor](https://csound.com/docs/manual/phasor.html). The next
example uses *line*. When using Csound's table operation opcodes we
first need to create that table, either in the orchestra header or in
the score. The duration of the audio buffer in seconds is multiplied by the sample rate to calculate the proper table size.


   ***EXAMPLE 06B03_RecPlayToTable.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
; real-time audio in and out are both activated
-iadc -odac -m128
</CsOptions>
<CsInstruments>
sr      =       44100
ksmps   =       32
nchnls  =       2
0dbfs   =       1

giTabLenSec = 3 ;table duration in seconds
giBuffer ftgen  0, 0, giTabLenSec*sr, 2, 0; table for audio data storage
maxalloc 2,1 ; allow only one instance of the recording instrument at a time!

  instr 1 ; Sense keyboard activity. Trigger record or playback accordingly.
           prints  "Press 'r' to record, 'p' for playback.\n"
kKey sensekey                    ; sense activity on the computer keyboard
  if kKey==114 then               ; if ASCCI value of 114 ('r') is output
event   "i", 2, 0, giTabLenSec   ; activate recording instrument (2)
  endif
 if kKey==112 then                ; if ASCCI value of 112 ('p) is output
event   "i", 3, 0, giTabLenSec  ; activate playback instrument
 endif
  endin

  instr 2 ; record to buffer
; -- print progress information to terminal --
           prints   "recording"
           printks  ".", 0.25    ; print '.' every quarter of a second
krelease   release               ; sense when note is in final k-rate pass...
 if krelease==1 then              ; then ..
           printks  "\ndone\n", 0 ; ... print a message
 endif
; -- write audio to table --
ain        inch     1            ; read audio from live input channel 1
andx       line     0,p3,ftlen(giBuffer); create an index for writing to table
           tablew   ain,andx,giBuffer ; write audio to function table
endin

  instr 3 ; playback from buffer
; -- print progress information to terminal --
           prints   "playback"
           printks  ".", 0.25    ; print '.' every quarter of a second
krelease   release               ; sense when note is in final k-rate pass
 if krelease=1 then              ; then ...
           printks  "\ndone\n", 0 ; ... print a message
 endif; end of conditional branch
; -- read audio from table --
aNdx line 0, p3, ftlen(giBuffer)  ;create an index for reading from table
aRead      table    aNdx, giBuffer  ; read audio to audio storage table
           out      aRead, aRead    ; send audio to output
  endin

</CsInstruments>
<CsScore>
i 1 0 3600 ; Sense keyboard activity. Start recording - playback.
</CsScore>
</CsoundSynthesizer>
;example written by Iain McCurdy
~~~


Encapsulating Record and Play Buffer Functionality to a UDO
-----------------------------------------------------------

Recording and playing back of buffers can also be encapsulated into a
User Defined Opcode (UDO).^[See Chapter [03 G](03-g-user-defined-opcodes.md) for more information
about writing UDOs in Csound.] We will show here a version which in a way *re-invents the wheel*
as it creates an own sample-by-sample increment for reading and writing the buffer rather than
using a pointer. This is mostly meant as example how open this field is for different user
implementations, and how easy it is to create own applications based on the fundamental
functionalities of table reading and writing.


One way to write compact Csound code is to follow the principle *one job per line* (of code).
For defining *one job* of a good size, we will mostly need a UDO which combines some low-level
tasks and also allows us to apply a memorizable name for this job.
So often the principle *one job per line* results in *one UDO per line*.

The *jobs* in the previous example can be described as follows:

1. Create a buffer of a certain length.
2. Watch keyboard input.
3. Record input channel 1 to table if 'r' key is pressed.
4. Play back table if 'p' key is pressed and output.

Let us go step by step through this list, before we finally write this instrument in four
lines of code. Step **1** we already did in the previous example; we only wrap the GEN routine
in a UDO which gets the time as input and returns the buffer variable as output. Anything else is hidden.

    opcode createBuffer, i, i
     ilen xin
     ift ftgen 0, 0, ilen*sr, 2, 0
     xout ift
    endop

Step **2** is the only one which is a normal Csound code line, consisting of the
[sensekey](https://csound.com/docs/manual/sensekey.html) opcode. Due to the implementation of *sensekey*,
there should only be one *sensekey* in a Csound orchestra.

    kKey, kDown sensekey

Step **3** consists of two parts. We will write one UDO for both. The first UDO writes to a buffer if it
gets a signal to do so. We choose here a very low-level way of writing an audio signal to a buffer. Instead
of creating an index, we just increment the single index numbers. To continue the process at the end of
the buffer, we apply the *modulo* operation to the incremented numbers.^[The symbol for the
[modulo operation](https://en.wikipedia.org/wiki/Modulo_operation)
is *%*. The result is the *remainder* in a division: *1 % 3 = 1*,
*4 % 3 = 1*, *7 % 3 = 1* etc.]

~~~csound
opcode recordBuffer, 0, aik
 ain, ift, krec  xin
 setksmps  1 ;k=a here in this UDO
 kndx init 0 ;initialize index
 if krec == 1 then
  tablew ain, a(kndx), ift
  kndx = (kndx+1) % ftlen(ift)
 endif
endop
~~~

The second UDO ouputs *1* as long as a key is pressed. Its input consists of the ASCII key which is selected, and of the output of the *sensekey* opcode.

~~~csound
opcode keyPressed, k, kki
 kKey, kDown, iAscii xin
 kPrev init 0 ;previous key value
 kOut = (kKey == iAscii || (kKey == -1 && kPrev == iAscii) ? 1 : 0)
 kPrev = (kKey > 0 ? kKey : kPrev)
 kPrev = (kPrev == kKey && kDown == 0 ? 0 : kPrev)
 xout kOut
endop
~~~

The reading procedure in step **4** is in fact the same as was used for writing. We only have to replace the opcode for writing *tablew* with the opcode for reading *table*.

~~~csound
opcode playBuffer, a, ik
 ift, kplay  xin
 setksmps  1 ;k=a here in this UDO
 kndx init 0 ;initialize index
 if kplay == 1 then
  aRead table a(kndx), ift
  kndx = (kndx+1) % ftlen(ift)
 endif
 xout aRead
endop
~~~

Note that you must disable the key repeats on your computer keyboard for the following example (in CsoundQt, disable "Allow key repeats" in *Configuration -\> General*). Press the *r* key as long as you want to record, and the *p* key for playing back. Both, record and playback, is done circular.


   ***EXAMPLE 06B04_BufRecPlay_UDO.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-i adc -o dac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

/****** UDO definitions ******/
opcode createBuffer, i, i
 ilen xin
 ift ftgen 0, 0, ilen*sr, 2, 0
 xout ift
endop
opcode recordBuffer, 0, aik
 ain, ift, krec  xin
 setksmps  1 ;k=a here in this UDO
 kndx init 0 ;initialize index
 if krec == 1 then
  tablew ain, a(kndx), ift
  kndx = (kndx+1) % ftlen(ift)
 endif
endop
opcode keyPressed, k, kki
 kKey, kDown, iAscii xin
 kPrev init 0 ;previous key value
 kOut = (kKey == iAscii || (kKey == -1 && kPrev == iAscii) ? 1 : 0)
 kPrev = (kKey > 0 ? kKey : kPrev)
 kPrev = (kPrev == kKey && kDown == 0 ? 0 : kPrev)
 xout kOut
endop
opcode playBuffer, a, ik
 ift, kplay  xin
 setksmps  1 ;k=a here in this UDO
 kndx init 0 ;initialize index
 if kplay == 1 then
  aRead table a(kndx), ift
  kndx = (kndx+1) % ftlen(ift)
 endif
endop


instr RecPlay
 iBuffer = createBuffer(3) ;buffer for 3 seconds of recording
 kKey, kDown sensekey
 recordBuffer(inch(1), iBuffer, keyPressed(kKey,kDown,114))
 out playBuffer(iBuffer, keyPressed(kKey,kDown,112))
endin

</CsInstruments>
<CsScore>
i 1 0 1000
</CsScore>
</CsoundSynthesizer>
;example written by joachim heintz
~~~

We use mostly the functional style of writing Csound code here. Instead of

    iBuffer = createBuffer(3)

we could also write:

    iBuffer createBuffer 3

To plug the audio signal from channel 1 directly into the *recordBuffer* UDO,
we plug the *inch(1)* directly into the first input. Similar the output of the
*keyPressed* UDO as third input. For more information about functional style coding,
see chapter [03 I](03-i-functional-syntax.md).



Further Opcodes for Investigation
---------------------------------

Csound contains a wide range of opcodes that offer a variety of
*ready-made* methods of playing back audio held in a function table.
The oldest group of these opcodes are
[loscil](https://csound.com/docs/manual/loscil.html) and
[loscil3](https://csound.com/docs/manual/loscil3.html). Despite
their age they offer some unique features such as the ability implement
both sustain and release stage looping (in a variety of looping modes),
their ability to read from stereo as well as mono function tables and
their ability to read looping and base frequency data from the sound
file stored in the function table. loscil and loscil3 were originally
intended as the kernel mechanism for building a sampler.

For reading multichannel files of more than two channels, the more
recent [loscilx](https://csound.com/docs/manual/loscilx.html) exists
as an excellent option. It can also be used for mono or stereo,
and it can — similar to diskin — write its output in an audio array.

loscil and loscil3 will only allow looping points to be defined at
i-time. [lposcil](https://csound.com/docs/manual/lposcil.html),
[lposcil3](https://csound.com/docs/manual/lposcil3.html),
[lposcila](https://csound.com/docs/manual/lposcila.html),
[lposcilsa](https://csound.com/docs/manual/lposcilsa.html) and
[lposcilsa2](https://csound.com/docs/manual/lposcilsa2.html) will
allow looping points to be changed a k-rate, while the note is playing.

It is worth not forgetting Csound's more exotic methods of playback of
sample stored in function tables.
[mincer](https://csound.com/docs/manual/mincer.html) and
[temposcal](https://csound.com/docs/manual/temposcal.html) use
streaming vocoder techniques to faciliate independent pitch and
time-stretch control during playback (this area is covered more fully in
chapter [05 I](05-i-fourier-analysis-spectral-processing.md).
[sndwarp](https://csound.com/docs/manual/sndwarp.html) and
[sndwarpst](https://csound.com/docs/manual/sndwarpst.html)
similiarly faciliate independent pitch and playback speed control but
through the technique of granular synthesis this area is covered in
detail in chapter [05 G](05-g-granular-synthesis.md).
