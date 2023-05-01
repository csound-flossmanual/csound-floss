# HOW TO: PRINT

Unfortunately, Csound's print facilities are scattered amongst many different
opcodes. You can print anything, but depending on the situation, you will need
a particular print opcode. The following list is not complete, but will hopefully give some help to figure out the appropriate opcode for printing.

The main distinction is between printing at i-rate and printing at k-rate.

Printing at i-rate means: Printing only once, at the start of an instrument instance.

Printing at k-rate means: Printing during the performance of the instrument instance. Usually we will not print values every k-cycle because this would result in more than thousand printouts for a `sr = 44100` and `ksmps = 32`. So the different opcodes offer either a time interval or a trigger.

## Printing at i-rate

### Which opcodes can I use for basic i-rate printing?

#### Numbers: **print()**

`print` is for simple printing of i-rate numbers. Note that it rounds to three decimals.

    iValue = 8.876543
    print(iValue)
    -> iValue = 8.877

#### Strings: **puts()**

`puts` prints a string on a new line:

    String1 = "Hello ..."
    String2 = "... newline!"
    puts(String1,1)
    puts(String2,1)
    -> Hello ...
       ... newline!


#### Arrays: **printarray()**

`printarray` prints an i-rate array.

    iArr[] genarray 0,5
    printarray(iArr)
    ->  0.0000 1.0000 2.0000 3.0000 4.0000 5.0000

### Which opcodes can I use for formatted i-rate printing?

#### **prints()**

`prints` offers formatting and can be used for both, numbers and strings.

    iValue = 8.876543
    String = "Hello"
    prints("%s %f!\n",String,iValue)
    -> Hello 8.876543!

#### **printf_i()**

`printf_i` has an additional trigger input. It prints only when the trigger is larger than zero. So this statement will do nothing:

    iTrigger = 0
    String = "Hello"
    printf("%s %f!\n",iTrigger,String,iTrigger)

But this will print:

    iTrigger = 1
    String = "Hello"
    printf("%s %f!\n",iTrigger,String,iTrigger)
    -> Hello 1.000000!

### Which opcodes can I use for basic k-rate printing?

#### Numbers: **printk()** or **printk2()**

`printk` is for simple printing of k-rate numbers (rounded to five decimals). The first input parameter specifies the time intervall in seconds between each printout. So this code will print the control cycle count once a second:

    kValue = timek()
    printk(1,kValue)

The printout for `sr = 44100` and `ksmps = 32` shows:

     i   1 time     0.00000:     1.00000
     i   1 time     1.00063:  1380.00000
     i   1 time     2.00127:  2759.00000

`printk2` is useful for printing numbers when they change.

    instr 1
      kValue = randomh(0,1,1,3)
      printk2(kValue)
    endin
    schedule(1,0,2)
    ->  i1     0.88287
        i1     0.29134

#### Strings: **puts()**

`puts` prints a string on a new line. If the trigger input changes its value, the string is printed.

    instr 1
      //initialize string
      String = "a"
      //initialize trigger for puts()
      kTrigger init 1
      //printout when kTrigger is 1 and changed
      puts(String,kTrigger)
      //change string randomly
      kValue = rnd:k(1)
      if kValue > 0.999 then
        kTrigger += 1
        String = sprintfk("%c",random:k(65,90))
      endif
    endin
    schedule(1,0,1)
    -> a
       W
       H
       X
       D
       A
       N

#### Arrays: **printarray()**

The `printarray` opcode can also be used for k-rate arrays. It prints whenever the trigger input changes from 0 to 1.

    instr 1
      //create an array [0,1,2,3,4,5]
      kArr[] genarray_i 0,5
      //print the array values once a second
      printarray(kArr,metro:k(1))
      //change the array values randomly
      kIndx = 0
      while(kIndx < lenarray(kArr)) do
        kArr[kIndx] = rnd:k(6)
        kIndx += 1
      od
    endin
    schedule(1,0,4)
    ->  0.0000 1.0000 2.0000 3.0000 4.0000 5.0000
        0.7974 0.4855 3.4391 4.3606 5.9973 5.3945
        5.9479 0.1663 5.6173 1.1320 5.9309 4.3610
        5.6611 5.7748 5.8275 5.4023 2.3570 3.7158

### Which opcodes can I use for formatted k-rate printing?

#### **printks()**

Similar to `prints` we can fill a format string. The time between print intervals is given as first parameter. So this will print once a second:

    instr 1
      kValue = rnd:k(1)
      printks("Time = %f, kValue = %f\n",1,times:k(),kValue)
    endin
    schedule(1,0,4)
    -> Time = 0.000726, kValue = 0.973500
       Time = 1.001361, kValue = 0.262336
       Time = 2.001995, kValue = 0.858091
       Time = 3.002630, kValue = 0.144621

#### **printf()**

`printf` works with a trigger, not with a fixed time interval between printouts.

    instr 1
      kValue = rnd:k(1)
      if kValue > 0.999 then
        kTrigger = 1
      else
        kTrigger = 0
      endif
      printf("Time = %f, kValue = %f\n",kTrigger,times:k(),kValue)
    endin
    schedule(1,0,4)
    -> Time = 0.380952, kValue = 0.999717
       Time = 0.383129, kValue = 0.999951
       Time = 2.535329, kValue = 0.999191
       Time = 3.274739, kValue = 0.999095
       Time = 3.443810, kValue = 0.999773
       Time = 3.950295, kValue = 0.999182

### Can I have simple a-rate printing?

If we want to print every sample, we can create an array of `ksmps` length, then write the samples in it and print it via `printarray`. This is an example for `ksmps = 8` and a printout for every k-cycle over 0.001 seconds.

    instr 1
      kArr[] init ksmps
      aSine = poscil:a(1,1000)
      kIndx = 0
      while kIndx < ksmps do
       kArr[kIndx] = aSine[kIndx]
       kIndx += 1
      od
      printarray(kArr,-1)
    endin
    schedule(1,0,.001)
    ->  0.0000 0.1420 0.2811 0.4145 0.5396 0.6536 0.7545 0.8400
        0.9086 0.9587 0.9894 1.0000 0.9904 0.9607 0.9115 0.8439
        0.7591 0.6590 0.5455 0.4210 0.2879 0.1490 0.0071 -0.1349
        -0.2743 -0.4080 -0.5335 -0.6482 -0.7498 -0.8361 -0.9056 -0.9566
        -0.9883 -0.9999 -0.9913 -0.9626 -0.9144 -0.8477 -0.7638 -0.6644
        -0.5515 -0.4275 -0.2948 -0.1561 -0.0142 0.1279 0.2674 0.4015

## Formatting

### Which format specifiers can I use?

```csound
<CsoundSynthesizer>
<CsOptions>
-odac -m0
</CsOptions>
<CsInstruments>

  opcode ToAscii, S, S
  ;returns the ASCII numbers of the input string as string
Sin        xin ;input string
ilen       strlen     Sin ;its length
ipos       =          0 ;set counter to zero
Sres       =          "" ;initialize output string
loop:                 ;for all characters in input string:
ichr       strchar    Sin, ipos ;get its ascii code number
Snew       sprintf    "%d ", ichr ;put this number into a new string
Sres       strcat     Sres, Snew ;append this to the output string
           loop_lt    ipos, 1, ilen, loop ;see comment for 'loop:'
           xout       Sres ;return output string
  endop

  instr Integers
printf_i "\nIntegers:\n  normal: %d or %d\n", 1, 123, -123
printf_i "  signed if positive: %+d\n", 1, 123
printf_i "  space left if positive:...% d...% d\n", 1, 123, -123
printf_i "  fixed width left ...%-10d...or right...%10d\n", 1, 123, 123
printf_i "  starting with zeros if ", 1
printf_i "  necessary: %05d %05d %05d %05d %05d %05d\n",
              1, 1, 12, 123, 1234, 12345, 123456
printf_i "  floats are rounded: 1.1 -> %d, 1.9 -> %d\n", 1, 1.1, 1.9
  endin

  instr Floats
printf_i "\nFloats:\n  normal: %f or %f\n", 1, 1.23, -1.23
printf_i "  number of digits after point: %f %.5f %.3f %.1f\n",
              1, 1.23456789, 1.23456789, 1.23456789, 1.23456789
printf_i "  space left if positive:...% .3f...% .3f\n", 1, 123, -123
printf_i "  signed if positive: %+f\n", 1, 1.23
printf_i "  fixed width left ...%-10.3f...or right...%10.3f\n",
              1, 1.23456, 1.23456
  endin

  instr Strings
printf_i "\nStrings:\n  normal: %s\n", 1, "csound"
printf_i "  fixed width left ...%-10s...or right...%10s\n",
              1, "csound", "csound"
printf_i {{  a string over
    multiple lines in which
      you can insert also quotes: "%s"\n}}, 1, "csound"
  endin

  instr Characters
printf_i "\nCharacters:\n  given as single strings: %s%s%s%s%s%s\n",
            1, "c", "s", "o", "u", "n", "d"
printf_i "  but can also be given as numbers: %c%c%c%c%c%c\n",
              1, 99, 115, 111, 117, 110, 100
Scsound ToAscii "csound"
printf_i "  in csound, the ASCII code of a character ", 1
printf_i "can be accessed with the opcode strchar.%s", 1, "\n"
printf_i "  the name 'csound' returns the numbers %s\n\n", 1, Scsound
  endin

</CsInstruments>
<CsScore>
i "Integers" 0 0
i "Floats" 0 0
i "Strings" 0 0
i "Characters" 0 0
</CsScore>
</CsoundSynthesizer>
```
