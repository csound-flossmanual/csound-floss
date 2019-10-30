I. FUNCTIONAL SYNTAX
====================

Functional syntax is very common in many programming languages. It takes
the form of fun(), where fun is any function which encloses its
arguments in parentheses. Even in \"old\" Csound, there existed some
rudiments of this functional syntax in some mathematical functions, such
as sqrt(), log(), int(), frac(). For instance, the following code

    iNum = 1.234
    print int(iNum)
    print frac(iNum)

would print:

instr 1:  \#i0 = 1.000\
instr 1:  \#i1 = 0.230

Here the integer part and the fractional part of the number 1.234 are
passed directly as an argument to the *print* opcode, without needing to
be stored at any point as a variable.

This alternative way of formulating code can now be used with many
opcodes in Csound6^1^. In the future many more opcodes will be
incorporated into this system. First we shall look at some examples.

The traditional way of applying a fade and a sliding pitch (glissando)
to a tone is something like this:

  ***EXAMPLE 03I01\_traditional\_syntax.csd***

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
    kFade    linseg   0, p3/2, 1, p3/2, 0
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

In plain English what is happening is:

1.  We create a line signal with the opcode *linseg.* It starts at zero,
    moves to one in half of the instrument\'s duration (p3/2), and moves
    back to zero for the second half of the instrument\'s duration. We
    store this signal in the variable **kFade**.
2.  We create an exponential^2^ signal with the opcode *expseg.* It
    starts at 400, moves to 800 in half the instrument\'s duration, and
    moves to 600 for the second half of the instrument\'s duration. We
    store this signal in the variable **kSlide**.
3.  We create a sine audio signal with the opcode *poscil*. We feed in
    the signal stored in the variable kFade as amplitude, and the signal
    stored in the variable kSlide as frequency input. We store the audio
    signal in the variable **aTone**.
4.  Finally, we write the audio signal to the output with the opcode
    *out*.\

Each of these four lines can be considered as a \"function call\", as we
call the opcodes (functions) *linseg*, *expseg*, *poscil* and *out* with
certain arguments (input parameters). If we now transform this example
to functional syntax, we will avoid storing the result of a function
call in a variable. Rather we will feed the function and its arguments
directly into the appropriate slot, by means of the fun() syntax.

If we write the first line in functional syntax, it will look like this:

    linseg(0, p3/2, 1, p3/2, 0)

And the second line will look like this:

    expseg(400, p3/2, 800, p3/2, 600)

So we can reduce our code from four lines to two lines:

  ***EXAMPLE 03I02\_functional\_syntax\_1.csd***

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
    aTone    poscil   linseg(0, p3/2, 1, p3/2, 0), expseg(400, p3/2, 800, p3/2, 600)
             out      aTone
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Or would you prefer the \"all-in-one\" solution?

  ***EXAMPLE 03I03\_functional\_syntax\_2.csd***

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
    out poscil(linseg(0, p3/2, 1, p3/2, 0), expseg(400, p3/2, 800, p3/2, 600))
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 5
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Declare your color: i, k or a? 
-------------------------------

Most of the Csound opcodes work not only at one rate. You can, for
instance, produce random numbers at i-, k- or a-rate:^3^ 

    ires      random    imin, imax
    kres      random    kmin, kmax
    ares      random    kmin, kmax

Let us assume we want to change the highest frequency in our example
from 800 to a random value between 700 and 1400 Hz, so that we hear a
different movement for each tone. In this case, we can simply write
*random(700, 1400)*, because the context demands an i-rate result of the
random operation here:^4^

  ***EXAMPLE 03I04\_functional\_syntax\_rate\_1.csd***

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
    out poscil(linseg(0, p3/2, 1, p3/2, 0), expseg(400, p3/2, random(700, 1400), p3/2, 600))
    endin

    </CsInstruments>
    <CsScore>
    r 5
    i 1 0 3
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

But it is much clearer both, for the Csound parser and for the Csound
user, if you explicitly declare at which rate a function is to be
performed. This code claims that *poscil* runs at a-rate, *linseg* and
*expseg* run at k-rate, and *random* runs at i-rate here:\

  ***EXAMPLE 03I05\_functional\_syntax\_rate\_2.csd***

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
    out poscil:a(linseg:k(0, p3/2, 1, p3/2, 0), expseg:k(400, p3/2, random:i(700, 1400), p3/2, 600))
    endin

    </CsInstruments>
    <CsScore>
    r 5
    i 1 0 3
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

As you can see, rate declaration is done with simply :a, :k or :i after
the function. It would represent good practice to include it all the
time, to be clear about what is happening.

Only one output 
----------------

Currently, there is a limitation in that only opcodes which have one or
no outputs can be written using functional syntax. For instance, reading
a stereo file using soundin

    aL, aR soundin "my_file.wav"

**cannot** be written using functional syntax. This limitation is likely
to be removed in the future.

fun() with UDOs 
----------------

It should be mentioned that you can use the functional style also with
self created opcodes (\"User Defined Opcodes\"):\

  ***EXAMPLE 03I06\_functional\_syntax\_udo.csd***

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

How much fun() is good for you? 
--------------------------------

Only you, and perhaps your spiritual consultant, can know \...

But seriously, this is mostly a matter of style. Some people consider it
most elegant if all is written in one single expression, whilst others
prefer to see the signal flow from line to line. Certainly excessive
numbers of parentheses may not result in the best looking code \...

At least the functional syntax allows the user to emphasize his or her
own personal style and to avoid some awkwardness:

\"If i new value of kIn has been received, do this and that\", can be
written:

    if changed(kIn)==1 then
      <do this and that>
    endif

\"If you understand what happens here, you will have been moved to the
next level\", can be written:

 ***EXAMPLE 03I07\_functional\_syntax\_you\_win.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -odac -m128
    </CsOptions>
    <CsInstruments>
    sr = 44100
    nchnls = 1
    ksmps = 32
    0dbfs = 1
    seed 0

    opcode FourModes, a, akk[]
      ;kFQ[] contains four frequency-quality pairs
      aIn, kBasFreq, kFQ[] xin
    aOut1 mode aIn, kBasFreq*kFQ[0], kFQ[1]
    aOut2 mode aIn, kBasFreq*kFQ[2], kFQ[3]
    aOut3 mode aIn, kBasFreq*kFQ[4], kFQ[5]
    aOut4 mode aIn, kBasFreq*kFQ[6], kFQ[7]
          xout (aOut1+aOut2+aOut3+aOut4) / 4
    endop


    instr ham
    gkPchMovement = randomi:k(50, 1000, (random:i(.2, .4)), 3)
    schedule("hum", 0, p3)
    endin

    instr hum
    if metro(randomh:k(1, 10, random:k(1, 4), 3)) == 1 then
    event("i", "play", 0, 5, gkPchMovement)
    endif
    endin

    instr play
    iQ1 = random(100, 1000)
    kArr[] fillarray 1*random:i(.9, 1.1), iQ1,
                     2.8*random:i(.8, 1.2), iQ1*random:i(.5, 2),
                     5.2*random:i(.7, 1.4), iQ1*random:i(.5, 2),
                     8.2*random:i(.6, 1.8), iQ1*random:i(.5, 2)
    aImp   mpulse    ampdb(random:k(-30, 0)), p3
           out       FourModes(aImp, p4, kArr)*linseg(1, p3/2, 1, p3/2, 0)
    endin

    </CsInstruments>
    <CsScore>
    i "ham" 0 60
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz, with thanks to steven and iain

So enjoy, and stay in contact with the spirit \... 

 

 

1.  [thanks to the huge work of John ffitch, Steven Yi and others on a
    new parser]{#endnote-e2166531-1ed6-4743-9939-ca75a3ac389c}
2.  [which in simple words means that the signal moves like a curve
    which coincidents with the way we perceive frequency
    relations]{#endnote-5ff6b634-0c9b-4365-899f-840e8a7e3368}
3.  [See chapter 03A Initialization and Performance Pass for a more
    thorough
    explanation.]{#endnote-57b0f15e-116c-4216-8287-75a84727d795}
4.  [because all inputs for expseg must be
    i-rate]{#endnote-4aa70382-9a5c-4f07-bfa9-bb82a1da5b27}
