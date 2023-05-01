# HOW TO: INSTALLATION

## Csound and Frontends

### What is a Frontend?

In computer science, we call _frontend_ what is close to the user, and _backend_
what is close to the hardware.

So a frontend is what you as user see, in which you type text, scroll windows,
open and save files by clicking in the menu bar.

### Why does Csound not come with a Frontend?

Csound is an "audio engine" or "audio library". It is a machine to render digital
audio data. This machine consists of a bundle of executable or callable files.
You can find these files on your computer, but nothing will happen when you try
to open these files.

There were a lot of discussions in the Csound community whether one standard
frontend should be distributed together with Csound, or not. Sometimes it was
the case, but as for today, it is not. The main reasons are:

1. Each frontend has a different design and different ways to use it. There is
   not the one standard way to build a frontend for Csound.
2. Although it is confusing for beginners, it is important to distinguish
   between Csound as audio engine and any frontend. It is the big flexibility of
   Csound that it can be used in many contextes. Each of these contextes somehow
   establishes a new frontend.

### Can I install Csound without a Frontend?

Yes, and this will happen when you go to the [Csound Download Page](https://csound.com/download)
and click on any of the "install Csound" buttons.

The first step is to install this **plain Csound**.

The second step is to install a frontend.

### Which Jobs are done by a Frontend?

A frontend, or IDE (Integrated Development Environment) will **run** Csound.
Usually you have a button to **start** and a button to **stop** a Csound
performance.

A frontend will provide an **editor** in which you can open, modify and save
**_.csd_ files**.

In addition to these essentials, the existing frontends offer different other
features, depending on their orientation.

### Which Frontends are available?

[CsoundQt](http://csoundqt.github.io) has been written in 2008 by Andrés Cabrera
to offer a multi-purpose frontend for basic usage of Csound. It is now maintained
by Tarmo Johannes and Eduado Moguillansky.

[Cabbage](https://cabbageaudio.com) has been developed since 2007 by Rory Walsh.
Its main focus is to export plugins from a Csound file to run in a DAW. Cabbage
has grown a lot and is currently the most popular way to work with Csound.

[Blue](https://blue.kunstmusik.com/) has been developed since 2004 by Steven Yi.
Its main focus is to provide an object-oriented way to work with the Csound
score. Around this, many features were added.

[Web IDE](https://ide.csound.com/) is an online IDE which has been started in 2018.
Nothing to install here — just create an account and use Csound in your browser.

### Which Frontend should I choose?

This depends on your needs, and what you like.
All possibilities are good for learning Csound.

## How to install on Windows?

Make sure you understood what is mentioned on top of this page about Csound
and frontends. Usually you will need to install **both**: plain Csound **and**
a frontend.

### How to install plain Csound on Windows?

Go to <https://csound.com/download>.
Under the Windows icon, choose the "64bit Full Installer".
After downloading, follow the usual procedure to install

### How to install a frontend on Windows?

- CsoundQt: <https://github.com/CsoundQt/CsoundQt/releases>
- Cabbage: <https://cabbageaudio.com/download/>
- Blue: <https://blue.kunstmusik.com/#download>

## How to install on Mac?

Make sure you understood what is mentioned on top of this page about Csound
and frontends. Usually you will need to install **both**: plain Csound **and**
a frontend.

### How to install plain Csound on Mac?

Go to <https://csound.com/download>.
Under the Apple icon you will see a _.dmg_ (disk image) for download.
After downloading, open the _.dmg_ and run the installer.
If you get a message about "cannot install because it is not from a certified
apple developer", go to your System Preferences. In the "Security" panel,
allow the Csound can be installed.

### How to install a frontend on Mac?

- CsoundQt: <https://github.com/CsoundQt/CsoundQt/releases>
- Cabbage: <https://cabbageaudio.com/download/>
- Blue: <https://blue.kunstmusik.com/#download>

## How to install on Linux?

Make sure you understood what is mentioned on top of this page about Csound
and frontends. Usually you will need to install **both**: plain Csound **and**
a frontend.

### How to install plain Csound on Linux?

On <https://csound.com/download> you find links to the repositories of different
Linux distributions.

I personally recommend to install Csound from sources. If you have some experiences
in how to do it, you get the most recent Csound and can even switch to the develpment
version. Building is not complicated; a good description is
[here](https://github.com/csound/csound/blob/develop/BUILD.md#debian).

### How to install a frontend on Linux?

- CsoundQt: <https://github.com/CsoundQt/CsoundQt/releases>
- Cabbage: <https://cabbageaudio.com/download/>
- Blue: <https://blue.kunstmusik.com/#download>

## How to install on Android?

On Android, Csound comes with a minimal included frontend.
It can be easily found in Google's Play Store or on similar collections.
