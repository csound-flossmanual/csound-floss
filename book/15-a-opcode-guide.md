15 A. OPCODE GUIDE
==================

OVERVIEW
--------

If you run Csound from the command line with the option -z, you get a
list of all opcodes. Currently (Csound 5.13), the total number of all
opcodes is about 1500. There are already overviews of all of Csound\'s
opcodes in the [Opcodes
Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
and the [Opcode Quick
Reference](https://csound.com/docs/manual/MiscQuickref.html) of the
[Canonical Csound
Manual](https://csound.com/docs/manual/index.html).

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

        [(oscils)](https://csound.com/docs/manual/oscils.html) 
        [poscil](https://csound.com/docs/manual/poscil.html) 
        [poscil3](https://csound.com/docs/manual/poscil3.html) 
        [oscili](https://csound.com/docs/manual/oscili.html) 
        [oscil3](https://csound.com/docs/manual/oscil3.html) 
        [more](https://csound.com/docs/manual/SiggenBasic.html) 

    -   ##### Dynamic Sprectrum Oscillators

        [buzz](https://csound.com/docs/manual/buzz.html) 
        [gbuzz](https://csound.com/docs/manual/gbuzz.html) 
        [mpulse](https://csound.com/docs/manual/mpulse.html) 
        [vco](https://csound.com/docs/manual/vco.html) 
        [vco2](https://csound.com/docs/manual/vco2.html) \

    -   ##### Phasors

        [phasor](https://csound.com/docs/manual/phasor.html) 
        [syncphasor](https://csound.com/docs/manual/syncphasor.html)\

<!-- -->

-   #### RANDOM AND NOISE GENERATORS

    [(seed)](https://csound.com/docs/manual/seed.html) 
    [rand](https://csound.com/docs/manual/rand.html) 
    [randi](https://csound.com/docs/manual/randi.html) 
    [randh](https://csound.com/docs/manual/randh.html) 
    [rnd31](https://csound.com/docs/manual/rnd31.html) 
    [random](https://csound.com/docs/manual/random.html) 
    ([randomi](https://csound.com/docs/manual/randomi.html) /[randomh](https://csound.com/docs/manual/randomh.html)) 
    [pinkish](https://csound.com/docs/manual/pinkish.html) 
    [more](https://csound.com/docs/manual/SiggenNoise.html)  \

<!-- -->

-   #### ENVELOPES

    -   ##### Simple Standard Envelopes

        [linen](https://csound.com/docs/manual/linen.html) 
        [linenr](https://csound.com/docs/manual/linenr.html) 
        [adsr](https://csound.com/docs/manual/adsr.html) 
        [madsr](https://csound.com/docs/manual/madsr.html) 
        [more](https://csound.com/docs/manual/SiggenEnvelope.html) \

    -   ##### Envelopes By Linear And Exponential Generators 

        [linseg](https://csound.com/docs/manual/linseg.html) 
        [expseg](https://csound.com/docs/manual/expseg.html) 
        [transeg](https://csound.com/docs/manual/transeg.html) 
        ([linsegr](https://csound.com/docs/manual/linsegr.html) 
        [expsegr](https://csound.com/docs/manual/expsegr.html) 
        [transegr](http://en.flossmanuals.net/bin/view/Csound/transegr)) 
        [more](https://csound.com/docs/manual/SiggenLineexp.html)  

    -   ##### Envelopes By Function Tables

<!-- -->

-   #### DELAYS

    -   ##### Audio Delays

        [vdelay](https://csound.com/docs/manual/vdelay.html) 
        [vdelayx](https://csound.com/docs/manual/vdelayx.html) 
        [vdelayw](https://csound.com/docs/manual/vdelayw.html)  

        [delayr](https://csound.com/docs/manual/delayr.html) 
        [delayw](https://csound.com/docs/manual/delayw.html) 
        [deltap](https://csound.com/docs/manual/deltap.html) 
        [deltapi](https://csound.com/docs/manual/deltapi.html) 
        [deltap3](https://csound.com/docs/manual/deltap3.html) 
        [deltapx](https://csound.com/docs/manual/deltapx.html) 
        [deltapxw](https://csound.com/docs/manual/deltapxw.html) 
        [deltapn](https://csound.com/docs/manual/deltapn.html)   \

    -   ##### Control Signal Delays

        [delk](https://csound.com/docs/manual/delayk.html) 
        [vdel\_k](https://csound.com/docs/manual/delayk.html) \

<!-- -->

-   #### FILTERS

    Compare [Standard
    Filters](https://csound.com/docs/manual/SigmodStandard.html) and
    [Specialized
    Filters](https://csound.com/docs/manual/SigmodSpeciali.html)
    overviews.\

    -   ##### Low Pass Filters

        [tone](https://csound.com/docs/manual/tone.html) 
        [tonex](https://csound.com/docs/manual/tonex.html) 
        [butlp](https://csound.com/docs/manual/butterlp.html) 
        [clfilt](https://csound.com/docs/manual/clfilt.html)  \

    <!-- -->

    -   ##### High Pass Filters

        [atone](https://csound.com/docs/manual/atone.html) 
        [atonex](https://csound.com/docs/manual/atonex.html) 
        [buthp](https://csound.com/docs/manual/butterhp.html) 
        [clfilt](https://csound.com/docs/manual/clfilt.html)  \

    <!-- -->

    -   ##### Band Pass And Resonant Filters

        [reson](https://csound.com/docs/manual/reson.html) 
        [resonx](https://csound.com/docs/manual/resonx.html) 
        [resony](https://csound.com/docs/manual/resony.html) 
        [resonr](https://csound.com/docs/manual/resonr.html) 
        [resonz](https://csound.com/docs/manual/resonz.html) 
        [butbp](https://csound.com/docs/manual/butterbp.html)  \

    <!-- -->

    -   ##### Band Reject Filters

        [areson](https://csound.com/docs/manual/areson.html) 
        [butbr](https://csound.com/docs/manual/butterbp.html)  \

    -   ##### Filters For Smoothing Control Signals

        [port](https://csound.com/docs/manual/port.html) 
        [portk](https://csound.com/docs/manual/portk.html) \

<!-- -->

-   #### REVERB

    [freeverb](https://csound.com/docs/manual/freeverb.html) 
    [reverbsc](https://csound.com/docs/manual/reverbsc.html) 
    [reverb](https://csound.com/docs/manual/reverb.html) 
    [nreverb](https://csound.com/docs/manual/nreverb.html) 
    [babo](https://csound.com/docs/manual/babo.html) 
    [pconvolve](https://csound.com/docs/manual/pconvolve.html)

<!-- -->

-   #### SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS

    -   ##### Amplitude Measurement and Amplitude Envelope Following

        [rms](https://csound.com/docs/manual/rms.html) 
        [balance](https://csound.com/docs/manual/balance.html) 
        [follow](https://csound.com/docs/manual/follow.html) 
        [follow2](https://csound.com/docs/manual/follow2.html) 
        [peak](https://csound.com/docs/manual/peak.html) 
        [max\_k](https://csound.com/docs/manual/max_k.html)  \

    <!-- -->

    -   ##### Pitch Estimation (Pitch Tracking) 

        [ptrack](https://csound.com/docs/manual/ptrack.html) 
        [pitch](https://csound.com/docs/manual/pitch.html) 
        [pitchamdf](https://csound.com/docs/manual/pitchamdf.html) 
        [pvscent](https://csound.com/docs/manual/pvscent.html)  \

    <!-- -->

    -   ##### Tempo Estimation

        [tempest](https://csound.com/docs/manual/tempest.html)  \

    -   ##### Dynamic Processing

        [compress](https://csound.com/docs/manual/compress.html) 
        [dam](https://csound.com/docs/manual/dam.html) 
        [clip](https://csound.com/docs/manual/clip.html) \

    -   ##### Sample Level Operations

        [limit](https://csound.com/docs/manual/limit.html) 
        [samphold](https://csound.com/docs/manual/samphold.html) 
        [vaget](https://csound.com/docs/manual/vaget.html) 
        [vaset](https://csound.com/docs/manual/vaset.html)  \

<!-- -->

-   ####  SPATIALIZATION

    -   ##### Panning

        [pan2](https://csound.com/docs/manual/pan2.html) 
        [pan](https://csound.com/docs/manual/pan.html)  \

    <!-- -->

    -   ##### VBAP

        [vbaplsinit](https://csound.com/docs/manual/vpaplsinit.html) 
        [vbap4](https://csound.com/docs/manual/vpap4.html) 
        [vbap8](https://csound.com/docs/manual/vbap8.html) 
        [vbap16](https://csound.com/docs/manual/vbap16.html) \

    -   ##### Ambisonics

        [bformenc1](https://csound.com/docs/manual/bformenc1.html) 
        [bformdec1](https://csound.com/docs/manual/bformdec1.html)  \

    -   ##### Binaural / HRTF

        [hrtfstat](https://csound.com/docs/manual/hrtfstat.html) 
        [hrtfmove](https://csound.com/docs/manual/hrtfmove.html) 
        [hrtfmove2](https://csound.com/docs/manual/hrtfmove2.html) 
        [hrtfer](https://csound.com/docs/manual/hrtfer.html) \

### ADVANCED SIGNAL PROCESSING

-   #### MODULATION AND DISTORTION

    -   ##### Frequency Modulation

        [foscil](https://csound.com/docs/manual/foscil.html) 
        [foscili](https://csound.com/docs/manual/foscili.html) \

        [crossfm](https://csound.com/docs/manual/crossfm.html) 
        [crossfmi](https://csound.com/docs/manual/crossfm.html) 
        [crosspm](https://csound.com/docs/manual/crossfm.html) 
        [crosspmi](https://csound.com/docs/manual/crossfm.html) 
        [crossfmpm](https://csound.com/docs/manual/crossfm.html) 
        [crossfmpmi](https://csound.com/docs/manual/crossfm.html) \

    -   ##### Distortion And Wave Shaping

        [distort](https://csound.com/docs/manual/distort.html) 
        [distort1](https://csound.com/docs/manual/distort1.html) 
        [powershape](https://csound.com/docs/manual/powershape.html) 
        [polynomial](https://csound.com/docs/manual/polynomial.html) 
        [chebyshevpoly](https://csound.com/docs/manual/chebyshevpoly.html)  \

    -   ##### Flanging, Phasing, Phase Shaping

        [flanger](https://csound.com/docs/manual/flanger.html) 
        [harmon](https://csound.com/docs/manual/harmon.html) 
        [phaser1](https://csound.com/docs/manual/phaser1.html) 
        [phaser2](https://csound.com/docs/manual/phaser2.html) 
        [pdclip](https://csound.com/docs/manual/pdclip.html) 
        [pdhalf](https://csound.com/docs/manual/pdhalf.html) 
        [pdhalfy](https://csound.com/docs/manual/pdhalfy.html) \

    -   ##### Doppler Shift

        [doppler](https://csound.com/docs/manual/doppler.html) \

<!-- -->

-   #### GRANULAR SYNTHESIS

    [partikkel](https://csound.com/docs/manual/partikkel.html) 
    [sndwarp](https://csound.com/docs/manual/sndwarp.html) 
    [others](https://csound.com/docs/manual/SiggenGranular.html)

<!-- -->

-   #### CONVOLUTION

    [pconvolve](https://csound.com/docs/manual/pconvolve.html) 
    [ftconv](https://csound.com/docs/manual/ftconv.html) 
    [dconv](https://csound.com/docs/manual/dconv.html)  \

<!-- -->

-   #### FFT AND SPECTRAL PROCESSING

    -   ##### Real-time Analysis and Resynthesis 

        [pvsanal](https://csound.com/docs/manual/pvsanal.html) 
        [pvstanal](https://csound.com/docs/manual/pvstanal.html) 
        [pvsynth](https://csound.com/docs/manual/pvsynth.html) 
        [pvsadsyn](https://csound.com/docs/manual/pvsadsynth.html)  \

    -   ##### Writing FFT Data to A File and Reading From it

        [pvsfwrite](https://csound.com/docs/manual/pvsfwrite.html) 
        [pvanal](https://csound.com/docs/manual/pvanal.html) 
        [pvsfread](https://csound.com/docs/manual/pvsfread.html) 
        [pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) \

    -   ##### Writing FFT Data to a Buffer and Reading From it 

        [pvsbuffer](https://csound.com/docs/manual/pvsbuffer.html) 
        [pvsbufread](https://csound.com/docs/manual/pvsbufread.html) 
        [pvsftw](https://csound.com/docs/manual/pvsftw.html) 
        [pvsftr](https://csound.com/docs/manual/pvsftr.html)  \

    -   ##### FFT Info 

        [pvsinfo](https://csound.com/docs/manual/pvsinfo.html) 
        [pvsbin](https://csound.com/docs/manual/pvsbin.html) 
        [pvscent](https://csound.com/docs/manual/pvscent.html)  \

    -   ##### Manipulating FFT Signals 

        [pvscale](https://csound.com/docs/manual/pvscale.html) 
        [pvshift](https://csound.com/docs/manual/pvshift.html) 
        [pvsbandp](https://csound.com/docs/manual/pvsbandp.html) 
        [pvsbandr](https://csound.com/docs/manual/pvsbandr.html) 
        [pvsmix](https://csound.com/docs/manual/pvsmix.html) 
        [pvscross](https://csound.com/docs/manual/pvscross.html) 
        [pvsfilter](https://csound.com/docs/manual/pvsfilter.html) 
        [pvsvoc](https://csound.com/docs/manual/pvsvoc.html) 
        [pvsmorph](http://en.flossmanuals.net/bin/view/Csound/pvsmorph)
        [pvsfreeze](https://csound.com/docs/manual/pvsfreeze.html) 
        [pvsmaska](https://csound.com/docs/manual/pvsmaska.html) 
        [pvsblur](https://csound.com/docs/manual/pvsblur.html) 
        [pvstencil](https://csound.com/docs/manual/pvstencil.html) 
        [pvsarp](https://csound.com/docs/manual/pvsarp.html) 
        [pvsmooth](https://csound.com/docs/manual/pvsmooth.html) \

<!-- -->

-   #### PHYSICAL MODELS AND FM INSTRUMENTS

    -   ##### Waveguide Physical Modelling

        see
        [here](https://csound.com/docs/manual/SiggenWavguide.html) 
        and
        [here](https://csound.com/docs/manual/SigmodWavguide.html) \

    -   ##### FM Instrument Models

        see
        [here](https://csound.com/docs/manual/SiggenFmsynth.html)   \

### DATA

-   #### BUFFER / FUNCTION TABLES

    -   ##### Creating Function Tables (Buffers)

        [ftgen](https://csound.com/docs/manual/ftgen.html)  [GEN
        Routines](https://csound.com/docs/manual/ScoreGenRef.html) \

    -   ##### Writing to Tables

        [tableiw](https://csound.com/docs/manual/tableiw.html)  /
        [tablew](https://csound.com/docs/manual/tablew.html)    
        [tabw\_i](https://csound.com/docs/manual/tab.html)  /
        [tabw](https://csound.com/docs/manual/tab.html) 

    -   ##### Reading From Tables 

        [table](https://csound.com/docs/manual/table.html)  /
        [tablei](https://csound.com/docs/manual/tablei.html)  /
        [table3](https://csound.com/docs/manual/table3.html)    
        [tab\_i](https://csound.com/docs/manual/tab.html)  /
        [tab](https://csound.com/docs/manual/tab.html) 

    -   ##### Saving Tables to Files 

        [ftsave](https://csound.com/docs/manual/ftsave.html)  /
        [ftsavek](https://csound.com/docs/manual/ftsavek.html)   
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122)   \

    -   ##### Reading Tables From Files

        [ftload](https://csound.com/docs/manual/ftload.html)  /
        [ftloadk](https://csound.com/docs/manual/ftloadk.html)    
        [GEN23](https://csound.com/docs/manual/GEN23.html)  \

<!-- -->

-   #### SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS

    -   ##### Signal Input and Output

        [inch](https://csound.com/docs/manual/inch.html)  ; 
        [outch](https://csound.com/docs/manual/outch.html) 
        [out](https://csound.com/docs/manual/out.html) 
        [outs](https://csound.com/docs/manual/outs.html)  ; 
        [monitor](https://csound.com/docs/manual/monitor.html) \

    -   ##### Sample Playback With Optional Looping

        [flooper2](https://csound.com/docs/manual/flooper2.html) 
        [sndloop](https://csound.com/docs/manual/sndloop.html)

    -   ##### Soundfonts and Fluid Opcodes

        [fluidEngine](https://csound.com/docs/manual/fluidEngine.html) 
        [fluidSetInterpMethod](https://csound.com/docs/manual/fluidSetInterpMethod.html) 
        [fluidLoad](https://csound.com/docs/manual/fluidLoad.html) 
        [fluidProgramSelect](https://csound.com/docs/manual/fluidProgramSelect.html) 
        [fluidNote](https://csound.com/docs/manual/fluidNote.html) 
        [fluidCCi](https://csound.com/docs/manual/fluidCCi.html) 
        [fluidCCk](https://csound.com/docs/manual/fluidCCk.html) 
        [fluidControl](https://csound.com/docs/manual/fluidControl.html) 
        [fluidOut](https://csound.com/docs/manual/fluidOut.html) 
        [fluidAllOut](https://csound.com/docs/manual/fluidAllOut.html) \

<!-- -->

-   #### FILE INPUT AND OUTPUT

    -   ##### Sound File Input 

        [soundin](https://csound.com/docs/manual/soundin.html) 
        [diskin](https://csound.com/docs/manual/diskin2.html) 
        [diskin2](https://csound.com/docs/manual/diskin2.html) 
        [mp3in](https://csound.com/docs/manual/mp3in.html) 
        [(GEN01)](https://csound.com/docs/manual/GEN01.html) \

    -   ##### Sound File Queries 

        [filelen](https://csound.com/docs/manual/filelen.html) 
        [filesr](https://csound.com/docs/manual/filesr.html) 
        [filenchnls](https://csound.com/docs/manual/filenchnls.html) 
        [filepeak](https://csound.com/docs/manual/filepeak.html) 
        [filebit](https://csound.com/docs/manual/filebit.html)  \

    -   ##### Sound File Output 

        [fout](https://csound.com/docs/manual/fout.html) \

    -   ##### Non-Soundfile Input And Output 

        [readk](https://csound.com/docs/manual/readk.html)  
        [GEN23](https://csound.com/docs/manual/GEN23.html)  
        [dumpk](https://csound.com/docs/manual/dumpk.html)  
        [fprints](https://csound.com/docs/manual/fprints.html) /
        [fprintks](https://csound.com/docs/manual/fprintks.html)  
        [ftsave](https://csound.com/docs/manual/ftsave.html)  /
        [ftsavek](https://csound.com/docs/manual/ftsavek.html)   
        [ftload](https://csound.com/docs/manual/ftload.html)  /
        [ftloadk](https://csound.com/docs/manual/ftloadk.html) 

<!-- -->

-   #### CONVERTERS OF DATA TYPES 

    -   ##### i \<- k 

        [i(k)](https://csound.com/docs/manual/opi.html) \

    -   ##### k \<- a 

        [downsamp](https://csound.com/docs/manual/downsamp.html)  
        [max\_k](https://csound.com/docs/manual/max_k.html)  \

    -   ##### a \<- k

        [upsamp](https://csound.com/docs/manual/upsamp.html) 
        [interp](https://csound.com/docs/manual/interp.html)  \

<!-- -->

-   #### PRINTING AND STRINGS 

    -   ##### Simple Printing 

        [print](https://csound.com/docs/manual/print.html) 
        [printk](https://csound.com/docs/manual/printk.html) 
        [printk2](https://csound.com/docs/manual/printk2.html) 
        [puts](https://csound.com/docs/manual/puts.html) \

    -   ##### Formatted Printing 

        [prints](https://csound.com/docs/manual/prints.html) 
        [printf\_i](https://csound.com/docs/manual/printf.html) 
        [printks](https://csound.com/docs/manual/printks.html) 
        [printf](https://csound.com/docs/manual/printf.html)  \

    -   ##### String Variables 

        [sprintf](https://csound.com/docs/manual/sprintf.html) 
        [sprintfk](https://csound.com/docs/manual/sprintfk.html) 
        [strset](https://csound.com/docs/manual/strset.html) 
        [strget](https://csound.com/docs/manual/strget.html)  \

    -   ##### String Manipulation And Conversion

        see
        [here](https://csound.com/docs/manual/StringsTop.html#stringmanipulate) 
        and
        [here](https://csound.com/docs/manual/stringconvert.html)   \

### REALTIME INTERACTION

-   #### MIDI

    -   ##### Opcodes for Use in MIDI-Triggered Instruments 

        [massign](https://csound.com/docs/manual/massign.html) 
        [pgmassign](https://csound.com/docs/manual/pgmassign.html) 
        [notnum](https://csound.com/docs/manual/notnum.html) 
        [cpsmidi](https://csound.com/docs/manual/cpsmidi.html) 
        [veloc](https://csound.com/docs/manual/veloc.html) 
        [ampmidi](https://csound.com/docs/manual/ampmidi.html) 
        [midichn](https://csound.com/docs/manual/midichn.html) 
        [pchbend](https://csound.com/docs/manual/pchbend.html) 
        [aftouch](https://csound.com/docs/manual/aftouch.html) 
        [polyaft](https://csound.com/docs/manual/polyaft.html) \

    -   ##### Opcodes For Use In All Instruments

        [ctrl7](https://csound.com/docs/manual/ctrl7.html) 
        ([ctrl14](https://csound.com/docs/manual/ctrl14.html)/[ctrl21](https://csound.com/docs/manual/ctrl21.html))
        [initc7](https://csound.com/docs/manual/initc7.html) 
        [ctrlinit](https://csound.com/docs/manual/ctrlinit.html) 
        ([initc14](https://csound.com/docs/manual/initc14.html)/[initc21](https://csound.com/docs/manual/initc21.html)) 
        [midiin](https://csound.com/docs/manual/midiin.html) 
        [midiout](https://csound.com/docs/manual/midiout.html)  \

<!-- -->

-   #### OPEN SOUND CONTROL AND NETWORK

    -   ##### Open Sound Control

        [OSCinit](https://csound.com/docs/manual/OSCinit.html) 
        [OSClisten](https://csound.com/docs/manual/OSClisten.html) 
        [OSCsend](https://csound.com/docs/manual/OSCsend.html)  \

    -   ##### Remote Instruments

        [remoteport](https://csound.com/docs/manual/remoteport.html) 
        [insremot](https://csound.com/docs/manual/insremot.html) 
        [insglobal](https://csound.com/docs/manual/insglobal.html) 
        [midiremot](https://csound.com/docs/manual/midiremot.html) 
        [midiglobal](https://csound.com/docs/manual/midiglobal.html)  \

    -   ##### Network Audio

        [socksend](https://csound.com/docs/manual/socksend.html) 
        [sockrecv](https://csound.com/docs/manual/sockrecv.html)   \

<!-- -->

-   #### HUMAN INTERFACES

    -   ##### Widgets

        FLTK overview
        [here](https://csound.com/docs/manual/ControlFltkIntro.html)  \

    -   ##### Keys

        [sensekey](https://csound.com/docs/manual/sensekey.html) \

    -   ##### Mouse

        [xyin](https://csound.com/docs/manual/xyin.html) \

    -   ##### WII

        [wiiconnect](https://csound.com/docs/manual/wiiconnect.html) 
        [wiidata](https://csound.com/docs/manual/wiidata.html) 
        [wiirange](https://csound.com/docs/manual/wiirange.html) 
        [wiisend](https://csound.com/docs/manual/wiisend.html) \

    -   ##### P5 Glove

        [p5gconnect](https://csound.com/docs/manual/p5gconnect.html) 
        [p5gdata](https://csound.com/docs/manual/p5gdata.html) 

### INSTRUMENT CONTROL

-   #### SCORE PARAMETER ACCESS

    [p(x)](https://csound.com/docs/manual/p.html) 
    [pindex](https://csound.com/docs/manual/pindex.html) 
    [pset](https://csound.com/docs/manual/pset.html) 
    [passign](https://csound.com/docs/manual/passign.html) 
    [pcount](https://csound.com/docs/manual/pcount.html)  \

-   #### TIME AND TEMPO

    -   ##### Time Reading

        [times](https://csound.com/docs/manual/times.html)/[timek](https://csound.com/docs/manual/timek.html)
           
        [timeinsts](https://csound.com/docs/manual/timeinsts.html)/[timeinstk](https://csound.com/docs/manual/timeinstk.html)  
        [date](https://csound.com/docs/manual/date.html)/[dates](https://csound.com/docs/manual/dates.html)
          
        [setscorepos](https://csound.com/docs/manual/setscorepos.html)
         \

    -   ##### Tempo Reading

        [tempo](https://csound.com/docs/manual/tempo.html) 
        [miditempo](https://csound.com/docs/manual/miditempo.html) 
        [tempoval](https://csound.com/docs/manual/tempoval.html)  \

    -   ##### Duration Modifications

        [ihold](https://csound.com/docs/manual/ihold.html) 
        [xtratim](https://csound.com/docs/manual/xtratim.html)  

    -   ##### Time Signal Generators

        [metro](https://csound.com/docs/manual/metro.html) 
        [mpulse](https://csound.com/docs/manual/mpulse.html) \

<!-- -->

-   #### CONDITIONS AND LOOPS

    [changed](https://csound.com/docs/manual/changed.html) 
    [trigger](https://csound.com/docs/manual/trigger.html) 
    [if](https://csound.com/docs/manual/if.html) 
    [loop\_lt](https://csound.com/docs/manual/loop_lt.html)/[loop\_le](https://csound.com/docs/manual/loop_le.html)/[loop\_gt](https://csound.com/docs/manual/loop_gt.html)/[loop\_ge](https://csound.com/docs/manual/loop_ge.html) \

<!-- -->

-   #### PROGRAM FLOW

    [init](https://csound.com/docs/manual/init.html) 
    [igoto](https://csound.com/docs/manual/igoto.html) 
    [kgoto](https://csound.com/docs/manual/kgoto.html) 
    [timout](https://csound.com/docs/manual/timout.html)  
    [reinit](https://csound.com/docs/manual/reinit.html)/[rigoto](https://csound.com/docs/manual/rigoto.html)/[rireturn](https://csound.com/docs/manual/rireturn.html) \

<!-- -->

-   #### EVENT TRIGGERING

    [event\_i](https://csound.com/docs/manual/event_i.html)  /
    [event](https://csound.com/docs/manual/event.html)   
    [scoreline\_i](https://csound.com/docs/manual/scoreline_i.html) 
    / [scoreline](https://csound.com/docs/manual/scoreline.html)   
    [schedkwhen](https://csound.com/docs/manual/schedkwhen.html)  
    [seqtime](https://csound.com/docs/manual/seqtime.html)
    /[seqtime2](https://csound.com/docs/manual/seqtime2.html)  
    [timedseq](https://csound.com/docs/manual/timedseq.html)  \

<!-- -->

-   #### INSTRUMENT SUPERVISION

    -   ##### Instances And Allocation

        [active](https://csound.com/docs/manual/active.html) 
        [maxalloc](https://csound.com/docs/manual/maxalloc.html) 
        [prealloc](https://csound.com/docs/manual/prealloc.html)  \

    <!-- -->

    -   ##### Turning On And Off

        [turnon](https://csound.com/docs/manual/turnon.html)   
        [turnoff](https://csound.com/docs/manual/turnoff.html)/[turnoff2](https://csound.com/docs/manual/turnoff2.html)  
        [mute](https://csound.com/docs/manual/mute.html)  
        [remove](https://csound.com/docs/manual/remove.html)  
        [exitnow](https://csound.com/docs/manual/exitnow.html)  \

    -   ##### Named Instruments

        [nstrnum](https://csound.com/docs/manual/nstrnum.html)\

<!-- -->

-   #### SIGNAL EXCHANGE AND MIXING

    -   ##### chn opcodes

        [chn\_k](https://csound.com/docs/manual/chn.html)  /
        [chn\_a](https://csound.com/docs/manual/chn.html)  /
        [chn\_S](https://csound.com/docs/manual/chn.html)   
        [chnset](https://csound.com/docs/manual/chnset.html)  
        [chnget](https://csound.com/docs/manual/chnget.html)  
        [chnmix](https://csound.com/docs/manual/chnmix.html)  
        [chnclear](https://csound.com/docs/manual/chnclear.html) \

    -   ##### zak?  

### MATHS

-   #### MATHEMATICAL CALCULATIONS

    -   ##### Arithmetic Operations

        [+](https://csound.com/docs/manual/adds.html)   
        [-](https://csound.com/docs/manual/subtracts.html)   
        [\*](https://csound.com/docs/manual/multiplies.html)   
        [/](https://csound.com/docs/manual/divides.html)   
        [\^](https://csound.com/docs/manual/raises.html)  
        [%](https://csound.com/docs/manual/modulus.html) \

        [exp(x)](https://csound.com/docs/manual/exp.html)   
        [log(x)](https://csound.com/docs/manual/log.html)  
        [log10(x)](https://csound.com/docs/manual/log10.html)  
        [sqrt(x)](https://csound.com/docs/manual/sqrt.html) \

        [abs(x)](https://csound.com/docs/manual/abs.html) 
        [int(x)](https://csound.com/docs/manual/int.html) 
        [frac(x)](https://csound.com/docs/manual/frac.html) \

        [round(x)](https://csound.com/docs/manual/round.html) 
        [ceil(x)](https://csound.com/docs/manual/ceil.html) 
        [floor(x)](https://csound.com/docs/manual/floor.html) \

    -   ##### Trigonometric Functions

        [sin(x)](https://csound.com/docs/manual/sin.html)  
        [cos(x)](https://csound.com/docs/manual/cos.html)  
        [tan(x)](https://csound.com/docs/manual/tan.html) \

        [sinh(x)](https://csound.com/docs/manual/sinh.html)  
        [cosh(x)](https://csound.com/docs/manual/cosh.html)  
        [tanh(x)](https://csound.com/docs/manual/tanh.html) \

        [sininv(x)](https://csound.com/docs/manual/sininv.html)  
        [cosinv(x)](https://csound.com/docs/manual/cosinv.html)  
        [taninv(x)](https://csound.com/docs/manual/taninv.html)  
        [taninv2(x)](https://csound.com/docs/manual/taninv2.html) \

    -   ##### Logic Operators

        [&&](https://csound.com/docs/manual/opand.html)   
        [\|\|](https://csound.com/docs/manual/opor.html)  \

<!-- -->

-   #### CONVERTERS

    -   ##### MIDI To Frequency 

        [cpsmidi](https://csound.com/docs/manual/cpsmidi.html) 
        [cpsmidinn](https://csound.com/docs/manual/cpsmidinn.html)  
        [more](https://csound.com/docs/manual/PitchTop.html#PitchFuncs) 

    <!-- -->

    -   ##### Frequency To MIDI

        [F2M](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=123)  
        [F2MC](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=124) 
        (UDO\'s)\

    -   ##### Cent Values To Frequency 

        [cent](https://csound.com/docs/manual/cent.html)  \

    -   ##### Amplitude Converters

        [ampdb](https://csound.com/docs/manual/ampdb.html) 
        [ampdbfs](https://csound.com/docs/manual/ampdbfs.html) 
        [dbamp](https://csound.com/docs/manual/dbamp.html) 
        [dbfsamp](https://csound.com/docs/manual/dbfsamp.html) \

    -   ##### Scaling 

        [Scali](http://www.csounds.com/udo/displayOpcode.php?opcode_id=125)  
        [Scalk](http://www.csounds.com/udo/displayOpcode.php?opcode_id=126)  
        [Scala](http://www.csounds.com/udo/displayOpcode.php?opcode_id=127) 
        (UDO\'s)\

### PYTHON AND SYSTEM

-   ##### PYTHON OPCODES

    [pyinit](https://csound.com/docs/manual/pyinit.html) 
    [pyrun](https://csound.com/docs/manual/pyrun.html) 
    [pyexec](https://csound.com/docs/manual/pyexec.html) 
    [pycall](https://csound.com/docs/manual/pycall.html) 
    [pyeval](https://csound.com/docs/manual/pyeval.html) 
    [pyassign](https://csound.com/docs/manual/pyassign.html) \

<!-- -->

-   ##### SYSTEM OPCODES

    [getcfg](https://csound.com/docs/manual/getcfg.html)  
    [system](https://csound.com/docs/manual/system.html)/[system\_i](https://csound.com/docs/manual/system.html) \

### PLUGINS 

-   ##### PLUGIN HOSTING

    -   ##### LADSPA

        [dssiinit](https://csound.com/docs/manual/dssiinit.html) 
        [dssiactivate](https://csound.com/docs/manual/dssiactivate.html) 
        [dssilist](https://csound.com/docs/manual/dssilist.html) 
        [dssiaudio](https://csound.com/docs/manual/dssiaudio.html) 
        [dssictls](https://csound.com/docs/manual/dssictls.html)  \

    -   ##### VST

        [vstinit](https://csound.com/docs/manual/vstinit.html)  
        [vstaudio](https://csound.com/docs/manual/vstaudio.html)/[vstaudiog](https://csound.com/docs/manual/vstaudio.html)  
        [vstmidiout](https://csound.com/docs/manual/vstmidiout.html)  
        [vstparamset](https://csound.com/docs/manual/vstparamset.html)/[vstparamget](https://csound.com/docs/manual/vstparamget.html)  
        [vstnote](https://csound.com/docs/manual/vstnote.html)  
        [vstinfo](https://csound.com/docs/manual/vstinfo.html) 
        [vstbankload](https://csound.com/docs/manual/vstbankload.html)  
        [vstprogset](https://csound.com/docs/manual/vstprogset.html)  
        [vstedit](https://csound.com/docs/manual/vstedit.html) \

<!-- -->

-   ##### EXPORTING CSOUND FILES TO PLUGINS 




BASIC SIGNAL PROCESSING
-----------------------

 
-   ### OSCILLATORS AND PHASORS

    -   #### Standard Oscillators

        [**oscils**](https://csound.com/docs/manual/oscils.html) is
        a very **simple sine oscillator** which is ideally suited for
        quick tests. It needs no function table, but offers just i-rate
        input arguments.

        [**ftgen**](https://csound.com/docs/manual/ftgen.html)
        generates a function table, which is needed by any oscillator
        except [oscils](https://csound.com/docs/manual/oscils.html).
        The [GEN
        Routines](https://csound.com/docs/manual/ScoreGenRef.html)
        fill the function table with any desired waveform, either a sine
        wave or any other curve. Refer to the [function table
        chapter](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES)
        of this manual for more information.\

        [**poscil**](https://csound.com/docs/manual/poscil.html) can
        be recommended as **standard oscillator** because it is very
        precise, in particular for long tables and low frequencies. It
        provides linear interpolation, any rate its amplitude and
        frequency input arguments, and works also for non-power-of-two
        tables.
        [poscil3](https://csound.com/docs/manual/poscil3.html)
        provides cubic interpolation, but has just k-rate input. **Other
        common oscillators** are
        [oscili](https://csound.com/docs/manual/oscili.html) and
        [oscil3](https://csound.com/docs/manual/oscil3.html). They
        are less precise than poscil/poscili, but you can skip the
        initialization which can be useful in certain situations. The
        [oscil](https://csound.com/docs/manual/oscil.html) opcode
        does not provide any interpolation, so it should usually be
        avoided. **More** Csound oscillators can be found
        [here](https://csound.com/docs/manual/SiggenBasic.html).

    -   #### Dynamic Spectrum Oscillators

        [](https://csound.com/docs/manual/buzz.html)

        [**buzz**](https://csound.com/docs/manual/buzz.html) and
        [**gbuzz**](https://csound.com/docs/manual/gbuzz.html)
        generate a set of harmonically related cosine partials.

        [**mpulse**](https://csound.com/docs/manual/mpulse.html)
        generates a set of impulses of user-definable amplitude and
        interval gap between impulses.

        [**vco**](https://csound.com/docs/manual/vco.html) and
        [**vco2**](https://csound.com/docs/manual/vco2.html)
        implement band-limited, analogue modelled oscillators that can
        use variety of standard waveforms.

    -   ##### Phasors

        [](https://csound.com/docs/manual/phasor.html)[**phasor**](https://csound.com/docs/manual/phasor.html)
        produces the typical moving phase values between 0 and 1. The
        more complex
        [syncphasor](https://csound.com/docs/manual/syncphasor.html)
        lets you synchronize more than one phasor precisely.

<!-- -->

-   ### RANDOM AND NOISE GENERATORS

    [](https://csound.com/docs/manual/seed.html)

    [**seed**](https://csound.com/docs/manual/seed.html) sets the
    seed value for the majority of the Csound (pseudo) random number
    generators. A seed value of zero will seed random number generators
    from the system clock thereby guaranteeing a different result each
    time Csound is run, while any other seed value generates the same
    random values each time.\

    [**rand**](https://csound.com/docs/manual/rand.html) is the
    usual opcode for uniformly distributed bipolar random values. If you
    give 1 as input argument (called \"amp\"), you will get values
    between -1 and +1.
    **[randi](https://csound.com/docs/manual/randi.html)**
    interpolates between values which are generated with a variable
    frequency.
    **[randh](https://csound.com/docs/manual/randh.html)** holds the
    value until the next one is generated (sample and hold). You can
    control the seed value by an input argument (a value greater than 1
    seeds from current time), you can decide whether to generate 16bit
    or 31bit random numbers and you can add an offset.\

    **[rnd31](https://csound.com/docs/manual/rnd31.html)** can
    output all rates of variables (i-rate variables are not supported by
    rand). It also gives the user control over the random distribution,
    but has no offset parameter.

    [**random**](https://csound.com/docs/manual/random.html)
    provides extra conveniece in that the user can define both the
    minimum and a maximum of the distribution as input argument; *rand*
    and *rnd31* only output bipolar ranges and we define amplitude. It
    can also be used for all rates, but you have no direct seed input,
    and the
    [randomi](https://csound.com/docs/manual/randomi.html)/[randomh](https://csound.com/docs/manual/randomh.html)
    variants always start from the lower border, instead anywhere
    between the borders.

    **[pinkish](https://csound.com/docs/manual/pinkish.html)**
    produces pink noise at audio-rate (white noise can be produced using
    *rand* or *noise*).

    There are many more random opcodes worth investigating.
    [Here](https://csound.com/docs/manual/SiggenNoise.html) is an
    overview. A number of GEN routines are also used for generating
    random distributions. They can be found in the [GEN Routines
    overview](https://csound.com/docs/manual/ScoreGenRef.html).

<!-- -->

-   ### ENVELOPES

    -   #### Simple Standard Envelopes

        [](https://csound.com/docs/manual/linen.html)

        [**linen**](https://csound.com/docs/manual/linen.html)
        applies a linear rise (fade in) and decay (fade out) to a
        signal. It is very easy to use, as you put the raw audio signal
        in and get the enveloped signal out.

        [**linenr**](https://csound.com/docs/manual/linenr.html)
        does the same for any note whose duration is not known when they
        begin. This could mean MIDI notes or events triggered in real
        time. linenr begins the final stage of the envelope only when
        that event is turned off (released). The penultimate value is
        held until this release is received.

        **[adsr](https://csound.com/docs/manual/adsr.html)**
        calculates the classic attack-decay-sustain-release envelope.
        The result is to be multiplied with the audio signal to get the
        enveloped signal.

        [**madsr**](https://csound.com/docs/manual/madsr.html) does
        the same for notes triggered in real time (functioning in a
        similar way to linenr explained above).

        Other standard envelope generators can be found in the [Envelope
        Generators
        overview](https://csound.com/docs/manual/SiggenEnvelope.html)
        of the Canonical Csound Manual.

    -   #### Envelopes By Linear And Exponential Generators 

        **[linseg](https://csound.com/docs/manual/linseg.html)**
        creates one or more segments of lines between specified points.

        **[expseg](https://csound.com/docs/manual/expseg.html)**
        does the same but with exponential segments. Note that zero
        values or crossing the zero axis are illegal.

        **[transeg](https://csound.com/docs/manual/transeg.html)**
        is particularly flexible as you can specify the shape of each
        segment individually (continuously from convex to linear to
        concave).

        All of these opcodes have \'r\' variants
        ([linsegr](https://csound.com/docs/manual/linsegr.html),
        [expsegr](https://csound.com/docs/manual/expsegr.html),
        [transegr](http://en.flossmanuals.net/bin/view/Csound/transegr))
        for MIDI or other real time triggered events. (\'r\' stands for
        \'release\'.)\

        More opcodes for generating envelopes can be found in
        [this](https://csound.com/docs/manual/SiggenLineexp.html)
        overview.

    -   #### Envelopes By Function Tables

        Any function table (or part of it) can be used as envelope. Once
        a function table has been created using
        [ftgen](https://csound.com/docs/manual/ftgen.html) or a [GEN
        Routine](https://csound.com/docs/manual/ScoreGenRef.html) it
        can then be read using an oscillator, and multiply the result
        with the audio signal you want to envelope. \

<!-- -->

-   ### DELAYS

    -   #### Audio Delays

        The **vdelay family** of opcodes are easy to use and implement
        all the necessary features expected when working with delays:

        [**vdelay**](https://csound.com/docs/manual/vdelay.html)
        implements a variable delay at audio rate with linear
        interpolation.

        [**vdelay3**](https://csound.com/docs/manual/vdelay.html)
        offers cubic interpolation.

        [**vdelayx**](https://csound.com/docs/manual/vdelayx.html)
        has an even higher quality interpolation (and is for this reason
        slower).
        [vdelayxs](https://csound.com/docs/manual/vdelayxs.html)
        lets you input and output two channels, and
        [vdelayxq](https://csound.com/docs/manual/vdelayxq.html)
        four.

        [**vdelayw**](https://csound.com/docs/manual/vdelayw.html)
        changes the position of the write tap in the delay line instead
        of the read tap.
        [vdelayws](https://csound.com/docs/manual/vdelayws.html) is
        for stereo, and
        [vdelaywq](https://csound.com/docs/manual/vdelaywq.html) for
        quadro.

        The **delayr/delayw** opcodes establishes a delay line in a more
        complicated way. The advantage is that you can have as many taps
        in one delay line as you need.

        [**delayr**](https://csound.com/docs/manual/delayr.html)
        establishes a delay line and reads from the end of it.

        [**delayw**](https://csound.com/docs/manual/delayw.html)
        writes an audio signal to the delay line.

        [**deltap**](https://csound.com/docs/manual/deltap.html),
        [**deltapi**](https://csound.com/docs/manual/deltapi.html),
        [**deltap3**](https://csound.com/docs/manual/deltap3.html),
        [**deltapx**](https://csound.com/docs/manual/deltapx.html)
        and
        [**deltapxw**](https://csound.com/docs/manual/deltapxw.html)
        function in a similar manner to the relevant opcodes of the
        vdelay family (see above) bearing the same suffixes.

        [**deltapn**](https://csound.com/docs/manual/deltapn.html)
        offers a tap delay measured in samples, not seconds. This might
        be more useful in the design of filters\

    -   #### Control Delays

        [](https://csound.com/docs/manual/delayk.html)[**delk**](https://csound.com/docs/manual/delayk.html)
        and
        [**vdel\_k**](https://csound.com/docs/manual/delayk.html)
        let you delay any k-signal by some time interval (useful, for
        instance, as a kind of \'wait\' function).

<!-- -->

-   ### FILTERS

    Csound boasts an extensive range of filters and they can all be
    perused on the Csound Manual pages for [Standard
    Filters](https://csound.com/docs/manual/SigmodStandard.html) and
    [Specialized
    Filters](https://csound.com/docs/manual/SigmodSpeciali.html).
    Here, some of the most frequently used filters are mentioned, and
    some tips are given. Note that filters usually change the signal
    level, so you may also find the
    [balance](https://csound.com/docs/manual/balance.html) opcode
    useful.

    -   #### Low Pass Filters

        [](https://csound.com/docs/manual/tone.html)

        [**tone**](https://csound.com/docs/manual/tone.html) is a
        first order recursive low pass filter.
        [tonex](https://csound.com/docs/manual/tonex.html)
        implements a series of tone filters.\

        [**butlp**](https://csound.com/docs/manual/butterlp.html) is
        a second order low pass Butterworth filter.

        [**clfilt**](https://csound.com/docs/manual/clfilt.html)
        lets you choose between different filter types and different
        numbers of poles in the design.

    <!-- -->

    -   #### High Pass Filters

        [](https://csound.com/docs/manual/atone.html)

        [**atone**](https://csound.com/docs/manual/atone.html) is a
        first order recursive high pass filter.
        [atonex](https://csound.com/docs/manual/atonex.html)
        implements a series of atone filters.\

        [**buthp**](https://csound.com/docs/manual/butterhp.html) is
        a second order high pass Butterworth filter.

        [**clfilt**](https://csound.com/docs/manual/clfilt.html)
        lets you choose between different filter types and different
        numbers of poles in the design.

    <!-- -->

    -   #### Band Pass And Resonant Filters

        [](https://csound.com/docs/manual/reson.html)

        [**reson**](https://csound.com/docs/manual/reson.html) is a
        second order resonant filter.
        [resonx](https://csound.com/docs/manual/resonx.html)
        implements a series of reson filters, while
        [resony](https://csound.com/docs/manual/resony.html)
        emulates a bank of second order bandpass filters in parallel.
        [resonr](https://csound.com/docs/manual/resonr.html) and
        [resonz](https://csound.com/docs/manual/resonz.html) are
        variants of reson with variable frequency response.\

        [**butbp**](https://csound.com/docs/manual/butterbp.html) is
        a second order band-pass Butterworth filter.

    <!-- -->

    -   #### Band Reject Filters

        [](https://csound.com/docs/manual/areson.html)

        [**areson**](https://csound.com/docs/manual/areson.html) is
        the complement of the reson filter.  

        [**butbr**](https://csound.com/docs/manual/butterbp.html) is
        a band-reject butterworth filter.

    -   #### Filters For Smoothing Control Signals

        [](https://csound.com/docs/manual/port.html)[**port**](https://csound.com/docs/manual/port.html)
        and [**portk**](https://csound.com/docs/manual/portk.html)
        are very frequently used to smooth control signals which are
        received by MIDI or widgets.

<!-- -->

-   ### REVERB

    Note that you can easily work in Csound with convolution reverbs
    based on impulse response files, for instance with
    [pconvolve](https://csound.com/docs/manual/pconvolve.html). 

    [**freeverb**](https://csound.com/docs/manual/freeverb.html) is
    the implementation of Jezar\'s well-known free (stereo) reverb.

    [**reverbsc**](https://csound.com/docs/manual/reverbsc.html) is
    a stereo FDN reverb, based on work of Sean Costello.

    [**reverb**](https://csound.com/docs/manual/reverb.html) and
    [**nreverb**](https://csound.com/docs/manual/nreverb.html) are
    the traditional Csound reverb units.

    [**babo**](https://csound.com/docs/manual/babo.html) is a
    physical model reverberator (\"ball within the box\").

<!-- -->

-   ### SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS

    -   #### Amplitude Measurement And Amplitude Envelope Following

        [**rms**](https://csound.com/docs/manual/rms.html)
        determines the root-mean-square amplitude of an audio signal.

        **[balance](https://csound.com/docs/manual/balance.html)**
        adjusts the amplitudes of an audio signal according to the rms
        amplitudes of another audio signal.\

        [**follow**](https://csound.com/docs/manual/follow.html) /
        [**follow2**](https://csound.com/docs/manual/follow2.html)
        are envelope followers which report the average amplitude in a
        certain time span (follow) or according to an attack/decay rate
        (follow2).\

        [**peak**](https://csound.com/docs/manual/peak.html) reports
        the highest absolute amplitude value received.\

        [**max\_k**](https://csound.com/docs/manual/max_k.html)
        outputs the local maximum or minimum value of an incoming audio
        signal, checked in a certain time interval.

    <!-- -->

    -   #### Pitch Estimation

        [](https://csound.com/docs/manual/ptrack.html)

        [**ptrack**](https://csound.com/docs/manual/ptrack.html),
        [**pitch**](https://csound.com/docs/manual/pitch.html) and
        [**pitchamdf**](https://csound.com/docs/manual/pitchamdf.html)
        track the pitch of an incoming audio signal, using different
        methods.\

        [**pvscent**](https://csound.com/docs/manual/pvscent.html)
        calculates the spectral centroid for FFT streaming signals (see
        below under \"FFT And Spectral Processing\")

    <!-- -->

    -   #### Tempo Estimation

        [](https://csound.com/docs/manual/tempest.html)[**tempest**](https://csound.com/docs/manual/tempest.html)
        estimates the tempo of beat patterns in a control signal.  

    -   #### Dynamic Processing

        [](https://csound.com/docs/manual/compress.html)

        [**compress**](https://csound.com/docs/manual/compress.html)
        compresses, limits, expands, ducks or gates an audio signal.\

        [**dam**](https://csound.com/docs/manual/dam.html) is a
        dynamic compressor/expander.\

        [**clip**](https://csound.com/docs/manual/clip.html) clips
        an a-rate signal to a predefined limit, in a "soft" manner.

    -   #### Sample Level Operations

        [](https://csound.com/docs/manual/limit.html)

        [**limit**](https://csound.com/docs/manual/limit.html) sets
        the lower and upper limits of an incoming value (all rates).\

        [**samphold**](https://csound.com/docs/manual/samphold.html)
        performs a sample-and-hold operation on its a- or k-input.\

        [**vaget**](https://csound.com/docs/manual/vaget.html) /
        [**vaset**](https://csound.com/docs/manual/vaset.html) allow
        getting and setting certain samples of an audio vector at
        k-rate.

<!-- -->

-   ###  SPATIALIZATION

    -   #### Panning

        [](https://csound.com/docs/manual/pan2.html)

        [**pan2**](https://csound.com/docs/manual/pan2.html)
        distributes a mono audio signal across two channels according to
        a variety of panning laws.\

        [**pan**](https://csound.com/docs/manual/pan.html)
        distributes a mono audio signal amongst four channels.

    <!-- -->

    -   #### VBAP

        [](https://csound.com/docs/manual/vpaplsinit.html)

        [**vbaplsinit**](https://csound.com/docs/manual/vpaplsinit.html)
        configures VBAP output according to loudspeaker parameters for a
        2- or 3-dimensional space.\

        [**vbap4**](https://csound.com/docs/manual/vpap4.html) /
        [**vbap8**](https://csound.com/docs/manual/vbap8.html) /
        [**vbap16**](https://csound.com/docs/manual/vbap16.html)
        distributes an audio signal among up to 16 channels, with k-rate
        control over azimut, elevation and spread.

    -   #### Ambisonics

        [](https://csound.com/docs/manual/bformenc1.html)

        [**bformenc1**](https://csound.com/docs/manual/bformenc1.html)
        encodes an audio signal to the Ambisonics B format.\

        [**bformdec1**](https://csound.com/docs/manual/bformdec1.html)
        decodes Ambisonics B format signals to loudspeaker signals in
        different possible configurations.

    -   #### Binaural / HRTF

        [](https://csound.com/docs/manual/hrtfstat.html)[**hrtfstat**](https://csound.com/docs/manual/hrtfstat.html),
        [**hrtfmove**](https://csound.com/docs/manual/hrtfmove.html)
        and
        [**hrtfmove2**](https://csound.com/docs/manual/hrtfmove2.html)
        are opcodes for creating 3d binaural audio for headphones.
        [hrtfer](https://csound.com/docs/manual/hrtfer.html) is an
        older implementation. All of these opcodes require data files
        containing information about the sound shadowing qualities of
        the human head and ears.

 

ADVANCED SIGNAL PROCESSING
--------------------------

 

-   ### MODULATION AND DISTORTION

    -   #### Frequency Modulation

        [**foscil**](https://csound.com/docs/manual/foscil.html) and
        [**foscili**](https://csound.com/docs/manual/foscili.html)
        implement composite units for FM in the Chowning setup.\

        [**crossfm**](https://csound.com/docs/manual/crossfm.html),
        [**crossfmi**](https://csound.com/docs/manual/crossfm.html),
        [**crosspm**](https://csound.com/docs/manual/crossfm.html),
        [**crosspmi**](https://csound.com/docs/manual/crossfm.html),
        [**crossfmpm**](https://csound.com/docs/manual/crossfm.html)
        and
        [**crossfmpmi**](https://csound.com/docs/manual/crossfm.html)
        are different units for cross-frequency and cross-phase
        modulation.

    -   #### Distortion And Wave Shaping

        [](https://csound.com/docs/manual/distort.html)

        [**distort**](https://csound.com/docs/manual/distort.html)
        and
        [**distort1**](https://csound.com/docs/manual/distort1.html)
        perform waveshaping using a function table (distort) or by
        modified hyperbolic tangent distortion (distort1).\

        [**powershape**](https://csound.com/docs/manual/powershape.html)
        waveshapes a signal by raising it to a variable exponent.

        [**polynomial**](https://csound.com/docs/manual/polynomial.html)
        efficiently evaluates a polynomial of arbitrary order.

        [**chebyshevpoly**](https://csound.com/docs/manual/chebyshevpoly.html)
        efficiently evaluates the sum of Chebyshev polynomials of
        arbitrary order.\

        [GEN03](https://csound.com/docs/manual/GEN03.html),
        [GEN13](https://csound.com/docs/manual/GEN13.html),
        [GEN14](https://csound.com/docs/manual/GEN14.html) and
        [GEN15](https://csound.com/docs/manual/GEN15.html) are also
        used for waveshaping.

    -   #### Flanging, Phasing, Phase Shaping

        [](https://csound.com/docs/manual/flanger.html)

        [**flanger**](https://csound.com/docs/manual/flanger.html)
        implements a user controllable flanger.

        [**harmon**](https://csound.com/docs/manual/harmon.html)
        analyzes an audio input and generates harmonizing voices in
        synchrony.\

        [**phaser1**](https://csound.com/docs/manual/phaser1.html)
        and
        [**phaser2**](https://csound.com/docs/manual/phaser2.html)
        implement first- or second-order allpass filters arranged in a
        series.\

        [**pdclip**](https://csound.com/docs/manual/pdclip.html),
        [**pdhalf**](https://csound.com/docs/manual/pdhalf.html) and
        [**pdhalfy**](https://csound.com/docs/manual/pdhalfy.html)
        are useful for phase distortion synthesis.

    -   #### Doppler Shift

        [](https://csound.com/docs/manual/doppler.html)[**doppler**](https://csound.com/docs/manual/doppler.html)
        lets you calculate the doppler shift depending on the position
        of the sound source and the microphone.

<!-- -->

-   ### GRANULAR SYNTHESIS

    [](https://csound.com/docs/manual/partikkel.html)

    [**partikkel**](https://csound.com/docs/manual/partikkel.html)
    is the most flexible opcode for granular synthesis. You should be
    able to do everything you like in this field. The only drawback is
    the large number of input arguments, so you may want to use other
    opcodes for certain purposes.

    You can find a list of other relevant opcodes
    [here](https://csound.com/docs/manual/SiggenGranular.html). 

    [**sndwarp**](https://csound.com/docs/manual/sndwarp.html)
    focusses granular synthesis on time stretching and/or pitch
    modifications. Compare
    [waveset](https://csound.com/docs/manual/waveset.html) and the
    pvs-opcodes
    [pvsfread](https://csound.com/docs/manual/pvsfread.html),
    [pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html),
    [pvscale](https://csound.com/docs/manual/pvscale.html),
    [pvshift](https://csound.com/docs/manual/pvshift.html) for other
    implementations of time and/or pitch modifications.

<!-- -->

-   ### CONVOLUTION

    [](https://csound.com/docs/manual/pconvolve.html)

    [**pconvolve**](https://csound.com/docs/manual/pconvolve.html)
    performs convolution based on a uniformly partitioned overlap-save
    algorithm.\

    [**ftconv**](https://csound.com/docs/manual/ftconv.html) is
    similar to pconvolve, but you can also use parts of the impulse
    response file, instead of reading the whole file. It also permits
    the use of multichannel impulse files (up to 8-channels) to create
    multichannel outputs.\

    [**dconv**](https://csound.com/docs/manual/dconv.html) performs
    direct convolution. 

<!-- -->

-   ### FFT AND SPECTRAL PROCESSING

    -   #### Realtime Analysis And Resynthesis

        [](https://csound.com/docs/manual/pvsanal.html)

        [**pvsanal**](https://csound.com/docs/manual/pvsanal.html)
        performs a Fast Fourier Transformation of an audio stream
        (a-signal) and stores the result in an f-variable.

        [**pvstanal**](https://csound.com/docs/manual/pvstanal.html)
        creates an f-signal directly from a sound file which is stored
        in a function table (usually via GEN01). \

        [**pvsynth**](https://csound.com/docs/manual/pvsynth.html)
        performs an Inverse FFT (takes a f-signal and returns an
        audio-signal).

        [**pvsadsyn**](https://csound.com/docs/manual/pvsadsynth.html)
        is similar to pvsynth, but resynthesizes with a bank of
        oscillators, instead of direct IFFT.

    -   #### Writing FFT Data To a File and Reading From it

        [](https://csound.com/docs/manual/pvsfwrite.html)

        [**pvsfwrite**](https://csound.com/docs/manual/pvsfwrite.html)
        writes an f-signal (= the FFT data) from inside Csound to a
        file. This file has the PVOCEX format and uses the file
        extension .pvx.

        [pvanal](https://csound.com/docs/manual/pvanal.html)
        actually does the same as Csound
        [Utility](https://csound.com/docs/manual/UtilityTop.html) (a
        seperate program which can be called in QuteCsound or via the
        Terminal). In this case, the input is an audio file.

        [**pvsfread**](https://csound.com/docs/manual/pvsfread.html)
        reads the FFT data from an existing .pvx file. This file can be
        generated by the Csound Utility pvanal. Reading of the file is
        carried out using a time pointer.

        [**pvsdiskin**](https://csound.com/docs/manual/pvsdiskin.html)
        is similar to pvsfread, but reading is done by a speed argument.

    -   #### Writing FFT Data To a Buffer and Reading From it 

        [](https://csound.com/docs/manual/pvsbuffer.html)

        [**pvsbuffer**](https://csound.com/docs/manual/pvsbuffer.html)
        writes an f-signal into a circular buffer that it also creates.

        [**pvsbufread**](https://csound.com/docs/manual/pvsbufread.html)
        reads an f-signal from a buffer which was created by pvsbuffer.

        [**pvsftw**](https://csound.com/docs/manual/pvsftw.html)
        writes amplitude and/or frequency data from a f-signal to a
        function table.

        [**pvsftr**](https://csound.com/docs/manual/pvsftr.html)
        transforms amplitude and/or frequency data from a function table
        to a f-signal.

    -   #### FFT Info 

        [](https://csound.com/docs/manual/pvsinfo.html)

        [**pvsinfo**](https://csound.com/docs/manual/pvsinfo.html)
        gets information, either from a realtime f-signal or from a .pvx
        file.

        [**pvsbin**](https://csound.com/docs/manual/pvsbin.html)
        gets the amplitude and frequency values from a single bin of an
        f-signal.

        [**pvscent**](https://csound.com/docs/manual/pvscent.html)
        calculates the spectral centroid of a signal.\

    -   #### Manipulating FFT Signals 

        [](https://csound.com/docs/manual/pvscale.html)

        [**pvscale**](https://csound.com/docs/manual/pvscale.html)
        transposes the frequency components of a f-stream by simple
        multiplication.

        [**pvshift**](https://csound.com/docs/manual/pvshift.html)
        changes the frequency components of a f-stream by adding a shift
        value, starting at a certain bin.

        [**pvsbandp**](https://csound.com/docs/manual/pvsbandp.html)
        and
        [**pvsbandr**](https://csound.com/docs/manual/pvsbandr.html)
        applies a band pass and band reject filter to the frequency
        components of a f-signal.

        [**pvsmix**](https://csound.com/docs/manual/pvsmix.html),
        [**pvscross**](https://csound.com/docs/manual/pvscross.html),
        [**pvsfilter**](https://csound.com/docs/manual/pvsfilter.html),
        [**pvsvoc**](https://csound.com/docs/manual/pvsvoc.html) and
        [**pvsmorph**](http://en.flossmanuals.net/bin/view/Csound/pvsmorph)
        perform different methods of cross synthesis between two
        f-signals.

        [**pvsfreeze**](https://csound.com/docs/manual/pvsfreeze.html)
        freezes the amplitude and/or frequency of an f-signal according
        to a k-rate trigger.

        [**pvsmaska**](https://csound.com/docs/manual/pvsmaska.html),
        [**pvsblur**](https://csound.com/docs/manual/pvsblur.html),
        [**pvstencil**](https://csound.com/docs/manual/pvstencil.html),
        [**pvsarp**](https://csound.com/docs/manual/pvsarp.html),
        [**pvsmooth**](https://csound.com/docs/manual/pvsmooth.html)
        perform a variety of other manipulations on a stream of FFT
        data.

<!-- -->

-   ### PHYSICAL MODELS AND FM INSTRUMENTS

    -   #### Waveguide Physical Modelling

        see
        [here](https://csound.com/docs/manual/SiggenWavguide.html) 
        and
        [here](https://csound.com/docs/manual/SigmodWavguide.html) \

    -   #### FM Instrument Models

        see
        [here](https://csound.com/docs/manual/SiggenFmsynth.html)



DATA
----

-   ### BUFFER / FUNCTION TABLES

    See the chapter about [function
    tables](http://en.flossmanuals.net/bin/view/Csound/FUNCTIONTABLES)
    for more detailed information. \

    -   #### Creating Function Tables (Buffers)

        [**ftgen**](https://csound.com/docs/manual/ftgen.html) can
        generates function tables from within the orchestra. The
        function table will exist until the end of the current Csound
        performance. Different [GEN
        Routines](https://csound.com/docs/manual/ScoreGenRef.html)
        are used to fill a function table with different kinds of data.
        This could be waveforms, sound files, envelopes, window
        functions and so on.

    -   #### Writing To Tables

        **[tableiw](https://csound.com/docs/manual/tableiw.html)** /
        **[tablew](https://csound.com/docs/manual/tablew.html)**:
        Write values to a function table at i-rate (tableiw), k-rate and
        a-rate (tablew). These opcodes provide many options and are
        robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tabw\_i](https://csound.com/docs/manual/tab.html)** /
        **[tabw](https://csound.com/docs/manual/tab.html)**: Write
        values to a function table at i-rate (tabw\_i), k-rate or a-rate
        (tabw). These opcodes offer fewer options than tableiw and
        tablew but will work consistently with non-power-of-two table
        sizes. They do not provide a boundary check on index values
        given to them which makes them fast but also then demands user
        responsibility in protecting against invalid index values.

    -   #### Reading From Tables 

        **[table](https://csound.com/docs/manual/table.html)** /
        **[tablei](https://csound.com/docs/manual/tablei.html)** /
        **[table3](https://csound.com/docs/manual/table3.html)**:
        Read values from a function table at any rate, either by direct
        indexing (table), or by linear interpolation (tablei) or cubic
        interpolation (table3). These opcodes provide many options and
        are robust in use as they check for user error in defining table
        reading index values. They may however experience problems with
        non-power-of-two table sizes.

        **[tab\_i](https://csound.com/docs/manual/tab.html)** /
        **[tab](https://csound.com/docs/manual/tab.html)**: Read
        values from a function table at i-rate (tab\_i), k-rate or
        a-rate (tab). They offer no interpolation and fewer options than
        the table opcodes but they will also work with non-power-of-two
        table sizes. They do not provide a boundary check which makes
        them fast but also give the user the responsibility not to read
        any value beyond the table boundaries.

    -   #### Saving Tables to Files 

        **[ftsave](https://csound.com/docs/manual/ftsave.html)** /
        **[ftsavek](https://csound.com/docs/manual/ftsavek.html)**:
        Save a function table as a file, at i-time (ftsave) or at k-rate
        (ftsavek). These files can be text files or binary files but not
        sound files. To save a table as a sound file you can use the
        user defined opcode
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122). 

    -   #### Reading Tables From Files

        **[ftload](https://csound.com/docs/manual/ftload.html)** /
        **[ftloadk](https://csound.com/docs/manual/ftloadk.html)**:
        Load a function table which has previously been saved using
        ftsave/ftsavek.

        [**GEN23**](https://csound.com/docs/manual/GEN23.html)
        transfers the contents of a text file into a function table. 

<!-- -->

-   ### SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS

    -   #### Signal Input And Output

        [**inch**](https://csound.com/docs/manual/inch.html) read
        the audio input from any channel of your audio device. Make sure
        you have the
        [nchnls](https://csound.com/docs/manual/nchnls.html) value
        in the orchestra header set properly.\

        [**outch**](https://csound.com/docs/manual/outch.html)
        writes any audio signal(s) to any output channel(s). If Csound
        is in realtime mode (by the flag \'-o dac\' or by the \'Render
        in Realtime\' mode of a frontend like QuteCsound), the output
        channels are the channels of your output device. If Csound is in
        \'Render to file\' mode (by the flag \'-o mysoundfile.wav\' or
        the the frontend\'s choice), the output channels are the
        channels of the soundfile which is being written. Make sure you
        have the
        [nchnls](https://csound.com/docs/manual/nchnls.html) value
        in the orchestra header set properly to get the number of
        channels you wish to have.

        [**out**](https://csound.com/docs/manual/out.html) and
        [**outs**](https://csound.com/docs/manual/outs.html) are
        frequently used for mono and stereo output. They always write to
        channel 1 (out) or channels 1 and 2 (outs).\

        [**monitor**](https://csound.com/docs/manual/monitor.html)
        can be used (in an instrument with the highest number) to gather
        the sum of all audio on all output channels.

    -   #### Sample Playback With Optional Looping

        [**flooper2**](https://csound.com/docs/manual/flooper2.html)
        is a function table based crossfading looper.\

        [**sndloop**](https://csound.com/docs/manual/sndloop.html)
        records input audio and plays it back in a loop with
        user-defined duration and crossfade time.\

        Note that there are additional user defined opcodes for the
        playback of samples stored in buffers / function tables.

    -   #### Soundfonts And Fluid Opcodes

        [](https://csound.com/docs/manual/fluidEngine.html)

        [**fluidEngine**](https://csound.com/docs/manual/fluidEngine.html)
        instantiates a FluidSynth engine.\

        [**fluidSetInterpMethod**](https://csound.com/docs/manual/fluidSetInterpMethod.html)
        sets an interpolation method for a channel in a FluidSynth
        engine.\

        [**fluidLoad**](https://csound.com/docs/manual/fluidLoad.html)
        loads SoundFonts.\

        [**fluidProgramSelect**](https://csound.com/docs/manual/fluidProgramSelect.html)
        assigns presets from a SoundFont to a FluidSynth engine\'s MIDI
        channel.\

        [**fluidNote**](https://csound.com/docs/manual/fluidNote.html)
        plays a note on a FluidSynth engine\'s MIDI channel.\

        [**fluidCCi**](https://csound.com/docs/manual/fluidCCi.html)
        sends a controller message at i-time to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidCCk**](https://csound.com/docs/manual/fluidCCk.html)
        sends a controller message at k-rate to a FluidSynth engine\'s
        MIDI channel.\

        [**fluidControl**](https://csound.com/docs/manual/fluidControl.html)
        plays and controls loaded Soundfonts (using \'raw\' MIDI
        messages).\

        [**fluidOut**](https://csound.com/docs/manual/fluidOut.html)
        receives audio from a single FluidSynth engine.\

        [**fluidAllOut**](https://csound.com/docs/manual/fluidAllOut.html)
        receives audio from all FluidSynth engines.

<!-- -->

-   ### FILE INPUT AND OUTPUT

    -   #### Sound File Input 

        [**soundin**](https://csound.com/docs/manual/soundin.html)
        reads from a sound file (up to 24 channels). It is important to
        ensure that the [sr](https://csound.com/docs/manual/sr.html)
        value in the orchestra header matches the sample rate of your
        sound file otherwise the sound file will play back at a
        different speed and pitch.\

        [**diskin**](https://csound.com/docs/manual/diskin2.html) is
        like soundin, but can also alter the speed of reading also
        resulting in higher or lower pitches. There is also the option
        to loop the file.\

        [**diskin2**](https://csound.com/docs/manual/diskin2.html)
        is similar to diskin, but it automatically converts the sample
        rate of the sound file if it does not match the sample rate of
        the orchestra. It also offers different interpolation methods to
        implement different levels of sound quality when sound files are
        read at altered speeds.

        [**GEN01**](https://csound.com/docs/manual/GEN01.html) loads
        a sound file into a function table (buffer).

        [**mp3in**](https://csound.com/docs/manual/mp3in.html)
        facilitates the playing of mp3 sound files.\

    -   #### Sound File Queries 

        [**filelen**](https://csound.com/docs/manual/filelen.html)
        returns the length of a sound file in seconds.

        [**filesr**](https://csound.com/docs/manual/filesr.html)
        returns the sample rate of a sound file.

        [**filenchnls**](https://csound.com/docs/manual/filenchnls.html)
        returns the number of channels of a sound file.

        [**filepeak**](https://csound.com/docs/manual/filepeak.html)
        returns the peak absolute value of a sound file, either of one
        specified channel, or from all channels. Make sure you have set
        [0dbfs](https://csound.com/docs/manual/0dbfs.html) to 1;
        otherwise you will get values relative to Csound\'s default
        0dbfs value of 32768.

        [**filebit**](https://csound.com/docs/manual/filebit.html)
        returns the bit depth of a sound file.

    -   #### Sound File Output 

        [](https://csound.com/docs/manual/fout.html)

        Keep in mind that Csound always writes output to a file if you
        have set the \'-o\' flag to the name of a sound file (or if you
        choose \'render to file\' in a front-end like QuteCound).\

        [**fout**](https://csound.com/docs/manual/fout.html) writes
        any audio signal(s) to a file, regardless of whether Csound is
        in realtime or non-realtime mode. This opcode is recommended for
        rendering a realtime performance as a sound file on disc.

    -   #### Non-Soundfile Input And Output 

        [](https://csound.com/docs/manual/readk.html)

        [**readk**](https://csound.com/docs/manual/readk.html) can
        read data from external files (for instance a text file) and
        transform them to k-rate values.\

        [**GEN23**](https://csound.com/docs/manual/GEN23.html)
        transfers a text file into a function table.

        [**dumpk**](https://csound.com/docs/manual/dumpk.html)
        writes k-rate signals to a text file.

        [**fprints**](https://csound.com/docs/manual/fprints.html) /
        [**fprintks**](https://csound.com/docs/manual/fprintks.html)
        write any formatted string to a file. If you call this opcode
        several times during one performance, the strings are appended.
        If you write to an pre-existing file, the file will be
        overwritten.\

        **[ftsave](https://csound.com/docs/manual/ftsave.html)** /
        **[ftsavek](https://csound.com/docs/manual/ftsavek.html)**:
        Save a function table as a binary or text file, in a specific
        format.

        **[ftload](https://csound.com/docs/manual/ftload.html)** /
        **[ftloadk](https://csound.com/docs/manual/ftloadk.html)**:
        Load a function table which has been written by ftsave/ftsavek.

<!-- -->

-   ### CONVERTERS OF DATA TYPES 

    -   #### i \<- k 

        [](https://csound.com/docs/manual/opi.html)[**i(k)**](https://csound.com/docs/manual/opi.html)
        returns the value of a k-variable at init-time. This can be
        useful to get the value of GUI controllers, or when using the
        reinit feature.

    -   #### k \<- a 

        [**downsamp**](https://csound.com/docs/manual/downsamp.html)
        converts an a-rate signal to a k-rate signal, with optional
        averaging.\

        [**max\_k**](https://csound.com/docs/manual/max_k.html)
        returns the maximum of an k-rate signal in a certain time span,
        with different options of calculation\

    -   #### a \<- k

        [**upsamp**](https://csound.com/docs/manual/upsamp.html)
        converts a k-rate signal to an a-rate signal by simple
        repetitions. It is the same as the statement asig=ksig.\

        [**interp**](https://csound.com/docs/manual/interp.html)
        converts a k-rate signal to an a-rate signal by interpolation.

<!-- -->

-   ### PRINTING AND STRINGS 

    -   #### Simple Printing 

        [](https://csound.com/docs/manual/print.html)

        [**print**](https://csound.com/docs/manual/print.html) is a
        simple opcode for printing i-variables. Note that the printed
        numbers are rounded to 3 decimal places.

        [**printk**](https://csound.com/docs/manual/printk.html) is
        its counterpart for k-variables. The *itime* argument specifies
        the time in seconds between printings (*itime=0* means one
        printout in each k-cycle which is usually some thousand
        printings per second).

        [**printk2**](https://csound.com/docs/manual/printk2.html)
        prints a k-variable whenever it changes.

        **[puts](https://csound.com/docs/manual/puts.html)** prints
        S-variables. The *ktrig* argument lets you print either at
        i-time or at k-rate.

    -   #### Formatted Printing 

        [](https://csound.com/docs/manual/prints.html)

        [**prints**](https://csound.com/docs/manual/prints.html)
        lets you print a format string at i-time. The format is similar
        to the C-style syntax but there is no %s format, therefore
        string variables cannot can be printed.

        [**printf\_i**](https://csound.com/docs/manual/printf.html)
        is very similar to prints. It also works at init-time. The
        advantage in comparision to prints is the ability of printing
        string variables. On the other hand,  you need a trigger and at
        least one input argument.

        [**printks**](https://csound.com/docs/manual/printks.html)
        is like prints, but takes k-variables, and like printk, you must
        specify a time between printing.

        [**printf**](https://csound.com/docs/manual/printf.html) is
        like printf\_i, but works at k-rate.

    -   #### String Variables 

        [](https://csound.com/docs/manual/sprintf.html)

        [**sprintf**](https://csound.com/docs/manual/sprintf.html)
        works like printf\_i, but stores the output in a string
        variable, instead of printing it out.

        [**sprintfk**](https://csound.com/docs/manual/sprintfk.html)
        is the same for k-rate arguments.

        [**strset**](https://csound.com/docs/manual/strset.html)
        links any string with a numeric value.

        [**strget**](https://csound.com/docs/manual/strget.html)
        transforms a strset number back to a string.

    -   #### String Manipulation And Conversion

        There are many opcodes for analysing, manipulating and
        converting strings. There is a good overview in the Canonical
        Csound Manual on
        [this](https://csound.com/docs/manual/StringsTop.html#stringmanipulate)
        and
        [that](https://csound.com/docs/manual/stringconvert.html)
        page.

###  

 

REALTIME INTERACTION
--------------------

-   ### MIDI

    -   #### Opcodes For Use In MIDI-Triggered Instruments 

        [](https://csound.com/docs/manual/massign.html)

        [**massign**](https://csound.com/docs/manual/massign.html)
        assigns specified midi channels to instrument numbers. See the
        [Triggering Instrument
        Instances](http://en.flossmanuals.net/bin/view/Csound/TRIGGERINGINSTRUMENTINSTANCES)
        chapter for more information.

        [**pgmassign**](https://csound.com/docs/manual/pgmassign.html)
        assigns midi program changes to specified instrument numbers.\

        [**notnum**](https://csound.com/docs/manual/notnum.html)
        retrieves the midi number of the key which has been pressed and
        activated this instrument instance. 

        [**cpsmidi**](https://csound.com/docs/manual/cpsmidi.html)
        converts this note number to the frequency in cycles per second
        (Hertz).

        [**veloc**](https://csound.com/docs/manual/veloc.html) and
        [**ampmidi**](https://csound.com/docs/manual/ampmidi.html)
        get the velocity of the key which has been pressed and activated
        this instrument instance.

        [**midichn**](https://csound.com/docs/manual/midichn.html)
        returns the midi channel number from which the note was
        activated.

        [**pchbend**](https://csound.com/docs/manual/pchbend.html)
        reads pitch bend information.

        [**aftouch**](https://csound.com/docs/manual/aftouch.html)
        and
        [**polyaft**](https://csound.com/docs/manual/polyaft.html)
        read the monophonic aftertouch (afttouch) and polyphonic
        aftertouch (polyaft) information.

    -   #### Opcodes For Use In All Instruments

        [](https://csound.com/docs/manual/ctrl7.html)

        [**ctrl7**](https://csound.com/docs/manual/ctrl7.html) reads
        the values of a usual (7 bit) controller and scales it.
        [ctrl14](https://csound.com/docs/manual/ctrl14.html) and
        [ctrl21](https://csound.com/docs/manual/ctrl21.html) can be
        used for high definition controllers.

        [**initc7**](https://csound.com/docs/manual/initc7.html) or
        [**ctrlinit**](https://csound.com/docs/manual/ctrlinit.html)
        set the initial value of 7 bit controllers. Use
        [initc14](https://csound.com/docs/manual/initc14.html) and
        [initc21](https://csound.com/docs/manual/initc21.html) for
        high definition devices.\

        [**midiin**](https://csound.com/docs/manual/midiin.html)
        reads all incoming midi events. 

        [**midiout**](https://csound.com/docs/manual/midiout.html)
        writes any type of midi message to the midi out port.

<!-- -->

-   ### OPEN SOUND CONTROL AND NETWORK

    -   #### Open Sound Control

        [](https://csound.com/docs/manual/OSCinit.html)

        [**OSCinit**](https://csound.com/docs/manual/OSCinit.html)
        initialises a port for later use of the OSClisten opcode.

        [**OSClisten**](https://csound.com/docs/manual/OSClisten.html)
        receives messages of the port which was initialised by OSCinit.

        [**OSCsend**](https://csound.com/docs/manual/OSCsend.html)
        sends messages to a port.

    -   #### Remote Instruments

        [](https://csound.com/docs/manual/remoteport.html)

        [**remoteport**](https://csound.com/docs/manual/remoteport.html)
        defines the port for use with the remote system.\

        [**insremot**](https://csound.com/docs/manual/insremot.html)
        will send note events from a source machine to one destination.\

        [**insglobal**](https://csound.com/docs/manual/insglobal.html)
        will send note events from a source machine to many
        destinations.\

        [**midiremot**](https://csound.com/docs/manual/midiremot.html)
        will send midi events from a source machine to one destination.\

        [**midiglobal**](https://csound.com/docs/manual/midiglobal.html)
        will broadcast the midi events to all the machines involved in
        the remote concert.

    -   #### Network Audio

        [](https://csound.com/docs/manual/socksend.html)

        [**socksend**](https://csound.com/docs/manual/socksend.html)
        sends audio data to other processes using the low-level UDP or
        TCP protocols.\

        [**sockrecv**](https://csound.com/docs/manual/sockrecv.html)
        receives audio data from other processes using the low-level UDP
        or TCP protocols.

<!-- -->

-   ### HUMAN INTERFACES

    -   #### Widgets

        The FLTK Widgets are integrated in Csound. Information and
        examples can be found
        [here](https://csound.com/docs/manual/ControlFltkIntro.html).

        QuteCsound implements a more modern and easy-to-use system for
        widgets. The communication between the widgets and Csound is
        done via
        [invalue](https://csound.com/docs/manual/invalue.html) (or
        [chnget](https://csound.com/docs/manual/chnget.html)) and
        [outvalue](https://csound.com/docs/manual/outvalue.html) (or
        [chnset](https://csound.com/docs/manual/chnset.html)).

    -   #### Keys

        [](https://csound.com/docs/manual/sensekey.html)[**sensekey**](https://csound.com/docs/manual/sensekey.html)
        reads the input of the computer keyboard.

    -   #### Mouse

        [](https://csound.com/docs/manual/xyin.html)

        [**xyin**](https://csound.com/docs/manual/xyin.html) reads
        the current mouse position. This should be used if your frontend
        does not provide any other means of reading mouse information.

    -   #### WII

        [](https://csound.com/docs/manual/wiiconnect.html)

        [**wiiconnect**](https://csound.com/docs/manual/wiiconnect.html)
        reads data from a number of external Nintendo Wiimote
        controllers.\

        [**wiidata**](https://csound.com/docs/manual/wiidata.html)
        reads data fields from a number of external Nintendo Wiimote
        controllers.\

        [**wiirange**](https://csound.com/docs/manual/wiirange.html)
        sets scaling and range limits for certain Wiimote fields.\

        [**wiisend**](https://csound.com/docs/manual/wiisend.html)
        sends data to one of a number of external Wii controllers.

    -   #### P5 Glove

        [](https://csound.com/docs/manual/p5gconnect.html)

        [**p5gconnect**](https://csound.com/docs/manual/p5gconnect.html)
        reads data from an external P5 glove controller.\

        [**p5gdata**](https://csound.com/docs/manual/p5gdata.html)
        reads data fields from an external P5 glove controller.



INSTRUMENT CONTROL
------------------

-   ### SCORE PARAMETER ACCESS

    [](https://csound.com/docs/manual/p.html)

    [**p(x)**](https://csound.com/docs/manual/p.html) gets the value
    of a specified p-field. (So, \'p(5)\' and \'p5\' both return the
    value of the fifth parameter in a certain score line, but in the
    former case you can insert a variable to specify the p-field.\

    [**pindex**](https://csound.com/docs/manual/pindex.html) does
    actually the same, but as an opcode instead of an expression.\

    [**pset**](https://csound.com/docs/manual/pset.html) sets
    p-field values in case there is no value from a scoreline.\

    [**passign**](https://csound.com/docs/manual/passign.html)
    assigns a range of p-fields to i-variables.\

    [**pcount**](https://csound.com/docs/manual/pcount.html) returns
    the number of p-fields belonging to a note event.

-   ### TIME AND TEMPO

    -   #### Time Reading

        [](https://csound.com/docs/manual/times.html)

        [**times**](https://csound.com/docs/manual/times.html) /
        [**timek**](https://csound.com/docs/manual/timek.html)
        return the time in seconds (times) or in control cycles (timek)
        since the start of the current Csound performance.\

        [**timeinsts**](https://csound.com/docs/manual/timeinsts.html)
        /
        [**timeinstk**](https://csound.com/docs/manual/timeinstk.html)
        return the time in seconds (timeinsts) or in control cycles
        (timeinstk) since the start of the instrument in which they are
        defined.\

        [**date**](https://csound.com/docs/manual/date.html) /
        [**dates**](https://csound.com/docs/manual/dates.html)
        return the number of seconds since 1 January 1970, using the
        operating system\'s clock, either as a number (date) or as a
        string (dates).\

        [**setscorepos**](https://csound.com/docs/manual/setscorepos.html)
        sets the playback position of the current score performance to a
        given position.

    -   #### Tempo Reading

        [](https://csound.com/docs/manual/tempo.html)

        [**tempo**](https://csound.com/docs/manual/tempo.html)
        allows the performance speed of Csound scored events to be
        controlled from within an orchestra.\

        [**miditempo**](https://csound.com/docs/manual/miditempo.html)
        returns the current tempo at k-rate, of either the midi file (if
        available) or the score.

        [**tempoval**](https://csound.com/docs/manual/tempoval.html)
        reads the current value of the tempo.

    -   #### Duration Modifications

        [](https://csound.com/docs/manual/ihold.html)

        [**ihold**](https://csound.com/docs/manual/ihold.html)
        forces a finite-duration note to become a \'held\' note.\

        [**xtratim**](https://csound.com/docs/manual/xtratim.html)
        extend the duration of the current instrument instance by a
        specified time duration.

    -   #### Time Signal Generators

        [](https://csound.com/docs/manual/metro.html)

        [**metro**](https://csound.com/docs/manual/metro.html)
        outputs a metronome-like control signal (1 value impulses
        separated by zeroes). Rate of impulses can be specified as
        impulses per second

        [**mpulse**](https://csound.com/docs/manual/mpulse.html)
        generates an impulse for one sample of user definable amplitude,
        followed by a user-definable time gap.

<!-- -->

-   ### CONDITIONS AND LOOPS

    [](https://csound.com/docs/manual/changed.html)

    [**changed**](https://csound.com/docs/manual/changed.html)
    reports whether any of its k-rate variable inputs has changed.

    [**trigger**](https://csound.com/docs/manual/trigger.html)
    informs whether a k-rate signal crosses a certain threshold, either
    in an upward direction, in a downward direction or both.\

    [**if**](https://csound.com/docs/manual/if.html) branches
    conditionally at initialisation or during performance time.

    [**loop\_lt**](https://csound.com/docs/manual/loop_lt.html),
    [**loop\_le**](https://csound.com/docs/manual/loop_le.html),
    [**loop\_gt**](https://csound.com/docs/manual/loop_gt.html) and
    [**loop\_ge**](https://csound.com/docs/manual/loop_ge.html)
    perform loops either at i-time or at k-rate.

<!-- -->

-   ### PROGRAM FLOW

    [**init**](https://csound.com/docs/manual/init.html) initializes
    a k- or a-variable (assigns a value to a k- or a-variable which is
    valid at i-time).\

    [**igoto**](https://csound.com/docs/manual/igoto.html) jumps to
    a label at i-time.\

    [**kgoto**](https://csound.com/docs/manual/kgoto.html) jumps to
    a label at k-rate.\

    [**timout**](https://csound.com/docs/manual/timout.html) jumps
    to a label for a given time. Can be used in conjunction with
    [reinit](https://csound.com/docs/manual/reinit.html) to perform
    time loops (see the chapter about Control Structures for more
    information).\

    [**reinit**](https://csound.com/docs/manual/reinit.html) /
    [**rigoto**](https://csound.com/docs/manual/rigoto.html) /
    [**rireturn**](https://csound.com/docs/manual/rireturn.html)
    forces a certain section of code to be reinitialised (i.e. i-rate
    variables will be refreshed).

<!-- -->

-   ### EVENT TRIGGERING

    **[event\_i](https://csound.com/docs/manual/event_i.html)** /
    **[event](https://csound.com/docs/manual/event.html)**: Generate
    an instrument event at i-time (event\_i) or at k-time (event). Easy
    to use, but you cannot send a string to the subinstrument.

    **[scoreline\_i](https://csound.com/docs/manual/scoreline_i.html)**
    /
    **[scoreline](https://csound.com/docs/manual/scoreline.html)**:
    Generate an instrument at i-time (scoreline\_i) or at k-time
    (scoreline). Like event\_i/event, but you can send to more than one
    instrument but unlike event\_i/event you can send strings. On the
    other hand, you must usually pre-format your scoreline-string using
    sprintf.

    [**schedkwhen**](https://csound.com/docs/manual/schedkwhen.html)
    triggers an instrument event at k-time if a certain condition is
    given.\

    [**seqtime**](https://csound.com/docs/manual/seqtime.html) /
    [**seqtime2**](https://csound.com/docs/manual/seqtime2.html) can
    be used to generate a trigger signal according to time values in a
    function table.

    [**timedseq**](https://csound.com/docs/manual/timedseq.html) is
    an event-sequencer in which time can be controlled by a
    time-pointer. Sequence data is stored in a function table or text
    file.

<!-- -->

-   ### INSTRUMENT SUPERVISION

    -   #### Instances And Allocation

        [**active**](https://csound.com/docs/manual/active.html)
        returns the number of active instances of an instrument.\

        [**maxalloc**](https://csound.com/docs/manual/maxalloc.html)
        limits the number of allocations (instances) of an instrument.\

        [**prealloc**](https://csound.com/docs/manual/prealloc.html)
        creates space for instruments but does not run them.

    <!-- -->

    -   #### Turning On And Off

        [**turnon**](https://csound.com/docs/manual/turnon.html)
        activates an instrument for an indefinite time.\

        [**turnoff**](https://csound.com/docs/manual/turnoff.html) /
        [**turnoff2**](https://csound.com/docs/manual/turnoff2.html)
        enables an instrument to turn itself, or another instrument,
        off.\

        [**mute**](https://csound.com/docs/manual/mute.html)
        mutes/unmutes new instances of a given instrument.\

        [**remove**](https://csound.com/docs/manual/remove.html)
        removes the definition of an instrument as long as it is not in
        use.\

        [**exitnow**](https://csound.com/docs/manual/exitnow.html)
        causes Csound to exit as fast as possible and with no cleaning
        up.

    -   #### Named Instruments

        [](https://csound.com/docs/manual/nstrnum.html)[**nstrnum**](https://csound.com/docs/manual/nstrnum.html)
        returns the number of a named instrument.

<!-- -->

-   ### SIGNAL EXCHANGE AND MIXING

    -   #### chn opcodes

        [**chn\_k**](https://csound.com/docs/manual/chn.html),
        [**chn\_a**](https://csound.com/docs/manual/chn.html), and
        [**chn\_S**](https://csound.com/docs/manual/chn.html)
        declare a control, audio, or string channel. Note that this can
        be done implicitly in most cases by chnset/chnget.

        [**chnset**](https://csound.com/docs/manual/chnset.html)
        writes a value (i, k, S or a) to a software channel (which is
        identified by a string as its name).

        [**chnget**](https://csound.com/docs/manual/chnget.html)
        gets the value of a named software channel.

        [**chnmix**](https://csound.com/docs/manual/chnmix.html)
        writes audio data to an named audio channel, mixing to the
        previous output.\

        [**chnclear**](https://csound.com/docs/manual/chnclear.html)
        clears an audio channel of the named software bus to zero.

    -   #### zak  [](https://csound.com/docs/manual/chn.html)

        **[zakinit](https://csound.com/docs/manual/zakinit.html)**
        initialised zak space for the storage of zak variables.

        **[zaw](https://csound.com/docs/manual/zaw.html)**,
        [**zkw**](https://csound.com/docs/manual/zkw.html) and
        [**ziw**](https://csound.com/docs/manual/ziw.html) write to
        (or overwrite) a-rate, k-rate or i-rate zak variables
        respectively.

        **[zawm](https://csound.com/docs/manual/zawm.html)**,
        **[zkwm](https://csound.com/docs/manual/zkwm.html)** and
        [**ziwm**](https://csound.com/docs/manual/ziw.html) mix
        (accumulate) a-rate, k-rate or i-rate zak variables
        respectively.\

        [**zar**](https://csound.com/docs/manual/zar.html),
        [**zkr**](instrument-control/instrument-control/zkr) and
        [**zir**](https://csound.com/docs/manual/zir.html) read from
        a-rate, k-rate or i-rate zak variables respectively.\

        [**zacl**](https://csound.com/docs/manual/zacl.html) and
        [**zkcl**](https://csound.com/docs/manual/zkcl.html) clears
        a range of a-rate or k-rate zak variables respectively.\




MATH, PYTHON/ SYSTEM, PLUGINS
-----------------------------

### MATHS

-   ### MATHEMATICAL CALCULATIONS

    -   #### Arithmetic Operations 

        [**+**](https://csound.com/docs/manual/adds.html),
        [**-**](https://csound.com/docs/manual/subtracts.html),
        [**\***](https://csound.com/docs/manual/multiplies.html),
        [**/**](https://csound.com/docs/manual/divides.html),
        [**\^**](https://csound.com/docs/manual/raises.html),
        [**%**](https://csound.com/docs/manual/modulus.html) are the
        usual signs for addition, subtraction, multiplication, division,
        raising to a power and modulo. The precedence is like that used
        in common mathematics (\* binds stronger than + etc.), but you
        can change this behaviour with parentheses: 2\^(1/12) returns 2
        raised by 1/12 (= the 12st root of 2), while 2\^1/12 returns 2
        raised by 1, and the result divided by 12.

        **[exp(x)](https://csound.com/docs/manual/exp.html)**,
        [**log(x)**](https://csound.com/docs/manual/log.html),
        [**log10(x)**](https://csound.com/docs/manual/log10.html)
        and [**sqrt(x)**](https://csound.com/docs/manual/sqrt.html)
        return e raised to the xth power, the natural log of x, the base
        10 log of x, and the square root of x.\

        [**abs(x)**](https://csound.com/docs/manual/abs.html)
        returns the absolute value of a number.\

        [**int(x)**](https://csound.com/docs/manual/int.html) and
        [**frac(x)**](https://csound.com/docs/manual/frac.html)
        return the integer respective the fractional part of a number.\

        [**round(x)**](https://csound.com/docs/manual/round.html),
        [**ceil(x)**](https://csound.com/docs/manual/ceil.html),
        [**floor(x)**](https://csound.com/docs/manual/floor.html)
        round a number to the nearest, the next higher or the next lower
        integer.

    -   #### Trigonometric Functions

        [**sin(x)**](https://csound.com/docs/manual/sin.html),
        [**cos(x)**](https://csound.com/docs/manual/cos.html),
        [**tan(x)**](https://csound.com/docs/manual/tan.html)
        perform a sine, cosine or tangent function.\

        [**sinh(x)**](https://csound.com/docs/manual/sinh.html),
        [**cosh(x)**](https://csound.com/docs/manual/cosh.html),
        [**tanh(x)**](https://csound.com/docs/manual/tanh.html)
        perform a hyperbolic sine, cosine or tangent function.\

        [**sininv(x)**](https://csound.com/docs/manual/sininv.html),
        [**cosinv(x)**](https://csound.com/docs/manual/cosinv.html),
        [**taninv(x)**](https://csound.com/docs/manual/taninv.html)
        and
        [**taninv2(x)**](https://csound.com/docs/manual/taninv2.html)
        perform the arcsine, arccosine and arctangent functions.

    -   #### Logic Operators

        [](https://csound.com/docs/manual/opand.html)[**&&**](https://csound.com/docs/manual/opand.html)
        and [**\|\|**](https://csound.com/docs/manual/opor.html) 
        are the symbols for a logical \"and\" and \"or\". Note that you
        can use here parentheses for defining the precedence, too, for
        instance: if (ival1 \< 10 && ival2 \> 5) \|\| (ival1 \> 20 &&
        ival2 \< 0) then \...

        [**!**](https://csound.com/docs/manual/opor.html) is the
        symbol for logical \"not\". For example: if (kx != 2) then \...
        would serve a conditional branch if variable kx was not equal to
        \'2\'.\

<!-- -->

-   ### CONVERTERS

    -   #### MIDI To Frequency 

        [](https://csound.com/docs/manual/cpsmidi.html)

        [**cpsmidi**](https://csound.com/docs/manual/cpsmidi.html)
        converts a MIDI note number from a triggered instrument to the
        frequency in Hertz.

        [**cpsmidinn**](https://csound.com/docs/manual/cpsmidinn.html)
        does the same for any input values (i- or k-rate).

        Other opcodes convert to Csound\'s pitch- or octave-class
        system. They can be found
        [here](https://csound.com/docs/manual/PitchTop.html#PitchFuncs).

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

        [](https://csound.com/docs/manual/cent.html)[**cent**](https://csound.com/docs/manual/cent.html)
        converts a cent value to a multiplier. For instance,
        *cent(1200)* returns 2, *cent(100)* returns 1.059403. If you
        multiply this with the frequency you reference to, you get
        frequency of the note which corresponds to the cent interval.

    -   #### Amplitude Converters

        [](https://csound.com/docs/manual/ampdb.html)

        [**ampdb**](https://csound.com/docs/manual/ampdb.html)
        returns the amplitude equivalent of the dB value. *ampdb(0)*
        returns 1, *ampdb(-6)* returns 0.501187, and so on.

        [**ampdbfs**](https://csound.com/docs/manual/ampdbfs.html)
        returns the amplitude equivalent of the dB value, according to
        what has been set as
        [0dbfs](https://csound.com/docs/manual/0dbfs.html) (1 is
        recommended, the default is 15bit = 32768). So ampdbfs(-6)
        returns 0.501187 for 0dbfs=1, but 16422.904297 for 0dbfs=32768.

        [**dbamp**](https://csound.com/docs/manual/dbamp.html)
        returns the decibel equivalent of the amplitude value, where an
        amplitude of 1 is the maximum. So dbamp(1) -\> 0 and dbamp(0.5)
        -\> -6.020600.

        [**dbfsamp**](https://csound.com/docs/manual/dbfsamp.html)
        returns the decibel equivalent of the amplitude value set by the
        [0dbfs](https://csound.com/docs/manual/0dbfs.html)
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

    [](https://csound.com/docs/manual/pyinit.html)

    [**pyinit**](https://csound.com/docs/manual/pyinit.html)
    initializes the Python interpreter.\

    [**pyrun**](https://csound.com/docs/manual/pyrun.html) runs a
    Python statement or block of statements.

    [**pyexec**](https://csound.com/docs/manual/pyexec.html)
    executes a script from a file at k-time, i-time or if a trigger has
    been received.

    [**pycall**](https://csound.com/docs/manual/pycall.html) invokes
    the specified Python callable at k-time or i-time.

    [**pyeval**](https://csound.com/docs/manual/pyeval.html)
    evaluates a generic Python expression and stores the result in a
    Csound k- or i-variable, with optional trigger.

    [**pyassign**](https://csound.com/docs/manual/pyassign.html)
    assigns the value of the given Csound variable to a Python variable
    possibly destroying its previous content.

<!-- -->

-   ### SYSTEM OPCODES

    [](https://csound.com/docs/manual/getcfg.html)

    [**getcfg**](https://csound.com/docs/manual/getcfg.html) returns
    various Csound configuration settings as a string at init time.

    [**system**](https://csound.com/docs/manual/system.html) /
    [**system\_i**](https://csound.com/docs/manual/system.html) call
    an external program via the system call.

### PLUGINS 

-   ### PLUGIN HOSTING

    -   #### LADSPA

        [](https://csound.com/docs/manual/dssiinit.html)

        [**dssiinit**](https://csound.com/docs/manual/dssiinit.html)
        loads a plugin.

        [**dssiactivate**](https://csound.com/docs/manual/dssiactivate.html)
        activates or deactivates a plugin if it has this facility.

        [**dssilist**](https://csound.com/docs/manual/dssilist.html)
        lists all available plugins found in the LADSPA\_PATH and
        DSSI\_PATH global variables.

        [**dssiaudio**](https://csound.com/docs/manual/dssiaudio.html)
        processes audio using a plugin.

        [**dssictls**](https://csound.com/docs/manual/dssictls.html)
        sends control information to a plugin\'s control port.

    -   #### VST

        [](https://csound.com/docs/manual/vstinit.html)

        [**vstinit**](https://csound.com/docs/manual/vstinit.html)
        loads a plugin.

        [**vstaudio**](https://csound.com/docs/manual/vstaudio.html)
        /
        [**vstaudiog**](https://csound.com/docs/manual/vstaudio.html)
        return a plugin\'s output.

        [**vstmidiout**](https://csound.com/docs/manual/vstmidiout.html)
        sends midi data to a plugin.

        [**vstparamset**](https://csound.com/docs/manual/vstparamset.html)
        /
        [**vstparamget**](https://csound.com/docs/manual/vstparamget.html)
        sends and receives automation data to and from the plugin.

        [**vstnote**](https://csound.com/docs/manual/vstnote.html)
        sends a midi note with a definite duration.

        [**vstinfo**](https://csound.com/docs/manual/vstinfo.html)
        outputs the parameter and program names for a plugin.

        [**vstbankload**](https://csound.com/docs/manual/vstbankload.html)
        loads an .fxb bank.

        [**vstprogset**](https://csound.com/docs/manual/vstprogset.html)
        sets the program in a .fxb bank.

        [**vstedit**](https://csound.com/docs/manual/vstedit.html)
        opens the GUI editor for the plugin, when available.
