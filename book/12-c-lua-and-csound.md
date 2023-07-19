# 12 C. LUA AND CSOUND

The Lua programming language originated in Brazil in 1993.
It became a flexible and popular scripting language in the 2000s,
especially for people working in Game and app design.
The key characterics of Lua derive from its simplicity,
including a fairly small size and good performance. Compared to Python and simliar languages, Lua is faster.

So running Csound in Lua is a good option if someone is building an app which needs to be
both fast and also simple to code. (Compared to the potential complexity of writing an application in C or C++.)
Throughout the 2010s, Csounders from all over the world built interesting and
rich audio applications with Lua and Csound.
For Indi Developers working with the [Löve 2D](https://love2d.org/) Engine,
which is based on Lua, Csound can be a sophisticated option for controlling the sound,
as well as creating/controlling the sounds in Csound.

## Installing

In order to run Csound Code in Lua, the _luaCsnd6_ shared object is needed.
Currently (Csound 6.14) it is not available in the Windows and Mac installer.
In other words, it requires an own build of Csound on these platforms.

On Linux, the _luaCsnd.so_ should be found in _/usr/lib_,
if you install Csound via the package manager.
For own builds of Csound, it should be found in _/usr/local/lib_ or in your build directory.

## Setting the Lua Path

Once the _luaCsnd6.so_ is there, it needs to be added to the Lua Path.
Either put the _luaCsnd_ object in a directory where Lua is searching by default,
or add these lines to the configuration file of your shell:

Using Csound build directory:
LUA_CPATH="/home/user/csound/buildluaCsnd6.so"

Or using installed Csound (depending on the installation path):

    LUA_CPATH="/usr/local/lib/luaCsnd6.so"

LUA_CPATH="/usr/lib/luaCsnd6.so"

## Running Csound in Lua

This is a test code to be executed in your Lua environment.
It will show whether Csound can be run via the Lua Csound API.

    require "luaCsnd6"

    -- Defining our Csound ORC code within a multiline String
    orc = [[
    sr=44100
    ksmps=32
    nchnls=2
    0dbfs=1
    instr 1
    aout vco2 0.5, 440
    outs aout, aout
    endin
    ]]

    -- Defining our Csound SCO code
    sco = "i1 0 1"

    local c = luaCsnd6.Csound()
    c:SetOption("-odac")  -- Using SetOption() to configure Csound
                          -- Note: use only one commandline flag at a time

    c:CompileOrc(orc)     -- Compile the Csound Orchestra string
    c:ReadScore(sco)      -- Compile the Csound SCO String
    c:Start()  -- When compiling from strings, call Start() prior to Perform()
    c:Perform()  -- Run Csound to completion
    c:Stop()

## Future Applications for Lua and Csound

Concerning the future of Csound and Lua, it might be beneficial in the wake of the AI revolution to look into the possibility of using the Torch Framework in Lua. (Which is comparable to the Tensorflow Framework in Python to create different kinds of Deep Learning Application for Audio, Composition or Sound Synthesis). Although the Torch Framework is not as widely used as Tensorflow in Python, having even a dedicated Audio Library with the magenta projects applications, the DSP capabilities of Lua and Python are quite limited and are lacking the a sophisticated environment that Csound offers.
