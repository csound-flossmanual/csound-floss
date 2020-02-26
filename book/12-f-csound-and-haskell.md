12 F. CSOUND AND HASKELL
========================

Csound-expression
------------------

*Csound-expression* is a framework for creation of computer music. It is a Haskell library to ease the use of Csound. It generates Csound files out of Haskell code.

With the help of the library Csound instruments can be created on the fly. A
few lines in the interpreter is enough to get cool sound. Some of the features of the library are heavily
inspired by reactive programming. Instruments can be evoked with
event streams. Event streams can be combined in the manner of reactive
programming. The GUI-widgets are producing the event streams as
control messages. Moreover with Haskell all standard types and
functions like lists, maps and trees can be used. By this, code
and data can be organized easily.

One of the great features that comes with the library is a big collection of
solid patches which are predefined synthesizers with high quality sound.
They are provided with the library csound-catalog.

*Csound-expression* is an open source library. It's available on Hackage
(the main base of Haskell projects).


Key principles
--------------

Here is an overview of the features and principles:

-   Keep it simple and compact.
-   Support for interactive music coding. We can create our sounds in the REPL.
    So we can chat with our audio engine and can quickly test ideas.
    It greatly speeds up development comparing to traditional compile-listen style.
-   With the library we can create our own libraries. We can create a
    palette  of instruments and use it as a library. It means we can
    just import the instruments and there is no need for copy and paste and worry for
    collision of names while pasting. In fact there is a library on
    hackage that is called csound-catalog. It defines great high quality instruments
    from the Csound Catalog and other sources.
-   Try to hide low level Csound's wiring as much as we can (no IDs for
    ftables, instruments, global variables). Haskell is a modern
    language with a rich set of abstractions. The author tried to keep the
    Csound primitives as close to the haskell as possible. For example,
    invocation of the instrument is just an application of the function.
-   No distinction between audio and control rates on the type level.
    Derive all rates from the context. If the user plugs signal to an
    opcode that expects an audio rate signal the argument is converted
    to the right rate. Though user can force signal to be of desired type.
-   Less typing, more music. Use short names for all types. Make a library
    so that all expressions can be built without type annotations. Make
    it simple for the compiler to derive all types. Don't use complex
    type classes or brainy language concepts.
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
    as you can from the context. This principle let us start for very
    simple expressions. We can create our audio signal, apply the
    function `dac` to it and we are ready to hear the result in the
    speakers. No need for XML copy and paste form. It's as easy as
    typing the line\
        `> dac (osc 440)`\
    in the interpreter.
-   The standard functions for musical needs. We often need standard
    waveforms and filters and adsr's. Some functions are not so easy to
    use in the Csound. So there are a lot of predefined functions that
    capture lots of musical ideas. the library strives to defines audio
    DSP primitives in the most basic easiest form.
    -   There are audio waves: osc, saw, tri, sqr, pw, ramp, and their
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
    the easy way to combine GUIs. That's how we can create a filtered
    saw-tooth that is controlled with sliders:\
    `> dac $ vlift2 (\cps q -> mlp (100 + 5000 * cps) q (saw 110)) (uslider 0.5) (uslider 0.5)`\
    The function *uslider* produces slider which outputs a unipolar
    signal (ranges from 0 to 1). The single argument is an initial
    value. The function *vlift2* groups visuals vertically and applies a
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
    `let clicks =  lift1 (\evt -> appendE (0 :: D) (+) $ fmap (const 1) evt) $ button "Click me!"`\
-   There is a library that greatly simplifies the creation of the music
    that is based on samples. It's called csound-sampler. With it we
    can easily create patterns out of wav-files, we can reverse files or
    play random segments of files.

How to try out the library
-----------------------------

To try out the library you need:

* [ghc](https://www.haskell.org/ghc/) - Haskell compiler
* [cabal](https://www.haskell.org/cabal/) -- Haskell tool to install open source libraries
* [Csound](https://csound.com/) - to run the audio

As you install all those tools you can type in the terminal:

```
cabal install csound-catalog --lib
```

It will install csound-expression and batteries. If you want just the main library
use csound-expression instead of csound-catalog.

If your cabal version is lower than 3.0 version you can skip the flag `--lib`. 
The version of cabal can be checked with:

```
cabal --version
```

After that library is installed and is ready to be used. 
You can try in the haskell interpreter to import the library and hear the greeting test sound:

```
> ghci 
> import Csound.Base
> dac (testDrone3 220)
```

It works and you can hear the sound if you have installed evrything
and the system audio is properly configured to work with default Csound settings.

Next step to go would be to read through the [tutorial](https://github.com/spell-music/csound-expression/blob/master/tutorial/Index.md). The library covers almost all features of Csound so it is as huge as Csound but most
concepts are easy to grasp and it is driven by compositions of small parts. 


Links
-----
The library tutorial:
<https://github.com/spell-music/csound-expression/blob/master/tutorial/Index.md>\
The library homepage on hackage (it's haskell stock of open source projects):
<http://hackage.haskell.org/package/csound-expression>\
The library homepage on github:
<http://github.com/anton-k/csound-expression/blob/master/tutorial/Index.md>\
The csound-sampler library: <http://github.com/anton-k/csound-sampler>\
The csound-catalog library homepage on hackage:
<http://hackage.haskell.org/package/csound-catalog>\
Music made with Haskell and Csound: <http://soundcloud.com/anton-kho>
