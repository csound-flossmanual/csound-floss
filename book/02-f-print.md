# HOW TO: PRINT

Unfortunately, Csound's print facilities are scattered amongst many different
opcodes. You can print anything, but depending on the situation, you will need
a particular print opcode. 

## Basic printing of variables

### Which opcodes can I use for simple i-rate printing?

### Which opcodes can I use for simple k-rate printing?

### Can I have simple a-rate printing?

## 

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
