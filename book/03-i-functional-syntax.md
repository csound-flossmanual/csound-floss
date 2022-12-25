# 03 I. FUNCTIONAL SYNTAX

Functional syntax is very common in many programming languages. It takes
the form of fun(), where fun is any function which encloses its
arguments in parentheses. Even in "old" Csound, there existed some
rudiments of this functional syntax in some mathematical functions, such
as _sqrt()_, _log()_, _int()_, _frac()_. For instance, the following code

    iNum = 1.234
    print int(iNum)
    print frac(iNum)

would print:

    instr 1:  #i0 = 1.000
    instr 1:  #i1 = 0.230

Here the integer part and the fractional part of the number _1.234_ are
passed directly as an argument to the _print_ opcode, without needing to
be stored at any point as a variable.

This alternative way of formulating code can now be used with many
opcodes in Csound6.^[The main restriction is that it can only be
used by opcodes which have only one output (not two or more).]
First we shall look at some examples.

The traditional way of applying a fade and a sliding pitch (glissando)
to a tone is something like this:

**_EXAMPLE 03I01_traditional_syntax.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

instr 1
kFade    linseg   0, p3/2, 0.2, p3/2, 0
kSlide   expseg   400, p3/2, 800, p3/2, 600
aTone    poscil   kFade, kSlide
         out      aTone
endin

</CsInstruments>
<CsScore>
i 1 0 5
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

In plain English what is happening is:

1.  We create a line signal with the opcode _linseg._ It starts at zero,
    moves to 0.2 in half of the instrument's duration (p3/2), and moves
    back to zero for the second half of the instrument's duration. We
    store this signal in the variable _kFade_.
2.  We create an exponential signal with the opcode _expseg._ It
    starts at 400, moves to 800 in half the instrument's duration, and
    moves to 600 for the second half of the instrument's duration. We
    store this signal in the variable _kSlide_.
3.  We create a sine audio signal with the opcode _poscil_. We feed in
    the signal stored in the variable kFade as amplitude, and the signal
    stored in the variable kSlide as frequency input. We store the audio
    signal in the variable _aTone_.
4.  Finally, we write the audio signal to the output with the opcode
    _out_.

Each of these four lines can be considered as a "function call", as we
call the opcodes (functions) _linseg_, _expseg_, _poscil_ and _out_ with
certain arguments (input parameters). If we now transform this example
to functional syntax, we will avoid storing the result of a function
call in a variable. Rather we will feed the function and its arguments
directly into the appropriate slot, by means of the fun() syntax.

If we write the first line in functional syntax, it will look like this:

    linseg(0, p3/2, 0.2, p3/2, 0)

And the second line will look like this:

    expseg(400, p3/2, 800, p3/2, 600)

So we can reduce our code from four lines to two lines:

**_EXAMPLE 03I02_functional_syntax_1.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

instr 1
 aTone poscil linseg(0,p3/2,.2,p3/2,0), expseg(400,p3/2,800,p3/2,600)
 out aTone
endin

</CsInstruments>
<CsScore>
i 1 0 5
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

Or if you prefer the "all-in-one" solution:^[Please note that
these two examples are not really correct, because the rates
of the opcodes are not specified.]

**_EXAMPLE 03I03_functional_syntax_2.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

instr 1
out(poscil(linseg(0,p3/2,.2,p3/2,0),expseg(400,p3/2,800,p3/2,600)))
endin

</CsInstruments>
<CsScore>
i 1 0 5
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

## Declare your color: i, k or a?

Most of the Csound opcodes work not only at one rate. You can, for
instance, produce random numbers at i-, k- or a-rate:^[See chapter
[03A Initialization and Performance Pass](03-a-initialization-and-performance-pass.md)
for a more thorough explanation.]

    ires      random    imin, imax
    kres      random    kmin, kmax
    ares      random    kmin, kmax

Let us assume we want to change the highest frequency in our example
from 800 to a random value between 700 and 1400 Hz, so that we hear a
different movement for each tone. In this case, we can simply write
_random(700, 1400)_:

**_EXAMPLE 03I04_functional_syntax_rate_1.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

instr 1
 out(poscil(linseg(0,p3/2,.2,p3/2,0),
     expseg(400,p3/2,random(700,1400),p3/2,600)))
endin

</CsInstruments>
<CsScore>
r 5
i 1 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

But why is the _random_ opcode here performing at i-rate, and not at k- or a-rate? This is, so to say, pure random --- it happens because in the Csound soruces the i-rate variant of this opcode is written first.^[See
<https://github.com/csound/csound/blob/develop/Opcodes/uggab.c>,
line 2085] If the k-rate variant were first, the above code failed.

So it is both, clearer and actually required, to explicitly declare at which rate a function is to be performed. This code claims that _poscil_ runs at a-rate, _linseg_ and _expseg_ run at k-rate, and _random_ runs at i-rate here:

**_EXAMPLE 03I05_functional_syntax_rate_2.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

instr 1
out(poscil:a(linseg:k(0, p3/2, 1, p3/2, 0),
             expseg:k(400, p3/2, random:i(700, 1400), p3/2, 600)))
endin

</CsInstruments>
<CsScore>
r 5
i 1 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

Rate declaration is done with simply specifying :a, :k or :i after
the function. It would represent good practice to include it all the
time, to be clear about what is happening.

## fun() with UDOs

It should be mentioned that you can use the functional style also with
self created opcodes ("User Defined Opcodes"):

**_EXAMPLE 03I06_functional_syntax_udo.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 1
ksmps = 32
0dbfs = 1

opcode FourModes, a, akk[]
  ;kFQ[] contains four frequency-quality pairs
  aIn, kBasFreq, kFQ[] xin
aOut1 mode aIn, kBasFreq*kFQ[0], kFQ[1]
aOut2 mode aIn, kBasFreq*kFQ[2], kFQ[3]
aOut3 mode aIn, kBasFreq*kFQ[4], kFQ[5]
aOut4 mode aIn, kBasFreq*kFQ[6], kFQ[7]
      xout (aOut1+aOut2+aOut3+aOut4) / 4
endop

instr 1
kArr[] fillarray 1, 2000, 2.8, 2000, 5.2, 2000, 8.2, 2000
aImp   mpulse    .3, 1
       out       FourModes(aImp, 200, kArr)
endin

</CsInstruments>
<CsScore>
i 1 0 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz, based on an example of iain mccurdy
```

Besides the ability of functional expressions to abbreviate code, this way of writing Csound code allows to conincide with a convention which is shared by many programming languages. This final example is doing exactly the same as the previous one, but for some programmers in a more clear and common way:

**_EXAMPLE 03I07_functional_syntax_udo_2.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 2
ksmps = 32
0dbfs = 1

opcode FourModes, a, akk[]
 aIn, kBasFreq, kFQ[] xin
 aOut1 = mode:a(aIn,kBasFreq*kFQ[0],kFQ[1])
 aOut2 = mode:a(aIn,kBasFreq*kFQ[2],kFQ[3])
 aOut3 = mode:a(aIn,kBasFreq*kFQ[4],kFQ[5])
 aOut4 = mode:a(aIn,kBasFreq*kFQ[6],kFQ[7])
 xout (aOut1+aOut2+aOut3+aOut4) / 4
endop

instr 1
 kArr[] = fillarray(1, 2000, 2.8, 2000, 5.2, 2000, 8.2, 2000)
 aImp   = mpulse:a(.3, 1)
 aOut   = FourModes(aImp, randomh:k(200,195,1), kArr)
 out(aOut, aOut)
endin

</CsInstruments>
<CsScore>
i 1 0 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz, based on an example of iain mccurdy
```
