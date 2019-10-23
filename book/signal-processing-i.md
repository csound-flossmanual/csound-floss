SIGNAL PROCESSING I
===================

OPCODE GUIDE: BASIC SIGNAL PROCESSING
-------------------------------------

 

-   ### OSCILLATORS AND PHASORS

    -   #### Standard Oscillators

        [**oscils**](http://www.csounds.com/manual/html/oscils.html) is
        a very **simple sine oscillator** which is ideally suited for
        quick tests. It needs no function table, but offers just i-rate
        input arguments.

        [**ftgen**](http://www.csounds.com/manual/html/ftgen.html)
        generates a function table, which is needed by any oscillator
        except [oscils](http://www.csounds.com/manual/html/oscils.html).
        The [GEN
        Routines](http://www.csounds.com/manual/html/ScoreGenRef.html)
        fill the function table with any desired waveform, either a sine
        wave or any other curve. Refer to the [function table
        chapter](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES)
        of this manual for more information.\

        [**poscil**](http://www.csounds.com/manual/html/poscil.html) can
        be recommended as **standard oscillator** because it is very
        precise, in particular for long tables and low frequencies. It
        provides linear interpolation, any rate its amplitude and
        frequency input arguments, and works also for non-power-of-two
        tables.
        [poscil3](http://www.csounds.com/manual/html/poscil3.html)
        provides cubic interpolation, but has just k-rate input. **Other
        common oscillators** are
        [oscili](http://www.csounds.com/manual/html/oscili.html) and
        [oscil3](http://www.csounds.com/manual/html/oscil3.html). They
        are less precise than poscil/poscili, but you can skip the
        initialization which can be useful in certain situations. The
        [oscil](http://www.csounds.com/manual/html/oscil.html) opcode
        does not provide any interpolation, so it should usually be
        avoided. **More** Csound oscillators can be found
        [here](http://www.csounds.com/manual/html/SiggenBasic.html).

    -   #### Dynamic Spectrum Oscillators

        [](http://www.csounds.com/manual/html/buzz.html)

        [**buzz**](http://www.csounds.com/manual/html/buzz.html) and
        [**gbuzz**](http://www.csounds.com/manual/html/gbuzz.html)
        generate a set of harmonically related cosine partials.

        [**mpulse**](http://www.csounds.com/manual/html/mpulse.html)
        generates a set of impulses of user-definable amplitude and
        interval gap between impulses.

        [**vco**](http://www.csounds.com/manual/html/vco.html) and
        [**vco2**](http://www.csounds.com/manual/html/vco2.html)
        implement band-limited, analogue modelled oscillators that can
        use variety of standard waveforms.

    -   ##### Phasors

        [](http://www.csounds.com/manual/html/phasor.html)[**phasor**](http://www.csounds.com/manual/html/phasor.html)
        produces the typical moving phase values between 0 and 1. The
        more complex
        [syncphasor](http://www.csounds.com/manual/html/syncphasor.html)
        lets you synchronize more than one phasor precisely.

<!-- -->

-   ### RANDOM AND NOISE GENERATORS

    [](http://www.csounds.com/manual/html/seed.html)

    [**seed**](http://www.csounds.com/manual/html/seed.html) sets the
    seed value for the majority of the Csound (pseudo) random number
    generators. A seed value of zero will seed random number generators
    from the system clock thereby guaranteeing a different result each
    time Csound is run, while any other seed value generates the same
    random values each time.\

    [**rand**](http://www.csounds.com/manual/html/rand.html) is the
    usual opcode for uniformly distributed bipolar random values. If you
    give 1 as input argument (called \"amp\"), you will get values
    between -1 and +1.
    **[randi](http://www.csounds.com/manual/html/randi.html)**
    interpolates between values which are generated with a variable
    frequency.
    **[randh](http://www.csounds.com/manual/html/randh.html)** holds the
    value until the next one is generated (sample and hold). You can
    control the seed value by an input argument (a value greater than 1
    seeds from current time), you can decide whether to generate 16bit
    or 31bit random numbers and you can add an offset.\

    **[rnd31](http://www.csounds.com/manual/html/rnd31.html)** can
    output all rates of variables (i-rate variables are not supported by
    rand). It also gives the user control over the random distribution,
    but has no offset parameter.

    [**random**](http://www.csounds.com/manual/html/random.html)
    provides extra conveniece in that the user can define both the
    minimum and a maximum of the distribution as input argument; *rand*
    and *rnd31* only output bipolar ranges and we define amplitude. It
    can also be used for all rates, but you have no direct seed input,
    and the
    [randomi](http://www.csounds.com/manual/html/randomi.html)/[randomh](http://www.csounds.com/manual/html/randomh.html)
    variants always start from the lower border, instead anywhere
    between the borders.

    **[pinkish](http://www.csounds.com/manual/html/pinkish.html)**
    produces pink noise at audio-rate (white noise can be produced using
    *rand* or *noise*).

    There are many more random opcodes worth investigating.
    [Here](http://www.csounds.com/manual/html/SiggenNoise.html) is an
    overview. A number of GEN routines are also used for generating
    random distributions. They can be found in the [GEN Routines
    overview](http://www.csounds.com/manual/html/ScoreGenRef.html).

<!-- -->

-   ### ENVELOPES

    -   #### Simple Standard Envelopes

        [](http://www.csounds.com/manual/html/linen.html)

        [**linen**](http://www.csounds.com/manual/html/linen.html)
        applies a linear rise (fade in) and decay (fade out) to a
        signal. It is very easy to use, as you put the raw audio signal
        in and get the enveloped signal out.

        [**linenr**](http://www.csounds.com/manual/html/linenr.html)
        does the same for any note whose duration is not known when they
        begin. This could mean MIDI notes or events triggered in real
        time. linenr begins the final stage of the envelope only when
        that event is turned off (released). The penultimate value is
        held until this release is received.

        **[adsr](http://www.csounds.com/manual/html/adsr.html)**
        calculates the classic attack-decay-sustain-release envelope.
        The result is to be multiplied with the audio signal to get the
        enveloped signal.

        [**madsr**](http://www.csounds.com/manual/html/madsr.html) does
        the same for notes triggered in real time (functioning in a
        similar way to linenr explained above).

        Other standard envelope generators can be found in the [Envelope
        Generators
        overview](http://www.csounds.com/manual/html/SiggenEnvelope.html)
        of the Canonical Csound Manual.

    -   #### Envelopes By Linear And Exponential Generators 

        **[linseg](http://www.csounds.com/manual/html/linseg.html)**
        creates one or more segments of lines between specified points.

        **[expseg](http://www.csounds.com/manual/html/expseg.html)**
        does the same but with exponential segments. Note that zero
        values or crossing the zero axis are illegal.

        **[transeg](http://www.csounds.com/manual/html/transeg.html)**
        is particularly flexible as you can specify the shape of each
        segment individually (continuously from convex to linear to
        concave).

        All of these opcodes have \'r\' variants
        ([linsegr](http://www.csounds.com/manual/html/linsegr.html),
        [expsegr](http://www.csounds.com/manual/html/expsegr.html),
        [transegr](http://en.flossmanuals.net/bin/view/Csound/transegr))
        for MIDI or other real time triggered events. (\'r\' stands for
        \'release\'.)\

        More opcodes for generating envelopes can be found in
        [this](http://www.csounds.com/manual/html/SiggenLineexp.html)
        overview.

    -   #### Envelopes By Function Tables

        Any function table (or part of it) can be used as envelope. Once
        a function table has been created using
        [ftgen](http://www.csounds.com/manual/html/ftgen.html) or a [GEN
        Routine](http://www.csounds.com/manual/html/ScoreGenRef.html) it
        can then be read using an oscillator, and multiply the result
        with the audio signal you want to envelope. \

<!-- -->

-   ### DELAYS

    -   #### Audio Delays

        The **vdelay family** of opcodes are easy to use and implement
        all the necessary features expected when working with delays:

        [**vdelay**](http://www.csounds.com/manual/html/vdelay.html)
        implements a variable delay at audio rate with linear
        interpolation.

        [**vdelay3**](http://www.csounds.com/manual/html/vdelay.html)
        offers cubic interpolation.

        [**vdelayx**](http://www.csounds.com/manual/html/vdelayx.html)
        has an even higher quality interpolation (and is for this reason
        slower).
        [vdelayxs](http://www.csounds.com/manual/html/vdelayxs.html)
        lets you input and output two channels, and
        [vdelayxq](http://www.csounds.com/manual/html/vdelayxq.html)
        four.

        [**vdelayw**](http://www.csounds.com/manual/html/vdelayw.html)
        changes the position of the write tap in the delay line instead
        of the read tap.
        [vdelayws](http://www.csounds.com/manual/html/vdelayws.html) is
        for stereo, and
        [vdelaywq](http://www.csounds.com/manual/html/vdelaywq.html) for
        quadro.

        The **delayr/delayw** opcodes establishes a delay line in a more
        complicated way. The advantage is that you can have as many taps
        in one delay line as you need.

        [**delayr**](http://www.csounds.com/manual/html/delayr.html)
        establishes a delay line and reads from the end of it.

        [**delayw**](http://www.csounds.com/manual/html/delayw.html)
        writes an audio signal to the delay line.

        [**deltap**](http://www.csounds.com/manual/html/deltap.html),
        [**deltapi**](http://www.csounds.com/manual/html/deltapi.html),
        [**deltap3**](http://www.csounds.com/manual/html/deltap3.html),
        [**deltapx**](http://www.csounds.com/manual/html/deltapx.html)
        and
        [**deltapxw**](http://www.csounds.com/manual/html/deltapxw.html)
        function in a similar manner to the relevant opcodes of the
        vdelay family (see above) bearing the same suffixes.

        [**deltapn**](http://www.csounds.com/manual/html/deltapn.html)
        offers a tap delay measured in samples, not seconds. This might
        be more useful in the design of filters\

    -   #### Control Delays

        [](http://www.csounds.com/manual/html/delayk.html)[**delk**](http://www.csounds.com/manual/html/delayk.html)
        and
        [**vdel\_k**](http://www.csounds.com/manual/html/delayk.html)
        let you delay any k-signal by some time interval (useful, for
        instance, as a kind of \'wait\' function).

<!-- -->

-   ### FILTERS

    Csound boasts an extensive range of filters and they can all be
    perused on the Csound Manual pages for [Standard
    Filters](http://www.csounds.com/manual/html/SigmodStandard.html) and
    [Specialized
    Filters](http://www.csounds.com/manual/html/SigmodSpeciali.html).
    Here, some of the most frequently used filters are mentioned, and
    some tips are given. Note that filters usually change the signal
    level, so you may also find the
    [balance](http://www.csounds.com/manual/html/balance.html) opcode
    useful.

    -   #### Low Pass Filters

        [](http://www.csounds.com/manual/html/tone.html)

        [**tone**](http://www.csounds.com/manual/html/tone.html) is a
        first order recursive low pass filter.
        [tonex](http://www.csounds.com/manual/html/tonex.html)
        implements a series of tone filters.\

        [**butlp**](http://www.csounds.com/manual/html/butterlp.html) is
        a second order low pass Butterworth filter.

        [**clfilt**](http://www.csounds.com/manual/html/clfilt.html)
        lets you choose between different filter types and different
        numbers of poles in the design.

    <!-- -->

    -   #### High Pass Filters

        [](http://www.csounds.com/manual/html/atone.html)

        [**atone**](http://www.csounds.com/manual/html/atone.html) is a
        first order recursive high pass filter.
        [atonex](http://www.csounds.com/manual/html/atonex.html)
        implements a series of atone filters.\

        [**buthp**](http://www.csounds.com/manual/html/butterhp.html) is
        a second order high pass Butterworth filter.

        [**clfilt**](http://www.csounds.com/manual/html/clfilt.html)
        lets you choose between different filter types and different
        numbers of poles in the design.

    <!-- -->

    -   #### Band Pass And Resonant Filters

        [](http://www.csounds.com/manual/html/reson.html)

        [**reson**](http://www.csounds.com/manual/html/reson.html) is a
        second order resonant filter.
        [resonx](http://www.csounds.com/manual/html/resonx.html)
        implements a series of reson filters, while
        [resony](http://www.csounds.com/manual/html/resony.html)
        emulates a bank of second order bandpass filters in parallel.
        [resonr](http://www.csounds.com/manual/html/resonr.html) and
        [resonz](http://www.csounds.com/manual/html/resonz.html) are
        variants of reson with variable frequency response.\

        [**butbp**](http://www.csounds.com/manual/html/butterbp.html) is
        a second order band-pass Butterworth filter.

    <!-- -->

    -   #### Band Reject Filters

        [](http://www.csounds.com/manual/html/areson.html)

        [**areson**](http://www.csounds.com/manual/html/areson.html) is
        the complement of the reson filter.  

        [**butbr**](http://www.csounds.com/manual/html/butterbp.html) is
        a band-reject butterworth filter.

    -   #### Filters For Smoothing Control Signals

        [](http://www.csounds.com/manual/html/port.html)[**port**](http://www.csounds.com/manual/html/port.html)
        and [**portk**](http://www.csounds.com/manual/html/portk.html)
        are very frequently used to smooth control signals which are
        received by MIDI or widgets.

<!-- -->

-   ### REVERB

    Note that you can easily work in Csound with convolution reverbs
    based on impulse response files, for instance with
    [pconvolve](http://www.csounds.com/manual/html/pconvolve.html). 

    [**freeverb**](http://www.csounds.com/manual/html/freeverb.html) is
    the implementation of Jezar\'s well-known free (stereo) reverb.

    [**reverbsc**](http://www.csounds.com/manual/html/reverbsc.html) is
    a stereo FDN reverb, based on work of Sean Costello.

    [**reverb**](http://www.csounds.com/manual/html/reverb.html) and
    [**nreverb**](http://www.csounds.com/manual/html/nreverb.html) are
    the traditional Csound reverb units.

    [**babo**](http://www.csounds.com/manual/html/babo.html) is a
    physical model reverberator (\"ball within the box\").

<!-- -->

-   ### SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS

    -   #### Amplitude Measurement And Amplitude Envelope Following

        [**rms**](http://www.csounds.com/manual/html/rms.html)
        determines the root-mean-square amplitude of an audio signal.

        **[balance](http://www.csounds.com/manual/html/balance.html)**
        adjusts the amplitudes of an audio signal according to the rms
        amplitudes of another audio signal.\

        [**follow**](http://www.csounds.com/manual/html/follow.html) /
        [**follow2**](http://www.csounds.com/manual/html/follow2.html)
        are envelope followers which report the average amplitude in a
        certain time span (follow) or according to an attack/decay rate
        (follow2).\

        [**peak**](http://www.csounds.com/manual/html/peak.html) reports
        the highest absolute amplitude value received.\

        [**max\_k**](http://www.csounds.com/manual/html/max_k.html)
        outputs the local maximum or minimum value of an incoming audio
        signal, checked in a certain time interval.

    <!-- -->

    -   #### Pitch Estimation

        [](http://www.csounds.com/manual/html/ptrack.html)

        [**ptrack**](http://www.csounds.com/manual/html/ptrack.html),
        [**pitch**](http://www.csounds.com/manual/html/pitch.html) and
        [**pitchamdf**](http://www.csounds.com/manual/html/pitchamdf.html)
        track the pitch of an incoming audio signal, using different
        methods.\

        [**pvscent**](http://www.csounds.com/manual/html/pvscent.html)
        calculates the spectral centroid for FFT streaming signals (see
        below under \"FFT And Spectral Processing\")

    <!-- -->

    -   #### Tempo Estimation

        [](http://www.csounds.com/manual/html/tempest.html)[**tempest**](http://www.csounds.com/manual/html/tempest.html)
        estimates the tempo of beat patterns in a control signal.  

    -   #### Dynamic Processing

        [](http://www.csounds.com/manual/html/compress.html)

        [**compress**](http://www.csounds.com/manual/html/compress.html)
        compresses, limits, expands, ducks or gates an audio signal.\

        [**dam**](http://www.csounds.com/manual/html/dam.html) is a
        dynamic compressor/expander.\

        [**clip**](http://www.csounds.com/manual/html/clip.html) clips
        an a-rate signal to a predefined limit, in a "soft" manner.

    -   #### Sample Level Operations

        [](http://www.csounds.com/manual/html/limit.html)

        [**limit**](http://www.csounds.com/manual/html/limit.html) sets
        the lower and upper limits of an incoming value (all rates).\

        [**samphold**](http://www.csounds.com/manual/html/samphold.html)
        performs a sample-and-hold operation on its a- or k-input.\

        [**vaget**](http://www.csounds.com/manual/html/vaget.html) /
        [**vaset**](http://www.csounds.com/manual/html/vaset.html) allow
        getting and setting certain samples of an audio vector at
        k-rate.

<!-- -->

-   ###  SPATIALIZATION

    -   #### Panning

        [](http://www.csounds.com/manual/html/pan2.html)

        [**pan2**](http://www.csounds.com/manual/html/pan2.html)
        distributes a mono audio signal across two channels according to
        a variety of panning laws.\

        [**pan**](http://www.csounds.com/manual/html/pan.html)
        distributes a mono audio signal amongst four channels.

    <!-- -->

    -   #### VBAP

        [](http://www.csounds.com/manual/html/vpaplsinit.html)

        [**vbaplsinit**](http://www.csounds.com/manual/html/vpaplsinit.html)
        configures VBAP output according to loudspeaker parameters for a
        2- or 3-dimensional space.\

        [**vbap4**](http://www.csounds.com/manual/html/vpap4.html) /
        [**vbap8**](http://www.csounds.com/manual/html/vbap8.html) /
        [**vbap16**](http://www.csounds.com/manual/html/vbap16.html)
        distributes an audio signal among up to 16 channels, with k-rate
        control over azimut, elevation and spread.

    -   #### Ambisonics

        [](http://www.csounds.com/manual/html/bformenc1.html)

        [**bformenc1**](http://www.csounds.com/manual/html/bformenc1.html)
        encodes an audio signal to the Ambisonics B format.\

        [**bformdec1**](http://www.csounds.com/manual/html/bformdec1.html)
        decodes Ambisonics B format signals to loudspeaker signals in
        different possible configurations.

    -   #### Binaural / HRTF

        [](http://www.csounds.com/manual/html/hrtfstat.html)[**hrtfstat**](http://www.csounds.com/manual/html/hrtfstat.html),
        [**hrtfmove**](http://www.csounds.com/manual/html/hrtfmove.html)
        and
        [**hrtfmove2**](http://www.csounds.com/manual/html/hrtfmove2.html)
        are opcodes for creating 3d binaural audio for headphones.
        [hrtfer](http://www.csounds.com/manual/html/hrtfer.html) is an
        older implementation. All of these opcodes require data files
        containing information about the sound shadowing qualities of
        the human head and ears.
