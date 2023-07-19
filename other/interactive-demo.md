## Writing interactive GUI for the flossmanual

- must be delimited with `<CsoundWebElements></CsoundWebElements>` tags outside of `<CsoundSynthesizer>` (top or bottom)
- currently no nesting is possible, self-closing elements as long as they are wrapped between Gui tags

### \<Slider\>

Has the following properties (in xml-slang "attributes")

- `id` type string: the name of the channel it should send values to
- `name` type string: meaningful name that is displaued in the GUI window
- `min` type number: smallest value possible in the slider
- `max` type number: largest value possible in the slider
- `defaultValue` type number: the starting value of the slider

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr 1
 kc   chnget    "freq"
 a1   poscil     0.2, kc
 out(a1,a1)
endin

</CsInstruments>
<CsScore>
i 1 0 360 0.2 200
</CsScore>
</CsoundSynthesizer>

<CsoundWebElements>
 <Slider id="freq" name="Cutoff frequency" min={200} max={2000} defaultValue={440} />
</CsoundWebElements>
```
