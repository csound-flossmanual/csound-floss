ANALYSIS
========

Csound comes bundled with a variety of additional utility applications.
These are small programs that perform a single function, very often with
a sound file, that might be useful just before or just after working
with the main Csound program. Originally these were programs that were
run from the command line but many of Csound front-ends now offer direct
access to many of these utilities through their own utilities menus. It
is useful to still have access to these programs via the command line
though, if all else fails.

The standard syntax for using these programs from the command line is to
type the name of the utility followed optionally by one or more command
line flags which control various performance options of the program -
all of these will have useable defaults anyway - and finally the name of
the sound file upon which the utility will operate.

    utility_name [flag(s)] [file_name(s)]

If we require some help or information about a utility and don\'t want
to be bothered hunting through the Csound Manual we can just type the
the utility\'s name with no additional arguments, hit enter and the
commmand line response will give us some information about that utility
and what command line flags it offers. We can also run the utility
through Csound - perhaps useful if there are problems running the
utility directly - by calling Csound with the -U flag. The -U flag will
instruct Csound to run the utility and to interpret subsequent flags as
those of the utility and not its own.

    Csound -U utility_name [flag(s)] [file_name(s)]

Analysis Utilities
------------------

Although many of Csound\'s opcodes already operate upon commonly
encountered sound file formats such as \'wav\' and \'aiff\', a number of
them require sound information in more specialised and pre-analysed
formats, and for this Csound provides the sound analysis utilities
[atsa](http://www.csounds.com/manual/html/UtilityAtsa.html),
[cvanal,](http://www.csounds.com/manual/html/cvanal.html)
[hetro](http://www.csounds.com/manual/html/hetro.html),
[lpanal](http://www.csounds.com/manual/html/lpanal.html) and
[pvanal.](http://www.csounds.com/manual/html/pvanal.html) By far the
most commonly used of these is
[pvanal](http://www.csounds.com/manual/html/pvanal.html) which, although
originally written to provide analysis files for
[pvoc](http://www.csounds.com/manual/html/pvoc.html) and its generation
of opcodes, has now been extended to be able to generate files in the
pvoc-ex (.pvx) format for use with the newer \'pvs\' streaming pvoc
opcodes.

This time as well as requiring an input sound file for analysis we will
need to provide a name (and optionally the full address) for the output
file. Using pvanal\'s command flags we can have full control over
typical FFT conversion parameters such as FFT size, overlap, window type
etc. as well as additional options that may prove useful such as the
ability to select a fragment of a larger sound file for the analysis. In
the following illustration we shall make use of just one flag, -s, for
selecting which channel of the input sound file to analyse, all other
flag values shall assume their default values which should work fine in
most situations.

     pvanal -s1 mysound.wav myanalysis.pvx

[pvanal](http://www.csounds.com/manual/html/pvanal.html) will analyse
the first (left if stereo) channel of the input sound file
\'mysound.wav\' (and in this case as no full address has been provided
it will need to be in either the current working directory or
[SSDIR](http://www.csounds.com/manual/html/CommandEnvironment.html)),
and a name has been provided for the output file \'myanalysis.pvx\',
which, as no full address has been given, will be placed in the current
working directory. While
[pvanal](http://www.csounds.com/manual/html/pvanal.html) is running it
will print a running momentary and finally inform us once the process is
complete.

If you use CsoundQT you can have direct access to
[pvanal](http://www.csounds.com/manual/html/pvanal.html) with all its
options through the \'utilities\' button in the toolbar. Once opened it
will reveal a dialogue window looking something like this:

::: {.group_img}
::: {.image}
![](static/csoundqtpvanal_1.jpg)
:::
:::

Especially helpful is the fact that we are also automatically provided
with [pvanal](http://www.csounds.com/manual/html/pvanal.html)\'s manual
page.


