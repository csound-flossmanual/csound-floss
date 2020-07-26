02 D. LIVE AUDIO
================

Similar to the MIDI configuration, the standard Csound frontends
[CsoundQt](http://csoundqt.github.io), [Cabbage](http://cabbageaudio.com/) and
[Blue](http://blue.kunstmusik.com/) all provide their own way how to configure audio.
The following description is useful to understand what happens behind
the curtains, and must be regarded if you use Csound via Command Line.

Select the Audio Device
-----------------------

Csound relates to the various inputs and outputs of sound devices
installed on your computer as a numbered list. If you wish to send or
receive audio to or from a specific audio connection you will need to
know the number by which Csound knows it. If you are not sure of what
that is you can trick Csound into providing you with a list of available
devices by trying to run Csound using an obviously out of range device
number, like this:

   ***EXAMPLE 02D01\_GetDeviceList.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-iadc999 -odac999
</CsOptions>
<CsInstruments>
;Example by Andrés Cabrera
instr 1
endin
</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
~~~

The input (-i) and output (-o) devices will be listed seperately.^[
You may have to run -iadc999 and -odac999 seperately.] Specify 
your input device with the *-iadc* flag and the number of your
input device, and your output device with the *-odac* flag and the
number of your output device. For instance, if you select one of the
devices from the list above both, for input and output, you may include
something like

    -iadc2 -odac3

in the \<CsOptions\> section of your .csd file.

If you do not specify any device number, the default device of your
system configuration will be used by Csound. So usually it is sufficient
to write:

    -iadc -odac

If you have no real-time (microphone) input, you only need to declare
*-odac*. Without this option, Csound will not produce real-time audio
output, but write to an audio file as output instead.


Select the Audio Driver
-----------------------

The RT (= real-time) output module can be set with the *-+rtaudio*
flag. If you don't use this flag, the PortAudio driver will be used.
Other possible drivers are jack and alsa (Linux), mme (Windows) or
CoreAudio (Mac). So, this sets your audio driver to mme instead of Port
Audio:

    -+rtaudio=mme


Tuning Performance and Latency
------------------------------

Live performance and latency depend mainly on the sizes of the software
and the hardware buffers. They can be set in the \<CsOptions\> using the
-B flag for the hardware buffer, and the -b flag for the software
buffer.^[As Victor Lazzarini explains (mail to Joachim Heintz, 19 march
2013), the role of -b and -B varies between the Audio Modules: \"1.
For portaudio, -B is only used to suggest a latency to the backend,
whereas -b is used to set the actual buffersize. 2. For coreaudio,
-B is used as the size of the internal circular buffer, and -b is
used for the actual IO buffer size. 3. For jack, -B is used to
determine the number of buffers used in conjunction with -b , num =
(N + M + 1) / M. -b is the size of each buffer. 4. For alsa, -B is
the size of the buffer size, -b is the period size (a buffer is
divided into periods). 5. For pulse, -b is the actual buffersize
passed to the device, -B is not used. In other words, -B is not too
significant in 1), not used in 5), but has a part to play in 2), 3)
and 4), which is functionally similar.\"]  For instance, 
this statement sets the hardware buffer size
to 512 samples and the software buffer size to 128 sample:

    -B512 -b128

The other factor which affects Csound's live performance is the
[ksmps](http://csound.github.io/docs/manual/html/ksmps.html)
value which is set in the header of the \<CsInstruments\> section. By
this value, you define how many samples are processed every Csound
control cycle.

Try your realtime performance with -B512, -b128 and ksmps=32.^[
It is always preferable to use power-of-two values for ksmps (which
is the same as \"block size\" in PureData or \"vector size\" in
Max). Just with ksmps = 1, 2, 4, 8, 16 \... you will take advantage
of the \"full duplex\" audio, which provides best real time audio.
Make sure your ksmps divides your buffer size with no remainder. So,
for -b 128, you can use ksmps = 128, 64, 32, 16, 8, 4, 2
or 1.]  With a software buffer of 128 samples, a hardware buffer of
512 and a sample rate of 44100 you will have around 12ms latency,
which is usable for live keyboard playing.
If you have problems with either the latency or the performance,
tweak the values as described
[here](http://csound.github.io/docs/manual/html/UsingOptimizing.html).


The \"\--realtime\" Option
--------------------------

When you have instruments that have substantial sections that could
block out execution, for instance with code that loads buffers from
files or creates big tables, you can try the option *\--realtime*.

This option will give your audio processing the priority over other
tasks to be done. It places all initialisation code on a separate
thread, and does not block the audio thread. Instruments start
performing only after all the initialisation is done. That can have a
side-effect on scheduling if your audio input and output buffers are not
small enough, because the audio processing thread may "run ahead" of the
initialisation one, taking advantage of any slack in the buffering.

Given that this option is intrinsically linked to low-latency, realtime
audio performance, and also to reduce the effect on scheduling these
other tasks, it is recommended that small ksmps and buffer sizes, for
example ksmps=16, 32, or 64, -b32 or 64, and -B256 or 512.


Csound Can Produce Extreme Dynamic Range!
-----------------------------------------

Csound can **produce extreme dynamic range**, so keep an eye on the
level you are sending to your output. The number which describes the
level of 0 dB, can be set in Csound by the
[0dbfs](http://csound.github.io/docs/manual/html/Zerodbfs.html)
assignment in the \<CsInstruments\> header. There is no limitation, if
you set 0dbfs = 1 and send a value of 32000, **this can damage your
ears and speakers!**


Using Live Audio Input and Output
---------------------------------

To process audio from an external source (for example a microphone), use
the [inch](http://csound.github.io/docs/manual/html/inch.html)
opcode to access any of the inputs of your audio input device. For the
output,
[outch](http://csound.github.io/docs/manual/html/outch.html)
gives you all necessary flexibility. The following example takes a live
audio input and transforms its sound using ring modulation. The Csound
Console should output five times per second the input amplitude level.

   ***EXAMPLE 02D02\_LiveInput.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
;CHANGE YOUR INPUT AND OUTPUT DEVICE NUMBER HERE IF NECESSARY!
-iadc -odac -B512 -b128
</CsOptions>
<CsInstruments>
sr = 44100 ;set sample rate to 44100 Hz
ksmps = 32 ;number of samples per control cycle
nchnls = 2 ;use two audio channels
0dbfs = 1 ;set maximum level as 1

instr 1
aIn       inch      1   ;take input from channel 1
kInLev    downsamp  aIn ;convert audio input to control signal
          printk    .2, abs(kInLev)
;make modulator frequency oscillate 200 to 1000 Hz
kModFreq  poscil    400, 1/2
kModFreq  =         kModFreq+600
aMod      poscil    1, kModFreq ;modulator signal
aRM       =         aIn * aMod ;ring modulation
          outch     1, aRM, 2, aRM ;output to channel 1 and 2
endin
</CsInstruments>
<CsScore>
i 1 0 3600
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Live Audio is frequently used with live devices like widgets or MIDI.
You will find various examples in the example collections of your
preferred frontend.
