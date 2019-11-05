12 F. CSOUND AND HASKELL
========================

Csound-expression 
------------------

Csound-expression is a framework for creation of computer music.\
It\'s a Haskell library to make Csound much more friendly.\
It generates Csound files out of Haskell code.\
\
With the help of the library we can create our instruments on the fly. A
few lines in the interpreter is enough to get the cool sound going out
of your speakers. Some of the features of the library are heavily
inspired by reactive programming. We can invoke the instruments with
event streams. Event streams can be combined in the manner of reactive
programming. The GUI-widgets are producing the event streams as a
control messages. Moreover with Haskell we get all standard types and
functions like lists, maps, trees. It\'s a great way to organize code
and data.\
\
Csound-expression is an open source library. It\'s available on Hackage
(the main base of Haskell projects).\
\

### Key principles

Here is an overview of the features and principles:\

-   Keep it simple and compact.
-   Try to hide low level Csound\'s wiring as much as we can (no ids for
    ftables, instruments, global variables). The haskell is a modern
    language with rich set of abstractions. The author tried to keep the
    Csound primitives as close to the haskell as possible. For example,
    invocation of the instrument is just an application of the function.
-   No distinction between audio and control rates on the type level.
    Derive all rates from the context. If the user plugs signal to an
    opcode that expects an audio rate signal the argument is converted
    to the right rate.
-   Less typing, more music. Use short names for all types. Make library
    so that all expressions can be built without type annotations. Make
    it simple for the compiler to derive all types. Don\'t use complex
    type classes.
-   Ensure that output signal is limited by amplitude. Csound can
    produce signals with HUGE amplitudes. Little typo can damage your
    ears and your speakers. In generated code all signals are clipped by
    0dbfs value. 0dbfs is set to 1. Just as in Pure Data. So 1 is
    absolute maximum value for amplitude.
-   Remove score/instrument barrier. Let instrument play a score within
    a note and trigger other instruments. Triggering the instrument is
    just an application of the function. It produces the signal as
    output which can be used in another instrument and so on. 
-   Set Csound flags with meaningful (well-typed) values. Derive as much
    as you can from the context. This principle let\'s us start for very
    simple expressions. We can create our audio signal apply the
    function dac to it and we are ready to hear the result in the
    speakers. No need for XML copy and paste form. It\'s as easy as
    typing the line           \~\~\~haskell\
        \> dac (osc 440)\
    \~\~\~\
        in the interpreter.
-   The standard functions for musical needs. We often need standard
    waveforms and filters and adsrs. Some functions are not so easy to
    use in the Csound. So there are a lot of predefined functions that
    capture lots of musical ideas. the library strives to defines audio
    DSP primitives in the most basic easiest form.
-   -   There are audio waves: osc, saw, tri, sqr, pw, ramp, and their
        unipolar friends (usefull for LFOs). 
    -   There are filters: lp, hp, bp, br, mlp (moog low pass), filt
        (for packing several filters in chain), formant filters with
        ppredefined vowels.
    -   There are handy envelopes: fades, fadeOut, fadeIn, linseg (with
        held last value).
    -   There noisy functions: white, pink.
    -   There are step sequencers: sqrSeq, sawSeq, adsrSeq, and many
        more. Step sequencer can produce the sequence of unipolar shapes
        for a given wave-form. The scale factors are defined as the list
        of values.

-   Composable GUIs. Interactive instruments should be easy to make. The
    GUI widget is a container for signal. It carries an output alongside
    with visual representation. There are standard ways of composition
    for the visuals (like horizontal or vertical grouping). It gives us
    the easy way to combine GUIs. That\'s how we can create a filtered
    saw-tooth that is controlled with sliders:\
    \~\~\~haskell\
    \> dac \$ vlift2 (\\cps q -\> mlp (100 + 5000 \* cps) q (saw 110))
    (uslider 0.5) (uslider 0.5)\
    \~\~\~\
    The function \`uslider\` produces slider which outputs a unipolar
    signal (ranges from 0 to 1). The single argument is an initial
    value. The function vlift2 groups visuals vertically and applies a
    function of two arguments to the outputs of the sliders. This way we
    get a new widget that produces the filtered sawtooth wave and
    contains two sliders. It can become a part of another expression. No
    need for separate declarations.
-   Event streams inspired with FRP (functional reactive programming).
    Event stream can produce values over time. It can be a metronome
    click or a push of the button, switch of the toggle button and so
    on. We have rich set of functions to combine events. We can map over
    events and filter the stream of events, we can merge two streams,
    accumulate the result.\
    That\'s how we can count the number of clicks:\
    \~\~\~\
    let clicks =  lift1 (\\evt -\> appendE (0 :: D) (+) \$ fmap
    (const 1) evt) \$ button \"Click me!\"\
    \~\~\~
-   There is a library that greatly simplifies the creation of the music
    that is based on samples. It\'s called csound-sampler. With it we
    can easily create patterns out of wav-files, we can reverse files or
    play random segments of files. 
-   There is a novel model for composition predefined in the library.
    It\'s based on the assumption that we can delay a signal with an
    event stream and stop it with an event stream. There is a tiny set
    of primitives:\
    \~\~\~haskell\
    toSeg \-- creates a segment out of the signal (it lasts
    indefinitely)\
    slim  \-- limits a segment by an event stream (the segment lasts and
    waits for the first\
              event in the event stream to stop itself)\
    sflow \-- it plays a list of segments on after another\
    spar  \-- it plays a list of segments at the same time\
    sloop \-- it plays a segment over and over again.\
    \~\~\~ 
-   With the library we can create our own libraries. We can create a
    palette  of instruments and use it as a library. It means we can
    just import the instruments o need for copy and paste and worry for
    collision of names while pasting. In fact there is a library on
    hackage that is called csound-catalog. It defines some instruments
    from the Csound Catalog.\

\

### Links

The library homepage on hackage:
<http://hackage.haskell.org/package/csound-expression>\
The library homepage on github:
<http://github.com/anton-k/csound-expression/blob/master/tutorial/Index.md>\
The csound-sampler library: <http://github.com/anton-k/csound-sampler>\
The csound-catalog library homepage on hackage:
<http://hackage.haskell.org/package/csound-catalog>\
Music made with Haskell and Csound: <http://soundcloud.com/anton-kho>
