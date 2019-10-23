INSTRUMENT CONTROL
==================

OPCODE GUIDE: INSTRUMENT CONTROL
--------------------------------

-   ### SCORE PARAMETER ACCESS

    [](http://www.csounds.com/manual/html/p.html)

    [**p(x)**](http://www.csounds.com/manual/html/p.html) gets the value
    of a specified p-field. (So, \'p(5)\' and \'p5\' both return the
    value of the fifth parameter in a certain score line, but in the
    former case you can insert a variable to specify the p-field.\

    [**pindex**](http://www.csounds.com/manual/html/pindex.html) does
    actually the same, but as an opcode instead of an expression.\

    [**pset**](http://www.csounds.com/manual/html/pset.html) sets
    p-field values in case there is no value from a scoreline.\

    [**passign**](http://www.csounds.com/manual/html/passign.html)
    assigns a range of p-fields to i-variables.\

    [**pcount**](http://www.csounds.com/manual/html/pcount.html) returns
    the number of p-fields belonging to a note event.

-   ### TIME AND TEMPO

    -   #### Time Reading

        [](http://www.csounds.com/manual/html/times.html)

        [**times**](http://www.csounds.com/manual/html/times.html) /
        [**timek**](http://www.csounds.com/manual/html/timek.html)
        return the time in seconds (times) or in control cycles (timek)
        since the start of the current Csound performance.\

        [**timeinsts**](http://www.csounds.com/manual/html/timeinsts.html)
        /
        [**timeinstk**](http://www.csounds.com/manual/html/timeinstk.html)
        return the time in seconds (timeinsts) or in control cycles
        (timeinstk) since the start of the instrument in which they are
        defined.\

        [**date**](http://www.csounds.com/manual/html/date.html) /
        [**dates**](http://www.csounds.com/manual/html/dates.html)
        return the number of seconds since 1 January 1970, using the
        operating system\'s clock, either as a number (date) or as a
        string (dates).\

        [**setscorepos**](http://www.csounds.com/manual/html/setscorepos.html)
        sets the playback position of the current score performance to a
        given position.

    -   #### Tempo Reading

        [](http://www.csounds.com/manual/html/tempo.html)

        [**tempo**](http://www.csounds.com/manual/html/tempo.html)
        allows the performance speed of Csound scored events to be
        controlled from within an orchestra.\

        [**miditempo**](http://www.csounds.com/manual/html/miditempo.html)
        returns the current tempo at k-rate, of either the midi file (if
        available) or the score.

        [**tempoval**](http://www.csounds.com/manual/html/tempoval.html)
        reads the current value of the tempo.

    -   #### Duration Modifications

        [](http://www.csounds.com/manual/html/ihold.html)

        [**ihold**](http://www.csounds.com/manual/html/ihold.html)
        forces a finite-duration note to become a \'held\' note.\

        [**xtratim**](http://www.csounds.com/manual/html/xtratim.html)
        extend the duration of the current instrument instance by a
        specified time duration.

    -   #### Time Signal Generators

        [](http://www.csounds.com/manual/html/metro.html)

        [**metro**](http://www.csounds.com/manual/html/metro.html)
        outputs a metronome-like control signal (1 value impulses
        separated by zeroes). Rate of impulses can be specified as
        impulses per second

        [**mpulse**](http://www.csounds.com/manual/html/mpulse.html)
        generates an impulse for one sample of user definable amplitude,
        followed by a user-definable time gap.

<!-- -->

-   ### CONDITIONS AND LOOPS

    [](http://www.csounds.com/manual/html/changed.html)

    [**changed**](http://www.csounds.com/manual/html/changed.html)
    reports whether any of its k-rate variable inputs has changed.

    [**trigger**](http://www.csounds.com/manual/html/trigger.html)
    informs whether a k-rate signal crosses a certain threshold, either
    in an upward direction, in a downward direction or both.\

    [**if**](http://www.csounds.com/manual/html/if.html) branches
    conditionally at initialisation or during performance time.

    [**loop\_lt**](http://www.csounds.com/manual/html/loop_lt.html),
    [**loop\_le**](http://www.csounds.com/manual/html/loop_le.html),
    [**loop\_gt**](http://www.csounds.com/manual/html/loop_gt.html) and
    [**loop\_ge**](http://www.csounds.com/manual/html/loop_ge.html)
    perform loops either at i-time or at k-rate.

<!-- -->

-   ### PROGRAM FLOW

    [**init**](http://www.csounds.com/manual/html/init.html) initializes
    a k- or a-variable (assigns a value to a k- or a-variable which is
    valid at i-time).\

    [**igoto**](http://www.csounds.com/manual/html/igoto.html) jumps to
    a label at i-time.\

    [**kgoto**](http://www.csounds.com/manual/html/kgoto.html) jumps to
    a label at k-rate.\

    [**timout**](http://www.csounds.com/manual/html/timout.html) jumps
    to a label for a given time. Can be used in conjunction with
    [reinit](http://www.csounds.com/manual/html/reinit.html) to perform
    time loops (see the chapter about Control Structures for more
    information).\

    [**reinit**](http://www.csounds.com/manual/html/reinit.html) /
    [**rigoto**](http://www.csounds.com/manual/html/rigoto.html) /
    [**rireturn**](http://www.csounds.com/manual/html/rireturn.html)
    forces a certain section of code to be reinitialised (i.e. i-rate
    variables will be refreshed).

<!-- -->

-   ### EVENT TRIGGERING

    **[event\_i](http://www.csounds.com/manual/html/event_i.html)** /
    **[event](http://www.csounds.com/manual/html/event.html)**: Generate
    an instrument event at i-time (event\_i) or at k-time (event). Easy
    to use, but you cannot send a string to the subinstrument.

    **[scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html)**
    /
    **[scoreline](http://www.csounds.com/manual/html/scoreline.html)**:
    Generate an instrument at i-time (scoreline\_i) or at k-time
    (scoreline). Like event\_i/event, but you can send to more than one
    instrument but unlike event\_i/event you can send strings. On the
    other hand, you must usually pre-format your scoreline-string using
    sprintf.

    [**schedkwhen**](http://www.csounds.com/manual/html/schedkwhen.html)
    triggers an instrument event at k-time if a certain condition is
    given.\

    [**seqtime**](http://www.csounds.com/manual/html/seqtime.html) /
    [**seqtime2**](http://www.csounds.com/manual/html/seqtime2.html) can
    be used to generate a trigger signal according to time values in a
    function table.

    [**timedseq**](http://www.csounds.com/manual/html/timedseq.html) is
    an event-sequencer in which time can be controlled by a
    time-pointer. Sequence data is stored in a function table or text
    file.

<!-- -->

-   ### INSTRUMENT SUPERVISION

    -   #### Instances And Allocation

        [**active**](http://www.csounds.com/manual/html/active.html)
        returns the number of active instances of an instrument.\

        [**maxalloc**](http://www.csounds.com/manual/html/maxalloc.html)
        limits the number of allocations (instances) of an instrument.\

        [**prealloc**](http://www.csounds.com/manual/html/prealloc.html)
        creates space for instruments but does not run them.

    <!-- -->

    -   #### Turning On And Off

        [**turnon**](http://www.csounds.com/manual/html/turnon.html)
        activates an instrument for an indefinite time.\

        [**turnoff**](http://www.csounds.com/manual/html/turnoff.html) /
        [**turnoff2**](http://www.csounds.com/manual/html/turnoff2.html)
        enables an instrument to turn itself, or another instrument,
        off.\

        [**mute**](http://www.csounds.com/manual/html/mute.html)
        mutes/unmutes new instances of a given instrument.\

        [**remove**](http://www.csounds.com/manual/html/remove.html)
        removes the definition of an instrument as long as it is not in
        use.\

        [**exitnow**](http://www.csounds.com/manual/html/exitnow.html)
        causes Csound to exit as fast as possible and with no cleaning
        up.

    -   #### Named Instruments

        [](http://www.csounds.com/manual/html/nstrnum.html)[**nstrnum**](http://www.csounds.com/manual/html/nstrnum.html)
        returns the number of a named instrument.

<!-- -->

-   ### SIGNAL EXCHANGE AND MIXING

    -   #### chn opcodes

        [**chn\_k**](http://www.csounds.com/manual/html/chn.html),
        [**chn\_a**](http://www.csounds.com/manual/html/chn.html), and
        [**chn\_S**](http://www.csounds.com/manual/html/chn.html)
        declare a control, audio, or string channel. Note that this can
        be done implicitly in most cases by chnset/chnget.

        [**chnset**](http://www.csounds.com/manual/html/chnset.html)
        writes a value (i, k, S or a) to a software channel (which is
        identified by a string as its name).

        [**chnget**](http://www.csounds.com/manual/html/chnget.html)
        gets the value of a named software channel.

        [**chnmix**](http://www.csounds.com/manual/html/chnmix.html)
        writes audio data to an named audio channel, mixing to the
        previous output.\

        [**chnclear**](http://www.csounds.com/manual/html/chnclear.html)
        clears an audio channel of the named software bus to zero.

    -   #### zak  [](http://www.csounds.com/manual/html/chn.html)

        **[zakinit](http://www.csounds.com/manual/html/zakinit.html)**
        initialised zak space for the storage of zak variables.

        **[zaw](http://www.csounds.com/manual/html/zaw.html)**,
        [**zkw**](http://www.csounds.com/manual/html/zkw.html) and
        [**ziw**](http://www.csounds.com/manual/html/ziw.html) write to
        (or overwrite) a-rate, k-rate or i-rate zak variables
        respectively.

        **[zawm](http://www.csounds.com/manual/html/zawm.html)**,
        **[zkwm](http://www.csounds.com/manual/html/zkwm.html)** and
        [**ziwm**](http://www.csounds.com/manual/html/ziw.html) mix
        (accumulate) a-rate, k-rate or i-rate zak variables
        respectively.\

        [**zar**](http://www.csounds.com/manual/html/zar.html),
        [**zkr**](instrument-control/instrument-control/zkr) and
        [**zir**](http://www.csounds.com/manual/html/zir.html) read from
        a-rate, k-rate or i-rate zak variables respectively.\

        [**zacl**](http://www.csounds.com/manual/html/zacl.html) and
        [**zkcl**](http://www.csounds.com/manual/html/zkcl.html) clears
        a range of a-rate or k-rate zak variables respectively.\
