08 A. OPEN SOUND CONTROL
========================

Open Sound Control (OSC) offers a flexible and dynamic alternative to
MIDI. It uses modern network communications, usually based on the user datagram
transport layer protocol (UDP), and allows not only the communication between
synthesizers but also between applications and remote computers.


Data Types and Csound Signifiers
--------------------------------

The basic unit of OSC data is a *message*. This is being sent to an *address* which follows the UNIX path convention, starting with a slash and creating branches at every following slash. The names inside this structure are free, but the convention is that it should fit to the content, for instance `/filter/rudi/cutoff` or `/Processing/sketch/RGB`. So, in contrast to MIDI, the address space is not predefined and can be changed dynamically.

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


Sending and Receiving Different Data Types
------------------------------------------

For this introduction we will keep both functions in Csound, One instrument will send an OSC message, another instrument will receive this message. We will start with sending and receiving nothing but one integer, to study the basic functionality.

### Send/Receive an integer


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
  printf "Message Received for '%s' at time %f: kReceiveValue = %d\n",
         1, "/exmp_1/int", times:k(), kReceiveValue
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

#### OSCinit

    giPortHandle OSCinit 47120

The [OSCinit](https://csound.com/docs/manual/OSCinit.html) statement is necessary for the [OSClisten](https://csound.com/docs/manual/OSClisten.html) opcode. It takes a port number as input argument and returns a handle, called *giHandle* in this case. This statement should usually be done in the global space.

#### OSCsend

    kSendTrigger = 1
    kSendValue = 17
    OSCsend kSendTrigger, "", 47120, "/exmp_1/int", "i", kSendValue

The [OSCsend](https://csound.com/docs/manual/OSCsend.html) opcode will send a message whenever the *kSendTrigger* will change its value. As this variable is set here to a fixed number, only one message will be sent. The second input for *OSCsend* is the host to which the message is being sent. An empty string means "localhost" or "127.0.0.1". Third argument is the port number, here 47120, followed by the destination address string, here "/exmp_1/int". As we are sending an integer here, the type specifier is "i" as fifth argument, followed by the value itself.

#### OSClisten

    kReceiveValue init 0
    kGotIt OSClisten giPortHandle, "/exmp_1/int", "i", kReceiveValue

On the receiver side, we find the *giPortHandle* which was returned by *OSCinit*, and the address string again, as well as the expected type, here "i" for integer. Note that the value which is received is on the *input* side of the opcode. So *kReceiveValue* must be initialized before, which is done in line 21. Whenever *OSClisten* receives a message, the *kGotIt* output variable will become 1 (otherwise it is zero).

    if kGotIt == 1 then
     printf "Message Received for '/exmp_1/int' at time %f: \
     kReceiveValue = %d\n", 1, times:k(), kReceiveValue
    endif

Here we catch this point, and get a printout with the time at which the message has been received. As our listening instrument starts first, and the sending instrument after one second, we will see a message like this one in the console:

    Message Received for '/exmp_1/int' at time 1.002086: kReceiveValue = 17

Note that the time at which the message is received is necessarily slightly later than the time at which it is being sent. The time difference is usually around some milliseconds; it depends on the UDP transmission.


### Send/Receive more than one data type in a message

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
 OSCsend kSendTrigger, "", 47120, "/exmp_2/more", "fs", kFloat, Sstring
endin

instr Receive
 kReceiveFloat init 0
 SReceiveString init ""
 kGotIt OSClisten giPortHandle, "/exmp_2/more", "fs", 
                  kReceiveFloat, SReceiveString
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



### Send/Receive arrays

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
 OSCsend kSendTrigger, "", 47120, "/exmp_3/array", "A", kArray
endin

instr Receive
 kReceiveArray[] init 7
 kGotIt OSClisten giPortHandle, "/exmp_3/array", "A", kReceiveArray
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


### Send/Receive function tables

The next example shows a similar approach for function tables. Three different tables are being sent once a second, and received in the second instrument. Imagine two Csound instances running on two different computers for a more realistic situation.


   ***EXAMPLE 08A04_Send_receive_table.csd***

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

giTable_1 ftgen 0, 0, 1024, 10, 1
giTable_2 ftgen 0, 0, 1024, 10, 1, 1, 1, 1, 1
giTable_3 ftgen 0, 0, 1024, 10, 1, .5, 3, .1


instr Send
 kSendTrigger init 1
 kTable init giTable_1
 kTime init 0
 OSCsend kSendTrigger, "", 47120, "/exmp_4/table", "G", kTable
 if timeinsts() >= kTime+1 then
  kSendTrigger += 1
  kTable += 1
  kTime = timeinsts()
 endif
endin

instr Receive
 iReceiveTable ftgen 0, 0, 1024, 2, 0
 kGotIt OSClisten giPortHandle, "/exmp_4/table", "G", iReceiveTable
 aOut poscil .2, 400, iReceiveTable
 out aOut, aOut
endin

</CsInstruments>
<CsScore>
i "Receive" 0 3
i "Send" 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Send/Receive audio

It is also possible to send and receive an audio signal via OSC. in this case, a OSC message must be sent on each k-cycle. Remember though that OSC is not optimized for this task. Most probably you will hear some dropouts in the next example. (Larger ksmps values should give better result.)


   ***EXAMPLE 08A05_send_receive_audio.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-m 128
</CsOptions>
<CsInstruments>

sr	= 44100
ksmps = 128
nchnls	= 2
0dbfs	= 1

giPortHandle OSCinit 47120

instr Send
 kSendTrigger init 1
 aSend poscil .2, 400
 OSCsend kSendTrigger, "", 47120, "/exmp_5/audio", "a", aSend
 kSendTrigger += 1
endin

instr Receive
 aReceive init 0
 kGotIt OSClisten giPortHandle, "/exmp_5/audio", "a", aReceive
 out aReceive, aReceive
endin

</CsInstruments>
<CsScore>
i "Receive" 1 3
i "Send" 0 5
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


Other OSC Opcodes
-----------------

The examples in this chapter were simple demonstrations of how different data types can be sent and received via OSC. The real usage requires a different application as partner for Csound, instead of the soliloquy we performed here. It should be added that there are some OSC opcodes which extend the basic functionality of *OSCsend* and *OSClisten*:  
- [OSCcount](https://csound.com/docs/manual/OSCcount.html) returns the count of OSC messages currently unread.  
- [OSCraw](https://csound.com/docs/manual/OSCraw.html) listens for all messages at a given port.  
- [OSCbundle](https://csound.com/docs/manual/OSCbundle.html) sends OSC messages in a bundle rather than single messages.  
- There is a variant of *OSCsend* called *OSCsend_lo* which uses the liblo library.



Practical Examples with Processing
----------------------------------

We will show here some examples for the communication between Csound and [Processing](https://processing.org). Processing is a well-established programming language for any kind of image processing, including video recording and playback. The OSC library for Processing is called *oscP5*. After installing this library, it can be used for both, sending and receiving Open Sound Control messages in any way.

### Csound to Processing: Video Playback

We often want to use visuals in connection with audio. A simple case is that we have a live electronic setup and at a certain point we want to start a video. We may want to start the video in Processing with a Csound message like this:

    instr StartVideo
	  OSCsend(1,"",12000,"/launch2/start","i",1)
    endin

This means that we send the integer 1 to the address "launch2/start" on port 12000.

To receive this message in Processing, we import the `oscP5` library and create a new `OscP5` instance which listens to port 12000:

    import oscP5.*;
    OscP5 oscP5;
    oscP5 = new OscP5(this,12000);
    
Then we use the `pluck()` method which passes the OSC messages of a certain address (here "/launch2/start") to a method with a user-defined name. We call it "startVideo" here:

    oscP5.plug(this,"startVideo","/launch2/start");
    
All we have to do now is to wrap Processing's video `play()` message in this `startVideo` method. This is the full example code, referring to the video "launch2.mp4" which can be found in the Processing examples:

~~~processing
//import the video and osc library
import processing.video.*; 
import oscP5.*;
//create objects
OscP5 oscP5;
Movie movie;

void setup() {
  size(560, 406);
  background(0);
  // load the video
  movie = new Movie(this,"launch2.mp4");
  //receive OSC
  oscP5 = new OscP5(this,12000);
  //pass the message to the startVideo method
  oscP5.plug(this,"startVideo","/launch2/start");
}

//activate video playback when startVideo receives 1
void startVideo(int onOff) {
    if (onOff == 1) {
    movie.play();
  }
}

//callback function to read new frames
void movieEvent(Movie m) {
  m.read();
}

//show it
void draw() {
  image(movie, 0, 0, width, height);
}
~~~

To start the video by hitting any key we can write something like this on the Csound side:

~~~
instr ReceiveKey 
 kKey, kPressed sensekey
 if kPressed==1 then
  schedulek("StartVideo",0,1)  
 endif
endin
schedule("ReceiveKey",0,-1)

instr StartVideo
 OSCsend(1,"",12000,"/launch2/start","i",1)
endin
~~~


### Processing to Csound: Mouse Pressed

We start with a simple example for swapped roles: Processing is now the sender of the OSC message, and Csound the receiver.

For processing, sending OSC is recommended by using this method:

	oscP5.send(OscMessage, myRemoteLocation)
	
where `myRemoteLocation` is a `NetAddress` which is created by the library `netP5`. This is the code for sending an integer count whenever the mouse is pressed via OSC. The message is sent on port 12002 to the address "/P5/pressed".

~~~processing
//import oscP5 and netP5 libraries
import oscP5.*;
import netP5.*;
//initialize objects
OscP5 oscP5;
NetAddress myRemoteLocation;

int count;

void setup(){
  size(600, 400);
  //create OSC object, listening at port 12001
  oscP5 = new OscP5(this,12001); 
  //create NetAddress for sending: localhost at port 12002
  myRemoteLocation = new NetAddress("127.0.0.1",12002);
  //initialize variable for count
  count = 0;
}

void mousePressed(){
  //create new OSC message when mouse is pressed
  OscMessage pressed = new OscMessage("/P5/pressed");
  //add count to the message
  count += 1;
  pressed.add(count);
  //send it
  oscP5.send(pressed, myRemoteLocation);
}

void draw(){
}
~~~

The following Csound code receives the messages and prints the count numbers:

   ***EXAMPLE 08A06_receive_mouse_pressed.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr ReceiveOSC
 iPort = OSCinit(12002)
 kAns, kMess[] OSClisten iPort, "/P5/pressed", "i"
 printf "Mouse in Processing pressed %d times!\n", kAns, kMess[0]
endin
schedule("ReceiveOSC",0,-1)

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Processing to Csound: Moving Lines

For showing one simple example for the many possibilities to connect Processing's interactive visuals with Csound, we will use the *Distance 1D* example as basic. It shows two thin ans two thick lines which move on the screen in a speed which depends on the mouse position. We slightly modify the speed so that the four lines have four different speeds. Rather than ...

~~~processing
xpos1 += mx/16;
xpos2 += mx/64;
xpos3 -= mx/16;
xpos4 -= mx/64;
~~~

... we write:

~~~processing
xpos1 += mx/16;
xpos2 += mx/60;
xpos3 -= mx/18;
xpos4 -= mx/64;
~~~

And we send the x-positions of the four lines via the address "/P5/xpos" in this way:

~~~processing
//create OSC message and add the four x-positions
OscMessage xposMessage = new OscMessage("/P5/xpos");
xposMessage.add(xpos1); 
xposMessage.add(xpos2); 
xposMessage.add(xpos3); 
xposMessage.add(xpos4); 
//send it
oscP5.send(xposMessage, myRemoteLocation); 
~~~

This is the complete Processing code:

~~~processing
//import oscP5 and netP5 libraries
import oscP5.*;
import netP5.*;
//initialize objects
OscP5 oscP5;
NetAddress myRemoteLocation;

//variables for the x position of the four lines
//(adapted from processings Basics>Math>Distance 1D example) 
float xpos1;
float xpos2;
float xpos3;
float xpos4;
int thin = 8;
int thick = 36;

void setup(){
  size(640, 360);
  noStroke();
  xpos1 = width/2;
  xpos2 = width/2;
  xpos3 = width/2;
  xpos4 = width/2;
  //create OSC object, listening at port 12001
  oscP5 = new OscP5(this,12001); 
  //create NetAddress for sending: localhost at port 12002
  myRemoteLocation = new NetAddress("127.0.0.1",12002);
}

void draw(){
  //create movement depending on mouse position
  background(0);
  float mx = mouseX * 0.4 - width/5.0;
  fill(102);
  rect(xpos2, 0, thick, height/2);
  rect(xpos4, height/2, thick, height/2);
  fill(204);
  rect(xpos1, 0, thin, height/2);
  rect(xpos3, height/2, thin, height/2);	
  xpos1 += mx/16;
  xpos2 += mx/60;
  xpos3 -= mx/18;
  xpos4 -= mx/64;
  if(xpos1 < -thin)  { xpos1 =  width; }
  if(xpos1 >  width) { xpos1 = -thin; }
  if(xpos2 < -thick) { xpos2 =  width; }
  if(xpos2 >  width) { xpos2 = -thick; }
  if(xpos3 < -thin)  { xpos3 =  width; }
  if(xpos3 >  width) { xpos3 = -thin; }
  if(xpos4 < -thick) { xpos4 =  width; }
  if(xpos4 >  width) { xpos4 = -thick; }
  
  //create OSC message and add the four x-positions
  OscMessage xposMessage = new OscMessage("/P5/xpos");
  xposMessage.add(xpos1); 
  xposMessage.add(xpos2); 
  xposMessage.add(xpos3); 
  xposMessage.add(xpos4); 
  //send it
  oscP5.send(xposMessage, myRemoteLocation); 
}
~~~

On the Csound side, we receive the four x-positions on "/p5/xpos" as floating point numbers and write it to the global array *gkPos*:

    kAns,gkPos[] OSClisten iPort, "/P5/xpos", "ffff"

Each line in the Processing sketch is played by one instance of instrument "Line" in this way:  
- the thick lines have a lower pitch than the thin lines  
- in the middle of the canvas the sounds are louder (-20 dB compared to -40 dB at borders)
- in the middle of the canvas the pitch is higher (one octave compared to the left/right)

To achieve this, we build a function table *iTriangle* with 640 points (as much as the Processing canvas has x-points), containing a straight line from zero at left and right, to one in the middle:

![iTriangle function table](../resources/images/08-a-table.svg){width=50%}

The incoming x position is used for both, the volume (dB) and the pitch (MIDI). A vibrato is added to the sine waves (smaller but faster for higher pitches) to the sine waves, and the panning reflects the position of the lines between left and right.

   ***EXAMPLE 08A07_P5_Csound_OSC.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr GetLinePositions
 //initialize port to receive OSC messages
 iPort = OSCinit(12002)
 //write the four x-positions in the global array gkPos
 kAns,gkPos[] OSClisten iPort, "/P5/xpos", "ffff"
 //call four instances of the instrument Line
 indx = 0
 while indx < 4 do
  schedule("Line",0,9999,indx+1)
  indx += 1
 od
endin
schedule("GetLinePositions",0,-1)

instr Line
 iLine = p4 //line 1-4 in processing
 kPos = gkPos[iLine-1]
 //table for volume (db) and pitch (midi)
 iTriangle = ftgen(0,0,641,-7,0,320,1,320,0)
 //volume is -40 db left/right and -20 in the middle of the screen
 kVolDb = tablei:k(kPos,iTriangle)*30 - 40
 //reduce by 4 db for the higher pitches (line 1 and 3)
 kVolDb = (iLine % 2 != 0) ? kVolDb-4 : kVolDb
 //base pitch is midi 50 for thick and 62 for thin lines
 iMidiBasePitch = (iLine % 2 == 0) ? 50 : 62
 //pitch is one octave plus iLine higher in the middle
 kMidiPitch = table:k(kPos,iTriangle)*12 + iMidiBasePitch+iLine
 //vibrato depending on line number
 kVibr = randi:k(iLine/4, 100/iLine,2)
 //generate sound and apply gentle fade in
 aSnd = poscil:a(ampdb(kVolDb),mtof:k(kMidiPitch+kVibr))
 aSnd *= linseg:a(0,1,1)
 //panning follows position on screen
 aL, aR pan2 aSnd, kPos/640
 out(aL,aR)
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Open Sound Control is the way to communicate between Processing and Csound as independent applications. Another way for connecting these extensive libraries for image and audio processing is by using JavaScript, and run both in a browser. Have a look at chapter [10 F](10-f-web-based-csound.md) and [12 G](12-g-csound-in-html-and-javascript.md) for more information.
