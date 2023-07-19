# HOW TO: OPCODES

## OVERVIEW

### What are the essential opcodes? Do I need to know all opcodes?

I am sure that there is no expert user who knows all of the 1500+ opcodes. To
give some help and advice about essential opcodes, have a look at these overviews:

- The [Opcodes Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
  in the Reference Manual.
- The [Opcode Guide](/miscellanea/opcode-guide) in this textbook.

## OSCILLATORS

### Why are there so many different oscillators in Csound?

In general, the large number of oscillators is an example for how Csound
developed. You can call it "liberal", or "anarchic", or whatever, but as a matter
of fact there was and is not a strict regulation about opcodes to be added.
If a developer feels like something cannot be done with an existing opcode,
he might rather write a new one instead of extending an existing one.

As to oscillators, the reasons to write new oscillators are: Efficiency and
use cases. In the early time of computer music, each and every bit was valuable,
so to say. The `oscil` opcode comes from this period and uses a very simple
way to read a table, because it was fast and good enough for most use cases
in the audible range. For other use cases, for instance LFO, other oscillators
were added.

### Which oscillator is the best?

I use `poscil` in this book, because it is a very precise oscillator.
`oscili` and `oscil3` are good alternatives.

### Why should oscil be used with caution?

The `oscil` opcode reads a table with **no** interpolation. Here comes a simple example in which the table only consists of eight numbers which are read once a second, so with a frequency of 1 Hz.

```csound
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
ksmps = 32

//create GEN02 table with numbers [0,1,2,3,4,3,2,1]
giTable = ftgen(0,0,8,-2, 0,1,2,3,4,3,2,1)

instr 1
  //let oscil cross the table values once a second
  a1 = oscil:a(1,1,giTable)
  //print the result every 1/10 second
  printks("Time = %.1f sec: Table value = %f\n", 1/10, times:k(), a1[0])
endin

</CsInstruments>
<CsScore>
i 1 0 2.01
</CsScore>
</CsoundSynthesizer>
```

The printout shows that `oscil` only returns the actual table values, without anything "in between". But this "in between" is required in many cases, for instance when a sine table consists of 1024 points, and is read with a frequency of 100 Hz at a sample rate of 44100 Hz. The number of table values for one second is 102400, but we only have 44100 samples. So in this case 2.32... table values meet one sample, and this requires interpolation.

Whether this lack of interpolation leads to audible artefacts or not depends on the size of the table and the oscillator's frequency. It can be audible for small tables and low frequencies. To avoid any possible artefacts, `oscili` or `poscil`should be used for linear interpolation, and `oscil3` or `poscil3` for cubic interpolation.

## SOUND FILES

### What is the difference between diskin and diskin2?

There is none any more. Just use `diskin`, and don't worry about messages
which mention `diskin2`. They are the same (nowadays).
