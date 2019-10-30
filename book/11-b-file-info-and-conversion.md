FILE INFO AND CONVERSION
========================

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

