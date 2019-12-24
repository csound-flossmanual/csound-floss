12 B. PYTHON AND CSOUND
=======================

This chapter is based on Andrés Cabrera's article *Using Python inside
Csound, An introduction to the Python opcodes*.[^1] Some
basic knowledge of Python is required. For using Csound's Python
opcodes, you must have Python installed.

[^1]: Csound Journal Issue 6, Spring 2007:
      <http://csoundjournal.com/issue6/pythonOpcodes.html>

All examples below are to be executed in a Terminal. If using CsoundQt, choose *Run in Term* instead of *Run*.

Note that currently this chapter is only focussing on Python **inside** Csound by using Csound's
[Python Opcodes](https://csound.com/docs/manual/py.html). The more versatile and flexible way to combine Python and Csound is using the Csound API. See chapter [12 A](12-a-the-csound-api.md) for background and the
[ctcsound website](https://github.com/csound/ctcsound) for examples.



Starting the Python Interpreter and Running Python Code at i-Time: *pyinit* and *pyruni*
-------------------------------------------------------------------------------------

To use the Python opcodes inside Csound, you must first start the Python
interpreter. This is done using the
[pyinit](https://csound.com/docs/manual/pyinit.html)
opcode. The *pyinit* opcode must be put in the header before any other
Python opcode is used, otherwise, since the interpreter is not running,
all Python opcodes will return an error. You can run any Python code by
placing it within quotes as argument to the opcode
[pyruni](https://csound.com/docs/manual/pyruni.html).
This opcode executes the Python code at init time[^2] and can be put in the
header. The example below shows a simple csd file which prints the text
"Hello Csound world!" to the terminal.

[^2]: See chapter [03 A](03-a-initialization-and-performance-pass.md) for more
      about init- and k-time in Csound.


   ***EXAMPLE 12B01_pyinit.csd***

~~~
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


</CsInstruments>
<CsScore>
e 0
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera and Joachim Heintz
~~~


Python Variables are usually Global
-----------------------------------

The Python interpreter maintains its state for the length of the Csound
run. This means that any variables declared will be available on all
calls to the Python interpreter. In other words, they are global. The
code below shows variables 'c' and 'd' being calculated both in the
header (c) and in instrument 2 (d), and that they are available
in all instruments (here printed out in instrument 1 and 3). A
multi-line string can be written in Csound with the {{\...}} delimiters.
This can be useful for longer Python code snippets.


   ***EXAMPLE 12B02_python_global.csd***

~~~
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
~~~

Prints:

    Instrument 1 reports:
    a + b = c = 5
    Instrument 2 calculates the value of d!
    Instrument 3 reports:
    c squared = d = 25


Running Python Code at k-Time
-----------------------------

Python scripts can also be executed at k-rate using
[pyrun](https://csound.com/docs/manual/pyrun.html). When *pyrun* is
used, the script will be executed on every k-pass for the
instrument, which means it will be executed
[kr](https://csound.com/docs/manual/kr.html) times per second. The
example below shows a simple example of *pyrun*. The number of control
cycles per second is set here to 100 via the statement *kr=100*. After
setting the value of variable 'a' in the header to zero, instrument 1
runs for one second, thus incrementing the value of 'a' to 100 by the
Python statement 'a = a + 1'. Instrument 2, starting after the first
second, prints the value. Instrument 1 is then called again for another
two seconds, so the value of variable 'a' is 300 afterwards. Then
instrument 3 is called which performs both, incrementing (in the *+=*
short form) and printing, for the first two k-cycles.


   ***EXAMPLE 12B03_pyrun.csd***

~~~
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
~~~

Prints:

    instr 2: a = 100
    instr 3: a = 301
    instr 3: a = 302


Running External Python Scripts: *pyexec*
-----------------------------------------

Csound allows you to run Python script files that exist outside your *csd*
file. This is done using
[pyexec](https://csound.com/docs/manual/pyexec.html).
The pyexec opcode will run the script indicated, like this:

    pyexec "/home/python/myscript.py"

In this case, the script *myscript.py* will be executed at k-rate. You
can give full or relative path names.

There are other versions of the pyexec opcode, which run at
initialization only (*pyexeci*) and others that include an additional
trigger argument (*pyexect*).


Passing values from Python to Csound: *pyeval(i)*
-------------------------------------------------

The opcode pyeval and its relatives allow you to pass to Csound the
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

Running this code results in an error with this message:

    INIT ERROR in instr 1: pyevali: expression must evaluate in a float

What happens is that Python has delivered an integer to Csound, which
expects a floating-point number. Csound always works with numbers which
are not integers (to represent a 1, Csound actually uses 1.0). This is
equivalent mathematically, but in computer memory these two numbers are
stored in a different way. So what you need to do is tell Python to
deliver a floating-point number to Csound. This can be done by Python's
*float()* facility. So this code should work:


   ***EXAMPLE 12B04_pyevali.csd***

~~~
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
~~~

Prints:

    a + b = 3



Passing Values from Csound to Python: *pyassign(i)*
---------------------------------------------------

You can pass values from Csound to Python via the
[pyassign](https://csound.com/docs/manual/pyassign.html) opcodes. This
is a very simple example which calculates the cent distance of the
proportion 3/2:


   ***EXAMPLE 12B05_pyassigni.csd***

~~~
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
~~~

Unfortunately, you can neither pass strings from Csound to Python via
pyassign, nor from Python to Csound via pyeval. So the interchange
between both worlds is actually limited to numbers.


Calling Python Functions with Csound Variables
----------------------------------------------

Apart from reading and setting variables directly with an opcode, you
can also call Python functions from Csound and have the function return
values directly to Csound. This is the purpose of the
[pycall](https://csound.com/docs/manual/pycall.html) opcodes.
With these opcodes you specify the function to call and the function
arguments as arguments to the opcode. You can have the function return
values (up to 8 return values are allowed) directly to Csound i- or
k-rate variables. You must choose the appropriate opcode depending on
the number of return values from the function, and the Csound rate (i-
or k-rate) at which you want to run the Python function. Just add a
number from 1 to 8 after to pycall, to select the number of outputs for
the opcode. If you just want to execute a function without return value
simply use pycall. For example, the function *average* defined above,
can be called directly from Csound using:

    kave   pycall1 "average", ka, kb

The output variable kave, will calculate the average of the variable ka
and kb at k-rate.

As you may have noticed, the Python opcodes run at k-rate, but also have
i-rate versions if an *i* is added to the opcode name. This is also
true for pycall. You can use *pycall1i*, *pycall2i*, etc. if you want the
function to be evaluated at instrument initialization, or in the header.
The following csd shows a simple usage of the pycall opcodes:


   ***EXAMPLE 12B06_pycall.csd***

~~~
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
~~~

This csd will print the following output:

    a = 150
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


   ***EXAMPLE 12B07_local_vs_global.csd***

~~~
<CsoundSynthesizer>
<CsOptions>
-dnm0
</CsOptions>
<CsInstruments>
ksmps=32

pyinit

instr 1 ;local python variable 'value'
 pylassigni "value", p4
 if timeinstk() == 1 then
  kvalue pyleval "value"
  printks "Python variable 'value' in instr %d, instance %d, at start = %d\n", 0, p1, frac(p1)*10, kvalue
 elseif release() == 1 then
  kvalue pyleval "value"
  printks "Python variable 'value' in instr %d, instance %d, at end = %d\n", 0, p1, frac(p1)*10, kvalue
 endif
endin

instr 2 ;global python variable 'value'
 pyassigni "value", p4
 if timeinstk() == 1 then
  kvalue pyeval "value"
  printks "Python variable 'value' in instr %d, instance %d, at start = %d\n", 0, p1, frac(p1)*10, kvalue
 elseif release() == 1 then
  kvalue pyeval "value"
  printks "Python variable 'value' in instr %d, instance %d, at end = %d\n", 0, p1, frac(p1)*10, kvalue
 endif
endin

</CsInstruments>
<CsScore>
;             p4
i 1.1 0.0  1  100
i 1.2 0.1  1  200
i 1.3 0.2  1  300
i 1.4 0.3  1  400

i 2.1 2.0  1  100
i 2.2 2.1  1  200
i 2.3 2.2  1  300
i 2.4 2.3  1  400
</CsScore>
</CsoundSynthesizer>
;Example by Andrés Cabrera and Joachim Heintz
~~~

Prints:

    Python variable 'value' in instr 1, instance 1, at start = 100
    Python variable 'value' in instr 1, instance 2, at start = 200
    Python variable 'value' in instr 1, instance 3, at start = 300
    Python variable 'value' in instr 1, instance 4, at start = 400
    Python variable 'value' in instr 1, instance 1, at end = 100
    Python variable 'value' in instr 1, instance 2, at end = 200
    Python variable 'value' in instr 1, instance 3, at end = 300
    Python variable 'value' in instr 1, instance 4, at end = 400
    Python variable 'value' in instr 2, instance 1, at start = 100
    Python variable 'value' in instr 2, instance 2, at start = 200
    Python variable 'value' in instr 2, instance 3, at start = 300
    Python variable 'value' in instr 2, instance 4, at start = 400
    Python variable 'value' in instr 2, instance 1, at end = 400
    Python variable 'value' in instr 2, instance 2, at end = 400
    Python variable 'value' in instr 2, instance 3, at end = 400
    Python variable 'value' in instr 2, instance 4, at end = 400


Both instruments pass the value of the score parameter field p4 to the
python variable *value*. The only difference is that instrument 1 does
this local (with pylassign and pyleval) and instrument 2 does it global
(with pyassign and pyeval). Four instances of instrument 1 are called with 0.1 seconds time offset, for the duration of one second. Printout is done in the first and the last k-cycle of the instrument.

At start, all instruments show that they have set the python variable *value* correctly to the p4 value. This does not change in instrument 1, because the settings als local here. In instrument 2, however, the now *global* python variable *value* is being reset by each of the four instances. At start of the first instance (Csound time 2.0), it is 100. At start of instance 2 (time 2.1), it is 200. It is set to 400 at Csound time 2.3. So at time 2.999, when the first instance finishes its performance, the value is not any more 100, but 400. This is reported in the *at end* printout.


Triggered Versions of Python Opcodes
------------------------------------

All of the python opcodes have a "triggered" version, which will only
execute when its trigger value is different to 0. The names of these
opcodes have a "t" added at the end of them (e.g. *pycallt* or
*pylassignt*), and all have an additional parameter called ktrig for
triggering purposes.


Simple Markov Chains Using the Python Opcodes
---------------------------------------------

Python opcodes can simplify the creation of complex data structures for
algorithmic composition. Below you will find a simple example of using
the Python opcodes to generate Markov chains for a pentatonic scale.
Markov chains require in practice building matrices, which start
becoming unwieldy in Csound, especially for more than two dimensions. In
Python multi-dimensional matrices can be handled as nested lists very
easily. Another advange is that the size of matrices (or lists) need not
be known in advance, since it is not necessary in python to declare the
sizes of lists.


   ***EXAMPLE 12B08_markov.csd***

~~~
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
~~~


