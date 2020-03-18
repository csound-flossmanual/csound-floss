TO DO
=====

- test all examples
- go through all examples and
    - replace some instrument numbers by names
    - introduce some functional style
    - format 
- insert navigation for each chapter
- add more figures or even gifs
- more consistency in either *myVar* or `myVar` 


Edits
-----

- 01-a (digital audio)
    - perhaps introduce bitwise operations
    - perhaps introduce frequency-domain representation
- 01-c (intensities) 
    - write introduction to connect more with csound
- 01-d (random)
    - perhaps give more connection to csound
    - III explain fourth parameter for randomh and randomi.
    - new figures then for 01-d-randomh and 01-d-randomi
- 03-a (init and perf)
    - mention fractional note numbers and additional usefulness of note numbers
    - audio interpolation as a remedy to k-rate zipper in situations where the
      variable has to be k-rate at an earlier stage
- 03-b (variables) 
    - give more space to f-sigs (local and global)
- 03-c (control) 
    - perhaps mention recursion and/or point to udo recursion examples
- 03-d (tables)
    - demonstrate transforming the contents of a function table instantly 
      within a I or k-rate loop
    - look at interesting new gen routines for the overview
    - show exporting tables as files (also in k-rate loop)
- 03-f (live events)
    - mention a new (to write) chapter about live coding
- 04-a (additive)
    - perhaps add example of using an array or function table of partial data
      which is then sent to a recursive UDO from which an additive tone is
      created
- 04-d (fm) 
    - review second part of this chapter
    - make formula formatting consistent
- 04-e (wave shaping)
    - in Powershape section add csd example for what has been described
    - standard polynomial and Chebyshev polynomial wave shaping – both using
      the opcodes and function tables
    - Tanh waveshaping, both using the function tanh() and a function table
      GEN “tanh”
- 04-f (granular) 
    - perhaps start with some basic example like curtis roads
- 04-g (physical models)
    - maybe add prepiano and platerev examples
    - modal synthesis to mention here?
- 04-h (scanned)
    - should be revised
- 05-a (envelopes)
    - add figures before and after example 05A05 (line/linseg and line/expon)
    - also before 05A07
    - add envelopes stored as function tables
- 05-b (spatial)
    - better sound for 05B01
    - ambi udos: array output wherever possible
- 05-c (filter)
    - perhaps add notch, shelf filter and equilizers
    - add figures
    - go deeper in the implementation of filters, perhaps with steven's udos
    - how to create a multiband graphic EQ
    - example of the classic channel vocoder could fit here
- 05-d (delay)
    - add vdelay opcodes etc
    - add steven's basic implementation [1]
- 05-e (reverb)
    - add figures showing function table contents in the last example 05F04
- 05-g (granular)
    - a step-by-step description can be added at the end
- 05-h (convolution)
    - oeyvind's new live convolution opcode liveconv should be added here
- 05-i (fft)
    - figure before example 05I03 to show the tremor time pointer would be nice
    - add section at the end dedicated to pvsblur, pvsmooth and similar ways
      to improve audio quality
    - add a section about pvsbin and pvstrace
    - pvshift should be added to the pitch shifting section
    - pvsosc?
- 05-k (ats)
    - coding of the examples might be up to modernize
- 07-d (reading midi)
    - can we include the midi file and the sound fonts for example 07D01?
    - add hint for any script or application for midi2score
- 08-a (osc)
    - could be more extended; perhaps take some of my chapter for the
      csound book here
- 09-b (csound in maxmsp) 
    - needs to be updated
- 10-a (csoundqt) 
    - describe some use cases here. perhaps more links to csoundqt's website
- 10-f (web csound) 
    - must certainly be updated (michael will do)
- 11-a (utility: analysis)
    - add short description about atsa etc
- 11-b and 11-c also more explanation
- 12-b (csound python)
    - write about ctcsound and also point to score methods.
- 12-c (csound lua) 
    - must be filled (philipp)
- 14-a (score methods)
    - perhaps mark Cmask etc as historical tools
- 14-b (python csoundqt)
    - should perhaps go to csoundqt website. instead point to it in the
      new csoundqt chapter (10-a) describing use cases
- 15-a (opcode guide) 
    - must be reviewed
- 15-b (glossary)
    - review or remove



In Process
----------

- Martin written about his chapters (20191125)
- Nikhil about Csound iOS (20191208)
- Hlodver will contribute Live Coding Chapter (14 C) (20191215)
- Asked Luis and Hlodver about Csound in vim and Emacs (20191215)
- Asekd Anton about new version of Haskell chapter (20191215)
- Asked Jan Jan the same about Blue chapter (20191231)


[1] (mailing list dec 11, 2019)

instr CustomDelayLine

  ;; 0.25 second delay
  idel_size = 0.25 * sr
  kdelay_line[] init idel_size
  kread_ptr init 1
  kwrite_ptr init 0

  asig = vco2(0.5, 220 * (1 + int(lfo:k(3, 2, 2))) * expon(1, p3, 4), 10)
  asig = zdf_ladder(asig, 2000, 4)

  kindx = 0
  while (kindx < ksmps) do
    kdelay_line[kwrite_ptr] = asig[kindx]
    asig[kindx] = asig[kindx] + kdelay_line[kread_ptr]

    kwrite_ptr = (kwrite_ptr + 1) % idel_size
    kread_ptr = (kread_ptr + 1) % idel_size

    kindx += 1
  od

  out(asig, asig)

endin

schedule("CustomDelayLine", 0, 10)

