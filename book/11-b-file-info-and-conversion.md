11 B. FILE INFO AND CONVERSION
==============================

sndinfo
-------

The utility *sndinfo* (sound information) provides the user with some information about one or more sound files. *sndinfo* is invoked and provided with a file name:

    sndinfo ../SourceMaterials/fox.wav

If you are unsure of the file address of your sound file you can always
just drag and drop it into the terminal window. The output should be
something like:

    util sndinfo:
    ../SourceMaterials/fox.wav:
	    srate 44100, monaural, 16 bit WAV, 2.757 seconds
	    (121569 sample frames)

*sndinfo* will accept a list of file names and provide information on
all of them in one go so it may prove more efficient gleaning the same
information from a GUI based sample editor. We also have the advantage
of being able to copy and paste from the terminal window into a .csd
file.


File Conversion Utilities
-------------------------

The next group of utilities,
[het\_import](https://csound.com/docs/manual/het_import.html),
[het\_export](https://csound.com/docs/manual/het_export.html),
[pvlook](https://csound.com/docs/manual/pvlook.html),
[pv\_export](https://csound.com/docs/manual/pv_export.html),
[pv\_import](https://csound.com/docs/manual/pv_import.html),
[sdif2ad](https://csound.com/docs/manual/sdif2ad.html) and
[srconv](https://csound.com/docs/manual/srconv.html) facilitate file
conversions between various types. Perhaps the most interesting of these
are [pvlook](https://csound.com/docs/manual/pvlook.html), which
prints to the terminal a formatted text version of a
[pvanal](https://csound.com/docs/manual/pvanal.html) file - useful
to finding out exactly what is going on inside individual analysis bins,
something that may be of use when working with the more advanced
resynthesis opcodes such as
[pvadd](https://csound.com/docs/manual/pvadd.html) or
[pvsbin](https://csound.com/docs/manual/pvsbin.html).
[srconv](https://csound.com/docs/manual/srconv.html) can be used to
convert the sample rate of a sound file.

