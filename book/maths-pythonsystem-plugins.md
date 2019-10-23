MATHS, PYTHON/SYSTEM, PLUGINS
=============================

OPCODE GUIDE: MATH, PYTHON/ SYSTEM, PLUGINS
-------------------------------------------

### MATHS

-   ### MATHEMATICAL CALCULATIONS

    -   #### Arithmetic Operations 

        [**+**](http://www.csounds.com/manual/html/adds.html),
        [**-**](http://www.csounds.com/manual/html/subtracts.html),
        [**\***](http://www.csounds.com/manual/html/multiplies.html),
        [**/**](http://www.csounds.com/manual/html/divides.html),
        [**\^**](http://www.csounds.com/manual/html/raises.html),
        [**%**](http://www.csounds.com/manual/html/modulus.html) are the
        usual signs for addition, subtraction, multiplication, division,
        raising to a power and modulo. The precedence is like that used
        in common mathematics (\* binds stronger than + etc.), but you
        can change this behaviour with parentheses: 2\^(1/12) returns 2
        raised by 1/12 (= the 12st root of 2), while 2\^1/12 returns 2
        raised by 1, and the result divided by 12.

        **[exp(x)](http://www.csounds.com/manual/html/exp.html)**,
        [**log(x)**](http://www.csounds.com/manual/html/log.html),
        [**log10(x)**](http://www.csounds.com/manual/html/log10.html)
        and [**sqrt(x)**](http://www.csounds.com/manual/html/sqrt.html)
        return e raised to the xth power, the natural log of x, the base
        10 log of x, and the square root of x.\

        [**abs(x)**](http://www.csounds.com/manual/html/abs.html)
        returns the absolute value of a number.\

        [**int(x)**](http://www.csounds.com/manual/html/int.html) and
        [**frac(x)**](http://www.csounds.com/manual/html/frac.html)
        return the integer respective the fractional part of a number.\

        [**round(x)**](http://www.csounds.com/manual/html/round.html),
        [**ceil(x)**](http://www.csounds.com/manual/html/ceil.html),
        [**floor(x)**](http://www.csounds.com/manual/html/floor.html)
        round a number to the nearest, the next higher or the next lower
        integer.

    -   #### Trigonometric Functions

        [**sin(x)**](http://www.csounds.com/manual/html/sin.html),
        [**cos(x)**](http://www.csounds.com/manual/html/cos.html),
        [**tan(x)**](http://www.csounds.com/manual/html/tan.html)
        perform a sine, cosine or tangent function.\

        [**sinh(x)**](http://www.csounds.com/manual/html/sinh.html),
        [**cosh(x)**](http://www.csounds.com/manual/html/cosh.html),
        [**tanh(x)**](http://www.csounds.com/manual/html/tanh.html)
        perform a hyperbolic sine, cosine or tangent function.\

        [**sininv(x)**](http://www.csounds.com/manual/html/sininv.html),
        [**cosinv(x)**](http://www.csounds.com/manual/html/cosinv.html),
        [**taninv(x)**](http://www.csounds.com/manual/html/taninv.html)
        and
        [**taninv2(x)**](http://www.csounds.com/manual/html/taninv2.html)
        perform the arcsine, arccosine and arctangent functions.

    -   #### Logic Operators

        [](http://www.csounds.com/manual/html/opand.html)[**&&**](http://www.csounds.com/manual/html/opand.html)
        and [**\|\|**](http://www.csounds.com/manual/html/opor.html) 
        are the symbols for a logical \"and\" and \"or\". Note that you
        can use here parentheses for defining the precedence, too, for
        instance: if (ival1 \< 10 && ival2 \> 5) \|\| (ival1 \> 20 &&
        ival2 \< 0) then \...

        [**!**](http://www.csounds.com/manual/html/opor.html) is the
        symbol for logical \"not\". For example: if (kx != 2) then \...
        would serve a conditional branch if variable kx was not equal to
        \'2\'.\

<!-- -->

-   ### CONVERTERS

    -   #### MIDI To Frequency 

        [](http://www.csounds.com/manual/html/cpsmidi.html)

        [**cpsmidi**](http://www.csounds.com/manual/html/cpsmidi.html)
        converts a MIDI note number from a triggered instrument to the
        frequency in Hertz.

        [**cpsmidinn**](http://www.csounds.com/manual/html/cpsmidinn.html)
        does the same for any input values (i- or k-rate).

        Other opcodes convert to Csound\'s pitch- or octave-class
        system. They can be found
        [here](http://www.csounds.com/manual/html/PitchTop.html#PitchFuncs).

    <!-- -->

    -   #### Frequency To MIDI

        Csound has no own opcode for the conversion of a frequency to a
        midi note number, because this is a rather simple calculation.
        You can find a User Defined Opcode for [rounding to the next
        possible midi note
        number](http://www.csounds.com/udo/displayOpcode.php?opcode_id=123)
        or for the [exact translation to a midi note number and a cent
        value as fractional
        part](http://www.csounds.com/udo/displayOpcode.php?opcode_id=124).

    -   #### Cent Values To Frequency 

        [](http://www.csounds.com/manual/html/cent.html)[**cent**](http://www.csounds.com/manual/html/cent.html)
        converts a cent value to a multiplier. For instance,
        *cent(1200)* returns 2, *cent(100)* returns 1.059403. If you
        multiply this with the frequency you reference to, you get
        frequency of the note which corresponds to the cent interval.

    -   #### Amplitude Converters

        [](http://www.csounds.com/manual/html/ampdb.html)

        [**ampdb**](http://www.csounds.com/manual/html/ampdb.html)
        returns the amplitude equivalent of the dB value. *ampdb(0)*
        returns 1, *ampdb(-6)* returns 0.501187, and so on.

        [**ampdbfs**](http://www.csounds.com/manual/html/ampdbfs.html)
        returns the amplitude equivalent of the dB value, according to
        what has been set as
        [0dbfs](http://www.csounds.com/manual/html/0dbfs.html) (1 is
        recommended, the default is 15bit = 32768). So ampdbfs(-6)
        returns 0.501187 for 0dbfs=1, but 16422.904297 for 0dbfs=32768.

        [**dbamp**](http://www.csounds.com/manual/html/dbamp.html)
        returns the decibel equivalent of the amplitude value, where an
        amplitude of 1 is the maximum. So dbamp(1) -\> 0 and dbamp(0.5)
        -\> -6.020600.

        [**dbfsamp**](http://www.csounds.com/manual/html/dbfsamp.html)
        returns the decibel equivalent of the amplitude value set by the
        [0dbfs](http://www.csounds.com/manual/html/0dbfs.html)
        statement. So dbfsamp(10) is 20.000002 for 0dbfs=0 but
        -70.308998 for 0dbfs=32768.

    -   #### Scaling 

        Scaling of signals from an input range to an output range, like
        the \"scale\" object in Max/MSP, is not implemented in Csound,
        because it is a rather simple calculation. It is available as
        User Defined Opcode:
        [Scali](http://www.csounds.com/udo/displayOpcode.php?opcode_id=125)
        (i-rate),
        [Scalk](http://www.csounds.com/udo/displayOpcode.php?opcode_id=126)
        (k-rate) or
        [Scala](http://www.csounds.com/udo/displayOpcode.php?opcode_id=127)
        (a-rate).\

### PYTHON AND SYSTEM

-   ### PYTHON OPCODES

    [](http://www.csounds.com/manual/html/pyinit.html)

    [**pyinit**](http://www.csounds.com/manual/html/pyinit.html)
    initializes the Python interpreter.\

    [**pyrun**](http://www.csounds.com/manual/html/pyrun.html) runs a
    Python statement or block of statements.

    [**pyexec**](http://www.csounds.com/manual/html/pyexec.html)
    executes a script from a file at k-time, i-time or if a trigger has
    been received.

    [**pycall**](http://www.csounds.com/manual/html/pycall.html) invokes
    the specified Python callable at k-time or i-time.

    [**pyeval**](http://www.csounds.com/manual/html/pyeval.html)
    evaluates a generic Python expression and stores the result in a
    Csound k- or i-variable, with optional trigger.

    [**pyassign**](http://www.csounds.com/manual/html/pyassign.html)
    assigns the value of the given Csound variable to a Python variable
    possibly destroying its previous content.

<!-- -->

-   ### SYSTEM OPCODES

    [](http://www.csounds.com/manual/html/getcfg.html)

    [**getcfg**](http://www.csounds.com/manual/html/getcfg.html) returns
    various Csound configuration settings as a string at init time.

    [**system**](http://www.csounds.com/manual/html/system.html) /
    [**system\_i**](http://www.csounds.com/manual/html/system.html) call
    an external program via the system call.

### PLUGINS 

-   ### PLUGIN HOSTING

    -   #### LADSPA

        [](http://www.csounds.com/manual/html/dssiinit.html)

        [**dssiinit**](http://www.csounds.com/manual/html/dssiinit.html)
        loads a plugin.

        [**dssiactivate**](http://www.csounds.com/manual/html/dssiactivate.html)
        activates or deactivates a plugin if it has this facility.

        [**dssilist**](http://www.csounds.com/manual/html/dssilist.html)
        lists all available plugins found in the LADSPA\_PATH and
        DSSI\_PATH global variables.

        [**dssiaudio**](http://www.csounds.com/manual/html/dssiaudio.html)
        processes audio using a plugin.

        [**dssictls**](http://www.csounds.com/manual/html/dssictls.html)
        sends control information to a plugin\'s control port.

    -   #### VST

        [](http://www.csounds.com/manual/html/vstinit.html)

        [**vstinit**](http://www.csounds.com/manual/html/vstinit.html)
        loads a plugin.

        [**vstaudio**](http://www.csounds.com/manual/html/vstaudio.html)
        /
        [**vstaudiog**](http://www.csounds.com/manual/html/vstaudio.html)
        return a plugin\'s output.

        [**vstmidiout**](http://www.csounds.com/manual/html/vstmidiout.html)
        sends midi data to a plugin.

        [**vstparamset**](http://www.csounds.com/manual/html/vstparamset.html)
        /
        [**vstparamget**](http://www.csounds.com/manual/html/vstparamget.html)
        sends and receives automation data to and from the plugin.

        [**vstnote**](http://www.csounds.com/manual/html/vstnote.html)
        sends a midi note with a definite duration.

        [**vstinfo**](http://www.csounds.com/manual/html/vstinfo.html)
        outputs the parameter and program names for a plugin.

        [**vstbankload**](http://www.csounds.com/manual/html/vstbankload.html)
        loads an .fxb bank.

        [**vstprogset**](http://www.csounds.com/manual/html/vstprogset.html)
        sets the program in a .fxb bank.

        [**vstedit**](http://www.csounds.com/manual/html/vstedit.html)
        opens the GUI editor for the plugin, when available.
