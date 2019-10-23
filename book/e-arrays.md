E. ARRAYS
=========

::: {#yass_top_edge_dummy}
 
:::

::: {#yass_top_edge}
 
:::

 

ARRAYS
------

One of the principal new features of Csound 6 is the support of arrays.
This chapter aims to demonstrate how to use arrays using the methods
currently implemented.

The outline of this chapter is as follows:

-   Types of Arrays
-   -   Dimensions
    -   i- or k-rate
    -   Local or Global
    -   Arrays of Strings
    -   Arrays of Audio Signals
    -   More on Array Rates

-   Naming Conventions
-   Creating an Array
-   -   init
    -   array / fillarray
    -   genarray

-   Basic Operations: len / slice
-   Copy Arrays from/to Tables
-   Copy Arrays from/to FFT Data
-   Math Operations
-   -   +, -, \*, / on a Number
    -   +, -, \*, / on a Second Array
    -   min / max / sum / scale
    -   Function Mapping on an Array: maparray

-   Arrays in UDOs

### Types of Arrays

#### Dimensions

One-dimensional arrays - also called vectors - are the most commonly
used type of array, but in Csound6 you can also use arrays with two or
more dimensions. The way in which the number of dimensions is designated
is very similar to how it is done in other programming languages.

The code below denotes the second element of a one-dimensional array (as
usual, indexing an element starts at zero, so kArr\[0\] would be the
first element):

    kArr[1]

The following denotes the second column in the third row of a
two-dimensional array:

    kArr[2][1]

Note that the square brackets are not used everywhere. This is explained
in more detail below under \'Naming Conventions\'.

#### i- or k-Rate

Like most other variables in Csound, arrays can be either i-rate or
k-rate. An i-array can only be modified at init-time, and any operation
on it is only performed once, at init-time. A k-array can be modified
during the performance, and any (k-) operation on it will be performed
in every k-cycle (!). Here is a very simple example:

***   EXAMPLE 03E01\_i\_k\_arrays.csd***

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

The output shows this:\
\
iArr\[0\] = 11\
\
kArr\[0\] = 11\
kArr\[0\] = 21\
kArr\[0\] = 31\
kArr\[0\] = 41\
kArr\[0\] = 51\
kArr\[0\] = 61\
kArr\[0\] = 71\
kArr\[0\] = 81\
kArr\[0\] = 91\
kArr\[0\] = 101

Although both instruments run for one second, the operation to increment
the first array value by ten is executed only once in the i-rate version
of the array. But in the k-rate version, the incrementation is repeated
in each k-cycle - in this case every 1/10 second, but usually something
around every 1/1000 second. A good opportunity to throw off rendering
power for useless repetitions, or to produce errors if you intentionally
wanted to operate something only once \...

#### Local or Global

Like any other variable in Csound, an array usually has a local scope -
this means that it is only recognized within the scope of the instrument
in which it has been defined. If you want to use arrays in a globally
(across instruments), then you have to prefix the variable name with the
character g, (as is done with other types of global variable in Csound).
The next example demonstrates local and global arrays at both i- and
k-rate.

***   EXAMPLE 03E02\_Local\_vs\_global\_arrays.csd***

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

#### Arrays of Strings

So far we have discussed only arrays of numbers. It is also possible to
have arrays of strings, which can be very useful in many situations, for
instance while working with file paths.^1^   Here is a very simple
example first, followed by a more extended one.

***   EXAMPLE 03E03\_String\_arrays.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -nm128 ;no sound and reduced messages
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    instr 1
    String   =       "onetwothree"
    S_Arr[]  init    3
    S_Arr[0] strsub  String, 0, 3
    S_Arr[1] strsub  String, 3, 6
    S_Arr[2] strsub  String, 6
             printf_i "S_Arr[0] = '%s'\nS_Arr[1] = '%s'\nS_Arr[2] = '%s'\n", 1,
                      S_Arr[0], S_Arr[1], S_Arr[2]
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

***   EXAMPLE 03E04\_Anagram.csd  ***

    <CsoundSynthesizer>
    <CsOptions>
    -dnm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    giArrLen  =        5
    gSArr[]   init     giArrLen

      opcode StrAgrm, S, Sj
      ;changes the elements in Sin randomly, like in an anagram
    Sin, iLen  xin
     if iLen == -1 then
    iLen       strlen     Sin
     endif
    Sout       =          ""
    ;for all elements in Sin
    iCnt       =          0
    iRange     =          iLen
    loop:
    ;get one randomly
    iRnd       rnd31      iRange-.0001, 0
    iRnd       =          int(abs(iRnd))
    Sel        strsub     Sin, iRnd, iRnd+1
    Sout       strcat     Sout, Sel
    ;take it out from Sin
    Ssub1      strsub     Sin, 0, iRnd
    Ssub2      strsub     Sin, iRnd+1
    Sin        strcat     Ssub1, Ssub2
    ;adapt range (new length)
    iRange     =          iRange-1
               loop_lt    iCnt, 1, iLen, loop
               xout       Sout
      endop


    instr 1
               prints     "Filling gSArr[] in instr %d at init-time!\n", p1
    iCounter   =          0
      until      (iCounter == giArrLen) do
    S_new      StrAgrm    "csound"
    gSArr[iCounter] =     S_new
    iCounter   +=         1
      od
    endin

    instr 2
               prints     "Printing gSArr[] in instr %d at init-time:\n  [", p1
    iCounter   =          0
      until      (iCounter == giArrLen) do
               printf_i   "%s ", iCounter+1, gSArr[iCounter]
    iCounter   +=         1
      od
               prints     "]\n"
    endin

    instr 3
              printks   "Printing gSArr[] in instr %d at perf-time:\n  [", 0, p1
    kcounter  =        0
      until (kcounter == giArrLen) do
              printf   "%s ", kcounter+1, gSArr[kcounter]
    kcounter  +=       1
      od
              printks  "]\n", 0
              turnoff
    endin

    instr 4
               prints     "Modifying gSArr[] in instr %d at init-time!\n", p1
    iCounter   =          0
      until      (iCounter == giArrLen) do
    S_new      StrAgrm    "csound"
    gSArr[iCounter] =     S_new
    iCounter   +=         1
      od
    endin

    instr 5
               prints     "Printing gSArr[] in instr %d at init-time:\n  [", p1
    iCounter   =          0
      until (iCounter == giArrLen) do
               printf_i   "%s ", iCounter+1, gSArr[iCounter]
    iCounter   +=         1
      od
               prints     "]\n"
    endin

    instr 6
    kCycle     timeinstk
               printks    "Modifying gSArr[] in instr %d at k-cycle %d!\n", 0,
                          p1, kCycle
    kCounter   =          0
      until (kCounter == giArrLen) do
    kChar      random     33, 127
    S_new      sprintfk   "%c ", int(kChar)
    gSArr[kCounter] strcpyk S_new ;'=' should work but does not
    kCounter   +=         1
      od
      if kCycle == 3 then
               turnoff
      endif
    endin

    instr 7
    kCycle     timeinstk
               printks    "Printing gSArr[] in instr %d at k-cycle %d:\n  [",
                          0, p1, kCycle
    kCounter   =          0
      until (kCounter == giArrLen) do
               printf     "%s ", kCounter+1, gSArr[kCounter]
    kCounter   +=         1
      od
               printks    "]\n", 0
      if kCycle == 3 then
               turnoff
      endif
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 1
    i 2 0 1
    i 3 0 1
    i 4 1 1
    i 5 1 1
    i 6 1 1
    i 7 1 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

Filling gSArr\[\] in instr 1 at init-time!\
Printing gSArr\[\] in instr 2 at init-time:\
\[nudosc coudns dsocun ocsund osncdu \]\
Printing gSArr\[\] in instr 3 at perf-time:\
\[nudosc coudns dsocun ocsund osncdu \]\
Modifying gSArr\[\] in instr 4 at init-time!\
Printing gSArr\[\] in instr 5 at init-time:\
\[ousndc uocdns sudocn usnocd ouncds \]\
Modifying gSArr\[\] in instr 6 at k-cycle 1!\
Printing gSArr\[\] in instr 7 at k-cycle 1:\
\[s \< x + ! \]\
Modifying gSArr\[\] in instr 6 at k-cycle 2!\
Printing gSArr\[\] in instr 7 at k-cycle 2:\
\[P Z r u U \]\
Modifying gSArr\[\] in instr 6 at k-cycle 3!\
Printing gSArr\[\] in instr 7 at k-cycle 3:\
\[b K c \" h \]

#### Arrays of Audio Signals

Collecting audio signals in an array simplifies working with multiple
channels, as one of many possible cases of use. Here are two simple
examples, one for local audio arrays and the other for global audio
arrays.

***   EXAMPLE 03E05\_Local\_audio\_array.csd  ***

    <CsoundSynthesizer>
    <CsOptions>
    -odac -d
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    instr 1
    aArr[]     init       2
    a1         oscils     .2, 400, 0
    a2         oscils     .2, 500, 0
    kEnv       transeg    1, p3, -3, 0
    aArr[0]    =          a1 * kEnv
    aArr[1]    =          a2 * kEnv
               outch      1, aArr[0], 2, aArr[1]
    endin

    instr 2 ;to test identical names
    aArr[]     init       2
    a1         oscils     .2, 600, 0
    a2         oscils     .2, 700, 0
    kEnv       transeg    0, p3-p3/10, 3, 1, p3/10, -6, 0
    aArr[0]    =          a1 * kEnv
    aArr[1]    =          a2 * kEnv
               outch      1, aArr[0], 2, aArr[1]
    endin
    </CsInstruments>
    <CsScore>
    i 1 0 3
    i 2 0 3
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

***   EXAMPLE 03E06\_Global\_audio\_array.csd  ***

    <CsoundSynthesizer>
    <CsOptions>
    -odac -d
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    gaArr[]    init       2

      instr 1 ; left channel
    kEnv       loopseg    0.5, 0, 0, 1,0.003, 1,0.0001, 0,0.9969
    aSig       pinkish    kEnv
    gaArr[0]   =          aSig
      endin

      instr 2 ; right channel
    kEnv       loopseg    0.5, 0, 0.5, 1,0.003, 1,0.0001, 0,0.9969
    aSig       pinkish    kEnv
    gaArr[1]   =          aSig
      endin

      instr 3 ; reverb
    aInSigL    =          gaArr[0] / 3
    aInSigR    =          gaArr[1] / 2
    aRvbL,aRvbR reverbsc  aInSigL, aInSigR, 0.88, 8000
    gaArr[0]   =          gaArr[0] + aRvbL
    gaArr[1]   =          gaArr[1] + aRvbR
               outs       gaArr[0]/4, gaArr[1]/4
    gaArr[0]   =          0
    gaArr[1]   =          0
      endin
    </CsInstruments>
    <CsScore>
    i 1 0 10
    i 2 0 10
    i 3 0 12
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz, using code by iain mccurdy

If you use soundin/diskin, the array is created automatically in the
size which fits to the number of channels in the input file:

    arr[] diskin "7chnls.aiff", 1

will create an audio array of size 7 according to the seven channel
input file.

#### More on Array Rates

Usually the first character of a variable name in Csound shows whether
it is i-rate or k-rate or a-rate. But for arrays, we have actually two
signifiers: the array variable name, and the index type. If both
coincide, it is easy:

-   i\_array\[i\_index\] reads and writes at i-time
-   k\_array\[k\_index\] reads and writes at k-time
-   a\_array\[a\_index\] reads and writes at a-time

But what to do if array type and index type do not coincide? In general,
the index type will then determine whether the array is read or written
only once (at init-time) or at each k-cycle. This is valid in particular
for S\_arrays (containing strings) and f\_arrays (containing f-data).
Other cases are:

-   i\_array\[k\_index\] reads at k-time; writing is not possible
    (yields a runtime error)
-   k\_array\[i\_index\] reads and writes at k-rate
-   a\_array\[i\_index\] reads and writes at a-rate

For usual k-variables, you can get the value at init-time via the
expression i(kVar), for instance:

    instr 1
     gkLine linseg 1, 1, 2
     schedule 2, .5, 0
    endin
    instr 2
     iLine = i(gkLine)
     print iLine
    endin

will print: iLine = 1.499.

This expression cannot be used for arrays:

    kArray[] fillarray 1, 2, 3
    iFirst = i(kArray[0])
    print iFirst 

will print: iFirst = 0.000, which is obviously not what could be
expected. For this purpose, the i() expression can be used to pass the
index as second argument:

    kArray[] fillarray 1, 2, 3
    iFirst = i(kArray, 0)
    print iFirst

will print: iFirst = 1.000.

### Naming Conventions

An array must be created (via init or array / fillarray^2^) as
kMyArrayName *plus* ending brackets. The brackets determine the
dimensions of the array. So

    kArr[] init 10

creates a one-dimensional array of length 10, whereas

    kArr[][] init 10, 10

creates a two-dimensional array with 10 rows and 10 columns.

After the initialization of the array, referring to the array as a whole
is done *without* any brackets. Brackets are only used if an element is
indexed:

    kArr[]   init   10             ;with brackets because of initialization
    kLen     =      lenarray(kArr) ;without brackets
    kFirstEl =      kArr[0]        ;with brackets because of indexing

The same syntax is used for a simple copy via the \'=\' operator:

    kArr1[]  array  1, 2, 3, 4, 5  ;creates kArr1
    kArr2[]  =      kArr1          ;creates kArr2 as copy of kArr1

### Creating an Array

An array can currently be created by four methods: with the init opcode,
with array/fillarray, with genarray, or as a copy of an already existing
array with the \'=\' operator.

#### init

The most general method, which works for arrays of any number of
dimensions, is to use the init opcode. Here you define a specified space
for the array:

    kArr[]   init 10     ;creates a one-dimensional array with length 10
    kArr[][] init 10, 10 ;creates a two-dimensional array

 

#### fillarray

If you want to fill an array with distinct values, you can use the
fillarray opcode. This line creates a vector with length 4 and puts in
the numbers \[1, 2, 3, 4\]:

    kArr[] fillarray 1, 2, 3, 4

You can also use this opcode for filling two-dimensional arrays.^3^ The
example shows also the usage of the opcodes getrow and setrow to get or
set one row of a two-dimensional array.

\
***   EXAMPLE 03E07\_Fill\_multidim\_array.csd ***

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    gk_2d_Arr[][] init   2,3 ;two lines, three columns
    gk_2d_Arr     fillarray  1,2,3,4,5,6

    instr FirstContent
    prints "First content of array gk_2d_arr:\n"
    schedule "PrintContent", 0, 1
    endin

    instr ChangeRow
    k_1d_Arr[] fillarray 7,8,9
    gk_2d_Arr setrow k_1d_Arr, 0 ;change first row
    prints "\nContent of gk_2d_Arr after having changed the first row:\n"
    event "i", "PrintContent", 0, 1
    turnoff
    endin

    instr GetRow
    k_Row2[] getrow gk_2d_Arr, 1 ;second row as own array
    prints "\nSecond row as own array:\n"
    kColumn = 0
    until kColumn == 3 do
     printf "k_Row2[%d] = %d\n", kColumn+1, kColumn, k_Row2[kColumn]
     kColumn +=    1
    od
    turnoff
    endin

    instr PrintContent
    kRow     =      0
    until kRow == 2 do
     kColumn  =      0
     until kColumn == 3 do
      printf "gk_2d_Arr[%d][%d] = %d\n", kColumn+1, kRow, kColumn, gk_2d_Arr[kRow][kColumn]
      kColumn +=    1
     od
    kRow      +=    1
    od
    turnoff
    endin

    </CsInstruments>
    <CsScore>
    i "FirstContent" 0 1
    i "ChangeRow" .1 1
    i "GetRow" .2 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz
     

Prints:

First content of array gk\_2d\_arr:\
gk\_2d\_Arr\[0\]\[0\] = 1\
gk\_2d\_Arr\[0\]\[1\] = 2\
gk\_2d\_Arr\[0\]\[2\] = 3\
gk\_2d\_Arr\[1\]\[0\] = 4\
gk\_2d\_Arr\[1\]\[1\] = 5\
gk\_2d\_Arr\[1\]\[2\] = 6\
\
Content of gk\_2d\_Arr after having changed the first row:\
gk\_2d\_Arr\[0\]\[0\] = 7\
gk\_2d\_Arr\[0\]\[1\] = 8\
gk\_2d\_Arr\[0\]\[2\] = 9\
gk\_2d\_Arr\[1\]\[0\] = 4\
gk\_2d\_Arr\[1\]\[1\] = 5\
gk\_2d\_Arr\[1\]\[2\] = 6\
\
Second row as own array:\
k\_Row2\[0\] = 4\
k\_Row2\[1\] = 5\
k\_Row2\[2\] = 6

#### genarray

This opcode creates an array which is filled by a series of numbers from
a starting value to an (included) ending value. Here are some examples:

    iArr[] genarray   1, 5 ; creates i-array with [1, 2, 3, 4, 5]
    kArr[] genarray_i 1, 5 ; creates k-array at init-time with [1, 2, 3, 4, 5]
    iArr[] genarray   -1, 1, 0.5 ; i-array with [-1, -0.5, 0, 0.5, 1]
    iArr[] genarray   1, -1, -0.5 ; [1, 0.5, 0, -0.5, -1]
    iArr[] genarray   -1, 1, 0.6 ; [-1, -0.4, 0.2, 0.8]  

### Basic Operations: len, slice

The opcode lenarray reports the length of an i- or k-array. As with many
opcodes now in Csound 6, it can be used either in the traditional way
(Left-hand-side \<- Opcode \<- Right-hand-side), or as a function. The
next example shows both usages, for i- and k-arrays. For
multidimensional arrays, lenarray returns the length of the first
dimension (instr 5).

***   EXAMPLE 03E08\_lenarray.csd ***

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    instr 1 ;simple i-rate example
    iArr[]   fillarray 1, 3, 5, 7, 9
    iLen     lenarray  iArr
             prints    "Length of iArr = %d\n", iLen
    endin

    instr 2 ;simple k-rate example
    kArr[]   fillarray 2, 4, 6, 8
    kLen     lenarray  kArr
             printks   "Length of kArr = %d\n", 0, kLen
             turnoff
    endin

    instr 3 ;i-rate with functional syntax
    iArr[]   genarray 1, 9, 2
    iIndx    =        0
      until iIndx == lenarray(iArr) do
             prints   "iArr[%d] = %d\n", iIndx, iArr[iIndx]
    iIndx    +=       1
      od
    endin

    instr 4 ;k-rate with functional syntax
    kArr[]   genarray_i -2, -8, -2
    kIndx    =        0
      until kIndx == lenarray(kArr) do
             printf   "kArr[%d] = %d\n", kIndx+1, kIndx, kArr[kIndx]
    kIndx    +=       1
      od
             turnoff
    endin

    instr 5 ;multi-dimensional arrays
    kArr[][] init     9, 5
    kArrr[][][] init  7, 9, 5
    printks "lenarray(kArr) (2-dim) = %d\n", 0, lenarray(kArr)
    printks "lenarray(kArrr) (3-dim) = %d\n", 0, lenarray(kArrr)
    turnoff
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 0
    i 2 .1 .1
    i 3 .2 0
    i 4 .3 .1
    i 5 .4 .1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

Length of iArr = 5\
Length of kArr = 4\
iArr\[0\] = 1\
iArr\[1\] = 3\
iArr\[2\] = 5\
iArr\[3\] = 7\
iArr\[4\] = 9\
kArr\[0\] = -2\
kArr\[1\] = -4\
kArr\[2\] = -6\
kArr\[3\] = -8\
lenarray(kArr) (2-dim) = 9\
lenarray(kArrr) (3-dim) = 7

The opcode slicearray takes a slice of a (one-dimensional) array:

      slicearray kArr, iStart, iEnd 

returns a slice of kArr from index iStart to index iEnd (included).

The array for receiving the slice must have been created in advance:

      kArr[]  fillarray  1, 2, 3, 4, 5, 6, 7, 8, 9
      kArr1[] init       5
      kArr2[] init       4
      kArr1   slicearray kArr, 0, 4        ;[1, 2, 3, 4, 5]
      kArr2   slicearray kArr, 5, 8        ;[6, 7, 8, 9]

 

***   EXAMPLE 03E09\_slicearray.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -n
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    instr 1

    ;create and fill an array
    kArr[]  genarray_i 1, 9

    ;print the content
            printf  "%s", 1, "kArr = whole array\n"
    kndx    =       0
      until kndx == lenarray(kArr) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr[kndx]
    kndx    +=      1
      od

    ;build new arrays for the slices
    kArr1[] init    5
    kArr2[] init    4

    ;put in first five and last four elements
    kArr1   slicearray kArr, 0, 4
    kArr2   slicearray kArr, 5, 8

    ;print the content
            printf  "%s", 1, "\nkArr1 = slice from index 0 to index 4\n"
    kndx    =       0
      until kndx == lenarray(kArr1) do
            printf  "kArr1[%d] = %f\n", kndx+1, kndx, kArr1[kndx]
    kndx    +=      1
      od
            printf  "%s", 1, "\nkArr2 = slice from index 5 to index 8\n"
    kndx    =       0
      until kndx == lenarray(kArr2) do
            printf  "kArr2[%d] = %f\n", kndx+1, kndx, kArr2[kndx]
    kndx    +=      1
      od

            turnoff
    endin

    </CsInstruments>
    <CsScore>
    i 1 0 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

### Copy Arrays from/to Tables

As function tables have been the classical way of working with arrays in
Csound, switching between them and the new array facility in Csound is a
basic operation. Copying data from a function table to a vector is done
by copyf2array, whereas copya2ftab copies data from a vector to a
function table:

    copyf2array kArr, kfn ;from a function table to an array
    copya2ftab  kArr, kfn ;from an array to a function table

The following presents a simple example of each operation.

***   EXAMPLE 03E10\_copyf2array.csd***

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    ;8 points sine wave function table
    giSine  ftgen   0, 0, 8, 10, 1


      instr 1
    ;create array
    kArr[]  init    8

    ;copy table values in it
            copyf2array kArr, giSine

    ;print values
    kndx    =       0
      until kndx == lenarray(kArr) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr[kndx]
    kndx    +=      1
      enduntil

    ;turn instrument off
            turnoff
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

***   EXAMPLE 03E11\_copya2ftab.csd*** 

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    ;an 'empty' function table with 10 points
    giTable ftgen   0, 0, -10, 2, 0


      instr 1

    ;print inital values of giTable
            puts    "\nInitial table content:", 1
    indx    =       0
      until indx == ftlen(giTable) do
    iVal    table   indx, giTable
            printf_i "Table index %d = %f\n", 1, indx, iVal
    indx += 1
      od

    ;create array with values 1..10
    kArr[]  genarray_i 1, 10

    ;print array values
            printf  "%s", 1, "\nArray content:\n"
    kndx    =       0
      until kndx == lenarray(kArr) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr[kndx]
    kndx    +=      1
      od

    ;copy array values to table
            copya2ftab kArr, giTable

    ;print modified values of giTable
            printf  "%s", 1, "\nModified table content after copya2ftab:\n"
    kndx    =       0
      until kndx == ftlen(giTable) do
    kVal    table   kndx, giTable
            printf  "Table index %d = %f\n", kndx+1, kndx, kVal
    kndx += 1
      od

    ;turn instrument off
            turnoff
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

### Copy Arrays from/to FFT Data

You can copy the data of an f-signal - which contains the results of a
Fast Fourier Transform - into an array with the opcode pvs2array. The
counterpart pvsfromarray copies the content of an array to a f-signal.

    kFrame  pvs2array    kArr, fSigIn ;from f-signal fSig to array kArr
    fSigOut pvsfromarray kArr [,ihopsize, iwinsize, iwintype]

Some care is needed to use these opcodes correctly:

-   The array kArr must be declared in advance to its usage in these
    opcodes, usually with init.
-   The size of this array depends on the FFT size of the f-signal
    fSigIn. If the FFT size is N, the f-signal will contain N/2+1
    amplitude-frequency pairs. For instance, if the FFT size is 1024,
    the FFT will write out 513 bins, each bin containing one value for
    amplitude and one value for frequency. So to store all these values,
    the array must have a size of 1026. In general, the size of kArr
    equals FFT-size plus two.
-   The indices 0, 2, 4, \... of kArr will contain the amplitudes; the
    indices 1, 3, 5, \... will contain the frequencies of the bins of a
    specific frame.
-   The number of this frame is reported in the kFrame output of
    pvs2array. By this parameter you know when pvs2array writes new
    values to the array kArr.
-   On the way back, the FFT size of fSigOut, which is written by
    pvsfromarray, depends on the size of kArr. If the size of kArr is
    1026, the FFT size will be 1024.
-   The default value for ihopsize is 4 (= fftsize/4); the default value
    for inwinsize is the fftsize; and the default value for iwintype is
    1, which means a hanning window.

Here is an example that implements a spectral high-pass filter. The
f-signal is written to an array and the amplitudes of the first 40 bins
are then zeroed.^4^  This is only done when a new frame writes its
values to the array so as not to waste rendering power.

***   EXAMPLE 03E12\_pvs\_to\_from\_array.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -o dac
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs  = 1

    gifil    ftgen     0, 0, 0, 1, "fox.wav", 0, 0, 1

    instr 1
    ifftsize =         2048 ;fft size set to pvstanal default
    fsrc     pvstanal  1, 1, 1, gifil ;create fsig stream from function table
    kArr[]   init      ifftsize+2 ;create array for bin data
    kflag    pvs2array kArr, fsrc ;export data to array     

    ;if kflag has reported a new write action ...
    knewflag changed   kflag
    if knewflag == 1 then
     ; ... set amplitude of first 40 bins to zero:
    kndx     =         0 ;even array index = bin amplitude
    kstep    =         2 ;change only even indices
    kmax     =         80
    loop:
    kArr[kndx] =       0
             loop_le   kndx, kstep, kmax, loop
    endif

    fres     pvsfromarray kArr ;read modified data back to fres
    aout     pvsynth   fres ;and resynth
             outs      aout, aout

    endin
    </CsInstruments>
    <CsScore>
    i 1 0 2.7
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Basically, with the opcodes pvs2array and pvsfromarray, you have
complete access to every operation in the spectral domain. You could
re-write the existing pvs transformations, you could change them, but
you can also simply use the spectral data to do anything with it. The
next example looks for the most prominent amplitudes in a frame, and
then triggers another instrument.

***   EXAMPLE 03E13\_fft\_peaks\_arpegg.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -odac -d -m128
    ; Example by Tarmo Johannes
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1

    giSine     ftgen      0, 0, 4096, 10, 1

    instr getPeaks

    ;generate signal to analyze
    kfrcoef    jspline    60, 0.1, 1 ; change the signal in time a bit for better testing
    kharmcoef  jspline    4, 0.1, 1
    kmodcoef   jspline    1, 0.1, 1
    kenv       linen      0.5, 0.05, p3, 0.05
    asig       foscil     kenv, 300+kfrcoef, 1, 1+kmodcoef, 10, giSine
               outs       asig*0.05, asig*0.05 ; original sound in backround

    ;FFT analysis
    ifftsize   =          1024
    ioverlap   =          ifftsize / 4
    iwinsize   =          ifftsize
    iwinshape  =          1
    fsig       pvsanal    asig, ifftsize, ioverlap, iwinsize, iwinshape
    ithresh    =          0.001 ; detect only peaks over this value

    ;FFT values to array
    kFrames[]  init       iwinsize+2 ; declare array
    kframe     pvs2array  kFrames, fsig ; even member = amp of one bin, odd = frequency

    ;detect peaks
    kindex     =          2 ; start checking from second bin
    kcounter   =          0
    iMaxPeaks  =          13 ; track up to iMaxPeaks peaks
    ktrigger   metro      1/2 ; check after every 2 seconds
     if ktrigger == 1 then
    loop:
    ; check with neigbouring amps - if higher or equal than previous amp
    ; and more than the coming one, must be peak.
       if (kFrames[kindex-2]<=kFrames[kindex] &&
          kFrames[kindex]>kFrames[kindex+2] &&
          kFrames[kindex]>ithresh &&
          kcounter<iMaxPeaks) then
    kamp        =         kFrames[kindex]
    kfreq       =         kFrames[kindex+1]
    ; play sounds with the amplitude and frequency of the peak as in arpeggio
                event     "i", "sound", kcounter*0.1, 1, kamp, kfreq
    kcounter = kcounter+1
        endif
                loop_lt   kindex, 2,  ifftsize, loop
      endif
    endin

    instr sound
    iamp       =          p4
    ifreq      =          p5
    kenv       adsr       0.1,0.1,0.5,p3/2
    kndx       line       5,p3,1
    asig       foscil     iamp*kenv, ifreq,1,0.75,kndx,giSine
               outs       asig, asig
    endin

    </CsInstruments>
    <CsScore>
    i "getPeaks" 0 60
    </CsScore>
    </CsoundSynthesizer>

 

### Math Operations

#### +, -, \*, / on a Number

If the four basic math operators are used between an array and a scalar
(number), the operation is applied to each element. The safest way to do
this is to store the result in a new array:

    kArr1[] fillarray 1, 2, 3
    kArr2[] = kArr1 + 10    ;(kArr2 is now [11, 12, 13])

Here is an example of array-scalar operations.

***   EXAMPLE 03E14\_array\_scalar\_math.csd***  

    <CsoundSynthesizer>
    <CsOptions>
    -n -m128
    </CsOptions>
    <CsInstruments>
    ksmps = 32

      instr 1

    ;create array and fill with numbers 1..10
    kArr1[] genarray_i 1, 10

    ;print content
            printf  "%s", 1, "\nInitial content:\n"
    kndx    =       0
      until kndx == lenarray(kArr1) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr1[kndx]
    kndx    +=      1
      od

    ;add 10
    kArr2[] =       kArr1 + 10

    ;print content
            printf  "%s", 1, "\nAfter adding 10:\n"
    kndx    =       0
      until kndx == lenarray(kArr2) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr2[kndx]
    kndx    +=      1
      od

    ;subtract 5
    kArr3[] =       kArr2 - 5

    ;print content
            printf  "%s", 1, "\nAfter subtracting 5:\n"
    kndx    =       0
      until kndx == lenarray(kArr3) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr3[kndx]
    kndx    +=      1
      od

    ;multiply by -1.5
    kArr4[] =       kArr3 * -1.5

    ;print content
            printf  "%s", 1, "\nAfter multiplying by -1.5:\n"
    kndx    =       0
      until kndx == lenarray(kArr4) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr4[kndx]
    kndx    +=      1
      od

    ;divide by -3/2
    kArr5[] =       kArr4 / -(3/2)

    ;print content
            printf  "%s", 1, "\nAfter dividing by -3/2:\n"
    kndx    =       0
      until kndx == lenarray(kArr5) do
            printf  "kArr[%d] = %f\n", kndx+1, kndx, kArr5[kndx]
    kndx    +=      1
      od

    ;turnoff
            turnoff
      endin


    </CsInstruments>
    <CsScore>
    i 1 0 .1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

Initial content:\
kArr\[0\] = 1.000000\
kArr\[1\] = 2.000000\
kArr\[2\] = 3.000000\
kArr\[3\] = 4.000000\
kArr\[4\] = 5.000000\
kArr\[5\] = 6.000000\
kArr\[6\] = 7.000000\
kArr\[7\] = 8.000000\
kArr\[8\] = 9.000000\
kArr\[9\] = 10.000000\
\
After adding 10:\
kArr\[0\] = 11.000000\
kArr\[1\] = 12.000000\
kArr\[2\] = 13.000000\
kArr\[3\] = 14.000000\
kArr\[4\] = 15.000000\
kArr\[5\] = 16.000000\
kArr\[6\] = 17.000000\
kArr\[7\] = 18.000000\
kArr\[8\] = 19.000000\
kArr\[9\] = 20.000000\
\
After subtracting 5:\
kArr\[0\] = 6.000000\
kArr\[1\] = 7.000000\
kArr\[2\] = 8.000000\
kArr\[3\] = 9.000000\
kArr\[4\] = 10.000000\
kArr\[5\] = 11.000000\
kArr\[6\] = 12.000000\
kArr\[7\] = 13.000000\
kArr\[8\] = 14.000000\
kArr\[9\] = 15.000000\
\
After multiplying by -1.5:\
kArr\[0\] = -9.000000\
kArr\[1\] = -10.500000\
kArr\[2\] = -12.000000\
kArr\[3\] = -13.500000\
kArr\[4\] = -15.000000\
kArr\[5\] = -16.500000\
kArr\[6\] = -18.000000\
kArr\[7\] = -19.500000\
kArr\[8\] = -21.000000\
kArr\[9\] = -22.500000\
\
After dividing by -3/2:\
kArr\[0\] = 6.000000\
kArr\[1\] = 7.000000\
kArr\[2\] = 8.000000\
kArr\[3\] = 9.000000\
kArr\[4\] = 10.000000\
kArr\[5\] = 11.000000\
kArr\[6\] = 12.000000\
kArr\[7\] = 13.000000\
kArr\[8\] = 14.000000\
kArr\[9\] = 15.000000

#### +, -, \*, / on a Second Array

If the four basic math operators are used between two arrays, their
operation is applied element by element. The result can be easily stored
in a new array:

    kArr1[] fillarray 1, 2, 3
    kArr2[] fillarray 10, 20, 30
    kArr3[] = kArr1 + kArr2    ;(kArr3 is now [11, 22, 33])

Here is an example of array-array operations.

***   EXAMPLE 03E15\_array\_array\_math.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -n -m128
    </CsOptions>
    <CsInstruments>
    ksmps = 32

      instr 1

    ;create array and fill with numbers 1..10 resp .1..1
    kArr1[] fillarray 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    kArr2[] fillarray 1, 2, 3, 5, 8, 13, 21, 34, 55, 89

    ;print contents
            printf  "%s", 1, "\nkArr1:\n"
    kndx    =       0
      until kndx == lenarray(kArr1) do
            printf  "kArr1[%d] = %f\n", kndx+1, kndx, kArr1[kndx]
    kndx    +=      1
      od
            printf  "%s", 1, "\nkArr2:\n"
    kndx    =       0
      until kndx == lenarray(kArr2) do
            printf  "kArr2[%d] = %f\n", kndx+1, kndx, kArr2[kndx]
    kndx    +=      1
      od

    ;add arrays
    kArr3[] =       kArr1 + kArr2

    ;print content
            printf  "%s", 1, "\nkArr1 + kArr2:\n"
    kndx    =       0
      until kndx == lenarray(kArr3) do
            printf  "kArr3[%d] = %f\n", kndx+1, kndx, kArr3[kndx]
    kndx    +=      1
      od

    ;subtract arrays
    kArr4[] =       kArr1 - kArr2

    ;print content
            printf  "%s", 1, "\nkArr1 - kArr2:\n"
    kndx    =       0
      until kndx == lenarray(kArr4) do
            printf  "kArr4[%d] = %f\n", kndx+1, kndx, kArr4[kndx]
    kndx    +=      1
      od

    ;multiply arrays
    kArr5[] =       kArr1 * kArr2

    ;print content
            printf  "%s", 1, "\nkArr1 * kArr2:\n"
    kndx    =       0
      until kndx == lenarray(kArr5) do
            printf  "kArr5[%d] = %f\n", kndx+1, kndx, kArr5[kndx]
    kndx += 1
      od

    ;divide arrays
    kArr6[] =       kArr1 / kArr2

    ;print content
            printf  "%s", 1, "\nkArr1 / kArr2:\n"
    kndx    =       0
      until kndx == lenarray(kArr6) do
            printf  "kArr5[%d] = %f\n", kndx+1, kndx, kArr6[kndx]
    kndx += 1
      od

    ;turnoff
            turnoff

      endin

    </CsInstruments>
    <CsScore>
    i 1 0 .1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

#### min, max, sum, scale

minarray and maxarray return the smallest / largest value in an array,
and optionally its index:

    kMin [,kMinIndx] minarray kArr
    kMax [,kMaxIndx] maxarray kArr 

Here is a simple example of these operations:

***   EXAMPLE 03E16\_min\_max\_array.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

               seed       0

    instr 1
    ;create an array with 10 elements
    kArr[]     init       10
    ;fill in random numbers and print them out
    kIndx      =          0
      until kIndx == 10 do
    kNum       random     -100, 100
    kArr[kIndx] =         kNum
               printf     "kArr[%d] = %10f\n", kIndx+1, kIndx, kNum
    kIndx      +=         1
      od
    ;investigate minimum and maximum number and print them out
    kMin, kMinIndx minarray kArr
    kMax, kMaxIndx maxarray kArr
               printf     "Minimum of kArr = %f at index %d\n", kIndx+1, kMin, kMinIndx
               printf     "Maximum of kArr = %f at index %d\n\n", kIndx+1, kMax, kMaxIndx
               turnoff
    endin
    </CsInstruments>
    <CsScore>
    i1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz 

This would create a different output each time you run it; for instance:

kArr\[0\] =  -2.071383\
kArr\[1\] =  97.150272\
kArr\[2\] =  21.187835\
kArr\[3\] =  72.199983\
kArr\[4\] = -64.908241\
kArr\[5\] =  -7.276434\
kArr\[6\] = -51.368650\
kArr\[7\] =  41.324552\
kArr\[8\] =  -8.483235\
kArr\[9\] =  77.560219\
Minimum of kArr = -64.908241 at index 4\
Maximum of kArr = 97.150272 at index 1

sumarray simply returns the sum of all values in an (numerical) array.
Here is a simple example:

***   EXAMPLE 03E17\_sumarray.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

               seed       0

    instr 1
    ;create an array with 10 elements
    kArr[]     init       10
    ;fill in random numbers and print them out
    kIndx      =          0
      until kIndx == 10 do
    kNum       random     0, 10
    kArr[kIndx] =         kNum
               printf     "kArr[%d] = %10f\n", kIndx+1, kIndx, kNum
    kIndx      +=         1
      od
    ;calculate sum of all values and print it out
    kSum       sumarray   kArr
               printf     "Sum of all values in kArr = %f\n", kIndx+1, kSum
               turnoff
    endin
    </CsInstruments>
    <CsScore>
    i1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Finally, scalearray scales the values of a given numerical array between
a minimum and a maximum value. These lines \...

    kArr[] fillarray  1, 3, 9, 5, 6
           scalearray kArr, 1, 3  

\... change kArr from \[1, 3, 9, 5, 6\] to \[1, 1.5, 3, 2, 2.25\]. Here
is a simple example:

***   EXAMPLE 03E18\_scalearray.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

               seed       0

    instr 1
    ;create an array with 10 elements
    kArr[]     init       10
    ;fill in random numbers and print them out
               printks    "kArr in maximum range 0..100:\n", 0
    kIndx      =          0
      until kIndx == 10 do
    kNum       random     0, 100
    kArr[kIndx] =         kNum
               printf     "kArr[%d] = %10f\n", kIndx+1, kIndx, kNum
    kIndx      +=         1
      od
    ;scale numbers 0...1 and print them out again
               scalearray kArr, 0, 1
    kIndx      =          0
               printks    "kArr in range 0..1\n", 0
      until kIndx == 10 do
               printf     "kArr[%d] = %10f\n", kIndx+1, kIndx, kArr[kIndx]
    kIndx      +=         1
      od
               turnoff
    endin
    </CsInstruments>
    <CsScore>
    i1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

One possible output:

kArr in maximum range 0..100:\
kArr\[0\] =  93.898027\
kArr\[1\] =  98.554934\
kArr\[2\] =  37.244273\
kArr\[3\] =  58.581820\
kArr\[4\] =  71.195263\
kArr\[5\] =  11.948356\
kArr\[6\] =   3.493777\
kArr\[7\] =  13.688537\
kArr\[8\] =  24.875835\
kArr\[9\] =  52.205258\
kArr in range 0..1\
kArr\[0\] =   0.951011\
kArr\[1\] =   1.000000\
kArr\[2\] =   0.355040\
kArr\[3\] =   0.579501\
kArr\[4\] =   0.712189\
kArr\[5\] =   0.088938\
kArr\[6\] =   0.000000\
kArr\[7\] =   0.107244\
kArr\[8\] =   0.224929\
kArr\[9\] =   0.512423

#### Function Mapping on an Array: maparray

maparray applies the function \"fun\" (which needs to have one input and
one output argument) to each element of the vector kArrSrc and stores
the result in kArrRes (which needs to have been created previously):

    kArrRes  maparray kArrSrc, "fun" 

Possible functions are for instance *abs*, *ceil*, *exp*, *floor*,
*frac*, *int*, *log*, *log10*, *round*, *sqrt*. The following example
applies different functions sequentially to the source array:

***   EXAMPLE 03E19\_maparray.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

    instr 1

    ;create an array and fill with numbers
    kArrSrc[] array 1.01, 2.02, 3.03, 4.05, 5.08, 6.13, 7.21

    ;print source array
            printf  "%s", 1, "\nSource array:\n"
    kndx    =       0
      until kndx == lenarray(kArrSrc) do
            printf  "kArrSrc[%d] = %f\n", kndx+1, kndx, kArrSrc[kndx]
    kndx    +=      1
      od

    ;create an empty array for the results
    kArrRes[] init  7

    ;apply the sqrt() function to each element
    kArrRes maparray kArrSrc, "sqrt"

    ;print the result
            printf  "%s", 1, "\nResult after applying sqrt() to source array\n"
    kndx    =       0
      until kndx == lenarray(kArrRes) do
            printf  "kArrRes[%d] = %f\n", kndx+1, kndx, kArrRes[kndx]
    kndx    +=      1
      od

    ;apply the log() function to each element
    kArrRes maparray kArrSrc, "log"

    ;print the result
            printf  "%s", 1, "\nResult after applying log() to source array\n"
    kndx    =       0
      until kndx == lenarray(kArrRes) do
            printf  "kArrRes[%d] = %f\n", kndx+1, kndx, kArrRes[kndx]
    kndx    +=      1
      od

    ;apply the int() function to each element
    kArrRes maparray kArrSrc, "int"

    ;print the result
            printf  "%s", 1, "\nResult after applying int() to source array\n"
    kndx    =       0
      until kndx == lenarray(kArrRes) do
            printf  "kArrRes[%d] = %f\n", kndx+1, kndx, kArrRes[kndx]
    kndx     +=     1
      od

    ;apply the frac() function to each element
    kArrRes maparray kArrSrc, "frac"

    ;print the result
            printf  "%s", 1, "\nResult after applying frac() to source array\n"
    kndx    =       0
      until kndx == lenarray(kArrRes) do
            printf  "kArrRes[%d] = %f\n", kndx+1, kndx, kArrRes[kndx]
    kndx += 1
      od

    ;turn instrument instance off
            turnoff

    endin


    </CsInstruments>
    <CsScore>
    i 1 0 0.1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

Source array:\
kArrSrc\[0\] = 1.010000\
kArrSrc\[1\] = 2.020000\
kArrSrc\[2\] = 3.030000\
kArrSrc\[3\] = 4.050000\
kArrSrc\[4\] = 5.080000\
kArrSrc\[5\] = 6.130000\
kArrSrc\[6\] = 7.210000\
\
Result after applying sqrt() to source array\
kArrRes\[0\] = 1.004988\
kArrRes\[1\] = 1.421267\
kArrRes\[2\] = 1.740690\
kArrRes\[3\] = 2.012461\
kArrRes\[4\] = 2.253886\
kArrRes\[5\] = 2.475884\
kArrRes\[6\] = 2.685144\
\
Result after applying log() to source array\
kArrRes\[0\] = 0.009950\
kArrRes\[1\] = 0.703098\
kArrRes\[2\] = 1.108563\
kArrRes\[3\] = 1.398717\
kArrRes\[4\] = 1.625311\
kArrRes\[5\] = 1.813195\
kArrRes\[6\] = 1.975469\
\
Result after applying int() to source array\
kArrRes\[0\] = 1.000000\
kArrRes\[1\] = 2.000000\
kArrRes\[2\] = 3.000000\
kArrRes\[3\] = 4.000000\
kArrRes\[4\] = 5.000000\
kArrRes\[5\] = 6.000000\
kArrRes\[6\] = 7.000000\
\
Result after applying frac() to source array\
kArrRes\[0\] = 0.010000\
kArrRes\[1\] = 0.020000\
kArrRes\[2\] = 0.030000\
kArrRes\[3\] = 0.050000\
kArrRes\[4\] = 0.080000\
kArrRes\[5\] = 0.130000\
kArrRes\[6\] = 0.210000

### Arrays in UDOs

The dimension of an input array must be declared in two places:

-   as k\[\] or k\[\]\[\] in the type input list
-   as kName\[\], kName\[\]\[\] etc in the xin list.

For Instance:

    opcode FirstEl, k, k[]
    ;returns the first element of vector kArr
    kArr[] xin
           xout   kArr[0]
    endop

This is a simple example using this code:

***   EXAMPLE 03E20\_array\_UDO.csd***   

    <CsoundSynthesizer>
    <CsOptions>
    -nm128
    </CsOptions>
    <CsInstruments>
    ksmps = 32

      opcode FirstEl, k, k[]
      ;returns the first element of vector kArr
    kArr[] xin
    xout kArr[0]
      endop

      instr 1
    kArr[] array   6, 3, 9, 5, 1
    kFirst FirstEl kArr
           printf  "kFirst = %d\n", 1, kFirst
           turnoff
      endin

    </CsInstruments>
    <CsScore>
    i 1 0 .1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

As there is no built-in opcode for printing the contents of an array, it
is a good task for an UDO. Let us finish with an example that does just
this:

***   EXAMPLE 03E21\_print\_array.csd***    

    <CsoundSynthesizer>
    <CsOptions>
    -n -m0
    </CsOptions>
    <CsInstruments>
    ksmps = 32

               seed       0

      opcode PrtArr1k, 0, k[]POVVO
    kArr[], ktrig, kstart, kend, kprec, kppr xin
    kprint     init       0
    kndx       init       0
    if ktrig > 0 then
    kppr       =          (kppr == 0 ? 10 : kppr)
    kend       =          (kend == -1 || kend == .5 ? lenarray(kArr) : kend)
    kprec      =          (kprec == -1 || kprec == .5 ? 3 : kprec)
    kndx       =          kstart
    Sformat    sprintfk   "%%%d.%df, ", kprec+3, kprec
    Sdump      sprintfk   "%s", "["
    loop:
    Snew       sprintfk   Sformat, kArr[kndx]
    Sdump      strcatk    Sdump, Snew
    kmod       =          (kndx+1-kstart) % kppr
     if kmod == 0 && kndx != kend-1 then
               printf     "%s\n", kprint+1, Sdump
    Sdump      strcpyk    " "
     endif
    kprint     =          kprint + 1
               loop_lt    kndx, 1, kend, loop
    klen       strlenk    Sdump
    Slast      strsubk    Sdump, 0, klen-2
               printf     "%s]\n", kprint+1, Slast
    endif
      endop

      instr SimplePrinting
    kArr[]     fillarray  1, 2, 3, 4, 5, 6, 7
    kPrint     metro      1
               prints     "\nSimple Printing with defaults, once a second:\n"
               PrtArr1k   kArr, kPrint
      endin

      instr EatTheHead
    kArr[]     fillarray  1, 2, 3, 4, 5, 6, 7
    kPrint     metro      1
    kStart     init       0
               prints     "\nChanging the start index:\n"
     if kPrint == 1 then
               PrtArr1k   kArr, 1, kStart
    kStart     +=         1
     endif
      endin

      instr EatTheTail
    kArr[]     fillarray  1, 2, 3, 4, 5, 6, 7
    kPrint     metro      1
    kEnd       init       7
               prints     "\nChanging the end index:\n"
     if kPrint == 1 then
               PrtArr1k   kArr, 1, 0, kEnd
    kEnd       -=         1
     endif
      endin

      instr PrintFormatted
    ;create an array with 24 elements
    kArr[] init 24

    ;fill with random values
    kndx = 0
    until kndx == lenarray(kArr) do
    kArr[kndx] rnd31 10, 0
    kndx += 1
    od

    ;print
               prints     "\nPrinting with precision=5 and 4 elements per row:\n"
               PrtArr1k   kArr, 1, 0, -1, 5, 4
               printks    "\n", 0

    ;turnoff after first k-cycle
    turnoff
      endin

    </CsInstruments>
    <CsScore>
    i "SimplePrinting" 0 5
    i "EatTheHead" 6 5
    i "EatTheTail" 12 5
    i "PrintFormatted" 18 1
    </CsScore>
    </CsoundSynthesizer>
    ;example by joachim heintz

Prints:

Simple Printing with defaults, once a second:\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\
Changing the start index:\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 4.000,  5.000,  6.000,  7.000\]\
\[ 5.000,  6.000,  7.000\]\
\
Changing the end index:\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000,  7.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000,  6.000\]\
\[ 1.000,  2.000,  3.000,  4.000,  5.000\]\
\[ 1.000,  2.000,  3.000,  4.000\]\
\[ 1.000,  2.000,  3.000\]\
\
Printing with precision=5 and 4 elements per row:\
\[-6.02002,  1.55606, -7.25789, -3.43802,\
 -2.86539,  1.35237,  9.26686,  8.13951,\
  0.68799,  3.02332, -7.03470,  7.87381,\
 -4.86597, -2.42907, -5.44999,  2.07420,\
  1.00121,  7.33340, -7.53952,  3.23020,\
  9.93770,  2.84713, -8.23949, -1.12326\]

1.  [You cannot currently have a mixture of numbers and strings in an
    array, but you can convert a string to a number with the strtod
    opcode.]{#endnote-0582bc55-3be0-4d95-8a06-ee3ee09256d0}
2.  [array and fillarray are only different names for the same
    opcode.]{#endnote-acc150e3-7d05-4b83-8553-11c19074938b}
3.  [Actually, fillarray is supposed to work for one dimension. It will
    probably work on two dimensions, but not at three or
    more.\^\^\^\^]{#endnote-cc944ca7-ce6e-4a68-ab90-fcd22911d18e}
4.  [As sample rate is here 44100, and fftsize is 2048, each bin has a
    frequency range of 44100 / 2048 = 21.533 Hz. Bin 0 looks for
    frequencies around 0 Hz, bin 1 for frequencies around 21.533 Hz, bin
    2 around 43.066 Hz, and so on. So setting the first 40 bin
    amplitudes to 0 means that no frequencies will be resynthesized
    which are lower than bin 40 which is centered at 40 \* 21.533 =
    861.328 Hz.]{#endnote-c2211456-bbae-4423-b3ae-18b6f31fbb8a}

::: {#yass_bottom_edge}
 
:::
