OPCODE GUIDE
============

OVERVIEW
--------

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
    [pconvolve](http://www.csounds.com/manual/html/pconvolve.html)

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




BASIC SIGNAL PROCESSING
-----------------------

 
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

 

ADVANCED SIGNAL PROCESSING
--------------------------

 

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



DATA
----

-   ### BUFFER / FUNCTION TABLES

    See the chapter about [function
    tables](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES)
    for more detailed information. \

    -   #### Creating Function Tables (Buffers)

        [**ftgen**](http://www.csounds.com/manual/html/ftgen.html) can
        generates function tables from within the orchestra. The
        function table will exist until the end of the current Csound
        performance. Different [GEN
        Routines](http://www.csounds.com/manual/html/ScoreGenRef.html)
        are used to fill a function table with different kinds of data.
        This could be waveforms, sound files, envelopes, window
        functions and so on.

    -   #### Writing To Tables

        **[tableiw](http://www.csounds.com/manual/html/tableiw.html)** /
        **[tablew](http://www.csounds.com/manual/html/tablew.html)**:
        Write values to a function table at i-rate (tableiw), k-rate and
        a-rate (tablew). These opcodes provide many options and are
        robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tabw\_i](http://www.csounds.com/manual/html/tab.html)** /
        **[tabw](http://www.csounds.com/manual/html/tab.html)**: Write
        values to a function table at i-rate (tabw\_i), k-rate or a-rate
        (tabw). These opcodes offer fewer options than tableiw and
        tablew but will work consistently with non-power-of-two table
        sizes. They do not provide a boundary check on index values
        given to them which makes them fast but also then demands user
        responsibility in protecting against invalid index values.

    -   #### Reading From Tables 

        **[table](http://www.csounds.com/manual/html/table.html)** /
        **[tablei](http://www.csounds.com/manual/html/tablei.html)** /
        **[table3](http://www.csounds.com/manual/html/table3.html)**:
        Read values from a function table at any rate, either by direct
        indexing (table), or by linear interpolation (tablei) or cubic
        interpolation (table3). These opcodes provide many options and
        are robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tab\_i](http://www.csounds.com/manual/html/tab.html)** /
        **[tab](http://www.csounds.com/manual/html/tab.html)**: Read
        values from a function table at i-rate (tab\_i), k-rate or
        a-rate (tab). They offer no interpolation and fewer options than
        the table opcodes but they will also work with non-power-of-two
        table sizes. They do not provide a boundary check which makes
        them fast but also give the user the responsibility not to read
        any value beyond the table boundaries.

    -   #### Saving Tables to Files 

        **[ftsave](http://www.csounds.com/manual/html/ftsave.html)** /
        **[ftsavek](http://www.csounds.com/manual/html/ftsavek.html)**:
        Save a function table as a file, at i-time (ftsave) or at k-rate
        (ftsavek). These files can be text files or binary files but not
        sound files. To save a table as a sound file you can use the
        user defined opcode
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122). 

    -   #### Reading Tables From Files

        **[ftload](http://www.csounds.com/manual/html/ftload.html)** /
        **[ftloadk](http://www.csounds.com/manual/html/ftloadk.html)**:
        Load a function table which has previously been saved using
        ftsave/ftsavek.

        [**GEN23**](http://www.csounds.com/manual/html/GEN23.html)
        transfers the contents of a text file into a function table. 

<!-- -->

-   ### SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS

    -   #### Signal Input And Output

        [**inch**](http://www.csounds.com/manual/html/inch.html) read
        the audio input from any channel of your audio device. Make sure
        you have the
        [nchnls](http://www.csounds.com/manual/html/nchnls.html) value
        in the orchestra header set properly.\

        [**outch**](http://www.csounds.com/manual/html/outch.html)
        writes any audio signal(s) to any output channel(s). If Csound
        is in realtime mode (by the flag \'-o dac\' or by the \'Render
        in Realtime\' mode of a frontend like QuteCsound), the output
        channels are the channels of your output device. If Csound is in
        \'Render to file\' mode (by the flag \'-o mysoundfile.wav\' or
        the the frontend\'s choice), the output channels are the
        channels of the soundfile which is being written. Make sure you
        have the
        [nchnls](http://www.csounds.com/manual/html/nchnls.html) value
        in the orchestra header set properly to get the number of
        channels you wish to have.

        [**out**](http://www.csounds.com/manual/html/out.html) and
        [**outs**](http://www.csounds.com/manual/html/outs.html) are
        frequently used for mono and stereo output. They always write to
        channel 1 (out) or channels 1 and 2 (outs).\

        [**monitor**](http://www.csounds.com/manual/html/monitor.html)
        can be used (in an instrument with the highest number) to gather
        the sum of all audio on all output channels.

    -   #### Sample Playback With Optional Looping

        [**flooper2**](http://www.csounds.com/manual/html/flooper2.html)
        is a function table based crossfading looper.\

        [**sndloop**](http://www.csounds.com/manual/html/sndloop.html)
        records input audio and plays it back in a loop with
        user-defined duration and crossfade time.\

        Note that there are additional user defined opcodes for the
        playback of samples stored in buffers / function tables.

    -   #### Soundfonts And Fluid Opcodes

        [](http://www.csounds.com/manual/html/fluidEngine.html)

        [**fluidEngine**](http://www.csounds.com/manual/html/fluidEngine.html)
        instantiates a FluidSynth engine.\

        [**fluidSetInterpMethod**](http://www.csounds.com/manual/html/fluidSetInterpMethod.html)
        sets an interpolation method for a channel in a FluidSynth
        engine.\

        [**fluidLoad**](http://www.csounds.com/manual/html/fluidLoad.html)
        loads SoundFonts.\

        [**fluidProgramSelect**](http://www.csounds.com/manual/html/fluidProgramSelect.html)
        assigns presets from a SoundFont to a FluidSynth engine\'s MIDI
        channel.\

        [**fluidNote**](http://www.csounds.com/manual/html/fluidNote.html)
        plays a note on a FluidSynth engine\'s MIDI channel.\

        [**fluidCCi**](http://www.csounds.com/manual/html/fluidCCi.html)
        sends a controller message at i-time to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidCCk**](http://www.csounds.com/manual/html/fluidCCk.html)
        sends a controller message at k-rate to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidControl**](http://www.csounds.com/manual/html/fluidControl.html)
        plays and controls loaded Soundfonts (using \'raw\' MIDI
        messages).\

        [**fluidOut**](http://www.csounds.com/manual/html/fluidOut.html)
        receives audio from a single FluidSynth engine.\

        [**fluidAllOut**](http://www.csounds.com/manual/html/fluidAllOut.html)
        receives audio from all FluidSynth engines.

<!-- -->

-   ### FILE INPUT AND OUTPUT

    -   #### Sound File Input 

        [**soundin**](http://www.csounds.com/manual/html/soundin.html)
        reads from a sound file (up to 24 channels). It is important to
        ensure that the [sr](http://www.csounds.com/manual/html/sr.html)
        value in the orchestra header matches the sample rate of your
        sound file otherwise the sound file will play back at a
        different speed and pitch.\

        [**diskin**](http://www.csounds.com/manual/html/diskin2.html) is
        like soundin, but can also alter the speed of reading also
        resulting in higher or lower pitches. There is also the option
        to loop the file.\

        [**diskin2**](http://www.csounds.com/manual/html/diskin2.html)
        is similar to diskin, but it automatically converts the sample
        rate of the sound file if it does not match the sample rate of
        the orchestra. It also offers different interpolation methods to
        implement different levels of sound quality when sound files are
        read at altered speeds.

        [**GEN01**](http://www.csounds.com/manual/html/GEN01.html) loads
        a sound file into a function table (buffer).

        [**mp3in**](http://www.csounds.com/manual/html/mp3in.html)
        facilitates the playing of mp3 sound files.\

    -   #### Sound File Queries 

        [**filelen**](http://www.csounds.com/manual/html/filelen.html)
        returns the length of a sound file in seconds.

        [**filesr**](http://www.csounds.com/manual/html/filesr.html)
        returns the sample rate of a sound file.

        [**filenchnls**](http://www.csounds.com/manual/html/filenchnls.html)
        returns the number of channels of a sound file.

        [**filepeak**](http://www.csounds.com/manual/html/filepeak.html)
        returns the peak absolute value of a sound file, either of one
        specified channel, or from all channels. Make sure you have set
        [0dbfs](http://www.csounds.com/manual/html/0dbfs.html) to 1;
        otherwise you will get values relative to Csound\'s default
        0dbfs value of 32768.

        [**filebit**](http://www.csounds.com/manual/html/filebit.html)
        returns the bit depth of a sound file.

    -   #### Sound File Output 

        [](http://www.csounds.com/manual/html/fout.html)

        Keep in mind that Csound always writes output to a file if you
        have set the \'-o\' flag to the name of a sound file (or if you
        choose \'render to file\' in a front-end like QuteCound).\

        [**fout**](http://www.csounds.com/manual/html/fout.html) writes
        any audio signal(s) to a file, regardless of whether Csound is
        in realtime or non-realtime mode. This opcode is recommended for
        rendering a realtime performance as a sound file on disc.

    -   #### Non-Soundfile Input And Output 

        [](http://www.csounds.com/manual/html/readk.html)

        [**readk**](http://www.csounds.com/manual/html/readk.html) can
        read data from external files (for instance a text file) and
        transform them to k-rate values.\

        [**GEN23**](http://www.csounds.com/manual/html/GEN23.html)
        transfers a text file into a function table.

        [**dumpk**](http://www.csounds.com/manual/html/dumpk.html)
        writes k-rate signals to a text file.

        [**fprints**](http://www.csounds.com/manual/html/fprints.html) /
        [**fprintks**](http://www.csounds.com/manual/html/fprintks.html)
        write any formatted string to a file. If you call this opcode
        several times during one performance, the strings are appended.
        If you write to an pre-existing file, the file will be
        overwritten.\

        **[ftsave](http://www.csounds.com/manual/html/ftsave.html)** /
        **[ftsavek](http://www.csounds.com/manual/html/ftsavek.html)**:
        Save a function table as a binary or text file, in a specific
        format.

        **[ftload](http://www.csounds.com/manual/html/ftload.html)** /
        **[ftloadk](http://www.csounds.com/manual/html/ftloadk.html)**:
        Load a function table which has been written by ftsave/ftsavek.

<!-- -->

-   ### CONVERTERS OF DATA TYPES 

    -   #### i \<- k 

        [](http://www.csounds.com/manual/html/opi.html)[**i(k)**](http://www.csounds.com/manual/html/opi.html)
        returns the value of a k-variable at init-time. This can be
        useful to get the value of GUI controllers, or when using the
        reinit feature.

    -   #### k \<- a 

        [**downsamp**](http://www.csounds.com/manual/html/downsamp.html)
        converts an a-rate signal to a k-rate signal, with optional
        averaging.\

        [**max\_k**](http://www.csounds.com/manual/html/max_k.html)
        returns the maximum of an k-rate signal in a certain time span,
        with different options of calculation\

    -   #### a \<- k

        [**upsamp**](http://www.csounds.com/manual/html/upsamp.html)
        converts a k-rate signal to an a-rate signal by simple
        repetitions. It is the same as the statement asig=ksig.\

        [**interp**](http://www.csounds.com/manual/html/interp.html)
        converts a k-rate signal to an a-rate signal by interpolation.

<!-- -->

-   ### PRINTING AND STRINGS 

    -   #### Simple Printing 

        [](http://www.csounds.com/manual/html/print.html)

        [**print**](http://www.csounds.com/manual/html/print.html) is a
        simple opcode for printing i-variables. Note that the printed
        numbers are rounded to 3 decimal places.

        [**printk**](http://www.csounds.com/manual/html/printk.html) is
        its counterpart for k-variables. The *itime* argument specifies
        the time in seconds between printings (*itime=0* means one
        printout in each k-cycle which is usually some thousand
        printings per second).

        [**printk2**](http://www.csounds.com/manual/html/printk2.html)
        prints a k-variable whenever it changes.

        **[puts](http://www.csounds.com/manual/html/puts.html)** prints
        S-variables. The *ktrig* argument lets you print either at
        i-time or at k-rate.

    -   #### Formatted Printing 

        [](http://www.csounds.com/manual/html/prints.html)

        [**prints**](http://www.csounds.com/manual/html/prints.html)
        lets you print a format string at i-time. The format is similar
        to the C-style syntax but there is no %s format, therefore
        string variables cannot can be printed.

        [**printf\_i**](http://www.csounds.com/manual/html/printf.html)
        is very similar to prints. It also works at init-time. The
        advantage in comparision to prints is the ability of printing
        string variables. On the other hand,  you need a trigger and at
        least one input argument.

        [**printks**](http://www.csounds.com/manual/html/printks.html)
        is like prints, but takes k-variables, and like printk, you must
        specify a time between printing.

        [**printf**](http://www.csounds.com/manual/html/printf.html) is
        like printf\_i, but works at k-rate.

    -   #### String Variables 

        [](http://www.csounds.com/manual/html/sprintf.html)

        [**sprintf**](http://www.csounds.com/manual/html/sprintf.html)
        works like printf\_i, but stores the output in a string
        variable, instead of printing it out.

        [**sprintfk**](http://www.csounds.com/manual/html/sprintfk.html)
        is the same for k-rate arguments.

        [**strset**](http://www.csounds.com/manual/html/strset.html)
        links any string with a numeric value.

        [**strget**](http://www.csounds.com/manual/html/strget.html)
        transforms a strset number back to a string.

    -   #### String Manipulation And Conversion

        There are many opcodes for analysing, manipulating and
        converting strings. There is a good overview in the Canonical
        Csound Manual on
        [this](http://www.csounds.com/manual/html/StringsTop.html#stringmanipulate)
        and
        [that](http://www.csounds.com/manual/html/stringconvert.html)
        page.

###  

 

REALTIME INTERACTION
--------------------

-   ### MIDI

    -   #### Opcodes For Use In MIDI-Triggered Instruments 

        [](http://www.csounds.com/manual/html/massign.html)

        [**massign**](http://www.csounds.com/manual/html/massign.html)
        assigns specified midi channels to instrument numbers. See the
        [Triggering Instrument
        Instances](http://en.flossmanuals.net/bin/view/Csound/TRIGGERINGINSTRUMENTINSTANCES)
        chapter for more information.

        [**pgmassign**](http://www.csounds.com/manual/html/pgmassign.html)
        assigns midi program changes to specified instrument numbers.\

        [**notnum**](http://www.csounds.com/manual/html/notnum.html)
        retrieves the midi number of the key which has been pressed and
        activated this instrument instance. 

        [**cpsmidi**](http://www.csounds.com/manual/html/cpsmidi.html)
        converts this note number to the frequency in cycles per second
        (Hertz).

        [**veloc**](http://www.csounds.com/manual/html/veloc.html) and
        [**ampmidi**](http://www.csounds.com/manual/html/ampmidi.html)
        get the velocity of the key which has been pressed and activated
        this instrument instance.

        [**midichn**](http://www.csounds.com/manual/html/midichn.html)
        returns the midi channel number from which the note was
        activated.

        [**pchbend**](http://www.csounds.com/manual/html/pchbend.html)
        reads pitch bend information.

        [**aftouch**](http://www.csounds.com/manual/html/aftouch.html)
        and
        [**polyaft**](http://www.csounds.com/manual/html/polyaft.html)
        read the monophonic aftertouch (afttouch) and polyphonic
        aftertouch (polyaft) information.

    -   #### Opcodes For Use In All Instruments

        [](http://www.csounds.com/manual/html/ctrl7.html)

        [**ctrl7**](http://www.csounds.com/manual/html/ctrl7.html) reads
        the values of a usual (7 bit) controller and scales it.
        [ctrl14](http://www.csounds.com/manual/html/ctrl14.html) and
        [ctrl21](http://www.csounds.com/manual/html/ctrl21.html) can be
        used for high definition controllers.

        [**initc7**](http://www.csounds.com/manual/html/initc7.html) or
        [**ctrlinit**](http://www.csounds.com/manual/html/ctrlinit.html)
        set the initial value of 7 bit controllers. Use
        [initc14](http://www.csounds.com/manual/html/initc14.html) and
        [initc21](http://www.csounds.com/manual/html/initc21.html) for
        high definition devices.\

        [**midiin**](http://www.csounds.com/manual/html/midiin.html)
        reads all incoming midi events. 

        [**midiout**](http://www.csounds.com/manual/html/midiout.html)
        writes any type of midi message to the midi out port.

<!-- -->

-   ### OPEN SOUND CONTROL AND NETWORK

    -   #### Open Sound Control

        [](http://www.csounds.com/manual/html/OSCinit.html)

        [**OSCinit**](http://www.csounds.com/manual/html/OSCinit.html)
        initialises a port for later use of the OSClisten opcode.

        [**OSClisten**](http://www.csounds.com/manual/html/OSClisten.html)
        receives messages of the port which was initialised by OSCinit.

        [**OSCsend**](http://www.csounds.com/manual/html/OSCsend.html)
        sends messages to a port.

    -   #### Remote Instruments

        [](http://www.csounds.com/manual/html/remoteport.html)

        [**remoteport**](http://www.csounds.com/manual/html/remoteport.html)
        defines the port for use with the remote system.\

        [**insremot**](http://www.csounds.com/manual/html/insremot.html)
        will send note events from a source machine to one destination.\

        [**insglobal**](http://www.csounds.com/manual/html/insglobal.html)
        will send note events from a source machine to many
        destinations.\

        [**midiremot**](http://www.csounds.com/manual/html/midiremot.html)
        will send midi events from a source machine to one destination.\

        [**midiglobal**](http://www.csounds.com/manual/html/midiglobal.html)
        will broadcast the midi events to all the machines involved in
        the remote concert.

    -   #### Network Audio

        [](http://www.csounds.com/manual/html/socksend.html)

        [**socksend**](http://www.csounds.com/manual/html/socksend.html)
        sends audio data to other processes using the low-level UDP or
        TCP protocols.\

        [**sockrecv**](http://www.csounds.com/manual/html/sockrecv.html)
        receives audio data from other processes using the low-level UDP
        or TCP protocols.

<!-- -->

-   ### HUMAN INTERFACES

    -   #### Widgets

        The FLTK Widgets are integrated in Csound. Information and
        examples can be found
        [here](http://www.csounds.com/manual/html/ControlFltkIntro.html).

        QuteCsound implements a more modern and easy-to-use system for
        widgets. The communication between the widgets and Csound is
        done via
        [invalue](http://www.csounds.com/manual/html/invalue.html) (or
        [chnget](http://www.csounds.com/manual/html/chnget.html)) and
        [outvalue](http://www.csounds.com/manual/html/outvalue.html) (or
        [chnset](http://www.csounds.com/manual/html/chnset.html)).

    -   #### Keys

        [](http://www.csounds.com/manual/html/sensekey.html)[**sensekey**](http://www.csounds.com/manual/html/sensekey.html)
        reads the input of the computer keyboard.

    -   #### Mouse

        [](http://www.csounds.com/manual/html/xyin.html)

        [**xyin**](http://www.csounds.com/manual/html/xyin.html) reads
        the current mouse position. This should be used if your frontend
        does not provide any other means of reading mouse information.

    -   #### WII

        [](http://www.csounds.com/manual/html/wiiconnect.html)

        [**wiiconnect**](http://www.csounds.com/manual/html/wiiconnect.html)
        reads data from a number of external Nintendo Wiimote
        controllers.\

        [**wiidata**](http://www.csounds.com/manual/html/wiidata.html)
        reads data fields from a number of external Nintendo Wiimote
        controllers.\

        [**wiirange**](http://www.csounds.com/manual/html/wiirange.html)
        sets scaling and range limits for certain Wiimote fields.\

        [**wiisend**](http://www.csounds.com/manual/html/wiisend.html)
        sends data to one of a number of external Wii controllers.

    -   #### P5 Glove

        [](http://www.csounds.com/manual/html/p5gconnect.html)

        [**p5gconnect**](http://www.csounds.com/manual/html/p5gconnect.html)
        reads data from an external P5 glove controller.\

        [**p5gdata**](http://www.csounds.com/manual/html/p5gdata.html)
        reads data fields from an external P5 glove controller.



INSTRUMENT CONTROL
------------------

-   ### SCORE PARAMETER ACCESS

    [](http://www.csounds.com/manual/html/p.html)

    [**p(x)**](http://www.csounds.com/manual/html/p.html) gets the value
    of a specified p-field. (So, \'p(5)\' and \'p5\' both return the
    value of the fifth parameter in a certain score line, but in the
    former case you can insert a variable to specify the p-field.\

    [**pindex**](http://www.csounds.com/manual/html/pindex.html) does
    actually the same, but as an opcode instead of an expression.\

    [**pset**](http://www.csounds.com/manual/html/pset.html) sets
    p-field values in case there is no value from a scoreline.\

    [**passign**](http://www.csounds.com/manual/html/passign.html)
    assigns a range of p-fields to i-variables.\

    [**pcount**](http://www.csounds.com/manual/html/pcount.html) returns
    the number of p-fields belonging to a note event.

-   ### TIME AND TEMPO

    -   #### Time Reading

        [](http://www.csounds.com/manual/html/times.html)

        [**times**](http://www.csounds.com/manual/html/times.html) /
        [**timek**](http://www.csounds.com/manual/html/timek.html)
        return the time in seconds (times) or in control cycles (timek)
        since the start of the current Csound performance.\

        [**timeinsts**](http://www.csounds.com/manual/html/timeinsts.html)
        /
        [**timeinstk**](http://www.csounds.com/manual/html/timeinstk.html)
        return the time in seconds (timeinsts) or in control cycles
        (timeinstk) since the start of the instrument in which they are
        defined.\

        [**date**](http://www.csounds.com/manual/html/date.html) /
        [**dates**](http://www.csounds.com/manual/html/dates.html)
        return the number of seconds since 1 January 1970, using the
        operating system\'s clock, either as a number (date) or as a
        string (dates).\

        [**setscorepos**](http://www.csounds.com/manual/html/setscorepos.html)
        sets the playback position of the current score performance to a
        given position.

    -   #### Tempo Reading

        [](http://www.csounds.com/manual/html/tempo.html)

        [**tempo**](http://www.csounds.com/manual/html/tempo.html)
        allows the performance speed of Csound scored events to be
        controlled from within an orchestra.\

        [**miditempo**](http://www.csounds.com/manual/html/miditempo.html)
        returns the current tempo at k-rate, of either the midi file (if
        available) or the score.

        [**tempoval**](http://www.csounds.com/manual/html/tempoval.html)
        reads the current value of the tempo.

    -   #### Duration Modifications

        [](http://www.csounds.com/manual/html/ihold.html)

        [**ihold**](http://www.csounds.com/manual/html/ihold.html)
        forces a finite-duration note to become a \'held\' note.\

        [**xtratim**](http://www.csounds.com/manual/html/xtratim.html)
        extend the duration of the current instrument instance by a
        specified time duration.

    -   #### Time Signal Generators

        [](http://www.csounds.com/manual/html/metro.html)

        [**metro**](http://www.csounds.com/manual/html/metro.html)
        outputs a metronome-like control signal (1 value impulses
        separated by zeroes). Rate of impulses can be specified as
        impulses per second

        [**mpulse**](http://www.csounds.com/manual/html/mpulse.html)
        generates an impulse for one sample of user definable amplitude,
        followed by a user-definable time gap.

<!-- -->

-   ### CONDITIONS AND LOOPS

    [](http://www.csounds.com/manual/html/changed.html)

    [**changed**](http://www.csounds.com/manual/html/changed.html)
    reports whether any of its k-rate variable inputs has changed.

    [**trigger**](http://www.csounds.com/manual/html/trigger.html)
    informs whether a k-rate signal crosses a certain threshold, either
    in an upward direction, in a downward direction or both.\

    [**if**](http://www.csounds.com/manual/html/if.html) branches
    conditionally at initialisation or during performance time.

    [**loop\_lt**](http://www.csounds.com/manual/html/loop_lt.html),
    [**loop\_le**](http://www.csounds.com/manual/html/loop_le.html),
    [**loop\_gt**](http://www.csounds.com/manual/html/loop_gt.html) and
    [**loop\_ge**](http://www.csounds.com/manual/html/loop_ge.html)
    perform loops either at i-time or at k-rate.

<!-- -->

-   ### PROGRAM FLOW

    [**init**](http://www.csounds.com/manual/html/init.html) initializes
    a k- or a-variable (assigns a value to a k- or a-variable which is
    valid at i-time).\

    [**igoto**](http://www.csounds.com/manual/html/igoto.html) jumps to
    a label at i-time.\

    [**kgoto**](http://www.csounds.com/manual/html/kgoto.html) jumps to
    a label at k-rate.\

    [**timout**](http://www.csounds.com/manual/html/timout.html) jumps
    to a label for a given time. Can be used in conjunction with
    [reinit](http://www.csounds.com/manual/html/reinit.html) to perform
    time loops (see the chapter about Control Structures for more
    information).\

    [**reinit**](http://www.csounds.com/manual/html/reinit.html) /
    [**rigoto**](http://www.csounds.com/manual/html/rigoto.html) /
    [**rireturn**](http://www.csounds.com/manual/html/rireturn.html)
    forces a certain section of code to be reinitialised (i.e. i-rate
    variables will be refreshed).

<!-- -->

-   ### EVENT TRIGGERING

    **[event\_i](http://www.csounds.com/manual/html/event_i.html)** /
    **[event](http://www.csounds.com/manual/html/event.html)**: Generate
    an instrument event at i-time (event\_i) or at k-time (event). Easy
    to use, but you cannot send a string to the subinstrument.

    **[scoreline\_i](http://www.csounds.com/manual/html/scoreline_i.html)**
    /
    **[scoreline](http://www.csounds.com/manual/html/scoreline.html)**:
    Generate an instrument at i-time (scoreline\_i) or at k-time
    (scoreline). Like event\_i/event, but you can send to more than one
    instrument but unlike event\_i/event you can send strings. On the
    other hand, you must usually pre-format your scoreline-string using
    sprintf.

    [**schedkwhen**](http://www.csounds.com/manual/html/schedkwhen.html)
    triggers an instrument event at k-time if a certain condition is
    given.\

    [**seqtime**](http://www.csounds.com/manual/html/seqtime.html) /
    [**seqtime2**](http://www.csounds.com/manual/html/seqtime2.html) can
    be used to generate a trigger signal according to time values in a
    function table.

    [**timedseq**](http://www.csounds.com/manual/html/timedseq.html) is
    an event-sequencer in which time can be controlled by a
    time-pointer. Sequence data is stored in a function table or text
    file.

<!-- -->

-   ### INSTRUMENT SUPERVISION

    -   #### Instances And Allocation

        [**active**](http://www.csounds.com/manual/html/active.html)
        returns the number of active instances of an instrument.\

        [**maxalloc**](http://www.csounds.com/manual/html/maxalloc.html)
        limits the number of allocations (instances) of an instrument.\

        [**prealloc**](http://www.csounds.com/manual/html/prealloc.html)
        creates space for instruments but does not run them.

    <!-- -->

    -   #### Turning On And Off

        [**turnon**](http://www.csounds.com/manual/html/turnon.html)
        activates an instrument for an indefinite time.\

        [**turnoff**](http://www.csounds.com/manual/html/turnoff.html) /
        [**turnoff2**](http://www.csounds.com/manual/html/turnoff2.html)
        enables an instrument to turn itself, or another instrument,
        off.\

        [**mute**](http://www.csounds.com/manual/html/mute.html)
        mutes/unmutes new instances of a given instrument.\

        [**remove**](http://www.csounds.com/manual/html/remove.html)
        removes the definition of an instrument as long as it is not in
        use.\

        [**exitnow**](http://www.csounds.com/manual/html/exitnow.html)
        causes Csound to exit as fast as possible and with no cleaning
        up.

    -   #### Named Instruments

        [](http://www.csounds.com/manual/html/nstrnum.html)[**nstrnum**](http://www.csounds.com/manual/html/nstrnum.html)
        returns the number of a named instrument.

<!-- -->

-   ### SIGNAL EXCHANGE AND MIXING

    -   #### chn opcodes

        [**chn\_k**](http://www.csounds.com/manual/html/chn.html),
        [**chn\_a**](http://www.csounds.com/manual/html/chn.html), and
        [**chn\_S**](http://www.csounds.com/manual/html/chn.html)
        declare a control, audio, or string channel. Note that this can
        be done implicitly in most cases by chnset/chnget.

        [**chnset**](http://www.csounds.com/manual/html/chnset.html)
        writes a value (i, k, S or a) to a software channel (which is
        identified by a string as its name).

        [**chnget**](http://www.csounds.com/manual/html/chnget.html)
        gets the value of a named software channel.

        [**chnmix**](http://www.csounds.com/manual/html/chnmix.html)
        writes audio data to an named audio channel, mixing to the
        previous output.\

        [**chnclear**](http://www.csounds.com/manual/html/chnclear.html)
        clears an audio channel of the named software bus to zero.

    -   #### zak  [](http://www.csounds.com/manual/html/chn.html)

        **[zakinit](http://www.csounds.com/manual/html/zakinit.html)**
        initialised zak space for the storage of zak variables.

        **[zaw](http://www.csounds.com/manual/html/zaw.html)**,
        [**zkw**](http://www.csounds.com/manual/html/zkw.html) and
        [**ziw**](http://www.csounds.com/manual/html/ziw.html) write to
        (or overwrite) a-rate, k-rate or i-rate zak variables
        respectively.

        **[zawm](http://www.csounds.com/manual/html/zawm.html)**,
        **[zkwm](http://www.csounds.com/manual/html/zkwm.html)** and
        [**ziwm**](http://www.csounds.com/manual/html/ziw.html) mix
        (accumulate) a-rate, k-rate or i-rate zak variables
        respectively.\

        [**zar**](http://www.csounds.com/manual/html/zar.html),
        [**zkr**](instrument-control/instrument-control/zkr) and
        [**zir**](http://www.csounds.com/manual/html/zir.html) read from
        a-rate, k-rate or i-rate zak variables respectively.\

        [**zacl**](http://www.csounds.com/manual/html/zacl.html) and
        [**zkcl**](http://www.csounds.com/manual/html/zkcl.html) clears
        a range of a-rate or k-rate zak variables respectively.\




MATH, PYTHON/ SYSTEM, PLUGINS
-----------------------------

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
