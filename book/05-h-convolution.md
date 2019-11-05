05 H. CONVOLUTION
=================

Convolution is a mathematical procedure whereby one function is modified
by another. Applied to audio, one of these functions might be a sound
file or a stream of live audio whilst the other will be, what is
referred to as, an impulse response file; this could actually just be
another shorter sound file. The longer sound file or live audio stream
will be modified by the impulse response so that the sound file will be
imbued with certain qualities of the impulse response. It is important
to be aware that convolution is a far from trivial process and that
realtime performance may be a frequent consideration. Effectively every
sample in the sound file to be processed will be multiplied in turn by
every sample contained within the impulse response file. Therefore, for
a 1 second impulse response at a sampling frequency of 44100 hertz, each
and every sample of the input sound file or sound stream will undergo
44100 multiplication operations. Expanding upon this even further, for 1
second\'s worth of a convolution procedure this will result in 44100 x
44100 (or 1,944,810,000) multiplications. This should provide some
insight into the processing demands of a convolution procedure and also
draw attention to the efficiency cost of using longer impulse response
files.

The most common application of convolution in audio processing is
reverberation but convolution is equally adept at, for example,
imitating the filtering and time smearing characteristics of vintage
microphones, valve amplifiers and speakers. It is also used sometimes to
create more unusual special effects. The strength of convolution based
reverbs is that they implement acoustic imitations of actual spaces
based upon \'recordings\' of those spaces. All the quirks and nuances of
the original space will be retained. Reverberation algorithms based upon
networks of comb and allpass filters create only idealised reverb
responses imitating spaces that don\'t actually exist. The impulse
response is a little like a \'fingerprint\' of the space. It is perhaps
easier to manipulate characteristics such as reverb time and high
frequency diffusion (i.e. lowpass filtering) of the reverb effect when
using a Schroeder derived algorithm using comb and allpass filters but
most of these modification are still possible, if not immediately
apparent, when implementing reverb using convolution. The quality of a
convolution reverb is largely dependent upon the quality of the impulse
response used. An impulse response recording is typically achieved by
recording the reverberant tail that follows a burst of white noise.
People often employ techniques such as bursting balloons to achieve
something approaching a short burst of noise. Crucially the impulse
sound should not excessively favour any particular frequency or exhibit
any sort of resonance. More modern techniques employ a sine wave sweep
through all the audible frequencies when recording an impulse response.
Recorded results using this technique will normally require further
processing in order to provide a usable impulse response file and this
approach will normally be beyond the means of a beginner.

Many commercial, often expensive, implementations of convolution exist
both in the form of software and hardware but fortunately Csound
provides easy access to convolution for free. Csound currently lists six
different opcodes for convolution, [convolve
(convle)](http://www.csounds.com/manual/html/convolve.html),
[cross2](http://www.csounds.com/manual/html/cross2.html),
[dconv](http://www.csounds.com/manual/html/dconv.html),
[ftconv](http://www.csounds.com/manual/html/ftconv.html),
[ftmorf](http://www.csounds.com/manual/html/ftmorf.html) and
[pconvolve](http://www.csounds.com/manual/html/pconvolve.html).
[convolve (convle)](http://www.csounds.com/manual/html/convolve.html)
and [dconv](http://www.csounds.com/manual/html/dconv.html) are earlier
implementations and are less suited to realtime operation,
[cross2](http://www.csounds.com/manual/html/cross2.html) relates to
FFT-based cross synthesis and
[ftmorf](http://www.csounds.com/manual/html/ftmorf.html) is used to
morph between similar sized function table and is less related to what
has been discussed so far, therefore in this chapter we shall focus upon
just two opcodes,
[pconvolve](http://www.csounds.com/manual/html/pconvolve.html) and
[ftconv.](http://www.csounds.com/manual/html/ftconv.html)

pconvolve
---------

[pconvolve](http://www.csounds.com/manual/html/pconvolve.html) is
perhaps the easiest of Csound\'s convolution opcodes to use and the most
useful in a realtime application. It uses the uniformly partitioned
(hence the \'p\') overlap-save algorithm which permits convolution with
very little delay (latency) in the output signal. The impulse response
file that it uses is referenced directly, i.e. it does not have to be
previously loaded into a function table, and multichannel files are
permitted. The impulse response file can be any standard sound file
acceptable to Csound and does not need to be pre-analysed as is required
by [convolve](http://www.csounds.com/manual/html/convolve.html).
Convolution procedures through their very nature introduce a delay in
the output signal but
[pconvolve](http://www.csounds.com/manual/html/pconvolve.html) minimises
this using the algorithm mentioned above. It will still introduce some
delay but we can control this using the opcode\'s \'ipartitionsize\'
input argument. What value we give this will require some consideration
and perhaps some experimentation as choosing a high partition size will
result in excessively long delays (only an issue in realtime work)
whereas very low partition sizes demand more from the CPU and too low a
size may result in buffer under-runs and interrupted realtime audio.
Bear in mind still that realtime CPU performance will depend heavily on
the length of the impulse file. The partition size argument is actually
an optional argument and if omitted it will default to whatever the
software buffer size is as defined by the -b command line flag. If we
specify the partition size explicitly however, we can use this
information to delay the input audio (after it has been used by
pconvolve) so that it can be realigned in time with the latency affected
audio output from pconvolve - this will be essential in creating a
\'wet/dry\' mix in a reverb effect. Partition size is defined in sample
frames therefore if we specify a partition size of 512, the delay
resulting from the convolution procedure will be 512/sr (sample rate).

In the following example a monophonic drum loop sample undergoes
processing through a convolution reverb implemented using
[pconvolve](http://www.csounds.com/manual/html/pconvolve.html) which in
turn uses two different impulse files. The first file is a more
conventional reverb impulse file taken in a stairwell whereas the second
is a recording of the resonance created by striking a terracota bowl
sharply. If you wish to use the three sound files I have used in
creating this example, the mono input sound file is
[here](http://www.iainmccurdy.org/CsoundRealtimeExamples/SourceMaterials/loop.wav)
and the two stereo sound files used as impulse responses are
[here](http://www.iainmccurdy.org/CsoundRealtimeExamples/SourceMaterials/stairwell.wav)
and
[here](http://www.iainmccurdy.org/CsoundRealtimeExamples/SourceMaterials/dish.wav).
You can, of course, replace them with ones of your own but remain
mindful of mono/stereo/multichannel integrity.

#### *EXAMPLE 05H01\_pconvolve.csd*

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>

    sr     =  44100
    ksmps  =  512
    nchnls =  2
    0dbfs  =  1

    gasig init 0

     instr 1 ; sound file player
    gasig           diskin2   p4,1,0,1
     endin

     instr 2 ; convolution reverb
    ; Define partion size.
    ; Larger values require less CPU but result in more latency.
    ; Smaller values produce lower latency but may cause -
    ; - realtime performance issues
    ipartitionsize  =         256
    ar1,ar2         pconvolve gasig, p4,ipartitionsize
    ; create a delayed version of the input signal that will sync -
    ; - with convolution output
    adel            delay     gasig,ipartitionsize/sr
    ; create a dry/wet mix
    aMixL           ntrpol    adel,ar1*0.1,p5
    aMixR           ntrpol    adel,ar2*0.1,p5
                    outs      aMixL,aMixR
    gasig           =         0
     endin

    </CsInstruments>
    <CsScore>
    ; instr 1. sound file player
    ;    p4=input soundfile
    ; instr 2. convolution reverb
    ;    p4=impulse response file
    ;    p5=dry/wet mix (0 - 1)

    i 1 0 8.6 "loop.wav"
    i 2 0 10 "Stairwell.wav" 0.3

    i 1 10 8.6 "loop.wav"
    i 2 10 10 "Dish.wav" 0.8
    e
    </CsScore>
    </CsoundSynthesizer>

ftconv
------

[ftconv](http://www.csounds.com/manual/html/ftconv.html) (abbreviated
from \'function table convolution) is perhaps slightly more complicated
to use than
[pconvolve](http://www.csounds.com/manual/html/pconvolve.html) but
offers additional options. The fact that
[ftconv](http://www.csounds.com/manual/html/ftconv.html) utilises an
impulse response that we must first store in a function table rather
than directly referencing a sound file stored on disk means that we have
the option of performing transformations upon the audio stored in the
function table before it is employed by
[ftconv](http://www.csounds.com/manual/html/ftconv.html) for
convolution. This example begins just as the previous example: a mono
drum loop sample is convolved first with a typical reverb impulse
response and then with an impulse response derived from a terracotta
bowl. After twenty seconds the contents of the function tables
containing the two impulse responses are reversed by calling a UDO
(instrument 3) and the convolution procedure is repeated, this time with
a \'backwards reverb\' effect. When the reversed version is performed
the dry signal is delayed further before being sent to the speakers so
that it appears that the reverb impulse sound occurs at the culmination
of the reverb build-up. This additional delay is switched on or off via
p6 from the score. As with pconvolve, ftconv performs the convolution
process in overlapping partitions to minimise latency. Again we can
minimise the size of these partitions and therefore the latency but at
the cost of CPU efficiency. ftconv\'s documentation refers to this
partition size as \'iplen\' (partition length). ftconv offers further
facilities to work with multichannel files beyond stereo. When doing
this it is suggested that you use
[GEN52](http://www.csounds.com/manual/html/GEN52.html) which is designed
for this purpose. [GEN01](http://www.csounds.com/manual/html/GEN01.html)
seems to work fine, at least up to stereo, provided that you do not
defer the table size definition (size=0). With ftconv we can specify the
actual length of the impulse response - it will probably be shorter than
the power-of-2 sized function table used to store it - and this action
will improve realtime efficiency. This optional argument is defined in
sample frames and defaults to the size of the impulse response function
table.

#### *EXAMPLE 05H02\_ftconv.csd*

    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>

    <CsInstruments>

    sr     =  44100
    ksmps  =  512
    nchnls =  2
    0dbfs  =  1

    ; impulse responses stored as stereo GEN01 function tables
    giStairwell     ftgen   1,0,131072,1,"Stairwell.wav",0,0,0
    giDish          ftgen   2,0,131072,1,"Dish.wav",0,0,0

    gasig init 0

    ; reverse function table UDO
     opcode tab_reverse,0,i
    ifn             xin
    iTabLen         =               ftlen(ifn)
    iTableBuffer    ftgentmp        0,0,-iTabLen,-2, 0
    icount          =               0
    loop:
    ival            table           iTabLen-icount-1, ifn
                    tableiw         ival,icount,iTableBuffer
                    loop_lt         icount,1,iTabLen,loop
    icount          =               0
    loop2:
    ival            table           icount,iTableBuffer
                    tableiw         ival,icount,ifn
                    loop_lt         icount,1,iTabLen,loop2
     endop

     instr 3 ; reverse the contents of a function table
              tab_reverse p4
     endin

     instr 1 ; sound file player
    gasig           diskin2   p4,1,0,1
     endin

     instr 2 ; convolution reverb
    ; buffer length
    iplen   =       1024
    ; derive the length of the impulse response
    iirlen  =       nsamp(p4)
    ar1,ar2 ftconv  gasig, p4, iplen,0, iirlen
    ; delay compensation. Add extra delay if reverse reverb is used.
    adel            delay     gasig,(iplen/sr) + ((iirlen/sr)*p6)
    ; create a dry/wet mix
    aMixL   ntrpol    adel,ar1*0.1,p5
    aMixR   ntrpol    adel,ar2*0.1,p5
            outs      aMixL,aMixR
    gasig           =         0
     endin

    </CsInstruments>

    <CsScore>
    ; instr 1. sound file player
    ;    p4=input soundfile
    ; instr 2. convolution reverb
    ;    p4=impulse response file
    ;    p5=dry/wet mix (0 - 1)
    ;    p6=reverse reverb switch (0=off,1=on)
    ; instr 3. reverse table contents
    ;    p4=function table number

    ; 'stairwell' impulse response
    i 1 0 8.5 "loop.wav"
    i 2 0 10 1 0.3 0

    ; 'dish' impulse response
    i 1 10 8.5 "loop.wav"
    i 2 10 10 2 0.8 0

    ; reverse the impulse responses
    i 3 20 0 1
    i 3 20 0 2

    ; 'stairwell' impulse response (reversed)
    i 1 21 8.5 "loop.wav"
    i 2 21 10 1 0.5 1

    ; 'dish' impulse response (reversed)
    i 1 31 8.5 "loop.wav"
    i 2 31 10 2 0.5 1

    e
    </CsScore>
    </CsoundSynthesizer

Suggested avenues for further exploration with ftconv could be applying
envelopes to, filtering and time stretching and compressing the function
table stored impulse files before use in convolution.

The impulse responses I have used here are admittedly of rather low
quality and whilst it is always recommended to maintain as high
standards of sound quality as possible the user should not feel
restricted from exploring the sound transformation possibilities
possible form whatever source material they may have lying around. Many
commercial convolution algorithms demand a proprietary impulse response
format inevitably limiting the user to using the impulse responses
provided by the software manufacturers but with Csound we have the
freedom to use any sound we like.
