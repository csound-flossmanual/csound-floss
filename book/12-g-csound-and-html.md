12 G. CSOUND AND HTML
=====================

Introduction
-------------

Currently it is possible to use Csound together with HTML and JavaScript 
in at least the following environments:

1. [CsoundQt](https://csoundqt.github.io/), described in [10 A](10-a-csoundqt.md).
2. The Csound for Android app, described in [12 E](12-e-csound-on-android.md).
3. The [csound.node](https://github.com/gogins/csound-extended/tree/develop/csound.node) extension for [NW.js](https://nwjs.io/).
4. Csound built for WebAssembly, which has two slightly different forms:

   1. The canonical build, described in [10 F](10-f-web-based-csound.md).
   2. The [csound-extended](https://github.com/gogins/csound-extended/tree/develop/WebAssembly) build.
   
For instructions on installing any of these environments, please consult the 
documentation provided in the links mentioned above.

All of these environments provide a JavaScript interface to Csound, 
which appears as a global Csound object in the JavaScript context of a Web 
page. Please note, there may be minor differences in the JavaScript interface 
to Csound between these environments.

With HTML and JavaScript it is possible to define user interfaces, to
control Csound, and to generate Csound scores and even orchestras. 

In all of these environments, a piece may be written in the form of a Web page 
(an .html file), with access to a global instance of Csound that exists in the 
JavaScript context of that Web page. In such pieces, it is common to embed the 
entire .orc or .csd file for Csound into the .html code as a JavaScript multiline 
string literal or an invisible TextArea widget.

In CsoundQt and Csound for Android, the HTML code may be embedded in an optional 
`<html>` element of the Csound Structured Data (.csd) file. This element
essentially defines a Web page that contains Csound, but the host application 
is responsible for editing the Csound orchestra and running it.

This chapter is organized as follows:

1.  Introduction (this section)
2.  Tutorial User's Guide
3.  Conclusion

HTML must be understood here to represent not only Hyper Text Markup
Language, but also all of the other Web standards that currently are
supported by Web browsers, Web servers, and the Internet, including
cascading style sheets (CSS), HTML5 features such as drawing on a
graphics canvas visible in the page, producing animated 3-dimensional
graphics with WebGL including shaders and GPU acceleration, Web Audio,
various forms of local data storage, Web Sockets, and so on and so on.
This whole conglomeration of standards is currently defined and
maintained under the non-governmental leadership of the
[World Wide Web Consortium](http://www.w3.org/standards/) (W3C)
which in turn is primarily driven by commercial interests belonging to the
[Web Hypertext Application Technology Working Group](https://whatwg.org/) (WHATWG).
Most modern Web browsers implement almost all of the W3C standards up to
and including HTML5 at an impressive level of performance and
consistency. To see what features are available in your own Web browser,
go to this [test page](https://html5test.com/). All of this stuff is now
usable in Csound pieces.

### An Example of Use

For an example of a few of the things are possible with HTML in Csound,
take a look at the following piece, ***Scrims***, which runs in contemporary 
Web browsers using a WebAssembly build of Csound and JavaScript code. In 
fact, it's running right here on this page!

![](https://gogins.github.io/csound-extended/scrims.html){width=100% height=600px object-fit=contain}

***Scrims*** is a demanding piece, and may not run without dropouts unless you 
have a rather fast computer. However, it demonstrates a number of ways to use 
HTML and JavaScript with Csound:

1. Use of the [Three.js](https://threejs.org/) library to generate a 3-dimensional animated image of 
   the popcorn fractal.
2. Use of an external JavaScript library, 
   [silencio](https://github.com/gogins/csound-extended/tree/develop/silencio), to sample the moving 
   image and to generate Csound notes from it, that are sent to Csound in real time 
   with the Csound API `csound.readScore` function.
3. Use of a complex Csound orchestra that is embedded in a hidden TextArea on 
   the page.
4. Use of the [dat.gui](https://github.com/dataarts/dat.gui) library to easily 
   create sliders and buttons for controlling the piece in real time.
5. Use of the [jQuery](https://jquery.com/) library to simplify handling events from sliders, 
   buttons, and other HTML elements.
6. Use of a TextArea widget as a scrolling display for Csound's runtime messages.

To see this code in action, you can right-click on the piece and select the 
***Inspect*** command. Then you can browse the source code, set breakpoints, 
print values of variables, and so on.

It is true that LaTeX can do a better job of typesetting than HTML and
CSS. It is true that game engines can do a better job for interactive,
3-dimensional computer animation with scene graphs than WebGL. It is
true that compiled C or C++ code runs faster than JavaScript. It is true
that Haskell is a more fully-featured functional programming language
than JavaScript. It is true that MySQL is a more powerful database than
HTML5 storage.

But the fact is, there is no single program except for a Web browser
that manages to be quite as functional in all of these categories in a way
that beginning to intermediate programmers can use, and for which the
only required runtime is the Web browser itself.

For this reason alone, HTML makes a very good front end for Csound.
Furthermore, the Web standards are maintained in a stable form by a
large community of competent developers representing diverse interests.
So I believe HTML as a front end for Csound should be quite stable and
remain backwardly compatible, just as Csound itself remains backwardly
compatible with old pieces.

### How it Works

The Web browser embedded into CsoundQt is the
[Qt WebEngine](https://doc.qt.io/qt-5/qtwebengine-index.html).
The Web browser embedded into Csound for Android is the
[WebView](http://developer.android.com/reference/android/webkit/WebView.html)
available in the
[Android SDK](https://developer.android.com/index.html).

For a .html piece, the front end renders the HTML as a Web page and displays 
it in an embedded Web browser. The front end injects an instance of Csound 
into the JavaScript context of the Web.

For a .csd piece, the front end parses the `<html>` element out of the .csd 
file. The front end then loads this Web page into its embedded browser, and 
injects the same instance of Csound that is running the .csd into the 
JavaScript context of the Web page.

It is important to understand that *any* valid HTML code can be used in
Csound\'s `<html>` element. It is just a Web page like any other Web
page.

In general, the different Web standards are either defined as JavaScript
classes and libraries, or glued together using JavaScript. In other
words, HTML without JavaScript is dead, but HTML with JavaScript
handlers for HTML events and attached to the document elements in the
HTML code, comes alive. Indeed, JavaScript can itself define HTML
documents by programmatically creating Document Object Model objects.

JavaScript is the engine and the major programming language of the World
Wide Web in general, and of code that runs in Web browsers in
particular. JavaScript is a standardized language, and it is a
functional programming language similar to Scheme. JavaScript also allows 
classes to be defined by prototypes.

The JavaScript execution context of a Csound Web page contains Csound
itself as a *csound* JavaScript object that has at least the following 
methods:

    getVersion() [returns a number]
    compileOrc(orchestra_code) and
    evalCode(orchestra_code) [returns the numeric result of the evaluation]
    readScore(score_lines)
    setControlChannel(channel_name,number)
    getControlChannel(channel_name) [returns a number representing the channel value]
    message(text)
    getSr() [returns a number]
    getKsmps() [returns a number]
    getNchnls() [returns a number]
    isPlaying() [returns 1 if Csound is playing, 0 if not]

The front end contains a mechanism for forwarding JavaScript calls in
the Web page's JavaScript context to native functions that are defined
in the front end, which passes them on to Csound. This involves a small
amount of C++ glue code that the user does not need to know about. In
CsoundQt, the glue code uses some JavaScript proxy generator that is 
injected into the JavaScript context of the Web page, but again, the user does 
not need to know anything about this.

In the future, more functions from the Csound API will be added to this
JavaScript interface, including, at least in some front ends, the
ability for Csound to appear as a Node in a Web Audio graph (this
already is possible in the Emscripten built of Csound).


Tutorial User Guide
--------------------

Here we will use CsoundQt to run Csound with HTML.

Let's get started and do a few things in the simplest possible way, in
a series of *toots*. All of these pieces are completely contained in unfolding 
boxes here, from which they can be copied and then pasted into the CsoundQt 
editor, and some pieces are included as HTML examples in CsoundQt.

1.  Display \"Hello, World, this is Csound!\" in HTML.
2.  Create a button that will generate a series of notes based on the
    logistic equation.
3.  Create a slider to set the value of the parameter that controls the
    degree of chaos produced by iterating the logistic equation, and two
    other sliders to control the frequency ratio and modulation index of
    the FM instrument that plays the notes from the logistic equation.
4.  Style the HTML elements using a style sheet.

### HelloWorld.csd

This is about the shortest CSD that shows some HTML output. In its
entirety it is:

<details>
    <summary>
    Click to expand code
    </summary>

~~~
<CsoundSynthesizer>
<CsOptions>
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 128
nchnls = 2
0dbfs = 1.0
</CsInstruments>
<html>
Hello, World, this is Csound!
</html>
<CsScore>
f 0 10
</CsScore>
</CsoundSynthesizer>
;example by Michael Gogins
~~~

</details>

### Minimal_HTML_Example.csd

This is a simple example that shows how to control Csound using an HTML slider.

<details>
    <summary>
    Click to expand code
    </summary>

~~~
; Minimal example about using html section in CSD
; by Tarmo Johannes trmjhnns@gmail.com 2016

<CsoundSynthesizer>
<CsOptions>
-odac -d
</CsOptions>
<html>
  <head>
  </head>
  <body bgcolor="lightblue">
  <script>
  function onGetControlChannelCallback(value) {
    document.getElementById('testChannel').innerHTML = value;
   } // to test csound.getControlChannel with QtWebEngine 
  </script>
   <h2>Minimal Csound-Html5 example</h2><br>
   <br>
   Frequency: 
   <input type="range" id="slider" oninput='csound.setControlChannel("testChannel",this.value/100.0); '></input><br>
    <button id="button" onclick='csound.readScore("i 1 0 3")' >Event</button>
   <br><br>
   Get channel from csound with callback (QtWebchannel): <label id="getchannel"></label> <button onclick='csound.getControlChannel("testChannel", onGetControlChannelCallback)' >Get</button><br>
        Value from channel "testChannel":  <label id="testChannel"></label><br>
   <br>
    Get as return value (QtWebkit) <button onclick='alert("TestChannel: "+csound.getControlChannel("testChannel"))'>Get as retrun value</button>

   <br>
  </body>
</html>
<CsInstruments>

sr = 44100
nchnls = 2
0dbfs = 1
ksmps = 32

chnset 0.5, "testChannel" ; to test chnget in the host

instr 1 
  kfreq= 200+chnget:k("testChannel")*500	
  printk2 kfreq
  aenv linen 1,0.1,p3,0.25
  out poscil(0.5,kfreq)*aenv
endin

; schedule 1,0,0.1, 1

</CsInstruments>
<CsScore>
i 1 0 0.5 ; to hear if Csound is loaded
f 0 3600
</CsScore>
</CsoundSynthesizer>

~~~

</details>

### Styled_Sliders.csd

And now a more complete example where the user controls both 
the compositional algorithm, the logistic equation, and the sounds 
of the instruments. In addition, HTML styles are used to create a more 
pleasing user interface.

First the entire piece is presented, then the parts are discussed 
separately.

<details>
    <summary>
    Click to expand code
    </summary>

~~~
; Example about using CSS in html section of CSD
; By Michael Gogins 2016

<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>

sr                              =                       44100
ksmps                           =                       32
nchnls                          =                       2
iampdbfs                        init                    32768
                                prints                  "Default amplitude at 0 dBFS:  %9.4f\n", iampdbfs
idbafs                          init                    dbamp(iampdbfs)
                                prints                  "dbA at 0 dBFS:                 %9.4f\n", idbafs
iheadroom                       init                    6
                                prints                  "Headroom (dB):                 %9.4f\n", iheadroom
idbaheadroom                    init                    idbafs - iheadroom
                                prints                  "dbA at headroom:               %9.4f\n", idbaheadroom
iampheadroom                    init                    ampdb(idbaheadroom)
                                prints                  "Amplitude at headroom:        %9.4f\n", iampheadroom
                                prints                  "Balance so the overall amps at the end of performance -6 dbfs.\n"

                                connect                  "ModerateFM", "outleft", "Reverberation", "inleft"
                                connect                  "ModerateFM", "outright", "Reverberation", "inright"
                                connect                  "Reverberation", "outleft", "MasterOutput", "inleft"
                                connect                  "Reverberation", "outright", "MasterOutput", "inright"

                                alwayson                 "Reverberation"
                                alwayson                 "MasterOutput"
                                alwayson                 "Controls"

gk_FmIndex                      init                    0.5
gk_FmCarrier                    init                    1
                                instr                   ModerateFM
                                //////////////////////////////////////////////
                                // By Michael Gogins.
                                //////////////////////////////////////////////
i_instrument                    =                       p1
i_time                          =                       p2
i_duration                      =                       p3
i_midikey                       =                       p4
i_midivelocity                  =                       p5
i_phase                         =                       p6
i_pan                           =                       p7
i_depth                         =                       p8
i_height                        =                       p9
i_pitchclassset                 =                       p10
i_homogeneity                   =                       p11
iattack			              =			            0.002
isustain		                   =			            p3
idecay				          =			            8
irelease		                  =			            0.05
iHz                             =                       cpsmidinn(i_midikey)
idB                             =                       i_midivelocity
iamplitude                      =                       ampdb(idB) * 4.0
kcarrier                	    =                       gk_FmCarrier
imodulator              	    =                       0.5
ifmamplitude            	    =                       0.25
kindex                   	    =                       gk_FmIndex * 20
ifrequencyb             	    =                       iHz * 1.003
kcarrierb               	    =                       kcarrier * 1.004
aindenv                 	    transeg                 0.0, iattack, -11.0, 1.0, idecay, -7.0, 0.025, isustain, 0.0, 0.025, irelease, -7.0, 0.0
aindex                  	    =                       aindenv * kindex * ifmamplitude
isinetable                      ftgenonce               0, 0, 65536, 10, 1, 0, .02
; ares                  	    foscili                 xamp, kcps, xcar, xmod, kndx, ifn [, iphs]
aouta                   	    foscili                 1.0, iHz, kcarrier, imodulator, kindex / 4., isinetable
aoutb                   	    foscili                 1.0, ifrequencyb, kcarrierb, imodulator, kindex, isinetable
; Plus amplitude correction.
asignal               		    =                       (aouta + aoutb) * aindenv
adeclick                        linsegr                 0, iattack, 1, isustain, 1, irelease, 0
asignal                         =                       asignal * iamplitude
aoutleft, aoutright             pan2                    asignal * adeclick, i_pan
                                outleta                 "outleft",  aoutleft
                                outleta                 "outright", aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

gkReverberationWet              init                    .5
gk_ReverberationDelay            init                    .6
                                instr                   Reverberation
ainleft                         inleta                  "inleft"
ainright                        inleta                  "inright"
aoutleft                        =                       ainleft
aoutright                       =                       ainright
kdry				              =			            1.0 - gkReverberationWet
awetleft, awetright             reverbsc                ainleft, ainright, gk_ReverberationDelay, 18000.0
aoutleft			              =			            ainleft *  kdry + awetleft  * gkReverberationWet
aoutright			         =			            ainright * kdry + awetright * gkReverberationWet
                                outleta                 "outleft", aoutleft
                                outleta                 "outright", aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

gk_MasterLevel                   init                   1
                               instr                   MasterOutput
ainleft                         inleta                  "inleft"
ainright                        inleta                  "inright"
aoutleft                        =                       gk_MasterLevel * ainleft
aoutright                       =                       gk_MasterLevel * ainright
                                outs                    aoutleft, aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

instr Controls

gk_FmIndex_ chnget "gk_FmIndex"
if gk_FmIndex_  != 0 then
 gk_FmIndex = gk_FmIndex_
endif

gk_FmCarrier_ chnget "gk_FmCarrier"
if gk_FmCarrier_  != 0 then
 gk_FmCarrier = gk_FmCarrier_
endif

gk_ReverberationDelay_ chnget "gk_ReverberationDelay"
if gk_ReverberationDelay_  != 0 then
 gk_ReverberationDelay = gk_ReverberationDelay_
endif

gk_MasterLevel_ chnget "gk_MasterLevel"
if gk_MasterLevel_  != 0 then
 gk_MasterLevel = gk_MasterLevel_
endif

endin

</CsInstruments>
<html>
<head>
</head>
<style type="text/css">
input[type='range'] {
    -webkit-appearance: none;
    border-radius: 5px;
    box-shadow: inset 0 0 5px #333;
    background-color: #999;
    height: 10px;
    width: 100%;
    vertical-align: middle;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: yellow;
    margin-top: -4px;
    border-radius: 10px;
}
table td {
    border-width: 2px;
    padding: 8px;
    border-style: solid;
    border-color: transparent;
    color:yellow;
    background-color: teal;
    font-family: sans-serif
}
</style>

<h1>Score Generator</h1>

<script>

var c = 0.99;
var y = 0.5;
function generate() {
    csound.message("generate()...\n");
    for (i = 0; i < 50; i++) {
      var t = i * (1.0 / 3.0);
      var y1 = 4.0 * c * y * (1.0 - y);
      y = y1;
      var key = Math.round(36.0 + (y * 60.0));
      var note = "i 1 " + t + " 2.0 " + key + " 60 0.0 0.5\n";
      csound.readScore(note);
    };
};

function on_sliderC(value) {
    c = parseFloat(value);
    document.querySelector('#sliderCOutput').value = c;
}

function on_sliderFmIndex(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderFmIndexOutput').value = numberValue;
    csound.setControlChannel('gk_FmIndex', numberValue);
}

function on_sliderFmRatio(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderFmRatioOutput').value = numberValue;
    csound.setControlChannel('gk_FmCarrier', numberValue);
}

function on_sliderReverberationDelay(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderReverberationDelayOutput').value = numberValue;
    csound.setControlChannel('gk_ReverberationDelay', numberValue);
}

function on_sliderMasterLevel(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderMasterLevelOutput').value = numberValue;
    csound.setControlChannel('gk_MasterLevel', numberValue);
}

</script>

<table>
<col width="2*">
<col width="5*">
<col width="100px">

<tr>
<td>
<label for=sliderC>c</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderC(value)">
<td>
<output for=sliderC id=sliderCOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderFmIndex>Frequency modulation index</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderFmIndex(value)">
<td>
<output for=sliderFmIndex id=sliderFmIndexOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderFmRatio>Frequency modulation ratio</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderFmRatio step=0.001 oninput="on_sliderFmRatio(value)">
<td>
<output for=sliderFmRatio id=sliderFmRatioOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderReverberationDelay>Reverberation delay</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderReverberationDelay step=0.001 oninput="on_sliderReverberationDelay(value)">
<td>
<output for=sliderReverberationDelay id=sliderReverberationDelayOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderMasterLevel>Master output level</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderMasterLevel step=0.001 oninput="on_sliderMasterLevel(value)">
<td>
<output for=sliderMasterLevel id=sliderMasterLevelOutput>.5</output>
</tr>

<tr>
<td>
<button onclick="generate()"> Generate score </button>
</td>
</tr>

</table>

</html>
<CsScore>
</CsScore>
</CsoundSynthesizer>
         prints                  "dbA at headroom:               %9.4f\n", idbaheadroom
iampheadroom                    init                    ampdb(idbaheadroom)
                                prints                  "Amplitude at headroom:        %9.4f\n", iampheadroom
                                prints                  "Balance so the overall amps at the end of performance -6 dbfs.\n"

                                connect                  "ModerateFM", "outleft", "Reverberation", "inleft"
                                connect                  "ModerateFM", "outright", "Reverberation", "inright"
                                connect                  "Reverberation", "outleft", "MasterOutput", "inleft"
                                connect                  "Reverberation", "outright", "MasterOutput", "inright"

                                alwayson                 "Reverberation"
                                alwayson                 "MasterOutput"
                                alwayson                 "Controls"

gk_FmIndex                      init                    0.5
gk_FmCarrier                    init                    1
                                instr                   ModerateFM
                                //////////////////////////////////////////////
                                // By Michael Gogins.
                                //////////////////////////////////////////////
i_instrument                    =                       p1
i_time                          =                       p2
i_duration                      =                       p3
i_midikey                       =                       p4
i_midivelocity                  =                       p5
i_phase                         =                       p6
i_pan                           =                       p7
i_depth                         =                       p8
i_height                        =                       p9
i_pitchclassset                 =                       p10
i_homogeneity                   =                       p11
iattack			              =			            0.002
isustain		                   =			            p3
idecay				          =			            8
irelease		                  =			            0.05
iHz                             =                       cpsmidinn(i_midikey)
idB                             =                       i_midivelocity
iamplitude                      =                       ampdb(idB) * 4.0
kcarrier                	    =                       gk_FmCarrier
imodulator              	    =                       0.5
ifmamplitude            	    =                       0.25
kindex                   	    =                       gk_FmIndex * 20
ifrequencyb             	    =                       iHz * 1.003
kcarrierb               	    =                       kcarrier * 1.004
aindenv                 	    transeg                 0.0, iattack, -11.0, 1.0, idecay, -7.0, 0.025, isustain, 0.0, 0.025, irelease, -7.0, 0.0
aindex                  	    =                       aindenv * kindex * ifmamplitude
isinetable                      ftgenonce               0, 0, 65536, 10, 1, 0, .02
; ares                  	    foscili                 xamp, kcps, xcar, xmod, kndx, ifn [, iphs]
aouta                   	    foscili                 1.0, iHz, kcarrier, imodulator, kindex / 4., isinetable
aoutb                   	    foscili                 1.0, ifrequencyb, kcarrierb, imodulator, kindex, isinetable
; Plus amplitude correction.
asignal               		    =                       (aouta + aoutb) * aindenv
adeclick                        linsegr                 0, iattack, 1, isustain, 1, irelease, 0
asignal                         =                       asignal * iamplitude
aoutleft, aoutright             pan2                    asignal * adeclick, i_pan
                                outleta                 "outleft",  aoutleft
                                outleta                 "outright", aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

gkReverberationWet              init                    .5
gk_ReverberationDelay            init                    .6
                                instr                   Reverberation
ainleft                         inleta                  "inleft"
ainright                        inleta                  "inright"
aoutleft                        =                       ainleft
aoutright                       =                       ainright
kdry				              =			            1.0 - gkReverberationWet
awetleft, awetright             reverbsc                ainleft, ainright, gk_ReverberationDelay, 18000.0
aoutleft			              =			            ainleft *  kdry + awetleft  * gkReverberationWet
aoutright			         =			            ainright * kdry + awetright * gkReverberationWet
                                outleta                 "outleft", aoutleft
                                outleta                 "outright", aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

gk_MasterLevel                   init                   1
                               instr                   MasterOutput
ainleft                         inleta                  "inleft"
ainright                        inleta                  "inright"
aoutleft                        =                       gk_MasterLevel * ainleft
aoutright                       =                       gk_MasterLevel * ainright
                                outs                    aoutleft, aoutright
                                prints                  "instr %4d t %9.4f d %9.4f k %9.4f v %9.4f p %9.4f\n", p1, p2, p3, p4, p5, p7
                                endin

instr Controls

gk_FmIndex_ chnget "gk_FmIndex"
if gk_FmIndex_  != 0 then
 gk_FmIndex = gk_FmIndex_
endif

gk_FmCarrier_ chnget "gk_FmCarrier"
if gk_FmCarrier_  != 0 then
 gk_FmCarrier = gk_FmCarrier_
endif

gk_ReverberationDelay_ chnget "gk_ReverberationDelay"
if gk_ReverberationDelay_  != 0 then
 gk_ReverberationDelay = gk_ReverberationDelay_
endif

gk_MasterLevel_ chnget "gk_MasterLevel"
if gk_MasterLevel_  != 0 then
 gk_MasterLevel = gk_MasterLevel_
endif

endin

</CsInstruments>
<html>
<head>
</head>
<style type="text/css">
input[type='range'] {
    -webkit-appearance: none;
    border-radius: 5px;
    box-shadow: inset 0 0 5px #333;
    background-color: #999;
    height: 10px;
    width: 100%;
    vertical-align: middle;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: yellow;
    margin-top: -4px;
    border-radius: 10px;
}
table td {
    border-width: 2px;
    padding: 8px;
    border-style: solid;
    border-color: transparent;
    color:yellow;
    background-color: teal;
    font-family: sans-serif
}
</style>

<h1>Score Generator</h1>

<script>

var c = 0.99;
var y = 0.5;
function generate() {
    csound.message("generate()...\n");
    for (i = 0; i < 50; i++) {
      var t = i * (1.0 / 3.0);
      var y1 = 4.0 * c * y * (1.0 - y);
      y = y1;
      var key = Math.round(36.0 + (y * 60.0));
      var note = "i 1 " + t + " 2.0 " + key + " 60 0.0 0.5\n";
      csound.readScore(note);
    };
};

function on_sliderC(value) {
    c = parseFloat(value);
    document.querySelector('#sliderCOutput').value = c;
}

function on_sliderFmIndex(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderFmIndexOutput').value = numberValue;
    csound.setControlChannel('gk_FmIndex', numberValue);
}

function on_sliderFmRatio(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderFmRatioOutput').value = numberValue;
    csound.setControlChannel('gk_FmCarrier', numberValue);
}

function on_sliderReverberationDelay(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderReverberationDelayOutput').value = numberValue;
    csound.setControlChannel('gk_ReverberationDelay', numberValue);
}

function on_sliderMasterLevel(value) {
    var numberValue = parseFloat(value);
    document.querySelector('#sliderMasterLevelOutput').value = numberValue;
    csound.setControlChannel('gk_MasterLevel', numberValue);
}

</script>

<table>
<col width="2*">
<col width="5*">
<col width="100px">

<tr>
<td>
<label for=sliderC>c</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderC(value)">
<td>
<output for=sliderC id=sliderCOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderFmIndex>Frequency modulation index</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderFmIndex(value)">
<td>
<output for=sliderFmIndex id=sliderFmIndexOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderFmRatio>Frequency modulation ratio</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderFmRatio step=0.001 oninput="on_sliderFmRatio(value)">
<td>
<output for=sliderFmRatio id=sliderFmRatioOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderReverberationDelay>Reverberation delay</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderReverberationDelay step=0.001 oninput="on_sliderReverberationDelay(value)">
<td>
<output for=sliderReverberationDelay id=sliderReverberationDelayOutput>.5</output>
</tr>

<tr>
<td>
<label for=sliderMasterLevel>Master output level</label>
<td>
<input type=range min=0 max=1 value=.5 id=sliderMasterLevel step=0.001 oninput="on_sliderMasterLevel(value)">
<td>
<output for=sliderMasterLevel id=sliderMasterLevelOutput>.5</output>
</tr>

<tr>
<td>
<button onclick="generate()"> Generate score </button>
</td>
</tr>

</table>

</html>
<CsScore>
</CsScore>
</CsoundSynthesizer>

~~~
</details>

Here I have introduced a simple Csound orchestra consisting of a single
frequency modulation instrument feeding first into a reverberation
effect, and then into a master output unit. These are connected using
the signal flow graph opcodes. The actual orchestra is of little
interest here. 

#### Generating the Score

This piece has no score, because the score will be generated at run time. 
In the `<html>` element, I also have added this button:

    <button onclick="generate()"> Generate score </button>

When this button is clicked, it calls a JavaScript function that uses
the logistic equation, which is a simple quadratic dynamical system,  to
generate a Csound score from a chaotic attractor of the system. This
function also is quite simple. Its main job, aside from iterating the
logistic equation a few hundred times, is to translate each iteration of
the system into a musical note and send that note to Csound to be played
using the Csound API function readScore(). So the following `<script>`
element is added to the body of the `<html>` element:

    <script>
    var c = 0.99;
    var y = 0.5;
    function generate() {
            csound.message("generate()...\n");
            for (i = 0; i < 200; i++) {
              var t = i * (1.0 / 3.0);
              var y1 = 4.0 * c * y * (1.0 - y);
              y = y1;
              var key = Math.round(36.0 + (y * 60.0));
              var note = "i 1 " + t + " 2.0 " + key + " 60 0.0 0.5\n";
              csound.readScore(note);
            };
    };
    </script>


#### Adding Sliders

The next step is to add more user control to this piece. We will enable
the user to control the attractor of the piece by varying the constant
*c*, and we will enable the user to control the sound of the Csound
orchestra by varying the  frequency modulation index, frequency
modulation carrier ratio, reverberation time, and master output level.

This code is demonstrated on a low level, so that you can see all of the
details and understand exactly what is going on. A real piece would most
likely be written at a higher level of abstraction, for example by using
a third party widget toolkit, such as jQuery UI.

A slider in HTML is just an `input` element like this:

    <input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderC(value)">

This element has attributes of minimum value 0, maximum value 1, which
normalizes the user's possible values between 0 and 1. This could be
anything, but in many musical contexts, for example VST plugins, user
control values are always normalized between 0 and 1. The tiny `step`
attribute simply approximates a continuous range of values.

The most important thing is the `oninput` attribute, which sets the
value of a JavaScript event handler for the `oninput` event. This
function is called whenever the user changes the value of the slider.

For ease of understanding, a naming convention is used here, with
*sliderC* being the basic name and other names of objects associated
with this slider taking names built up by adding prefixes or suffixes
to this basic name.

Normally a slider has a label, and it is convenient to show the actual
numerical value of the slider. This can be done like so:

    <table>
    <col width="2*">
    <col width="5*">
    <col width="100px">
    <tr>
    <td>
    <label for=sliderC>c</label>
    <td>
    <input type=range min=0 max=1 value=.5 id=sliderC step=0.001 oninput="on_sliderC(value)">
    <td>
    <output for=sliderC id=sliderCOutput>.5</output>
    </tr>
    </table>

If the slider, its label, and its numeric display are put into an HTML
table, that table will act like a layout manager in a standard widget
toolkit, and will resize the contained elements as required to get them
to line up.

For this slider, the JavaScript handler is:

    function on_sliderC(value) {
        c = parseFloat(value);
        document.querySelector('#sliderCOutput').value = c;
    }

The variable *c* was declared at global scope just above the generate()
function, so that variable is accessible within the *on_sliderC*
function.

Keep in mind, if you are playing with this code, that a new value of *c*
will only be heard when a new score is generated.

Very similar logic can be used to control variables in the Csound
orchestra. The value of the slider has to be sent to Csound using the
channel API, like this:

    function on_sliderFmIndex(value) {
        var numberValue = parseFloat(value);
        document.querySelector('#sliderFmIndexOutput').value = numberValue;
        csound.setControlChannel('gk_FmIndex', numberValue);
    }

Then, in the Csound orchestra, that value has to be retrieved using the
chnget opcode and applied to the instrument to which it pertains. It is
most efficient if the variables controlled by channels are global
variables declared just above their respective instrument definitions.
The normalized values can be rescaled as required in the Csound
instrument code.

    gk_FmIndex init 0.5
    instr ModerateFM
    ...
    kindex = gk_FmIndex * 20
    ...
    endin

Also for the sake of efficiency, a global, always-on instrument can be
used to read the control channels and assign their values to these
global variables:

    instr Controls
    gk_FmIndex_ chnget "gk_FmIndex"
    if gk_FmIndex_  != 0 then
     gk_FmIndex = gk_FmIndex_
    endif
    gk_FmCarrier_ chnget "gk_FmCarrier"
    if gk_FmCarrier_  != 0 then
     gk_FmCarrier = gk_FmCarrier_
    endif
    gk_ReverberationDelay_ chnget "gk_ReverberationDelay"
    if gk_ReverberationDelay_  != 0 then
     gk_ReverberationDelay = gk_ReverberationDelay_
    endif
    gk_MasterLevel_ chnget "gk_MasterLevel"
    if gk_MasterLevel_  != 0 then
     gk_MasterLevel = gk_MasterLevel_
    endif
    endin

Note that each actual global variable has a default value, which is only
overridden if the user actually operates its slider.


#### Customizing the Style

The default appearance of HTML elements is brutally simple. But each
element has attributes that can be used to change its appearance, and
these offer a great deal of control.

Of course, setting for example the font attribute for each label on a
complex HTML layout is tedious. Therefore, this example shows how to use
a style sheet. We don't need much style to get a much improved
appearance:

    <style type="text/css">
    input[type='range'] {
            -webkit-appearance: none;
            border-radius: 5px;
            box-shadow: inset 0 0 5px #333;
            background-color: #999;
            height: 10px;
        width: 100%;
    vertical-align: middle;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: yellow;
        margin-top: -4px;
        border-radius: 10px;
    }
    table td {
            border-width: 2px;
            padding: 8px;
            border-style: solid;
            border-color: transparent;
        color:yellow;
            background-color: teal;
            font-family: sans-serif
    }
    </style>

This little style sheet is generic, that is, it applies to every element
on the HTML page. It says, for example, that *table td* (table cells)
are to have a yellow sans-serif font on a teal background, and this will
apply to every table cell on the page. Style sheets can be made more
specialized by giving them names. But for this kind of application, that
is not usually necessary.


Conclusion
-----------

Most, if not all all, of the functions performed by other Csound front
ends could be encompassed by HTML and JavaScript. However, there are a
few gotchas. For CsoundQt and other front ends based on Chrome, there
may be extra latency and processing overhead required by inter-process
communications. For Emscripten and other applications that use Web
Audio, there may also be additional latency.

Obviously, much *more* can be done with HTML, JavaScript, and other Web
standards found in contemporary Web browsers. Full-fledged,
three-dimensional, interactive, multi-player computer games are now
being written with HTML and JavaScript. Other sorts of Web applications
also are being written this way.

Sometimes, JavaScript is embedded into an application for use as a
scripting language. The Csound front ends discussed here are examples,
but there are others. For example, Max for Live can be programmed in
JavaScript, and so can the open source score editor MuseScore. In fact,
in MuseScore, JavaScript can be used to algorithmically generate notated
scores.
