08 A. OPEN SOUND CONTROL
========================

Open Sound Control offers a more flexible, dynamic alternative to
MIDI. It uses modern network communications, usually based on the user datagram
transport layer protocol (UDP), and allows not only the communication between
synthesisers but also between applications and remote computers.


The Protocol
------------

The basic unit of OSC data is a message. This is sent to an address which follows the UNIX path convention, starting with a slash and creating branches at every following slash. The names inside this structure are free, but the convention is that it should fit to the content, for instance `/filter/rudi/cutoff` or `/Processing/sketch/RGB`. So, in contrast to MIDI, the address space is not predefined and can be changed dynamically.

The OSC message must specify the type(s) of its argument(s). This is a list of all types which are available in Csound, and the signifier which Csound uses for this type:

  Type                          Csound Signifier
  ----------------------------- -----------------
  audio                         a
  character                     c
  double                        d
  float                         f
  long integer 64-bit           h              
  integer 32-bit                i           
  string                        s
  array (scalar)                A
  table                         G


Once data types are declared, messages can be sent and received. In OSC termi-
nology, anything that sends a message is a client, and anything that receives it is a server. Csound can be both, in various ways, as it can:
- send a message and receive it in another part of the same program;
- receive a message which is sent by any other application on this computer (localhost) or anywhere in the network;
- send a message to another application anywhere in the network.
















OPEN SOUND CONTROL - NETWORK COMMUNICATION
------------------------------------------

Open Sound Control (OSC) is a network protocol format for musical
control data communication. A few of its advantages compared to MIDI
are, that it's more accurate, quicker and much more flexible. With OSC
you can easily send messages to other software independent if it's
running on the same machine or over network. There is OSC support in
software like PD, Max/MSP, Ardour or SuperCollider.

OSC messages contain an IP adress with port information and the
data-package, which will be sent over network. In Csound, there are two
opcodes, which provide access to network communication called OSCsend
and OSClisten.


   ***Example 08A01_osc.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

; localhost means communication on the same machine, otherwise you need
; an IP adress
#define IPADDRESS       # "localhost" #
#define S_PORT          # 47120 #
#define R_PORT          # 47120 #

turnon 1000  ; starts instrument 1000 immediately
turnon 1001  ; starts instrument 1001 immediately


instr 1000  ; this instrument sends OSC-values
        kValue1 randomh 0, 0.8, 4
        kNum randomh 0, 8, 8
        kMidiKey tab (int(kNum)), 2
        kOctave randomh 0, 7, 4
        kValue2 = cpsmidinn (kMidiKey*kOctave+33)
        kValue3 randomh 0.4, 1, 4
        Stext sprintf "%i", $S_PORT
        OSCsend   kValue1+kValue2, $IPADDRESS, $S_PORT, "/QuteCsound",
                  "fff", kValue1, kValue2, kValue3
endin


instr 1001  ; this instrument receives OSC-values
        kValue1Received init 0.0
        kValue2Received init 0.0
        kValue3Received init 0.0
        Stext sprintf "%i", $R_PORT
        ihandle OSCinit $R_PORT
        kAction  OSClisten      ihandle, "/QuteCsound", "fff",
                 kValue1Received, kValue2Received, kValue3Received
                if (kAction == 1) then
                        printk2 kValue2Received
                        printk2 kValue1Received

                endif
        aSine poscil3 kValue1Received, kValue2Received, 1
        ; a bit reverbration
        aInVerb = aSine*kValue3Received
        aWetL, aWetR freeverb aInVerb, aInVerb, 0.4, 0.8
outs aWetL+aSine, aWetR+aSine
endin

</CsInstruments>
<CsScore>
f 1 0 1024 10 1
f 2 0 8 -2      0 2 4 7 9 11 0 2
e 3600
</CsScore>
</CsoundSynthesizer>
; example by Alex Hofmann
~~~
