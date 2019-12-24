07 B. TRIGGERING INSTRUMENT INSTANCES
=====================================

Csound's Default System of Instrument Triggering Via Midi
---------------------------------------------------------

Csound has a default system for instrument triggering via midi. Provided
a midi keyboard has been connected and the appropriate command line
flags for midi input have been set (see
[configuring midi](02-c-configuring-midi.md) for further information),
then midi notes received on midi
channel 1 will trigger instrument 1, notes on channel 2 will trigger
instrument 2 and so on. Instruments will turn on and off in sympathy
with notes being pressed and released on the midi keyboard and Csound
will correctly unravel polyphonic layering and turn on and off only the
correct layer of the same instrument begin played. Midi activated notes
can be thought of as "held" notes, similar to notes activated in the
score with a negative duration (p3). Midi activated notes will sustain
indefinitely as long as the performance time will allow until a
corresponding note off has been received - this is unless this infinite
*p3* duration is overwritten within the instrument itself by *p3* begin
explicitly defined.

The following example confirms this default mapping of midi channels to
instruments. You will need a midi keyboard that allows you to change the
midi channel on which it is transmmitting. Besides a written
confirmation to the console of which instrument is begin triggered,
there is an audible confirmation in that instrument 1 plays single
pulses, instrument 2 plays sets of two pulses and instrument 3 plays
sets of three pulses. The example does not go beyond three instruments.
If notes are received on midi channel 4 and above, because corresonding
instruments do not exist, notes on any of these channels will be
directed to instrument 1.


   ***EXAMPLE 07B01_MidiInstrTrigger.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-Ma -odac -m128
;activates all midi devices, real time sound output, suppress note printings
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

gisine ftgen 0,0,2^12,10,1

  instr 1 ; 1 impulse (midi channel 1)
prints "instrument/midi channel: %d%n",p1 ; print instrument number to terminal
reset:                                    ; label 'reset'
     timout 0, 1, impulse                 ; jump to 'impulse' for 1 second
     reinit reset                         ; reninitialise pass from 'reset'
impulse:                                  ; label 'impulse'
aenv expon     1, 0.3, 0.0001             ; a short percussive envelope
aSig poscil    aenv, 500, gisine          ; audio oscillator
     out       aSig                       ; audio to output
  endin

  instr 2 ; 2 impulses (midi channel 2)
prints "instrument/midi channel: %d%n",p1
reset:
     timout 0, 1, impulse
     reinit reset
impulse:
aenv expon     1, 0.3, 0.0001
aSig poscil    aenv, 500, gisine
a2   delay     aSig, 0.15                 ; short delay adds another impulse
     out       aSig+a2                    ; mix two impulses at output
  endin

  instr 3 ; 3 impulses (midi channel 3)
prints "instrument/midi channel: %d%n",p1
reset:
     timout 0, 1, impulse
     reinit reset
impulse:
aenv expon     1, 0.3, 0.0001
aSig poscil    aenv, 500, gisine
a2   delay     aSig, 0.15                 ; delay adds a 2nd impulse
a3   delay     a2, 0.15                   ; delay adds a 3rd impulse
     out       aSig+a2+a3                 ; mix the three impulses at output
  endin

</CsInstruments>
<CsScore>
f 0 300
</CsScore>
<CsoundSynthesizer>
;example by Iain McCurdy
~~~


Using massign to Map MIDI Channels to Instruments
-------------------------------------------------

We can use the
[massign](https://csound.com/docs/manual/massign.html) opcode, which
is used just after the header statement, to explicitly map midi channels
to specific instruments and thereby overrule Csound's default mappings.
*massign* takes two input arguments, the first defines the midi channel
to be redirected and the second defines which instrument it should be
directed to. The following example is identical to the previous one
except that the *massign* statements near the top of the orchestra
jumbles up the default mappings. Midi notes on channel 1 will be mapped
to instrument 3, notes on channel 2 to instrument 1 and notes on channel
3 to instrument 2. Undefined channel mappings will be mapped according
to the default arrangement and once again midi notes on channels for
which an instrument does not exist will be mapped to instrument 1.


   ***EXAMPLE 07B02_massign.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-Ma -odac -m128
; activate all midi devices, real time sound output, suppress note printing
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

gisine ftgen 0,0,2^12,10,1

massign 1,3  ; channel 1 notes directed to instr 3
massign 2,1  ; channel 2 notes directed to instr 1
massign 3,2  ; channel 3 notes directed to instr 2

  instr 1 ; 1 impulse (midi channel 1)
iChn midichn                                  ; discern what midi channel
prints "channel:%d%tinstrument: %d%n",iChn,p1 ; print instr num and midi channel
reset:                                        ; label 'reset'
     timout 0, 1, impulse                     ; jump to 'impulse' for 1 second
     reinit reset                             ; reninitialize pass from 'reset'
impulse:                                      ; label 'impulse'
aenv expon     1, 0.3, 0.0001                 ; a short percussive envelope
aSig poscil    aenv, 500, gisine              ; audio oscillator
     out       aSig                           ; send audio to output
  endin

  instr 2 ; 2 impulses (midi channel 2)
iChn midichn
prints "channel:%d%tinstrument: %d%n",iChn,p1
reset:
     timout 0, 1, impulse
     reinit reset
impulse:
aenv expon     1, 0.3, 0.0001
aSig poscil    aenv, 500, gisine
a2   delay     aSig, 0.15                      ; delay generates a 2nd impulse
     out       aSig+a2                         ; mix two impulses at the output
  endin

  instr 3 ; 3 impulses (midi channel 3)
iChn midichn
prints "channel:%d%tinstrument: %d%n",iChn,p1
reset:
     timout 0, 1, impulse
     reinit reset
impulse:
aenv expon     1, 0.3, 0.0001
aSig poscil    aenv, 500, gisine
a2   delay     aSig, 0.15                      ; delay generates a 2nd impulse
a3   delay     a2, 0.15                        ; delay generates a 3rd impulse
     out       aSig+a2+a3                      ; mix three impulses at output
  endin

</CsInstruments>

<CsScore>
f 0 300
</CsScore>
<CsoundSynthesizer>
;example by Iain McCurdy
~~~

*massign* also has a couple of additional functions that may come in
useful. A channel number of zero is interpreted as meaning *any*. The
following instruction will map notes on any and all channels to
instrument 1.

    massign 0,1

An instrument number of zero is interpreted as meaning *none* so the
following instruction will instruct Csound to ignore triggering for
notes received on all channels.

    massign 0,0

The above feature is useful when we want to scan midi data from an
already active instrument using the
[midiin](https://csound.com/docs/manual/midiin.html) opcode, as we
did in EXAMPLE 0701.csd.


Using Multiple Triggering
-------------------------

Csound's
[event](https://csound.com/docs/manual/event.html)/
[event\_i](https://csound.com/docs/manual/event_i.html)
opcode (see the
[Triggering Instrument Events](03-f-live-events.md) chapter)
makes it possible to trigger any other instrument from a midi-triggered
one. As you can assign a fractional number to an instrument, you can
distinguish the single instances from each other. Below is an example of
using fractional instrument numbers.


   ***EXAMPLE 07B03_MidiTriggerChain.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-Ma
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

          massign   0, 1 ;assign all incoming midi to instr 1
instr 1 ;global midi instrument, calling instr 2.cc.nnn
          ;(c=channel, n=note number)
inote     notnum    ;get midi note number
ichn      midichn   ;get midi channel
instrnum  =         2 + ichn/100 + inote/100000 ;make fractional instr number
     ; -- call with indefinite duration
           event_i   "i", instrnum, 0, -1, ichn, inote
kend      release   ;get a "1" if instrument is turned off
 if kend == 1 then
          event     "i", -instrnum, 0, 1 ;then turn this instance off
 endif
  endin

  instr 2
ichn      =         int(frac(p1)*100)
inote     =         round(frac(frac(p1)*100)*1000)
          prints    "instr %f: ichn = %f, inote = %f%n", p1, ichn, inote
          printks   "instr %f playing!%n", 1, p1
  endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;Example by Joachim Heintz, using code of Victor Lazzarini
~~~


This example merely demonstrates a technique for passing information
about MIDI channel and note number from the directly triggered
instrument to a sub-instrument. A practical application for this would
be for creating keygroups - triggering different instruments by playing
in different regions of the keyboard. In this case you could change just
the line:

    instrnum = 2 + ichn/100 + inote/100000

to this:

    if inote < 48 then
     instrnum = 2
    elseif inote < 72 then
     instrnum = 3
    else
     instrnum = 4
    endif
    instrnum = instrnum + ichn/100 + inote/100000

In this case for any key below C3 instrument 2 will be called, for any
key between C3 and B4 instrument 3, and for any higher key instrument 4.

Using this multiple triggering you are also able to trigger more than
one instrument at the same time (which is not possible using the
*massign* opcode). Here is an example using a User Defined Opcode (see
the [UDO chapter](03-g-user-defined-opcodes.md) of this manual):


   ***EXAMPLE 07B04_MidiMultiTrigg.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-Ma
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

          massign   0, 1 ;assign all incoming midi to instr 1
giInstrs  ftgen     0, 0, -5, -2, 2, 3, 4, 10, 100 ;instruments to be triggered

 opcode MidiTrig, 0, io
;triggers the first inum instruments in the function table ifn by a midi event,
; with fractional numbers containing channel and note number information

; -- if inum=0 or not given, all instrument numbers in ifn are triggered
ifn, inum  xin
inum      =         (inum == 0 ? ftlen(ifn) : inum)
inote     notnum
ichn      midichn
iturnon   =         0
turnon:
iinstrnum tab_i     iturnon, ifn
if iinstrnum > 0 then
ifracnum  =         iinstrnum + ichn/100 + inote/100000
         event_i   "i", ifracnum, 0, -1
endif
         loop_lt   iturnon, 1, inum, turnon
kend      release
if kend == 1 then
kturnoff  =         0
turnoff:
kinstrnum tab       kturnoff, ifn
 if kinstrnum > 0 then
kfracnum  =         kinstrnum + ichn/100 + inote/100000
         event     "i", -kfracnum, 0, 1
         loop_lt   kturnoff, 1, inum, turnoff
 endif
endif
 endop

 instr 1 ;global midi instrument
; -- trigger the first two instruments in the giInstrs table
         MidiTrig  giInstrs, 2
 endin

 instr 2
ichn      =         int(frac(p1)*100)
inote     =         round(frac(frac(p1)*100)*1000)
         prints    "instr %f: ichn = %f, inote = %f%n", p1, ichn, inote
         printks   "instr %f playing!%n", 1, p1
 endin

 instr 3
ichn      =         int(frac(p1)*100)
inote     =         round(frac(frac(p1)*100)*1000)
         prints    "instr %f: ichn = %f, inote = %f%n", p1, ichn, inote
         printks   "instr %f playing!%n", 1, p1
 endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
;Example by Joachim Heintz, using code of Victor Lazzarini
~~~
