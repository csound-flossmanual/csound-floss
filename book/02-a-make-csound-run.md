02 A. MAKE CSOUND RUN
=====================

Csound and Frontends
--------------------

The core element of Csound is an audio engine for the Csound language.
It has no graphical interface and it is designed to take Csound text
files (called *.csd files*) and produce audio, either in realtime, or
by writing to a file. It can still be used in this way but most users
nowadays prefer to use Csound via a frontend. A frontend is an
application which assists you in writing code and running Csound. Beyond
the functions of a simple text editor, a frontend environment will offer
colour coded highlighting of language specific keywords and quick access
to an integrated help system. A frontend can also expand possibilities
by providing tools to build interactive interfaces (GUI widgets) as
well, sometimes, as advanced compositional tools.

In 2009 the Csound developers decided to include
[CsoundQt](http://csoundqt.github.io)
as the standard frontend to be included with the Csound distribution, so
you will already have this frontend if you have installed any of the
pre-built versions of Csound. Conversely if you install a frontend you
will usually require a separate installation of Csound in order for it
to function. If you experience any problems with CsoundQt, or simply
prefer another frontend design, try
[Cabbage](http://cabbageaudio.com/),
[WinXound](http://winxound.codeplex.com)
or
[Blue](http://blue.kunstmusik.com/)
as alternatives. Section 10 of this manual provides more information
about the frontends.

How to Download and Install Csound
----------------------------------

To get Csound you first need to download the package for your system
from the Download page of the Csound project:
<https://csound.com/download>

There are many files here, so here are some guidelines to help you
choose the appropriate version.

### Windows

Windows installers are the ones ending in *.exe*. Look for the latest
version of Csound and find a file which should be called something like:
*64bit Full Installer v6.14.0.*

After you have downloaded the installer simply double-click it to start the
installation process. This will invoke 8 simple steps:

1.  A welcome screen advises you to close other programs.
2.  After reading and accepting the licence agreement click *Next*.
3.  Select the destination for the Csound program files. The default
    is C:\\Program Files (x86)\\Csound6.
4.  Choose the components to be installed. Currently (ver. 6.13) there
    are only 3 items: **Core Csound** is obligatory. **Python features**
    are optional but will be required if you intend to use CsoundQt as a
    frontend for Csound. You will also need to install [Python
    2.7](http://www.python.org/getit/).
    **Pure data Csound6\~ object** will allow you to run Csound from
    within Pure Data. To do this will require installing [Pure
    Data](https://puredata.info/downloads).
5.  **Select Start Menu Folder** allows you to define a folder name
    other than the default *Csound 6* for the folder containing the
    various Csound components. Alternatively you can choose not to
    create a start menu folder.
6.  Next there is an option to add the Csound application directory to
    your PATH variable. Adding this will allow you to run Csound from
    the command line from any directory location.
7.  Next a window reminds you of what will be installed and what changes
    will be made to your system.
8.  Upon clicking install the installation takes place.
9.  A window informs you that installation is complete. You can click
    *Finish*.

This installer will also automatically install CsoundQt which can be
used as a frontend for your work with Csound (Csound is not run by
double-clicking Csound.exe).

You can create addional shorcuts to the CsoundQt executable by locating
it in its default location, C:\\Program Files (x86)\\Csound6\\bin, and
right-clicking it and selecting \'Pin to Start\' or \'Pin to Taskbar\'
as desired. You can create a desktop shortcut by right-clicking and
dragging the CsoundQt executable onto the desktop and selecting *Create
Shortcuts Here* from the menu that pops up.

Other frontends for Csound, such as Cabbage and WinXound, need to be
downloaded and installed separately.

### Mac OS X

The Mac OS X installers are the files ending in *.dmg*, for instance
*Csound6.14.0-MacOS_x86_64.dmg*. When you double click the downloaded
file, you will have a disk image on your desktop, with the Csound
installer, CsoundQt and a *readme* file. Double-click the installer and
follow the instructions. Csound and the basic Csound utilities will be
installed. To install the CsoundQt frontend, you only need to move it to
your Applications folder.

### Linux and others

Csound is available from the official package repositories for many
distributions like OpenSuse, Debian, Ubuntu, Fedora, Archlinux and
Gentoo. If there are no binary packages for your platform, or you need a
more recent version, you can get the sources from the
[Github page](https://github.com/csound/csound/tree/develop)
and build from source. You will find the most recent build instructions
in the [Build.md](http://github.com/csound/csound/blob/develop/BUILD.md)
file in the Csound sources or in the
[Github Csound Wiki](https://github.com/csound/csound/wiki).

### iOS

If you would just like to run Csound on your iPad, there is an app for
iOS called
[CsoundPad](http://itunes.apple.com/app/csoundpad/id861008380?mt=8\#)

If you are a developer, Csound can be run in an iOS app that you are
programming by including the Csound-for-iOS files in your Xcode project.
The *SDK* can be found on the [Csound Download Page](https://csound.com/download), for instance *Csound6.14.0-iOS.zip*. It contains an archive of an example project and a PDF manual.

Some sample projects:

-   AudioKit
    ([http://audiokit.io](http://audiokit.io/))
    is an Objective-C and Swift framework for building iOS and OSX apps
    using Csound as the audio engine.
-   csGrain, developed by the Boulanger Labs
    (<http://www.boulangerlabs.com>), is a complex audio effects app
    that works with audio files or live audio input.
-   Portable Dandy, an innovative sampler synthesiser for iOS (see
    <http://www.barefoot-coders.com>).
-   iPulsaret, an impressive synthesizer app (see
    <http://www.densitytigs.com>).

### Android

If you want to play your .csd files on your Android smartphone or
tablet, follow the *Android App* link on Csound's Download page. This
leads you to the Google Play Store from which you can install it for
free. Chapter [12E](12-e-csound-on-android)
in this manual describes how to use Csound on Android.

If you are a developer, download the *Android SDK*, for instance *Csound6.14.0-Android.zip*.

On Google\'s Play Store there are some apps that use Csound. Below is a
small sample of such apps:

-   DIY Sound Salad, developed by Zatchu
    [(http://zatchu.com/category/story/](http://www.zatchu.com)),
    is a multi sample record and playback app. Quite enjoyable to use.
-   Chime Pad, developed by Arthur B. Hunkins
    (<http://www.arthunkins.com>), is a soothing chime player app.
-   Psycho Flute developed by Brian Redfern (source code available at
    <http://github.com/bredfern/PsychoFlute>), it is a physical
    modelling flute synth. Both fun and interesting.

Install Problems?
-----------------

If, for any reason, you can't find the CsoundQt frontend on your system
after install, or if you want to install the most recent version of
CsoundQt, or if you prefer another frontend altogether: see the CSOUND
FRONTENDS section of this manual for further information. If you have
any install problems, consider joining the
[Csound Mailing List](https://listserv.heanet.ie/cgi-bin/wa?A0=CSOUND)
to report your issues, or use any other community channel.

The Csound Reference Manual
---------------------------

The Csound Reference Manual is an indispensable companion to Csound. It
is available in various formats from the same place as the Csound
installers, and it is installed with the packages for OS X and Windows.
It can also be browsed online at
<https://csound.com/docs/manual/index.html>. Many frontends will
provide you with direct and easy access to it.

How to Execute a Simple Example
-------------------------------

### **Using CsoundQt**

Launch CsoundQt. Go into the CsoundQt menubar and choose:
Examples-\>Getting started\...-\> Basics-\> HelloWorld

You will see a very basic Csound file (.csd) with a lot of comments in
green.

Click on the *RUN* icon in the CsoundQt control bar to start the
realtime Csound engine. You should hear a 440 Hz sine tone.

You can also run the Csound engine in the terminal from within CsoundQt.
Just click on *Run in Term*. A console will pop up and Csound will be
executed as an independent process. The result should be the same - the
440 Hz beep.

### **Using the Terminal / Console**

1\. Save the following code in any plain text editor as HelloWorld.csd.


   ***EXAMPLE 02A01\_HelloWorld.csd***

~~~csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
instr 1
 aSin  poscil  0dbfs/4, 440
       out     aSin
endin
</CsInstruments>
<CsScore>
i 1 0 1
</CsScore>
</CsoundSynthesizer>
;Example by Alex Hofmann
~~~

2\. Open the Terminal / Prompt / Console

3\. Type: *csound /full/path/HelloWorld.csd*

where */full/path/HelloWorld.csd* is the complete path to your file. You
also execute this file by just typing *csound* then dragging the file
into the terminal window and then hitting return.

You should hear a 440 Hz tone.

### **Using Cabbage**

Cabbage is an alternative frontend for working with Csound. It is most
similar to CsoundQt but its main differences with CsoundQt are that
graphical user interface (GUI) can be created either by drawing (click
and drag) or by typing code. In CsoundQt the GUI code is hidden from
us in the editor so that we only create GUI using the mouse. Cabbage can
also export instruments and effects as VST and AU plugins, and even
includes its own host, Cabbage Studio, for graphically connecting
multiple instruments and effect in a manner similar to Pure Data.
Cabbage is a less comprehensive frontend that CsoundQt but some users
prefer this simplicity.

To get started with Cabbage you will need to first download
[Cabbage](http://cabbageaudio.com/download/).
Cabbage will normally come bundled with its own version of Csound and
will not require a separate installation of Csound. Any currently
installed versions of Csound will be ignored by Cabbage.

Once installed, launch Cabbage and then go to Options-\>New
Cabbage\...-\>Instrument to create a new patch (called a Cabbage patch).
Cabbage will start you off with a simple functional instrument with a
virtual keyboard but you can also use the one listed below which
features a virtual keyboard and a volume control. To open Cabbage\'s
integrated code editor go to Options-\>View Source Editor. You can then
paste in the code shown below, or just make modifications to the default
instrument code. If you want to make changes to what external hardware
devices Cabbage uses, such as audio and MIDI hardware, go to
Options-\>Audio Settings. The options available will vary depending on
your specific system, so will not be discussed any further here.

When creating a realtime instrument, there is no necessity to include
any Csound score events (or any \<score\> tags). With earlier versions
of Csound it used to be that we needed to include a dummy score
event to keep realtime performance going but with more recent versions
of Csound this is no longer the case.

The key element that differentiates Cabbage from standard Csound is the
inclusion of Cabbage specific code, mainly used for creating a graphical
user interface, held within the start and end tags: \<Cabbage\> and
\</Cabbage\>. Communication from the Cabbage GUI to Csound is either
transparent, as in the case of the *keyboard* widget, or via named
channels and the
[chnget](file:///C:/Program%20Files%20(x86)/Csound6/doc/manual/chnget.html)
opcode in the Csound orchestra when using most other Cabbage widgets
such as *rslider* (a rotary slider). For additional information on
Cabbage please consult the chapter on
[Cabbage](http://flossmanuals.net/csound/cabbage/).

   ***EXAMPLE 02A02\_HelloCabbage.csd***

~~~csound
<Cabbage>
form size(420,100)
keyboard bounds(10,10,300,80)
rslider bounds(325,15,80,80), channel("level"), text("Level"), range(0,1,0.3)
</Cabbage>

<CsoundSynthesizer>

<CsOptions>
-dm0 -n -+rtmidi=null -M0
</CsOptions>

<CsInstruments>

sr     = 44100
ksmps  = 32
nchnls = 2
0dbfs  = 1

instr    1
 icps  cpsmidi
 klev  chnget  "level"
 a1    poscil  klev*0.2,icps
       outs    a1,a1
endin

</CsInstruments>

</CsoundSynthesizer>
;example by Iain McCurdy
~~~
