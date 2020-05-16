15 A. OPCODE GUIDE
==================

If Csound is called from the command line with the option -z, a
list of all opcodes is printed. The total number of all opcodes is more than 1500. There are already overviews of all of Csound's opcodes in the
[Opcodes Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
and the
[Opcode Quick Reference](https://csound.com/docs/manual/MiscQuickref.html) of the
[Canonical Csound Manual](https://csound.com/docs/manual/index.html).

This guide is another attempt to provide some orientation within
Csound's wealth of opcodes — a wealth which is often frightening for beginners and still overwhelming for experienced users.

Three selections are given here, each growing in size:  
1. The **30** most important opcodes. This selection might be useful for beginners. Learning ten opcodes a day, Csound can be learned in three days, and many full-featured Csound programs can be written with these 30 opcodes.  
2. The Top **100** Opcodes. Adding 70 more opcodes to the top 30 pushes the csound programmer to the next level. This should be sufficient for doing most of the jobs in Csound.  
3. The third overview is rather extended already, and follows mostly the classification in the Csound Manual. It comprises some **300** opcodes.

Although these selections come from some experience in using and teaching Csound, and have been discussed in the Csound Community, they must remain subjective, as working in Csound can go in quite different directions.


THE 30 MOST IMPORTANT OPCODES
-----------------------------



TOP 100 OPCODES
---------------

**Oscillators / Phasors**  
    poscil 
    vco2
    gbuzz  
    mpulse  
    phasor

**Noise**  
    rand  

**Envelopes**  
    linen(r)  

**Line Generators**  
    linseg  
    expseg  
    transeg  
    bpf?  

**Line Smooth**  
    port(k)  

**Sound Files / Samples**  
    diskin  
    loscilx  
    flooper2  
    mp3in  
    filescal  
    filelen  

**Audio I/O**  
    inch  
    out  
    outch  
    monitor  

**Tables (Buffers)**  
    ftgen  
    table(i|3)  
    tablew  
    ftsamplebank  

**Arrays**  
    fillarray  
    lenarray  
    getrow/getcol  
    setrow/setcol  

**Control**  
    if  
    while  
    changed(2)  
    trigger  

**Instrument Control**  
    active  
    maxalloc  
    schedule(k)  
    turnoff(2)  
    nstrnum  

**Time**  
    metro(2)    
    timeinsts    

**Software Channels**  
    chnset  
    chnget  
    chnmix  
    chnclear  

**MIDI**  
    massign  
    notnum  
    veloc  
    ctrl7  

**OSC**  
    OSClisten  
    OSCsend  

**Key**  
    sensekey  

**Panning / Spatialization**  
    pan2  
    vbap  
    bformenc2/bformdec2  
  
**Reverb**  
    reverbsc  
    freeverb  

**FFT**  
    pvsanal  
    pvsynth  
    pvscale  
    pvsmorph  
    pvsftw/pvsftr  
    pvs2array/pvsfromarray  

**Convolution**  
    pconvolve  

**Granular Synthesis**  
    partikkel  

**Physical Models**
    pluck  

**Delay**  
    vdelayx  

**Distortion**  
    distort1  
    powershape  

**Filter**  
    (a)tone  
    reson  
    butlp(hp/bp)  
    mode  
    hilbert  
    
**Level**  
    rms  
    balance(2)  

**Random**  
    rnd/birnd
    random
    randomi/randomh
    seed

**Math / Conversion**  
    ampdb/dbamp  
    mtof/ftom  
    cent  
    log2  
    abs  
    int/frac  

**Amplitude / Pitch Tracking**
    ptrack  
    follow2  

**Print**  
    print(k)(s)  
    printarray  
    ftprint  

**File IO**  
    fout  
    ftsave  
    fprint(k)s  
    readf(i)  
    directory  

**Signal Type Conversion**  
    i(k)  
    a(k)  
    k(a)  



OPCODES OVERVIEW IN CATEGORIES
------------------------------


### OSCILLATORS AND PHASORS


#### Standard Oscillators

[poscil(3)](https://csound.com/docs/manual/poscil.html) — high precision oscillator with linear (cubic) interpolation  
[oscili(3)](https://csound.com/docs/manual/oscili.html) — standard oscillator with linear (cubic) interpolation  
[lfo](https://csound.com/docs/manual/lfo.html) — low frequency oscillator of various shapes  
[oscilikt](https://csound.com/docs/manual/oscilikt.html) — interpolating oscillator with k-rate changeable tables  
[more ...](https://csound.com/docs/manual/SiggenBasic.html) — more standard oscillators ...  
*Note*: [oscil](https://csound.com./docs/manual/oscil.html) is not recommended as it has integer indexing which can result in low quality


#### Dynamic Spectrum Oscillators

[(g)buzz](https://csound.com/docs/manual/buzz.html) — buzzer  
[mpulse](https://csound.com/docs/manual/mpulse.html) — single sample impulses  
[vco(2)](https://csound.com/docs/manual/vco2.html) — analog modelled oscillator  
[squinewave](https://csound.com/docs/manual/squinewave.html) — shape-shifting oscillator with hardsync  


#### Phasors

[phasor](https://csound.com/docs/manual/phasor.html) — standard phasor  
[syncphasor](https://csound.com/docs/manual/syncphasor.html) — phasor with sync I/O  
[ephasor](https://csound.com/docs/manual/ephasor.html) — phasor with additional exponential decay output  
[sc_phasor](https://csound.com/docs/manual/sc_phasor.html) — resettable phasor  


### SOUND FILES AND SAMPLES


#### Sound File Playback

[diskin](https://csound.com/docs/manual/diskin2.html) — sound file playback with different options  
[mp3in](https://csound.com/docs/manual/mp3in.html) — mp3 playback  


#### Sample Playback

[(GEN01)](https://csound.com/docs/manual/GEN01.html) — load file into table  
[loscil(3/x)](https://csound.com/docs/manual/loscil.html) — read sampled sound from a table  
[lposcil](https://csound.com/docs/manual/lposcil.html) — read sampled sound with loops  
[flooper(2)](https://csound.com/docs/manual/flooper.html) — crossfading looper  


#### Time Stretch and Pitch Shift

[filescal](https://csound.com/docs/manual/filescal.html) — phase-locked vocoder processing with time and pitch scale  
[mincer](https://csound.com/docs/manual/mincer.html) — phase-locked vocoder processing on table loaded sound  
[mp3scal](https://csound.com/docs/manual/mp3scal.html) — tempo scaling of mp3 files  
[paulstretch](https://csound.com/docs/manual/paulstretch.html) — extreme time stretch  
[sndwarp(st)](https://csound.com/docs/manual/sndwarp.html) — granular-based time and pitch modification    
*NOTE* that any granular synthesis opcode and some of the pvs opcodes (pvstanal, pvsbufred) can also be used for this approach  


#### Soundfonts and Fluid Opcodes

see overview [here](https://csound.com/docs/manual/SiggenSample.html#SiggenSampleSF)


#### Sound File Queries

[filelen](https://csound.com/docs/manual/filelen.html) — length of sound file  
[filesr](https://csound.com/docs/manual/filesr.html) — sample rate of sound file  
[filenchnls](https://csound.com/docs/manual/filenchnls.html) — number of channels in sound file  
[filepeak](https://csound.com/docs/manual/filepeak.html) — peak in sound file  
[filebit](https://csound.com/docs/manual/filebit.html) — bit depth in sound file  
[filevalid](https://csound.com/docs/manual/filevalid.html) — check whether file exists  
[mp3len](https://csound.com/docs/manual/mp3len.html) — length of mp3 file  


#### Directories
[directory](https://csound.com/docs/manual/directory.html) — files in a directory as string array  
[ftsamplebank](https://csound.com/docs/manual/ftsamplebank.html) — load files in a directory to tables    


### AUDIO I/O

#### General Settings and Queries

[sr](https://csound.com/docs/manual/sr.html) — set sample rate (default=44100)  
[ksmps](https://csound.com/docs/manual/ksmps.html) — set block (audio vector) size (default=10) *(setting to power-of-two (e.g. 32/64/128) is recommended)*  
[nchnls](https://csound.com/docs/manual/nchnls.html) — set number of I/O channels (default=1)  
[nchnls_i](https://csound.com/docs/manual/nchnls_i.html) — set number of input channels if different from output  
[0dbfs](https://csound.com/docs/manual/Zerodbfs.html) — set zero dB full scale (default=32767) *(setting 0dbfs=1 is strongly recommended)*  
[nchnls_hw](https://csound.com/docs/manual/nchnls_hw.html) — report number of channels in hardware  
[setksmps](https://csound.com/docs/manual/setksmps.html) — set local ksmps in User-Defined-Opcodes or instruments  


#### Signal Input and Output

[inch](https://csound.com/docs/manual/inch.html) — read audio from one or more input channels    
[out](https://csound.com/docs/manual/out.html) — write audio to one or more output channels (starting from first hardware output)  
[outch](https://csound.com/docs/manual/outch.html) — write audio to arbitrary output channel(s)  
[monitor](https://csound.com/docs/manual/monitor.html) — monitor audio output channels  


#### Sound File Output

[fout](https://csound.com/docs/manual/fout.html) — write out real-time audio output *(for rendered audio file output see chapter [02E](02-e-rendering-to-file.md) and [06A](06-a-record-and-play-soundfiles.md))*  




### RANDOM AND NOISE GENERATORS


#### Seed

[seed](https://csound.com/docs/manual/seed.html) — set the global seed  
[getseed](https://csound.com/docs/manual/getseed.html) — get the global seed  


#### Noise Generators

[rand](https://csound.com/docs/manual/rand.html) — standard random (noise) generator  
[pinkish](https://csound.com/docs/manual/pinkish.html) — pink noise generator  
[fractalnoise](https://csound.com/docs/manual/fractalnoise.html) — fractal noise generator  
[gauss(i)](https://csound.com/docs/manual/gauss.html) — Gaussian distribution random generator  
[gendy(c/x)](https://csound.com/docs/manual/gendy.html) — dynamic stochastic waveform synthesis conceived by Iannis Xenakis  


#### General Random Generators
  
[rnd](https://csound.com/docs/manual/rnd.html) — simple unipolar random generator  
[birnd](https://csound.com/docs/manual/birnd.html) — simple bipolar random generator  
[random](https://csound.com/docs/manual/random.html) — random numbers between min/max  
[rnd31](https://csound.com/docs/manual/rnd31.html) — random generator with controllable distributions  
[dust(2)](https://csound.com/docs/manual/dust.html) — random impulses  
[gausstrig](https://csound.com/docs/manual/gausstrig.html) — random impulses around a frequency  
[lorenz](https://csound.com/docs/manual/lorenz.html) — implements lorenz system of equations  
[urd](https://csound.com/docs/manual/urd.html) — user-defined random distributions  


#### Random Generators with Interpolating or Hold Numbers

[randi(c)](https://csound.com/docs/manual/randi.html) — bipolar random generator with linear (cubic) interpolation  
[randh](https://csound.com/docs/manual/randh.html) — bipolar random generator with hold numbers  
[randomi](https://csound.com/docs/manual/randomi.html) — random numbers between min/max with interpolation   
[randomh](https://csound.com/docs/manual/randomh.html) — random numbers between min/max with hold numbers  
[more ...](https://csound.com/docs/manual/SiggenNoise.html) — more random generators ...  



### ENVELOPES AND LINES


#### Simple Standard Envelopes

[linen](https://csound.com/docs/manual/linen.html) — linear fade in/out  
[linenr](https://csound.com/docs/manual/linenr.html) — fade out at release  
[(x)adsr](https://csound.com/docs/manual/adsr.html) — ADSR envelope with linear (exponential) lines  
[m(x)adsr](https://csound.com/docs/manual/madsr.html) — ADSR for MIDI notes with linear (exponential) lines    
[more](https://csound.com/docs/manual/SiggenEnvelope.html) — more standard envelopes ...  


#### Envelopes by Linear and Exponential Generators

[linseg](https://csound.com/docs/manual/linseg.html) — one or more linear segments  
[expseg](https://csound.com/docs/manual/expseg.html) — one or more exponential segments  
[transeg](https://csound.com/docs/manual/transeg.html) — one or more user-definable segments  
[linsegr](https://csound.com/docs/manual/linsegr.html) — linear segments with final release segment  
[expsegr](https://csound.com/docs/manual/expsegr.html) — exponential segments with release  
[transegr](http://en.flossmanuals.net/bin/view/Csound/transegr) — user-definable segments with release  
[bpf](https://csound.com/docs/manual/bpf.html) — break point function with linear interpolation  
[jitter(2)](https://csound.com/docs/manual/jitter.html) — randomly segmented line  
[jspline](https://csound.com/docs/manual/jspline.html) — jitter-spline generated line  
[loopseg](https://csound.com/docs/manual/loopseg.html) — loops linear segments  
[rspline](https://csound.com/docs/manual/rspline.html) — random spline curves  
[more](https://csound.com/docs/manual/SiggenLineexp.html) — more envelope generators ...  


#### Signal Smooth

[port(k)](https://csound.com/docs/manual/port.html) — portamento-like smoothing for control signals (with variable half-time)  
[sc_lag(ud)](https://csound.com/docs/manual/sc_lag.html) — exponential lag (with different smoothing times)  
[(t)lineto](https://csound.com/docs/manual/lineto.html) — generate glissando from control signal  



### DELAYS

#### Audio Delays

[delay](https://csound.com/docs/manual/delay.html) — simple constant audio delay  
[vdelay(3)](https://csound.com/docs/manual/vdelay.html) — variable delay with linear (cubic) interpolation  
[vdelayx](https://csound.com/docs/manual/vdelayx.html) — variable delay with highest quality interpolation  
[vdelayxw](https://csound.com/docs/manual/vdelayxw.html) — variable delay changing write rather than read position  
[delayr](https://csound.com/docs/manual/delayr.html) — establishe delay line and read from it  
[delayw](https://csound.com/docs/manual/delayw.html) — write into delay line  
[deltapxw](https://csound.com/docs/manual/deltapxw.html) — write into a delay line with high quality interpolation  
[deltap(i/3)](https://csound.com/docs/manual/deltap.html) — tap a delay line with linear (cubic) interpolation  
[deltapx](https://csound.com/docs/manual/deltapx.html) — tap a delay line with highest quality interpolation  
[deltapn](https://csound.com/docs/manual/deltapn.html) — tap a delay line at variable offsets  
[multitap](https://csound.com/docs/manual/multitap.html) — multiple tap delays with different gains  


#### Control Signal Delays

[delayk](https://csound.com/docs/manual/delayk.html) — simple constant delay for k-signals  
[vdel\_k](https://csound.com/docs/manual/delayk.html) — variable delay for k-signals  


### FILTERS

Compare the extensive
[Standard Filters](https://csound.com/docs/manual/SigmodStandard.html) and
[Specialized Filters](https://csound.com/docs/manual/SigmodSpeciali.html)
overviews in the Csound Manual.


#### Low Pass Filters

[tone](https://csound.com/docs/manual/tone.html) — first order IIR filter  
[tonex](https://csound.com/docs/manual/tonex.html) — serial connection of several tone filters  
[butlp](https://csound.com/docs/manual/butterlp.html) — second order IIR filter  
[clfilt](https://csound.com/docs/manual/clfilt.html) — adjustable types and poles  


#### High Pass Filters

[atone](https://csound.com/docs/manual/atone.html) — first order IIR filter  
[atonex](https://csound.com/docs/manual/atonex.html) — serial connection of several atone filters  
[buthp](https://csound.com/docs/manual/butterhp.html) — second order IIR filer  
[clfilt](https://csound.com/docs/manual/clfilt.html) — adjustable types and poles  
[dcblock(2)](https://csound.com/docs/manual/dcblock.html) — removes DC offset  


#### Band Pass And Resonant Filters

[reson](https://csound.com/docs/manual/reson.html) — second order resonant filter  
[resonx/resony](https://csound.com/docs/manual/resonx.html) — serial/parallel connection of several reson filters  
[resonr/resonz](https://csound.com/docs/manual/resonr.html) — variants of the reson filter  
[butbp](https://csound.com/docs/manual/butterbp.html) — second order butterworth filter  
[mode](https://csound.com/docs/manual/mode.html) — mass-spring system modelled  
[fofilter](https://csound.com/docs/manual/fofilter.html) — formant filter  


#### Band Reject Filters

[areson](https://csound.com/docs/manual/areson.html) — first order IIR filter  
[butbr](https://csound.com/docs/manual/butterbp.html) — second order IIR filter  


#### Equalizer

[eqfil](https://csound.com/docs/manual/eqfil.html) — equilizer filter  
[exciter](https://csound.com/docs/manual/exciter.html) — non-linear filter to add brilliance  




### REVERB

[freeverb](https://csound.com/docs/manual/freeverb.html) — stereo reverb after Jezar  
[reverbsc](https://csound.com/docs/manual/reverbsc.html) — stereo reverb after Sean Costello  
[reverb](https://csound.com/docs/manual/reverb.html) — simple reverb  
[nreverb](https://csound.com/docs/manual/nreverb.html) — reverb with adjustable number of units  
[babo](https://csound.com/docs/manual/babo.html) — physical model reverberator  
[(v)alpass](https://csound.com/docs/manual/alpass.html) — reveberates with a flat frequency response  
[(v)comb](https://csound.com/docs/manual/comb.html) — comb filter  
*Note*: Convolution reverb can be performed with 
[pconvolve](https://csound.com/docs/manual/pconvolve.html) and similar opcodes.


### SPATIALIZATION


#### Amplitude Panning

[pan2](https://csound.com/docs/manual/pan2.html) — stereo panning with different options  
[vbap](https://csound.com/docs/manual/vbap.html) — vector base amplitude panning for multichannel (also 3d)  


#### Ambisonics

[bformenc1](https://csound.com/docs/manual/bformenc1.html) — b-format encoding  
[bformdec1](https://csound.com/docs/manual/bformdec1.html) — b-format decoding  


#### Binaural / HRTF

[hrtfstat](https://csound.com/docs/manual/hrtfstat.html) — static 3d binaural audio for headphones  
[hrtfmove(2)](https://csound.com/docs/manual/hrtfmove.html) — dynamic 3d binaural audio  
[hrtfearly](https://csound.com/docs/manual/hrtfearly.html) — early reflections in a HRTF room  
[hrtfreverb](https://csound.com/docs/manual/hrtfreverb.html) — binaural diffuse-field reverberator  

        

### PHYSICAL MODELS AND FM INSTRUMENTS

#### Waveguide Physical Modelling

see
[here](https://csound.com/docs/manual/SiggenWavguide.html)
and
[here](https://csound.com/docs/manual/SigmodWavguide.html)


#### FM Instrument Models

see
[here](https://csound.com/docs/manual/SiggenFmsynth.html)   



### MODULATION AND DISTORTION


#### Frequency Modulation

[foscili](https://csound.com/docs/manual/foscili.html) —  basic FM oscillator  
[cross(p/f)m(i)](https://csound.com/docs/manual/crossfm.html) — two mutually frequency and/or phase modulated oscillators  
*(see also chapter [04D](04-d-frequency-modulation.md))*  


#### Distortion and Wave Shaping

[distort(1)](https://csound.com/docs/manual/distort.html) — distortion via waveshaping  
[powershape](https://csound.com/docs/manual/powershape.html) — waveshaping by raising to a variable exponent  
[polynomial](https://csound.com/docs/manual/polynomial.html) — polynominal over audio input signal  
[chebyshevpoly](https://csound.com/docs/manual/chebyshevpoly.html) — chebyshev polynominals over audio input signal  
[fold](https://csound.com/docs/manual/fold.html) — adds artificial foldover to an audio signal  
[pdclip](https://csound.com/docs/manual/pdclip.html) — linear clipping of audio signal  


#### Flanging, Phasing, Phase Shaping

[flanger](https://csound.com/docs/manual/flanger.html) — flanger 
[phaser1/2](https://csound.com/docs/manual/phaser1.html) — first/second order allpass filters in series  
[pdhalf(y)](https://csound.com/docs/manual/pdhalf.html) — phase distortion synthesis  


#### Other

[doppler](https://csound.com/docs/manual/doppler.html) — doppler shift  
[diff](https://csound.com/docs/manual/diff.html) — modify a signal by differentiation  
[integ](https://csound.com/docs/manual/integ.html) — modify a signal by integration  
[mirror](https://csound.com/docs/manual/mirror.html) — reflects a signal which exceeds boundaries  
[select](https://csound.com/docs/manual/select.html) — select sample value based on audio-rate comparisons  
[wrap](https://csound.com/docs/manual/wrap.html) — wraps around a signal which exceeds boundaries  
[waveset](https://csound.com/docs/manual/waveset.html) — repeating cycles of input audio signal  
[sndloop](https://csound.com/docs/manual/sndloop.html) — looping on audio input signal  



### GRANULAR SYNTHESIS

[partikkel](https://csound.com/docs/manual/partikkel.html) — complete granular synthesis  
[fof(2)](https://csound.com/docs/manual/fof.html) — formant orientated granular synthesis   
[fog](https://csound.com/docs/manual/fog.html) — fof synthesis with samples sound  
[diskgrain](https://csound.com/docs/manual/diskgrain.html) — synchronous granular synthesis with sound file  
[grain(2/3)](https://csound.com/docs/manual/grain.html) — granular textures   
[granule](https://csound.com/docs/manual/granule.html) — complex granular textures  
[syncgrain/syncloop](https://csound.com/docs/manual/syncgrain.html) — synchronous granular synthesis  
[others ...](https://csound.com/docs/manual/SiggenGranular.html) — other granular synthesis opcodes ...  
*(see also chapter [05G](05-g-granular-synthesis.md))*

 

### SPECTRAL PROCESSING (FFT WITH PVS OPCODES)


#### Environment

[pvsinit](https://csound.com/docs/manual/pvsinit.html) — initializes f-signal to zero  
[pvsinfo](https://csound.com/docs/manual/pvsinfo.html) — get information about f-sig  
[pvsin](https://csound.com/docs/manual/pvsin.html) — retrieve f-signal from input software bus  
[pvsout](https://csound.com/docs/manual/pvsout.html) — writing f-signal to output software bus  


#### Real-time Analysis and Resynthesis

[pvsanal](https://csound.com/docs/manual/pvsanal.html) — spectral analysis with audio signal input  
[pvstanal](https://csound.com/docs/manual/pvstanal.html) — spectral analysis from sampled sound  
[pvstrace](https://csound.com/docs/manual/pvstrace.html) — retain only N loudest bins  
[pvsynth](https://csound.com/docs/manual/pvsynth.html) — spectral resynthesis  
[pvsadsyn](https://csound.com/docs/manual/pvsadsynth.html) — spectral resynthesis using fast oscillator bank  


#### Writing Spectral Data to a File and Reading from it

[pvsfwrite](https://csound.com/docs/manual/pvsfwrite.html) — writing f-sig to file  
[pvsfread](https://csound.com/docs/manual/pvsfread.html) — read f-sig data from a file loaded into memory   
[pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) — read f-sig data directly from disk  


#### Writing Spectral Data to a Buffer or Array and Reading from it

[pvsbuffer](https://csound.com/docs/manual/pvsbuffer.html) — create and write f-sig to circular buffer  
[pvsbufread(2)](https://csound.com/docs/manual/pvsbufread.html) — read f-sig from pvsbuffer  
[pvsftw](https://csound.com/docs/manual/pvsftw.html) — write anplitude and/or frequency data to tables  
[pvsftr](https://csound.com/docs/manual/pvsftr.html) — read amplitude and/or frequency data from table  
[pvs2array(pvs2tab)](https://csound.com/docs/manual/pvs2tab.html) — write spectral data to arrays  
[pvsfromarray(tab2pvs)](https://csound.com/docs/manual/tab2pvs.html) — read spectral data from arrays  


#### Processing Spectral Signals

[pvsbin](https://csound.com/docs/manual/pvsbin.html) — obtain amp/freq from one bin  
[pvscent](https://csound.com/docs/manual/pvscent.html) — spectral centroid of f-signal  
[pvsceps](https://csound.com/docs/manual/pvsceps.html) — cepstrum of f-signal  
[pvscale](https://csound.com/docs/manual/pvscale.html) — scale frequency components (pitch shift)  
[pvshift](https://csound.com/docs/manual/pvshift.html) — shift frequency compnents  
[pvsbandp](https://csound.com/docs/manual/pvsbandp.html) — spectral band pass filter  
[pvsbandr](https://csound.com/docs/manual/pvsbandr.html) — spectral band reject filter  
[pvsmix](https://csound.com/docs/manual/pvsmix.html) — mix two f-signals  
[pvscross](https://csound.com/docs/manual/pvscross.html) — cross synthesis  
[pvsfilter](https://csound.com/docs/manual/pvsfilter.html) — another cross synthesis  
[pvsvoc](https://csound.com/docs/manual/pvsvoc.html) — phase vocoder  
[pvsmorph](https://csound.com/docs/manual/pvsmorph.html) — morphing between two f-signals  
[pvsfreeze](https://csound.com/docs/manual/pvsfreeze.html) — freeze amp/freq time functions   
[pvsmaska](https://csound.com/docs/manual/pvsmaska.html) — modify amplitudes using table  
[pvstencil](https://csound.com/docs/manual/pvstencil.html) — transform f-sig according to masking table  
[pvsarp](https://csound.com/docs/manual/pvsarp.html) — arpeggiate spectral components of f-sig  
[pvsblur](https://csound.com/docs/manual/pvsblur.html) — average amp/freq time functions  
[pvsmooth](https://csound.com/docs/manual/pvsmooth.html) — smooth amp/freq time functions  
[pvslock](https://csound.com/docs/manual/pvslock.html) — frequency lock input f-signal  
[pvswarp](https://csound.com/docs/manual/pvswarp.html) — warp the spectral envelope of an f-signal  


### OTHER SPECTRAL TRANSFORM

[dct(inv)](https://csound.com/docs/manual/dct.html) — (inverse) discrete cosine transformation  
[fft(inv)](https://csound.com/docs/manual/fft.html) — (inverse) complex-to-complex FFT  
[r2c](https://csound.com/docs/manual/r2c.html) — real to complex conversion  
[mags](https://csound.com/docs/manual/mags.html) — magnitudes of a complex-numbered array  
[phs](https://csound.com/docs/manual/phs.html) — obtains phases of a complex-numbered array  
[pol2rect](https://csound.com/docs/manual/pol2rect.html) — polar to rectangular conversion of arrays  
[rect2pol](https://csound.com/docs/manual/rect2pol.html) — rectangular to polar format conversion  
[rfft](https://csound.com/docs/manual/rfft.html) — FFT of real-value array  
[rifft](https://csound.com/docs/manual/rifft.html) — complex-to-real inverse FFT  
[unwrap](https://csound.com/docs/manual/unwrap.html) — unwraps phase values array  
[fmanal](https://csound.com/docs/manual/fmanal.html) — AM/FM analysis from quadrature signal  
[hilbert(2)](https://csound.com/docs/manual/hilbert.html) — Hilbert transform    
[mfb](https://csound.com/docs/manual/mfb.html) — mel scale filterbank for spectral magnitudes  


### CONVOLUTION

[pconvolve](https://csound.com/docs/manual/pconvolve.html) — partitioned convolution  
[ftconv](https://csound.com/docs/manual/ftconv.html) — table-based partitioned convolution  
[dconv](https://csound.com/docs/manual/dconv.html) — direct convolution  
[tvconv](https://csound.com/docs/manual/tvconv.html) — time-varying convolution  


### SIGNAL MEASUREMENT, DYNAMIC PROCESSING, SAMPLE LEVEL OPERATIONS


#### Amplitude Measurement and Amplitude Envelope Following

[rms](https://csound.com/docs/manual/rms.html) — RMS measurement  
[balance(2)](https://csound.com/docs/manual/balance.html) — adjust audio signal level according to comparator  
[follow(2)](https://csound.com/docs/manual/follow.html) — envelopoe follower  
[peak](https://csound.com/docs/manual/peak.html) — maintains highest value received  
[max\_k](https://csound.com/docs/manual/max_k.html) — local maximum/minimum of audio signal  
[vactrol](https://csound.com/docs/manual/vactrol.html) — envelope follower  


#### Pitch Estimation (Pitch Tracking)

[ptrack](https://csound.com/docs/manual/ptrack.html) — pitch tracking using STFT  
[pitch](https://csound.com/docs/manual/pitch.html) — pitch tracking using constant-Q DFT  
[pvspitch](https://csound.com/docs/manual/pvspitch.html) — pitch/amplitude tracking of a PVS signal  
[pvscent](https://csound.com/docs/manual/pvscent.html) — spectral centroid of a PVS signal  


#### Tempo Estimation

[tempest](https://csound.com/docs/manual/tempest.html) — estimate tempo of a beat pattern  


#### Dynamic Processing

[compress(2)](https://csound.com/docs/manual/compress.html) — compress audio signal  
[dam](https://csound.com/docs/manual/dam.html) — dynamic compressor/expander  
[clip](https://csound.com/docs/manual/clip.html) — clips a signal to a predifined limit  


#### Sample Level Operations

[limit(1)](https://csound.com/docs/manual/limit.html) — sets lower and upper limit  
[samphold](https://csound.com/docs/manual/samphold.html) — performs sample-and-hold  
[vaget](https://csound.com/docs/manual/vaget.html) — audio vector read access  
[vaset](https://csound.com/docs/manual/vaset.html) — audio vector write access  
[framebuffer](https://csound.com/docs/manual/framebuffer.html) — reads/writes audio to/from array  
[shiftin/out](https://csound.com/docs/manual/shiftin.html) — writes/reads the content of an audio variable to/from array







### BUFFER / FUNCTION TABLES

#### Creating/Deleting Function Tables (Buffers)

[ftgen](https://csound.com/docs/manual/ftgen.html)  
[GEN Routines](https://csound.com/docs/manual/ScoreGenRef.html)  
[ftfree](https://csound.com/docs/manual/ftfree.html)  
[ftgenonce](https://csound.com/docs/manual/ftgenonce.html)  
[ftgentmp](https://csound.com/docs/manual/ftgentmp.html)  
[tableicopy](https://csound.com/docs/manual/tableicopy.html) — copy table  


#### Writing to Tables

[tableiw](http s://csound.com/docs/manual/tableiw.html)  
[tablew](https://csound.com/docs/manual/tablew.html)  
[tabw\_i](https://csound.com/docs/manual/tab.html)  
[tabw](https://csound.com/docs/manual/tab.html)    
[ftslice](https://csound.com/docs/manual/ftslice.html) — copy a slice from one table to another table  
[modmatrix](https://csound.com/docs/manual/modmatrix.html) — modulation matrix reading from and writing to tables  


#### Reading From Tables

[table](https://csound.com/docs/manual/table.html)  
[tablei](https://csound.com/docs/manual/tablei.html)  
[table3](https://csound.com/docs/manual/table3.html)  
[tab\_i](https://csound.com/docs/manual/tab.html)  
[tab](https://csound.com/docs/manual/tab.html)    
[ftmorf](https://csound.com/docs/manual/ftmorf.html)    
[tablexkt](https://csound.com/docs/manual/tablexkt.html) — reads function tables with linear/cubic/sinc interpolation  


#### Saving Tables to Files

[ftsave](https://csound.com/docs/manual/ftsave.html)   
[ftsavek](https://csound.com/docs/manual/ftsavek.html)  
[ftaudio](https://csound.com/docs/manual/ftaudio.html)  


#### Reading Tables From Files

[ftload](https://csound.com/docs/manual/ftload.html)  
[ftloadk](https://csound.com/docs/manual/ftloadk.html)  
[GEN23](https://csound.com/docs/manual/GEN23.html)


#### Table Queries

[ftlen](https://csound.com/docs/manual/ftlen.html) — length of a table  
[ftchnls](https://csound.com/docs/manual/ftchnls.html) — number of channels of a stored sound    
[ftsr](https://csound.com/docs/manual/ftsr.html) — sample rate of a stored sound  
[getftargs](https://csound.com/docs/manual/getftargs.html) — get arguments of table creation  
[nsamp](https://csound.com/docs/manual/nsamp.html) — number of sample frames in a table  
[tabsum](https://csound.com/docs/manual/tabsum.html) — sum of table values  
        

### ARRAYS

[fillarray](https://csound.com/docs/manual/fillarray.html)  
[genarray(_i)](https://csound.com/docs/manual/genarray.html)  
[tab2array](https://csound.com/docs/manual/tab2array.html) — table to array  
        


#### Non-Soundfile Input And Output

[readk](https://csound.com/docs/manual/readk.html)  
[GEN23](https://csound.com/docs/manual/GEN23.html)  
[dumpk](https://csound.com/docs/manual/dumpk.html)  
[fprints](https://csound.com/docs/manual/fprints.html)  
[fprintks](https://csound.com/docs/manual/fprintks.html)  
[ftsave](https://csound.com/docs/manual/ftsave.html)  
[ftsavek](https://csound.com/docs/manual/ftsavek.html)  
[ftload](https://csound.com/docs/manual/ftload.html)  
[ftloadk](https://csound.com/docs/manual/ftloadk.html)  
[hdf5read](https://csound.com/docs/manual/hdf5read.html)    
[hdf5write](https://csound.com/docs/manual/hdf5write.html)   
[readf(i)](https://csound.com/docs/manual/readf.html) — reads an external file line by line  
 



### CONVERTERS OF DATA TYPES

[i(k)](https://csound.com/docs/manual/opi.html) — i from k  
[downsamp](https://csound.com/docs/manual/downsamp.html)  
[max\_k](https://csound.com/docs/manual/max_k.html)   
[upsamp](https://csound.com/docs/manual/upsamp.html)  
[interp](https://csound.com/docs/manual/interp.html)    
[S](https://csound.com/docs/manual/ops.html) — number to string  
[strtod(k)](https://csound.com/docs/manual/strtod.html) — string to number  



### PRINTING AND STRINGS

#### Simple Printing

[print](https://csound.com/docs/manual/print.html)   
[printk](https://csound.com/docs/manual/printk.html)  
[printk2](https://csound.com/docs/manual/printk2.html)  
[puts](https://csound.com/docs/manual/puts.html)  


#### Formatted Printing

[prints](https://csound.com/docs/manual/prints.html)  
[printf\_i](https://csound.com/docs/manual/printf.html)  
[printks](https://csound.com/docs/manual/printks.html)  
[printf](https://csound.com/docs/manual/printf.html)   


#### String Variables

[sprintf](https://csound.com/docs/manual/sprintf.html)  
[sprintfk](https://csound.com/docs/manual/sprintfk.html)  
[strset](https://csound.com/docs/manual/strset.html)  
[strget](https://csound.com/docs/manual/strget.html)   


#### Arrays and Tables

[printarray](https://csound.com/docs/manual/printarray.html)  
[ftprint](https://csound.com/docs/manual/ftprint.html)


#### String Manipulation And Conversion

see
[here](https://csound.com/docs/manual/StringsTop.html#stringmanipulate)
and
[here](https://csound.com/docs/manual/stringconvert.html) 
[strstrip](https://csound.com/docs/manual/strstrip.html) — removes white space from both ends of a string  



### MIDI

*Note: Modern frontends now usually handle MIDI input.*


#### Assignments

[massign](https://csound.com/docs/manual/massign.html) — assign MIDI channel to Csound instrument  
[pgmassign](https://csound.com/docs/manual/pgmassign.html) — assign MIDI program to Csound instrument    


#### Opcodes for Use in MIDI-Triggered Instruments

[notnum](https://csound.com/docs/manual/notnum.html) — note number received  
[cpsmidi](https://csound.com/docs/manual/cpsmidi.html) — frequency of note received  
[veloc](https://csound.com/docs/manual/veloc.html) — velocity received  
[ampmidi](https://csound.com/docs/manual/ampmidi.html) — velocity with scaling options  
[midichn](https://csound.com/docs/manual/midichn.html) — MIDI channel received  
[pchbend](https://csound.com/docs/manual/pchbend.html) — pitch bend received  
[aftouch](https://csound.com/docs/manual/aftouch.html) — after-touch received  
[polyaft](https://csound.com/docs/manual/polyaft.html) — polyphonic after-touch received  


#### Opcodes For Use In All Instruments

[ctrl7(14/21)](https://csound.com/docs/manual/ctrl7.html) — receive controller  
[initc7(14/21)](https://csound.com/docs/manual/initc7.html) — initialize controller input  
[mclock](https://csound.com/docs/manual/mclock.html) — sends a MIDI clock message  
[mdelay](https://csound.com/docs/manual/mdelay.html) — MIDI delay


#### MIDI Input and Output

[midiin](https://csound.com/docs/manual/midiin.html) — generic MIDI messages received  
[midiout(_i)](https://csound.com/docs/manual/midiout.html) — MIDI message to MIDI Out port    
[midifilestatus](https://csound.com/docs/manual/midifilestatus.html) — status of MIDI input file  
[midion](https://csound.com/docs/manual/midion.html) — sends note on/off messages to MIDI Out port  
[more](https://csound.com/docs/manual/MidiOutput.html) MIDI out opcodes  




### OPEN SOUND CONTROL AND NETWORK

#### Open Sound Control

[OSCinit](https://csound.com/docs/manual/OSCinit.html)  
[OSClisten](https://csound.com/docs/manual/OSClisten.html)  
[OSCsend](https://csound.com/docs/manual/OSCsend.html)   
[OSCbundle](https://csound.com/docs/manual/OSCbundle.html) — send data in a bundle  
[OSCcount](https://csound.com/docs/manual/OSCcount.html) — reports messages received but unread  
[OSCinitM](https://csound.com/docs/manual/OSCinitM.html) — initializes multicast OSC listener  
[OSCraw](https://csound.com/docs/manual/OSCraw.html) — listens to all messages  


#### Remote Instruments

[remoteport](https://csound.com/docs/manual/remoteport.html)  
[insremot](https://csound.com/docs/manual/insremot.html)  
[insglobal](https://csound.com/docs/manual/insglobal.html)  
[midiremot](https://csound.com/docs/manual/midiremot.html)  
[midiglobal](https://csound.com/docs/manual/midiglobal.html)   


#### Network Audio

[socksend](https://csound.com/docs/manual/socksend.html)  
[sockrecv](https://csound.com/docs/manual/sockrecv.html)   
[websocket](https://csound.com/docs/manual/websocket.html)  

 

### HUMAN INTERFACES


#### Widgets

FLTK overview
[here](https://csound.com/docs/manual/ControlFltkIntro.html)  \
 

#### Keys

[sensekey](https://csound.com/docs/manual/sensekey.html) \


#### Mouse

[xyin](https://csound.com/docs/manual/xyin.html) \


#### WII

[wiiconnect](https://csound.com/docs/manual/wiiconnect.html)  
[wiidata](https://csound.com/docs/manual/wiidata.html)  
[wiirange](https://csound.com/docs/manual/wiirange.html)  
[wiisend](https://csound.com/docs/manual/wiisend.html)  


#### P5 Glove

[p5gconnect](https://csound.com/docs/manual/p5gconnect.html)  
[p5gdata](https://csound.com/docs/manual/p5gdata.html)



### SCORE PARAMETER ACCESS

[p(x)](https://csound.com/docs/manual/p.html)  
[pindex](https://csound.com/docs/manual/pindex.html)  
[pset](https://csound.com/docs/manual/pset.html)  
[passign](https://csound.com/docs/manual/passign.html)  
[pcount](https://csound.com/docs/manual/pcount.html)  



### TIME AND TEMPO

#### Time Reading

[times](https://csound.com/docs/manual/times.html)  
[timek](https://csound.com/docs/manual/timek.html)  

[timeinsts](https://csound.com/docs/manual/timeinsts.html)  
[timeinstk](https://csound.com/docs/manual/timeinstk.html)  
[date](https://csound.com/docs/manual/date.html)  
[dates](https://csound.com/docs/manual/dates.html)  

[setscorepos](https://csound.com/docs/manual/setscorepos.html)


#### Tempo Reading

[tempo](https://csound.com/docs/manual/tempo.html)  
[miditempo](https://csound.com/docs/manual/miditempo.html)  
[tempoval](https://csound.com/docs/manual/tempoval.html)   


#### Duration Modifications

[ihold](https://csound.com/docs/manual/ihold.html)  
[xtratim](https://csound.com/docs/manual/xtratim.html)  


#### Time Signal Generators

[metro(2)](https://csound.com/docs/manual/metro.html)  
[mpulse](https://csound.com/docs/manual/mpulse.html)  



### CONDITIONS AND LOOPS

[changed(2)](https://csound.com/docs/manual/changed.html)  
[trigger](https://csound.com/docs/manual/trigger.html)  
[sc_trig](https://csound.com/docs/manual/sc_trig.html) — timed trigger  
[if](https://csound.com/docs/manual/if.html)  
[(i/k)goto](https://csound.com/docs/manual/goto.html)    
[while](https://csound.com/docs/manual/while.html)  


### PROGRAM FLOW

[init](https://csound.com/docs/manual/init.html)  
[igoto](https://csound.com/docs/manual/igoto.html)  
[kgoto](https://csound.com/docs/manual/kgoto.html)  
[timout](https://csound.com/docs/manual/timout.html)  
[reinit](https://csound.com/docs/manual/reinit.html)/[rigoto](https://csound.com/docs/manual/rigoto.html)/[rireturn](https://csound.com/docs/manual/rireturn.html)  
[return](https://csound.com/docs/manual/return.html) — returns a value from an instrument  



### EVENT TRIGGERING

[schedule(k)](https://csound.com/docs/manual/schedule.html) — schedules an instrument event
[event(_i)](https://csound.com/docs/manual/event.html)  
[scoreline(_i)](https://csound.com/docs/manual/scoreline.html)  
[sched(k)when(named)](https://csound.com/docs/manual/schedkwhen.html)  
[seqtime(2)](https://csound.com/docs/manual/seqtime.html) — generates trigger according to values stored in a table   
[timedseq](https://csound.com/docs/manual/timedseq.html)   

[nstance](https://csound.com/docs/manual/nstance.html) — returns additional instance handler  
[readscore](https://csound.com/docs/manual/readscore.html) — reads and processes a score from input string  
[rewindscore](https://csound.com/docs/manual/rewindscore.html) — rewinds playback position of current score  


### INSTRUMENT SUPERVISION

#### Instances And Allocation

[active](https://csound.com/docs/manual/active.html)  
[maxalloc](https://csound.com/docs/manual/maxalloc.html)  
[prealloc](https://csound.com/docs/manual/prealloc.html)   

[subinstr](https://csound.com/docs/manual/subinstr.html)  


#### Turning On And Off

[turnon](https://csound.com/docs/manual/turnon.html)  
[turnoff](https://csound.com/docs/manual/turnoff.html) — turns off this instrument instance    
[turnoff2](https://csound.com/docs/manual/turnoff2.html) — turns off another instrument    
[mute](https://csound.com/docs/manual/mute.html)  
[remove](https://csound.com/docs/manual/remove.html)  
[exitnow](https://csound.com/docs/manual/exitnow.html)   


#### Named Instruments

[nstrnum](https://csound.com/docs/manual/nstrnum.html) — number of a named instrument    
[nstrstr](https://csound.com/docs/manual/nstrstr.html) — name of an instrument  


### SIGNAL EXCHANGE AND MIXING


#### chn opcodes

[chn\_k](https://csound.com/docs/manual/chn.html)  
[chn\_a](https://csound.com/docs/manual/chn.html)  
[chn\_S](https://csound.com/docs/manual/chn.html)  
[chnset](https://csound.com/docs/manual/chnset.html)  
[chnseti/k/a/s](https://csound.com/docs/manual/chnset.html) — array based chnset  
[chnget](https://csound.com/docs/manual/chnget.html)  
[chngeti/k/a/s](https://csound.com/docs/manual/chnget.html) — array based chnget  
[chnmix](https://csound.com/docs/manual/chnmix.html)  
[chnclear](https://csound.com/docs/manual/chnclear.html)   

[invalue](https://csound.com/docs/manual/invalue.html)  
[outvalue](https://csound.com/docs/manual/outvalue.html)


#### zak




### MATHEMATICAL CALCULATIONS

#### Arithmetic Operations

[+](https://csound.com/docs/manual/adds.html)  
[-](https://csound.com/docs/manual/subtracts.html)  
[\*](https://csound.com/docs/manual/multiplies.html)  
[/](https://csound.com/docs/manual/divides.html)  
[\^](https://csound.com/docs/manual/raises.html)  
[%](https://csound.com/docs/manual/modulus.html)   
[divz](https://csound.com/docs/manual/divz.html) — safe division (avoids division by zero)  

[exp](https://csound.com/docs/manual/exp.html)  
[log(2/10)](https://csound.com/docs/manual/log.html)  
[sqrt](https://csound.com/docs/manual/sqrt.html)  

[abs](https://csound.com/docs/manual/abs.html)  
[int](https://csound.com/docs/manual/int.html)  
[frac](https://csound.com/docs/manual/frac.html)  
[signum](https://csound.com/docs/manual/signum.html) — signum function  

[round](https://csound.com/docs/manual/round.html)  
[ceil](https://csound.com/docs/manual/ceil.html)  
[floor](https://csound.com/docs/manual/floor.html)  

[qinf](https://csound.com/docs/manual/qinf.html) — question whether argument is infinite number  
[qnan](https://csound.com/docs/manual/qnan.html) — question whether argument is not a number  


#### Trigonometric Functions

[sin](https://csound.com/docs/manual/sin.html)  
[cos](https://csound.com/docs/manual/cos.html)  
[tan](https://csound.com/docs/manual/tan.html)  

[sinh](https://csound.com/docs/manual/sinh.html)  
[cosh](https://csound.com/docs/manual/cosh.html)  
[tanh](https://csound.com/docs/manual/tanh.html)  

[sininv](https://csound.com/docs/manual/sininv.html)  
[cosinv](https://csound.com/docs/manual/cosinv.html)  
[taninv](https://csound.com/docs/manual/taninv.html)  
[taninv2](https://csound.com/docs/manual/taninv2.html)  


#### Comparisions

[min](https://csound.com/docs/manual/min.html) — minimum of different i/k/a values  
[max](https://csound.com/docs/manual/max.html) — maximum of different i/k/a values  
[minabs](https://csound.com/docs/manual/minabs.html) — minimum of different absolute values/signals  
[maxabs](https://csound.com/docs/manual/maxabs.html) — maximum of different absolute values/signals  
[ntropol](https://csound.com/docs/manual/ntrpol.html) — weighted mean of two values/signals


#### Logic Operators

[&&](https://csound.com/docs/manual/opand.html)  
[\|\|](https://csound.com/docs/manual/opor.html)   



### CONVERTERS


#### MIDI to/from Frequency

[mtof](https://csound.com/docs/manual/mtof.html)  
[ftom](https://csound.com/docs/manual/ftom.html)  
[cpsmidi](https://csound.com/docs/manual/cpsmidi.html)  
[cpsmidinn](https://csound.com/docs/manual/cpsmidinn.html)  
[mton](https://csound.com/docs/manual/mton.html) — midi number to note name  
[ntom](https://csound.com/docs/manual/ntom.html) — note name to midi number  
[ntof](https://csound.com/docs/manual/ntof.html) — note name to frequency  

 
[more](https://csound.com/docs/manual/PitchTop.html#PitchFuncs)  


### Other Pitch Converters

[cent](https://csound.com/docs/manual/cent.html) — cent to scaling factor  
[octave](https://csound.com/docs/manual/octave.html) — octave to scaling factor  
[octcps](https://csound.com/docs/manual/octcps.html) — frequency to octave-point-decimal  
[cpsoct](https://csound.com/docs/manual/cpsoct.html) — octave-point-decimal to frequency  
[cpspch](https://csound.com/docs/manual/cpspch.html) — pitch-class to frequency  


#### Amplitude Converters

[ampdb](https://csound.com/docs/manual/ampdb.html)  
[ampdbfs](https://csound.com/docs/manual/ampdbfs.html)  
[dbamp](https://csound.com/docs/manual/dbamp.html)  
[dbfsamp](https://csound.com/docs/manual/dbfsamp.html)  


#### Scaling

[NmScl](https://github.com/csudo/csudo/blob/master/numbers/NmScl.csd) — UDO for i/k scaling  



### PYTHON OPCODES

[pyinit](https://csound.com/docs/manual/pyinit.html)  
[pyrun](https://csound.com/docs/manual/pyrun.html)  
[pyexec](https://csound.com/docs/manual/pyexec.html)  
[pycall](https://csound.com/docs/manual/pycall.html)  
[pyeval](https://csound.com/docs/manual/pyeval.html)  
[pyassign](https://csound.com/docs/manual/pyassign.html)  


### SERIAL OPCODES

[serialBegin](https://csound.com/docs/manual/serialBegin.html) — open a serial port  
[serialEnd](https://csound.com/docs/manual/serialEnd.html) — close a serial port  
[serialFlush](https://csound.com/docs/manual/serialFlush.html) — flush data from a serial port  
[serialPrint](https://csound.com/docs/manual/serialPrint.html) — print data from a serial port  
[serialRead](https://csound.com/docs/manual/serialBegin.html) — read data from a serial port  
[serialWrite(_i)](https://csound.com/docs/manual/serialWrite.html) — write data to a serial port  




### FAUST OPCODES

[faustaudio](https://csound.com/docs/manual/faustaudio.html) — instantiates and runs a faust program  
[faustcompile](https://csound.com/docs/manual/faustcompile.html) — invokes compiler  
[faustdsp](https://csound.com/docs/manual/faustcompile.html) — instantiates a faust program  
[faustctl](https://csound.com/docs/manual/faustctl.html) — adjusts a given control  
[faustgen](https://csound.com/docs/manual/faustgen.html) — compiles, instantiates and runs a faust program  
[faustplay](https://csound.com/docs/manual/faustplay.html) — runs a faust program  


### SYSTEM OPCODES

[getcfg](https://csound.com/docs/manual/getcfg.html)  
[system](https://csound.com/docs/manual/system.html)/[system\_i](https://csound.com/docs/manual/system.html)  
[pwd](https://csound.com/docs/manual/pwd.html) — print working directory  
[rtclock](https://csound.com/docs/manual/rtclock.html) — reads real time clock  



### LADSPA PLUGINS

[dssiinit](https://csound.com/docs/manual/dssiinit.html)    
[dssiactivate](https://csound.com/docs/manual/dssiactivate.html)  
[dssilist](https://csound.com/docs/manual/dssilist.html)  
[dssiaudio](https://csound.com/docs/manual/dssiaudio.html)  
[dssictls](https://csound.com/docs/manual/dssictls.html)   


### keine ahnung
[mandel](https://csound.com/docs/manual/mandel.html) — Mandelbrot set formula for complex plane  
