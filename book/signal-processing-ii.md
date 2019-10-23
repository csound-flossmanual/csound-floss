SIGNAL PROCESSING II
====================

OPCODE GUIDE: ADVANCED SIGNAL PROCESSING
----------------------------------------

 

-   ### MODULATION AND DISTORTION

    -   #### Frequency Modulation

        [**foscil**](http://www.csounds.com/manual/html/foscil.html) and
        [**foscili**](http://www.csounds.com/manual/html/foscili.html)
        implement composite units for FM in the Chowning setup.\

        [**crossfm**](http://www.csounds.com/manual/html/crossfm.html),
        [**crossfmi**](http://www.csounds.com/manual/html/crossfm.html),
        [**crosspm**](http://www.csounds.com/manual/html/crossfm.html),
        [**crosspmi**](http://www.csounds.com/manual/html/crossfm.html),
        [**crossfmpm**](http://www.csounds.com/manual/html/crossfm.html)
        and
        [**crossfmpmi**](http://www.csounds.com/manual/html/crossfm.html)
        are different units for cross-frequency and cross-phase
        modulation.

    -   #### Distortion And Wave Shaping

        [](http://www.csounds.com/manual/html/distort.html)

        [**distort**](http://www.csounds.com/manual/html/distort.html)
        and
        [**distort1**](http://www.csounds.com/manual/html/distort1.html)
        perform waveshaping using a function table (distort) or by
        modified hyperbolic tangent distortion (distort1).\

        [**powershape**](http://www.csounds.com/manual/html/powershape.html)
        waveshapes a signal by raising it to a variable exponent.

        [**polynomial**](http://www.csounds.com/manual/html/polynomial.html)
        efficiently evaluates a polynomial of arbitrary order.

        [**chebyshevpoly**](http://www.csounds.com/manual/html/chebyshevpoly.html)
        efficiently evaluates the sum of Chebyshev polynomials of
        arbitrary order.\

        [GEN03](http://www.csounds.com/manual/html/GEN03.html),
        [GEN13](http://www.csounds.com/manual/html/GEN13.html),
        [GEN14](http://www.csounds.com/manual/html/GEN14.html) and
        [GEN15](http://www.csounds.com/manual/html/GEN15.html) are also
        used for waveshaping.

    -   #### Flanging, Phasing, Phase Shaping

        [](http://www.csounds.com/manual/html/flanger.html)

        [**flanger**](http://www.csounds.com/manual/html/flanger.html)
        implements a user controllable flanger.

        [**harmon**](http://www.csounds.com/manual/html/harmon.html)
        analyzes an audio input and generates harmonizing voices in
        synchrony.\

        [**phaser1**](http://www.csounds.com/manual/html/phaser1.html)
        and
        [**phaser2**](http://www.csounds.com/manual/html/phaser2.html)
        implement first- or second-order allpass filters arranged in a
        series.\

        [**pdclip**](http://www.csounds.com/manual/html/pdclip.html),
        [**pdhalf**](http://www.csounds.com/manual/html/pdhalf.html) and
        [**pdhalfy**](http://www.csounds.com/manual/html/pdhalfy.html)
        are useful for phase distortion synthesis.

    -   #### Doppler Shift

        [](http://www.csounds.com/manual/html/doppler.html)[**doppler**](http://www.csounds.com/manual/html/doppler.html)
        lets you calculate the doppler shift depending on the position
        of the sound source and the microphone.

<!-- -->

-   ### GRANULAR SYNTHESIS

    [](http://www.csounds.com/manual/html/partikkel.html)

    [**partikkel**](http://www.csounds.com/manual/html/partikkel.html)
    is the most flexible opcode for granular synthesis. You should be
    able to do everything you like in this field. The only drawback is
    the large number of input arguments, so you may want to use other
    opcodes for certain purposes.

    You can find a list of other relevant opcodes
    [here](http://www.csounds.com/manual/html/SiggenGranular.html). 

    [**sndwarp**](http://www.csounds.com/manual/html/sndwarp.html)
    focusses granular synthesis on time stretching and/or pitch
    modifications. Compare
    [waveset](http://www.csounds.com/manual/html/waveset.html) and the
    pvs-opcodes
    [pvsfread](http://www.csounds.com/manual/html/pvsfread.html),
    [pvsdiskin](http://www.csounds.com/manual/html/pvsdiskin.html),
    [pvscale](http://www.csounds.com/manual/html/pvscale.html),
    [pvshift](http://www.csounds.com/manual/html/pvshift.html) for other
    implementations of time and/or pitch modifications.

<!-- -->

-   ### CONVOLUTION

    [](http://www.csounds.com/manual/html/pconvolve.html)

    [**pconvolve**](http://www.csounds.com/manual/html/pconvolve.html)
    performs convolution based on a uniformly partitioned overlap-save
    algorithm.\

    [**ftconv**](http://www.csounds.com/manual/html/ftconv.html) is
    similar to pconvolve, but you can also use parts of the impulse
    response file, instead of reading the whole file. It also permits
    the use of multichannel impulse files (up to 8-channels) to create
    multichannel outputs.\

    [**dconv**](http://www.csounds.com/manual/html/dconv.html) performs
    direct convolution. 

<!-- -->

-   ### FFT AND SPECTRAL PROCESSING

    -   #### Realtime Analysis And Resynthesis

        [](http://www.csounds.com/manual/html/pvsanal.html)

        [**pvsanal**](http://www.csounds.com/manual/html/pvsanal.html)
        performs a Fast Fourier Transformation of an audio stream
        (a-signal) and stores the result in an f-variable.

        [**pvstanal**](http://www.csounds.com/manual/html/pvstanal.html)
        creates an f-signal directly from a sound file which is stored
        in a function table (usually via GEN01). \

        [**pvsynth**](http://www.csounds.com/manual/html/pvsynth.html)
        performs an Inverse FFT (takes a f-signal and returns an
        audio-signal).

        [**pvsadsyn**](http://www.csounds.com/manual/html/pvsadsynth.html)
        is similar to pvsynth, but resynthesizes with a bank of
        oscillators, instead of direct IFFT.

    -   #### Writing FFT Data To a File and Reading From it

        [](http://www.csounds.com/manual/html/pvsfwrite.html)

        [**pvsfwrite**](http://www.csounds.com/manual/html/pvsfwrite.html)
        writes an f-signal (= the FFT data) from inside Csound to a
        file. This file has the PVOCEX format and uses the file
        extension .pvx.

        [pvanal](http://www.csounds.com/manual/html/pvanal.html)
        actually does the same as Csound
        [Utility](http://www.csounds.com/manual/html/UtilityTop.html) (a
        seperate program which can be called in QuteCsound or via the
        Terminal). In this case, the input is an audio file.

        [**pvsfread**](http://www.csounds.com/manual/html/pvsfread.html)
        reads the FFT data from an existing .pvx file. This file can be
        generated by the Csound Utility pvanal. Reading of the file is
        carried out using a time pointer.

        [**pvsdiskin**](http://www.csounds.com/manual/html/pvsdiskin.html)
        is similar to pvsfread, but reading is done by a speed argument.

    -   #### Writing FFT Data To a Buffer and Reading From it 

        [](http://www.csounds.com/manual/html/pvsbuffer.html)

        [**pvsbuffer**](http://www.csounds.com/manual/html/pvsbuffer.html)
        writes an f-signal into a circular buffer that it also creates.

        [**pvsbufread**](http://www.csounds.com/manual/html/pvsbufread.html)
        reads an f-signal from a buffer which was created by pvsbuffer.

        [**pvsftw**](http://www.csounds.com/manual/html/pvsftw.html)
        writes amplitude and/or frequency data from a f-signal to a
        function table.

        [**pvsftr**](http://www.csounds.com/manual/html/pvsftr.html)
        transforms amplitude and/or frequency data from a function table
        to a f-signal.

    -   #### FFT Info 

        [](http://www.csounds.com/manual/html/pvsinfo.html)

        [**pvsinfo**](http://www.csounds.com/manual/html/pvsinfo.html)
        gets information, either from a realtime f-signal or from a .pvx
        file.

        [**pvsbin**](http://www.csounds.com/manual/html/pvsbin.html)
        gets the amplitude and frequency values from a single bin of an
        f-signal.

        [**pvscent**](http://www.csounds.com/manual/html/pvscent.html)
        calculates the spectral centroid of a signal.\

    -   #### Manipulating FFT Signals 

        [](http://www.csounds.com/manual/html/pvscale.html)

        [**pvscale**](http://www.csounds.com/manual/html/pvscale.html)
        transposes the frequency components of a f-stream by simple
        multiplication.

        [**pvshift**](http://www.csounds.com/manual/html/pvshift.html)
        changes the frequency components of a f-stream by adding a shift
        value, starting at a certain bin.

        [**pvsbandp**](http://www.csounds.com/manual/html/pvsbandp.html)
        and
        [**pvsbandr**](http://www.csounds.com/manual/html/pvsbandr.html)
        applies a band pass and band reject filter to the frequency
        components of a f-signal.

        [**pvsmix**](http://www.csounds.com/manual/html/pvsmix.html),
        [**pvscross**](http://www.csounds.com/manual/html/pvscross.html),
        [**pvsfilter**](http://www.csounds.com/manual/html/pvsfilter.html),
        [**pvsvoc**](http://www.csounds.com/manual/html/pvsvoc.html) and
        [**pvsmorph**](http://en.flossmanuals.net/bin/view/Csound/pvsmorph)
        perform different methods of cross synthesis between two
        f-signals.

        [**pvsfreeze**](http://www.csounds.com/manual/html/pvsfreeze.html)
        freezes the amplitude and/or frequency of an f-signal according
        to a k-rate trigger.

        [**pvsmaska**](http://www.csounds.com/manual/html/pvsmaska.html),
        [**pvsblur**](http://www.csounds.com/manual/html/pvsblur.html),
        [**pvstencil**](http://www.csounds.com/manual/html/pvstencil.html),
        [**pvsarp**](http://www.csounds.com/manual/html/pvsarp.html),
        [**pvsmooth**](http://www.csounds.com/manual/html/pvsmooth.html)
        perform a variety of other manipulations on a stream of FFT
        data.

<!-- -->

-   ### PHYSICAL MODELS AND FM INSTRUMENTS

    -   #### Waveguide Physical Modelling

        see
        [here](http://www.csounds.com/manual/html/SiggenWavguide.html) 
        and
        [here](http://www.csounds.com/manual/html/SigmodWavguide.html) \

    -   #### FM Instrument Models

        see
        [here](http://www.csounds.com/manual/html/SiggenFmsynth.html)
