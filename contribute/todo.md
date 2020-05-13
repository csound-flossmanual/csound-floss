TO DO
=====

- test all examples
- go through all examples and
    - replace some instrument numbers by names
    - introduce some functional style
    - format 
- more consistency in either *myVar* or `myVar` 


Edits
-----

- 01-a (digital audio)
    - perhaps introduce bitwise operations
    - perhaps introduce frequency-domain representation
- 01-d (random)
    - perhaps give more connection to csound
- 03-d (tables)
    - reading values could be described better: either index+table (where index can derive from linseg or phasor), or oscillator.
    - look at interesting new gen routines for the overview
    - new plots for it
- 04-e (wave shaping)
    - standard polynomial and Chebyshev polynomial wave shaping – both using
      the opcodes and function tables
    - Tanh waveshaping, both using the function tanh() and a function table
      GEN “tanh”
- 04-g (physical models)
    - maybe add prepiano and platerev examples
    - modal synthesis to mention here?
- 05-a (envelopes)
    - add envelopes stored as function tables
- 05-b (spatial)
    - ambi udos: array output wherever possible
- 05-c (filter)
    - perhaps add notch, shelf filter and equilizers
    - add figures
    - go deeper in the implementation of filters, perhaps with steven's udos
    - how to create a multiband graphic EQ
    - example of the classic channel vocoder could fit here
- 05-i (fft)
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


Other
-----

- what about filescal?  


In Process
----------

- Nikhil about Csound iOS (20191208)
- Hlodver will contribute Live Coding Chapter (14 C) (20191215)
- Asked Luis and Hlodver about Csound in vim and Emacs (20191215)


