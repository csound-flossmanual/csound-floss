UNORDERED EXAMPLE COLLECTION FOR CSOUND 7
=========================================

1. array call be reference (steven mailing list 16 oct 2024)

opcode arrayadd_inplace(arrayRef:i[], ix):void
  arrayRef += ix
endop

instr 1
  myArray:i[] = [0, 1, 2, 3]
  printarray(myArray)
  arrayadd_inplace(myArray, 5)
  printarray(myArray)
endin
