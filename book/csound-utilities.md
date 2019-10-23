CSOUND UTILITIES
================

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

sndinfo
-------

As an example of invoking one of these utilities from the command line
we shall look at the utility \'sndinfo\' (sound information) which
provides the user with some information about one or more sound files.
\'sndinfo\' is invoked and provided with a file name:

    sndinfo /Users/iainmccurdy/sounds/mysound.wav

If you are unsure of the file address of your sound file you can always
just drag and drop it into the terminal window. The output should be
something like:

    util sndinfo:
    /Users/iainmccurdy/sounds/mysound.wav:
            srate 44100, stereo, 24 bit WAV, 3.335 seconds
            (147078 sample frames)

\'sndinfo\' will accept a list of file names and provide information on
all of them in one go so it may prove more efficient gleaning the same
information from a GUI based sample editor. We also have the advantage
of being able to copy and paste from the terminal window into a .csd
file.

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

File Conversion Utilities
-------------------------

The next group of utilities,
[het\_import](http://www.csounds.com/manual/html/het_import.html),
[het\_export](http://www.csounds.com/manual/html/het_export.html),
[pvlook](http://www.csounds.com/manual/html/pvlook.html),
[pv\_export](http://www.csounds.com/manual/html/pv_export.html),
[pv\_import](http://www.csounds.com/manual/html/pv_import.html),
[sdif2ad](http://www.csounds.com/manual/html/sdif2ad.html) and
[srconv](http://www.csounds.com/manual/html/srconv.html) facilitate file
conversions between various types. Perhaps the most interesting of these
are [pvlook](http://www.csounds.com/manual/html/pvlook.html), which
prints to the terminal a formatted text version of a
[pvanal](http://www.csounds.com/manual/html/pvanal.html) file - useful
to finding out exactly what is going on inside individual analysis bins,
something that may be of use when working with the more advanced
resynthesis opcodes such as
[pvadd](http://www.csounds.com/manual/html/pvadd.html) or
[pvsbin](http://www.csounds.com/manual/html/pvsbin.html).
[srconv](http://www.csounds.com/manual/html/srconv.html) can be used to
convert the sample rate of a sound file.

Miscellaneous Utilities
-----------------------

A final group gathers together various unsorted utilities:
[cs](http://www.csounds.com/manual/html/cs.html),
[csb64enc](http://www.csounds.com/manual/html/csb64enc.html),
[envext](http://www.csounds.com/manual/html/envext.html),
[extractor](http://www.csounds.com/manual/html/extractor.html),
[makecsd](http://www.csounds.com/manual/html/makecsd.html),
[mixer](http://www.csounds.com/manual/html/mixer.html),
[scale](http://www.csounds.com/manual/html/scaleutility.html) and
[mkdb](http://www.csounds.com/manual/html/mkdb.html). Most interesting
of these are perhaps
[extractor](http://www.csounds.com/manual/html/extractor.html) which
will extract a user defined fragment of a sound file which it will then
write to a new file,
[mixer](http://www.csounds.com/manual/html/mixer.html) which mixes
together any number of sound files and with gain control over each file
and [scale](http://www.csounds.com/manual/html/scaleutility.html) which
will scale the amplitude of an individual sound file.

Conclusion
----------

It has been seen that the Csound utilities offer a wealth of useful, but
often overlooked, tools to augment our work with Csound. Whilst some of
these utilities may seem redundant now that most of us have access to
fully featured 3rd-party sound editing software, it should be borne in
mind that many of these utilities were written in the 1980s and early
90s when such tools were less readily available.
