08 A. OPEN SOUND CONTROL
========================

Open Sound Control (OSC) offers a more flexible and dynamic alternative to
MIDI. It uses modern network communications, usually based on the user datagram
transport layer protocol (UDP), and allows not only the communication between
synthesisers but also between applications and remote computers.


Data Types and Csound Signifiers
--------------------------------

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


Sending and Receiving Integers
------------------------------

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

To understand the main functionalities to use OSC in Csound, we will look more closely to what happens in the code.

    giPortHandle OSCinit 47120

The [OSCinit](https://csound.com/docs/manual/OSCinit.html) statement is necessary for the [OSClisten](https://csound.com/docs/manual/OSClisten.html) opcode. It takes a port number as input argument and returns a handle, called *giHandle* in this case. This statement should usually be done in the global space.

    kSendTrigger = 1
    kSendValue = 17
    OSCsend kSendTrigger, "", 47120, "/exmp_1/int", "i", kSendValue

The [OSCsend](https://csound.com/docs/manual/OSCsend.html) opcode will send a message whenever the *kSendTrigger* will change its value. As this variable is set here to a fixed number, only one message will be send. The second input for *OSCsend* is the host to which the message is being sent. An empty string means "localhost" or "127.0.0.1". Third argument is the port number, here 47120, followed by the destination address string, here "/exmp_1/int". As we are sending an integer here, the type specifier is "i" as fifth argument, followed by the value itself.

    kReceiveValue init 0
    kGotIt OSClisten giPortHandle, "/exmp_1/int", "i", kReceiveValue

On the receiver side, we find the *giPortHandle* which was returned by *OSCinit*, and the address string again, as well as the expected type, here "i" for integer. Note that the value which is received is on the *input* side of the opcode. So *kReceiveValue* must be initialized before, which is done in line 21. Whenever *OSClisten* receives a message, the *kGotIt* output variable will become 1.

    if kGotIt == 1 then
     printf "Message Received for '/exmp_1/int' at time %f: kReceiveValue = %d\n",
            1, times:k(), kReceiveValue
    endif

Here we catch this point, and get a printout with the time at which the message has been received. As our listening instrument starts first, and the sending instrument after one second, we will see a message like this one in the console:

    Message Received for '/exmp_1/int' at time 1.002086: kReceiveValue = 17

Note that the time at which the message is received is necessarily slightly later than the time at which it is being sent. The time difference is usually around some milliseconds; it depends on the UDP transmission.


More than one variable in a message
------------------------------------

The string which specifies the data types which are being sent, can consist of more than one character. It was "i" in the previous example, as we sent an integer. When we want to send a float and a string, it will become "fs". This is the case in the next example; anything else is very similar to what was shown before.


   ***EXAMPLE 08A02_OSC_more_data.csd***

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
 kFloat = 1.23456789
 Sstring = "bla bla"
 OSCsend kSendTrigger, "", 47120, "/exmp_1/int", "fs", kFloat, Sstring
endin

instr Receive
 kReceiveFloat init 0
 SReceiveString init ""
 kGotIt OSClisten giPortHandle, "/exmp_1/int", "fs", kReceiveFloat, SReceiveString
 if kGotIt == 1 then
  printf "kReceiveFloat = %f\nSReceiveString = '%s'\n", 
         1, kReceiveFloat, SReceiveString
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

The printout is here:

    kReceiveFloat = 1.234568
    SReceiveString = 'bla bla'



Sending and Receiving Arrays
----------------------------

Instead of single data, OSC can also send and receive collections of data. The next example shows how an array is being sent once a second, and is being transformed for each [metro](https://csound.com/docs/manual/metro.html) tick. 


   ***EXAMPLE 08A03_Send_receive_array.csd***

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
 kSendTrigger init 0
 kArray[] fillarray 1, 2, 3, 4, 5, 6, 7
 if metro(1)==1 then
  kSendTrigger += 1
  kArray *= 2
 endif
 OSCsend kSendTrigger, "", 47120, "/exmp_1/int", "A", kArray
endin

instr Receive
 kReceiveArray[] init 7
 kGotIt OSClisten giPortHandle, "/exmp_1/int", "A", kReceiveArray
 if kGotIt == 1 then
  printarray kReceiveArray
 endif
endin

</CsInstruments>
<CsScore>
i "Receive" 0 3
i "Send" 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Each time the metro ticks, the array values are multiplied by two. So the printout is:

    2.0000 4.0000 6.0000 8.0000 10.0000 12.0000 14.0000 
    4.0000 8.0000 12.0000 16.0000 20.0000 24.0000 28.0000 
    8.0000 16.0000 24.0000 32.0000 40.0000 48.0000 56.0000 


