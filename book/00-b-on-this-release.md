# ON THIS RELEASE

This (7th) is a major release, thanks to Hlöðver Sigurðsson. At the Csound conference in Cagli september 2019, we had a chat about how we could make the examples of this manual executable in a web browser, without any previous installation of Csound. We agreed that this requires a new repository for the text base and the programming interface. The text is now hosted at [csound-flossmanual](https://github.com/csound-flossmanual/csound-floss) on github. It is written in Markdown, and Hlöðver created an environment which makes it easy to edit. Those who are interested should have a look at the [readme](https://github.com/csound-flossmanual/csound-floss/blob/master/README.md) and the descriptions on how to [contribute](https://github.com/csound-flossmanual/csound-floss/tree/master/contribute).

The URL to access the new Csound FLOSS Manual is: [https://flossmanual.csound.com](https://flossmanual.csound.com)

The whole text has been revised. Many figures have been substituted or added. Math formulas are now written in TexMath. Some chapters have been updated or even completely rewritten; amongst them:

- [01 A Digital Audio](01-a-digital-audio.md)
- [01 B Pitch and Frequency](01-b-pitch-and-frequency.md)
- [03 E Arrays](03-e-arrays.md)
- [04 C AM](04-c-amplitude-and-ring-modulation.md)
- [04 D FM](04-d-frequency-modulation.md) (thanks to Marijana Janevska)
- [04 H Scanned Synthesis](04-h-scanned-synthesis.md)
- [05 G Granular Synthesis](05-g-granular-synthesis.md)
- [05 H Convolution](05-h-convolution.md)
- [05 I Spectral Processing](05-i-fourier-analysis-spectral-processing.md)
- [08 A Open Sound Control](08-a-open-sound-control.md)
- [10 B Cabbage](10-b-cabbage.md) (thanks to Rory Walsh)
- [12 A Csound API](12-a-the-csound-api.md) (thanks to François Pinot)
- [12 B Python and Csound](12-b-python-and-csound.md)
- [12 C Lua and Csound](12-c-lua-and-csound.md) (thanks for Philipp Henkel)
- [12 D Csound in iOS](12-d-csound-in-ios.md) (thanks to Alessandro Petrolati)
- [12 E Csound on Android](12-e-csound-on-android.md) (thanks to Michael Gogins)
- [12 F Csound in Haskell](12-f-csound-and-haskell.md) (thanks to Anton Kholomiov)
- [12 G Csound in HTML and Javascript](12-g-csound-in-html-and-javascript.md) (thanks to Michael Gogins)
- [15 A Opcode Guide](15-a-opcode-guide.md)

The chapter about amplitude and pitch tracking has now been moved to [14 C](14-c-amplitude-and-pitch-tracking.md) together with other _miscellaneous_ articles.

The explanations and examples try to find a balance between _no previous knowledge_ (as basic as possible) and _interesting also for advanced users_ (as elaborate as possible). On the one hand certainly an impossible mission, but to put it as request to the reader: Please tolerate that some examples may be either too simple or too complex for you -- it cannot be different.

Since the first release of this textbook in 2010, Iain McCurdy was my compagnion in the attempt to keep it up to date and improve it. He showed us all how Csound can sound, and the best parts of this book (both descriptions and examples) are his work. His inexhaustible collection of [Csound Realtime Examples](http://iainmccurdy.org/csound.html) should be used all the time, in my opinion.

Previous releases can be found at [https://github.com/csound-flossmanual/csound-flossmanual.github.io](https://github.com/csound-flossmanual/csound-flossmanual.github.io), as well as the current csd files and audio samples.

I hope the ones who still enjoy reading texts find this resource useful to learn more about music and realizing their music in Csound.

This release is dedicated to the memory of Eugenio Giordani, collegue, friend, pioneer of computer music in Italy and one of the hosts of the memorable Csound Conference 2019 in Cagli. He passed away in April, much too early for us. I hope he would have enjoyed the development of this textbook.

Hannover, September 2020  
joachim heintz
