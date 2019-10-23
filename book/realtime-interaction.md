REALTIME INTERACTION
====================

OPCODE GUIDE: REALTIME INTERACTION
----------------------------------

-   ### MIDI

    -   #### Opcodes For Use In MIDI-Triggered Instruments 

        [](http://www.csounds.com/manual/html/massign.html)

        [**massign**](http://www.csounds.com/manual/html/massign.html)
        assigns specified midi channels to instrument numbers. See the
        [Triggering Instrument
        Instances](http://en.flossmanuals.net/bin/view/Csound/TRIGGERINGINSTRUMENTINSTANCES)
        chapter for more information.

        [**pgmassign**](http://www.csounds.com/manual/html/pgmassign.html)
        assigns midi program changes to specified instrument numbers.\

        [**notnum**](http://www.csounds.com/manual/html/notnum.html)
        retrieves the midi number of the key which has been pressed and
        activated this instrument instance. 

        [**cpsmidi**](http://www.csounds.com/manual/html/cpsmidi.html)
        converts this note number to the frequency in cycles per second
        (Hertz).

        [**veloc**](http://www.csounds.com/manual/html/veloc.html) and
        [**ampmidi**](http://www.csounds.com/manual/html/ampmidi.html)
        get the velocity of the key which has been pressed and activated
        this instrument instance.

        [**midichn**](http://www.csounds.com/manual/html/midichn.html)
        returns the midi channel number from which the note was
        activated.

        [**pchbend**](http://www.csounds.com/manual/html/pchbend.html)
        reads pitch bend information.

        [**aftouch**](http://www.csounds.com/manual/html/aftouch.html)
        and
        [**polyaft**](http://www.csounds.com/manual/html/polyaft.html)
        read the monophonic aftertouch (afttouch) and polyphonic
        aftertouch (polyaft) information.

    -   #### Opcodes For Use In All Instruments

        [](http://www.csounds.com/manual/html/ctrl7.html)

        [**ctrl7**](http://www.csounds.com/manual/html/ctrl7.html) reads
        the values of a usual (7 bit) controller and scales it.
        [ctrl14](http://www.csounds.com/manual/html/ctrl14.html) and
        [ctrl21](http://www.csounds.com/manual/html/ctrl21.html) can be
        used for high definition controllers.

        [**initc7**](http://www.csounds.com/manual/html/initc7.html) or
        [**ctrlinit**](http://www.csounds.com/manual/html/ctrlinit.html)
        set the initial value of 7 bit controllers. Use
        [initc14](http://www.csounds.com/manual/html/initc14.html) and
        [initc21](http://www.csounds.com/manual/html/initc21.html) for
        high definition devices.\

        [**midiin**](http://www.csounds.com/manual/html/midiin.html)
        reads all incoming midi events. 

        [**midiout**](http://www.csounds.com/manual/html/midiout.html)
        writes any type of midi message to the midi out port.

<!-- -->

-   ### OPEN SOUND CONTROL AND NETWORK

    -   #### Open Sound Control

        [](http://www.csounds.com/manual/html/OSCinit.html)

        [**OSCinit**](http://www.csounds.com/manual/html/OSCinit.html)
        initialises a port for later use of the OSClisten opcode.

        [**OSClisten**](http://www.csounds.com/manual/html/OSClisten.html)
        receives messages of the port which was initialised by OSCinit.

        [**OSCsend**](http://www.csounds.com/manual/html/OSCsend.html)
        sends messages to a port.

    -   #### Remote Instruments

        [](http://www.csounds.com/manual/html/remoteport.html)

        [**remoteport**](http://www.csounds.com/manual/html/remoteport.html)
        defines the port for use with the remote system.\

        [**insremot**](http://www.csounds.com/manual/html/insremot.html)
        will send note events from a source machine to one destination.\

        [**insglobal**](http://www.csounds.com/manual/html/insglobal.html)
        will send note events from a source machine to many
        destinations.\

        [**midiremot**](http://www.csounds.com/manual/html/midiremot.html)
        will send midi events from a source machine to one destination.\

        [**midiglobal**](http://www.csounds.com/manual/html/midiglobal.html)
        will broadcast the midi events to all the machines involved in
        the remote concert.

    -   #### Network Audio

        [](http://www.csounds.com/manual/html/socksend.html)

        [**socksend**](http://www.csounds.com/manual/html/socksend.html)
        sends audio data to other processes using the low-level UDP or
        TCP protocols.\

        [**sockrecv**](http://www.csounds.com/manual/html/sockrecv.html)
        receives audio data from other processes using the low-level UDP
        or TCP protocols.

<!-- -->

-   ### HUMAN INTERFACES

    -   #### Widgets

        The FLTK Widgets are integrated in Csound. Information and
        examples can be found
        [here](http://www.csounds.com/manual/html/ControlFltkIntro.html).

        QuteCsound implements a more modern and easy-to-use system for
        widgets. The communication between the widgets and Csound is
        done via
        [invalue](http://www.csounds.com/manual/html/invalue.html) (or
        [chnget](http://www.csounds.com/manual/html/chnget.html)) and
        [outvalue](http://www.csounds.com/manual/html/outvalue.html) (or
        [chnset](http://www.csounds.com/manual/html/chnset.html)).

    -   #### Keys

        [](http://www.csounds.com/manual/html/sensekey.html)[**sensekey**](http://www.csounds.com/manual/html/sensekey.html)
        reads the input of the computer keyboard.

    -   #### Mouse

        [](http://www.csounds.com/manual/html/xyin.html)

        [**xyin**](http://www.csounds.com/manual/html/xyin.html) reads
        the current mouse position. This should be used if your frontend
        does not provide any other means of reading mouse information.

    -   #### WII

        [](http://www.csounds.com/manual/html/wiiconnect.html)

        [**wiiconnect**](http://www.csounds.com/manual/html/wiiconnect.html)
        reads data from a number of external Nintendo Wiimote
        controllers.\

        [**wiidata**](http://www.csounds.com/manual/html/wiidata.html)
        reads data fields from a number of external Nintendo Wiimote
        controllers.\

        [**wiirange**](http://www.csounds.com/manual/html/wiirange.html)
        sets scaling and range limits for certain Wiimote fields.\

        [**wiisend**](http://www.csounds.com/manual/html/wiisend.html)
        sends data to one of a number of external Wii controllers.

    -   #### P5 Glove

        [](http://www.csounds.com/manual/html/p5gconnect.html)

        [**p5gconnect**](http://www.csounds.com/manual/html/p5gconnect.html)
        reads data from an external P5 glove controller.\

        [**p5gdata**](http://www.csounds.com/manual/html/p5gdata.html)
        reads data fields from an external P5 glove controller.
