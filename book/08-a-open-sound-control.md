08 A. OPEN SOUND CONTROL
========================

Open Sound Control (OSC) offers a more flexible and dynamic alternative to
MIDI. It uses modern network communications, usually based on the user datagram
transport layer protocol (UDP), and allows not only the communication between
synthesisers but also between applications and remote computers.


The Protocol
------------

The basic unit of OSC data is a *message*. This is sent to an *address* which follows the UNIX path convention, starting with a slash and creating branches at every following slash. The names inside this structure are free, but the convention is that it should fit to the content, for instance `/filter/rudi/cutoff` or `/Processing/sketch/RGB`. So, in contrast to MIDI, the address space is not predefined and can be changed dynamically.

The OSC message must specify the type(s) of its argument(s). This is a list of all types which are available in Csound, and the signifier which Csound uses for this type:

  Data Type                     Csound Signifier
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


Once data types are declared, messages can be sent and received. In OSC terminology, anything that sends a message is a client, and anything that receives a message is a server. Csound can be both. Usually it will communicate with another application either as client or as server. It can, for instance, receive data from [Processing](https://processing.org/), or it can send data to [Inscore](http://inscore.sourceforge.net/).

For this introduction we will keep both functions in Csound, One instrument will send an OSC message, another instrument will receive this message. We will start with a simple example, to study the basic functionality.


   ***EXAMPLE 08A01_OSC_send_recv_int.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-m 128
</CsOptions>
<CsInstruments>

sr	= 44100
ksmps = 32
nchnls	= 2
0dbfs	= 1

giPortHandle OSCinit 47120

instr Send
 kSendTrigger = 1
 kSendValue = 17
 OSCsend kSendTrigger, "", 47120, "/exmp_1/int", "i", kSendValue
 turnoff
endin

instr Receive
 kReceiveValue init 0
 kGotIt OSClisten giPortHandle, "/exmp_1/int", "i", kReceiveValue
 if kGotIt == 1 then
  printf "Message Received for '/exmp_1/int' at time %f: kReceiveValue = %d\n",
         1, times:k(), kReceiveValue
 endif
endin

</CsInstruments>
<CsScore>
i "Receive" 0 3 ;start listening process first
i "Send" 1 1    ;then after one second send message
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~



    Message Received for '/exmp_1/int' at time 1.002086: kReceiveValue = 17

