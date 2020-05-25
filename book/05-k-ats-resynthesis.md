05 K. ATS RESYNTHESIS
=====================

The ATS Technique
-----------------

### General overview

The *ATS* technique (*Analysis-Transformation-Synthesis*) was developed
by Juan Pampin. A comprehensive explanation of this technique can be
found in his *ATS Theory*[^1] but, essentially, it may be said that it
represents two aspects of the analyzed signal: the deterministic part
and the stochastic or residual part. This model was initially conceived
by Julius Orion Smith and Xavier Serra,[^2] but *ATS* refines certain
aspects of it, such as the weighting of the spectral components on the
basis of their *Signal-to-Mask-Ratio (SMR)*.[^3]

[^1]: Juan Pampin, 2011, [ATS_theory](http://wiki.dxarts.washington.edu/groups/general/wiki/39f07/attachments/55bd6/ATS_theory.pdf)

[^2]: Xavier Serra and Julius O. Smith III, 1990, A Sound Analysis/Synthesis
      System Based on a Deterministic plus Stochastic Decomposition,
      Computer Music Journal, Vol.14, 4, MIT Press, USA

[^3]: Eberhard Zwicker and Hugo Fastl, 1990, Psychoacoustics, Facts and
      Models. Springer, Berlin, Heidelberg

The deterministic part consists in sinusoidal trajectories with varying
amplitude, frequency and phase. It is achieved by means of the
depuration of the spectral data obtained using *STFT (Short-Time Fourier
Transform)* analysis.

The stochastic part is also termed *residual*, because it is achieved by
subtracting the deterministic signal from the original signal. For such
purposes, the deterministic part is synthesized preserving the phase
alignment of its components in the second step of the analysis. The
residual part is represented with noise variable energy values along the
25 critical bands.[^4]

[^4]: Cf. Zwicker/Fastl (above footnote)


The ATS technique has the following advantages:

1.  The splitting between deterministic and stochastic parts allows an
    independent treatment of two different qualitative aspects of an
    audio signal.
2.  The representation of the deterministic part by means of sinusoidal
    trajectories improves the information and presents it on a way that
    is much closer to the way that musicians think of sound. Therefore,
    it allows many *classical* spectral transformations (such as the
    suppression of partials or their frequency warping) in a more
    flexible and conceptually clearer way.
3.  The representation of the residual part by means of noise values
    among the 25 critical bands simplifies the information and its
    further reconstruction. Namely, it is possible to overcome the
    common artifacts that arise in synthesis using oscillator banks or
    *IDFT*, when the time of a noisy signal analyzed using a FFT is
    warped.


### The ATS File Format

Instead of storing the *crude* data of the FFT analysis, the ATS files
store a representation of a digital sound signal in terms of sinusoidal
trajectories (called *partials*) with instantaneous frequency,
amplitude, and phase changing along temporal frames. Each frame has a
set of partials, each having (at least) amplitude and frequency values
(phase information might be discarded from the analysis). Each frame
might also contain noise information, modeled as time-varying energy in
the 25 critical bands of the analysis residual. All the data is stored
as 64 bits floats in the host's byte order.

The ATS files start with a header at which their description is stored
(such as frame rate, duration, number of sinusoidal trajectories, etc.).
The header of the ATS files contains the following information:

1.  ats-magic-number (just the arbitrary number 123. for consistency
    checking)
2.  sampling-rate (samples/sec)
3.  frame-size (samples)
4.  window-size (samples)
5.  partials (number of partials)
6.  frames (number of frames)
7.  ampmax (max. amplitude)
8.  frqmax (max. frequency)
9.  dur (duration in sec.)
10. type (frame type, see below)

The ATS frame type may be, at present, one of the four following:

Type 1: only sinusoidal trajectories with amplitude and frequency data.
Type 2: only sinusoidal trajectories with amplitude, frequency and phase
data.
Type 3: sinusoidal trajectories with amplitude, and frequency data as
well as residual data.
Type 4: sinusoidal trajectories with amplitude, frequency and phase data
as well as residual data.

So, after the header, an ATS file with frame type 4,  *np* number of
partials and *nf* frames will have:

    Frame 1:
        Amp.of partial 1,   Freq. of partial 1, Phase of partial 1
        ..................................................................
        ..................................................................
        Amp.of partial np,   Freq. of partial np, Phase of partial np

        Residual energy  value for  critical band 1
        ..................................................................
        ..................................................................
        Residual energy  value for  critical band 25

    ......................................................................

    Frame nf:
        Amp.of partial 1,   Freq. of partial 1, Phase of partial 1
        ..................................................................
        ..................................................................
        Amp.of partial np,   Freq. of partial np, Phase of partial np

        Residual energy  value for  critical band 1
        ..................................................................
        ..................................................................
        Residual energy  value for  critical band 25

As an example, an ATS file of frame type 4, with 100 frames and 10
partials will need:

- A header with 10 double floats values.
- 100 * 10 * 3 double floats for storing the Amplitude, Frequency and Phase
values of 10 partials along 100 frames.
- 25 * 100 double floats for storing the noise information of the 25
critical bands along 100 frames.

        Header:                10 * 8     =       80 bytes
        Deterministic data:  3000 * 8     =    24000 bytes
        Residual data:       2500 * 8     =    20000 bytes

        Total:       80 + 24000 + 20000   =    44080 bytes

The following Csound code shows how to retrieve the data of the header
of an ATS file.

   ***EXAMPLE 05K01_ats_header.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-n -m0
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

;Some macros
#define ATS_SR  # 0 #   ;sample rate    (Hz)
#define ATS_FS  # 1 #   ;frame size     (samples)
#define ATS_WS  # 2 #   ;window Size    (samples)
#define ATS_NP  # 3 #   ;number of Partials
#define ATS_NF  # 4 #   ;number of Frames
#define ATS_AM  # 5 #   ;maximum Amplitude
#define ATS_FM  # 6 #   ;maximum Frequency (Hz)
#define ATS_DU  # 7 #   ;duration       (seconds)
#define ATS_TY  # 8 #   ;ATS file Type

instr 1
iats_file=p4
;instr1 just reads the file header and loads its data into several variables
;and prints the result in the Csound prompt.
i_sampling_rate         ATSinfo iats_file,  $ATS_SR
i_frame_size            ATSinfo iats_file,  $ATS_FS
i_window_size           ATSinfo iats_file,  $ATS_WS
i_number_of_partials    ATSinfo iats_file,  $ATS_NP
i_number_of_frames      ATSinfo iats_file,  $ATS_NF
i_max_amp               ATSinfo iats_file,  $ATS_AM
i_max_freq              ATSinfo iats_file,  $ATS_FM
i_duration              ATSinfo iats_file,  $ATS_DU
i_ats_file_type         ATSinfo iats_file,  $ATS_TY

print i_sampling_rate
print i_frame_size
print i_window_size
print i_number_of_partials
print i_number_of_frames
print i_max_amp
print i_max_freq
print i_duration
print i_ats_file_type

endin

</CsInstruments>
<CsScore>
;change to put any ATS file you like
#define ats_file #"../SourceMaterials/basoon-C4.ats"#
;       st      dur     atsfile
i1      0       0       $ats_file
e
</CsScore>
</CsoundSynthesizer>
;Example by Oscar Pablo Di Liscia
~~~


Performing ATS Analysis with the ATSA Command-line Utility of Csound
--------------------------------------------------------------------

All the Csound Opcodes devoted to ATS Synthesis need to read an ATS
Analysis file. *ATS* was initially developed for the *CLM* environment
(*Common Lisp Music*), but at present there exist several *GNU*
applications that can perform *ATS* analysis, among them the *Csound*
Package command-line utility *ATSA* which is based on the *ATSA* program
(Di Liscia, Pampin, Moss) and was ported to Csound by Istvan Varga. The
*ATSA* program (Di Liscia, Pampin, Moss) may be obtained at <https://github.com/jamezilla/ats/tree/master/ats>


### Graphical Resources for Displaying ATS Analysis Files

If a plot of the ATS files is required, the *ATSH* software (Di Liscia,
Pampin, Moss) may be used. ATSH is a C program that uses the GTK graphic
environment. The source code and compilation directives can be obtained
at <https://github.com/jamezilla/ats/tree/master/ats>

Another very good GUI program that can be used for such purposes is
Qatsh, a Qt 4 port by Jean-Philippe Meuret. This one can be obtained
at <http://sourceforge.net/apps/trac/speed-dreams/browser/subprojects/soundeditor/trunk?rev=5250>


### Parameters Explanation and Proper Analysis Settings

The analysis parameters are somewhat numerous, and must be carefully
tuned in order to obtain good results.  A detailed explanation of the
meaning of these parameters can be found at <http://musica.unq.edu.ar/personales/odiliscia/software/ATSH-doc.htm%20>

In order to get a good analysis, the sound to be analysed should meet
the following requirements:

1.  The ATS analysis was meant to analyse isolated, individual sounds.
    This means that the analysis of sequences and/or superpositions of
    sounds, though possible, is not likely to render optimal results.
2.  Must have been recorded with a good signal-to-noise ratio, and
    should not contain unwanted noises.
3.  Must have been recorded without reverberation and/or echoes.

A good ATS analysis should meet the following requirements:

1.  Must have a good temporal resolution of the frequency, amplitude,
    phase and noise (if any) data. The tradeoff between temporal and
    frequency resolution is a very well known issue in FFT based
    spectral analysis.
2.  The Deterministic and Stochastic (also termed *residual) data
    must be reasonably separated in their respective ways of
    representation. This means that, if a sound  has both, deterministic
    and stochastic data, the former must be represented by sinusoidal
    trajectories, whilst the latter must be represented by energy values
    among the 25 critical bands. This allows a more effective treatment
    of both types of data in the synthesis and transformation processes.
3.  If the analysed sound is pitched, the sinusoidal trajectories
    (Deterministic) should  be as stable as possible and ordered
    according the original sound harmonics. This means that the first
    trajectory should represent the first (fundamental) harmonic,
    the second trajectory should represent the second harmonic, and so
    on. This allow to perform easily further transformation processes
    during resynthesis (such as, for example, selecting the odd
    harmonics to give them a different treatment than the others).

Whilst the first requirement is unavoidable, in order to get a useful
analysis, the second and third ones are sometimes almost impossible to
meet in full and their accomplishment depends often on the user
objectives.



Synthesizing ATS Analysis Files
-------------------------------

### Synthesis Techniques Applied to ATS.

The synthesis techniques that are usually applied in order to get a
synthesized sound that resembles the original sound as much as possible
are detailed explained in Pampin 2011[^5] and di Liscia 2013[^6].
However, it is worth pointing out that once the proper data is stored in
an analysis file, the user is free to read and apply to this data any
reasonable transformation/synthesis technique/s, thereby facilitating
the creation of new and interesting sounds that need not be similar nor
resemble the original sound.

[^5]: Juan Pampin, 2011, ATS_theory (see footnote 1)

[^6]: Oscar Pablo Di Liscia, 2013, A Pure Data toolkit for real-time
      synthesis of ATS spectral data
      <http://lac.linuxaudio.org/2013/papers/26.pdf>


### Csound Opcodes for Reading ATS Data Files

The opcodes
[ATSread](https://csound.com/docs/manual/ATSread.html),
[ATSreadnz](https://csound.com/docs/manual/ATSreadnz.html),
[ATSbufread](https://csound.com/docs/manual/ATSbufread.html),
[ATSinterpread](https://csound.com/docs/manual/ATSinterpread.html) and
[ATSpartialtap](https://csound.com/docs/manual/ATSpartialtap.html)
were essentially developed to read ATS data from ATS files.


#### ATSread

This opcode reads the deterministic ATS data from an ATS file. It
outputs frequency/amplitude pairs of a sinusoidal trajectory
corresponding to a specific partial number, according to a time pointer
that must be delivered. As the unit works at *k-rate*, the frequency and
amplitude data must be interpolated in order to avoid unwanted clicks in
the resynthesis.

The following example reads and synthesizes the 10 partials of an ATS
analysis corresponding to a steady 440 cps flute sound. Since the
instrument is designed to synthesize only one partial of the ATS file,
the mixing of several of them must be obtained performing several notes
in the score (the use of Csound\'s macros is strongly recommended in
this case). Though not the most practical way of synthesizing ATS data,
this method facilitates individual control of the frequency and
amplitude values of each one of the partials, which is not possible any
other way. In the example that follows, even numbered partials are
attenuated in amplitude, resulting in a sound that resembles a clarinet.
Amplitude and frequency envelopes could also be used in order to affect
a time changing weighting of the partials. Finally, the amplitude and
frequency values could be used to drive other synthesis units, such as
filters or FM synthesis networks of oscillators.


   ***EXAMPLE 05K02_atsread.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1
iamp = p4                       ;amplitude scaler
ifreq = p5                      ;frequency scaler
ipar = p6                       ;partial required
itab = p7                       ;audio table
iatsfile = p8                   ;ats file

idur ATSinfo iatsfile, 7        ;get duration

ktime line 0, p3, idur          ;time pointer

kfreq, kamp ATSread ktime, iatsfile, ipar        ;get frequency and amplitude values
aamp        interp  kamp                         ;interpolate amplitude values
afreq       interp  kfreq                        ;interpolate frequency values
aout        oscil3  aamp*iamp, afreq*ifreq, itab ;synthesize with amp and freq scaling

            out     aout
endin

</CsInstruments>
<CsScore>
; sine wave table
f 1 0 16384 10 1
#define atsfile #"../SourceMaterials/flute-A5.ats"#

;       start   dur     amp     freq    par     tab     atsfile
i1      0       3       1       1       1       1       $atsfile
i1      0       .       .1      .       2       .       $atsfile
i1      0       .       1       .       3       .       $atsfile
i1      0       .       .1      .       4       .       $atsfile
i1      0       .       1       .       5       .       $atsfile
i1      0       .       .1      .       6       .       $atsfile
i1      0       .       1       .       7       .       $atsfile
i1      0       .       .1      .       8       .       $atsfile
i1      0       .       1       .       9       .       $atsfile
i1      0       .       .1      .       10      .       $atsfile
e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

We can use arrays to simplify the code in this example, and to choose
different numbers of partials:


   ***EXAMPLE 05K03_atsread2.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr      = 44100
ksmps   = 32
nchnls  = 1
0dbfs   = 1

gS_ATS_file =         "../SourceMaterials/flute-A5.ats" ;ats file
giSine     ftgen      0, 0, 16384, 10, 1 ; sine wave table


instr Master ;call instr "Play" for each partial
iNumParts  =          p4 ;how many partials to synthesize
idur       ATSinfo    gS_ATS_file, 7 ;get ats file duration

iAmps[]    array      1, .1 ;array for even and odd partials
iParts[]   genarray   1,iNumParts ;creates array [1, 2, ..., iNumParts]

indx       =          0 ;initialize index
 ;loop for number of elements in iParts array
until indx == iNumParts do
  ;call an instance of instr "Play" for each partial
           event_i    "i", "Play", 0, p3, iAmps[indx%2], iParts[indx], idur
indx       +=         1 ;increment index
od ;end of do ... od block

           turnoff ;turn this instrument off as job has been done
endin

instr Play
iamp       =          p4 ;amplitude scaler
ipar       =          p5 ;partial required
idur       =          p6 ;ats file duration

ktime      line       0, p3, idur ;time pointer

kfreq, kamp ATSread   ktime, gS_ATS_file, ipar ;get frequency and amplitude values
aamp       interp     kamp ;interpolate amplitude values
afreq      interp     kfreq ;interpolate frequency values
aout       oscil3     aamp*iamp, afreq, giSine ;synthesize with amp scaling

           out        aout
endin
</CsInstruments>
<CsScore>
;           strt dur number of partials
i "Master"  0    3   1
i .         +    .   3
i .         +    .   10
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia and Joachim Heintz
~~~

#### ATSreadnz

This opcode is similar to *ATSread* in the sense that it reads the noise
data of an ATS file, delivering k-rate energy values for the requested
critical band. In order to this Opcode to work, the input ATS file must
be either type 3 or 4 (types 1 and 2 do not contain noise data).
*ATSreadnz* is simpler than *ATSread*, because whilst the number of
partials of an ATS file is variable, the noise data (if any) is stored
always as 25 values per analysis frame each value corresponding to the
energy of the noise in each one of the critical bands. The three
required arguments are: a time pointer, an ATS file name and the number
of critical band required (which, of course, must have a value between 1
and 25).

The following example is similar to the previous. The instrument is
designed to synthesize only one noise band of the ATS file, the mixing
of several of them must be obtained performing several notes in the
score. In this example the synthesis of the noise band is done using
Gaussian noise filtered with a resonator (i.e., band-pass) filter. This
is not the method used by the ATS synthesis Opcodes that will be further
shown, but its use in this example is meant to lay stress again on the
fact that the use of the ATS analysis data may be completely independent
of its generation. In this case, also, a macro that performs the
synthesis of the 25 critical bands was programmed. The ATS file used
correspond to a female speech sound that lasts for 3.633 seconds, and in
the examples is stretched to 10.899 seconds, that is three times its
original duration. This shows one of the advantages of the Deterministic
plus Stochastic data representation of ATS: the stochastic ("noisy")
part of a signal may be stretched in the resynthesis without the
artifacts that arise commonly when the same data is represented by
cosine components (as in the FFT based resynthesis). Note that, because
the Stochastic noise values correspond to energy (i.e., intensity),  in
order to get the proper amplitude values, the square root of  them must
be computed.


   ***EXAMPLE 05K04_atsreadnz.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1
itabc = p7                      ;table with the 25 critical band frequency edges
iscal = 1                       ;reson filter scaling factor
iamp = p4                       ;amplitude scaler
iband = p5                      ;energy band required
if1     table   iband-1, itabc  ;lower edge
if2     table   iband, itabc    ;upper edge
idif    = if2-if1
icf     = if1 + idif*.5         ;center frequency value
ibw     = icf*p6                ;bandwidth
iatsfile = p8                   ;ats file name

idur    ATSinfo iatsfile, 7     ;get duration

ktime   line    0, p3, idur     ;time pointer

ken     ATSreadnz ktime, iatsfile, iband        ;get frequency and amplitude values
anoise  gauss 1
aout    reson anoise*sqrt(ken), icf, ibw, iscal ;synthesize with amp and freq scaling

        out aout*iamp
endin

</CsInstruments>
<CsScore>
; sine wave table
f1 0 16384 10 1
;the 25 critical bands edge's frequencies
f2 0 32 -2 0 100 200 300 400 510 630 770 920 1080 1270 1480 1720 2000 2320 \
           2700 3150 3700 4400 5300 6400 7700 9500 12000 15500 20000

;an ats file name
#define atsfile #"../SourceMaterials/female-speech.ats"#

;a macro that synthesize the noise data along all the 25 critical bands
#define all_bands(start'dur'amp'bw'file)
#
i1      $start  $dur    $amp    1       $bw     2       $file
i1      .       .       .       2       .       .       $file
i1      .       .       .       3       .       .       .
i1      .       .       .       4       .       .       .
i1      .       .       .       5       .       .       .
i1      .       .       .       6       .       .       .
i1      .       .       .       7       .       .       .
i1      .       .       .       8       .       .       .
i1      .       .       .       9       .       .       .
i1      .       .       .       10      .       .       .
i1      .       .       .       11      .       .       .
i1      .       .       .       12      .       .       .
i1      .       .       .       13      .       .       .
i1      .       .       .       14      .       .       .
i1      .       .       .       15      .       .       .
i1      .       .       .       16      .       .       .
i1      .       .       .       17      .       .       .
i1      .       .       .       18      .       .       .
i1      .       .       .       19      .       .       .
i1      .       .       .       20      .       .       .
i1      .       .       .       21      .       .       .
i1      .       .       .       22      .       .       .
i1      .       .       .       23      .       .       .
i1      .       .       .       24      .       .       .
i1      .       .       .       25      .       .       .
#

;ditto...original sound duration is 3.633 secs.
;stretched 300%
$all_bands(0'10.899'1'.05'$atsfile)

e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

#### ATSbufread, ATSinterpread, ATSpartialtap.

The [ATSbufread](https://csound.com/docs/manual/ATSbufread.html)
opcode reads an ATS file and stores its frequency and amplitude data
into an internal table. The first and third input arguments are the same
as in the *ATSread* and the  *ATSreadnz* Opcodes: a time pointer and an
ATS file name. The second input argument is a frequency scaler. The
fourth argument is the number of partials to be stored. Finally, this
Opcode may take two optional arguments: the  first partial and the
increment of partials to be read, which default to 0 and 1 respectively.

Although this opcode does not have any output, the ATS frequency and
amplitude data is available to be used by other opcode. In this case,
two examples are provided, the first one uses the *ATSinterpread* opcode
and the second one uses the *ATSpartialtap* opcode.

The
[ATSinterpread](https://csound.com/docs/manual/ATSinterpread.html)
opcode reads an ATS table generated by the *ATSbufread* opcode and
outputs amplitude values interpolating them between the two amplitude
values of the two frequency trajectories that are closer to a given
frequency value. The only argument that this opcode takes is the desired
frequency value.

The following example synthesizes five sounds. All the data is taken
from the ATS file *test.ats*. The first and final sounds match the two
frequencies closer to the first and the second partials of the analysis
file and have their amplitude values closer to the ones in the original
ATS file. The other three sounds (second, third and fourth), have
frequencies that are in-between the ones of the first and second
partials of the ATS file, and their amplitudes are scaled by an
interpolation between the amplitudes of the first and second partials.
The more the frequency requested approaches the one of a partial, the
more the amplitude envelope rendered by  ATSinterpread is similar to the
one of this partial. So, the example shows a gradual morphing beween
the amplitude envelope of the first partial to the amplitude envelope of
the second according to their frequency values.


   ***EXAMPLE 05K05_atsinterpread.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1

iamp =      p4                  ;amplitude scaler
ifreq =     p5                  ;frequency scaler
iatsfile =  p7                  ;atsfile
itab =      p6                  ;audio table
ifreqscal = 1                   ;frequency scaler
ipars   ATSinfo iatsfile, 3     ;how many partials
idur    ATSinfo iatsfile, 7     ;get duration
ktime   line    0, p3, idur     ;time pointer

        ATSbufread ktime, ifreqscal, iatsfile, ipars ;reads an ATS buffer
kamp    ATSinterpread ifreq         ;get the amp values according to freq
aamp    interp kamp                               ;interpolate amp values
aout    oscil3 aamp, ifreq, itab                  ;synthesize

        out aout*iamp
endin

</CsInstruments>
<CsScore>
; sine wave table
f 1 0 16384 10 1
#define atsfile #"../SourceMaterials/test.ats"#

;  start dur amp freq atab atsfile
i1 0     3   1   440  1    $atsfile     ;first partial
i1 +     3   1   550  1    $atsfile     ;closer to first partial
i1 +     3   1   660  1    $atsfile     ;half way between both
i1 +     3   1   770  1    $atsfile     ;closer to second partial
i1 +     3   1   880  1    $atsfile     ;second partial
e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

The
[ATSpartialtap](https://csound.com/docs/manual/ATSpartialtap.html)
Opcode reads an ATS table generated by the *ATSbufread* Opcode and
outputs the frequency and amplitude k-rate values of a specific partial
number. The example presented here uses four of these opcodes that read
from a single ATS buffer obtained using *ATSbufread* in order to drive
the frequency and amplitude of four oscillators. This allows the mixing
of  different combinations of partials, as shown by the three notes
triggered by the designed instrument.


   ***EXAMPLE 05K06_atspartialtap.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1
iamp =  p4/4            ;amplitude scaler
ifreq = p5              ;frequency scaler
itab =  p6              ;audio table
ip1 =   p7              ;first partial to be synthesized
ip2 =   p8              ;second partial to be synthesized
ip3 =   p9              ;third partial to be synthesized
ip4 =   p10             ;fourth partial to be synthesized
iatsfile = p11          ;atsfile

ipars   ATSinfo iatsfile, 3     ;get how many partials
idur    ATSinfo iatsfile, 7     ;get duration

ktime   line    0, p3, idur     ;time pointer

        ATSbufread ktime, ifreq, iatsfile, ipars ;reads an ATS buffer

kf1,ka1 ATSpartialtap ip1       ;get the amp values according each partial number
af1     interp kf1
aa1     interp ka1
kf2,ka2 ATSpartialtap ip2       ;ditto
af2     interp kf2
aa2     interp ka2
kf3,ka3 ATSpartialtap ip3       ;ditto
af3     interp kf3
aa3     interp ka3
kf4,ka4 ATSpartialtap ip4       ;ditto
af4     interp kf4
aa4     interp ka4

a1      oscil3  aa1, af1*ifreq, itab    ;synthesize each partial
a2      oscil3  aa2, af2*ifreq, itab    ;ditto
a3      oscil3  aa3, af3*ifreq, itab    ;ditto
a4      oscil3  aa4, af4*ifreq, itab    ;ditto

        out (a1+a2+a3+a4)*iamp
endin

</CsInstruments>
<CsScore>
; sine wave table
f 1 0 16384 10 1
#define atsfile #"../SourceMaterials/oboe-A5.ats"#

;   start dur amp freq atab part#1 part#2 part#3 part#4 atsfile
i1  0     3   10  1    1    1      5      11     13     $atsfile
i1  +     3   7   1    1    1      6      14     17     $atsfile
i1  +     3   400 1    1    15     16     17     18     $atsfile

e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~


### Synthesizing ATS data: ATSadd, ATSaddnz,  ATSsinnoi. ATScross.

The four opcodes that will be presented in this section synthesize ATS
analysis data internally and allow for some modifications of these data
as well. A significant difference to the preceding opcodes is that the
synthesis method cannot be chosen by the user. The synthesis methods
used by all of these opcodes are fully explained in *Juan Pampin 2011*
and *Oscar Pablo Di Liscia 2013* (see footnotes 1 and 6).

The [ATSadd](https://csound.com/docs/manual/ATSadd.html) opcode
synthesizes deterministic data from an ATS file using an array of table
lookup oscillators whose amplitude and frequency values are obtained by
linear interpolation of the ones in the ATS file according to the time
of the analysis requested by a time pointer . The frequency of all the partials may be modified at k-rate,
allowing shifting and/or frequency modulation. An ATS file, a time
pointer and a function table are required. The table is supposed to
contain either a cosine or a sine function, but nothing prevents the
user from experimenting with other functions. Some care must be taken in
the last case, so as not to produce foldover (frequency aliasing).  The
user may also request a number of partials smaller than the number of
partials of the ATS file (by means of the *inpars* variable in the
example below). There are also two optional arguments: a partial offset
(i.e., the first partial that will be taken into account for the
synthesis, by means of the *ipofst* variable  in the example below) and
a step to select the partials (by means of the *inpincr* variable in the
example below). Default values for these arguments are 0 and 1
respectively. Finally, the user may define a final optional argument
that references a function table that will be used to rescale the
amplitude values during the resynthesis. The amplitude values of all the
partials along all the frames are rescaled to the table length and used
as indexes to lookup a scaling amplitude value in the table. For
example, in a table of size 1024, the scaling amplitude of all the 0.5
amplitude values  (-6 dBFS)  that are found in the ATS file is in the
position 512 (1024/2). Very complex filtering effects can be obtained
by carefully setting these gating tables according to the amplitude
values of a particular ATS analysis.


   ***EXAMPLE 05K07_atsadd.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1


;Some macros
#define ATS_NP # 3 #    ;number of Partials
#define ATS_DU # 7 #    ;duration

instr 1

/*read some ATS data from the file header*/
iatsfile = p11
i_number_of_partials    ATSinfo iatsfile,  $ATS_NP
i_duration              ATSinfo iatsfile,  $ATS_DU

iamp     =      p4              ;amplitude scaler
ifreqdev =      2^(p5/12)       ;frequency deviation (p5=semitones up or down)
itable   =      p6              ;audio table

/*here we deal with number of partials, offset and increment issues*/
inpars  =       (p7 < 1 ? i_number_of_partials : p7)    ;inpars can not be <=0
ipofst  =       (p8 < 0 ? 0 : p8)                       ;partial offset can not be < 0
ipincr  =       (p9 < 1 ? 1 : p9)                       ;partial increment can not be <= 0
imax    =       ipofst + inpars*ipincr                  ;max. partials allowed

if imax <= i_number_of_partials igoto OK
;if we are here, something is wrong!
;set npars to zero, so as the output will be zero and the user knows
print imax, i_number_of_partials
inpars  = 0
ipofst  = 0
ipincr  = 1
OK: ;data is OK
/********************************************************************/
igatefn =      p10               ;amplitude scaling table

ktime   linseg 0, p3, i_duration
asig    ATSadd ktime, ifreqdev, iatsfile, itable, inpars, ipofst, ipincr, igatefn

        out    asig*iamp
endin

</CsInstruments>
<CsScore>

;change to put any ATS file you like
#define ats_file #"../SourceMaterials/basoon-C4.ats"#

;audio table (sine)
f1      0       16384   10      1
;some tables to test amplitude gating
;f2 reduce progressively partials with amplitudes from 0.5 to 1 (-6dBFs to 0 dBFs)
;and eliminate partials with amplitudes below 0.5 (-6dBFs)
f2      0       1024     7      0 512 0 512 1
;f3 boost partials with amplitudes from 0 to 0.125 (-12dBFs)
;and attenuate partials with amplitudes from 0.125 to 1 (-12dBFs to 0dBFs)
f3      0       1024     -5     8 128 8 896 .001

;   start dur  amp  freq atable npars offset pincr gatefn atsfile
i1  0     2.82 1    0    1      0     0      1     0      $ats_file
i1  +     .    1    0    1      0     0      1     2      $ats_file
i1  +     .    .8   0    1      0     0      1     3      $ats_file

e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

The [ATSaddnz](https://csound.com/docs/manual/ATSaddnz.html) opcode
synthesizes residual ("noise") data from an ATS file using the method
explained above. This opcode works in a similar fashion to
*ATSadd* except that frequency warping of the noise bands is not
permitted and the maximum number of noise bands will always be 25 (the
25 critical bands, see Zwicker/Fastl, footnote 3). The optional arguments
*offset* and *increment* work in a similar fashion to that in ATSadd.
The *ATSaddnz* opcode allows the synthesis of several combinations of
noise bands, but individual amplitude scaling of them is not possible.


   ***EXAMPLE 05K08_atsaddnz.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

;Some macros
#define NB      # 25 #  ;number noise bands
#define ATS_DU  # 7 #   ;duration

instr 1
/*read some ATS data from the file header*/
iatsfile = p8
i_duration ATSinfo iatsfile, $ATS_DU

iamp    =       p4                ;amplitude scaler

/*here we deal with number of partials, offset and increment issues*/
inb     =       (p5 < 1 ? $NB : p5)     ;inb can not be <=0
ibofst  =       (p6 < 0 ? 0 : p6)       ;band offset cannot be < 0
ibincr  =       (p7 < 1 ? 1 : p7)       ;band increment cannot be <= 0
imax    =       ibofst + inb*ibincr     ;max. bands allowed

if imax <= $NB igoto OK
;if we are here, something is wrong!
;set nb to zero, so as the output will be zero and the user knows
print imax, $NB
inb  = 0
ibofst  = 0
ibincr  = 1
OK: ;data is OK
/********************************************************************/
ktime   linseg   0, p3, i_duration
asig    ATSaddnz ktime, iatsfile, inb, ibofst, ibincr

        out      asig*iamp
endin

</CsInstruments>
<CsScore>

;change to put any ATS file you like
#define ats_file #"../SourceMaterials/female-speech.ats"#

;   start dur  amp nbands bands_offset bands_incr atsfile
i1  0     7.32 1   25     0            1          $ats_file     ;all bands
i1  +     .    .   15     10           1          $ats_file     ;from 10 to 25 step 1
i1  +     .    .   8      1            3          $ats_file     ;from 1 to 24 step 3
i1  +     .    .   5      15           1          $ats_file     ;from 15 to 20 step 1

e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

The [ATSsinnoi](https://csound.com/docs/manual/ATSsinnoi.html)
opcode synthesizes both deterministic and residual ("noise") data from
an ATS file. This opcode
may be regarded as a combination of the two previous opcodes but with
the allowance of individual amplitude scaling of the mixes of
deterministic and residual parts. All the arguments of *ATSsinnoi* are
the same as those for the two previous opcodes, except for the two
k-rate variables *ksinlev* and *knoislev* that allow individual, and
possibly time-changing, scaling of the deterministic and residual parts
of the synthesis.


   ***EXAMPLE 05K09_atssinnoi.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

;Some macros
#define ATS_NP  # 3 #   ;number of Partials
#define ATS_DU  # 7 #   ;duration

instr 1
iatsfile = p11
/*read some ATS data from the file header*/
i_number_of_partials    ATSinfo iatsfile, $ATS_NP
i_duration              ATSinfo iatsfile, $ATS_DU
print i_number_of_partials

iamp     =      p4              ;amplitude scaler
ifreqdev =      2^(p5/12)       ;frequency deviation (p5=semitones up or down)
isinlev  =      p6              ;deterministic part gain
inoislev =      p7              ;residual part gain

/*here we deal with number of partials, offset and increment issues*/
inpars   =      (p8 < 1 ? i_number_of_partials : p8) ;inpars can not be <=0
ipofst   =      (p9 < 0 ? 0 : p9)                    ;partial offset can not be < 0
ipincr   =      (p10 < 1 ? 1 : p10)                  ;partial increment can not be <= 0
imax     =      ipofst + inpars*ipincr               ;max. partials allowed

if imax <= i_number_of_partials igoto OK
;if we are here, something is wrong!
;set npars to zero, so as the output will be zero and the user knows
prints "wrong number of partials requested", imax, i_number_of_partials
inpars  = 0
ipofst  = 0
ipincr  = 1
OK: ;data is OK
/********************************************************************/

ktime   linseg     0, p3, i_duration
asig    ATSsinnoi  ktime, isinlev, inoislev, ifreqdev, iatsfile, inpars, ipofst, ipincr

        out        asig*iamp
endin

</CsInstruments>
<CsScore>
;change to put any ATS file you like
#define ats_file #"../SourceMaterials/female-speech.ats"#

;       start   dur     amp     freqdev sinlev  noislev npars   offset  pincr   atsfile
i1      0       3.66    .79     0       1       0       0       0       1       $ats_file
;deterministic only
i1      +       3.66    .79     0       0       1       0       0       1       $ats_file
;residual only
i1      +       3.66    .79     0       1       1       0       0       1       $ats_file
;deterministic and residual
;       start   dur     amp     freqdev sinlev  noislev npars   offset  pincr   atsfile
i1      +       3.66    2.5     0       1       0       80      60      1       $ats_file
;from partial 60 to partial 140, deterministic only
i1      +       3.66    2.5     0       0       1       80      60      1       $ats_file
;from partial 60 to partial 140, residual only
i1      +       3.66    2.5     0       1       1       80      60      1       $ats_file
;from partial 60 to partial 140, deterministic and residual
e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~

[ATScross](https://csound.com/docs/manual/ATScross.html) is an
opcode that performs some kind of "interpolation" of the amplitude
data between two ATS analyses. One of these two ATS analyses must be
obtained using the *ATSbufread* opcode (see above) and the other is to
be loaded by an *ATScross* instance. Only the deterministic data of both
analyses is used. The ATS file, time pointer, frequency scaling, number
of partials, partial offset and partial increment arguments work the
same way as usages in previously described opcodes. Using the arguments
*kmylev* and *kbuflev* the user may define how much of the amplitude
values of the file read by *ATSbufread* is to be used to scale the
amplitude values corresponding to the frequency values of the analysis
read by  *ATScross*. So, a value of 0 for *kbuflev* and 1 for  *kmylev*
will retain the original ATS analysis read by *ATScross* unchanged
whilst the converse (*kbuflev* =1 and  *kmylev*=0) will retain the
frequency values of the ATScross analysis but scaled by the amplitude
values of the *ATSbufread* analysis. As the time pointers of both units
need not be the same, and frequency warping and number of partials may
also be changed, very complex cross synthesis and sound hybridation can
be obtained using this opcode.


   ***EXAMPLE 05K10_atscross.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

;ATS files
#define ats1 #"../SourceMaterials/flute-A5.ats"#
#define ats2 #"../SourceMaterials/oboe-A5.ats"#


instr 1
iamp    = p4            ;general amplitude scaler

ilev1   = p5            ;level of iats1 partials
ifd1    = 2^(p6/12)     ;frequency deviation for iats1 partials

ilev2   = p7            ;level of ats2 partials
ifd2    = 2^(p8/12)     ;frequency deviation for iats2 partials

itau    = p9            ;audio table

/*get ats file data*/
inp1  ATSinfo $ats1, 3
inp2  ATSinfo $ats2, 3
idur1 ATSinfo $ats1, 7
idur2 ATSinfo $ats2, 7

ktime   line    0, p3, idur1
ktime2  line    0, p3, idur2

        ATSbufread ktime,  ifd1, $ats1, inp1
aout    ATScross   ktime2, ifd2, $ats2, itau, ilev2, ilev1, inp2

        out        aout*iamp

endin

</CsInstruments>
<CsScore>

; sine wave for the audio table
f1      0       16384   10      1

;  start dur amp lev1 f1  lev2 f2 table
i1 0     2.3 .75 0    0   1    0  1     ;original oboe
i1 +     .   .   0.25 .   .75  .  .     ;oboe 75%, flute 25%
i1 +     .   .   0.5  .   0.5  .  .     ;oboe 50%, flute 50%
i1 +     .   .   .75  .   .25  .  .     ;oboe 25%, flute 75%
i1 +     .   .   1    .   0    .  .     ;oboe partials with flute's amplitudes

e
</CsScore>
</CsoundSynthesizer>
;example by Oscar Pablo Di Liscia
~~~
