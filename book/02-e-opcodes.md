# HOW TO: OPCODES

## OVERVIEW

### What are the essential opcodes? Do I need to know all opcodes?

I am sure that there is no expert user who knows all of the 1500+ opcodes. To
give some help and advice about essential opcodes, have a look at these overviews:

- The [Opcodes Overview](https://csound.com/docs/manual/PartOpcodesOverview.html)
  in the Reference Manual.
- The [Opcode Guide](/appendix/opcode-guide) in this textbook.


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

(Show example about slow table reading.)

## SOUND FILES

### What is the difference between diskin and diskin2?

There is none any more. Just use `diskin`, and don't worry about messages
which mention `diskin2`. They are the same (nowadays).
