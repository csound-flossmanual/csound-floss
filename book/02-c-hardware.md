# HOW TO: HARDWARE

## AUDIO DEVICES

### Do I have to handle audio via Csound when I use a frontend?

You will be able to select your audio device via your frontend, for instance
[Cabbage](https://cabbageaudio.com/docs/using_cabbage/#Settings),
[Blue](https://kunstmusik.github.io/blue-manual/users/gettingStarted/programOptions/#devices) or
[CsoundQt](https://csoundqt.github.io/pages/configuring-csoundqt.html).

But it is good to know what the [command line options](https://csound.com/docs/manual/CommandFlagsCategory.html) are
and what they mean: Good for a deeper understanding of what happens, and for
being able to solve problems.

### What is an Audio Module in Csound?

An Audio Module handles the real-time input and output exchange of audio
between Csound and the sound card (to put it in a simplified way).

### Which Audio Modules are available?

The default cross-platform audio module is [PortAudio](https://github.com/PortAudio/portaudio).
Another cross-platform audio module is [Jack](https://jackaudio.org).
Other audio modules are platform specific, like Alsa for Linux, Coreaudio for
Mac, mme for Windows.

### What is the best choice for selecting an audio module?

In my experience, [Jack](https://jackaudio.org) works best. Although it requires
a bit more time to learn how it works, I think it is worth and pays off.

### How can I select an audio module?

If you use a frontend, you will find it in the settings / preferences of
[Cabbage](https://cabbageaudio.com/docs/using_cabbage/#Settings),
[CsoundQt](https://csoundqt.github.io/pages/configuring-csoundqt.html) or
[Blue](https://kunstmusik.github.io/blue-manual/users/gettingStarted/programOptions/#devices).

(Note that Cabbage uses its own internal audio module instead of the ones
provided by Csound. It is also hardwired to 2 channels minimum.)

If you use plain Csound (command line Csound or Csound via API), use the option

    -+rtaudio=...

in the `CsOptions` tag.

For instance, to use Jack, you will write

    -+rtaudio=jack

### How can I connect Csound to a certain audio card?

In case you use a frontend, you will not need to write any options or
[command line flags](https://csound.com/docs/manual/CommandFlagsCategory.html)
in your _.csd_ file. The following description is only important for using
Csound on the command line or via API.

Remember that you also need to choose a real-time audio module.
(See above how to do this.)

Csound connects with a specific sound card separately for input and output.

#### Output

To **output** Csound audio in realtime to a sound card use the option

    -o dac

in your `CsOptions` tag.

If you use `-o dac`, Csound will connect with the system default.
This is usually desirable.

If you want another audio device than the system default, you need to get the
number of this device first. It should be written in the Csound console when
Csound starts. If not, run Csound with this option:

    csound --devices

Csound will print out the list of available devices.

Once you picked out the one you want to use, call it for instance as

    -o dac2

#### Input

To get **input** from your sound card into Csound, use the option

    -i adc

in your `CsOptions` tag.

If you use `-i dac`, Csound will connect with the system default.
This is usually desirable.

If you want another audio device than the system default, you need to get the
number of this device first. It should be written in the Csound console when
Csound starts. If not, run Csound with this option:

    csound --devices

Csound will print out the list of available devices.

Once you picked out the one you want to use, call it for instance as

    -i adc2

#### Input and Output

Of course you can use both options together. To use the system default sound card,
you will write:

    -o dac -i adc

Or without spaces:

    -odac -iadc

### How can I choose different number of input and output channels?

The `nchnls` statement in the header of your Csound file will set the number of output channels. If you need another number of input channels, use the opcode `nchnls_i`. This statement opens 8 channels for output and 4 channels for input:

    nchnls = 8
    nchnls_i = 4

## REALTIME AUDIO SETTINGS

### How can I synchronize the sample rate in Csound and in my audio card?

Say your system sample rate is 48000, but your Csound file has 44100.
The solution is simple, and can be in both ways.

Either change the sample rate in the Csound header:

    sr = 48000

Or change the system's sample rate to 44100. (Some systems will seamlessly handle the sampling rate requested by Csound and will not require any intervention.)

### How can I set the audio buffer size?

The audio buffer is a space of memory between Csound and the sound card.
It collects a number of audio samples before they really go out to the
hardware, or come in from the hardware.

Csound has two options to set the realtime audio buffer size:

- `-b` followed by a number of samples sets the _Software Buffer Size_.
- `-B` followed by a number of samples sets the _Hardware Buffer Size_.

The meaning of these numbers depend on the audio module.
^[As Victor Lazzarini explains (mail to Joachim Heintz, 19 march
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
and 4), which is functionally similar.\"]

As a rule of thumb:

1. Set `-b` to a power-of-two, for instance 256.
2. Set `-B` to this number times four.

In this case, your `CsOptions` tag would contain:

    -b 256 -B 1024

### Which ksmps should I use?

Always use a power-of-two. In my experience, 64 or 32 are good values for most
cases.

Make sure you never have a larger `ksmps` value than the `-b` buffer size.

Usually your `ksmps` will be a fourth of `-b`. So as a standard configuration
for real-time audio in Csound I'd use:

- `-b 256 -B 1024` in the `CsOptions` tag.
- `ksmps = 64` in the Csound orchestra header, at the beginning of the `CsInstruments` tag.

### Can I give realtime audio the priority over other processes in Csound?

When you have instruments that have substantial sections that could
block out execution, for instance with code that loads buffers from
files or creates big tables, you can try the option `--realtime` in
you `CsOptions`tag.

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

## REALTIME AUDIO ISSUES AND ERRORS

### Why is my realtime audio distorted?

There is not one reason for it. Many different reasons can lead to distorted audio, for instance:

- A realtime audio module is selected which does not fit to your system.
- The buffer sizes are too large or too small.
- The Csound instruments you run consume too much CPU power.

### Why do I have so much latency when I connect a microphone?

Probably you have a too large buffer size. See above about how to set the
audio buffer size.

### Why do I get a “wrong number of channels” error?

In general it means a mismatch between the `nchnls` statement in the Csound file and the available number of hardware channels. For instance `nchnls = 4` in your Csound file will not work with a stereo sound card and using the portaudio module.

For Mac, this error can also be thrown when you use the internal sound card with `nchnls = 2`. The reason is that the microphone input is mono, but with `nchnls = 2` Csound tries to open two input channels. The solution in this case is to use `nchnls_i = 1` in addition:

    nchnls = 2
    nchnls_i = 1

## MIDI DEVICES

### Do I have to handle MIDI via Csound when I use a frontend?

No. When you use Cabbage, CsoundQt or Blue, your MIDI devices will be connected
with Csound via the frontends. You will find descriptions on the pages for
[CsoundQt](https://csoundqt.github.io/pages/configuring-csoundqt.html),
[Cabbage](https://cabbageaudio.com/docs/using_cabbage/#Settings) and
[Blue](https://kunstmusik.github.io/blue-manual/users/gettingStarted/programOptions/#devices).

### How can I know the MIDI input device number when using plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
MIDI handling is done by it.

You should see the device numbers in the Csound console once you run Csound.

If not, run Csound with

    csound --midi-devices

Csound will return a list of all available MIDI input devices.

### How can I know the MIDI output device number when using plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
MIDI handling is done by it.

You should see the device numbers in the Csound console once you run Csound.

If not, run Csound with

    csound --midi-devices

Csound will return a list of all available MIDI output devices.

### How can I set another MIDI module than PortMidi when using plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
MIDI handling is done by it.

The default MIDI module in Csound is [PortMidi](https://github.com/PortMidi/PortMidi).
You can choose another MIDI module by using

    -+rtmidi=...

The available MIDI modules depend on your operating system and on your installation.
Usually `alsa` is available for Linux, `coremidi` for Mac and `winmme` for Windows.

### How can I select MIDI input and output devices in plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
MIDI handling is done by it.

Input devices are set via the option `-M`. Output devices are set with the option
`-Q`. So if you want MIDI input using the portmidi module, using device 2 for
input and device 1 for output, your `<CsOptions>` section should
contain:

    -+rtmidi=portmidi -M2 -Q1

### Can I use more than one device for input using plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
MIDI handling is done by it.

You can use multiple MIDI input devices when you use PortMidi. This is done
via the option

    -Ma

in the `CsOptions` tag.

### How can I connect a MIDI keyboard with a Csound instrument?

Once you have set up the hardware, you are ready to receive MIDI
information and interpret it in Csound. By default, when a MIDI note is
received, it turns on the Csound instrument corresponding to its channel
number, so if a note is received on channel 3, it will turn on
instrument 3, if it is received on channel 10, it will turn on
instrument 10 and so on.

If you want to change this routing of MIDI channels to instruments, you can use
the [massign](http://csound.github.io/docs/manual/html/massign.html) opcode.
For instance, this statement lets you route your MIDI channel 1
to instrument 10:

     massign 1, 10

On the following example, a simple instrument, which plays a sine wave,
is defined in instrument 1. There are no score note events, so no sound
will be produced unless a MIDI note is received on channel 1.

#### _EXAMPLE 02D01_Midi_Keybd.csd_

```csound
<CsoundSynthesizer>
<CsOptions>
//it might be necessary to add -Ma here if you use plain Csound
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

//assign all MIDI channels to instrument "Play"
massign(0,"Play")

instr Play
  //get the frequency from the key pressed
  iCps = cpsmidi()
  //get the amplitude
  iAmp = ampmidi(0dbfs * 0.3)
  //generate a sine tone with these parameters
  aSine = poscil:a(iAmp,iCps)
  //apply fade in and fade out
  aOut =linenr:a(aSine,0.01,0.1,0.01)
  //write it to the output
  outall(aOut)
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera and joachim heintz
```

Note that Csound has an unlimited polyphony in this way: each key
pressed starts a new instance of instrument _Play_, and you can have any
number of instrument instances at the same time.

### How can I use a MIDI controller with plain Csound?

"Plain Csound" means: Using Csound via command line. If you use a frontend,
it might route your MIDI controller to a widget so that you will deal with
the widget values in your code rather than with the MIDI CC data.

To receive MIDI controller events in plain Csound, opcodes like
[ctrl7](http://csound.github.io/docs/manual/html/ctrl7.html) can
be used. In the following example instrument 1 is turned on for 60
seconds. It will receive controller \#1 on channel 1
and convert MIDI range (0-127) to a range between 220 and 440. This
value is used to set the frequency of a simple sine oscillator.

#### _EXAMPLE 02D02_Midi_Ctlin.csd_

```csound
<CsoundSynthesizer>
<CsOptions>
//it might be necessary to add -Ma here if you use plain Csound
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr 1
  //receive controller number 1 on channel 1 and scale from 220 to 440
  kFreq = ctrl7(1, 1, 220, 440)
  //use this value as varying frequency for a sine wave
  aOut = poscil:a(0.2, kFreq)
  //output
  outall(aOut)´
endin

</CsInstruments>
<CsScore>
i 1 0 60
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera
```

### How can I get a simple printout of all MIDI input with plain Csound?

Csound can receive generic MIDI Data using
the [midiin](http://csound.github.io/docs/manual/html/midiin.html) opcode.
The example below prints to the console the data received via MIDI.

#### **_EXAMPLE 02C03_Midi_all_in.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
//it might be necessary to add -Ma here if you use plain Csound
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
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
i 1 0 -1
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera
```
