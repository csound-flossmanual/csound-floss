B. PYTHON INSIDE CSOUND
=======================

This chapter is based on Andrés Cabrera\'s article *Using Python inside
Csound, An introduction to the Python opcodes*, Csound Journal Issue 6,
Spring 2007: <http://csoundjournal.com/issue6/pythonOpcodes.html>. Some
basic knowledge of Python is required. For using Csound\'s Python
opcodes, you must have Python installed (currently version 2.7, Python
3.x will not work). This should be the case on OSX^1^  and Linux. For
Windows  some version of Python 2.7 must be installed. If you\'re using
64-bit Csound, you must install a 64-bit version of Python 2.7. Python
2.7.8 for Windows is the most recent 64-bit version of 2.7. This can be
downloaded from <https://www.python.org/download/releases/2.7.8>. When
running the Windows Csound installer, you must also check the \"Python
features\" checkbox in the Select Components dialog.

::: {.group_img}
::: {.image}
![](../resources/images/jim_python_windows.jpg){width="415" height="322"}
:::
:::

Starting the Python Interpreter and Running Python Code at i-Time: pyinit and pyruni 
-------------------------------------------------------------------------------------

To use the Python opcodes inside Csound, you must first start the Python
interpreter. This is done using the
[pyinit](http://www.csounds.com/manual/html/pyinit.html "http://csoundjournal.com/issue6/pythonOpcodes.html")
opcode. The pyinit opcode must be put in the header before any other
Python opcode is used, otherwise, since the interpreter is not running,
all Python opcodes will return an error. You can run any Python code by
placing it within quotes as argument to the opcode
[pyruni](http://www.csounds.com/manual/html/pyruni.html "http://csoundjournal.com/issue6/pythonOpcodes.html").
This opcode executes the Python code at init time and can be put in the
heade. The example below, shows a simple csd file which prints the text
\"Hello Csound world!\" to the terminal.^2^  Note that a dummy
instrument must be declared to satisfy the Csound parser.

***   EXAMPLE 12B01\_pyinit.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    ;start python interpreter
    pyinit

    ;run python code at init-time
    pyruni "print '*********************'"
    pyruni "print '*Hello Csound world!*'"
    pyruni "print '*********************'"

    instr 1
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera and Joachim Heintz

Prints:\
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\
\*Hello Csound world!\*\
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 

Python Variables Are Usually Global
-----------------------------------

The Python interpreter maintains its state for the length of the Csound
run. This means that any variables declared will be available on all
calls to the Python interpreter. In other words, they are global. The
code below shows variables \"c\" and \"d\" being calculated both in the
header (\"c\") and in instrument 2 (\"d\"), and that they are available
in all instruments (here printed out in instrument 1 and 3). A
multi-line string can be written in Csound with the {{\...}} delimiters.
This can be useful for longer Python code snippets.

***EXAMPLE 12B02\_python\_global.csd***

     <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    pyinit

    ;Execute a python script in the header
    pyruni {{
    a = 2
    b = 3
    c = a + b
    }}

    instr 1 ;print the value of c
    prints "Instrument %d reports:\n", p1
    pyruni "print 'a + b = c = %d' % c"
    endin

    instr 2 ;calculate d
    prints "Instrument %d calculates the value of d!\n", p1
    pyruni "d = c**2"
    endin

    instr 3 ;print the value of d
    prints "Instrument %d reports:\n", p1
    pyruni "print 'c squared = d = %d' % d"
    endin

    </CsInstruments>
    <CsScore>
    i 1 1 0
    i 2 3 0
    i 3 5 0
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera and Joachim Heintz

Prints:\
Instrument 1 reports:\
a + b = c = 5\
Instrument 2 calculates the value of d!\
Instrument 3 reports:\
c squared = d = 25

Running Python Code at k-Time
-----------------------------

Python scripts can also be executed at k-rate using pyrun. When pyrun is
used, the script will be executed again on every k-pass for the
instrument, which means it will be executed kr times per second. The
example below shows a simple example of pyrun. The number of control
cycles per second is set here to 100 via the statement kr=100. After
setting the value of variable \"a\" in the header to zero, instrument 1
runs for one second, thus incrementing the value of \"a\" to 100 by the
Python statement a = a + 1. Instrument 2, starting after the first
second, prints the value. Instrument 1 is then called again for another
two seconds, so the value of variable \"a\" is 300 afterwards. Then
instrument 3 is called which performs both, incrementing (in the \'+=\'
short form) and printing, for the first two k-cycles.

***EXAMPLE 12B03\_pyrun.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    kr=100

    ;start the python interpreter
    pyinit
    ;set variable a to zero at init-time
    pyruni "a = 0"

    instr 1
    ;increment variable a by one in each k-cycle
    pyrun "a = a + 1"
    endin

    instr 2
    ;print out the state of a at this instrument's initialization
    pyruni "print 'instr 2: a = %d' % a"
    endin

    instr 3
    ;perform two more increments and print out immediately
    kCount timeinstk
    pyrun "a += 1"
    pyrun "print 'instr 3: a = %d' % a"
    ;;turnoff after k-cycle number two
    if kCount == 2 then
    turnoff
    endif
    endin
    </CsInstruments>
    <CsScore>
    i 1 0 1  ;Adds to a for 1 second
    i 2 1 0  ;Prints a
    i 1 2 2  ;Adds to a for another two seconds
    i 3 4 1  ;Prints a again
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera and Joachim Heintz

Prints:\
instr 2: a = 100\
instr 3: a = 301\
instr 3: a = 302

Running External Python Scripts: pyexec
---------------------------------------

Csound allows you to run Python script files that exist outside your csd
file. This is done using pyexec. The pyexec opcode will run the script
indicated, like this:

 

    pyexec "/home/python/myscript.py"

In this case, the script \"myscript.py\" will be executed at k-rate. You
can give full or relative path names.

There are other versions of the pyexec opcode, which run at
initialization only (pyexeci) and others that include an additional
trigger argument (pyexect).

Passing values from Python to Csound: pyeval(i)
-----------------------------------------------

The opcode pyeval and its relatives, allow you to pass to Csound the
value of a Python expression. As usual, the expression is given as a
string. So we expect this to work:

***Not Working Example!***

    <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    pyinit
    pyruni "a = 1"
    pyruni "b = 2"

    instr 1
    ival pyevali "a + b"
    prints "a + b = %d\n", ival
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    </CsScore>
    </CsoundSynthesizer>

Running this code results in an error with this message:\
INIT ERROR in instr 1: pyevali: expression must evaluate in a float

What happens is that Python has delivered an integer to Csound, which
expects a floating-point number. Csound always works with numbers which
are not integers (to represent a 1, Csound actually uses 1.0). This is
equivalent mathematically, but in computer memory these two numbers are
stored in a different way. So what you need to do is tell Python to
deliver a floating-point number to Csound. This can be done by Python\'s
float() facility. So this code should work:

***EXAMPLE 12B04\_pyevali.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    pyinit
    pyruni "a = 1"
    pyruni "b = 2"

    instr 1
    ival pyevali "float(a + b)"
    prints "a + b = %d\n", ival
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera and Joachim Heintz

Prints:\
a + b = 3

 

Passing Values from Csound to Python: pyassign(i)
-------------------------------------------------

You can pass values from Csound to Python via the pyassign opcodes. This
is a very simple example which calculates the cent distance of the
proportion 3/2:

***EXAMPLE 12B05\_pyassigni.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -ndm0
    </CsOptions>
    <CsInstruments>

    pyinit

    instr 1 ;assign 3/2 to the python variable "x"
    pyassigni "x", 3/2
    endin

    instr 2 ;calculate cent distance of this proportion
    pyruni {{
    from math import log
    cent = log(x,2)*1200
    print cent
    }}
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    i 2 0 0
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Unfortunately, you can neither pass strings from Csound to Python via
pyassign, nor from Python to Csound via pyeval. So the interchange
between both worlds is actually limited to numbers.

Calling Python Functions with Csound Variables
----------------------------------------------

Apart from reading and setting variables directly with an opcode, you
can also call Python functions from Csound and have the function return
values directly to Csound. This is the purpose of the pycall opcodes.
With these opcodes you specify the function to call and the function
arguments as arguments to the opcode. You can have the function return
values (up to 8 return values are allowed) directly to Csound i- or
k-rate variables. You must choose the appropriate opcode depending on
the number of return values from the function, and the Csound rate (i-
or k-rate) at which you want to run the Python function. Just add a
number from 1 to 8 after to pycall, to select the number of outputs for
the opcode. If you just want to execute a function without return value
simply use pycall. For example, the function \"average\" defined above,
can be called directly from Csound using:

    kave   pycall1 "average", ka, kb

The output variable kave, will calculate the average of the variable ka
and kb at k-rate.

As you may have noticed, the Python opcodes run at k-rate, but also have
i-rate versions if an \"i\" is added to the opcode name. This is also
true for pycall. You can use pycall1i, pycall2i, etc. if you want the
function to be evaluated at instrument initialization, or in the header.
The following csd shows a simple usage of the pycall opcodes:

***EXAMPLE 12B06\_pycall.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -dnm0
    </CsOptions>
    <CsInstruments>

    pyinit

    pyruni {{
    def average(a,b):
        ave = (a + b)/2
        return ave
    }} ;Define function "average"

    instr 1 ;call it
    iave   pycall1i "average", p4, p5
    prints "a = %i\n", iave
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 1  100  200
    i 1 1 1  1000 2000
    </CsScore>
    </CsoundSynthesizer>
    ;example by andrés cabrera and joachim heintz

This csd will print the following output:\
a = 150\
a = 1500

Local Instrument Scope
----------------------

Sometimes you want Python variables to be global, and sometimes you may
want Python variables to be local to the instrument instance. This is
possible using the local Python opcodes. These opcodes are the same as
the ones shown above, but have the prefix pyl instead of py. There are
opcodes like pylruni, pylcall1t and pylassigni, which will behave just
like their global counterparts, but they will affect local Python
variables only. It is important to have in mind that this locality
applies to instrument instances, not instrument numbers. The next
example shows both, local and global behaviour.

***EXAMPLE 12B07\_local\_vs\_global.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -dnm0
    </CsOptions>
    <CsInstruments>

    pyinit
    giInstanceLocal = 0
    giInstanceGlobal = 0

    instr 1 ;local python variable 'value'
    kTime timeinsts
    pylassigni "value", p4
    giInstanceLocal = giInstanceLocal+1
    if kTime == 0.5 then
    kvalue pyleval "value"
    printks "Python variable 'value' in instr %d, instance %d = %d\n", 0, p1, giInstanceLocal, kvalue
    turnoff
    endif
    endin

    instr 2 ;global python variable 'value'
    kTime timeinsts
    pyassigni "value", p4
    giInstanceGlobal = giInstanceGlobal+1
    if kTime == 0.5 then
    kvalue pyleval "value"
    printks "Python variable 'value' in instr %d, instance %d = %d\n", 0, p1, giInstanceGlobal, kvalue
    turnoff
    endif
    endin

    </CsInstruments>
    <CsScore>
    ;        p4
    i 1 0 1  100
    i 1 0 1  200
    i 1 0 1  300
    i 1 0 1  400

    i 2 2 1  1000
    i 2 2 1  2000
    i 2 2 1  3000
    i 2 2 1  4000
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera and Joachim Heintz

Prints:\
Python variable \'value\' in instr 1, instance 4 = 100\
Python variable \'value\' in instr 1, instance 4 = 200\
Python variable \'value\' in instr 1, instance 4 = 300\
Python variable \'value\' in instr 1, instance 4 = 400\
Python variable \'value\' in instr 2, instance 4 = 4000\
Python variable \'value\' in instr 2, instance 4 = 4000\
Python variable \'value\' in instr 2, instance 4 = 4000\
Python variable \'value\' in instr 2, instance 4 = 4000

Both instruments pass the value of the score parameter field p4 to the
python variable \"value\". The only difference is that instrument 1 does
this local (with pylassign and pyleval) and instrument 2 does it global
(with pyassign and pyeval). Four instances of instrument 1 are called at
the same time, for the same duration. Thanks to the local variables,
each assignment to the variable \"value\" stays independent from each
other. This is shown when all instances are adviced to print out
\"value\" after 0.5 seconds.

When the four instances of instrument 2 are called, each new instance
overwrites the \"value\" of all previous instances with its own p4. So
the second instance sets \"value\" to 2000 for itself but only for the
first instance. The third instance sets \"value\" to 3000 also for
instance one and two. And the fourth instance sets \"value\" to 4000 for
all previous instances, too, and that is shown in the printout, again
after 0.5 seconds.

Triggered Versions of Python Opcodes
------------------------------------

All of the python opcodes have a \"triggered\" version, which will only
execute when its trigger value is different to 0. The names of these
opcodes have a \"t\" added at the end of them (e.g. pycallt or
pylassignt), and all have an additional parameter called ktrig for
triggering purposes. See the example in the next chapter for usage.

Simple Markov Chains Using the Python Opcodes
---------------------------------------------

Python opcodes can simplify the creation of complex data structures for
algorithmic composition. Below you\'ll find a simple example of using
the Python opcodes to generate Markov chains for a pentatonic scale.
Markov chains require in practice building matrices, which start
becoming unwieldy in Csound, especially for more than two dimensions. In
Python multi-dimensional matrices can be handled as nested lists very
easily. Another advange is that the size of matrices (or lists) need not
be known in advance, since it is not necessary in python to declare the
sizes of lists.

***EXAMPLE 12B08\_markov.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac -dm0
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    pyinit

    ; Python script to define probabilities for each note as lists within a list
    ; Definition of the get_new_note function which randomly generates a new
    ; note based on the probabilities of each note occuring.
    ; Each note list must total 1, or there will be problems!

    pyruni {{
    c = [0.1, 0.2, 0.05, 0.4, 0.25]
    d = [0.4, 0.1, 0.1, 0.2, 0.2]
    e = [0.2, 0.35, 0.05, 0.4, 0]
    g = [0.7, 0.1, 0.2, 0, 0]
    a = [0.1, 0.2, 0.05, 0.4, 0.25]

    markov = [c, d, e, g, a]

    from random import random, seed

    seed()

    def get_new_note(previous_note):
        number = random()
        accum = 0
        i = 0
        while accum < number:
            accum = accum + markov[int(previous_note)] [int(i)]
            i = i + 1
        return i - 1.0
    }}

    giSine ftgen 0, 0, 2048, 10, 1 ;sine wave
    giPenta ftgen 0, 0, -6, -2, 0, 2, 4, 7, 9  ;Pitch classes for pentatonic scale


    instr 1  ;Markov chain reader and note spawner
    ;p4 = frequency of note generation
    ;p5 = octave
    ioct init p5
    klastnote init 0 ;Used to remember last note played (start at first note of scale)
    ktrig metro p4 ;generate a trigger with frequency p4
    knewnote pycall1t ktrig, "get_new_note", klastnote ;get new note from chain
    schedkwhen ktrig, 0, 10, 2, 0, 0.2, knewnote, ioct ;launch note on instrument 2
    klastnote = knewnote ;New note is now the old note
    endin

    instr 2 ;A simple sine wave instrument
    ;p4 = note to be played
    ;p5 = octave
    ioct init p5
    ipclass table p4, giPenta
    ipclass = ioct + (ipclass / 100) ; Pitch class of the note
    ifreq = cpspch(ipclass) ;Note frequency in Hertz
    aenv linen .2, 0.05, p3, 0.1 ;Amplitude envelope
    aout poscil  aenv, ifreq , giSine ;Simple oscillator
    outs aout, aout
    endin

    </CsInstruments>
    <CsScore>
    ;        frequency of       Octave of
    ;        note generation    melody
    i 1 0 30      3               7
    i 1 5 25      6               9
    i 1 10 20     7.5             10
    i 1 15 15     1               8
    </CsScore>
    </CsoundSynthesizer>
    ;Example by Andrés Cabrera

 

1.  [Open a Terminal and type \"python\". If your python version is not
    2.7, download and install the proper version from
    www.python.org.]{#endnote-053478c6-b984-4234-8f3e-992d1648445a}
2.  [This printing does not work in CsoundQt. You should run all the
    examples here in the
    Terminal.]{#endnote-52a67381-d45e-4716-bc37-a7875a3e5f5c}
