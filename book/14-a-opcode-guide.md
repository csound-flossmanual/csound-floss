# 14 A. OPCODE GUIDE

If Csound is called from the command line with the option -z, a
list of all opcodes is printed. The total number of all opcodes is more than 1500. There are already overviews of all of Csound's opcodes in the
[Opcodes Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
and the
[Opcode Quick Reference](https://csound.com/docs/manual/MiscQuickref.html) of the
[Canonical Csound Manual](https://csound.com/docs/manual/index.html).

This guide is another attempt to provide some orientation within
Csound's wealth of opcodes — a wealth which is often frightening for beginners and still overwhelming for experienced users.

Three selections are given here, each larger than the other:

1. The **33 Most Essential Opcodes**. This selection might be useful for beginners. Learning ten opcodes a day, Csound can be learned in three days, and many full-featured Csound programs can be written with these 33 opcodes.
2. The **Top 100 Opcodes**. Adding 67 more opcodes to the first collection pushes the csound programmer to the next level. This should be sufficient for doing most of the jobs in Csound.
3. The third overview is rather extended already, and follows mostly the classification in the Csound Manual. It comprises nearly **500** opcodes.

Although these selections come from some experience in using and teaching Csound, they must remain subjective, as working in Csound can go in quite different directions.

## 33 ESSENTIAL OPCODES

### Oscillators

[poscil(3)](https://csound.com/docs/manual/poscil.html) — high precision oscillator with linear (cubic) interpolation\
[vco(2)](https://csound.com/docs/manual/vco2.html) — analog modelled oscillator

### Noise and Random

[rand](https://csound.com/docs/manual/rand.html) — standard random (noise) generator\
[random](https://csound.com/docs/manual/random.html) — random numbers between min/max\
[randomi/randomh](https://csound.com/docs/manual/randomi.html) — random numbers between min/max with interpolating or hold segments\
[seed](https://csound.com/docs/manual/seed.html) — set the global seed

### Envelopes

[linen(r)](https://csound.com/docs/manual/linen.html) — linear fade in/out

### Line Generators

[linseg(r)](https://csound.com/docs/manual/linseg.html) — one or more linear segments\
[transeg(r)](https://csound.com/docs/manual/transeg.html) — one or more user-definable segments

### Line Smooth

[sc_lag(ud)](https://csound.com/docs/manual/sc_lag.html) — exponential lag (with different smoothing times)
(traditional alternatives are [port(k)](https://csound.com/docs/manual/port.html) and [tonek](https://csound.com/docs/manual/tonek.html))

### Sound Files / Samples

[diskin](https://csound.com/docs/manual/diskin2.html) — sound file read/playback with different options

### Audio I/O

[inch](https://csound.com/docs/manual/inch.html) — read audio from one or more input channel\
[out](https://csound.com/docs/manual/out.html) — write audio to one or more output channels (starting from first hardware output)

### Control

[if](https://csound.com/docs/manual/if.html) — if clause\
[changed(2)](https://csound.com/docs/manual/changed.html) — k-rate signal change detector

### Instrument Control

[schedule(k)](https://csound.com/docs/manual/schedule.html) — perform instrument event\
[turnoff(2)](https://csound.com/docs/manual/turnoff2.html) — turn off this or another instrument

### Time

[metro(2)](https://csound.com/docs/manual/metro.html) — trigger metronome

### Software Channels

[chnset/chnget](https://csound.com/docs/manual/chnset.html) — set/get value in channel

### MIDI

[massign](https://csound.com/docs/manual/massign.html) — assign MIDI channel to Csound instrument\
[notnum](https://csound.com/docs/manual/notnum.html) — note number received\
[veloc](https://csound.com/docs/manual/veloc.html) — velocity received

### Key

[sensekey](https://csound.com/docs/manual/sensekey.html) — sense computer keyboard

### Panning

[pan2](https://csound.com/docs/manual/pan2.html) — stereo panning with different options

### Reverb

[reverbsc](https://csound.com/docs/manual/reverbsc.html) — stereo reverb after Sean Costello

### Delay

[vdelayx](https://csound.com/docs/manual/vdelayx.html) — variable delay with highest quality interpolation

### Distortion

[distort(1)](https://csound.com/docs/manual/distort.html) — distortion via waveshaping

### Filter

[butbp(hp/lp)](https://csound.com/docs/manual/butterbp.html) — second order butterworth filter

### Level

[rms](https://csound.com/docs/manual/rms.html) — RMS measurement\
[balance(2)](https://csound.com/docs/manual/balance.html) — adjust audio signal level according to comparator

### Math / Conversion

[ampdb/dbamp](https://csound.com/docs/manual/ampdb.html) — dB to/from amplitude\
[mtof/ftom](https://csound.com/docs/manual/mtof.html) — MIDI note number to/from frequency

### Print

[print(k)](https://csound.com/docs/manual/print.html) — print i/k-values

## TOP 100 OPCODES

### Oscillators / Phasors

[poscil(3)](https://csound.com/docs/manual/poscil.html) — high precision oscillator with linear (cubic) interpolation\
[vco(2)](https://csound.com/docs/manual/vco2.html) — analog modelled oscillator\
[(g)buzz](https://csound.com/docs/manual/buzz.html) — buzzer\
[mpulse](https://csound.com/docs/manual/mpulse.html) — single sample impulses\
[phasor](https://csound.com/docs/manual/phasor.html) — standard phasor

### Noise and Random

[rand](https://csound.com/docs/manual/rand.html) — standard random (noise) generator\
[(bi)rnd](https://csound.com/docs/manual/rnd.html) — simple unipolar (bipolar) random generator\
[random](https://csound.com/docs/manual/random.html) — random numbers between min/max\
[randomi/randomh](https://csound.com/docs/manual/randomi.html) — random numbers between min/max with interpolation or hold numbers\
[seed](https://csound.com/docs/manual/seed.html) — set the global seed

### Envelopes

[linen(r)](https://csound.com/docs/manual/linen.html) — linear fade in/out\
[(m)adsr](https://csound.com/docs/manual/adsr.html) — traditional ADSR envelope

### Line Generators

[linseg(r)](https://csound.com/docs/manual/linseg.html) — one or more linear segments\
[expseg(r)](https://csound.com/docs/manual/expseg.html) — one or more exponential segments\
[cosseg](https://csound.com/docs/manual/cosseg.html) — one or more cosine segments\
[transeg(r)](https://csound.com/docs/manual/transeg.html) — one or more user-definable segments

### Line Smooth

[sc_lag(ud)](https://csound.com/docs/manual/sc_lag.html) — exponential lag (with different smoothing times)

### Sound Files / Samples

[diskin](https://csound.com/docs/manual/diskin2.html) — sound file read/playback with different options\
[mp3in](https://csound.com/docs/manual/mp3in.html) — mp3 read/playback\
[loscil(3/x)](https://csound.com/docs/manual/loscil.html) — read sampled sound from a table\
[flooper(2)](https://csound.com/docs/manual/flooper.html) — crossfading looper\
[filescal/mincer](https://csound.com/docs/manual/filescal.html) — phase-locked vocoder processing with time and pitch scale\
[filelen](https://csound.com/docs/manual/filelen.html) — length of sound file

### Audio I/O

[inch](https://csound.com/docs/manual/inch.html) — read audio from one or more input channels\
[out](https://csound.com/docs/manual/out.html) — write audio to one or more output channels (starting from first hardware output)\
[outch](https://csound.com/docs/manual/outch.html) — write audio to arbitrary output channel(s)\
[monitor](https://csound.com/docs/manual/monitor.html) — monitor audio output channels

### Tables (Buffers)

[ftgen](https://csound.com/docs/manual/ftgen.html) — create any table with a GEN subroutine\
[table(i/3)](https://csound.com/docs/manual/table.html) — read from table (with linear/cubic interpolation)\
[tablew](https://csound.com/docs/manual/tablew.html) — write data to a table\
[ftsamplebank](https://csound.com/docs/manual/ftsamplebank.html) — load files in a directory to tables

### Arrays

[fillarray](https://csound.com/docs/manual/fillarray.html) — fill array with values\
[lenarray](https://csound.com/docs/manual/lenarray.html) — length of array\
[getrow/getcol](https://csound.com/docs/manual/getrow.html) — get a row/column from a two-dimensional array\
[setrow/setcol](https://csound.com/docs/manual/setrow.html) — set a row/column of a two-dimensional array

### Program Control

[if](https://csound.com/docs/manual/if.html) — if clause\
[while](https://csound.com/docs/manual/while.html) — while loop\
[changed(2)](https://csound.com/docs/manual/changed.html) — k-rate signal change detector\
[trigger](https://csound.com/docs/manual/trigger.html) — threshold trigger

### Instrument Control

[active](https://csound.com/docs/manual/active.html) — number of active instrument instances\
[maxalloc](https://csound.com/docs/manual/maxalloc.html) — set maximum number of instrument instances\
[schedule(k)](https://csound.com/docs/manual/schedule.html) — perform instrument event\
[turnoff(2)](https://csound.com/docs/manual/turnoff2.html) — turn off this or another instrument\
[nstrnum](https://csound.com/docs/manual/nstrnum.html) — number of a named instrument

### Time

[metro(2)](https://csound.com/docs/manual/metro.html) — trigger metronome\
[timeinsts](https://csound.com/docs/manual/timeinsts.html) — time of instrument instance in seconds

### Software Channels

[chnget/chnset](https://csound.com/docs/manual/chnget.html) — get/set value from/to channel\
[chnmix/chnclear](https://csound.com/docs/manual/chnmix.html) — mix value to channel / clear channel

### MIDI

[massign](https://csound.com/docs/manual/massign.html) — assign MIDI channel to Csound instrument\
[notnum](https://csound.com/docs/manual/notnum.html) — note number received\
[veloc](https://csound.com/docs/manual/veloc.html) — velocity received\
[ctrl7(14/21)](https://csound.com/docs/manual/ctrl7.html) — receive controller

### OSC

[OSClisten](https://csound.com/docs/manual/OSClisten.html) — receive messages\
[OSCraw](https://csound.com/docs/manual/OSCraw.html) — listens to all messages\
[OSCsend](https://csound.com/docs/manual/OSCsend.html) — send messages

### Key

[sensekey](https://csound.com/docs/manual/sensekey.html) — sense computer keyboard

### Panning / Spatialization

[pan2](https://csound.com/docs/manual/pan2.html) — stereo panning with different options\
[vbap](https://csound.com/docs/manual/vbap.html) — vector base amplitude panning for multichannel (also 3d)\
[bformenc1/bformdec1](https://csound.com/docs/manual/bformenc1.html) — B-format encoding/decoding

### Reverb

[freeverb](https://csound.com/docs/manual/freeverb.html) — stereo reverb after Jezar\
[reverbsc](https://csound.com/docs/manual/reverbsc.html) — stereo reverb after Sean Costello

### Spectral Processing

[pvsanal](https://csound.com/docs/manual/pvsanal.html) — spectral analysis with audio signal input\
[pvstanal](https://csound.com/docs/manual/pvstanal.html) — spectral analysis from sampled sound\
[pvsynth](https://csound.com/docs/manual/pvsynth.html) — spectral resynthesis\
[pvscale](https://csound.com/docs/manual/pvscale.html) — scale frequency components (pitch shift)\
[pvsmorph](https://csound.com/docs/manual/pvsmorph.html) — morphing between two f-signals\
[pvsftw/pvsftr](https://csound.com/docs/manual/pvsftw.html) — write/read anplitude and/or frequency data to/from tables\
[pvs2array/pvsfromarray](https://csound.com/docs/manual/pvs2tab.html) — write/read spectral data to/from arrays

### Convolution

[pconvolve](https://csound.com/docs/manual/pconvolve.html) — partitioned convolution

### Granular Synthesis

[partikkel](https://csound.com/docs/manual/partikkel.html) — complete granular synthesis

### Physical Models

[pluck](https://csound.com/docs/manual/pluck.html) — plucked string (Karplus-Strong) algorithm

### Delay

[vdelayx](https://csound.com/docs/manual/vdelayx.html) — variable delay with highest quality interpolation\
[(v)comb](https://csound.com/docs/manual/comb.html) — comb filter

### Distortion

[distort(1)](https://csound.com/docs/manual/distort.html) — distortion via waveshaping\
[powershape](https://csound.com/docs/manual/powershape.html) — waveshaping by raising to a variable exponent

### Filter

[(a)tone](https://csound.com/docs/manual/tone.html) — first order IIR low (high) pass filter\
[reson](https://csound.com/docs/manual/reson.html) — second order resonant filter\
[butbp(hp/lp)](https://csound.com/docs/manual/butterbp.html) — second order butterworth filter\
[mode](https://csound.com/docs/manual/mode.html) — mass-spring system modelled\
[zdf_ladder](https://csound.com/docs/manual/zdf_ladder.html) — zero delay feedback implementation of 4 pole ladder filter

### Level

[rms](https://csound.com/docs/manual/rms.html) — RMS measurement\
[balance(2)](https://csound.com/docs/manual/balance.html) — adjust audio signal level according to comparator

### Math / Conversion

[ampdb/dbamp](https://csound.com/docs/manual/ampdb.html) — dB to/from amplitude\
[mtof/ftom](https://csound.com/docs/manual/mtof.html) — MIDI note number to/from frequency\
[cent](https://csound.com/docs/manual/cent.html) — cent to scaling factor\
[log2](https://csound.com/docs/manual/log2.html) — return 2 base log\
[abs](https://csound.com/docs/manual/abs.html) — absolute value\
[int/frac](https://csound.com/docs/manual/int.html) — integer/fractional part\
[linlin](https://csound.com/docs/manual/linlin.html) — signal scaling

### Amplitude / Pitch Tracking

[follow(2)](https://csound.com/docs/manual/follow.html) — envelope follower\
[ptrack](https://csound.com/docs/manual/ptrack.html) — pitch tracking using STFT

### Print

[print(k)](https://csound.com/docs/manual/print.html) — print i/k-values\
[printarray](https://csound.com/docs/manual/printarray.html) — print array\
[ftprint](https://csound.com/docs/manual/ftprint.html) — print table

### File IO

[fout](https://csound.com/docs/manual/fout.html) — write out real-time audio output _(for rendered audio file output see chapter [02E](02-e-rendering-to-file.md) and [06A](06-a-record-and-play-soundfiles.md))_\
[ftsave(k)](https://csound.com/docs/manual/ftsave.html) — save table(s) to text file or binary\
[fprint(k)s](https://csound.com/docs/manual/fprints.html) — formatted printing to file\
[readf(i)](https://csound.com/docs/manual/readf.html) — reads an external file line by line\
[directory](https://csound.com/docs/manual/directory.html) — files in a directory as string array

### Signal Type Conversion

[i(k) / k(a) / a(k)](https://csound.com/docs/manual/opi.html) — i-value from k-signal / k-signal from a-signal / a-signal from k-signal

## EXTENDED OPCODE OVERVIEW IN CATEGORIES

### I. AUDIO I/O AND SOUND FILES

#### AUDIO I/O

##### General Settings and Queries

_Note that modern Csound frontends handle most of the Audio I/O settings. For command line usage, see [this](https://csound.com/docs/manual/CommandFlagsCategory.html#FlagsCatMinusLowerIadc) section in the Csound Options._

[sr](https://csound.com/docs/manual/sr.html) — set sample rate (default=44100)\
[ksmps](https://csound.com/docs/manual/ksmps.html) — set block (audio vector) size (default=10) _(setting to power-of-two (e.g. 32/64/128) is recommended)_\
[nchnls](https://csound.com/docs/manual/nchnls.html) — set number of I/O channels (default=1)\
[nchnls_i](https://csound.com/docs/manual/nchnls_i.html) — set number of input channels if different from output\
[0dbfs](https://csound.com/docs/manual/Zerodbfs.html) — set zero dB full scale (default=32767) _(setting 0dbfs=1 is strongly recommended)_\
[nchnls_hw](https://csound.com/docs/manual/nchnls_hw.html) — report number of channels in hardware\
[setksmps](https://csound.com/docs/manual/setksmps.html) — set local ksmps in User-Defined-Opcodes or instruments

##### Signal Input and Output

[inch](https://csound.com/docs/manual/inch.html) — read audio from one or more input channels\
[out](https://csound.com/docs/manual/out.html) — write audio to one or more output channels (starting from first hardware output)\
[outch](https://csound.com/docs/manual/outch.html) — write audio to arbitrary output channel(s)\
[monitor](https://csound.com/docs/manual/monitor.html) — monitor audio output channels

#### SOUND FILES AND SAMPLES

##### Sound File Playback

[diskin](https://csound.com/docs/manual/diskin2.html) — sound file read/playback with different options\
[mp3in](https://csound.com/docs/manual/mp3in.html) — mp3 read/playback

##### Sample Playback

[(GEN01)](https://csound.com/docs/manual/GEN01.html) — load file into table\
[loscil(3/x)](https://csound.com/docs/manual/loscil.html) — read sampled sound from a table\
[lposcil](https://csound.com/docs/manual/lposcil.html) — read sampled sound with loops\
[flooper(2)](https://csound.com/docs/manual/flooper.html) — crossfading looper

##### Time Stretch and Pitch Shift

[filescal](https://csound.com/docs/manual/filescal.html) — phase-locked vocoder processing with time and pitch scale\
[mincer](https://csound.com/docs/manual/mincer.html) — phase-locked vocoder processing on table loaded sound\
[mp3scal](https://csound.com/docs/manual/mp3scal.html) — tempo scaling of mp3 files\
[paulstretch](https://csound.com/docs/manual/paulstretch.html) — extreme time stretch\
[sndwarp(st)](https://csound.com/docs/manual/sndwarp.html) — granular-based time and pitch modification\
\
_NOTE_ that any granular synthesis opcode and some of the pvs opcodes (pvstanal, pvsbufred) can also be used for this approach

##### Soundfonts and Fluid Opcodes

see overview [here](https://csound.com/docs/manual/SiggenSample.html#SiggenSampleSF)

##### Sound File Queries

[filelen](https://csound.com/docs/manual/filelen.html) — length of sound file\
[filesr](https://csound.com/docs/manual/filesr.html) — sample rate of sound file\
[filenchnls](https://csound.com/docs/manual/filenchnls.html) — number of channels in sound file\
[filepeak](https://csound.com/docs/manual/filepeak.html) — peak in sound file\
[filebit](https://csound.com/docs/manual/filebit.html) — bit depth in sound file\
[filevalid](https://csound.com/docs/manual/filevalid.html) — check whether file exists\
[mp3len](https://csound.com/docs/manual/mp3len.html) — length of mp3 file

##### Directories

[directory](https://csound.com/docs/manual/directory.html) — files in a directory as string array\
[ftsamplebank](https://csound.com/docs/manual/ftsamplebank.html) — load files in a directory to tables

##### Sound File Output

[fout](https://csound.com/docs/manual/fout.html) — write out real-time audio output _(for rendered audio file output see chapter [02E](02-e-rendering-to-file.md) and [06A](06-a-record-and-play-soundfiles.md))_

### II. SIGNAL GENERATORS

#### OSCILLATORS AND PHASORS

##### Standard Oscillators

[poscil(3)](https://csound.com/docs/manual/poscil.html) — high precision oscillator with linear (cubic) interpolation\
[oscili(3)](https://csound.com/docs/manual/oscili.html) — standard oscillator with linear (cubic) interpolation\
[lfo](https://csound.com/docs/manual/lfo.html) — low frequency oscillator of various shapes\
[oscilikt](https://csound.com/docs/manual/oscilikt.html) — interpolating oscillator with k-rate changeable tables\
[more ...](https://csound.com/docs/manual/SiggenBasic.html) — more standard oscillators ...\
_Note_: [oscil](https://csound.com./docs/manual/oscil.html) is not recommended as it has integer indexing which can result in low quality

##### Dynamic Spectrum Oscillators

[(g)buzz](https://csound.com/docs/manual/buzz.html) — buzzer\
[mpulse](https://csound.com/docs/manual/mpulse.html) — single sample impulses\
[vco(2)](https://csound.com/docs/manual/vco2.html) — analog modelled oscillator\
[squinewave](https://csound.com/docs/manual/squinewave.html) — shape-shifting oscillator with hardsync

##### Phasors

[phasor](https://csound.com/docs/manual/phasor.html) — standard phasor\
[syncphasor](https://csound.com/docs/manual/syncphasor.html) — phasor with sync I/O\
[ephasor](https://csound.com/docs/manual/ephasor.html) — phasor with additional exponential decay output\
[sc_phasor](https://csound.com/docs/manual/sc_phasor.html) — resettable phasor

#### RANDOM AND NOISE GENERATORS

##### Seed

[seed](https://csound.com/docs/manual/seed.html) — set the global seed\
[getseed](https://csound.com/docs/manual/getseed.html) — get the global seed

##### Noise Generators

[rand](https://csound.com/docs/manual/rand.html) — standard random (noise) generator\
[pinker](https://csound.com/docs/manual/pinker.html) — pinkt noise after Stefan Stenzel\
[pinkish](https://csound.com/docs/manual/pinkish.html) — pink noise generator\
[fractalnoise](https://csound.com/docs/manual/fractalnoise.html) — fractal noise generator\
[gauss(i)](https://csound.com/docs/manual/gauss.html) — Gaussian distribution random generator\
[gendy(c/x)](https://csound.com/docs/manual/gendy.html) — dynamic stochastic waveform synthesis conceived by Iannis Xenakis

##### General Random Generators

[rnd](https://csound.com/docs/manual/rnd.html) — simple unipolar random generator\
[birnd](https://csound.com/docs/manual/birnd.html) — simple bipolar random generator\
[random](https://csound.com/docs/manual/random.html) — random numbers between min/max\
[rnd31](https://csound.com/docs/manual/rnd31.html) — random generator with controllable distributions\
[dust(2)](https://csound.com/docs/manual/dust.html) — random impulses\
[gausstrig](https://csound.com/docs/manual/gausstrig.html) — random impulses around a frequency\
[lorenz](https://csound.com/docs/manual/lorenz.html) — implements lorenz system of equations\
[urd](https://csound.com/docs/manual/urd.html) — user-defined random distributions

##### Random Generators with Interpolating or Hold Numbers

[randi(c)](https://csound.com/docs/manual/randi.html) — bipolar random generator with linear (cubic) interpolation\
[randh](https://csound.com/docs/manual/randh.html) — bipolar random generator with hold numbers\
[randomi](https://csound.com/docs/manual/randomi.html) — random numbers between min/max with interpolation\
[randomh](https://csound.com/docs/manual/randomh.html) — random numbers between min/max with hold numbers\
[more ...](https://csound.com/docs/manual/SiggenNoise.html) — more random generators ...

#### ENVELOPES AND LINES

###### Simple Standard Envelopes

[linen](https://csound.com/docs/manual/linen.html) — linear fade in/out\
[linenr](https://csound.com/docs/manual/linenr.html) — fade out at release\
[(x)adsr](https://csound.com/docs/manual/adsr.html) — ADSR envelope with linear (exponential) lines\
[m(x)adsr](https://csound.com/docs/manual/madsr.html) — ADSR for MIDI notes with linear (exponential) lines\
[more](https://csound.com/docs/manual/SiggenEnvelope.html) — more standard envelopes ...

#### Envelopes by Linear and Exponential Generators

[linseg](https://csound.com/docs/manual/linseg.html) — one or more linear segments\
[expseg](https://csound.com/docs/manual/expseg.html) — one or more exponential segments\
[transeg](https://csound.com/docs/manual/transeg.html) — one or more user-definable segments\
[linsegr](https://csound.com/docs/manual/linsegr.html) — linear segments with final release segment\
[expsegr](https://csound.com/docs/manual/expsegr.html) — exponential segments with release\
[transegr](http://en.flossmanuals.net/bin/view/Csound/transegr) — user-definable segments with release\
[bpf](https://csound.com/docs/manual/bpf.html) — break point function with linear interpolation\
[jitter(2)](https://csound.com/docs/manual/jitter.html) — randomly segmented line\
[jspline](https://csound.com/docs/manual/jspline.html) — jitter-spline generated line\
[loopseg](https://csound.com/docs/manual/loopseg.html) — loops linear segments\
[rspline](https://csound.com/docs/manual/rspline.html) — random spline curves\
[more](https://csound.com/docs/manual/SiggenLineexp.html) — more envelope generators ...

##### Signal Smooth

[port(k)](https://csound.com/docs/manual/port.html) — portamento-like smoothing for control signals (with variable half-time)\
[sc_lag(ud)](https://csound.com/docs/manual/sc_lag.html) — exponential lag (with different smoothing times)\
[(t)lineto](https://csound.com/docs/manual/lineto.html) — generate glissando from control signal

#### PHYSICAL MODELS AND FM INSTRUMENTS

##### Waveguide Physical Modelling

see [here](https://csound.com/docs/manual/SiggenWavguide.html)\
and [here](https://csound.com/docs/manual/SigmodWavguide.html)

##### Frequency Modulation

[foscili](https://csound.com/docs/manual/foscili.html) — basic FM oscillator\
[cross(p/f)m(i)](https://csound.com/docs/manual/crossfm.html) — two mutually
frequency and/or phase modulated oscillators _(see also chapter [04D](04-d-frequency-modulation.md))_

##### FM Instrument Models

see
[here](https://csound.com/docs/manual/SiggenFmsynth.html)

### III. SIGNAL MODIFIERS

#### DELAYS

##### Audio Delays

[delay](https://csound.com/docs/manual/delay.html) — simple constant audio delay\
[vdelay(3)](https://csound.com/docs/manual/vdelay.html) — variable delay with linear (cubic) interpolation\
[vdelayx](https://csound.com/docs/manual/vdelayx.html) — variable delay with highest quality interpolation\
[vdelayxw](https://csound.com/docs/manual/vdelayxw.html) — variable delay changing write rather than read position\
[delayr](https://csound.com/docs/manual/delayr.html) — establishe delay line and read from it\
[delayw](https://csound.com/docs/manual/delayw.html) — write into delay line\
[deltapxw](https://csound.com/docs/manual/deltapxw.html) — write into a delay line with high quality interpolation\
[deltap(i/3)](https://csound.com/docs/manual/deltap.html) — tap a delay line with linear (cubic) interpolation\
[deltapx](https://csound.com/docs/manual/deltapx.html) — tap a delay line with highest quality interpolation\
[deltapn](https://csound.com/docs/manual/deltapn.html) — tap a delay line at variable offsets\
[multitap](https://csound.com/docs/manual/multitap.html) — multiple tap delays with different gains\
[(v)comb](https://csound.com/docs/manual/comb.html) — comb filter

##### Control Signal Delays

[delayk](https://csound.com/docs/manual/delayk.html) — simple constant delay for k-signals\
[vdel_k](https://csound.com/docs/manual/delayk.html) — variable delay for k-signals

#### FILTERS

Compare the extensive [Standard Filters](https://csound.com/docs/manual/SigmodStandard.html)
and [Specialized Filters](https://csound.com/docs/manual/SigmodSpeciali.html)
overviews in the Csound Manual.

##### Low Pass Filters

[tone](https://csound.com/docs/manual/tone.html) — first order IIR filter\
[tonex](https://csound.com/docs/manual/tonex.html) — serial connection of several tone filters\
[butlp](https://csound.com/docs/manual/butterlp.html) — second order IIR filter\
[clfilt](https://csound.com/docs/manual/clfilt.html) — adjustable types and poles

##### High Pass Filters

[atone](https://csound.com/docs/manual/atone.html) — first order IIR filter\
[atonex](https://csound.com/docs/manual/atonex.html) — serial connection of several atone filters\
[buthp](https://csound.com/docs/manual/butterhp.html) — second order IIR filer\
[clfilt](https://csound.com/docs/manual/clfilt.html) — adjustable types and poles\
[dcblock(2)](https://csound.com/docs/manual/dcblock.html) — removes DC offset

##### Band Pass And Resonant Filters

[reson](https://csound.com/docs/manual/reson.html) — second order resonant filter\
[resonx/resony](https://csound.com/docs/manual/resonx.html) — serial/parallel connection of several reson filters\
[resonr/resonz](https://csound.com/docs/manual/resonr.html) — variants of the reson filter\
[butbp](https://csound.com/docs/manual/butterbp.html) — second order butterworth filter\
[mode](https://csound.com/docs/manual/mode.html) — mass-spring system modelled\
[fofilter](https://csound.com/docs/manual/fofilter.html) — formant filter

##### Band Reject Filters

[areson](https://csound.com/docs/manual/areson.html) — first order IIR filter\
[butbr](https://csound.com/docs/manual/butterbp.html) — second order IIR filter

##### Equalizer

[eqfil](https://csound.com/docs/manual/eqfil.html) — equilizer filter\
[rbjeq](https://csound.com/docs/manual/rbjeq.html) — parametric equilizer and filter\
[exciter](https://csound.com/docs/manual/exciter.html) — non-linear filter to add brilliance

#### REVERB

[freeverb](https://csound.com/docs/manual/freeverb.html) — stereo reverb after Jezar\
[reverbsc](https://csound.com/docs/manual/reverbsc.html) — stereo reverb after Sean Costello\
[reverb](https://csound.com/docs/manual/reverb.html) — simple reverb\
[nreverb](https://csound.com/docs/manual/nreverb.html) — reverb with adjustable number of units\
[babo](https://csound.com/docs/manual/babo.html) — physical model reverberator\
[(v)alpass](https://csound.com/docs/manual/alpass.html) — reveberates with a flat frequency response
_Note_: Convolution reverb can be performed with\
[pconvolve](https://csound.com/docs/manual/pconvolve.html) and similar opcodes.

#### DISTORTION AND SIMILAR MODIFICATIONS

##### Distortion and Wave Shaping

[distort(1)](https://csound.com/docs/manual/distort.html) — distortion via waveshaping\
[powershape](https://csound.com/docs/manual/powershape.html) — waveshaping by raising to a variable exponent\
[polynomial](https://csound.com/docs/manual/polynomial.html) — polynominal over audio input signal\
[chebyshevpoly](https://csound.com/docs/manual/chebyshevpoly.html) — chebyshev polynominals over audio input signal\
[fold](https://csound.com/docs/manual/fold.html) — adds artificial foldover to an audio signal\
[pdclip](https://csound.com/docs/manual/pdclip.html) — linear clipping of audio signal

##### Flanging, Phasing, Phase Shaping

[flanger](https://csound.com/docs/manual/flanger.html) — flanger\
[phaser1(2)](https://csound.com/docs/manual/phaser1.html) — first/second order allpass filters in series\
[pdhalf(y)](https://csound.com/docs/manual/pdhalf.html) — phase distortion synthesis

##### Sample Level Operations

[samphold](https://csound.com/docs/manual/samphold.html) — performs sample-and-hold\
[vaget](https://csound.com/docs/manual/vaget.html) — audio vector read access\
[vaset](https://csound.com/docs/manual/vaset.html) — audio vector write access\
[framebuffer](https://csound.com/docs/manual/framebuffer.html) — reads/writes audio to/from array\
[shiftin/out](https://csound.com/docs/manual/shiftin.html) — writes/reads the content of an audio variable to/from array

##### Other

[doppler](https://csound.com/docs/manual/doppler.html) — doppler shift\
[diff](https://csound.com/docs/manual/diff.html) — modify a signal by differentiation\
[integ](https://csound.com/docs/manual/integ.html) — modify a signal by integration\
[mirror](https://csound.com/docs/manual/mirror.html) — reflects a signal which exceeds boundaries\
[select](https://csound.com/docs/manual/select.html) — select sample value based on audio-rate comparisons\
[wrap](https://csound.com/docs/manual/wrap.html) — wraps around a signal which exceeds boundaries\
[waveset](https://csound.com/docs/manual/waveset.html) — repeating cycles of input audio signal\
[sndloop](https://csound.com/docs/manual/sndloop.html) — looping on audio input signal\
[mandel](https://csound.com/docs/manual/mandel.html) — Mandelbrot set formula for complex plane

#### SIGNAL MEASUREMENT AND DYNAMIC PROCESSING

##### Amplitude Measurement and Envelope Following

[rms](https://csound.com/docs/manual/rms.html) — RMS measurement\
[peak](https://csound.com/docs/manual/peak.html) — maintains highest value received\
[max_k](https://csound.com/docs/manual/max_k.html) — local maximum/minimum of audio signal\
[follow(2)](https://csound.com/docs/manual/follow.html) — envelopoe follower\
[vactrol](https://csound.com/docs/manual/vactrol.html) — envelope follower

##### Pitch Estimation (Pitch Tracking)

[ptrack](https://csound.com/docs/manual/ptrack.html) — pitch tracking using STFT\
[pitch](https://csound.com/docs/manual/pitch.html) — pitch tracking using constant-Q DFT\
[pvspitch](https://csound.com/docs/manual/pvspitch.html) — pitch/amplitude tracking of a PVS signal\
[pvscent](https://csound.com/docs/manual/pvscent.html) — spectral centroid of a PVS signal

##### Dynamic Processing

[balance(2)](https://csound.com/docs/manual/balance.html) — adjust audio signal level according to comparator\
[compress(2)](https://csound.com/docs/manual/compress.html) — compress audio signal\
[dam](https://csound.com/docs/manual/dam.html) — dynamic compressor/expander\
[clip](https://csound.com/docs/manual/clip.html) — clips a signal to a predifined limit\
[limit(1)](https://csound.com/docs/manual/limit.html) — sets lower and upper limit

#### SPATIALIZATION

##### Amplitude Panning

[pan2](https://csound.com/docs/manual/pan2.html) — stereo panning with different options\
[vbap](https://csound.com/docs/manual/vbap.html) — vector base amplitude panning for multichannel (also 3d)

##### Ambisonics

[bformenc1](https://csound.com/docs/manual/bformenc1.html) — B-format encoding\
[bformdec1](https://csound.com/docs/manual/bformdec1.html) — B-format decoding

##### Binaural / HRTF

[hrtfstat](https://csound.com/docs/manual/hrtfstat.html) — static 3d binaural audio for headphones\
[hrtfmove(2)](https://csound.com/docs/manual/hrtfmove.html) — dynamic 3d binaural audio\
[hrtfearly](https://csound.com/docs/manual/hrtfearly.html) — early reflections in a HRTF room\
[hrtfreverb](https://csound.com/docs/manual/hrtfreverb.html) — binaural diffuse-field reverberator

##### Other

[spat3d](https://csound.com/docs/manual/spat3d.html) — positioning in 3d space with optional simulation of room acoustics

### IV. GRANULAR SYNTHESIS AND SPECTRAL PROCESSING

#### GRANULAR SYNTHESIS

[partikkel](https://csound.com/docs/manual/partikkel.html) — complete granular synthesis\
[fof(2)](https://csound.com/docs/manual/fof.html) — formant orientated granular synthesis\
[fog](https://csound.com/docs/manual/fog.html) — fof synthesis with samples sound\
[diskgrain](https://csound.com/docs/manual/diskgrain.html) — synchronous granular synthesis with sound file\
[grain(2/3)](https://csound.com/docs/manual/grain.html) — granular textures\
[granule](https://csound.com/docs/manual/granule.html) — complex granular textures\
[syncgrain/syncloop](https://csound.com/docs/manual/syncgrain.html) — synchronous granular synthesis\
[others ...](https://csound.com/docs/manual/SiggenGranular.html) — other granular synthesis
opcodes ... _(see also chapter [05G](05-g-granular-synthesis.md))_

#### SPECTRAL PROCESSING WITH PVS OPCODES

##### Environment

[pvsinit](https://csound.com/docs/manual/pvsinit.html) — initializes f-signal to zero\
[pvsinfo](https://csound.com/docs/manual/pvsinfo.html) — get information about f-sig\
[pvsin](https://csound.com/docs/manual/pvsin.html) — retrieve f-signal from input software bus\
[pvsout](https://csound.com/docs/manual/pvsout.html) — writing f-signal to output software bus

##### Real-time Analysis and Resynthesis

[pvsanal](https://csound.com/docs/manual/pvsanal.html) — spectral analysis with audio signal input\
[pvstanal](https://csound.com/docs/manual/pvstanal.html) — spectral analysis from sampled sound\
[pvstrace](https://csound.com/docs/manual/pvstrace.html) — retain only N loudest bins\
[pvsynth](https://csound.com/docs/manual/pvsynth.html) — spectral resynthesis\
[pvsadsyn](https://csound.com/docs/manual/pvsadsynth.html) — spectral resynthesis using fast oscillator bank

##### Writing Spectral Data to a File and Reading from it

[pvsfwrite](https://csound.com/docs/manual/pvsfwrite.html) — writing f-sig to file\
[pvsfread](https://csound.com/docs/manual/pvsfread.html) — read f-sig data from a file loaded into memory\
[pvsdiskin](https://csound.com/docs/manual/pvsdiskin.html) — read f-sig data directly from disk

##### Writing Spectral Data to a Buffer or Array and Reading from it

[pvsbuffer](https://csound.com/docs/manual/pvsbuffer.html) — create and write f-sig to circular buffer\
[pvsbufread(2)](https://csound.com/docs/manual/pvsbufread.html) — read f-sig from pvsbuffer\
[pvsftw](https://csound.com/docs/manual/pvsftw.html) — write anplitude and/or frequency data to tables\
[pvsftr](https://csound.com/docs/manual/pvsftr.html) — read amplitude and/or frequency data from table\
[pvs2array(pvs2tab)](https://csound.com/docs/manual/pvs2tab.html) — write spectral data to arrays\
[pvsfromarray(tab2pvs)](https://csound.com/docs/manual/tab2pvs.html) — read spectral data from arrays

##### Processing Spectral Signals

[pvsbin](https://csound.com/docs/manual/pvsbin.html) — obtain amp/freq from one bin\
[pvscent](https://csound.com/docs/manual/pvscent.html) — spectral centroid of f-signal\
[pvsceps](https://csound.com/docs/manual/pvsceps.html) — cepstrum of f-signal\
[pvscale](https://csound.com/docs/manual/pvscale.html) — scale frequency components (pitch shift)\
[pvshift](https://csound.com/docs/manual/pvshift.html) — shift frequency compnents\
[pvsbandp](https://csound.com/docs/manual/pvsbandp.html) — spectral band pass filter\
[pvsbandr](https://csound.com/docs/manual/pvsbandr.html) — spectral band reject filter\
[pvsmix](https://csound.com/docs/manual/pvsmix.html) — mix two f-signals\
[pvscross](https://csound.com/docs/manual/pvscross.html) — cross synthesis\
[pvsfilter](https://csound.com/docs/manual/pvsfilter.html) — another cross synthesis\
[pvsvoc](https://csound.com/docs/manual/pvsvoc.html) — phase vocoder\
[pvsmorph](https://csound.com/docs/manual/pvsmorph.html) — morphing between two f-signals\
[pvsfreeze](https://csound.com/docs/manual/pvsfreeze.html) — freeze amp/freq time functions\
[pvsmaska](https://csound.com/docs/manual/pvsmaska.html) — modify amplitudes using table\
[pvstencil](https://csound.com/docs/manual/pvstencil.html) — transform f-sig according to masking table\
[pvsarp](https://csound.com/docs/manual/pvsarp.html) — arpeggiate spectral components of f-sig\
[pvsblur](https://csound.com/docs/manual/pvsblur.html) — average amp/freq time functions\
[pvsmooth](https://csound.com/docs/manual/pvsmooth.html) — smooth amp/freq time functions\
[pvslock](https://csound.com/docs/manual/pvslock.html) — frequency lock input f-signal\
[pvswarp](https://csound.com/docs/manual/pvswarp.html) — warp the spectral envelope of an f-signal

#### OTHER SPECTRAL TRANSFORM

[dct(inv)](https://csound.com/docs/manual/dct.html) — (inverse) discrete cosine transformation\
[fft(inv)](https://csound.com/docs/manual/fft.html) — (inverse) complex-to-complex FFT\
[r2c](https://csound.com/docs/manual/r2c.html) — real to complex conversion\
[mags](https://csound.com/docs/manual/mags.html) — magnitudes of a complex-numbered array\
[phs](https://csound.com/docs/manual/phs.html) — obtains phases of a complex-numbered array\
[pol2rect](https://csound.com/docs/manual/pol2rect.html) — polar to rectangular conversion of arrays\
[rect2pol](https://csound.com/docs/manual/rect2pol.html) — rectangular to polar format conversion\
[rfft](https://csound.com/docs/manual/rfft.html) — FFT of real-value array\
[rifft](https://csound.com/docs/manual/rifft.html) — complex-to-real inverse FFT\
[unwrap](https://csound.com/docs/manual/unwrap.html) — unwraps phase values array\
[fmanal](https://csound.com/docs/manual/fmanal.html) — AM/FM analysis from quadrature signal\
[hilbert(2)](https://csound.com/docs/manual/hilbert.html) — Hilbert transform\
[mfb](https://csound.com/docs/manual/mfb.html) — mel scale filterbank for spectral magnitudes

#### CONVOLUTION

[pconvolve](https://csound.com/docs/manual/pconvolve.html) — partitioned convolution\
[ftconv](https://csound.com/docs/manual/ftconv.html) — table-based partitioned convolution\
[dconv](https://csound.com/docs/manual/dconv.html) — direct convolution\
[tvconv](https://csound.com/docs/manual/tvconv.html) — time-varying convolution

### V. DATA

#### BUFFERS / FUNCTION TABLES

##### Creating/Deleting Function Tables (Buffers)

[ftgen](https://csound.com/docs/manual/ftgen.html) — create any table with a GEN subroutine\
[GEN Routines](https://csound.com/docs/manual/ScoreGenRef.html) — overview of subroutines\
[ftfree](https://csound.com/docs/manual/ftfree.html) — delete function table\
[ftgenonce](https://csound.com/docs/manual/ftgenonce.html) — create table inside an instrument\
[ftgentmp](https://csound.com/docs/manual/ftgentmp.html) — create table bound to instrument instance\
[tableicopy](https://csound.com/docs/manual/tableicopy.html) — copy table from other table\
[copya2ftab](https://csound.com/docs/manual/copya2ftab.html) — copy array to a function table

##### Writing to Tables

[tablew](https://csound.com/docs/manual/tablew.html) — write data to a table\
[tablewkt](https://csound.com/docs/manual/tablewkt.html) — write to k-rate changeable tables\
[ftslice](https://csound.com/docs/manual/ftslice.html) — copy a slice from one table to another table\
[modmatrix](https://csound.com/docs/manual/modmatrix.html) — modulation matrix reading from and writing to tables\
[ftmorf](https://csound.com/docs/manual/ftmorf.html) — morph between tables and write the result

##### Reading From Tables

[table(i/3)](https://csound.com/docs/manual/table.html) — read from table (with linear/cubic interpolation)\
[tablexkt](https://csound.com/docs/manual/tablexkt.html) — reads function tables with linear/cubic/sinc interpolation

##### Saving Tables to Files

[ftsave(k)](https://csound.com/docs/manual/ftsave.html) — save table(s) to text file or binary\
[ftaudio](https://csound.com/docs/manual/ftaudio.html) — save table data to audio file

##### Loading Tables From Files

[ftload(k)](https://csound.com/docs/manual/ftload.html) — load table(s) from file written with ftsave\
[GEN23](https://csound.com/docs/manual/GEN23.html) — read numeric values from a text file\
[GEN01](https://csound.com/docs/manual/GEN01.html) — load audio file into table\
[GEN49](https://csound.com/docs/manual/GEN49.html) — load mp3 sound file into table

##### Writing Tables to Arrays

[copyf2array](https://csound.com/docs/manual/copyf2array.html) — copy function table to an array\
[tab2array](https://csound.com/docs/manual/tab2array.html) — copy a slice from a table to an array

##### Table Queries

[ftlen](https://csound.com/docs/manual/ftlen.html) — length of a table\
[ftchnls](https://csound.com/docs/manual/ftchnls.html) — number of channels of a stored sound\
[ftsr](https://csound.com/docs/manual/ftsr.html) — sample rate of a stored sound\
[nsamp](https://csound.com/docs/manual/nsamp.html) — number of sample frames in a table\
[tabsum](https://csound.com/docs/manual/tabsum.html) — sum of table values\
[getftargs](https://csound.com/docs/manual/getftargs.html) — get arguments of table creation

#### ARRAYS

##### Creation

[init](https://csound.com/docs/manual/init.html) — initiatlise array\
[fillarray](https://csound.com/docs/manual/fillarray.html) — fill array with values\
[genarray(\_i)](https://csound.com/docs/manual/genarray.html) — create array with artithmetic sequence\
[=](https://csound.com/docs/manual/assign.html) — create or reset array as copy of another array

##### Analyse

[lenarray](https://csound.com/docs/manual/lenarray.html) — length of array\
[minarray](https://csound.com/docs/manual/minarray.html) — minimum value in array\
[maxarray](https://csound.com/docs/manual/maxarray.html) — maximum value in array\
[sumarray](https://csound.com/docs/manual/sumarray.html) — sum of values in array\
[cmp](https://csound.com/docs/manual/cmp.html) — compare two arrays

##### Content Modification

[scalearray](https://csound.com/docs/manual/scalearray.html) — scale values in an array\
[sorta(d)](https://csound.com/docs/manual/sorta.html) — sort an array in ascending (descending) order\
[limit(1)](https://csound.com/docs/manual/limit.html) — limit array values\
[(de)interleave](https://csound.com/docs/manual/interleave.html) — combine/split arrays

##### Size Modification

[slicearray](https://csound.com/docs/manual/slicearray.html) — take slice of an array\
[trim(\_i)](https://csound.com/docs/manual/trim.html) — adjust size of one-dimensional array

##### Format Interchange

[copya2ftab](https://csound.com/docs/manual/copya2ftab.html) — copy array to a function table\
[copyf2array](https://csound.com/docs/manual/copyf2array.html) — copy function table to an array\
[tab2array](https://csound.com/docs/manual/tab2array.html) — copy a slice from a table to an array\
[pvs2array(pvs2tab)](https://csound.com/docs/manual/pvs2tab.html) — write spectral data to arrays\
[pvsfromarray(tab2pvs)](https://csound.com/docs/manual/tab2pvs.html) — read spectral data from arrays

##### Dimension Interchange

[reshapearray](https://csound.com/docs/manual/reshapearray.html) — change dimensions of an array\
[getrow](https://csound.com/docs/manual/getrow.html) — get a row from a two-dimensional array\
[getcol](https://csound.com/docs/manual/getcol.html) — get a column from a two-dimensional array\
[setrow](https://csound.com/docs/manual/setrow.html) — set a row of a two-dimensional array\
[setcol](https://csound.com/docs/manual/setcol.html) — set a column of a two-dimensional array\
[getrowlin](https://csound.com/docs/manual/getrowlin.html) — copy a row from a 2D array and interpolate between rows

##### Functions

See chapter [03E](03-e-arrays.md) for a list of mathematical function which can directly be applied to arrays.

#### STRINGS

##### Creation

[=](https://csound.com/docs/manual/assign.html) — direct assignment\
[sprintf(k)](https://csound.com/docs/manual/sprintf.html) — string variable from format string\
[strget](https://csound.com/docs/manual/strget.html) — string variable from strset number or p-field\
[strcpy(k)](https://csound.com/docs/manual/strcpy.html) — string copy at i- or k-time\
[strsub](https://csound.com/docs/manual/strsub.html) — string as part of another string

##### String Queries

[strcmp(k)](https://csound.com/docs/manual/strcmp.html) — compare strings\
[strlen(k)](https://csound.com/docs/manual/strlen.html) — length of string\
[strindex(k)](https://csound.com/docs/manual/strindex.html) — first occurrence of string1 in string2\
[strrindex(k)](https://csound.com/docs/manual/strrindex.html) — last occurrence of string1 in string2\
[strchar(k)](https://csound.com/docs/manual/strchar.html) — return ASCII code of character in string

##### String Manipulation

[strcat(k)](https://csound.com/docs/manual/strcat.html) — concatenate strings\
[strstrip](https://csound.com/docs/manual/strstrip.html) — removes white space from both ends of a string\
[strlower(k)](https://csound.com/docs/manual/strlower.html) — convert string to lower case\
[strupper(k)](https://csound.com/docs/manual/strupper.html) — convert string to upper case

##### Conversion and Assignment

[S](https://csound.com/docs/manual/ops.html) — number to string\
[strtod(k)](https://csound.com/docs/manual/strtod.html) — string to number\
[strset](https://csound.com/docs/manual/strset.html) — link string with a numeric value

#### FILES

_Note: for sound files see SOUND FILES AND SAMPLES_

[fprint(k)s](https://csound.com/docs/manual/fprints.html) — formatted printing to file\
[dumpk](https://csound.com/docs/manual/dumpk.html) — write k-signal to file\
[hdf5write](https://csound.com/docs/manual/hdf5write.html) — write signals and arrays to hdf5 file\
[hdf5read](https://csound.com/docs/manual/hdf5read.html) — read signals and arrays from hdf5 file\
[readf(i)](https://csound.com/docs/manual/readf.html) — reads an external file line by line\
[readk](https://csound.com/docs/manual/readk.html) — read k-signal from file

### VI. PROGRAM FLOW

#### INSTRUMENTS AND VARIABLES

##### Instances and Allocation

[active](https://csound.com/docs/manual/active.html) — number of active instrument instances\
[maxalloc](https://csound.com/docs/manual/maxalloc.html) — set maximum number of instrument instances\
[prealloc](https://csound.com/docs/manual/prealloc.html) — allocate memory before running an instrument\
[subinstr](https://csound.com/docs/manual/subinstr.html) — instrument to be used as opcode

##### Variable Initialization and Conversion

[init](https://csound.com/docs/manual/init.html) — inialize variables\
[reinit](https://csound.com/docs/manual/reinit.html) — re-initialize i-variable\
[i(k)](https://csound.com/docs/manual/opi.html) — i-value from k-signal\
[k(a)](https://csound.com/docs/manual/opk.html) — k-signal from a-signal\
[a(k)](https://csound.com/docs/manual/opa.html) — a-signal from k-signal

##### On-the-fly Evaluation and Compilation

[evalstr](https://csound.com/docs/manual/evalstr.html) — evaluate Csound code as string\
[compilecsd](https://csound.com/docs/manual/compilecsd.html) — compile new instruments from csd file\
[compileorc](https://csound.com/docs/manual/compileorc.html) — compile new instruments from raw orc file\
[compilestr](https://csound.com/docs/manual/compilestr.html) — compile new instruments from string

##### Named Instruments

[nstrnum](https://csound.com/docs/manual/nstrnum.html) — number of a named instrument\
[nstrstr](https://csound.com/docs/manual/nstrstr.html) — name of an instrument

#### TIME, CONDITIONS, LOOPS, SCORE ACCESS

##### Time Reading

[times](https://csound.com/docs/manual/times.html) — absolute time in seconds\
[timek](https://csound.com/docs/manual/timek.html) — absolute time in k-cycles\
[timeinsts](https://csound.com/docs/manual/timeinsts.html) — time of instrument instance in seconds\
[timeinstk](https://csound.com/docs/manual/timeinstk.html) — time of instrument instance in k-cycles

##### Conditions and Loops

[if](https://csound.com/docs/manual/if.html) — if clause\
[(i/k)goto](https://csound.com/docs/manual/goto.html) — jump in code\
[while](https://csound.com/docs/manual/while.html) — while loop\
[changed(2)](https://csound.com/docs/manual/changed.html) — k-rate signal change detector

##### Score Parameter Access

[p(index)](https://csound.com/docs/manual/p.html) — value in given p-field\
[pset](https://csound.com/docs/manual/pset.html) — inialize p-field values\
[passign](https://csound.com/docs/manual/passign.html) — assign p-field values to variables or array\
[pcount](https://csound.com/docs/manual/pcount.html) — number of p-fields in instrument

#### EVENTS AND TRIGGERS

##### Events

[schedule(k)](https://csound.com/docs/manual/schedule.html) — perform instrument event\
[event(\_i)](https://csound.com/docs/manual/event.html) — perform any score event\
[scoreline(\_i)](https://csound.com/docs/manual/scoreline.html) — perform score lines\
[sched(k)when(named)](https://csound.com/docs/manual/schedkwhen.html) — perform score event by trigger\
[readscore](https://csound.com/docs/manual/readscore.html) — read and process score from input string\
[rewindscore](https://csound.com/docs/manual/rewindscore.html) — rewind playback position of current score\
[setscorepos](https://csound.com/docs/manual/setscorepos.html) — set score playback position

##### Trigger Generators

[metro(2)](https://csound.com/docs/manual/metro.html) — trigger metronome\
[trigger](https://csound.com/docs/manual/trigger.html) — threshold trigger\
[sc_trig](https://csound.com/docs/manual/sc_trig.html) — timed trigger\
[seqtime(2)](https://csound.com/docs/manual/seqtime.html) — generates trigger according to values stored in a table\
[timedseq](https://csound.com/docs/manual/timedseq.html) — time-variant sequencer

##### Terminate

[turnoff](https://csound.com/docs/manual/turnoff.html) — turn off this instrument instance\
[turnoff2](https://csound.com/docs/manual/turnoff2.html) — turn off another instrument\
[mute](https://csound.com/docs/manual/mute.html) — mute future instances of an instrument\
[remove](https://csound.com/docs/manual/remove.html) — remove instrument definition\
[exitnow](https://csound.com/docs/manual/exitnow.html) — exit Csound

#### PRINTING

##### Simple Printing

[print](https://csound.com/docs/manual/print.html) — print i-values\
[printk](https://csound.com/docs/manual/printk.html) — print k-values\
[printk2](https://csound.com/docs/manual/printk2.html) — print k-values when changed\
[puts](https://csound.com/docs/manual/puts.html) — print string

##### Formatted Printing

[print(k)s](https://csound.com/docs/manual/prints.html) — formatted printing\
[printf(\_i)](https://csound.com/docs/manual/printf.html) — formatted printing with trigger

##### Arrays and Tables

[printarray](https://csound.com/docs/manual/printarray.html) — print array\
[ftprint](https://csound.com/docs/manual/ftprint.html) — print table

#### SOFTWARE CHANNELS

##### Chn Opcodes

[chn_k](https://csound.com/docs/manual/chn.html) — declare k-signal channel\
[chn_a](https://csound.com/docs/manual/chn.html) — declare a-signal channel\
[chn_S](https://csound.com/docs/manual/chn.html) — declare string channel\
[chnset](https://csound.com/docs/manual/chnset.html) — set value in channel\
[chnget](https://csound.com/docs/manual/chnget.html) — get value from channel\
[chnmix](https://csound.com/docs/manual/chnmix.html) — mix value to channel\
[chnclear](https://csound.com/docs/manual/chnclear.html) — clear channel\
[chnseti/k/a/s](https://csound.com/docs/manual/chnset.html) — array based chnset\
[chngeti/k/a/s](https://csound.com/docs/manual/chnget.html) — array based chnget

##### Invalue / Outvalue

[invalue](https://csound.com/docs/manual/invalue.html) — get value from channel\
[outvalue](https://csound.com/docs/manual/outvalue.html) — set value to channel

##### Zak Patch System

see [overview](https://csound.com/docs/manual/ZakTop.html) in the Csound Manual

##### Signal Flow Graph and Mixer

see [here](https://csound.com/docs/manual/SignalFlowGraphOpcodes.html)\
and [here](https://csound.com/docs/manual/MixerOpcodes.html) in the Csound Manual

#### MATHEMATICAL CALCULATIONS

##### Arithmetic Operations

[+](https://csound.com/docs/manual/adds.html) — addition\
[-](https://csound.com/docs/manual/subtracts.html) — subtraction\
[\*](https://csound.com/docs/manual/multiplies.html) — multiplication\
[/](https://csound.com/docs/manual/divides.html) — division\
[\^](https://csound.com/docs/manual/raises.html) — power of\
[%](https://csound.com/docs/manual/modulus.html) — modulo\
[divz](https://csound.com/docs/manual/divz.html) — safe division (avoids division by zero)
[exp](https://csound.com/docs/manual/exp.html) — e raised to x-th power\
[log(2/10)](https://csound.com/docs/manual/log.html) — logarithm (natural, 2, 10)\
[sqrt](https://csound.com/docs/manual/sqrt.html) — square root\
[abs](https://csound.com/docs/manual/abs.html) — absolute value\
[int](https://csound.com/docs/manual/int.html) — integer part\
[frac](https://csound.com/docs/manual/frac.html) — fractional part\
[signum](https://csound.com/docs/manual/signum.html) — signum function\
[round](https://csound.com/docs/manual/round.html) — round to nearest integer\
[ceil](https://csound.com/docs/manual/ceil.html) — round upwards\
[floor](https://csound.com/docs/manual/floor.html) — round downwards

##### Trigonometric Functions

[sin](https://csound.com/docs/manual/sin.html) — sine\
[cos](https://csound.com/docs/manual/cos.html) — cosine\
[tan](https://csound.com/docs/manual/tan.html) — tangent\
[sinh](https://csound.com/docs/manual/sinh.html) — hyperbolic sine\
[cosh](https://csound.com/docs/manual/cosh.html) — hyperbolic cosine\
[tanh](https://csound.com/docs/manual/tanh.html) — hyperbolic tangent\
[sininv](https://csound.com/docs/manual/sininv.html) — arcsine\
[cosinv](https://csound.com/docs/manual/cosinv.html) — arccosine\
[taninv(2)](https://csound.com/docs/manual/taninv.html) — arctangent

##### Comparisions

[min](https://csound.com/docs/manual/min.html) — minimum of different i/k/a values\
[max](https://csound.com/docs/manual/max.html) — maximum of different i/k/a values\
[minabs](https://csound.com/docs/manual/minabs.html) — minimum of different absolute values/signals\
[maxabs](https://csound.com/docs/manual/maxabs.html) — maximum of different absolute values/signals\
[ntropol](https://csound.com/docs/manual/ntrpol.html) — weighted mean of two values/signals

##### Logic Operators

[&&](https://csound.com/docs/manual/opand.html) — logical _and_\
[\|\|](https://csound.com/docs/manual/opor.html) — logical _or_

##### Tests

[qinf](https://csound.com/docs/manual/qinf.html) — question whether argument is infinite number\
[qnan](https://csound.com/docs/manual/qnan.html) — question whether argument is not a number

#### CONVERTERS

##### MIDI to/from Frequency

[mtof](https://csound.com/docs/manual/mtof.html) — MIDI note number to frequency\
[ftom](https://csound.com/docs/manual/ftom.html) — frequency to MIDI note number\
[cpsmidinn](https://csound.com/docs/manual/cpsmidinn.html) — MIDI note number to frequency\
[mton](https://csound.com/docs/manual/mton.html) — midi number to note name\
[ntom](https://csound.com/docs/manual/ntom.html) — note name to midi number\
[ntof](https://csound.com/docs/manual/ntof.html) — note name to frequency

##### Other Pitch Converters

[cent](https://csound.com/docs/manual/cent.html) — cent to scaling factor\
[octave](https://csound.com/docs/manual/octave.html) — octave to scaling factor\
[octcps](https://csound.com/docs/manual/octcps.html) — frequency to octave-point-decimal\
[cpsoct](https://csound.com/docs/manual/cpsoct.html) — octave-point-decimal to frequency\
[cpspch](https://csound.com/docs/manual/cpspch.html) — pitch-class to frequency

##### Amplitude Converters

[ampdb(fs)](https://csound.com/docs/manual/ampdb.html) — dB to amplitude (full scale)\
[db(fs)amp](https://csound.com/docs/manual/dbamp.html) — amplitude to dB

###### Scaling

[linlin](https://csound.com/docs/manual/linlin.html) — linear signal scaling

### VII. PERIPHERALS AND CONNECTIONS

#### MIDI

_Note: Modern frontends now usually handle MIDI input._

##### Assignments

[massign](https://csound.com/docs/manual/massign.html) — assign MIDI channel to Csound instrument\
[pgmassign](https://csound.com/docs/manual/pgmassign.html) — assign MIDI program to Csound instrument

##### Opcodes for Use in MIDI-Triggered Instruments

[notnum](https://csound.com/docs/manual/notnum.html) — note number received\
[cpsmidi](https://csound.com/docs/manual/cpsmidi.html) — frequency of note received\
[veloc](https://csound.com/docs/manual/veloc.html) — velocity received\
[ampmidi](https://csound.com/docs/manual/ampmidi.html) — velocity with scaling options\
[midichn](https://csound.com/docs/manual/midichn.html) — MIDI channel received\
[pchbend](https://csound.com/docs/manual/pchbend.html) — pitch bend received\
[aftouch](https://csound.com/docs/manual/aftouch.html) — after-touch received\
[polyaft](https://csound.com/docs/manual/polyaft.html) — polyphonic after-touch received

##### Opcodes For Use In All Instruments

[ctrl7(14/21)](https://csound.com/docs/manual/ctrl7.html) — receive controller\
[initc7(14/21)](https://csound.com/docs/manual/initc7.html) — initialize controller input\
[mclock](https://csound.com/docs/manual/mclock.html) — sends a MIDI clock message\
[mdelay](https://csound.com/docs/manual/mdelay.html) — MIDI delay

##### MIDI Input and Output

[midiin](https://csound.com/docs/manual/midiin.html) — generic MIDI messages received\
[midiout(\_i)](https://csound.com/docs/manual/midiout.html) — MIDI message to MIDI Out port\
[midifilestatus](https://csound.com/docs/manual/midifilestatus.html) — status of MIDI input file\
[midion](https://csound.com/docs/manual/midion.html) — sends note on/off messages to MIDI Out port\
[more](https://csound.com/docs/manual/MidiOutput.html) MIDI out opcodes

#### OPEN SOUND CONTROL AND NETWORK

##### Open Sound Control

[OSCinit](https://csound.com/docs/manual/OSCinit.html) — initalize OSClisten port\
[OSCinitM](https://csound.com/docs/manual/OSCinitM.html) — initializes multicast OSC listener\
[OSClisten](https://csound.com/docs/manual/OSClisten.html) — receive messages\
[OSCraw](https://csound.com/docs/manual/OSCraw.html) — listens to all messages\
[OSCsend](https://csound.com/docs/manual/OSCsend.html) — send messages\
[OSCbundle](https://csound.com/docs/manual/OSCbundle.html) — send data in a bundle\
[OSCcount](https://csound.com/docs/manual/OSCcount.html) — report messages received but unread

##### Network Audio

[socksend](https://csound.com/docs/manual/socksend.html) — send data\
[sockrecv](https://csound.com/docs/manual/sockrecv.html) — receive data\
[websocket](https://csound.com/docs/manual/websocket.html) — read and write signals and arrays

#### OTHER

##### Widgets

_Note that GUI elements are provided by all frontends.\
Usage of the built-in FLTK widgets has limitations and is in general **not** recommended._

FLTK overview [here](https://csound.com/docs/manual/ControlFltkIntro.html)

##### Keyboard

[sensekey](https://csound.com/docs/manual/sensekey.html) — sense computer keyboard

##### WII

[wiiconnect](https://csound.com/docs/manual/wiiconnect.html) — connect\
[wiidata](https://csound.com/docs/manual/wiidata.html) — read\
[wiirange](https://csound.com/docs/manual/wiirange.html) — set scaling and range limits\
[wiisend](https://csound.com/docs/manual/wiisend.html) — send data

##### P5 Glove

[p5gconnect](https://csound.com/docs/manual/p5gconnect.html) — connect\
[p5gdata](https://csound.com/docs/manual/p5gdata.html) — read

##### Serial Opcodes

[serialBegin](https://csound.com/docs/manual/serialBegin.html) — open a serial port\
[serialEnd](https://csound.com/docs/manual/serialEnd.html) — close a serial port\
[serialFlush](https://csound.com/docs/manual/serialFlush.html) — flush data from a serial port\
[serialPrint](https://csound.com/docs/manual/serialPrint.html) — print data from a serial port\
[serialRead](https://csound.com/docs/manual/serialBegin.html) — read data from a serial port\
[serialWrite(\_i)](https://csound.com/docs/manual/serialWrite.html) — write data to a serial port

#### SYSTEM

[getcfg](https://csound.com/docs/manual/getcfg.html) — get configuration\
[system(\_i)](https://csound.com/docs/manual/system.html) — call external program via system\
[pwd](https://csound.com/docs/manual/pwd.html) — print working directory\
[rtclock](https://csound.com/docs/manual/rtclock.html) — read real time clock\
[date(s)](https://csound.com/docs/manual/dates.html) — return date and time

#### PLUGINS

##### Python

[pyinit](https://csound.com/docs/manual/pyinit.html) — initialize Python interpreter\
[pyrun](https://csound.com/docs/manual/pyrun.html) — run Python code\
[pyexec](https://csound.com/docs/manual/pyexec.html) — execute script from file\
[pycall](https://csound.com/docs/manual/pycall.html) — write Python call to Csound variable\
[pyeval](https://csound.com/docs/manual/pyeval.html) — evaluate Python expression and write to Csound variable\
[pyassign](https://csound.com/docs/manual/pyassign.html) — assign Csound variable to Python variable

##### Faust

[faustaudio](https://csound.com/docs/manual/faustaudio.html) — instantiate and run a faust program\
[faustcompile](https://csound.com/docs/manual/faustcompile.html) — invoke compiler\
[faustdsp](https://csound.com/docs/manual/faustcompile.html) — instantiate a faust program\
[faustctl](https://csound.com/docs/manual/faustctl.html) — adjust a given control\
[faustgen](https://csound.com/docs/manual/faustgen.html) — compile, instantiate and run a faust program\
[faustplay](https://csound.com/docs/manual/faustplay.html) — run a faust program

##### Ladspa

[dssiinit](https://csound.com/docs/manual/dssiinit.html) — load plugin\
[dssiactivate](https://csound.com/docs/manual/dssiactivate.html) — (de)activate plugin\
[dssilist](https://csound.com/docs/manual/dssilist.html) — list available plugins\
[dssiaudio](https://csound.com/docs/manual/dssiaudio.html) — process audio using a plugin\
[dssictls](https://csound.com/docs/manual/dssictls.html) — send control to plugin

\

This overview was compiled by Joachim Heintz in may 2020, based on Csound 6.14.\
\
Thanks to Tarmo Johannes, Victor Lazzarini, Gleb Rogozinsky, Steven Yi,
Oeyvind Brandtsegg, Richard Boulanger, John ffitch, Luis Jure, Rory Walsh,
Eduardo Moguillansky and others for their feedback which made the selections
at least a tiny bit less subjective.
