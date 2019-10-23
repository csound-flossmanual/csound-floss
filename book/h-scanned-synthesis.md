H. SCANNED SYNTHESIS
====================

Scanned Synthesis is a relatively new synthesis technique invented by
Max Mathews, Rob Shaw and Bill Verplank at Interval Research in 2000.
This algorithm uses a combination of a table-lookup oscillator and Sir
Issac Newton\'s mechanical model (equation) of a mass and spring system
to dynamically change the values stored in an f-table. The sonic result
is a timbral spectrum that changes with time.

Csound has a couple opcodes dedicated to scanned synthesis, and these
opcodes can be used not only to make sounds, but also to generate
dynamic f-tables for use with other Csound opcodes.

A QUICK SCANNED SYNTH
---------------------

The quickest way to start using scanned synthesis is Matt Ingalls\'
opcode
*[scantable](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis").*

    a1 scantable iamp, kfrq, ipos, imass, istiff, idamp, ivel 

The arguments *iamp* and *kfrq* should be familiar, amplitude and
frequency respectively. The other arguments are f-table numbers
containing data known in the scanned synthesis world as **profiles**.

PROFILES
--------

Profiles refer to variables in the mass and spring equation. Newton\'s
model describes a string as a finite series of marbles connected to each
other with springs.

In this example we will use 128 marbles in our system. To the Csound
user, profiles are a series of f-tables that set up the
[*scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis")
opcode. To the opcode, these f-tables influence the dynamic behavior of
the table read by a table-lookup oscillator.

    gipos ftgen 1, 0, 128, 10, 1 ;Initial Shape: Sine wave range -1 to 1 
    gimass ftgen 2, 0, 128, -7, 1, 1 ;Masses: Constant value 1 
    gistiff ftgen 3, 0, 128, -7, 50, 64, 100, 64, 0 ;Stiffness: Unipolar triangle range to 100 
    gidamp ftgen 4, 0, 128, -7, 1, 128, 1 ;Damping: Constant value 1 
    givel ftgen 5, 0, 128, -7, 0, 128, 0 ;Initial Velocity: Constant value 0 

These tables need to be the same size as each other or Csound will
return an error.

Run the following *.csd.* Notice that the sound starts off sounding like
our intial shape (a sine wave) but evolves as if there are filters,
distortions or LFO\'s.

***EXAMPLE 04H01\_scantable.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    nchnls = 2
    sr=44100
    ksmps = 32
    0dbfs = 1

    gipos ftgen 1, 0, 128, 10, 1 ;Initial Shape, sine wave range -1 to 1
    gimass ftgen 2, 0, 128, -7, 1, 128, 1 ;Masses(adj.), constant value 1
    gistiff ftgen 3, 0, 128, -7, 50, 64, 100, 64, 0 ;Stiffness; unipolar triangle range 0 to 100
    gidamp ftgen 4, 0, 128, -7, 1, 128, 1 ;Damping; constant value 1
    givel ftgen 5, 0, 128, -7, 0, 128, 0 ;Initial Velocity; constant value 0

     instr 1
    iamp = .7
    kfrq = 440
    a1 scantable iamp, kfrq, gipos, gimass, gistiff, gidamp, givel
    a1 dcblock2 a1
     outs a1, a1
     endin

    </CsInstruments>
    <CsScore>
    i 1 0 10
    e
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

But as you see no effects or control signals in the .csd, just a synth!

This is the power of scanned synthesis. It produces a dynamic spectrum
with \"just\" an oscillator. Imagine now applying a scanned synthesis
oscillator to all your favorite synth techniques - Subtractive,
Waveshaping, FM, Granular and more.

Recall from the subtractive synthesis technique, that the \"shape\" of
the waveform of your oscillator has a huge effect on the way the
oscillator sounds. In scanned synthesis, the shape is in motion and
these f-tables control how the shape moves.

DYNAMIC TABLES
--------------

The
[*scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis")
opcode makes it easy to use dynamic f-tables in other csound opcodes.
The example below sounds exactly like the above .csd, but it
demonstrates how the f-table set into motion by scantable can be used by
other csound opcodes.

***EXAMPLE 04H02\_Dynamic\_tables.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    nchnls = 2
    sr=44100
    ksmps = 32
    0dbfs = 1

    gipos      ftgen      1, 0, 128, 10, 1 ;Initial Shape, sine wave range -1 to 1;
    gimass     ftgen      2, 0, 128, -7, 1, 128, 1 ;Masses(adj.), constant value 1
    gistiff    ftgen      3, 0, 128, -7, 50, 64, 100, 64, 0 ;Stiffness; unipolar triangle range 0 to 100
    gidamp     ftgen      4, 0, 128, -7, 1, 128, 1 ;Damping; constant value 1
    givel      ftgen      5, 0, 128, -7, 0, 128, 0 ;Initial Velocity; constant value 0

    instr 1
    iamp       =          .7
    kfrq       =          440
    a0         scantable  iamp, kfrq, gipos, gimass, gistiff, gidamp, givel ;
    a1         oscil3     iamp, kfrq, gipos
    a1         dcblock2   a1
               outs       a1, a1
    endin
    </CsInstruments>
    <CsScore>
    i 1 0 10
    e
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

Above we use a table-lookup oscillator to periodically read a dynamic
table.

Below is an example of using the values of an f-table generated by
[*scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis"),
to modify the amplitudes of an fsig, a signal type in csound which
represents a spectral signal.

***EXAMPLE 04H03\_Scantable\_pvsmaska.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    nchnls = 2
    sr=44100
    ksmps = 32
    0dbfs = 1

    gipos      ftgen      1, 0, 128, 10, 1                  ;Initial Shape, sine wave range -1 to 1;
    gimass     ftgen      2, 0, 128, -7, 1, 128, 1          ;Masses(adj.), constant value 1
    gistiff    ftgen      3, 0, 128, -7, 50, 64, 100, 64, 0 ;Stiffness; unipolar triangle range 0 to 100
    gidamp     ftgen      4, 0, 128, -7, 1, 128, 1          ;Damping; constant value 1
    givel      ftgen      5, 0, 128, -7, 0, 128, 0          ;Initial Velocity; constant value 0
    gisin      ftgen      6, 0,8192, 10, 1                  ;Sine wave for buzz opcode

    instr 1
    iamp       =          .7
    kfrq       =          110
    a1         buzz       iamp, kfrq, 32, gisin
               outs       a1, a1
    endin
    instr 2
    iamp       =          .7
    kfrq       =          110
    a0         scantable  1, 10, gipos, gimass, gistiff, gidamp, givel ;
    ifftsize   =          128
    ioverlap   =          ifftsize / 4
    iwinsize   =          ifftsize
    iwinshape  =          1; von-Hann window
    a1         buzz       iamp, kfrq, 32, gisin
    fftin      pvsanal    a1, ifftsize, ioverlap, iwinsize, iwinshape; fft-analysis of file
    fmask      pvsmaska   fftin, 1, 1
    a2         pvsynth    fmask; resynthesize
               outs       a2, a2
    endin
    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 2 5 10
    e
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders</code>

In this .csd, the score plays instrument 1, a normal buzz sound, and
then the score plays instrument 2 \-- the same buzz sound re-synthesized
with amplitudes of each of the 128 frequency bands, controlled by a
dynamic f-table. 

A MORE FLEXIBLE SCANNED SYNTH
-----------------------------

[*Scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis")
can do a lot for us, it can synthesize an interesting, time-varying
timbre using a table lookup oscillator, or animate an f-table for use in
other Csound opcodes. However, there are other scanned synthesis opcodes
that can take our expressive use of the algorithm even further.

The opcodes
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis")
and
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
by Paris Smaragdis give the Csound user one of the most robust and
flexible scanned synthesis environments. These opcodes work in tandem to
first set up the dynamic wavetable, and then to \"scan\" the dynamic
table in ways a table-lookup oscillator cannot.

The opcode
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
takes 18 arguments and sets a table into motion.

     scanu ipos, irate, ifnvel, ifnmass, ifnstif, ifncentr, ifndamp, kmass, kstif, kcentr, kdamp, ileft, iright, kpos, kstrngth, ain, idisp, id 

For a detailed description of what each argument does, see the [Csound
Reference
Manual](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis");
I will discuss the various types of arguments in the opcode.

The first set of arguments - *ipos, irate, ifnvel, ifnmass, ifnstiff,
ifncenter*, and *ifndamp* - are f-tables describing the profiles,
similar to the profile arguments for *scantable*. *Scanu* takes 6
f-tables instead of *scantable\'s* 5. Like
*[scantable](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis"),*
these need to be f-tables of the same size, or Csound will return an
error.

An exception to this size requirement is the `ifnstiff` table. This
table is the size of the other profiles squared. If the other f-tables
are size 128, then *ifnstiff* should be of size 16384 (or 128 \* 128).
To discuss what this table does, I must first introduce the concept of a
scanned matrix.

THE SCANNED MATRIX
------------------

The scanned matrix is a convention designed to describe the shape of the
connections of masses(**n.**) in the mass(**n.**) and spring model.

Going back to our discussion on Newton\'s mechanical model, the
mass(**n.**) and spring model describes the behavior of a string as a
finite number of masses connected by springs. As you can imagine, the
masses are connected sequentially, one to another, like beads on a
string. Mass(**n.**) \#1 is connected to \#2, \#2 connected to \#3 and
so on. However, the pioneers of scanned synthesis had the idea to
connect the masses in a non-linear way. It\'s hard to imagine, because
as musicians, we have experience with piano or violin strings (one
dimensional strings), but not with multi-dimensional strings.
Fortunately, the computer has no problem working with this idea, and the
flexibility of Newton\'s equation allows us to use the CPU to model
mass(**n.**) \#1 being connected with springs not only to \#2 but also
to \#3 and any other mass(**n.**) in the model.

The most direct and useful implementation of this concept is to connect
mass \#1 to mass \#2 and mass \#128 \-- forming a string without
endpoints, a circular string, like tying our string with beads to make a
necklace. The pioneers of scanned synthesis discovered that this
circular string model is more useful than a conventional one-dimensional
string model with endpoints. In fact,
*[scantable](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis")*
uses a circular string.

The matrix is described in a simple ASCII file, imported into Csound via
a GEN23 generated f-table.

    f3 0 16384 -23 "string-128" 

This text file **must** be located in the same directory as your .csd or
csound will give you this error

`ftable 3: error opening ASCII file`

You can construct your own matrix using Stephen Yi\'s Scanned Matrix
editor included in the Blue frontend for Csound, and as a standalone
Java application [Scanned Synthesis Matrix
Editor](http://www.csounds.com/stevenyi/scanned/ "Steven Yi's Page on experimenting with Scanned Synthesis").

To swap out matrices, simply type the name of a different matrix file
into the double quotes, i.e.:

    f3 0 16384 -23 "circularstring_2-128"

Different matrices have unique effects on the behavior of the system.
Some matrices can make the synth extremely loud, others extremely quiet.
Experiment with using different matrices.

Now would be a good time to point out that Csound has other scanned
synthesis opcodes preceded with an \"x\",
*[xscans](http://www.csounds.com/manual/html/xscans.html "Steven Yi's Page on experimenting with Scanned Synthesis"),
[xscanu](http://www.csounds.com/manual/html/xscanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")*,
that use a different matrix format than the one used by
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis"),
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis"),
and Stephen Yi\'s Scanned Matrix Editor. The Csound Reference Manual has
more information on this.

THE HAMMER
----------

If the initial shape, an f-table specified by the ipos argument
determines the shape of the initial contents in our dynamic table. If
you use autocomplete in CsoundQT, the
[scanu](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
opcode line highlights the first p-field of scanu as the \"init\"
opcode. In my examples I use \"ipos\" to avoid p1 of scanu being
syntax-highlighted. But what if we want to \"reset\" or \"pluck\" the
table, perhaps with a shape of a square wave instead of a sine wave,
while the instrument is playing?

With
[*scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis"),
there is an easy way to to this, send a score event changing the
contents of the dynamic f-table. You can do this with the Csound score
by adjusting the start time of the f-events in the score.

***EXAMPLE 04H04\_Hammer.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    sr=44100
    kr=4410
    ksmps=10
    nchnls=2
    0dbfs=1

    instr 1
    ipos       ftgen      1, 0, 128, 10, 1 ; Initial Shape, sine wave range -1 to 1;
    imass      ftgen      2, 0, 128, -7, 1, 128, 1 ;Masses(adj.), constant value 1
    istiff     ftgen      3, 0, 128, -7, 50, 64, 100, 64, 0 ;Stiffness; unipolar triangle range 0 to 100
    idamp      ftgen      4, 0, 128, -7, 1, 128, 1; ;Damping; constant value 1
    ivel       ftgen      5, 0, 128, -7, 0, 128, 0 ;Initial Velocity; constant value 0
    iamp       =          0.5
    a1         scantable  iamp, 60, ipos, imass, istiff, idamp, ivel
               outs       a1, a1
    endin
    </CsInstruments>
    <CsScore>
    i 1 0 14
    f 1 1 128 10 1 1 1 1 1 1 1 1 1 1 1
    f 1 2 128 10 1 1 0 0 0 0 0 0 0 1 1
    f 1 3 128 10 1 1 1 1 1
    f 1 4 128 10 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
    f 1 5 128 10 1 1
    f 1 6 128 13 1 1 0 0 0 -.1 0 .3 0 -.5 0 .7 0 -.9 0 1 0 -1 0
    f 1 7 128 21 6 5.745
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders</code>

You\'ll get the warning

    WARNING: replacing previous ftable 1 

This is not a bad thing, it means this method of hammering the string is
working. In fact you could use this method to explore and hammer every
possible GEN routine in Csound.
[GEN10](http://www.csounds.com/manual/html/GEN10.html "Steven Yi's Page on experimenting with Scanned Synthesis")
(sines), [GEN
21](http://www.csounds.com/manual/html/GEN21.html "Steven Yi's Page on experimenting with Scanned Synthesis")
(noise) and [GEN
27](http://www.csounds.com/manual/html/GEN27.html "Steven Yi's Page on experimenting with Scanned Synthesis")
(breakpoint functions) could keep you occupied for a while.

Unipolar waves have a different sound but a loss in volume can occur.
There is a way to do this with
*[scanu](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis"),*
but I do not use this feature and just use these values instead.

     ileft = 0. iright = 1. kpos = 0. kstrngth = 0. 

MORE ON PROFILES
----------------

One of the biggest challenges in understanding scanned synthesis is the
concept of profiles.

Setting up the opcode
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
requires 3 profiles - Centering, Mass and Damping. The pioneers of
scanned synthesis discovered early on that the resultant timbre is far
more interesting if marble \#1 had a different centering force than mass
\#64.

The farther our model gets away from a physical real-world string that
we know and pluck on our guitars and pianos, the more interesting the
sounds for synthesis. Therefore, instead of one mass, and damping, and
centering value for all 128 of the marbles each marble can have its own
conditions. How the centering, mass, and damping profiles make the
system behave is up to the user to discover through experimentation
(more on how to experiment safely later in this chapter).

CONTROL RATE PROFILE SCALARS
----------------------------

Profiles are a detailed way to control the behavior of the string, but
what if we want to influence the mass or centering or damping of every
marble **after** a note has been activated and while its playing?

[*Scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
gives us 4 k-rate arguments *kmass, kstif, kcentr, kdamp*, to scale
these forces. One could scale mass to volume, or have an envelope
controlling centering.

**Caution!** These parameters can make the scanned system unstable in
ways that could make **extremely** loud sounds come out of your
computer. It is best to experiment with small changes in range and keep
your headphones off. A good place to start experimenting is with
different values for *kcentr* while keeping *kmass*, *kstiff*, and
*kdamp* constant. You could also scale mass and stiffness to MIDI
velocity.

AUDIO INJECTION
---------------

Instead of using the hammer method to move the marbles around, we could
use audio to add motion to the mass and spring model. *Scanu* lets us do
this with a simple audio rate argument. When the Reference manual says
\"amplitude should not be too great\" **it means it.**

A good place to start is by scaling down the audio in the opcode line.

     ain/2000 

It is always a good idea to take into account the 0dbfs statement in the
header. Simply put if 0dbfs =1 and you send *scans* an audio signal with
a value of 1, you and your immediate neighbors are in for a very loud
ugly sound.

**amplitude should not be too great!**

To bypass audio injection all together, simply assign 0 to an a-rate
variable.

     ain = 0 

and use this variable as the argument.

CONNECTING TO SCANS
-------------------

The p-field id is an arbitrary integer label that tells the scans opcode
which
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
to read. By making the value of id negative, the arbitrary numerical
label becomes the number of an f-table that can be used by any other
opcode in Csound, like we did with
[*scantable*](http://www.csounds.com/manual/html/scantable.html "Steven Yi's Page on experimenting with Scanned Synthesis")
earlier in this chapter.

We could then use
[*oscil*](http://www.csounds.com/manual/html/oscil.html "Steven Yi's Page on experimenting with Scanned Synthesis")
to perform a table lookup algorithm to make sound out of
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
(as long as id is negative), but
[*scanu*](http://www.csounds.com/manual/html/scanu.html "Steven Yi's Page on experimenting with Scanned Synthesis")
has a companion opcode,
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis")
which has 1 more argument than
[*oscil*](http://www.csounds.com/manual/html/oscil.html "Steven Yi's Page on experimenting with Scanned Synthesis").
This argument is the number of an f-table containing the scan
trajectory.

SCAN TRAJECTORIES
-----------------

One thing we have take for granted so far with
[*oscil*](http://www.csounds.com/manual/html/oscil.html "Steven Yi's Page on experimenting with Scanned Synthesis")
is that the wave table is read front to back. If you regard oscil as a
phasor and table pair, the first index of the table is always read first
and the last index is always read last as in the example below:

***EXAMPLE 04H05\_Scan\_trajectories.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>

    sr=44100
    kr=4410
    ksmps=10
    nchnls=2
    0dbfs=1

    instr 1
    andx phasor 440
    a1 table andx*8192, 1
    outs a1*.2, a1*.2
    endin
    </CsInstruments>
    <CsScore>

    f1 0 8192 10 1
    i 1 0 4
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

But what if we wanted to read the table indices back to front, or even
\"out of order\"? Well we could do something like this:

***EXAMPLE 04H06\_Scan\_trajectories2.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    sr=44100
    kr=4410
    ksmps=10
    nchnls=2 ; STEREO
    0dbfs=1
    instr 1
    andx phasor 440
    andx table andx*8192, 1  ; read the table out of order!
    a1   table andx*8192, 1
    outs a1*.2, a1*.2
    endin
    </CsInstruments>
    <CsScore>

    f1 0 8192 10 1
    f2 0 8192 -5 .001 8192 1;
    i 1 0 4
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

We are still dealing with 2-dimensional arrays, or f-tables as we know
them. But if we remember back to our conversation about the scanned
matrix, matrices are multi-dimensional, it would be a shame to only read
them in \"2D\".

The opcode
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis")
gives us the flexibility of specifying a scan trajectory, analogous to
telling the phasor/table combination to read values non-consecutively.
We could read these values, not left to right, but in a spiral order, by
specifying a table to be the *ifntraj* argument of
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis").

    a3 scans iamp, kpch, ifntraj ,id , interp 

An f-table for the spiral method can generated by reading the ASCII file
\"spiral-8,16,128,2,1over2\" by GEN23

    f2 0 128 -23 "spiral-8,16,128,2,1over2" 

 

The following .csd requires that the files \"circularstring-128\" and
\"spiral-8,16, 128,2,1over2\" be located in the same directory as the
.csd.

***EXAMPLE 04H07\_Scan\_matrices.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    nchnls = 2
    sr = 44100
    ksmps = 10
    0dbfs = 1
    instr 1
    ipos ftgen 1, 0, 128, 10, 1
    irate = .005
    ifnvel ftgen 6, 0, 128, -7, 0, 128, 0
    ifnmass ftgen 2, 0, 128, -7, 1, 128, 1
    ifnstif ftgen 3, 0, 16384,-23,"circularstring-128"
    ifncentr ftgen 4, 0, 128, -7, 0, 128, 2
    ifndamp ftgen 5, 0, 128, -7, 1, 128, 1
    imass = 2
    istif = 1.1
    icentr = .1
    idamp = -0.01
    ileft = 0.
    iright = .5
    ipos = 0.
    istrngth = 0.
    ain = 0
    idisp = 0
    id = 8
    scanu 1, irate, ifnvel, ifnmass, ifnstif, ifncentr, ifndamp, imass, istif, icentr, idamp, ileft, iright, ipos, istrngth, ain, idisp, id
    scanu 1,.007,6,2,3,4,5, 2, 1.10 ,.10 ,0 ,.1 ,.5, 0, 0,ain,1,2;
    iamp = .2
    ifreq = 200
    a1 scans iamp, ifreq, 7, id
    a1 dcblock a1
    outs a1, a1
    endin
    </CsInstruments>
    <CsScore>
    f7 0 128 -7 0 128 128
    i 1 0 5
    f7 5 128 -23 "spiral-8,16,128,2,1over2"
    i 1 5 5
    f7 10 128 -7 127 64 1 63 127
    i 1 10 5
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

Notice that the scan trajectory has an FM-like effect on the sound.

TABLE SIZE AND INTERPOLATION
----------------------------

Tables used for scan trajectory must be the same size (have the same
number of indices) as the mass, centering and damping tables and must
also have the same range as the size of these tables. For example, in
our .csd we\'ve been using 128 point tables for initial position, mass
centering, damping (our stiffness tables have 128 squared). So our
trajectory tables must be of size 128, and contain values from 0 to 127.

One can use larger or smaller tables, but their sizes must agree in this
way or Csound will give you an error. Larger tables, of course
significantly increase CPU usage and slow down real-time performance.

If all the sizes are multiples of a number (128), we can use Csound\'s
Macro language extension to define the table size as a macro, and then
change the definition twice (once for the orc and once for the score)
instead of 10 times.

***EXAMPLE 04H08\_Scan\_tablesize.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>
    nchnls = 2
    sr = 44100
    ksmps = 10
    0dbfs = 1
    #define SIZE #128#
    instr 1
    ipos ftgen 1, 0, $SIZE., 10, 1
    irate = .005
    ifnvel ftgen 6, 0, $SIZE., -7, 0, $SIZE., 0
    ifnmass ftgen 2, 0, $SIZE., -7, 1, $SIZE., 1
    ifnstif ftgen 3, 0, $SIZE.*$SIZE.,-23, "circularstring-$SIZE."
    ifncentr ftgen 4, 0, $SIZE., -7, 0, $SIZE., 2
    ifndamp ftgen 5, 0, $SIZE., -7, 1, $SIZE., 1
    imass = 2
    istif = 1.1
    icentr = .1
    idamp = -0.01
    ileft = 0.
    iright = .5
    ipos = 0.
    istrngth = 0.
    ain = 0
    idisp = 0
    id = 8
            
    scanu 1, irate, ifnvel, ifnmass, ifnstif, ifncentr, ifndamp, imass, istif, icentr, idamp, ileft, iright, ipos, istrngth, ain, idisp, id
    scanu 1,.007,6,2,3,4,5, 2, 1.10 ,.10 ,0 ,.1 ,.5, 0, 0,ain,1,2;
    iamp = .2
    ifreq = 200
    a1 scans iamp, ifreq, 7, id, 4
    a1 dcblock a1
    outs a1, a1
    endin
    </CsInstruments>
    <CsScore>
    #define SIZE #128#
    f7 0 $SIZE. -7 0 $SIZE. $SIZE.
    i 1 0 5
    f7 5 $SIZE. -7 0 63 [$SIZE.-1] 63 0
    i 1 5 5
    f7 10 $SIZE. -7 [$SIZE.-1] 64 1 63 [$SIZE.-1]
    i 1 10 5
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

Macros even work in our string literal in our [GEN
23](http://www.csounds.com/manual/html/GEN23.html "Steven Yi's Page on experimenting with Scanned Synthesis")
f-table! But if you define size as 64 and there isn\'t a file in your
directory named \"circularstring-64\" Csound will not run your score and
give you an error. Here is a [link to download power-of-two size ASCII
files](http://csounds.com/scanned/scanned_synthesis_matricies.zip "Steven Yi's Page on experimenting with Scanned Synthesis")
that create circular matrices for use in this way, and of course, you
can design your own stiffness matrix files with [Steven Yi\'s scanned
matrix
editor](http://www.csounds.com/stevenyi/scanned/ "Steven Yi's Page on experimenting with Scanned Synthesis").

When using smaller size tables it may be necessary to use interpolation
to avoid the artifacts of a small table. *scans* gives us this option as
a fifth optional argument, *iorder,* detailed in the reference manual
and worth experimenting with.

Using the opcodes scanu and scans require that we fill in 22 arguments
and create at least 7 f-tables, including at least one external ASCII
file (because no one wants to fill in 16,384 arguments to an
f-statement). This a very challenging pair of opcodes. The beauty of
scanned synthesis is that there is no scanned synthesis \"sound\".

USING BALANCE TO TAME AMPLITUDES
--------------------------------

However, like this frontier can be a lawless, dangerous place. When
experimenting with scanned synthesis parameters, one can illicit
extraordinarily loud sounds out of Csound, often by something as simple
as a misplaced decimal point.

**Warning: the following .csd is hot, it produces massively loud
amplitude values. Be very cautious about rendering this .csd, I highly
recommend rendering to a file instead of real-time.\
**

***EXAMPLE 04H09\_Scan\_extreme\_amplitude.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>

    nchnls = 2
    sr = 44100
    ksmps = 256
    0dbfs = 1
    ;NOTE THIS CSD WILL NOT RUN UNLESS
    ;IT IS IN THE SAME FOLDER AS THE FILE "STRING-128"
    instr 1
    ipos ftgen 1, 0, 128 , 10, 1
    irate = .007
    ifnvel ftgen 6, 0, 128 , -7, 0, 128, 0.1
    ifnmass ftgen 2, 0, 128 , -7, 1, 128, 1
    ifnstif ftgen 3, 0, 16384, -23, "string-128"
    ifncentr ftgen 4, 0, 128 , -7, 1, 128, 2
    ifndamp ftgen 5, 0, 128 , -7, 1, 128, 1
    kmass = 1
    kstif = 0.1
    kcentr = .01
    kdamp = 1
    ileft = 0
    iright = 1
    kpos = 0
    kstrngth = 0.
    ain = 0
    idisp = 1
    id = 22
    scanu ipos, irate, ifnvel, ifnmass, \
    ifnstif, ifncentr, ifndamp, kmass, \
    kstif, kcentr, kdamp, ileft, iright,\
    kpos, kstrngth, ain, idisp, id
    kamp = 0dbfs*.2
    kfreq = 200
    ifn ftgen 7, 0, 128, -5, .001, 128, 128.
    a1 scans kamp, kfreq, ifn, id
    a1 dcblock2 a1
    iatt = .005
    idec = 1
    islev = 1
    irel = 2
    aenv adsr iatt, idec, islev, irel
    ;outs a1*aenv,a1*aenv; Uncomment for speaker destruction;
    endin
    </CsInstruments>
    <CsScore>
    f8 0 8192 10 1;
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

The extreme volume of this .csd comes from a value given to scanu

`kdamp = .1`

.1 is not exactly a safe value for this argument, in fact, any value
above 0 for this argument can cause chaos.

It would take a skilled mathematician to map out safe possible ranges
for all the arguments of scanu. I figured out these values through a mix
of trial and error and **studying other .csd**

We can use the opcode
[balance](http://www.csounds.com/manual/html/balance.html "Steven Yi's Page on experimenting with Scanned Synthesis")
to listen to sine wave (a signal with consistent, safe amplitude) and
squash down our extremely loud scanned synth output (which is loud only
because of our intentional carelessness.)

***EXAMPLE 04H10\_Scan\_balanced\_amplitudes.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>

    nchnls = 2
    sr = 44100
    ksmps = 256
    0dbfs = 1
    ;NOTE THIS CSD WILL NOT RUN UNLESS
    ;IT IS IN THE SAME FOLDER AS THE FILE "STRING-128"

    instr 1
    ipos ftgen 1, 0, 128 , 10, 1
    irate = .007
    ifnvel   ftgen 6, 0, 128 , -7, 0, 128, 0.1
    ifnmass  ftgen 2, 0, 128 , -7, 1, 128, 1
    ifnstif  ftgen 3, 0, 16384, -23, "string-128"
    ifncentr ftgen 4, 0, 128 , -7, 1, 128, 2
    ifndamp  ftgen 5, 0, 128 , -7, 1, 128, 1
    kmass = 1
    kstif = 0.1
    kcentr = .01
    kdamp = -0.01
    ileft = 0
    iright = 1
    kpos = 0
    kstrngth = 0.
    ain = 0
    idisp = 1
    id = 22
    scanu ipos, irate, ifnvel, ifnmass, \
    ifnstif, ifncentr, ifndamp, kmass, \
    kstif, kcentr, kdamp, ileft, iright,\
    kpos, kstrngth, ain, idisp, id
    kamp = 0dbfs*.2
    kfreq = 200
    ifn ftgen 7, 0, 128, -5, .001, 128, 128.
    a1 scans kamp, kfreq, ifn, id
    a1 dcblock2 a1
    ifnsine ftgen 8, 0, 8192, 10, 1
    a2 oscil kamp, kfreq, ifnsine
    a1 balance a1, a2
    iatt = .005
    idec = 1
    islev = 1
    irel = 2
    aenv adsr iatt, idec, islev, irel
    outs a1*aenv,a1*aenv
    endin
    </CsInstruments>
    <CsScore>
    f8 0 8192 10 1;
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Christopher Saunders

 

It must be emphasized that this is merely a safeguard. We still get
samples out of range when we run this .csd, but many less than if we had
not used balance. It is recommended to use balance if you are doing
real-time mapping of k-rate profile scalar arguments for
[*scans*](http://www.csounds.com/manual/html/scans.html "Steven Yi's Page on experimenting with Scanned Synthesis");
mass stiffness, damping, and centering.

REFERENCES AND FURTHER READING
------------------------------

Max Matthews, Bill Verplank, Rob Shaw, Paris Smaragdis, Richard
Boulanger, John ffitch, Matthew Gilliard, Matt Ingalls, and Steven Yi
all worked to make scanned synthesis usable, stable and openly available
to the open-source Csound community. Their contributions are in the
reference manual, several academic papers on scanned synthesis and
journal articles, and the software that supports the Csound community.

-   [Csounds.com page on Scanned
    Synthesis](http://www.csounds.com/scanned/ "Steven Yi's Page on experimenting with Scanned Synthesis")
-   [Dr. Richard Boulanger\'s tutorial on Scanned
    Synthesis](http://www.csounds.com/scanned/toot/index.html%20 "Steven Yi's Page on experimenting with Scanned Synthesis")
-   [Steven Yi\'s Page on experimenting with Scanned
    Synthesis](http://www.csounds.com/stevenyi/scanned/yi_scannedSynthesis.html%20 "Steven Yi's Page on experimenting with Scanned Synthesis")
