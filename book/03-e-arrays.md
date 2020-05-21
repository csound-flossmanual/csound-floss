03 E. ARRAYS
============

Arrays can be used in Csound since version 6. This chapter first describes the naming conventions and the different possibilities to create an array. After looking more closely to the different types of arrays, the operations on arrays will be explained. Finally examples for the usuage of arrays in user-defined opcodes (UDOs) are given.


Naming Conventions
------------------

An array is stored in a variable. As usual in Csound, the first character of the variable name declares the array as **i** (numbers, init-time), **k** (numbers, perf-time), **a** (audio vectors, perf-time) or **S** (strings, init- or perf-time). (More on this below, and in chapter [03 A](03-a-initialization-and-performance-pass.md).)

At *first* occurrence, the array variable must be followed by *brackets*. The brackets determine the dimensions of the array. So

    kArr[] init 10

creates a one-dimensional k-array of length 10, whereas

    kArr[][] init 8, 10

creates a two-dimensional k-array with 8 rows and 10 columns.

*After* the first occurence of the array, referring to it as a whole
is done *without* any brackets. Brackets are only used if an element is
indexed:

    kArr[]   init   10             ;with brackets: first occurrence
    kLen     =      lenarray(kArr) ;without brackets: *kArr* not *kArr[]*
    kFirstEl =      kArr[0]        ;with brackets because of indexing

The same syntax is used for a simple copy via the $=$ operator:

    kArr1[]  init   10             ;creates kArr1
    kArr2[]  =      kArr1          ;creates kArr2[] as copy of kArr1


Creating an Array
-----------------

An array can be created by different methods:

- with the [init](https://csound.com/docs/manual/init.html) opcode,
- with [fillarray](https://csound.com/docs/manual/fillarray.html),
- with [genarray](https://csound.com/docs/manual/fillarray.html),
- as a copy of an already existing array with the
  [=](https://csound.com/docs/manual/assign.html) operator,
- implicit as result of some opcodes, e.g. *diskin*.


### *init*

The most general method, which works for arrays of any number of
dimensions, is to use the [init](https://csound.com/docs/manual/init.html) opcode. Each argument for *init* denotes the size of one dimension.

    kArr[]   init 10    ;creates a one-dimensional array with length 10
    kArr[][] init 8, 10 ;creates a two-dimensional array (8 lines, 10 columns)


### *fillarray*

With the [fillarray](https://csound.com/docs/manual/fillarray.html) opcode distinct values are assigned to an array. If the array has not been created before, it will be created as result, in the size of elements which are given to *fillarray*. This ...

    iArr[] fillarray 1, 2, 3, 4

... creates an *i*-array of size=4.  Note the difference in using the brackets in case the array has been created before, and is filled afterwards:

    iArr[] init 4
    iArr fillarray 1, 2, 3, 4

It is also possible to use [functional syntax](03-i-functional-syntax.md) for fillarray:

    iArr[] = fillarray(1, 2, 3, 4)

In conjunction with a previously defined two-dimensional array, *fillarray* can set the elements, for instance:

    iArr[][] init 2, 3
    iArr fillarray 1, 2, 3, -1, -2, -3

This results in a 2D array (matrix) with the elements 1 2 3 as first row, and -1 -2 -3 as second row.[^1]

[^1]:  Another method to fill a matrix is to use the
       [setrow](https://csound.com/docs/manual/setrow.html) opcode.
       This will be covered later in this chapter.


### *genarray*

This opcode creates an array which is filled by a series of numbers from
a start value to an (included) end value. Here are some examples:

    iArr[] genarray   1, 5 ; creates i-array with [1, 2, 3, 4, 5]
    kArr[] genarray_i 1, 5 ; creates k-array at init-time with [1, 2, 3, 4, 5]
    iArr[] genarray   -1, 1, 0.5 ; i-array with [-1, -0.5, 0, 0.5, 1]
    iArr[] genarray   1, -1, -0.5 ; [1, 0.5, 0, -0.5, -1]
    iArr[] genarray   -1, 1, 0.6 ; [-1, -0.4, 0.2, 0.8]


### Copy with $=$

The [=](https://csound.com/docs/manual/assign.html) operator copies any existing array to a new variable. The example shows how a global array is copied into a local one depending on a score p-field: If *p4* is set to 1, *iArr\[\]* is set to the content of *gi_Arr_1*; if *p4* is 2, it gets the content of *gi_Arr_2*. The content of *iArr\[\]* is then sent to instr *Play* in a [while](https://csound.com/docs/manual/while.html) loop.


   ***EXAMPLE 04E01_CopyArray.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-odac -m128
</CsOptions>
<CsInstruments>
sr = 44100
nchnls = 2
0dbfs = 1
ksmps = 32

gi_Arr_1[] fillarray 1, 2, 3, 4, 5
gi_Arr_2[] fillarray 5, 4, 3, 2, 1

instr Select
 if p4==1 then
  iArr[] = gi_Arr_1
 else
  iArr[] = gi_Arr_2
 endif
 index = 0
 while index < lenarray(iArr) do
  schedule("Play",index/2,1,iArr[index])
  index += 1
 od
endin

instr Play
 aImp mpulse 1, p3
 iFreq = mtof:i(60 + (p4-1)*2)
 aTone mode aImp,iFreq,100
 out aTone, aTone
endin

</CsInstruments>
<CsScore>
i "Select" 0 4 1
i "Select" + . 2
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Implicit as Opcode Output

Some opcodes generate arrays as output. The size of the array depends on the opcode's input. The [diskin](https://csound.com/docs/manual/diskin.html) opcode, for instance, returns an array which has the same size as the number of channels in the audio file. So in the following code, the first array *aRead_A* will have one element (as the audio file is mono), the second array *aRead_B* will have two elements (as the audio file is stereo), the third array *aRead_C* will have four elements (as the audio file is quadro).

    aRead_A[] diskin "mono.wav"
    aRead_B[] diskin "stereo.wav"
    aRead_C[] diskin "quadro.wav"

Other opcodes which return arrays as output are [vbap](https://csound.com/docs/manual/vbap.html), [bformdec1](https://csound.com/docs/manual/bformdec1.html), [loscilx](https://csound.com/docs/manual/loscilx.html) for audio arrays, and [directory](https://csound.com/docs/manual/directory.html) for string arrays.


Types of Arrays
---------------


### *i*- and *k*-Rate

Most arrays which are typed by the user to hold data will be either i-rate or
k-rate. An i-array can only be modified at init-time, and any operation
on it is only performed once, at init-time. A k-array can be modified
during the performance, and any (k-) operation on it will be performed
in every k-cycle (!).[^2] Here is a simple example showing the difference:

[^2]: More detailed explanation about i- and k-rate can be found in
      chapter [03 A](03-a-initialization-and-performance-pass.md)


   ***EXAMPLE 03E02_i_k_arrays.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-nm128 ;no sound and reduced messages
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 4410 ;10 k-cycles per second

instr 1
iArr[] array 1, 2, 3
iArr[0] = iArr[0] + 10
prints "   iArr[0] = %d\n\n", iArr[0]
endin

instr 2
kArr[] array 1, 2, 3
kArr[0] = kArr[0] + 10
printks "   kArr[0] = %d\n", 0, kArr[0]
endin

</CsInstruments>
<CsScore>
i 1 0 1
i 2 1 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The printout is:

    iArr[0] = 11

    kArr[0] = 11
    kArr[0] = 21
    kArr[0] = 31
    kArr[0] = 41
    kArr[0] = 51
    kArr[0] = 61
    kArr[0] = 71
    kArr[0] = 81
    kArr[0] = 91
    kArr[0] = 101

Although both instruments run for one second, the operation to increment
the first array value by ten is executed only once in the *i*-rate version
of the array. But in the *k*-rate version, the incrementation is repeated
in each *k*-cycle - in this case every 1/10 second, but usually something
around every 1/1000 second.


### Audio Arrays

An audio array is a collection of audio signals. The size (length) of the audio array denotes the number of audio signals which are hold in it. In the next example, the audio array is created for two audio signals:

    aArr[] init 2

The first audio signal in the array *aArr[0]* carries the output of a sine oscillator with frequency 400 Hz whereas *aArr[1]* gets 500 Hz:

    aArr[0] poscil  .2, 400
    aArr[1] poscil  .2, 500

A percussive envelope *aEnv* is generated with the [transeg](https://csound.com/docs/manual/transeg.html) opcode. The last line

    out aArr*aEnv

multiplies the envelope with each element of the array, and the [out](https://csound.com/docs/manual/out.html) opcode outputs the result to both channels of the audio output device.


   ***EXAMPLE 03E03_Audio_array.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-odac -d
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr AudioArray
 aArr[]  init    2
 aArr[0] poscil  .2, 400
 aArr[1] poscil  .2, 500
 aEnv    transeg 1, p3, -3, 0
         out     aArr*aEnv
endin

</CsInstruments>
<CsScore>
i "AudioArray" 0 3
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

As mentioned above, some opcodes create audio arrays implicitely according to the number of input audio signals:

    arr[] diskin "7chnls.aiff", 1

This code will create an audio array of size 7 according to the seven channel
input file.


### Strings

Arrays of strings can be very useful in many situations, for
instance while working with file paths.[^3] The array can be filled by one of the ways described above, for instance:

    S_array[] fillarray "one", "two", "three"

[^3]:  You cannot currently have a mixture of numbers and strings in an
       array, but you can convert a string to a number with the
       [strtod](https://csound.com/docs/manual/strtod.html) opcode.


In this case, *S_array* is of length 3. The elements can be accessed by indexing as usual, for instance

    puts S_array[1], 1

will return *"two"*.

The [directory](https://csound.com/docs/manual/directory.html) opcode looks for all files in a directory and returns an array containing the file names:

   ***EXAMPLE 04E04_Directory.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-odac -d
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr Files
 S_array[] directory "."
 iNumFiles lenarray S_array
 prints "Number of files in %s = %d\n", pwd(), iNumFiles
 printarray S_array
endin

</CsInstruments>
<CsScore>
i "Files" 0 0
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

Which prints for instance:

    Number of files in /home/xy/Desktop = 3
    "test.csd", "test.wav", "test2.csd"


### Local or Global

Like any other variable in Csound, an array usually has a local scope.
This means that it is only valid in the instrument in which it has been defined. If an array is supposed to be valid across instruments, the variable name must be prefixed with the character ***g***, (as is done with other types of global variable in Csound). The next example demonstrates local and global arrays at both *i*- and *k*-rate.


   ***EXAMPLE 03E05_Local_vs_global_arrays.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-nm128 ;no sound and reduced messages
</CsOptions>
<CsInstruments>
ksmps = 32

instr i_local
iArr[] array  1, 2, 3
       prints "   iArr[0] = %d   iArr[1] = %d   iArr[2] = %d\n",
              iArr[0], iArr[1], iArr[2]
endin

instr i_local_diff ;same name, different content
iArr[] array  4, 5, 6
       prints "   iArr[0] = %d   iArr[1] = %d   iArr[2] = %d\n",
              iArr[0], iArr[1], iArr[2]
endin

instr i_global
giArr[] array 11, 12, 13
endin

instr i_global_read ;understands giArr though not defined here
       prints "   giArr[0] = %d   giArr[1] = %d   giArr[2] = %d\n",
              giArr[0], giArr[1], giArr[2]
endin

instr k_local
kArr[] array  -1, -2, -3
       printks "   kArr[0] = %d   kArr[1] = %d   kArr[2] = %d\n",
               0, kArr[0], kArr[1], kArr[2]
       turnoff
endin

instr k_local_diff
kArr[] array  -4, -5, -6
       printks "   kArr[0] = %d   kArr[1] = %d   kArr[2] = %d\n",
               0, kArr[0], kArr[1], kArr[2]
       turnoff
endin

instr k_global
gkArr[] array -11, -12, -13
       turnoff
endin

instr k_global_read
       printks "   gkArr[0] = %d   gkArr[1] = %d   gkArr[2] = %d\n",
               0, gkArr[0], gkArr[1], gkArr[2]
       turnoff
endin
</CsInstruments>
<CsScore>
i "i_local" 0 0
i "i_local_diff" 0 0
i "i_global" 0 0
i "i_global_read" 0 0
i "k_local" 0 1
i "k_local_diff" 0 1
i "k_global" 0 1
i "k_global_read" 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### Different Rates between Array and Index

Usually the first character of a variable name in Csound shows whether
it is *i*-rate or *k*-rate or *a*-rate. But for arrays, we have actually two
signifiers: the array variable type, and the index type. If both
coincide, it is easy:

-   ***i**_array*[***i_**index*] reads and writes at i-time
-   ***k**_array*[***k_**index*] reads and writes at k-time

For audio arrays, we must distinguish between the audio vector itself which is updated sample by sample, and the array as container which can be updated at k-time. (Imagine an audio array whichs index switches each control cycle between 0 and 1; thus switching each k-time between the audio vector of both signals.) So the coincidence between variable and index rate is here:

-   ***a**_array*[***k_**index*] reads and writes at k-time

But what to do if array type and index type do not coincide? In general,
the index type will then determine whether the array is read or written
only once (at init-time) or at each *k*-cycle. This is valid in particular
for *S* arrays (containing strings). Other cases are:

-   ***i**_array*[***k**_index*] reads at k-time; writing is not possible
    (yields a runtime error)
-   ***k**_array*[***i**_index*] reads and writes at k-rate
-   ***a**_array*[***i**_index*] reads and writes at k-rate


### Init Values of *k*-Arrays

In case we want to retrieve the value of a *k*-array at init time,
a special version of the [i()](https://csound.com/docs/manual/opi.html) feature must be used. For usual k-variables, a simple *i(kVar)* works, for instance ...

    instr 1
     gkLine linseg 1, 1, 2
     schedule 2, .5, 0
    endin
    schedule(1,0,1)
    instr 2
     iLine = i(gkLine)
     print iLine
    endin

... will print: *iLine = 1.499*.

This expression can **not** be used for arrays:

    kArray[] fillarray 1, 2, 3
    iFirst = i(kArray[0])
    print iFirst

This will return an error. For this purpose, the i() expression gets a second argument which signifies the index:

    kArray[] fillarray 1, 2, 3
    iFirst = i(kArray, 0)
    print iFirst

This will print: *iFirst = 1.000*.


Operations on Arrays
--------------------

### Analyse

#### *lenarray* — Array Length

The opcode [lenarray](https://csound.com/docs/manual/lenarray.html)
reports the length of an array.

    iArr[] fillarray 0, 1, 2, 3, 4
    iLen lenarray iArr ; -> 5
    aArr[] diskin "my_stereo_file.wav"
    iLen lenarray aArr ; -> 2
    S_array[] fillarray "foo", "bar"
    iLen lenarray S_array ; -> 2

For reporting the length of multidimensional arrays, *lenarray* has an additional argument denoting the dimension. The default is 1 for the first dimension.

    kArr[][] init 9, 5
    iLen1 lenarray kArr ; -> 9
    iLen2 lenarray kArr, 2 ; -> 5
    kArrr[][][] init 7, 9, 5
    iLen1 lenarray kArrr, 1 ; -> 7
    iLen2 lenarray kArrr, 2 ; -> 9
    iLen3 lenarray kArrr, 3 ; -> 5

By using functional syntax, *lenarray()* will report the array length at init-time. If the array length is being changed during performance, *lenarray:k()* must be used to report this.


#### *minarray*, *maxarray* — Smallest/Largest Element

The opcodes [minarray](https://csound.com/docs/manual/minarray.html) and
[maxarray](https://csound.com/docs/manual/maxarray.html) return the smallest or largest element of a numerical array:

    iArr[] fillarray 4, -2, 3, 10, 0
    print minarray:i(iArr) ; -> -2
    print maxarray:i(iArr) ; -> 10


#### *sumarray* — Sum of all Elements

This is an example for [sumarray](https://csound.com/docs/manual/sumarray.html):

    iArr[] fillarray 4, -2, 3, -10, 0
    print sumarray(iArr) ; -> -5


#### *cmp* — Compare with another Array or with Scalars

The [cmp](https://csound.com/docs/manual/cmp.html) opcode offers quite extended possibilities to compare an array to numbers or to another array. The following example investigates in line 18 whether the elements of the array [1,2,3,4,5] are larger or equal 3. Line 20 tests whether the elements are larger than 1 and smaller or equal 4. Line 22 performs an element by element comparison with the array [3,5,1,4,2], asking for larger elements in the original array.


   ***EXAMPLE 03E06_cmp.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-m0
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

giArray[] fillarray 1, 2, 3, 4, 5
giCmpArray[] fillarray 3, 5, 1, 4, 2

instr Compare
 printarray giArray, "%d", "Array:"
 printarray giCmpArray, "%d", "CmpArray:"
 iResult[] cmp giArray, ">=", 3
 printarray iResult, "%d", "Array >= 3?"
 iResult[] cmp 1, "<", giArray, "<=", 4
 printarray iResult, "%d", "1 < Array <= 4?"
 iResult[] cmp giArray, ">", giCmpArray
 printarray iResult, "%d", "Array > CmpArray?"
endin

</CsInstruments>
<CsScore>
i "Compare" 0 1
</CsScore>
</CsoundSynthesizer>
;example by eduardo moguillansky and joachim heintz
~~~

The printout is:

    Array:
     1 2 3 4 5
    CmpArray:
     3 5 1 4 2
    Array >= 3?
     0 0 1 1 1
    1 < Array <= 4?
     0 1 1 1 0
    Array > CmpArray?
     0 0 1 0 1


### Content Modifications

#### *scalearray* — Scale Values

The [scalearray](https://csound.com/docs/manual/scalearray.html) opcode destructively changes the content of an array according to a new minimum and maximum:

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    scalearray iArr, 1, 3
    printarray iArr ; -> 1.2222 1.4444 2.1111 1.6667 1.7778 1.0000 3.0000

Optional a range of the array can be selected for the operation; in this example from index 0 to index 4:

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    scalearray iArr, 1, 3, 0, 4
    printarray iArr ; -> 1.0000 1.5000 3.0000 2.0000 6.0000 -1.0000 17.0000


#### *sorta*/*sortd* — Sort in Ascending/Descending Order

The opcodes [sorta](https://csound.com/docs/manual/sorta.html) and [sortd](https://csound.com/docs/manual/sortd.html) return an array in which the elements of the input array are sorted in ascending or descending order. The input array is left untouched.

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    iAsc[] sorta iArr
    iDesc[] sortd iArr
    printarray iAsc, "%d", "Sorted ascending:"
    printarray iDesc, "%d", "Sorted descending:"
    printarray iArr, "%d", "Original array:"

Prints:

    Sorted ascending:
     -1 1 3 5 6 9 17
    Sorted descending:
     17 9 6 5 3 1 -1
    Original array:
     1 3 9 5 6 -1 17


#### *limit* — Limit Values

The [limit](https://csound.com/docs/manual/limit.html) opcode sets a lower and upper limit to which any value off boundaries is restricted.

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    iLimit[] limit iArr, 0, 7
    printarray(iLimit, "%d") ; ->  1 3 7 5 6 0 7


#### *interleave*/*deinterleave*

As the name suggests, the [interleave](https://csound.com/docs/manual/interleave.html) opcode creates a new array in alternating the values of two input arrays. This operation is meant for vectors (one-dimensional arrays) only.

    iArr1[] genarray 1,5
    iArr2[] genarray -1,-5,-1
    iArr[] interleave iArr1, iArr2
    printarray iArr1, "%d", "array 1:"
    printarray iArr2, "%d", "array 2:"
    printarray iArr, "%d", "interleaved:"

Which prints:

    array 1:
     1 2 3 4 5
    array 2:
     -1 -2 -3 -4 -5
    interleaved:
     1 -1 2 -2 3 -3 4 -4 5 -5

And vice versa, [deinterleave](https://csound.com/docs/manual/deinterleave.html) returns two arrays from one input array in alternating its values:

    iArr[] genarray 1,10
    iArr1[], iArr2[] deinterleave iArr
    printarray iArr, "%d", "input array:"
    printarray iArr1, "%d", "deinterleaved 1:"
    printarray iArr2, "%d", "deinterleaved 2:"

Which prints:

    input array:
     1 2 3 4 5 6 7 8 9 10
    deinterleaved 1:
     1 3 5 7 9
    deinterleaved 2:
     2 4 6 8 10



### Size Modifications

#### *slicearray* — New Array as Slice

The [slicearray](https://csound.com/docs/manual/slicearray.html) opcode creates a new array from an existing one. In addition to the input array the first and the last (included) index must be specified:

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    iSlice[] slicearray iArr, 1, 3
    printarray(iSlice, "%d") ; -> 3 9 5
    SArr[] fillarray "bla", "blo", "bli"
    Slice[] slicearray SArr, 1, 2
    printarray(Slice) ; -> "blo", "bli"

An optional argument defines the increment which is one by default:

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    iSlice1[] slicearray iArr, 0, 5
    printarray(iSlice1, "%d") ; -> 1 3 9 5 6 -1
    iSlice2[] slicearray iArr, 0, 5, 2
    printarray(iSlice2, "%d") ; -> 1 9 6


#### *trim*/*trim_i* — Lengthen or Shorten Array

Arrays have a fixed length, and it may be needed to shorten or lengthen it. [trim_i](https://csound.com/docs/manual/trim.html) works for any array at i-rate:

    iArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    trim_i iArr, 3
    printarray(iArr, "%d") -> 1 3 9
    kArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    trim_i kArr, 5
    printarray(kArr, 1, "%d") ; -> 1 3 9 5 6
    aArr[] diskin "fox.wav"
    prints "%d\n", lenarray(aArr) ; -> 1
    trim_i aArr, 2
    prints "%d\n", lenarray(aArr) ; -> 2
    SArr[] fillarray "a", "b", "c", "d"
    trim_i SArr, 2
    printarray(SArr) ; -> "a", "b"

If a length bigger than the current array size is required, the additional elements are set to zero. This can only be used for the init-time version *trim_i*:

    iArr[] fillarray  1, 3, 9
    trim_i iArr, 5
    printarray(iArr, "%d") ; -> 1 3 9 0 0

At performance rather than initialization [trim](https://csound.com/docs/manual/trim.html) can be used. This codes reduces the array size by one for each trigger signal:

    instr 1
    kArr[] fillarray  1, 3, 9, 5, 6, -1, 17
    kTrig metro 1
    if kTrig==1 then
     trim kArr, lenarray:k(kArr)-1
     printarray kArr,-1,"%d"
    endif
    endin
    schedule(1,0,5)

Prints:

    1 3 9 5 6 -1
    1 3 9 5 6
    1 3 9 5
    1 3 9
    1 3

Growing an array during performance is not possible in Csound, because memory will only be allocated at initialization. This is the reason that only *trim_i* can be used for this purpose.


### Format Interchange

#### *copyf2array* — Function Table to Array

As function tables have been the classical way of working with vectors in
Csound, switching between them and the array facility introduced in Csound 6 is a basic operation. Copying data from a function table to a vector is done
by [copyf2array](https://csound.com/docs/manual/copyf2array.html). The following example copies a sine function table (8 points) to an array and prints the array content:

    iFtSine ftgen 0, 0, 8, 10, 1
    iArr[] init 8
    copyf2array iArr, iFtSine
    printarray iArr
    ; -> 0.0000 0.7071 1.0000 0.7071 0.0000 -0.7071 -1.0000 -0.7071


#### *copya2ftab* — Array to Function Table

The [copya2ftab](https://csound.com/docs/manual/copya2ftab.html) opcode copies an array content to a function table. In the example a function table of size 10 is created, and an array filled with the integers from 1 to 10. The array content is then copied into the function table, and the resulting function table is printed via a [while](https://csound.com/docs/manual/while.html) loop.

    iTable ftgen 0, 0, 10, 2, 0
    iArr[] genarray 1, 10
    copya2ftab iArr, iTable
    index = 0
    while index < ftlen(iTable) do
     prints "%d ", table:i(index, iTable)
     index += 1
    od

The printout is:

    1 2 3 4 5 6 7 8 9 10


#### *tab2array* — Function Table Slice to Array

The [tab2array](https://csound.com/docs/manual/tab2array.html) opcode is similar to [copyf2array](https://csound.com/docs/manual/copyf2array.html) but offers more possibilities. One difference is that the resulting array is generated by the opcode, so no need for the user to create the array in advance. This code copies the content of a 16-point saw function table into an array and prints the array:

    iFtSaw ftgen 0, 0, 8, 10, 1, -1/2, 1/3, -1/4, 1/5, -1/6
    iArr[] tab2array iFtSaw
    printarray(iArr)
    ; -> 0.0000 0.4125 0.7638 1.0000 0.0000 -1.0000 -0.7638 -0.4125

This will copy the values from index 1 to index 8 (not included):

    iFtSine ftgen 0, 0, 8, 10, 1, -1/2, 1/3, -1/4, 1/5, -1/6
    iArr[] tab2array iFtSine, 1, 7
    printarray(iArr)
    ; -> 0.4125 0.7638 1.0000 0.0000 -1.0000 -0.7638

And this will copy the whole array but only every second value:

    iFtSine ftgen 0, 0, 8, 10, 1, -1/2, 1/3, -1/4, 1/5, -1/6
    iArr[] tab2array iFtSine, 0, 0, 2
    printarray(iArr)
    ; -> 0.0000 0.7638 0.0000 -0.7638


#### *pvs2array*/*pvsfromarray* — Arrays to/from FFT Data

The data of an f-signal — containing the result of a
Fast Fourier Transform — can be copied into an array with the opcode
[pvs2array](https://csound.com/docs/manual/pvs2tab.html). The
counterpart
[pvsfromarray](https://csound.com/docs/manual/tab2pvs.html)
copies the content of an array to a f-signal.

    kFrame  pvs2array    kArr, fSigIn ;from f-signal fSig to array kArr
    fSigOut pvsfromarray kArr [,ihopsize, iwinsize, iwintype]

Some care is needed to use these opcodes correctly:

-   The array *kArr* must be declared in advance to its usage in these
    opcodes, usually with *init*.
-   The size of this array depends on the FFT size of the f-signal
    *fSigIn*. If the FFT size is N, the f-signal will contain N/2+1
    amplitude-frequency pairs. For instance, if the FFT size is 1024,
    the FFT will write out 513 bins, each bin containing one value for
    amplitude and one value for frequency. So to store all these values,
    the array must have a size of 1026. In general, the size of *kArr*
    equals FFT-size plus two.
-   The indices 0, 2, 4, ... of *kArr* will contain the amplitudes; the
    indices 1, 3, 5, ... will contain the frequencies of the bins in a
    specific frame.
-   The number of this frame is reported in the *kFrame* output of
    *pvs2array*. By this parameter you know when *pvs2array* writes new
    values to the array *kArr*.
-   On the way back, the FFT size of *fSigOut*, which is written by
    *pvsfromarray*, depends on the size of *kArr*. If the size of *kArr* is
    1026, the FFT size will be 1024.
-   The default value for *ihopsize* is 4 (= fftsize/4); the default value
    for *inwinsize* is the fftsize; and the default value for *iwintype* is
    1, which means a hanning window.

Here is an example that implements a spectral high-pass filter. The
f-signal is written to an array and the amplitudes of the first 40 bins
are then zeroed.[^4]  This is only done when a new frame writes its
values to the array so as not to waste rendering power.

[^4]:  As sample rate is here 44100, and fftsize is 2048, each bin has a
       frequency range of 44100 / 2048 = 21.533 Hz. Bin 0 looks for
       frequencies around 0 Hz, bin 1 for frequencies around 21.533 Hz, bin
       2 around 43.066 Hz, and so on. So setting the first 40 bin
       amplitudes to 0 means that no frequencies will be resynthesized
       which are lower than bin 40 which is centered at 40 \* 21.533 =
       861.328 Hz.

   ***EXAMPLE 03E07_pvs_to_from_array.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 32
nchnls = 2
0dbfs  = 1

gifil ftgen 0, 0, 0, 1, "fox.wav", 0, 0, 1

instr FFT_HighPass
 ifftsize = 2048 ;fft size set to pvstanal default
 fsrc pvstanal 1, 1, 1, gifil ;create fsig stream from function table
 kArr[] init ifftsize+2 ;create array for bin data
 kflag pvs2array kArr, fsrc ;export data to array

 ;if kflag has reported a new write action ...
 if changed(kflag) == 1 then
  ; ... set amplitude of first 40 bins to zero:
  kndx = 0
  while kndx <= 80 do
   kArr[kndx] = 0
   kndx += 2 ;change only even array index = bin amplitude
  od
 endif

 fres pvsfromarray kArr ;read modified data back to fres
 aout pvsynth fres ;and resynth
 out aout, aout

endin
</CsInstruments>
<CsScore>
i "FFT_HighPass" 0 2.7
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~


### 1D - 2D Interchange

#### *reshapearray* — Change Array Dimension

With [reshapearray](https://csound.com/docs/manual/reshapearray.html) a one-dimensional array can be transformed in a two-dimensional one, and vice versa. In the following example, a 1D array of 12 elements is first printed and then transformed in a 2D array with 3 lines and 4 columns:

    iArr[] genarray 1, 12
    printarray iArr, "%d", "1D array:"
    reshapearray iArr, 3, 4
    printarray iArr, "%d", "2D array:"

This is the printout:

    1D array:
     1 2 3 4 5 6 7 8 9 10 11 12
    2D array:
       0: 1 2 3 4
       1: 5 6 7 8
       2: 9 10 11 12


#### *getrow*/*getcol* — Get Row/Column from a 2D Array

The opcodes [getrow](https://csound.com/docs/manual/getrow.html) and [getcol](https://csound.com/docs/manual/getcol.html) return the content of a 2D array's row or column as a 1D array:

    iArr[][] init 3, 4
    iArr fillarray 1,2,3,4,5,6,7,8,9,10,11,12
    printarray iArr, "%d", "2D array:"
    iRow1[] getrow iArr, 0
    printarray iRow1, "%d", "First row:"
    iCol1[] getcol iArr, 0
    printarray iCol1, "%d", "First columns:"

Prints:

    2D array:
       0: 1 2 3 4
       1: 5 6 7 8
       2: 9 10 11 12
    First row:
     1 2 3 4
    First columns:
     1 5 9


#### *setrow*/*setcol* - Set Row/Column of a 2D Array

The opcodes [setrow](https://csound.com/docs/manual/setrow.html) and [setcol](https://csound.com/docs/manual/setcol.html) assign a 1D array as row or column of a 2D array:

    iArr[][] init 3, 4
    printarray iArr, "%d", "2D array empty:"
    iRow[] fillarray 1, 2, 3, 4
    iArr setrow iRow, 0
    printarray iArr, "%d", "2D array with first row:"
    iCol[] fillarray -1, -2, -3
    iArr setcol iCol, 3
    printarray iArr, "%d", "2D array with fourth column:"

Prints:

    2D array empty:
       0: 0 0 0 0
       1: 0 0 0 0
       2: 0 0 0 0
    2D array with first row:
       0: 1 2 3 4
       1: 0 0 0 0
       2: 0 0 0 0
    2D array with fourth column:
       0: 1 2 3 -1
       1: 0 0 0 -2
       2: 0 0 0 -3


#### *getrowlin* — Get Row from a 2D Array and Interpolate

The [getrowlin](https://csound.com/docs/manual/getrowlin.html) opcode is similar to [getrow](https://csound.com/docs/manual/getrow.html) but interpolates between adjacent rows of a matrix if a non-integer number is given.

    kArr[][] init 3, 4
    kArr fillarray 1,2,3,4,5,6,7,8,9,10,11,12
    printarray kArr, 1, "%d", "2D array:"
    kRow[] getrowlin kArr, 0.5
    printarray kRow, 1, "%d", "Row 0.5:"

The 0.5th row means an interpolation between first and second row, so this is the output:

    2D array:
       0: 1 2 3 4
       1: 5 6 7 8
       2: 9 10 11 12
    Row 0.5:
     3 4 5 6



### Functions

#### Arithmetic Operators

The four basic operators [+](https://csound.com/docs/manual/adds.html), [-](https://csound.com/docs/manual/subtracts.html), [*](https://csound.com/docs/manual/subtracts.html) and [/](https://csound.com/docs/manual/divides.html) can directly be applied to an array, either with a scalar or a second array as argument.

All operations can be applied to the input array itself (changing its content destructively), or can create a new array as result.  This is a simple example for the scalar addition:

    iArr[] fillarray 1, 2, 3
    iNew[] = iArr + 10 ; -> 11 12 13 as new array
    iArr += 10 ; iArr is now 11 12 13

It also works for a 2D matrix:

    iArr[][] init 2, 3
    iArr fillarray 1, 2, 3, 4, 5, 6
    printarray(iArr, "%d", "original array:")
    iArr += 10
    printarray(iArr,"%d", "modified array:")

Which prints:

    original array:
       0: 1 2 3
       1: 4 5 6
    modified array:
       0: 11 12 13
       1: 14 15 16

Both possibilities — creating a new array or modifying the existing one — are also valid if a second array is given as argument:

    iArr[] fillarray 1, 2, 3
    iArg[] fillarray 10, 20, 30
    iNew[] = iArr + iArg ; -> 11 22 33 as new array
    iArr += iArg ; iArr is now 11 22 33

Both arrays must have the same size, but it also works for 2D arrays:

    iArr[][] init 2, 3
    iArr fillarray 1, 2, 3, 4, 5, 6
    printarray(iArr, "%d", "original array:")
    iArg[][] init 2, 3
    iArg fillarray 3, 4, 5, 6, 7, 8
    printarray(iArg, "%d", "argument array:")
    iArr += iArg
    printarray(iArr,"%d", "modified array:")

Which prints:

    original array:
       0: 1 2 3
       1: 4 5 6
    argument array:
       0: 3 4 5
       1: 6 7 8
    modified array:
       0: 4 6 8
       1: 10 12 14


#### Unary Functions

These unary functions accept arrays as input:

- [ceil](https://csound.com/docs/manual/ceil.html) — next integer above
- [floor](https://csound.com/docs/manual/floor.html) — next integer below
- [round](https://csound.com/docs/manual/round.html) — round to next integer
- [int](https://csound.com/docs/manual/int.html) — integer part
- [frac](https://csound.com/docs/manual/frac.html) — fractional part
- [powoftwo](https://csound.com/docs/manual/powoftwo.html) — power of two
- [abs](https://csound.com/docs/manual/abs.html) — absolute value
- [log2](https://csound.com/docs/manual/log2.html) — logarithm base two
- [log10](https://csound.com/docs/manual/log10.html) — logarithm base ten
- [log](https://csound.com/docs/manual/log.html) — natural logarithm, optional any base
- [exp](https://csound.com/docs/manual/exp.html) — power of $e$
- [sqrt](https://csound.com/docs/manual/sqrt.html) — square root
- [cos](https://csound.com/docs/manual/cos.html) — cosine
- [sin](https://csound.com/docs/manual/sin.html) — sine
- [tan](https://csound.com/docs/manual/tan.html) — tangent
- [cosinv](https://csound.com/docs/manual/cosinv.html) — arccosine
- [sininv](https://csound.com/docs/manual/sininv.html) — arcsine
- [taninv](https://csound.com/docs/manual/taninv.html) — arctangent
- [sinh](https://csound.com/docs/manual/sinh.html) — hyberbolic sine
- [cosh](https://csound.com/docs/manual/cosh.html) — hyberbolic cosine
- [tanh](https://csound.com/docs/manual/tanh.html) — hyperbolic tangent
- [cbrt](https://csound.com/docs/manual/cbrt.html) — cubic root

Some simple examples:

    iArr[] fillarray 1.1, 2.2, 3.3
    iCeil[] ceil iArr ; -> 2 3 4
    iInt[] int iArr ; -> 1 2 3
    iFrac[] frac iArr ; -> 0.1 0.2 0.3
    iPow2[] powoftwo iArr ; -> 2.1435 4.5948 9.8492


#### maparray

The [maparray](https://csound.com/docs/manual/maparray.html) opcode was used in early array implementation to apply a unary function to every element of a 1D array. In case a function is not in the list above, this old solution may work.


#### Binary Functions

These binary functions can take arrays as input:

- [pow](https://csound.com/docs/manual/pow.html) — power of two arguments
- [hypot](https://csound.com/docs/manual/hypot.html) — Euclidean distance $\sqrt{a^2 + b^2}$
- [fmod](https://csound.com/docs/manual/fmod.html) — remainder (modulo) for arrays value by value
- [fmin](https://csound.com/docs/manual/fmin.html) — minimum of two arrays value by value
- [fmax](https://csound.com/docs/manual/fmax.html) — maximum of two arrays value by value
- [dor](https://csound.com/docs/manual/dot.html) — dot product of two arrays


For instance:

    iBase[] fillarray 1.1, 2.2, 3.3
    iExp[] fillarray 2, -2, 0
    iBasPow2[] pow iBase, 2 ; -> 1.2100 4.8400 10.8900
    iBasExp[] pow iBase, iExp ; -> 1.2100 0.2066 1.0000


### Print

The [printarray](https://csound.com/docs/manual/printarray.html) opcode is easy to use and offers all possibilities to print out array contents.



Arrays in UDOs
--------------

### Input and Output Declaration

Writing a [User Defined Opcode](03-g-user-defined-opcodes.md) can extend Csound's array facilities to any desired own function. The usage of arrays in the opcode definition is straightforward; most important is to remember that type (*i*, *k*, *a*, or *S*) and dimension of an input array must be declared in two places:

-   in the opcode *intypes* list as *i[]*, *i[][]* etc;
-   in the *xin* list as variable name, including brackets.

This is a simple UDO definition which returns the first element of a given 1D *k*-array. Note that in the intype list it is declared as *k[]*, wheras in the input argument list it is declared as *kArr[]*.

    opcode FirstEl, k, k[]
     kArr[] xin
     kOut = kArr[0]
     xout kOut
    endop

The output declaration is done quite similar: abstract type declaration in the *outtypes* list, and variable name in the UDO body. Here the usual naming conventions are valid, as explained at the beginning of this chapter (first occurrence with brackets, then without brackets).

This is an example which creates an i-array of N elements, applying recursively a given ratio on each element. The output array is declared as *i[]* in the *outtypes* list, and as variable first as *iOut[]* then only *iOut* in the body.

    opcode GeoSer,i[],iii
     iStart, iRatio, iSize xin
     iOut[] init iSize
     indx = 0
     while indx < iSize do
      iOut[indx] = iStart
      iStart *= iRatio
      indx += 1
     od
     xout iOut

The call

    instr 1
     iSeries[] GeoSer 2, 3, 5
     printarray(iSeries,"%d")
    endin
    schedule(1,0,0)

will print:

    2 6 18 54 162

As an expert note it should be mentioned that UDOs refer to arrays by value. This means that an input array is copied into the UDO, and an output array is copied to the instrument. This can slow down the performance for large arrays and k-rate calls.


### Overload

Usually we want to use a UDO for different types of arrays. The best method is to overload the function in defining the different types with the same function name. Csound will then select the appropriate version.

The following example extends the *FirstEl* function from *k*-arrays also to *i*- and *S*-arrays.

   ***EXAMPLE 03E08_array_overload.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-m0
</CsOptions>
<CsInstruments>
ksmps = 32

opcode FirstEl, k, k[]
 kArr[] xin
 kOut = kArr[0]
 xout kOut
endop

opcode FirstEl, i, i[]
 iArr[] xin
 iOut = iArr[0]
 xout iOut
endop

opcode FirstEl, S, S[]
 SArr[] xin
 SOut = SArr[0]
 xout SOut
endop

instr Test
 iTest[] fillarray 1, 2, 3
 kTest[] fillarray 4, 5, 6
 STest[] fillarray "x", "y", "z"
 prints "First element of i-array: %d\n", FirstEl(iTest)
 printks "First element of k-array: %d\n", 0, FirstEl(kTest)
 printf "First element of S-array: %s\n", 1, FirstEl(STest)
 turnoff
endin
</CsInstruments>
<CsScore>
i "Test" 0 1
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The output is:

    First element of i-array: 1
    First element of k-array: 4
    First element of S-array: x


### Example: Array Shuffle

In composition we sometimes use a list of values and want to get many random permutations of this list. Some programming languages call this *shuffle*. It is not difficult to write it as UDO. First we create the output array, having the same length as the input array. Then we randomly choose one element from the input array. This element is copied into the first position of the output array. Then all elements in the input array right to this element are shiftet one position to the left, thus overriding the previously selected element. For instance, if the input array is

    1 2 3 4 5 6 7

and element 4 has been selected randomly, and copied into the output array at first position, the elements 5 6 7 will be shifted one position to the left, so that input array changes to

    1 2 3 5 6 7

This procedure is repeated again and again; in the next run only looking amongst six rather than seven elements.

As Csound has no random opcode for integers, this is first defined as helper function: *RndInt* returns a random integer between *iStart* and *iEnd* (included).[^5]

[^5]: More UDOs can be found at <https://github.com/csudo/csudo/>,
      <https://github.com/kunstmusik/libsyi> and other places.

   ***EXAMPLE 03E09_Shuffle.csd***

~~~Csound
<CsoundSynthesizer>
<CsOptions>
-m0
</CsOptions>
<CsInstruments>
ksmps = 32
seed 0

opcode RndInt, i, ii
 iStart, iEnd xin
 iRnd random iStart, iEnd+.999
 iRndInt = int(iRnd)
 xout iRndInt
endop

opcode ArrShuffle, i[], i[]
	iInArr[] xin
	iLen = lenarray(iInArr)
	iOutArr[] init iLen
	iIndx = 0
	iEnd = iLen-1
 while iIndx < iLen do
  ;get one random element and put it in iOutArr
  iRndIndx RndInt 0, iEnd
  iOutArr[iIndx] = iInArr[iRndIndx]
  ;shift the elements after this one to the left
  while iRndIndx < iEnd do
   iInArr[iRndIndx] = iInArr[iRndIndx+1]
   iRndIndx += 1
  od
  ;reset end and increase counter
  iIndx += 1
  iEnd -= 1
  od
 xout iOutArr
endop

instr Test
 iValues[] fillarray 1, 2, 3, 4, 5, 6, 7
 indx = 0
 while indx < 5 do
  iOut[] ArrShuffle iValues
  printarray(iOut,"%d")
  indx += 1
 od
endin

</CsInstruments>
<CsScore>
i "Test" 0 0
</CsScore>
</CsoundSynthesizer>
;example by joachim heintz
~~~

The output is, for instance:

     7 3 4 5 2 6 1
     1 3 2 7 4 5 6
     3 5 1 4 7 2 6
     6 2 5 1 7 4 3
     4 7 2 5 6 1 3
