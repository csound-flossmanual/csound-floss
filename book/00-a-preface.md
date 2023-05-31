# WELCOME TO CSOUND!

![](../resources/images/00-preface-image.png)

... is one of the best known and longest established programs in the
field of audio programming. It has been first released in 1986 at the
Massachusetts Institute of Technology (MIT) by Barry Vercoe. But
Csound's history lies even deeper within the roots of computer music as
it is a direct descendant of the oldest computer program for sound
synthesis, _MusicN_, by Max Mathews. Csound is free and open source,
distributed under the LGPL licence, and it is maintained and expanded by
a core of developers with support from a wider global community.

In the past decade, thanks to the work of Victor Lazzarini, Steven Yi, John
ffitch, Hlöðver Sigurðsson, Rory Walsh, and many others, Csound has moved
from a somehow archaic audio programming language to a modern audio library.
It can not only be used from the command line and the classical frontends.
It can also be used as a VST plugin. It can be used inside the Unity game engine.
It can be used on Android or on any microcomputer like Raspberry Pi or Bela Board.
It can be used via its Application Programming Interface (API) in any other
programming language, like Python, C++ or Java. And it can now also be used
inside any browser as a JavaScript library, just by loading it
as Web Assembly module (WASM Csound). Try it here, if you already know some Csound:

```csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr TryMe
  //some code here ...
endin
schedule("TryMe",0,-1)

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

This textbook cannot cover all these use cases. Its main goal is:

- To provide an interactive [**Getting Started**](01-GS-01.md) tutorial.
- To collect as many as possible [**How to**](/how-to) receipes.
- To offer a readable and comprehensive introduction to the Csound language
  in [Chapter 03](/csound-language).
- To discuss some classical and recent methods of sound synthesis
  in [Chapter 04](/sound-synthesis) and of sound modification
  in [Chapter 05](/sound-modification).
- To offer an [Opcode Guide](15-a-opcode-guide.md) as orientation in the
  overwhelming amount of Csound opcodes.
- To collect different in-depth descriptions and instructions to various subjects,
  without being complete, and sometimes not up-to-date, in chapters 06-14.

This book is called the _Csound FLOSS Manual_ because it has been first released in
2011 at [flossmanuals.net](https://flossmanuals.net/). It should not be
confused with the _Csound Reference Manual_ which can be found
[here](https://csound.com/docs/manual/index.html).

Enjoy reading and coding, and please help improve this textbook by feedbacks
and suggestions on the Github
[discussions](https://github.com/csound-flossmanual/csound-floss/discussions)
page or elsewhere.

\newpage
