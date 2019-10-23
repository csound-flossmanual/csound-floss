DATA
====

OPCODE GUIDE: DATA
------------------

-   ### BUFFER / FUNCTION TABLES

    See the chapter about [function
    tables](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES)
    for more detailed information. \

    -   #### Creating Function Tables (Buffers)

        [**ftgen**](http://www.csounds.com/manual/html/ftgen.html) can
        generates function tables from within the orchestra. The
        function table will exist until the end of the current Csound
        performance. Different [GEN
        Routines](http://www.csounds.com/manual/html/ScoreGenRef.html)
        are used to fill a function table with different kinds of data.
        This could be waveforms, sound files, envelopes, window
        functions and so on.

    -   #### Writing To Tables

        **[tableiw](http://www.csounds.com/manual/html/tableiw.html)** /
        **[tablew](http://www.csounds.com/manual/html/tablew.html)**:
        Write values to a function table at i-rate (tableiw), k-rate and
        a-rate (tablew). These opcodes provide many options and are
        robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tabw\_i](http://www.csounds.com/manual/html/tab.html)** /
        **[tabw](http://www.csounds.com/manual/html/tab.html)**: Write
        values to a function table at i-rate (tabw\_i), k-rate or a-rate
        (tabw). These opcodes offer fewer options than tableiw and
        tablew but will work consistently with non-power-of-two table
        sizes. They do not provide a boundary check on index values
        given to them which makes them fast but also then demands user
        responsibility in protecting against invalid index values.

    -   #### Reading From Tables 

        **[table](http://www.csounds.com/manual/html/table.html)** /
        **[tablei](http://www.csounds.com/manual/html/tablei.html)** /
        **[table3](http://www.csounds.com/manual/html/table3.html)**:
        Read values from a function table at any rate, either by direct
        indexing (table), or by linear interpolation (tablei) or cubic
        interpolation (table3). These opcodes provide many options and
        are robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tab\_i](http://www.csounds.com/manual/html/tab.html)** /
        **[tab](http://www.csounds.com/manual/html/tab.html)**: Read
        values from a function table at i-rate (tab\_i), k-rate or
        a-rate (tab). They offer no interpolation and fewer options than
        the table opcodes but they will also work with non-power-of-two
        table sizes. They do not provide a boundary check which makes
        them fast but also give the user the responsibility not to read
        any value beyond the table boundaries.

    -   #### Saving Tables to Files 

        **[ftsave](http://www.csounds.com/manual/html/ftsave.html)** /
        **[ftsavek](http://www.csounds.com/manual/html/ftsavek.html)**:
        Save a function table as a file, at i-time (ftsave) or at k-rate
        (ftsavek). These files can be text files or binary files but not
        sound files. To save a table as a sound file you can use the
        user defined opcode
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122). 

    -   #### Reading Tables From Files

        **[ftload](http://www.csounds.com/manual/html/ftload.html)** /
        **[ftloadk](http://www.csounds.com/manual/html/ftloadk.html)**:
        Load a function table which has previously been saved using
        ftsave/ftsavek.

        [**GEN23**](http://www.csounds.com/manual/html/GEN23.html)
        transfers the contents of a text file into a function table. 

<!-- -->

-   ### SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS

    -   #### Signal Input And Output

        [**inch**](http://www.csounds.com/manual/html/inch.html) read
        the audio input from any channel of your audio device. Make sure
        you have the
        [nchnls](http://www.csounds.com/manual/html/nchnls.html) value
        in the orchestra header set properly.\

        [**outch**](http://www.csounds.com/manual/html/outch.html)
        writes any audio signal(s) to any output channel(s). If Csound
        is in realtime mode (by the flag \'-o dac\' or by the \'Render
        in Realtime\' mode of a frontend like QuteCsound), the output
        channels are the channels of your output device. If Csound is in
        \'Render to file\' mode (by the flag \'-o mysoundfile.wav\' or
        the the frontend\'s choice), the output channels are the
        channels of the soundfile which is being written. Make sure you
        have the
        [nchnls](http://www.csounds.com/manual/html/nchnls.html) value
        in the orchestra header set properly to get the number of
        channels you wish to have.

        [**out**](http://www.csounds.com/manual/html/out.html) and
        [**outs**](http://www.csounds.com/manual/html/outs.html) are
        frequently used for mono and stereo output. They always write to
        channel 1 (out) or channels 1 and 2 (outs).\

        [**monitor**](http://www.csounds.com/manual/html/monitor.html)
        can be used (in an instrument with the highest number) to gather
        the sum of all audio on all output channels.

    -   #### Sample Playback With Optional Looping

        [**flooper2**](http://www.csounds.com/manual/html/flooper2.html)
        is a function table based crossfading looper.\

        [**sndloop**](http://www.csounds.com/manual/html/sndloop.html)
        records input audio and plays it back in a loop with
        user-defined duration and crossfade time.\

        Note that there are additional user defined opcodes for the
        playback of samples stored in buffers / function tables.

    -   #### Soundfonts And Fluid Opcodes

        [](http://www.csounds.com/manual/html/fluidEngine.html)

        [**fluidEngine**](http://www.csounds.com/manual/html/fluidEngine.html)
        instantiates a FluidSynth engine.\

        [**fluidSetInterpMethod**](http://www.csounds.com/manual/html/fluidSetInterpMethod.html)
        sets an interpolation method for a channel in a FluidSynth
        engine.\

        [**fluidLoad**](http://www.csounds.com/manual/html/fluidLoad.html)
        loads SoundFonts.\

        [**fluidProgramSelect**](http://www.csounds.com/manual/html/fluidProgramSelect.html)
        assigns presets from a SoundFont to a FluidSynth engine\'s MIDI
        channel.\

        [**fluidNote**](http://www.csounds.com/manual/html/fluidNote.html)
        plays a note on a FluidSynth engine\'s MIDI channel.\

        [**fluidCCi**](http://www.csounds.com/manual/html/fluidCCi.html)
        sends a controller message at i-time to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidCCk**](http://www.csounds.com/manual/html/fluidCCk.html)
        sends a controller message at k-rate to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidControl**](http://www.csounds.com/manual/html/fluidControl.html)
        plays and controls loaded Soundfonts (using \'raw\' MIDI
        messages).\

        [**fluidOut**](http://www.csounds.com/manual/html/fluidOut.html)
        receives audio from a single FluidSynth engine.\

        [**fluidAllOut**](http://www.csounds.com/manual/html/fluidAllOut.html)
        receives audio from all FluidSynth engines.

<!-- -->

-   ### FILE INPUT AND OUTPUT

    -   #### Sound File Input 

        [**soundin**](http://www.csounds.com/manual/html/soundin.html)
        reads from a sound file (up to 24 channels). It is important to
        ensure that the [sr](http://www.csounds.com/manual/html/sr.html)
        value in the orchestra header matches the sample rate of your
        sound file otherwise the sound file will play back at a
        different speed and pitch.\

        [**diskin**](http://www.csounds.com/manual/html/diskin2.html) is
        like soundin, but can also alter the speed of reading also
        resulting in higher or lower pitches. There is also the option
        to loop the file.\

        [**diskin2**](http://www.csounds.com/manual/html/diskin2.html)
        is similar to diskin, but it automatically converts the sample
        rate of the sound file if it does not match the sample rate of
        the orchestra. It also offers different interpolation methods to
        implement different levels of sound quality when sound files are
        read at altered speeds.

        [**GEN01**](http://www.csounds.com/manual/html/GEN01.html) loads
        a sound file into a function table (buffer).

        [**mp3in**](http://www.csounds.com/manual/html/mp3in.html)
        facilitates the playing of mp3 sound files.\

    -   #### Sound File Queries 

        [**filelen**](http://www.csounds.com/manual/html/filelen.html)
        returns the length of a sound file in seconds.

        [**filesr**](http://www.csounds.com/manual/html/filesr.html)
        returns the sample rate of a sound file.

        [**filenchnls**](http://www.csounds.com/manual/html/filenchnls.html)
        returns the number of channels of a sound file.

        [**filepeak**](http://www.csounds.com/manual/html/filepeak.html)
        returns the peak absolute value of a sound file, either of one
        specified channel, or from all channels. Make sure you have set
        [0dbfs](http://www.csounds.com/manual/html/0dbfs.html) to 1;
        otherwise you will get values relative to Csound\'s default
        0dbfs value of 32768.

        [**filebit**](http://www.csounds.com/manual/html/filebit.html)
        returns the bit depth of a sound file.

    -   #### Sound File Output 

        [](http://www.csounds.com/manual/html/fout.html)

        Keep in mind that Csound always writes output to a file if you
        have set the \'-o\' flag to the name of a sound file (or if you
        choose \'render to file\' in a front-end like QuteCound).\

        [**fout**](http://www.csounds.com/manual/html/fout.html) writes
        any audio signal(s) to a file, regardless of whether Csound is
        in realtime or non-realtime mode. This opcode is recommended for
        rendering a realtime performance as a sound file on disc.

    -   #### Non-Soundfile Input And Output 

        [](http://www.csounds.com/manual/html/readk.html)

        [**readk**](http://www.csounds.com/manual/html/readk.html) can
        read data from external files (for instance a text file) and
        transform them to k-rate values.\

        [**GEN23**](http://www.csounds.com/manual/html/GEN23.html)
        transfers a text file into a function table.

        [**dumpk**](http://www.csounds.com/manual/html/dumpk.html)
        writes k-rate signals to a text file.

        [**fprints**](http://www.csounds.com/manual/html/fprints.html) /
        [**fprintks**](http://www.csounds.com/manual/html/fprintks.html)
        write any formatted string to a file. If you call this opcode
        several times during one performance, the strings are appended.
        If you write to an pre-existing file, the file will be
        overwritten.\

        **[ftsave](http://www.csounds.com/manual/html/ftsave.html)** /
        **[ftsavek](http://www.csounds.com/manual/html/ftsavek.html)**:
        Save a function table as a binary or text file, in a specific
        format.

        **[ftload](http://www.csounds.com/manual/html/ftload.html)** /
        **[ftloadk](http://www.csounds.com/manual/html/ftloadk.html)**:
        Load a function table which has been written by ftsave/ftsavek.

<!-- -->

-   ### CONVERTERS OF DATA TYPES 

    -   #### i \<- k 

        [](http://www.csounds.com/manual/html/opi.html)[**i(k)**](http://www.csounds.com/manual/html/opi.html)
        returns the value of a k-variable at init-time. This can be
        useful to get the value of GUI controllers, or when using the
        reinit feature.

    -   #### k \<- a 

        [**downsamp**](http://www.csounds.com/manual/html/downsamp.html)
        converts an a-rate signal to a k-rate signal, with optional
        averaging.\

        [**max\_k**](http://www.csounds.com/manual/html/max_k.html)
        returns the maximum of an k-rate signal in a certain time span,
        with different options of calculation\

    -   #### a \<- k

        [**upsamp**](http://www.csounds.com/manual/html/upsamp.html)
        converts a k-rate signal to an a-rate signal by simple
        repetitions. It is the same as the statement asig=ksig.\

        [**interp**](http://www.csounds.com/manual/html/interp.html)
        converts a k-rate signal to an a-rate signal by interpolation.

<!-- -->

-   ### PRINTING AND STRINGS 

    -   #### Simple Printing 

        [](http://www.csounds.com/manual/html/print.html)

        [**print**](http://www.csounds.com/manual/html/print.html) is a
        simple opcode for printing i-variables. Note that the printed
        numbers are rounded to 3 decimal places.

        [**printk**](http://www.csounds.com/manual/html/printk.html) is
        its counterpart for k-variables. The *itime* argument specifies
        the time in seconds between printings (*itime=0* means one
        printout in each k-cycle which is usually some thousand
        printings per second).

        [**printk2**](http://www.csounds.com/manual/html/printk2.html)
        prints a k-variable whenever it changes.

        **[puts](http://www.csounds.com/manual/html/puts.html)** prints
        S-variables. The *ktrig* argument lets you print either at
        i-time or at k-rate.

    -   #### Formatted Printing 

        [](http://www.csounds.com/manual/html/prints.html)

        [**prints**](http://www.csounds.com/manual/html/prints.html)
        lets you print a format string at i-time. The format is similar
        to the C-style syntax but there is no %s format, therefore
        string variables cannot can be printed.

        [**printf\_i**](http://www.csounds.com/manual/html/printf.html)
        is very similar to prints. It also works at init-time. The
        advantage in comparision to prints is the ability of printing
        string variables. On the other hand,  you need a trigger and at
        least one input argument.

        [**printks**](http://www.csounds.com/manual/html/printks.html)
        is like prints, but takes k-variables, and like printk, you must
        specify a time between printing.

        [**printf**](http://www.csounds.com/manual/html/printf.html) is
        like printf\_i, but works at k-rate.

    -   #### String Variables 

        [](http://www.csounds.com/manual/html/sprintf.html)

        [**sprintf**](http://www.csounds.com/manual/html/sprintf.html)
        works like printf\_i, but stores the output in a string
        variable, instead of printing it out.

        [**sprintfk**](http://www.csounds.com/manual/html/sprintfk.html)
        is the same for k-rate arguments.

        [**strset**](http://www.csounds.com/manual/html/strset.html)
        links any string with a numeric value.

        [**strget**](http://www.csounds.com/manual/html/strget.html)
        transforms a strset number back to a string.

    -   #### String Manipulation And Conversion

        There are many opcodes for analysing, manipulating and
        converting strings. There is a good overview in the Canonical
        Csound Manual on
        [this](http://www.csounds.com/manual/html/StringsTop.html#stringmanipulate)
        and
        [that](http://www.csounds.com/manual/html/stringconvert.html)
        page.

###  

 
