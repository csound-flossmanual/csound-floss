15 A. OPCODE GUIDE
==================

If you run Csound from the command line with the option -z, you get a
list of all opcodes. The total number of all opcodes is more than 1500. There are already overviews of all of Csound's opcodes in the 
[Opcodes Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
and the 
[Opcode Quick Reference](https://csound.com/docs/manual/MiscQuickref.html) of the
[Canonical Csound Manual](https://csound.com/docs/manual/index.html).

This chapter is another attempt to provide some orientation within
Csound's wealth of opcodes. Unlike the references mentioned above, not
all opcodes are listed here, but the ones that are, are commented upon
briefly. Some opcodes appear more than once and in different sections to
reflect the different contexts in which they could be used. This guide
intends to provide insights into the opcodes listed that the other
sources do not.

BASIC SIGNAL PROCESSING
-----------------------

-   **OSCILLATORS AND PHASORS**

    -   **Standard Oscillators**

        [(oscils)](https://csound.com/docs/manual/oscils.html) 
        [poscil](https://csound.com/docs/manual/poscil.html) 
        [poscil3](https://csound.com/docs/manual/poscil3.html) 
        [oscili](https://csound.com/docs/manual/oscili.html) 
        [oscil3](https://csound.com/docs/manual/oscil3.html) 
        [more](https://csound.com/docs/manual/SiggenBasic.html) 

    -   **Dynamic Sprectrum Oscillators**

        [buzz](https://csound.com/docs/manual/buzz.html) 
        [gbuzz](https://csound.com/docs/manual/gbuzz.html) 
        [mpulse](https://csound.com/docs/manual/mpulse.html) 
        [vco](https://csound.com/docs/manual/vco.html) 
        [vco2](https://csound.com/docs/manual/vco2.html) \

    -   **Phasors**

        [phasor](https://csound.com/docs/manual/phasor.html) 
        [syncphasor](https://csound.com/docs/manual/syncphasor.html)\


-   **RANDOM AND NOISE GENERATORS**

    [(seed)](https://csound.com/docs/manual/seed.html) 
    [rand](https://csound.com/docs/manual/rand.html) 
    [randi](https://csound.com/docs/manual/randi.html) 
    [randh](https://csound.com/docs/manual/randh.html) 
    [rnd31](https://csound.com/docs/manual/rnd31.html) 
    [random](https://csound.com/docs/manual/random.html) 
    ([randomi](https://csound.com/docs/manual/randomi.html) /[randomh](https://csound.com/docs/manual/randomh.html)) 
    [pinkish](https://csound.com/docs/manual/pinkish.html) 
    [more](https://csound.com/docs/manual/SiggenNoise.html)


-   **ENVELOPES**

    -   **Simple Standard Envelopes**

        [linen](https://csound.com/docs/manual/linen.html) 
        [linenr](https://csound.com/docs/manual/linenr.html) 
        [adsr](https://csound.com/docs/manual/adsr.html) 
        [madsr](https://csound.com/docs/manual/madsr.html) 
        [more](https://csound.com/docs/manual/SiggenEnvelope.html) \

    -   **Envelopes By Linear And Exponential Generators**

        [linseg](https://csound.com/docs/manual/linseg.html) 
        [expseg](https://csound.com/docs/manual/expseg.html) 
        [transeg](https://csound.com/docs/manual/transeg.html) 
        ([linsegr](https://csound.com/docs/manual/linsegr.html) 
        [expsegr](https://csound.com/docs/manual/expsegr.html) 
        [transegr](http://en.flossmanuals.net/bin/view/Csound/transegr)) 
        [more](https://csound.com/docs/manual/SiggenLineexp.html)  

    -   **Envelopes By Function Tables**

-   **DELAYS**

    -   **Audio Delays**

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

    -   **Control Signal Delays**

        [delk](https://csound.com/docs/manual/delayk.html) 
        [vdel\_k](https://csound.com/docs/manual/delayk.html) \


-   **FILTERS**

    Compare [Standard
    Filters](https://csound.com/docs/manual/SigmodStandard.html) and
    [Specialized
    Filters](https://csound.com/docs/manual/SigmodSpeciali.html)
    overviews.\

    -   **Low Pass Filters**

        [tone](https://csound.com/docs/manual/tone.html) 
        [tonex](https://csound.com/docs/manual/tonex.html) 
        [butlp](https://csound.com/docs/manual/butterlp.html) 
        [clfilt](https://csound.com/docs/manual/clfilt.html)  

    -   **High Pass Filters**

        [atone](https://csound.com/docs/manual/atone.html) 
        [atonex](https://csound.com/docs/manual/atonex.html) 
        [buthp](https://csound.com/docs/manual/butterhp.html) 
        [clfilt](https://csound.com/docs/manual/clfilt.html)  

    -   **Band Pass And Resonant Filters**

        [reson](https://csound.com/docs/manual/reson.html) 
        [resonx](https://csound.com/docs/manual/resonx.html) 
        [resony](https://csound.com/docs/manual/resony.html) 
        [resonr](https://csound.com/docs/manual/resonr.html) 
        [resonz](https://csound.com/docs/manual/resonz.html) 
        [butbp](https://csound.com/docs/manual/butterbp.html)  

    -   **Band Reject Filters**

        [areson](https://csound.com/docs/manual/areson.html) 
        [butbr](https://csound.com/docs/manual/butterbp.html)  

    -   **Filters For Smoothing Control Signals**

        [port](https://csound.com/docs/manual/port.html) 
        [portk](https://csound.com/docs/manual/portk.html) 


-   **REVERB**

    [freeverb](https://csound.com/docs/manual/freeverb.html) 
    [reverbsc](https://csound.com/docs/manual/reverbsc.html) 
    [reverb](https://csound.com/docs/manual/reverb.html) 
    [nreverb](https://csound.com/docs/manual/nreverb.html) 
    [babo](https://csound.com/docs/manual/babo.html) 
    [pconvolve](https://csound.com/docs/manual/pconvolve.html)


-   **SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS**

    -   **Amplitude Measurement and Amplitude Envelope Following**

        [rms](https://csound.com/docs/manual/rms.html) 
        [balance](https://csound.com/docs/manual/balance.html) 
        [follow](https://csound.com/docs/manual/follow.html) 
        [follow2](https://csound.com/docs/manual/follow2.html) 
        [peak](https://csound.com/docs/manual/peak.html) 
        [max\_k](https://csound.com/docs/manual/max_k.html)

    -   **Pitch Estimation (Pitch Tracking)**

        [ptrack](https://csound.com/docs/manual/ptrack.html) 
        [pitch](https://csound.com/docs/manual/pitch.html) 
        [pitchamdf](https://csound.com/docs/manual/pitchamdf.html) 
        [pvscent](https://csound.com/docs/manual/pvscent.html)

    -   **Tempo Estimation**

        [tempest](https://csound.com/docs/manual/tempest.html)

    -   **Dynamic Processing**

        [compress](https://csound.com/docs/manual/compress.html) 
        [dam](https://csound.com/docs/manual/dam.html) 
        [clip](https://csound.com/docs/manual/clip.html)

    -   **Sample Level Operations**

        [limit](https://csound.com/docs/manual/limit.html) 
        [samphold](https://csound.com/docs/manual/samphold.html) 
        [vaget](https://csound.com/docs/manual/vaget.html) 
        [vaset](https://csound.com/docs/manual/vaset.html)


-   **SPATIALIZATION**

    -   **Panning**

        [pan2](https://csound.com/docs/manual/pan2.html) 
        [pan](https://csound.com/docs/manual/pan.html)

    -   **VBAP**

        [vbaplsinit](https://csound.com/docs/manual/vpaplsinit.html) 
        [vbap4](https://csound.com/docs/manual/vpap4.html) 
        [vbap8](https://csound.com/docs/manual/vbap8.html) 
        [vbap16](https://csound.com/docs/manual/vbap16.html)

    -   **Ambisonics**

        [bformenc1](https://csound.com/docs/manual/bformenc1.html) 
        [bformdec1](https://csound.com/docs/manual/bformdec1.html)

    -   **Binaural / HRTF**

        [hrtfstat](https://csound.com/docs/manual/hrtfstat.html) 
        [hrtfmove](https://csound.com/docs/manual/hrtfmove.html) 
        [hrtfmove2](https://csound.com/docs/manual/hrtfmove2.html) 
        [hrtfer](https://csound.com/docs/manual/hrtfer.html) \


### ADVANCED SIGNAL PROCESSING

-   **MODULATION AND DISTORTION**

    -   **Frequency Modulation**

        [foscil](https://csound.com/docs/manual/foscil.html) 
        [foscili](https://csound.com/docs/manual/foscili.html) 

        [crossfm](https://csound.com/docs/manual/crossfm.html) 
        [crossfmi](https://csound.com/docs/manual/crossfm.html) 
        [crosspm](https://csound.com/docs/manual/crossfm.html) 
        [crosspmi](https://csound.com/docs/manual/crossfm.html) 
        [crossfmpm](https://csound.com/docs/manual/crossfm.html) 
        [crossfmpmi](https://csound.com/docs/manual/crossfm.html) 

    -   **Distortion And Wave Shaping**

        [distort](https://csound.com/docs/manual/distort.html) 
        [distort1](https://csound.com/docs/manual/distort1.html) 
        [powershape](https://csound.com/docs/manual/powershape.html) 
        [polynomial](https://csound.com/docs/manual/polynomial.html) 
        [chebyshevpoly](https://csound.com/docs/manual/chebyshevpoly.html)  

    -   **Flanging, Phasing, Phase Shaping**

        [flanger](https://csound.com/docs/manual/flanger.html) 
        [harmon](https://csound.com/docs/manual/harmon.html) 
        [phaser1](https://csound.com/docs/manual/phaser1.html) 
        [phaser2](https://csound.com/docs/manual/phaser2.html) 
        [pdclip](https://csound.com/docs/manual/pdclip.html) 
        [pdhalf](https://csound.com/docs/manual/pdhalf.html) 
        [pdhalfy](https://csound.com/docs/manual/pdhalfy.html) 

    -   **Doppler Shift**

        [doppler](https://csound.com/docs/manual/doppler.html) 


-   **GRANULAR SYNTHESIS**

    [partikkel](https://csound.com/docs/manual/partikkel.html) 
    [sndwarp](https://csound.com/docs/manual/sndwarp.html) 
    [others](https://csound.com/docs/manual/SiggenGranular.html)


-   **CONVOLUTION**

    [pconvolve](https://csound.com/docs/manual/pconvolve.html) 
    [ftconv](https://csound.com/docs/manual/ftconv.html) 
    [dconv](https://csound.com/docs/manual/dconv.html)


-   **FFT AND SPECTRAL PROCESSING**

    -   **Real-time Analysis and Resynthesis**

        [pvsanal](https://csound.com/docs/manual/pvsanal.html) 
        [pvstanal](https://csound.com/docs/manual/pvstanal.html) 
        [pvsynth](https://csound.com/docs/manual/pvsynth.html) 
        [pvsadsyn](https://csound.com/docs/manual/pvsadsynth.html)

    -   **Writing FFT Data to A File and Reading From it**

        [pvsfwrite](https://csound.com/docs/manual/pvsfwrite.html) 
        [pvanal](https://csound.com/docs/manual/pvanal.html) 
        [pvsfread](https://csound.com/docs/manual/pvsfread.html) 
        [pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) 

    -   **Writing FFT Data to a Buffer and Reading From it**

        [pvsbuffer](https://csound.com/docs/manual/pvsbuffer.html) 
        [pvsbufread](https://csound.com/docs/manual/pvsbufread.html) 
        [pvsftw](https://csound.com/docs/manual/pvsftw.html) 
        [pvsftr](https://csound.com/docs/manual/pvsftr.html)  

    -   **FFT Info**

        [pvsinfo](https://csound.com/docs/manual/pvsinfo.html) 
        [pvsbin](https://csound.com/docs/manual/pvsbin.html) 
        [pvscent](https://csound.com/docs/manual/pvscent.html)  

    -   **Manipulating FFT Signals**

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
        [pvsmooth](https://csound.com/docs/manual/pvsmooth.html)


-   **PHYSICAL MODELS AND FM INSTRUMENTS**

    -   **Waveguide Physical Modelling**

        see
        [here](https://csound.com/docs/manual/SiggenWavguide.html) 
        and
        [here](https://csound.com/docs/manual/SigmodWavguide.html) \

    -   **FM Instrument Models**

        see
        [here](https://csound.com/docs/manual/SiggenFmsynth.html)   \

### DATA

-   **BUFFER / FUNCTION TABLES**

    -   **Creating Function Tables (Buffers)**

        [ftgen](https://csound.com/docs/manual/ftgen.html)  [GEN
        Routines](https://csound.com/docs/manual/ScoreGenRef.html)

    -   **Writing to Tables**

        [tableiw](https://csound.com/docs/manual/tableiw.html)  
        [tablew](https://csound.com/docs/manual/tablew.html)    
        [tabw\_i](https://csound.com/docs/manual/tab.html)  
        [tabw](https://csound.com/docs/manual/tab.html) 

    -   **Reading From Tables**

        [table](https://csound.com/docs/manual/table.html) 
        [tablei](https://csound.com/docs/manual/tablei.html)
        [table3](https://csound.com/docs/manual/table3.html)    
        [tab\_i](https://csound.com/docs/manual/tab.html)
        [tab](https://csound.com/docs/manual/tab.html) 

    -   **Saving Tables to Files**

        [ftsave](https://csound.com/docs/manual/ftsave.html)
        [ftsavek](https://csound.com/docs/manual/ftsavek.html)   
        [TableToSF](http://www.csounds.com/udo/displayOpcode.php?opcode_id=122)

    -   **Reading Tables From Files**

        [ftload](https://csound.com/docs/manual/ftload.html)
        [ftloadk](https://csound.com/docs/manual/ftloadk.html)    
        [GEN23](https://csound.com/docs/manual/GEN23.html)


-   **SIGNAL INPUT/OUTPUT, SAMPLE AND LOOP PLAYBACK, SOUNDFONTS**

    -   **Signal Input and Output**

        [inch](https://csound.com/docs/manual/inch.html)  ; 
        [outch](https://csound.com/docs/manual/outch.html) 
        [out](https://csound.com/docs/manual/out.html) 
        [outs](https://csound.com/docs/manual/outs.html)  ; 
        [monitor](https://csound.com/docs/manual/monitor.html) \

    -   **Sample Playback With Optional Looping**

        [flooper2](https://csound.com/docs/manual/flooper2.html) 
        [sndloop](https://csound.com/docs/manual/sndloop.html)

    -   **Soundfonts and Fluid Opcodes**

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


-   **FILE INPUT AND OUTPUT**

    -   **Sound File Input** 

        [soundin](https://csound.com/docs/manual/soundin.html) 
        [diskin](https://csound.com/docs/manual/diskin2.html) 
        [diskin2](https://csound.com/docs/manual/diskin2.html) 
        [mp3in](https://csound.com/docs/manual/mp3in.html) 
        [(GEN01)](https://csound.com/docs/manual/GEN01.html) \

    -   **Sound File Queries**

        [filelen](https://csound.com/docs/manual/filelen.html) 
        [filesr](https://csound.com/docs/manual/filesr.html) 
        [filenchnls](https://csound.com/docs/manual/filenchnls.html) 
        [filepeak](https://csound.com/docs/manual/filepeak.html) 
        [filebit](https://csound.com/docs/manual/filebit.html)  \

    -   **Sound File Output**

        [fout](https://csound.com/docs/manual/fout.html) \

    -   **Non-Soundfile Input And Output**

        [readk](https://csound.com/docs/manual/readk.html)  
        [GEN23](https://csound.com/docs/manual/GEN23.html)  
        [dumpk](https://csound.com/docs/manual/dumpk.html)  
        [fprints](https://csound.com/docs/manual/fprints.html) /
        [fprintks](https://csound.com/docs/manual/fprintks.html)  
        [ftsave](https://csound.com/docs/manual/ftsave.html)  /
        [ftsavek](https://csound.com/docs/manual/ftsavek.html)   
        [ftload](https://csound.com/docs/manual/ftload.html)  /
        [ftloadk](https://csound.com/docs/manual/ftloadk.html) 


-   **CONVERTERS OF DATA TYPES**

    -   **i <- k** 

        [i(k)](https://csound.com/docs/manual/opi.html) \

    -   **k <- a** 

        [downsamp](https://csound.com/docs/manual/downsamp.html)  
        [max\_k](https://csound.com/docs/manual/max_k.html)  \

    -   **a <- k**

        [upsamp](https://csound.com/docs/manual/upsamp.html) 
        [interp](https://csound.com/docs/manual/interp.html)  \


-   **PRINTING AND STRINGS**

    -   **Simple Printing**

        [print](https://csound.com/docs/manual/print.html) 
        [printk](https://csound.com/docs/manual/printk.html) 
        [printk2](https://csound.com/docs/manual/printk2.html) 
        [puts](https://csound.com/docs/manual/puts.html) \

    -   **Formatted Printing**

        [prints](https://csound.com/docs/manual/prints.html) 
        [printf\_i](https://csound.com/docs/manual/printf.html) 
        [printks](https://csound.com/docs/manual/printks.html) 
        [printf](https://csound.com/docs/manual/printf.html)  \

    -   **String Variables**

        [sprintf](https://csound.com/docs/manual/sprintf.html) 
        [sprintfk](https://csound.com/docs/manual/sprintfk.html) 
        [strset](https://csound.com/docs/manual/strset.html) 
        [strget](https://csound.com/docs/manual/strget.html)  \

    -   **String Manipulation And Conversion**

        see
        [here](https://csound.com/docs/manual/StringsTop.html#stringmanipulate) 
        and
        [here](https://csound.com/docs/manual/stringconvert.html)   \


### REALTIME INTERACTION

-   **MIDI**

    -   **Opcodes for Use in MIDI-Triggered Instruments**

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

    -   **Opcodes For Use In All Instruments**

        [ctrl7](https://csound.com/docs/manual/ctrl7.html) 
        ([ctrl14](https://csound.com/docs/manual/ctrl14.html)/[ctrl21](https://csound.com/docs/manual/ctrl21.html))
        [initc7](https://csound.com/docs/manual/initc7.html) 
        [ctrlinit](https://csound.com/docs/manual/ctrlinit.html) 
        ([initc14](https://csound.com/docs/manual/initc14.html)/[initc21](https://csound.com/docs/manual/initc21.html)) 
        [midiin](https://csound.com/docs/manual/midiin.html) 
        [midiout](https://csound.com/docs/manual/midiout.html)  \


-   **OPEN SOUND CONTROL AND NETWORK**

    -   **Open Sound Control**

        [OSCinit](https://csound.com/docs/manual/OSCinit.html) 
        [OSClisten](https://csound.com/docs/manual/OSClisten.html) 
        [OSCsend](https://csound.com/docs/manual/OSCsend.html)  \

    -   **Remote Instruments**

        [remoteport](https://csound.com/docs/manual/remoteport.html) 
        [insremot](https://csound.com/docs/manual/insremot.html) 
        [insglobal](https://csound.com/docs/manual/insglobal.html) 
        [midiremot](https://csound.com/docs/manual/midiremot.html) 
        [midiglobal](https://csound.com/docs/manual/midiglobal.html)  \

    -   **Network Audio**

        [socksend](https://csound.com/docs/manual/socksend.html) 
        [sockrecv](https://csound.com/docs/manual/sockrecv.html)   \


-   **HUMAN INTERFACES**

    -   **Widgets**

        FLTK overview
        [here](https://csound.com/docs/manual/ControlFltkIntro.html)  \

    -   **Keys**

        [sensekey](https://csound.com/docs/manual/sensekey.html) \

    -   **Mouse**

        [xyin](https://csound.com/docs/manual/xyin.html) \

    -   **WII**

        [wiiconnect](https://csound.com/docs/manual/wiiconnect.html) 
        [wiidata](https://csound.com/docs/manual/wiidata.html) 
        [wiirange](https://csound.com/docs/manual/wiirange.html) 
        [wiisend](https://csound.com/docs/manual/wiisend.html) \

    -   **P5 Glove**

        [p5gconnect](https://csound.com/docs/manual/p5gconnect.html) 
        [p5gdata](https://csound.com/docs/manual/p5gdata.html) 


### INSTRUMENT CONTROL

-   **SCORE PARAMETER ACCESS**

    [p(x)](https://csound.com/docs/manual/p.html) 
    [pindex](https://csound.com/docs/manual/pindex.html) 
    [pset](https://csound.com/docs/manual/pset.html) 
    [passign](https://csound.com/docs/manual/passign.html) 
    [pcount](https://csound.com/docs/manual/pcount.html)  \

-   **TIME AND TEMPO**

    -   **Time Reading**

        [times](https://csound.com/docs/manual/times.html)/[timek](https://csound.com/docs/manual/timek.html)
           
        [timeinsts](https://csound.com/docs/manual/timeinsts.html)/[timeinstk](https://csound.com/docs/manual/timeinstk.html)  
        [date](https://csound.com/docs/manual/date.html)/[dates](https://csound.com/docs/manual/dates.html)
          
        [setscorepos](https://csound.com/docs/manual/setscorepos.html)
         \

    -   **Tempo Reading**

        [tempo](https://csound.com/docs/manual/tempo.html) 
        [miditempo](https://csound.com/docs/manual/miditempo.html) 
        [tempoval](https://csound.com/docs/manual/tempoval.html)  \

    -   **Duration Modifications**

        [ihold](https://csound.com/docs/manual/ihold.html) 
        [xtratim](https://csound.com/docs/manual/xtratim.html)  

    -   **Time Signal Generators**

        [metro](https://csound.com/docs/manual/metro.html) 
        [mpulse](https://csound.com/docs/manual/mpulse.html) \


-   **CONDITIONS AND LOOPS**

    [changed](https://csound.com/docs/manual/changed.html) 
    [trigger](https://csound.com/docs/manual/trigger.html) 
    [if](https://csound.com/docs/manual/if.html) 
    [loop\_lt](https://csound.com/docs/manual/loop_lt.html)/[loop\_le](https://csound.com/docs/manual/loop_le.html)/[loop\_gt](https://csound.com/docs/manual/loop_gt.html)/[loop\_ge](https://csound.com/docs/manual/loop_ge.html) \


-   **PROGRAM FLOW**

    [init](https://csound.com/docs/manual/init.html) 
    [igoto](https://csound.com/docs/manual/igoto.html) 
    [kgoto](https://csound.com/docs/manual/kgoto.html) 
    [timout](https://csound.com/docs/manual/timout.html)  
    [reinit](https://csound.com/docs/manual/reinit.html)/[rigoto](https://csound.com/docs/manual/rigoto.html)/[rireturn](https://csound.com/docs/manual/rireturn.html) \


-   **EVENT TRIGGERING**

    [event\_i](https://csound.com/docs/manual/event_i.html)  /
    [event](https://csound.com/docs/manual/event.html)   
    [scoreline\_i](https://csound.com/docs/manual/scoreline_i.html) 
    / [scoreline](https://csound.com/docs/manual/scoreline.html)   
    [schedkwhen](https://csound.com/docs/manual/schedkwhen.html)  
    [seqtime](https://csound.com/docs/manual/seqtime.html)
    /[seqtime2](https://csound.com/docs/manual/seqtime2.html)  
    [timedseq](https://csound.com/docs/manual/timedseq.html)  \


-   **INSTRUMENT SUPERVISION**

    -   **Instances And Allocation**

        [active](https://csound.com/docs/manual/active.html) 
        [maxalloc](https://csound.com/docs/manual/maxalloc.html) 
        [prealloc](https://csound.com/docs/manual/prealloc.html)  \


    -   **Turning On And Off**

        [turnon](https://csound.com/docs/manual/turnon.html)   
        [turnoff](https://csound.com/docs/manual/turnoff.html)/[turnoff2](https://csound.com/docs/manual/turnoff2.html)  
        [mute](https://csound.com/docs/manual/mute.html)  
        [remove](https://csound.com/docs/manual/remove.html)  
        [exitnow](https://csound.com/docs/manual/exitnow.html)  \

    -   **Named Instruments**

        [nstrnum](https://csound.com/docs/manual/nstrnum.html)\


-   **SIGNAL EXCHANGE AND MIXING**

    -   **chn opcodes**

        [chn\_k](https://csound.com/docs/manual/chn.html)  /
        [chn\_a](https://csound.com/docs/manual/chn.html)  /
        [chn\_S](https://csound.com/docs/manual/chn.html)   
        [chnset](https://csound.com/docs/manual/chnset.html)  
        [chnget](https://csound.com/docs/manual/chnget.html)  
        [chnmix](https://csound.com/docs/manual/chnmix.html)  
        [chnclear](https://csound.com/docs/manual/chnclear.html) \

    -   **zak** 

### MATHS

-   **MATHEMATICAL CALCULATIONS**

    -   **Arithmetic Operations**

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

    -   **Trigonometric Functions**

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

    -   **Logic Operators**

        [&&](https://csound.com/docs/manual/opand.html)   
        [\|\|](https://csound.com/docs/manual/opor.html)  \


-   **CONVERTERS**

    -   **MIDI To Frequency**

        [cpsmidi](https://csound.com/docs/manual/cpsmidi.html) 
        [cpsmidinn](https://csound.com/docs/manual/cpsmidinn.html)  
        [more](https://csound.com/docs/manual/PitchTop.html#PitchFuncs) 

    -   **Frequency To MIDI**

        [F2M](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=123)  
        [F2MC](http://en.flossmanuals.net/bin/view/Csound/%20http://www.csounds.com/udo/displayOpcode.php?opcode_id=124) 
        (UDO\'s)\

    -   **Cent Values To Frequency**

        [cent](https://csound.com/docs/manual/cent.html)  \

    -   **Amplitude Converters**

        [ampdb](https://csound.com/docs/manual/ampdb.html) 
        [ampdbfs](https://csound.com/docs/manual/ampdbfs.html) 
        [dbamp](https://csound.com/docs/manual/dbamp.html) 
        [dbfsamp](https://csound.com/docs/manual/dbfsamp.html) \

    -   **Scaling**

        [Scali](http://www.csounds.com/udo/displayOpcode.php?opcode_id=125)  
        [Scalk](http://www.csounds.com/udo/displayOpcode.php?opcode_id=126)  
        [Scala](http://www.csounds.com/udo/displayOpcode.php?opcode_id=127) 
        (UDO\'s)\

### PYTHON AND SYSTEM

-   **PYTHON OPCODES**

    [pyinit](https://csound.com/docs/manual/pyinit.html) 
    [pyrun](https://csound.com/docs/manual/pyrun.html) 
    [pyexec](https://csound.com/docs/manual/pyexec.html) 
    [pycall](https://csound.com/docs/manual/pycall.html) 
    [pyeval](https://csound.com/docs/manual/pyeval.html) 
    [pyassign](https://csound.com/docs/manual/pyassign.html) \


-   **SYSTEM OPCODES**

    [getcfg](https://csound.com/docs/manual/getcfg.html)  
    [system](https://csound.com/docs/manual/system.html)/[system\_i](https://csound.com/docs/manual/system.html) \

### PLUGINS 

-   **PLUGIN HOSTING**

    -   **LADSPA**

        [dssiinit](https://csound.com/docs/manual/dssiinit.html) 
        [dssiactivate](https://csound.com/docs/manual/dssiactivate.html) 
        [dssilist](https://csound.com/docs/manual/dssilist.html) 
        [dssiaudio](https://csound.com/docs/manual/dssiaudio.html) 
        [dssictls](https://csound.com/docs/manual/dssictls.html)  \

    -   **VST**

        [vstinit](https://csound.com/docs/manual/vstinit.html)  
        [vstaudio](https://csound.com/docs/manual/vstaudio.html)/[vstaudiog](https://csound.com/docs/manual/vstaudio.html)  
        [vstmidiout](https://csound.com/docs/manual/vstmidiout.html)  
        [vstparamset](https://csound.com/docs/manual/vstparamset.html)/[vstparamget](https://csound.com/docs/manual/vstparamget.html)  
        [vstnote](https://csound.com/docs/manual/vstnote.html)  
        [vstinfo](https://csound.com/docs/manual/vstinfo.html) 
        [vstbankload](https://csound.com/docs/manual/vstbankload.html)  
        [vstprogset](https://csound.com/docs/manual/vstprogset.html)  
        [vstedit](https://csound.com/docs/manual/vstedit.html) \


-   **EXPORTING CSOUND FILES TO PLUGINS**

