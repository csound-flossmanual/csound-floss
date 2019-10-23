A. OPEN SOUND CONTROL
=====================

OPEN SOUND CONTROL - NETWORK COMMUNICATION
------------------------------------------

Open Sound Control (OSC) is a network protocol format for musical
control data communication. A few of its advantages compared to MIDI
are, that it\'s more accurate, quicker and much more flexible. With OSC
you can easily send messages to other software independent if it\'s
running on the same machine or over network. There is OSC support in
software like PD, Max/MSP, Chuck or SuperCollider. A nice
[screencast](http://www.youtube.com/watch?v=JX1C3TqP_9Y) of Andrés
Cabrera shows communication between PD and Csound via OSC.^1^ 

OSC messages contain an IP adress with port information and the
data-package, which will be send over network. In Csound, there are two
opcodes, which provide access to network communication called OSCsend
and OSClisten.

***Example 08A01\_osc.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    sr = 48000
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
    ; example by Alex Hofmann (Mar. 2011)

1.  [As another example you can communicate via OSC between Csound and
    Grame\'s Inscore. Find the code at
    https://github.com/joachimheintz/cs\_inscore and video tutorials at
    http://vimeo.com/54160283 (installation) http://vimeo.com/54160405
    (examples)]{#endnote-3bfe72b9-0c89-4f83-8f30-349451938e47}
