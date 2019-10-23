OVERVIEW
========

OPCODE GUIDE: OVERVIEW
----------------------

If you run Csound from the command line with the option -z, you get a
list of all opcodes. Currently (Csound 5.13), the total number of all
opcodes is about 1500. There are already overviews of all of Csound\'s
opcodes in the [Opcodes
Overview](http://www.csounds.com/manual/html/PartOpcodesOverview.html)
and the [Opcode Quick
Reference](http://www.csounds.com/manual/html/MiscQuickref.html) of the
[Canonical Csound
Manual](http://www.csounds.com/manual/html/index.html).

This chapter is another attempt to provide some orientation within
Csound\'s wealth of opcodes. Unlike the references mentioned above, not
all opcodes are listed here, but the ones that are, are commented upon
briefly. Some opcodes appear more than once and in different sections to
reflect the different contexts in which they could be used. This guide
intends to provide insights into the opcodes listed that the other
sources do not.

### BASIC SIGNAL PROCESSING

-   #### OSCILLATORS AND PHASORS

    -   ##### Standard Oscillators

        [(oscils)](http://www.csounds.com/manual/html/oscils.html) 
        [poscil](http://www.csounds.com/manual/html/poscil.html) 
        [poscil3](http://www.csounds.com/manual/html/poscil3.html) 
        [oscili](http://www.csounds.com/manual/html/oscili.html) 
        [oscil3](http://www.csounds.com/manual/html/oscil3.html) 
        [more](http://www.csounds.com/manual/html/SiggenBasic.html) 

    -   ##### Dynamic Sprectrum Oscillators

        [buzz](http://www.csounds.com/manual/html/buzz.html) 
        [gbuzz](http://www.csounds.com/manual/html/gbuzz.html) 
        [mpulse](http://www.csounds.com/manual/html/mpulse.html) 
        [vco](http://www.csounds.com/manual/html/vco.html) 
        [vco2](http://www.csounds.com/manual/html/vco2.html) \

    -   ##### Phasors

        [phasor](http://www.csounds.com/manual/html/phasor.html) 
        [syncphasor](http://www.csounds.com/manual/html/syncphasor.html)\

<!-- -->

-   #### RANDOM AND NOISE GENERATORS

    [(seed)](http://www.csounds.com/manual/html/seed.html) 
    [rand](http://www.csounds.com/manual/html/rand.html) 
    [randi](http://www.csounds.com/manual/html/randi.html) 
    [randh](http://www.csounds.com/manual/html/randh.html) 
    [rnd31](http://www.csounds.com/manual/html/rnd31.html) 
    [random](http://www.csounds.com/manual/html/random.html) 
    ([randomi](http://www.csounds.com/manual/html/randomi.html) /[randomh](http://www.csounds.com/manual/html/randomh.html)) 
    [pinkish](http://www.csounds.com/manual/html/pinkish.html) 
    [more](http://www.csounds.com/manual/html/SiggenNoise.html)  \

<!-- -->

-   #### ENVELOPES

    -   ##### Simple Standard Envelopes

        [linen](http://www.csounds.com/manual/html/linen.html) 
        [linenr](http://www.csounds.com/manual/html/linenr.html) 
        [adsr](http://www.csounds.com/manual/html/adsr.html) 
        [madsr](http://www.csounds.com/manual/html/madsr.html) 
        [more](http://www.csounds.com/manual/html/SiggenEnvelope.html) \

    -   ##### Envelopes By Linear And Exponential Generators 

        [linseg](http://www.csounds.com/manual/html/linseg.html) 
        [expseg](http://www.csounds.com/manual/html/expseg.html) 
        [transeg](http://www.csounds.com/manual/html/transeg.html) 
        ([linsegr](http://www.csounds.com/manual/html/linsegr.html) 
        [expsegr](http://www.csounds.com/manual/html/expsegr.html) 
        [transegr](http://en.flossmanuals.net/bin/view/Csound/transegr)) 
        [more](http://www.csounds.com/manual/html/SiggenLineexp.html)  

    -   ##### Envelopes By Function Tables

<!-- -->

-   #### DELAYS

    -   ##### Audio Delays

        [vdelay](http://www.csounds.com/manual/html/vdelay.html) 
        [vdelayx](http://www.csounds.com/manual/html/vdelayx.html) 
        [vdelayw](http://www.csounds.com/manual/html/vdelayw.html)  

        [delayr](http://www.csounds.com/manual/html/delayr.html) 
        [delayw](http://www.csounds.com/manual/html/delayw.html) 
        [deltap](http://www.csounds.com/manual/html/deltap.html) 
        [deltapi](http://www.csounds.com/manual/html/deltapi.html) 
        [deltap3](http://www.csounds.com/manual/html/deltap3.html) 
        [deltapx](http://www.csounds.com/manual/html/deltapx.html) 
        [deltapxw](http://www.csounds.com/manual/html/deltapxw.html) 
        [deltapn](http://www.csounds.com/manual/html/deltapn.html)   \

    -   ##### Control Signal Delays

        [delk](http://www.csounds.com/manual/html/delayk.html) 
        [vdel\_k](http://www.csounds.com/manual/html/delayk.html) \

<!-- -->

-   #### FILTERS

    Compare [Standard
    Filters](http://www.csounds.com/manual/html/SigmodStandard.html) and
    [Specialized
    Filters](http://www.csounds.com/manual/html/SigmodSpeciali.html)
    overviews.\

    -   ##### Low Pass Filters

        [tone](http://www.csounds.com/manual/html/tone.html) 
        [tonex](http://www.csounds.com/manual/html/tonex.html) 
        [butlp](http://www.csounds.com/manual/html/butterlp.html) 
        [clfilt](http://www.csounds.com/manual/html/clfilt.html)  \

    <!-- -->

    -   ##### High Pass Filters

        [atone](http://www.csounds.com/manual/html/atone.html) 
        [atonex](http://www.csounds.com/manual/html/atonex.html) 
        [buthp](http://www.csounds.com/manual/html/butterhp.html) 
        [clfilt](http://www.csounds.com/manual/html/clfilt.html)  \

    <!-- -->

    -   ##### Band Pass And Resonant Filters

        [reson](http://www.csounds.com/manual/html/reson.html) 
        [resonx](http://www.csounds.com/manual/html/resonx.html) 
        [resony](http://www.csounds.com/manual/html/resony.html) 
        [resonr](http://www.csounds.com/manual/html/resonr.html) 
        [resonz](http://www.csounds.com/manual/html/resonz.html) 
        [butbp](http://www.csounds.com/manual/html/butterbp.html)  \

    <!-- -->

    -   ##### Band Reject Filters

        [areson](http://www.csounds.com/manual/html/areson.html) 
        [butbr](http://www.csounds.com/manual/html/butterbp.html)  \

    -   ##### Filters For Smoothing Control Signals

        [port](http://www.csounds.com/manual/html/port.html) 
        [portk](http://www.csounds.com/manual/html/portk.html) \

<!-- -->

-   #### REVERB

     [freeverb](http://www.csounds.com/manual/html/freeverb.html) 
    [reverbsc](http://www.csounds.com/manual/html/reverbsc.html) 
    [reverb](http://www.csounds.com/manual/html/reverb.html) 
    [nreverb](http://www.csounds.com/manual/html/nreverb.html) 
    [babo](http://www.csounds.com/manual/html/babo.html) 
    ([pconvolve](http://www.csounds.com/manual/html/pconvolve.html))

<!-- -->

-   #### SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS

    -   ##### Amplitude Measurement and Amplitude Envelope Following

        [rms](http://www.csounds.com/manual/html/rms.html) 
        [balance](http://www.csounds.com/manual/html/balance.html) 
        [follow](http://www.csounds.com/manual/html/follow.html) 
        [follow2](http://www.csounds.com/manual/html/follow2.html) 
        [peak](http://www.csounds.com/manual/html/peak.html) 
        [max\_k](http://www.csounds.com/manual/html/max_k.html)  \

    <!-- -->

    -   ##### Pitch Estimation (Pitch Tracking) 

        [ptrack](http://www.csounds.com/manual/html/ptrack.html) 
        [pitch](http://www.csounds.com/manual/html/pitch.html) 
        [pitchamdf](http://www.csounds.com/manual/html/pitchamdf.html) 
        [pvscent](http://www.csounds.com/manual/html/pvscent.html)  \

    <!-- -->

    -   ##### Tempo Estimation

        [tempest](http://www.csounds.com/manual/html/tempest.html)  \

    -   ##### Dynamic Processing

        [compress](http://www.csounds.com/manual/html/compress.html) 
        [dam](http://www.csounds.com/manual/html/dam.html) 
        [clip](http://www.csounds.com/manual/html/clip.html) \

    -   ##### Sample Level Operations

        [limit](http://www.csounds.com/manual/html/limit.html) 
        [samphold](http://www.csounds.com/manual/html/samphold.html) 
        [vaget](http://www.csounds.com/manual/html/vaget.html) 
        [vaset](http://www.csounds.com/manual/html/vaset.html)  \

<!-- -->

-   ####  SPATIALIZATION

    -   ##### Panning

        [pan2](http://www.csounds.com/manual/html/pan2.html) 
        [pan](http://www.csounds.com/manual/html/pan.html)  \

    <!-- -->

    -   ##### VBAP

        [vbaplsinit](http://www.csounds.com/manual/html/vpaplsinit.html) 
        [vbap4](http://www.csounds.com/manual/html/vpap4.html) 
        [vbap8](http://www.csounds.com/manual/html/vbap8.html) 
        [vbap16](http://www.csounds.com/manual/html/vbap16.html) \

    -   ##### Ambisonics

        [bformenc1](http://www.csounds.com/manual/html/bformenc1.html) 
        [bformdec1](http://www.csounds.com/manual/html/bformdec1.html)  \

    -   ##### Binaural / HRTF

        [hrtfstat](http://www.csounds.com/manual/html/hrtfstat.html) 
        [hrtfmove](http://www.csounds.com/manual/html/hrtfmove.html) 
        [hrtfmove2](http://www.csounds.com/manual/html/hrtfmove2.html) 
        [hrtfer](http://www.csounds.com/manual/html/hrtfer.html) \

### ADVANCED SIGNAL PROCESSING

-   #### MODULATION AND DISTORTION

    -   ##### Frequency Modulation

        [foscil](http://www.csounds.com/manual/html/foscil.html) 
        [foscili](http://www.csounds.com/manual/html/foscili.html) \

        [crossfm](http://www.csounds.com/manual/html/crossfm.html) 
        [crossfmi](http://www.csounds.com/manual/html/crossfm.html) 
        [crosspm](http://www.csounds.com/manual/html/crossfm.html) 
        [crosspmi](http://www.csounds.com/manual/html/crossfm.html) 
        [crossfmpm](http://www.csounds.com/manual/html/crossfm.html) 
        [crossfmpmi](http://www.csounds.com/manual/html/crossfm.html) \

    -   ##### Distortion And Wave Shaping

        [distort](http://www.csounds.com/manual/html/distort.html) 
        [distort1](http://www.csounds.com/manual/html/distort1.html) 
        [powershape](http://www.csounds.com/manual/html/powershape.html) 
        [polynomial](http://www.csounds.com/manual/html/polynomial.html) 
        [chebyshevpoly](http://www.csounds.com/manual/html/chebyshevpoly.html)  \

    -   ##### Flanging, Phasing, Phase Shaping

        [flanger](http://www.csounds.com/manual/html/flanger.html) 
        [harmon](http://www.csounds.com/manual/html/harmon.html) 
        [phaser1](http://www.csounds.com/manual/html/phaser1.html) 
        [phaser2](http://www.csounds.com/manual/html/phaser2.html) 
        [pdclip](http://www.csounds.com/manual/html/pdclip.html) 
        [pdhalf](http://www.csounds.com/manual/html/pdhalf.html) 
        [pdhalfy](http://www.csounds.com/manual/html/pdhalfy.html) \

    -   ##### Doppler Shift

        [doppler](http://www.csounds.com/manual/html/doppler.html) \

<!-- -->

-   #### GRANULAR SYNTHESIS

    [partikkel](http://www.csounds.com/manual/html/partikkel.html) 
    [sndwarp](http://www.csounds.com/manual/html/sndwarp.html) 
    [others](http://www.csounds.com/manual/html/SiggenGranular.html)

<!-- -->

-   #### CONVOLUTION

    [pconvolve](http://www.csounds.com/manual/html/pconvolve.html) 
    [ftconv](http://www.csounds.com/manual/html/ftconv.html) 
    [dconv](http://www.csounds.com/manual/html/dconv.html)  \

<!-- -->

-   #### FFT AND SPECTRAL PROCESSING

    -   ##### Real-time Analysis and Resynthesis 

        [pvsanal](http://www.csounds.com/manual/html/pvsanal.html) 
        [pvstanal](http://www.csounds.com/manual/html/pvstanal.html) 
        [pvsynth](http://www.csounds.com/manual/html/pvsynth.html) 
        [pvsadsyn](http://www.csounds.com/manual/html/pvsadsynth.html)  \

    -   ##### Writing FFT Data to A File and Reading From it

        [pvsfwrite](http://www.csounds.com/manual/html/pvsfwrite.html) 
        [pvanal](http://www.csounds.com/manual/html/pvanal.html) 
        [pvsfread](http://www.csounds.com/manual/html/pvsfread.html) 
        [pvsdiskin](http://www.csounds.com/manual/html/pvsdiskin.html) \

    -   ##### Writing FFT Data to a Buffer and Reading From it 

        [pvsbuffer](http://www.csounds.com/manual/html/pvsbuffer.html) 
        [pvsbufread](http://www.csounds.com/manual/html/pvsbufread.html) 
        [pvsftw](http://www.csounds.com/manual/html/pvsftw.html) 
        [pvsftr](http://www.csounds.com/manual/html/pvsftr.html)  \

    -   ##### FFT Info 

        [pvsinfo](http://www.csounds.com/manual/html/pvsinfo.html) 
        [pvsbin](http://www.csounds.com/manual/html/pvsbin.html) 
        [pvscent](http://www.csounds.com/manual/html/pvscent.html)  \

    -   ##### Manipulating FFT Signals 

        [pvscale](http://www.csounds.com/manual/html/pvscale.html) 
        [pvshift](http://www.csounds.com/manual/html/pvshift.html) 
        [pvsbandp](http://www.csounds.com/manual/html/pvsbandp.html) 
        [pvsbandr](http://www.csounds.com/manual/html/pvsbandr.html) 
        [pvsmix](http://www.csounds.com/manual/html/pvsmix.html) 
        [pvscross](http://www.csounds.com/manual/html/pvscross.html) 
        [pvsfilter](http://www.csounds.com/manual/html/pvsfilter.html) 
        [pvsvoc](http://www.csounds.com/manual/html/pvsvoc.html) 
        [pvsmorph](http://en.flossmanuals.net/bin/view/Csound/pvsmorph)
        [pvsfreeze](http://www.csounds.com/manual/html/pvsfreeze.html) 
        [pvsmaska](http://www.csounds.com/manual/html/pvsmaska.html) 
        [pvsblur](http://www.csounds.com/manual/html/pvsblur.html) 
        [pvstencil](http://www.csounds.com/manual/html/pvstencil.html) 
        [pvsarp](http://www.csounds.com/manual/html/pvsarp.html) 
        [pvsmooth](http://www.csounds.com/manual/html/pvsmooth.html) \

<!-- -->

-   #### PHYSICAL MODELS AND FM INSTRUMENTS

    -   ##### Waveguide Physical Modelling

        see
        [here](http://www.csounds.com/manual/html/SiggenWavguide.html) 
        and
        [here](http://www.csounds.com/manual/html/SigmodWavguide.html) \

    -   ##### FM Instrument Models

        see
        [here](http://www.csounds.com/manual/html/SiggenFmsynth.html)   \

### DATA

-   #### BUFFER / FUNCTION TABLES

    -   ##### Creating Function Tables (Buffers)

        [ftgen](http://www.csounds.com/manual/html/ftgen.html)  [GEN
        Routines](http://www.csounds.com/manual/html/ScoreGenRef.html) \

    -   ##### Writing to Tables

        [tableiw](http://www.csounds.com/manual/html/tableiw.html)  /
        [tablew](http://www.csounds.com/manual/html/tablew.html)    
        [tabw\_i](http://www.csounds.com/manual/html/tab.html)  /
        [tabw](http://www.csounds.com/manual/html/tab.html) 

    -   ##### Reading From Tables 

        [table](http://www.csounds.com/manual/html/table.html)  /
        [tablei](http://www.csounds.com/manual/html/tablei.html)  /
        [table3](http://www.csounds.com/manual/html/table3.html)    
        [tab\_i](http://www.csounds.com/manual/html/tab.html)  /
        [tab](http://www.csounds.com/manual/html/tab.html) 

    -   ##### Saving Tables to Files 

        [ftsave](http://www.csounds.com/manual/html/ftsave.html)  /
        [ftsavek](http://www.csounds.com/manual/html/ftsavek.html)   
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122)   \

    -   ##### Reading Tables From Files

        [ftload](http://www.csounds.com/manual/html/ftload.html)  /
        [ftloadk](http://www.csounds.com/manual/html/ftloadk.html)    
        [GEN23](http://www.csounds.com/manual/html/GEN23.html)  \

<!-- -->

-   #### SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS

    -   ##### Signal Input and Output

        [inch](http://www.csounds.com/manual/html/inch.html)  ; 
        [outch](http://www.csounds.com/manual/html/outch.html) 
        [out](http://www.csounds.com/manual/html/out.html) 
        [outs](http://www.csounds.com/manual/html/outs.html)  ; 
        [monitor](http://www.csounds.com/manual/html/monitor.html) \

    -   ##### Sample Playback With Optional Looping

        [flooper2](http://www.csounds.com/manual/html/flooper2.html) 
        [sndloop](http://www.csounds.com/manual/html/sndloop.html)

    -   ##### Soundfonts and Fluid Opcodes

        [fluidEngine](http://www.csounds.com/manual/html/fluidEngine.html) 
        [fluidSetInterpMethod](http://www.csounds.com/manual/html/fluidSetInterpMethod.html) 
        [fluidLoad](http://www.csounds.com/manual/html/fluidLoad.html) 
        [fluidProgramSelect](http://www.csounds.com/manual/html/fluidProgramSelect.html) 
        [fluidNote](http://www.csounds.com/manual/html/fluidNote.html) 
        [fluidCCi](http://www.csounds.com/manual/html/fluidCCi.html) 
        [fluidCCk](http://www.csounds.com/manual/html/fluidCCk.html) 
        [fluidControl](http://www.csounds.com/manual/html/fluidControl.html) 
        [fluidOut](http://www.csounds.com/manual/html/fluidOut.html) 
        [fluidAllOut](http://www.csounds.com/manual/html/fluidAllOut.html) \

<!-- -->

-   #### FILE INPUT AND OUTPUT

    -   ##### Sound File Input 

        [soundin](http://www.csounds.com/manual/html/soundin.html) 
        [diskin](http://www.csounds.com/manual/html/diskin2.html) 
        [diskin2](http://www.csounds.com/manual/html/diskin2.html) 
        [mp3in](http://www.csounds.com/manual/html/mp3in.html) 
        [(GEN01)](http://www.csounds.com/manual/html/GEN01.html) \

    -   ##### Sound File Queries 

        [filelen](http://www.csounds.com/manual/html/filelen.html) 
        [filesr](http://www.csounds.com/manual/html/filesr.html) 
        [filenchnls](http://www.csounds.com/manual/html/filenchnls.html) 
        [filepeak](http://www.csounds.com/manual/html/filepeak.html) 
        [filebit](http://www.csounds.com/manual/html/filebit.html)  \

    -   ##### Sound File Output 

        [fout](http://www.csounds.com/manual/html/fout.html) \

    -   ##### Non-Soundfile Input And Output 

        [readk](http://www.csounds.com/manual/html/readk.html)  
        [GEN23](http://www.csounds.com/manual/html/GEN23.html)  
        [dumpk](http://www.csounds.com/manual/html/dumpk.html)  
        [fprints](http://www.csounds.com/manual/html/fprints.html) /
        [fprintks](http://www.csounds.com/manual/html/fprintks.html)  
        [ftsave](http://www.csounds.com/manual/html/ftsave.html)  /
        [ftsavek](http://www.csounds.com/manual/html/ftsavek.html)   
        [ftload](http://www.csounds.com/manual/html/ftload.html)  /
        [ftloadk](http://www.csounds.com/manual/html/ftloadk.html) 

<!-- -->

-   #### CONVERTERS OF DATA TYPES 

    -   ##### i \<- k 

        [i(k)](http://www.csounds.com/manual/html/opi.html) \

    -   ##### k \<- a 

        [downsamp](http://www.csounds.com/manual/html/downsamp.html)  
        [max\_k](http://www.csounds.com/manual/html/max_k.html)  \

    -   ##### a \<- k

        [upsamp](http://www.csounds.com/manual/html/upsamp.html) 
        [interp](http://www.csounds.com/manual/html/interp.html)  \

<!-- -->

-   #### PRINTING AND STRINGS 

    -   ##### Simple Printing 

        [print](http://www.csounds.com/manual/html/print.html) 
        [printk](http://www.csounds.com/manual/html/printk.html) 
        [printk2](http://www.csounds.com/manual/html/printk2.html) 
        [puts](http://www.csounds.com/manual/html/puts.html) \

    -   ##### Formatted Printing 

        [prints](http://www.csounds.com/manual/html/prints.html) 
        [printf\_i](http://www.csounds.com/manual/html/printf.html) 
        [printks](http://www.csounds.com/manual/html/printks.html) 
        [printf](http://www.csounds.com/manual/html/printf.html)  \

    -   ##### String Variables 

        [sprintf](http://www.csounds.com/manual/html/sprintf.html) 
        [sprintfk](http://www.csounds.com/manual/html/sprintfk.html) 
        [strset](http://www.csounds.com/manual/html/strset.html) 
        [strget](http://www.csounds.com/manual/html/strget.html)  \

    -   ##### String Manipulation And Conversion

        see
        [here](http://www.csounds.com/manual/html/StringsTop.html#stringmanipulate) 
        and
        [here](http://www.csounds.com/manual/html/stringconvert.html)   \

### REALTIME INTERACTION

-   #### MIDI

    -   ##### Opcodes for Use in MIDI-Triggered Instruments 

        [massign](http://www.csounds.com/manual/html/massign.html) 
        [pgmassign](http://www.csounds.com/manual/html/pgmassign.html) 
        [notnum](http://www.csounds.com/manual/html/notnum.html) 
        [cpsmidi](http://www.csounds.com/manual/html/cpsmidi.html) 
        [veloc](http://www.csounds.com/manual/html/veloc.html) 
        [ampmidi](http://www.csounds.com/manual/html/ampmidi.html) 
        [midichn](http://www.csounds.com/manual/html/midichn.html) 
        [pchbend](http://www.csounds.com/manual/html/pchbend.html) 
        [aftouch](http://www.csounds.com/manual/html/aftouch.html) 
        [polyaft](http://www.csounds.com/manual/html/polyaft.html) \

    -   ##### Opcodes For Use In All Instruments

        [ctrl7](http://www.csounds.com/manual/html/ctrl7.html) 
        ([ctrl14](http://www.csounds.com/manual/html/ctrl14.html)/[ctrl21](http://www.csounds.com/manual/html/ctrl21.html))
        [initc7](http://www.csounds.com/manual/html/initc7.html) 
        [ctrlinit](http://www.csounds.com/manual/html/ctrlinit.html) 
        ([initc14](http://www.csounds.com/manual/html/initc14.html)/[initc21](http://www.csounds.com/manual/html/initc21.html)) 
        [midiin](http://www.csounds.com/manual/html/midiin.html) 
        [midiout](http://www.csounds.com/manual/html/midiout.html)  \

<!-- -->

-   #### OPEN SOUND CONTROL AND NETWORK

    -   ##### Open Sound Control

        [OSCinit](http://www.csounds.com/manual/html/OSCinit.html) 
        [OSClisten](http://www.csounds.com/manual/html/OSClisten.html) 
        [OSCsend](http://www.csounds.com/manual/html/OSCsend.html)  \

    -   ##### Remote Instruments

        [remoteport](http://www.csounds.com/manual/html/remoteport.html) 
        [insremot](http://www.csounds.com/manual/html/insremot.html) 
        [insglobal](http://www.csounds.com/manual/html/insglobal.html) 
        [midiremot](http://www.csounds.com/manual/html/midiremot.html) 
        [midiglobal](http://www.csounds.com/manual/html/midiglobal.html)  \

    -   ##### Network Audio

        [socksend](http://www.csounds.com/manual/html/socksend.html) 
        [sockrecv](http://www.csounds.com/manual/html/sockrecv.html)   \

<!-- -->

-   #### HUMAN INTERFACES

    -   ##### Widgets

        FLTK overview
        [here](http://www.csounds.com/manual/html/ControlFltkIntro.html)  \

    -   ##### Keys

        [sensekey](http://www.csounds.com/manual/html/sensekey.html) \

    -   ##### Mouse

        [xyin](http://www.csounds.com/manual/html/xyin.html) \

    -   ##### WII

        [wiiconnect](http://www.csounds.com/manual/html/wiiconnect.html) 
        [wiidata](http://www.csounds.com/manual/html/wiidata.html) 
        [wiirange](http://www.csounds.com/manual/html/wiirange.html) 
        [wiisend](http://www.csounds.com/manual/html/wiisend.html) \

    -   ##### P5 Glove

        [p5gconnect](http://www.csounds.com/manual/html/p5gconnect.html) 
        [p5gdata](http://www.csounds.com/manual/html/p5gdata.html) 

### INSTRUMENT CONTROL

-   #### SCORE PARAMETER ACCESS

    [p(x)](http://www.csounds.com/manual/html/p.html) 
    [pindex](http://www.csounds.com/manual/html/pindex.html) 
    [pset](http://www.csounds.com/manual/html/pset.html) 
    [passign](http://www.csounds.com/manual/html/passign.html) 
    [pcount](http://www.csounds.com/manual/html/pcount.html)  \

-   #### TIME AND TEMPO

    -   ##### Time Reading

        [times](http://www.csounds.com/manual/html/times.html)/[timek](http://www.csounds.com/manual/html/timek.html)
           
        [timeinsts](http://www.csounds.com/manual/html/timeinsts.html)/[timeinstk](http://www.csounds.com/manual/html/timeinstk.html)  
        [date](http://www.csounds.com/manual/html/date.html)/[dates](http://www.csounds.com/manual/html/dates.html)
          
        [setscorepos](http://www.csounds.com/manual/html/setscorepos.html)
         \

    -   ##### Tempo Reading

        [tempo](http://www.csounds.com/manual/html/tempo.html) 
        [miditempo](http://www.csounds.com/manual/html/miditempo.html) 
        [tempoval](http://www.csounds.com/manual/html/tempoval.html)  \

    -   ##### Duration Modifications

        [ihold](http://www.csounds.com/manual/html/ihold.html) 
        [xtratim](http://www.csounds.com/manual/html/xtratim.html)  

    -   ##### Time Signal Generators

        [metro](http://www.csounds.com/manual/html/metro.html) 
        [mpulse](http://www.csounds.com/manual/html/mpulse.html) \

<!-- -->

-   #### CONDITIONS AND LOOPS

    [changed](http://www.csounds.com/manual/html/changed.html) 
    [trigger](http://www.csounds.com/manual/html/trigger.html) 
    [if](http://www.csounds.com/manual/html/if.html) 
    [loop\_lt](http://www.csounds.com/manual/html/loop_lt.html)/[loop\_le](http://www.csounds.com/manual/html/loop_le.html)/[loop\_gt](http://www.csounds.com/manual/html/loop_gt.html)/[loop\_ge](http://www.csounds.com/manual/html/loop_ge.html) \

<!-- -->

-   #### PROGRAM FLOW

    [init](http://www.csounds.com/manual/html/init.html) 
    [igoto](http://www.csounds.com/manual/html/igoto.html) 
    [kgoto](http://www.csounds.com/manual/html/kgoto.html) 
    [timout](http://www.csounds.com/manual/html/timout.html)  
    [reinit](http://www.csounds.com/manual/html/reinit.html)/[rigoto](http://www.csounds.com/manual/html/rigoto.html)/[rireturn](http://www.csounds.com/manual/html/rireturn.html) \

<!-- -->

-   #### EVENT TRIGGERING

    [event\_i](http://www.csounds.com/manual/html/event_i.html)  /
    [event](http://www.csounds.com/manual/html/event.html)   
    [scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html) 
    / [scoreline](http://www.csounds.com/manual/html/scoreline.html)   
    [schedkwhen](http://www.csounds.com/manual/html/schedkwhen.html)  
    [seqtime](http://www.csounds.com/manual/html/seqtime.html)
    /[seqtime2](http://www.csounds.com/manual/html/seqtime2.html)  
    [timedseq](http://www.csounds.com/manual/html/timedseq.html)  \

<!-- -->

-   #### INSTRUMENT SUPERVISION

    -   ##### Instances And Allocation

        [active](http://www.csounds.com/manual/html/active.html) 
        [maxalloc](http://www.csounds.com/manual/html/maxalloc.html) 
        [prealloc](http://www.csounds.com/manual/html/prealloc.html)  \

    <!-- -->

    -   ##### Turning On And Off

        [turnon](http://www.csounds.com/manual/html/turnon.html)   
        [turnoff](http://www.csounds.com/manual/html/turnoff.html)/[turnoff2](http://www.csounds.com/manual/html/turnoff2.html)  
        [mute](http://www.csounds.com/manual/html/mute.html)  
        [remove](http://www.csounds.com/manual/html/remove.html)  
        [exitnow](http://www.csounds.com/manual/html/exitnow.html)  \

    -   ##### Named Instruments

        [nstrnum](http://www.csounds.com/manual/html/nstrnum.html)\

<!-- -->

-   #### SIGNAL EXCHANGE AND MIXING

    -   ##### chn opcodes

        [chn\_k](http://www.csounds.com/manual/html/chn.html)  /
        [chn\_a](http://www.csounds.com/manual/html/chn.html)  /
        [chn\_S](http://www.csounds.com/manual/html/chn.html)   
        [chnset](http://www.csounds.com/manual/html/chnset.html)  
        [chnget](http://www.csounds.com/manual/html/chnget.html)  
        [chnmix](http://www.csounds.com/manual/html/chnmix.html)  
        [chnclear](http://www.csounds.com/manual/html/chnclear.html) \

    -   ##### zak?  

### MATHS

-   #### MATHEMATICAL CALCULATIONS

    -   ##### Arithmetic Operations

        [+](http://www.csounds.com/manual/html/adds.html)   
        [-](http://www.csounds.com/manual/html/subtracts.html)   
        [\*](http://www.csounds.com/manual/html/multiplies.html)   
        [/](http://www.csounds.com/manual/html/divides.html)   
        [\^](http://www.csounds.com/manual/html/raises.html)  
        [%](http://www.csounds.com/manual/html/modulus.html) \

        [exp(x)](http://www.csounds.com/manual/html/exp.html)   
        [log(x)](http://www.csounds.com/manual/html/log.html)  
        [log10(x)](http://www.csounds.com/manual/html/log10.html)  
        [sqrt(x)](http://www.csounds.com/manual/html/sqrt.html) \

        [abs(x)](http://www.csounds.com/manual/html/abs.html) 
        [int(x)](http://www.csounds.com/manual/html/int.html) 
        [frac(x)](http://www.csounds.com/manual/html/frac.html) \

        [round(x)](http://www.csounds.com/manual/html/round.html) 
        [ceil(x)](http://www.csounds.com/manual/html/ceil.html) 
        [floor(x)](http://www.csounds.com/manual/html/floor.html) \

    -   ##### Trigonometric Functions

        [sin(x)](http://www.csounds.com/manual/html/sin.html)  
        [cos(x)](http://www.csounds.com/manual/html/cos.html)  
        [tan(x)](http://www.csounds.com/manual/html/tan.html) \

        [sinh(x)](http://www.csounds.com/manual/html/sinh.html)  
        [cosh(x)](http://www.csounds.com/manual/html/cosh.html)  
        [tanh(x)](http://www.csounds.com/manual/html/tanh.html) \

        [sininv(x)](http://www.csounds.com/manual/html/sininv.html)  
        [cosinv(x)](http://www.csounds.com/manual/html/cosinv.html)  
        [taninv(x)](http://www.csounds.com/manual/html/taninv.html)  
        [taninv2(x)](http://www.csounds.com/manual/html/taninv2.html) \

    -   ##### Logic Operators

        [&&](http://www.csounds.com/manual/html/opand.html)   
        [\|\|](http://www.csounds.com/manual/html/opor.html)  \

<!-- -->

-   #### CONVERTERS

    -   ##### MIDI To Frequency 

        [cpsmidi](http://www.csounds.com/manual/html/cpsmidi.html) 
        [cpsmidinn](http://www.csounds.com/manual/html/cpsmidinn.html)  
        [more](http://www.csounds.com/manual/html/PitchTop.html#PitchFuncs) 

    <!-- -->

    -   ##### Frequency To MIDI

        [F2M](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=123)  
        [F2MC](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=124) 
        (UDO\'s)\

    -   ##### Cent Values To Frequency 

        [cent](http://www.csounds.com/manual/html/cent.html)  \

    -   ##### Amplitude Converters

        [ampdb](http://www.csounds.com/manual/html/ampdb.html) 
        [ampdbfs](http://www.csounds.com/manual/html/ampdbfs.html) 
        [dbamp](http://www.csounds.com/manual/html/dbamp.html) 
        [dbfsamp](http://www.csounds.com/manual/html/dbfsamp.html) \

    -   ##### Scaling 

        [Scali](http://www.csounds.com/udo/displayOpcode.php?opcode_id=125)  
        [Scalk](http://www.csounds.com/udo/displayOpcode.php?opcode_id=126)  
        [Scala](http://www.csounds.com/udo/displayOpcode.php?opcode_id=127) 
        (UDO\'s)\

### PYTHON AND SYSTEM

-   ##### PYTHON OPCODES

    [pyinit](http://www.csounds.com/manual/html/pyinit.html) 
    [pyrun](http://www.csounds.com/manual/html/pyrun.html) 
    [pyexec](http://www.csounds.com/manual/html/pyexec.html) 
    [pycall](http://www.csounds.com/manual/html/pycall.html) 
    [pyeval](http://www.csounds.com/manual/html/pyeval.html) 
    [pyassign](http://www.csounds.com/manual/html/pyassign.html) \

<!-- -->

-   ##### SYSTEM OPCODES

    [getcfg](http://www.csounds.com/manual/html/getcfg.html)  
    [system](http://www.csounds.com/manual/html/system.html)/[system\_i](http://www.csounds.com/manual/html/system.html) \

### PLUGINS 

-   ##### PLUGIN HOSTING

    -   ##### LADSPA

        [dssiinit](http://www.csounds.com/manual/html/dssiinit.html) 
        [dssiactivate](http://www.csounds.com/manual/html/dssiactivate.html) 
        [dssilist](http://www.csounds.com/manual/html/dssilist.html) 
        [dssiaudio](http://www.csounds.com/manual/html/dssiaudio.html) 
        [dssictls](http://www.csounds.com/manual/html/dssictls.html)  \

    -   ##### VST

        [vstinit](http://www.csounds.com/manual/html/vstinit.html)  
        [vstaudio](http://www.csounds.com/manual/html/vstaudio.html)/[vstaudiog](http://www.csounds.com/manual/html/vstaudio.html)  
        [vstmidiout](http://www.csounds.com/manual/html/vstmidiout.html)  
        [vstparamset](http://www.csounds.com/manual/html/vstparamset.html)/[vstparamget](http://www.csounds.com/manual/html/vstparamget.html)  
        [vstnote](http://www.csounds.com/manual/html/vstnote.html)  
        [vstinfo](http://www.csounds.com/manual/html/vstinfo.html) 
        [vstbankload](http://www.csounds.com/manual/html/vstbankload.html)  
        [vstprogset](http://www.csounds.com/manual/html/vstprogset.html)  
        [vstedit](http://www.csounds.com/manual/html/vstedit.html) \

<!-- -->

-   ##### EXPORTING CSOUND FILES TO PLUGINS 

 
