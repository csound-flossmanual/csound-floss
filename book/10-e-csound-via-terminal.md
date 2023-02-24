# 10 E. CSOUND VIA TERMINAL

Whilst many of us now interact with Csound through one of its many
front-ends which provide us with an experience more akin the that of
mainstream software, new-comers to Csound should bear in mind that there
was a time when the only way running Csound was from the command line
using the [Csound command](https://csound.com/docs/manual/CommandTop.html).
In fact we must still run Csound in this way but front-ends do this for us usually
via some toolbar button or widget. Many people still prefer to interact
with Csound from a terminal window and feel this provides a more
"naked" and honest interfacing with the program. Very often these
people come from the group of users who have been using Csound for many
years, form the time before front-ends. It is still important for all
users to be aware of how to run Csound from the terminal as it provides
a useful backup if problems develop with a preferred front-end.

## The Csound Command

The Csound command follows the format:

    csound [performance_flags] [input_orc/sco/csd]

Executing _csound_ with no additional arguments will run the program
but after a variety of configuration information is printed to the
terminal we will be informed that we provided "insufficient arguments"
for Csound to do anything useful. This action can still be valid for
first testing if Csound is installed and configured for terminal use,
for checking what version is installed and for finding out what
performance flags are available without having to refer to the manual.

Performance flags are controls that can be used to define how Csound
will run. All of these flags have defaults but we can make explicitly
use flags and change these defaults to do useful things like controlling
the amount of information that Csound displays for us while running,
activating a MIDI device for input, or altering buffer sizes for fine
tuning realtime audio performance. Even if you are using a front-end,
command line flags can be manipulated in a familiar format usually in
_settings_ or _preferences_ menu. Adding flags here will have the
same effect as adding them as part of the Csound command. To learn more
about Csound\'s command line flags it is best to start on the page in
the reference manual where they are listed and described
[by category](https://csound.com/docs/manual/CommandFlagsCategory.html).

Command line flags can also be defined within the \<CsOptions\> ...
\</CsOptions\> part of a _.csd_ file and also in a file called _.csoundrc_
which can be located in the Csound home program directory and/or in the
current working directory. Having all these different options for where
esentially the same information is stored might seem excessive but it is
really just to allow flexibiliy in how users can make changes to how
Csound runs, depending on the situation and in the most efficient way
possible. This does however bring up one one issue in that if a
particular command line flag has been set in two different places, how
does Csound know which one to choose? There is an order of precedence
that allows us to find out.

Beginning from its own defaults the first place Csound looks for
additional flag options is in the .csoundrc file in Csound's home
directory, the next is in a .csoundrc file in the current working
directory (if it exists), the next is in the _\<CsOptions\>_ of the .csd
and finally the Csound command itself. Flags that are read later in this
list will overwrite earlier ones. Where flags have been set within a
front-end's options, these will normally overwrite any previous
instructions for that flag as they form part of the Csound command.
Often a front-end will incorporate a check-box for disabling its own
inclusion of flag (without actually having to delete them from the
dialogue window).

After the command line flags (if any) have been declared in the Csound
command, we provide the name(s) of out input file(s) - originally this
would have been the orchestra (.orc) and score (.sco) file but this
arrangement has now all but been replaced by the more recently
introduced .csd (unified orchestra and score) file. The facility to use
a separate orchestra and score file remains however.

For example:

    Csound -d -W -osoundoutput.wav inputfile.csd

will run Csound and render the input .csd _inputfile.csd_ as a wav
file (_-W_ flag) to the file _soundoutput.wav_ (_-o_ flag).
Additionally displays will be suppressed as dictated by the _-d_ flag.
The input _.csd_ file will need to be in the current working directory as
no full path has been provided. the output file will be written to the
current working directory
of [SFDIR](https://csound.com/docs/manual/CommandEnvironment.html) if specified.
