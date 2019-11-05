10 D. WINXOUND
==============

\

WinXound
--------

<div>

**WinXound Description:**\
WinXound is a free and open-source Front-End GUI Editor for CSound 6,
CSoundAV,\
CSoundAC, with Python and Lua support, developed by Stefano Bonetti.\
It runs on Microsoft Windows, Apple Mac OsX and Linux.\
WinXound is optimized to work with the CSound 6 compiler.\
\
\
**WinXound Features:**

</div>

<div>

-   Edit CSound, Python and Lua files (csd, orc, sco, py, lua) with
    Syntax Highlight and Rectangular Selection;
-   Run CSound, CSoundAV, CSoundAC, Python and Lua compilers;
-   Run external language tools (QuteCsound, Idle, or other GUI
    Editors);
-   CSound analysis user friendly GUI;
-   Integrated CSound manual help;
-   Possibilities to set personal colors for the syntax highlighter;
-   Convert orc/sco to csd or csd to orc/sco;
-   Split code into two windows horizontally or vertically;
-   CSound csd explorer (File structure for Tags and Instruments);
-   CSound Opcodes autocompletion menu;
-   Line numbers;
-   Bookmarks;
-   \...and much more \... (Download it!) 

\

</div>

 

::: {.group_img}
::: {.image}
![](../resources/images/winxound_linux.jpg){width="438" height="322"}
:::
:::

 

**Web Site and Contacts:**\
- Web:
[winxound.codeplex.com](http://winxound.codeplex.com "winxound.codeplex.com")\
- Email: <stefano_bonetti@tin.it> (or <stefano_bonetti@alice.it>)

------------------------------------------------------------------------

** \
** **REQUIREMENTS\
**\
**System requirements for Microsoft Windows:**

-   Supported: Xp, Vista, Seven (32/64 bit versions);
-   (Note: For Windows Xp you also need the Microsoft Framework .Net
    version 2.0 or major. You can download it from www.microsoft.com
    site);
-   CSound 6: <http://sourceforge.net/projects/csound> - (needed for
    CSound and LuaJit compilers);
-   Not requested but suggested: CSoundAV by Gabriel Maldonado
    (<http://www.csounds.com/maldonado/>);
-   Requested to work with Python: Python compiler
    (<http://www.python.org/download/>)\

**System requirements for Apple Mac OsX:**

-   Osx 10.5 or major;
-   CSound 6: <http://sourceforge.net/projects/csound> - (needed for
    CSound compiler);

**System requirements for Linux:**

-   Gnome environment or libraries;
-   Please, read carefully the \"ReadMe\" file in the source code.\

------------------------------------------------------------------------

\
\
**INSTALLATION AND USAGE\
\
Microsoft Windows Installation and Usage:**

-   Download and install the Microsoft Framework .Net version 2.0 or
    major (only for Windows Xp);
-   Download and install the latest version of CSound 6
    (<http://sourceforge.net/projects/csound>);
-   Download the WinXound zipped file, decompress it where you want (see
    the (\*)note below), and double-click on \"WinXound\_Net\"
    executable;
-   (\*)note: THE WINXOUND FOLDER MUST BE LOCATED IN A PATH WHERE YOU
    HAVE FULL READ AND WRITE PERMISSION (for example in your User
    Personal folder).\

**Apple Mac OsX Installation and Usage:**

-   Download and install the latest version of CSound 6
    (<http://sourceforge.net/projects/csound>);
-   Download the WinXound zipped file, decompress it and drag
    WinXound.app to your Applications folder (or where you want). Launch
    it from there.

**Linux Installation and Usage:**

-   Download and install the latest version of CSound 6 for your
    distribution;
-   Ubuntu (32/64 bit): Download the WinXound zipped file, decompress it
    in a location where you have the full read and write permissions;
-   To compile the source code:\
    1) Before to compile WinXound you need to install:\
    - gtkmm-2.4 (libgtkmm-2.4-dev) \>= 2.12\
    - vte (libvte-dev)\
    - webkit-1.0 (libwebkit-dev)\
    \
    2) To compile WinXound open the terminal window, go into the
    uncompressed \"winxound\_gtkmm\" directory and type:\
    ./preconfigure\
    ./configure\
    (make clean)\
    make\
    \
    3) To use WinXound without installing it:\
    make standalone\
    ./bin/winxound\
    \[Note: WinXound folder must be located in a path where you have
    full read and write permission.\]\
    \
    4) To install WinXound:\
    make install

------------------------------------------------------------------------

\
**Source Code:**

-   Windows: The source code is written in C\# using Microsoft Visual
    Studio C\# Express Edition 2008.
-   OsX: The source code is written in Cocoa and Objective-C using XCode
    3.2 version.
-   Linux: The source code is written in C++ (Gtkmm) using Anjuta.

\
Note: *The TextEditor is entirely based on the wonderful SCINTILLA text
control by Neil Hodgson (<http://www.scintilla.org>).*\
\

------------------------------------------------------------------------

\
\
**Screenshots:**\
\
Look
at: [winxound.codeplex.com](http://winxound.codeplex.com/ "winxound.codeplex.com") 

------------------------------------------------------------------------

\

**Credits:**\
Many thanks for suggestions and debugging help to Roberto Doati, Gabriel
Maldonado, Mark Jamerson, Andreas Bergsland, Oeyvind Brandtsegg,
Francesco Biasiol, Giorgio Klauer, Paolo Girol, Francesco Porta, Eric
Dexter, Menno Knevel, Joseph Alford, Panos Katergiathis, James
Mobberley, Fabio Macelloni, Giuseppe Silvi, Maurizio Goina, Andrés
Cabrera, Peiman Khosravi, Rory Walsh and Luis Jure.\
\
