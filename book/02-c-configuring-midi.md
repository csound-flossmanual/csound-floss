02 C. CONFIGURING MIDI
======================

Csound can receive MIDI events (like MIDI notes and MIDI control
changes) from an external MIDI interface or from another program via a
virtual MIDI cable. This information can be used to control any aspect
of synthesis or performance.

Most frontends are using their own MIDI handler. See the chapters about
[CsoundQt](10-a-csoundqt.md), [Cabbage](10-b-cabbage.md) and
[Blue](10-c-blue.md) in this manual, or have a look at the built-in
documentation of these environments. The following description is only
relevant when you use Csound's own MIDI handlers, for instance when
running Csound via Command Line.

Csound receives MIDI data through MIDI Realtime Modules. These are
special Csound plugins which enable MIDI input using different methods
according to a specific platform. They are enabled using the *-+rtmidi*
[command line flag](http://csound.github.io/docs/manual/html/CommandFlagsCategory.html)
in the *\<CsOptions\>* section of your .csd file.

There is the universal *portmidi* module.
[PortMidi](http://portmedia.sourceforge.net) is a cross-platform
module for MIDI I/O and should be available on all platforms. To enable
the portmidi module, use the flag (option):

    -+rtmidi=portmidi

After selecting the RT MIDI module from a front-end or the command line,
you need to select the MIDI devices for input and output. These are set
using the flags -M and -Q respectively followed by the number of the
interface. You can usually use:

    -M999

To get a performance error with a listing of available interfaces.

For the PortMidi module (and others like ALSA), you can specify no
number to use the default MIDI interface or the *a* character to use
**all** devices (which is actually the most common case). This will even
work when no MIDI devices are present.

    -Ma

So if you want MIDI input using the portmidi module, using device 2 for
input and device 1 for output, your *\<CsOptions\>* section should
contain:

    -+rtmidi=portmidi -M2 -Q1

There is a special *virtual* RT MIDI module which enables MIDI input
from a [virtual keyboard](http://csound.github.io/docs/manual/html/MidiTop.html#MidiVirtual).
To enable it, you can use:

     -+rtmidi=virtual -M0


Platform Specific Modules
-------------------------

If the *portmidi* module is not working properly for some reason, you
can try other platform specific modules.

### Linux

On Linux systems, you might also have an *alsa* module to use the alsa
raw MIDI interface. This is different from the more common alsa
sequencer interface and will typically require the snd-virmidi module to
be loaded.

### OS X

On OS X you may have a *coremidi* module available.

### Windows

On Windows, you may have a *winmme* MIDI module.


How to Use a MIDI Keyboard
--------------------------

Once you have set up the hardware, you are ready to receive MIDI
information and interpret it in Csound. By default, when a MIDI note is
received, it turns on the Csound instrument corresponding to its channel
number, so if a note is received on channel 3, it will turn on
instrument 3, if it is received on channel 10, it will turn on
instrument 10 and so on.

If you want to change this routing of MIDI channels to instruments, you
can use the [massign](http://csound.github.io/docs/manual/html/massign.html)
opcode. For instance, this statement lets you route your MIDI channel 1
to instrument 10:

     massign 1, 10

On the following example, a simple instrument, which plays a sine wave,
is defined in instrument 1. There are no score note events, so no sound
will be produced unless a MIDI note is received on channel 1.

   ***EXAMPLE 02C01\_Midi\_Keybd\_in.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-+rtmidi=portmidi -Ma -odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

        massign   0, 1 ;assign all MIDI channels to instrument 1

instr 1
iCps    cpsmidi   ;get the frequency from the key pressed
iAmp    ampmidi   0dbfs * 0.3 ;get the amplitude
aOut    poscil    iAmp, iCps ;generate a sine tone
        outs      aOut, aOut ;write it to the output
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera
~~~

Note that Csound has an unlimited polyphony in this way: each key
pressed starts a new instance of instrument 1, and you can have any
number of instrument instances at the same time.


How to Use a MIDI Controller
----------------------------

To receive MIDI controller events, opcodes like
[ctrl7](http://csound.github.io/docs/manual/html/ctrl7.html) can
be used.  In the following example instrument 1 is turned on for 60
seconds. It will receive controller \#1 (modulation wheel) on channel 1
and convert MIDI range (0-127) to a range between 220 and 440. This
value is used to set the frequency of a simple sine oscillator.

   ***EXAMPLE 02C02\_Midi\_Ctl\_in.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-+rtmidi=virtual -M1 -odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
; --- receive controller number 1 on channel 1 and scale from 220 to 440
kFreq ctrl7  1, 1, 220, 440
; --- use this value as varying frequency for a sine wave
aOut  poscil 0.2, kFreq
      outs   aOut, aOut
endin
</CsInstruments>
<CsScore>
i 1 0 60
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera
~~~


Other Type of MIDI Data
-----------------------

Csound can receive other type of MIDI, like pitch bend, and aftertouch
through the usage of specific opcodes. Generic MIDI Data can be received
using the
[midiin](http://csound.github.io/docs/manual/html/midiin.html)
opcode. The example below prints to the console the data received via
MIDI.


   ***EXAMPLE 02C03\_Midi\_all\_in.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-+rtmidi=portmidi -Ma -odac
</CsOptions>
<CsInstruments>
;Example by Andrés Cabrera

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
kStatus, kChan, kData1, kData2 midiin

if kStatus != 0 then ;print if any new MIDI message has been received
    printk 0, kStatus
    printk 0, kChan
    printk 0, kData1
    printk 0, kData2
endif

endin

</CsInstruments>
<CsScore>
i1 0 3600
</CsScore>
</CsoundSynthesizer>
~~~
