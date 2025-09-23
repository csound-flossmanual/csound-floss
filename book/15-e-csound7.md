# 15 E. NEW FEATURES IN CSOUND 7

Csound 7 is perhaps the biggest step in Csound development ever, at least from the user's perspective. Full flexibility of naming variables, extended array features, for-loops and much more really brings a new experience of using Csound. We cover here some of these features with small examples; you may compare to [explanations in the Csound Reference Manual](https://csound.com/manual/intro/whats-new-in-csound-7/).

## Variable Names

Variable names no longer have to start with `i`, `k`, `a` etc. to declare their data type implicitely. Instead any name can be used, and the type is then declared explicitely with a colon and the type abbreviation.

#### **_EXAMPLE 15E01_Explicit_Types.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr Locals

  freq:i = 500
  amp:i = 0.2
  
  sine:a = poscil(amp,freq)
  outall(sine)

endin

instr Globals

  dry@global:a init 0
  
  dry += diskin:a("fox.wav") / 3
  dry += pinkish(.05)
  
  schedule(GlobalsReverb,0,p3+3)
  
endin

instr GlobalsReverb

  wet:a = reverb2(dry,2,.5)
  outall(dry/5+wet/2)
  dry = 0

endin

</CsInstruments>
<CsScore>
i 1 0 2
i 2 3 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

Note that instrument names are now also variables. So instead of refering to an instrument as name via a string, we can now refer to it as variable:

`schedule("GlobalsReverb",0,p3+3)` is still ok but  
`schedule(GlobalsReverb,0,p3+3` is the new way to go.

## Arrays

The equal sign can now be used to declare an array. An array variable uses the same explicit types as discussed above, for instance `i[]` for a numeric array at i-rate. There is a nice shortcut for the `genarray` opcode: `[1 ... 5]` is resolved to `[1,2,3,4,5]`.

#### **_EXAMPLE 15E02_Arrays.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr ArrayDef

  freq:i[] = [500,600,700]
  vals:k[] = [3,5,7,8]
  ser:i[] = [1 ... 10] //shortcut
  files:S[] = ["bla.wav","blu.flac"]
  sound:a[] = diskin("fox.wav")
  printarray(ser)
  turnoff

endin

instr ArrayExample

  // two random k-rate envelopes in an array
  env:k[] = [randomi:k(-20,0,15,3),randomi:k(-20,0,15,3)]

  // two mono sound streams
  a1 = diskin:a("fox.wav",randomi:k(.7,1.1,1,3),0,1)
  a2 = diskin:a("ClassGuitMono.wav",randomi:k(.8,1.3,1,3),0,1)
  
  // apply envelopes and put into array
  audio:a[] = [a1*ampdb(env[0]), a2*ampdb(env[1])]
  
  // sometimes swap the audio channels (clicks may occur)
  if (randomh:k(0,2,1,3) > 1) then
    audio = [audio[1], audio[0]]
  endif
  
  // output
  out(audio)
  
endin

</CsInstruments>
<CsScore>
i 1 0 1
i 2 0 10
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

## For-Loops

For-loops have been implemented in two variants.

The first one uses the syntax `for var in [array] do` where `var` uses the own given type to determine whether the loop should be executed at i-time or at k-time. If the type of `var` is not given, it uses the type of the array.

The second variant of for-loop has a counter as second variable: `for var,i in [array] do`. This counter starts from zero and counts the number of loops.

#### **_EXAMPLE 15E03_For-loops.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr K_loop_due_to_var

  // num is k so the loop runs at k-rate
  num:k init 0
  for num in [1,2,3,5,8] do
    printk(0,num)
  od
  turnoff

endin

instr I_Loop_Simple
  
  // num is not specified: i-rate because of the i-rate array
  for num in [1,2,3,5,8] do
    print(num)
  od

endin

instr I_Loop_With_Counter
  
  // the same but with loop counter 
  for num,i in [1,2,3,5,8] do
    print(num,i)
  od
  
endin

instr Short

  strt:i init 0
  for freq in [200 ... 2000, 100] do // = [200, 300, ..., 2000]
    schedule(PlaySine,strt,5-strt,freq)
    strt += 1/8
  od

endin

instr PlaySine

  env:a = transeg(.1,p3,-3,0)
  outall(poscil:a(env,p4))

endin


</CsInstruments>
<CsScore>
i 1 0 1
i 2 0.1 0
i 3 0.2 0
i 4 0.3 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```

## New UDO Syntax and Pass-by-reference

User Defined Opcodes now follow the syntax `opcode name(inargs):(outargs)`. When this syntax is used, the arguments are called by reference, and not by copy. This gives new possibilities, but also allows destructive changes as the example shows.


#### **_EXAMPLE 15E04_UDOs.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

// new UDO definition which implicitely changes the input array

opcode Destructive(arr:i[]):()
  for v,i in arr do
    arr[i] = -v
  od
endop

instr TestDestructive

  myarr:i[] = [1,2,3,4,5]
  printarray(myarr)
  Destructive(myarr)
  printarray(myarr)
  turnoff
endin


// old UDO definition does not change the input array as it is copied

opcode NonDestructive, 0, i[]
  arr:i[] xin
  for v,i in arr do
    arr[i] = -v
  od  
endop

instr TestNonDestructive

  myarr:i[] = [1,2,3,4,5]
  printarray(myarr)
  NonDestructive(myarr)
  printarray(myarr)
  turnoff

endin


// routing an array of audio signals to hardware outputs
// /practical use case is for multichannel not stereo)

opcode Route(asigs:a[],hwouts:k[]):()
  for h,i in hwouts do
    outch(h,asigs[i])
  od
endop

instr ArrayRouting

  // array of hardware output channels (starting at 1)
  hw_out_chnls:k[] = [2,1]
  
  // array of audio signals
  audio_sigs:a[] = [poscil:a(.2,500),poscil:a(.2,400)]
  
  // output
  Route(audio_sigs,hw_out_chnls)
  
endin

</CsInstruments>
<CsScore>
i 1 0 1
i 2 0.1 1
i 3 0.2 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
```
