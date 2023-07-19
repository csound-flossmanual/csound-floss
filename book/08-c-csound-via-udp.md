# 08 C. CSOUND VIA UDP

## Using Csound via UDP with the _--port_ Option

The _--port=N_ option allows users to send orchestras to be compiled
on-the-fly by Csound via UDP connection. This way, Csound can be started
with no instruments, and will listen to messages sent to it. Many
programs are capable of sending UDP messages, and scripting languages,
such as Python, can also be used for this purpose. The simplest way of
trying out this option is via the netcat program, which can be used in
the terminal via the nc command.

Let's explore this as an example of the _--port_ option.\
First, Csound is started with the following command:

    $ csound -odac --port=1234

Alternatively, if using a frontend such as CsoundQt, it is possible run
an empty CSD, with the _--port_ in its CsOptions field:

#### **_EXAMPLE 10F01_csound_udp.csd_**

```csound
<CsoundSynthesizer>
<CsOptions>
--port=1234
</CsOptions>
<CsInstruments>
</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

This will start Csound in a daemon mode, waiting for any UDP messages in
port 1234. Now with netcat, orchestra code can be sent to Csound. A
basic option is to use it interactively in the terminal, with a
heredocument command (\<\<) to indicate the end of the orchestra we are
sending:

    $ nc -u 127.0.0.1 1234 << EOF
    > instr 1
    > a1 oscili p4*0dbfs,p5
    > out a1
    > endin
    > schedule 1,0,1,0.5,440
    > EOF

Csound will respond with a 440Hz sinewave. The ctl-c key combination can
be used to close nc and go back to the shell prompt. Alternatively, we
could write our orchestra code to a file and then send it to Csound via
the following command (orch is the name of our file):

    $ nc -u 127.0.0.1 1234 < orch

Csound performance can be stopped in the usual way via ctl-c in the
terminal, or through the dedicated transport controls in a frontend.
We can also close the server it via a special UDP message:

    ERROR WITH MACRO close

However, this will not close Csound, but just stop the UDP server.
