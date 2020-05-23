12 D. CSOUND IN iOS
===================


The first part of this chapter is a guide which aims to introduce and illustrate some of the power that the Csound language offers to iOS Developers. It assumes that the reader has a rudimentary background in Csound, and some experience and understanding of iOS development with either Swift or Objective-C. The most recent Csound iOS SDK can be downloaded on Csound's
[download](http://csound.github.io/download) page. Older versions can be found
[here](https://github.com/csound/csound/releases). The Csound for iOS Manual (Lazzarini, Yi, Boulanger) that ships with the Csound for iOS API is intended to serve as a lighter reference for developers. This guide is distinct from it in that it is intended to be a more thorough, step-by-step approach to learning the API for the first time.

The second part of this chapter is a detailed discussion of the full integration of Csound into ths iOS Core Audio system.


I. Features of Csound in iOS
----------------------------


### Getting Started

There are a number of ways in which one might begin to learn to work
with the Csound for iOS API. Here, to aid in exploring it, we first
describe how the project of examples that ships with the API is
structured. We then talk about how to go about configuring a new iOS
Xcode project to work with Csound from scratch.


#### Csound for iOS Examples

The Csound for iOS Examples project contains a number of simple examples
(in both Objective-C and Swift) of how one might use Csound's synthesis
and signal processing capabilities, and the communicative functionality
of the API. It is available both in the download bundle or online in the
[Csound sources](https://github.com/csound/csound/tree/develop/iOS).

In the *ViewControllers* group, a number of subgroups exist to organize
the various individual examples into a single application. This is done
using the Master-Detail application layout paradigm, wherein a set of
options, all of them listed in a *master* table, correlates to a single
*detail* ViewController. Familiar examples of this design model,
employed by Apple and provided with every iOS device, are the Settings
app, and the Notes app -- each of these contains a master table upon
which the detail ViewController's content is predicated.

In each of these folders, you will find a unique example showcasing how
one might use some of the features of the Csound for iOS API to
communicate with Csound to produce and process sounds and make and play
music. These are designed to introduce you to these features in a
practical setting, and etch of these has a unifying theme that informs
its content, interactions, and structure.

#### Adding Csound to Your Project

If you are working in Objective-C, adding Csound for iOS to your project
is as simple as dragging the csound-iOS folder into your project. You
should select *Groups* rather than *Folder References*, and it is
recommended that you elect to copy the csound-iOS folder into your
project folder ("Copy Items if Needed").

Once you have successfully added this folder, including the CsoundObj
class (the class that manages Csound on iOS) is as simple as adding an
import statement to the class. For example:

~~~C
    //
    // ViewController.h
    //
    #import "CsoundObj.h"
~~~

Note that this only makes the CsoundObj class available, which provides
an interface for Csound. There are other objects containing UI and
CoreMotion bindings, as well as MIDI handling. These are discussed later
in this document, and other files will need to be imported in order to
access them.

For Swift users, the process is slightly different: you will need to
first create a *bridging header*: a `.h` header file that can import the
Objective-C API for access in Swift. The naming convention is
*[YourProjectName]-Bridging Header.h* and this file can be easily
created manually in Xcode by choosing *File > New > File > Header File*
(under *Source*), and using the naming convention described above. After
this, you will need to navigate to your project build settings and add
the path to this file (relative to your project's *.xcodeproj* project
file).

Once this is done, navigate to the bridging header in Xcode and add your
Objective-C `#import` statements here. For example:

~~~C
    //
    // CsoundiOS_ExampleSwift-Bridging-Header.h
    // CsoundiOS_ExampleSwift
    //

    #ifndef CsoundiOS_ExampleSwift_Bridging_Header_h
    #define CsoundiOS_ExampleSwift_Bridging_Header_h

    #import "CsoundObj.h"

    #endif /* CsoundiOS_ExampleSwift_Bridging_Header_h */
~~~

You do not need to add any individual import statements to Swift files,
CsoundObj's functionality should be accessible in your *.swift* files
after this process is complete.


#### Playing a *.csd* File

The first thing we will do so that we can play a *.csd* file is add our
*.csd* file to our project. In this case, we will add a simple *.csd* (in
this case named *test.csd*) that plays a sine tone with a frequency of
440Hz for ten seconds. Sample Csound code for this is:

~~~Csound
    <CsoundSynthesizer>
    <CsOptions>
    -odac
    </CsOptions>
    <CsInstruments>

    sr = 44100
    ksmps = 128
    nchnls = 2
    0dbfs = 1

    instr 1
    asig poscil 0.5 , 440
    outs asig , asig
    endin

    </CsInstruments>
    <CsScore>
    i1 0 10
    </CsScore>
    </CsoundSynthesizer>
~~~

We will add this to our Xcode project by dragging and dropping it into
our project's main folder, making sure to select *Copy items if
needed* and to add it to our main target.

In order to play this *.csd* file, we must first create an instance of the
CsoundObj class. We can do this by creating a property of our class as
follows, in our .h file (for example, in ViewController.h):

~~~C
    //
    // ViewController.h
    // CsoundiOS_ExampleProject
    //

    #import <UIKit/UIKit.h>
    #import "CsoundObj.h"

    @interface ViewController : UIViewController

    @property CsoundObj *csound;

    @end
~~~

Once we've done this, we can move over to the corresponding `.m` file (in
this case, ViewController.m) and instantiate our Csound object. Here we
will do this in our *viewDidLoad* method, that is called when our
ViewController's view loads.

~~~C
    //
    // ViewController.m
    // CsoundiOS_ExampleProject
    //

    @interface ViewController()
    @end
    @implementation ViewController

    - (void)viewDidLoad {
        [super viewDidLoad];
        // Allocate memory for and initialize a CsoundObj
        self.csound = [[CsoundObj alloc] init];
    }
~~~

Note: in order to play our *.csd* file, we must first get a path to it
that we can give Csound. Because part of this path can vary depending on
certain factors (for example, the user's native language setting), we
cannot pass a static or "hard-coded" path. Instead, we will access the
file using the NSBundle class (or 'Bundle' in Swift).

The *.csd* file is copied as a resource (you can see this under the *Build
Phases* tab in your target's settings), and so we will access it and
tell Csound to play it as follows:


~~~C
    - (void)viewDidLoad {
        [super viewDidLoad];
        self.csound = [[CsoundObj alloc] init];
        //CsoundObj *csound is declared as a property in .h
        NSString *pathToCsd = [[NSBundle mainBundle] pathForResource: @"test" ofType:@ "csd"];
        [self.csound play:pathToCsd];
    }
~~~

Note that in Swift, this is a little easier and we can simply use:

~~~Swift
    import UIKit
    class ViewController: UIViewController {
        var csound = CsoundObj()

        override func viewDidLoad() {
            super.viewDidLoad()
            let pathToCsd = Bundle.main.path(forResource: "test", ofType: "csd")
            self.csound.play(pathToCsd)
        }
    }
~~~

With this, the test.csd file should load and play, and we should hear a
ten-second long sine tone shortly after the application runs (i.e. when
the main ViewController's main view loads).


### Recording and Rendering

#### Recording (Real-Time)

To record the output of Csound in real-time, instead of the play method,
use:

~~~C
    // Objective-C
    NSURL *docsDirURL = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSURL *file = [docsDirURL URLByAppendingPathComponent:@"outputFile.aif"];
    NSString *csdPath = [[NSBundle mainBundle] pathForResource:@"csdToRecord" ofType:@"csd"];
    [self.csound record:csdPath toURL:file];
~~~

~~~Swift
    // Swift
    let docsDirURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    let file = docsDirURL.appendingPathComponent("outFile.aif")
    let csdPath = Bundle.main.path(forResource: "csdFile", ofType: "csd")
    csound.record(csdPath, to: file)
~~~

Alternatively, the `recordToURL` method can be used while Csound is
already running to begin recording:

~~~C
    // Objective-C
    NSURL *docsDirURL = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSURL *file = [docsDirURL URLByAppendingPathComponent:@"outputFile.aif"];
    [self.csound recordToURL:file];
~~~

~~~Swift
    // Swift
    let docsDirURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    let file = docsDirURL.appendingPathComponent("outFile.aif")
    csound.record(to: file)
~~~

Note: the `stopRecording` method is used to stop recording without also
stopping Csound's real-time rendering.


#### Rendering (Offline)

You can also render a *.csd* to an audio file offline. To render Csound
offline to disk, use the record:toFile: method, which takes a path
rather than a URL as its second argument. For example:

~~~C
    // Objective-C
    NSString *docsDir = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
    NSString *file = [docsDir stringByAppendingPathComponent:@"outFile.aif"];
    NSString *csdPath = [[NSBundle mainBundle] pathForResource:@"csdFile" ofType:@"csd"];
    [self record:csdPath toFile:file];
~~~

~~~Swift
    // Swift
    let docsDir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
    let file = docsDir.appending("/outFile.aif")
    let csdPath = Bundle.main.path(forResource: "csdFile", ofType: "csd")
    csound.record(csdPath, toFile: file)
~~~

These demonstrations above save the audio files in the app's documents
directory, which allows write access for file and subdirectory storage
on iOS. Note that the `-W` and `-A` flags behave as usual on iOS: they will
decide whether the file rendered is a WAV or an AIFF file. In the event
that neither is provided, the latter will be used as a default.


### The CsoundUI Class

The CsoundUI class provides for direct bindings between named Csound
channels and commonly used objects from the UIKit iOS framework. While
it is not necessary to use a CsoundUI object for this communication
between iOS and Csound, it can, in many cases, abstract the process of
setting up a UI object binding to a single line of code. To initialize a
CsoundUI object, we must give it a reference to our Csound object:

~~~C
    //Objective-C
    CsoundUI *csoundUI = [[CsoundUI alloc] initWithCsoundObj: self.csound];
~~~

~~~Swift
    // Swift
    var csoundUI = CsoundUI(csoundObj: csound)
~~~

Normally, however, these objects are declared as properties rather than
locally in methods. As mentioned, CsoundUI uses named channels for
communicating to and from Csound. Once set-up, values passed to these
named channels are normally accessed through the chnget opcode, for
example:

~~~Csound
    instr 1
    kfreq chnget "frequency"
    asig oscil 0.5 , kfreq
    outs asig , asig
    endin
~~~

Conversely, in order to pass values from Csound, the chnset opcode is
normally used with two arguments. The first is the variable, and it is
followed by the channel name:

~~~Csound
    instr 1
    krand randomi 300 , 2000 , 1 , 3
    asig poscil 0.5 , krand
    outs asig , asig
    chnset krand , "randFreq"
    endin
~~~

#### UIButton Binding

The UIButton binding is predominantly contained within the
CsoundButtonBinding class, which CsoundUI uses to create individual
button bindings. To add a button binding, use:

~~~C
    //Objective-C
    [self.csoundUI addButton:self.button forChannelName:"channelName"];
~~~

~~~Swift
    // Swift
    csoundUI.add(button, forChannelName: "channelName")
~~~

Where `self.button` is the button you would like to bind to, and the
string *channelName* contains the name of the channel referenced by
chnget in Csound.

The corresponding value in Csound will be equal to 1 while the button is
touched, and reset to 0 when it is released. A simple example of how
this might be used in Csound, based on the pvscross example by Joachim
Heintz, is shown below:

~~~Csound
    instr 1
    kpermut chnget "crossToggle "
    ain1 soundin "fox .wav"
    ain2 soundin "wave .wav"

    ;fft - analysis of file 1
    fftin1 pvsanal ain1 , 1024 , 256 , 1024 , 1
    ;fft - analysis of file 2
    fftin2 pvsanal ain2 , 1024 , 256 , 1024 , 1

    if kpermut == 1 then
    fcross pvscross fftin2 , fftin1 , .5 , .5
    else
    fcross pvscross fftin1 , fftin2 , .5 , .5
    endif

    aout pvsynth fcross
    out aout
    endin
~~~

#### UISwitch Binding

The UISwitch binding provides a connection between the UISwitch object
and a named channel in Csound. This binding is managed in the
CsoundSwitchBinding class and you can create a UISwitch binding by
using:

~~~C
    //Objective-C
    [self.csoundUI addSwitch:self.uiSwitch forChannelName:"channelName"];
~~~

~~~Swift
    // Swift
    csoundUI.add(switch, forChannelName: "channelName")
~~~

As in the case of the UIButton binding, the UISwitch binding provides an
on-off state value (1 or 0 respectively) to Csound. Below we use it to
turn on or off a simple note generator:

~~~Csound
    ; Triggering instrument
    instr 1
    kTrigFreq randomi gkTrigFreqMin , gkTrigFreqMax , 5
    ktrigger metro kTrigFreq
    kdur randomh .1 , 2 , 5
    konoff chnget " instrToggle "
    if konoff == 1 then
    schedkwhen ktrigger , 0 , 0 , 2 , 0 , kdur
    endif
    endin

    ; Sound generating instrument
    instr 2
    iamp random 0.03 ,0.5
    ipan random 0 , 1
    ipdx random 0 ,13
    ipch table ipdx , 2+i( gkscale )
    aenv expseg 1 , ( p3 ) , .001
    asig oscil iamp * aenv , cpspch(ipch) , 1
    outs asig * ipan , asig * (1 - ipan)
    endin
~~~

#### UILabel Binding

The UILabel binding allows you to display any value from Csound in a
UILabel object. This can often be a helpful way of providing feedback to
the user. You can add a label binding with:

~~~C
    //Objective-C
    [self.csoundUI addLabel:self.label forChannelName:"channelName"];
~~~

~~~Swift
    // Swift
    csoundUI.add(label, forChannelName: "channelName")
~~~

However, in this case the channel is an output channel. To demonstrate,
let us add an output channel in Csound to display the frequency of the
sound generating instrument's oscillator from the previous example (for
UISwitch):

~~~Csound
    ; Triggering instrument
    instr 1
    kTrigFreq randomi gkTrigFreqMin , gkTrigFreqMax , 5
    ktrigger metro kTrigFreq
    kdur randomh .1 , 2 , 5
    konoff chnget " instrToggle "
    if konoff == 1 then
    schedkwhen ktrigger , 0 , 0 , 2 , 0 , kdur
    endif
    endin

    ; Sound generating instrument
    instr 2
    iamp random 0.03 ,0.5
    ipan random 0 , 1
    ipdx random 0 ,13
    ipch table ipdx , 2+i( gkscale )
    aenv expseg 1 , ( p3 ) , .001
    asig oscil iamp * aenv , cpspch(ipch) , 1
    chnset cpspch(ipch) , " pitchOut "
    outs asig * ipan , asig * (1 - ipan)
    endin
~~~

Note additionally that the desired precision of the value display can be
set beforehand using the labelPrecision property of the CsoundUI object.
For example:

    self.csoundUI.labelPrecision = 4;


#### UISlider Binding

The UISlider binding is possibly the most commonly used UI binding - it
allows the value of a UISlider object to be passed to Csound whenever it
changes. This is set up in the CsoundSliderBinding class and we access
it via CsoundUI using:

~~~C
    // Objective-C
    [self.csoundUI addSlider:self.slider
    forChannelName:"channelName"];
~~~

~~~Swift
    // Swift
    csoundUI.add(slider, forChannelName: "channelName")
~~~

Note that this restricts you to using the slider's actual value, rather
than a rounded verion of it or some other variation, which would
normally be best suited to a manual value binding, which is addressed
later in this guide. An example is provided below of two simple such
UISlider-bound values in Csound:

~~~Csound
    sr = 44100
    ksmps = 128
    nchnls = 2
    0dbfs = 1

    instr 1
    kfreq chnget "frequency" ; input 0 - 1
    kfreq expcurve kfreq , 500 ; exponential distribution
    kfreq *= 19980 ; scale to range
    kfreq += 20 ;add offset
    kamp chnget " amplitude "
    kamp port kamp , .001 ; smooth values
    asig poscil kamp , kfreq
    outs asig , asig
    endin
~~~

Above we get around being restricted to the value of the UISlider by
creating an exponential distribution in Csound. Of course we could
simply make the minimum and maximum values of the UISlider 20 and 20000
respectively, but that would be a linear distribution by default. In
both cases here, the UISlider's range of floating point values is set to
be from 0 to 1.


#### Momentary Button Binding

The momentary button binding is similar to the normal UIButton binding
in that it uses a UIButton, however it differs in how it uses this
object. The UIButton binding passes a channel value of 1 for as long as
the UIButton is held, whereas the momentary button binding sets the
channel value to 1 for one Csound k-period (i.e. one k-rate sample). It
does this by setting an intermediate value to 1 when the button is
touched, passing this to Csound on the next k-cycle, and immediately
resetting it to 0 after passing it. This is all occurring predominantly
in the CsoundMomentaryButtonBinding class, which we access using:

~~~C
    // Objective-C
    [self.csoundUI addMomentaryButton:self.triggerButton forChannelName:"channelName"];
~~~

~~~Swift
    // Swift
    csoundUI.addMomentaryButton(triggerButton, forChannelName: "channelName")
~~~

Here's a simple usage example:

~~~Csound
    ; Triggering instrument
    instr 1
    ktrigger chnget " noteTrigger "
    schedkwhen ktrigger , 0 , 0 , 2 , 0 , kdur
    endin

    ; Sound generating instrument
    instr 2
    iamp random 0.03 ,0.5
    ipan random 0 , 1
    ipdx random 0 ,13
    ipch table ipdx , 2+i( gkscale )
    aenv expseg 1 , ( p3 ) , .001
    asig oscil iamp * aenv , cpspch(ipch) , 1
    chnset cpspch(ipch) , " pitchOut "
    outs asig * ipan , asig * (1 - ipan)
    endin
~~~

This replaces the automatic instrument triggering with a manual trigger.
Every time the UIButton is touched, a note (by way of an instance of
instr 2) will be triggered. This may seem like a more esoteric binding,
but there are a variety of potential uses.


### The CsoundMotion Class

The CsoundMotion class and its associated bindings allow information to
be passed from a device's motion sensors, via the CoreMotion framework,
to Csound. As with CsoundUI, it is possible to pass this data indirectly
by writing code to mediate between CoreMotion and Csound, but
CsoundMotion simplifies and greatly abstracts this process. Subsection
4.4 shows an example of how these values are accessed and might be used
in Csound. Note that with CsoundMotion, you do not assign channel names:
they are pre-assigned by the relevant objects (e.g. "AccelerometerX").

To declare and initialize a CsoundMotion object, use:

~~~C
    // Objective-C
    CsoundMotion *csoundMotion = [[CsoundMotion alloc] initWithCsoundObj:self.csound];
~~~

~~~Swift
    // Swift
    var csoundMotion = CsoundMotion(csoundObj: csound)
~~~

As with CsoundUI, it may often be advantageous to declare the
CsoundMotion object as a property rather than locally.



#### Accelerometer Binding

The acclerometer binding, implemented in the CsoundAccelerometerBinding
class and enabled through the CsoundMotion class, allows access to an
iOS device's accelerometer data along its three axes (X, Y, Z). The
accelerometer is a device that measures acceleration, aiding in several
basic interactions. To enable it, use:

~~~C
    // Objective-C
    [csoundMotion enableAccelerometer];
~~~

~~~Swift
    // Swift
    csoundMotion.enableAccelerometer()
~~~

#### Gyroscope Binding

The gyroscope binding, implemented in the CsoundGyroscopeBinding class
and enabled through the CsoundMotion class, allows access to an iOS
device's gyroscope data along its three axes (X, Y, Z). The
accelerometer is a device that allows rotational velocity to be
determined, and together with the accelerometer forms a system with six
degrees of freedom. To enable it, use:

~~~C
    // Objective-C
    [csoundMotion enableGyroscope];
~~~

~~~Swift
    // Swift
    csoundMotion.enableGyroscope()
~~~

#### Attitude Binding

Finally, the attitude binding, implemented in CsoundAttitudeBinding and
enabled through CsoundMotion, allows access to an iOS device's *attitude
data*. As the Apple reference notes, *attitude* refers to the
orientation of a body relative to a given frame of reference.
CsoundMotion enables this as three Euler angle valies: *roll*, *pitch*,
and *yaw* (rotation around X, Y, and Z respectively). To enable the
attitude binding, use:

~~~C
    // Objective-C
    [csoundMotion enableAttitude];
~~~

~~~Swift
    // Swift
    csoundMotion.enableAttitude()
~~~

Together, these bindings enable control of Csound parameters with device
motion in ways that are very simple and straightforward. In the
following subsection, an example demonstrating each of the pre-set
channel names as well as how some of this information might be used is
provided.


#### Motion Csound Example

Here is an example of a Csound instrument that accesses all of the data,
and demonstrates uses for some of it. This example is taken from the
[Csound for iOS Examples](https://github.com/csound/csound/tree/develop/iOS)
 project.

~~~Csound
    instr 1
    kaccelX chnget " accelerometerX "
    kaccelY chnget " accelerometerY "
    kaccelZ chnget " accelerometerZ "

    kgyroX chnget " gyroX "
    kgyroY chnget " gyroY "
    kgyroZ chnget " gyroZ "

    kattRoll chnget " attitudeRoll "
    kattPitch chnget " attitudePitch "
    kattYaw chnget " attitudeYaw "

    kcutoff = 5000 + (4000 * kattYaw )
    kresonance = .3 + (.3 * kattRoll )
    kpch = 880 + ( kaccelX * 220)
    a1 vco2 ( kattPitch + .5) * .2 , kpch
    a1 moogladder a1 , kcutoff , kresonance
    aL , aR reverbsc a1 , a1 , .72 , 5000
    outs aL , aR
    endin
~~~

Each of the channel names is shown here, and each corresponds to what is
automatically set in the relevant binding. A little experimenting can be
very helpful in determining what to use these values for in your
particular application, and of course one is never under any obligation
to use all of them. Regardless, they can be helpful and very
straightforward ways to add now-familiar interactions.


### The *CsoundBinding* Protocol

The *CsoundBinding* protocol allows you to read values from and write
values to Csound using named channels that can be referenced in your
*.csd* file using opcodes like chnget and chnset, as described in the
earlier section on CsoundUI. The protocol definition from CsoundObj is:

~~~C
    @protocol CsoundBinding <NSObject>
    - (void)setup:(CsoundObj*)csoundObj;
    @optional
    - (void)cleanup;
    - (void)updateValuesFromCsound;
    - (void)updateValuesToCsound;
    @end
~~~

In order to add a binding object to Csound, use CsoundObj's addBinding
method:

~~~C
    // Objective-C
    [self.csound addBinding:self];
~~~

~~~Swift
    // Swift
    csound.addBinding(self)
~~~

Note that you will need to conform to the CsoundBinding protocol, and
implement. at minimum, the required setup method. The CsoundBinding
setup method will be called on every object added as a binding, and the
remaining methods, marked with the \@optional directive will be called
on any bindings that implement them.


#### Channels and Channel Types

Named channels allow us to pass data to and from Csound while it is
running. These channels refer to memory locations that we can write to
and Csound can read from, and vice-versa. The two most common channel
types are: `CSOUND_CONTROL_CHANNEL` refers to a floating point control
channel, normally associated with a k-rate variable in
Csound. `CSOUND_AUDIO_CHANNEL` refers to an array of floating point
audio samples of length *ksmps*.

Each of these can be an input or output channel depending on whether
values are being passed to or from Csound.

Given below is an example of using named channels in a simplified Csound
instrument. The polymorphic *chnget* and *chnset* opcodes are used, and the
context here implies that kverb received its value from an input control
channel named *verbMix*, and that *asig* outputs to an audio channel
named *samples*.

~~~Csound
    giSqr ftgen 2, 0, 8192, 10, 1,0,.33,0,.2,0,.14,0,.11,0,.09

    instr 1
    kfreq = p4
    kverb chnget " verbMix "
    aosc poscil .5 , kfreq , 2
    arvb reverb aosc , 1.5
    asig = (aosc * (1 - kverb) ) + (arvb * kverb)
    chnset asig , " samples "
    outs asig , asig
    endin
~~~

The section that follows will describe how to set up and pass values to
and from this instrument's channels in an iOS application.


#### The *Setup* Method

The *setup* method is called before Csound's first performance pass, and
this is typically where channel references are created. For example:

~~~C
    // Objective-C
    // verbPtr and samplesPtr are instance variables of type float*

    -(void)setup:(CsoundObj *)csoundObj {
        verbPtr = [csoundObj getInputChannelPtr:@"verbMix" channelType:CSOUND_CONTROL_CHANNEL];
        samplesPtr = [csoundObj getOutputChannelPtr:@"samples" channelType:CSOUND_AUDIO_CHANNEL];
    }
~~~

~~~Swift
    // Swift
    var verbPtr: UnsafeMutablePointer<Float>?
    var samplesPtr: UnsafeMutablePointer<Float>?

    func setup(_ csoundObj: CsoundObj) {
        verbPtr = csoundObj.getInputChannelPtr("verbMix", channelType: CSOUND_CONTROL_CHANNEL)
        samplesPtr = csoundObj.getOutputChannelPtr("samples", channelType: CSOUND_AUDIO_CHANNEL)
    }
~~~

The *cleanup* method from CsoundBinding, also optional, is intended for
use in removing bindings once they are no longer active. This can be
done using CsoundObj's removeBinding method:

~~~C
    // Objective-C
    // verbPtr and samplesPtr are instance variables of type float*
    -(void)cleanup {
        [self.csound removeBinding:self];
    }
~~~

~~~Swift
    // Swift
    func cleanup() {
        csound.removeBinding(self)
    }
~~~

#### Communicating Values To and From Csound

Communicating values to Csound is normally handled in the
`updateValuesToCsound` method. This method is called once per performance
pass (i.e. at the k-rate). For example:

~~~C
    // Objective-C
    -(void)updateValuesToCsound {
        *verbPtr = self.verbSlider.value;
    }
~~~

~~~Swift
    // Swift
    func updateValuesToCsound() {
        verbPtr?.pointee = verbSlider.value
    }
~~~

This updates the value at a memory location that Csound has already
associated with a named channel (in the setup method). This process has
essentially replicated the functionality of the CsoundUI API's slider
binding. The advantage here is that we could perform any transformation
on the slider value, or associate another value (that might not be
associated with a UI object) with the channel altogether. To pass values
back from Csound, we use the updateValuesFromCsound method.

~~~C
    // Objective-C
    -(void)updateValuesFromCsound {
        float *samps = samplesPtr;
    }
~~~

Note that in Swift, we have do a little extra work in order to get an
array of samples that we can easily index into:

~~~Swift
    // Swift
    func updateValuesFromCsound() {
        let samps = samplesPtr?.pointee
        let sampsArray = [Float](UnsafeBufferPointer(start: audioPtr,
        count: Int(csound.getKsmps())))
    }
~~~

Note also that `updateValuesToCsound is called before
`updateValuesFromCsound` during each performance pass, with the Csound
engine performance call in between the two.


### The *CsoundObjListener* Protocol

The *CsoundObjListener* protocol allows objects in your program to be
notified when Csound begins running, and when it completes running. The
protocol definition from CsoundObj is:

~~~C
    @protocol CsoundObjListener <NSObject>
    @optional
    - (void)csoundObjStarted:(CsoundObj *)csoundObj;
    - (void)csoundObjCompleted:(CsoundObj *)csoundObj;
    @end
~~~

Note that there are no methods that an object is required to adopt in
order to conform to this protocol. These methods simply allow an object
to elect to be notified when Csound either begins, completes running, or
both. Note that these methods are not called on the main thread, so any
UI work must be explicitly run on the main thread. For example:

~~~C
    // Objective-C
    -(void)viewDidLoad {
        [super viewDidLoad];
        [self.csound addListener:self];
    }
    - (void)csoundObjStarted:(CsoundObj *)csoundObj {
        [self.runningLabel performSelectorOnMainThread:@selector(setText:) withObject:@"Csound Running" waitUntilDone:NO];
    }
~~~

~~~Swift
    // Swift
    override func viewDidLoad() {
        super.viewDidLoad()
        csound.add(self)
    }
    func csoundObjCompleted(_ csoundObj: CsoundObj) {
        DispatchQueue.main.async { [unowned self] in
            self.runningLabel.text = "Csound Stopped"
        }
    }
~~~

### Console Output

Console output from Csound is handled via a callback. You can set the
method that handles console info using CsoundObj's
setMessageCallbackSelector method, and passing in an appropriate
selector, for instance:

~~~C
    // Objective-C
    [self.csound setMessageCallbackSelector:@selector(printMessage:)];
~~~

~~~Swift
    // Swift
    csound.setMessageCallbackSelector(#selector(printMessage(_:)))
~~~

An object of type NSValue will be passed in. This object is acting as a
wrapper for a C struct of type Message. The definition for Message in
*CsoundObj.h* is:

~~~C
    typedef struct {
        CSOUND *cs;
        int attr;
        const char *format;
        va_list valist;
    } Message;
~~~

The two fields of interest to us for the purposes of console output are
format and valist. The former is a format string, and the latter
represents a list of arguments to match its format specifiers.

The process demonstrated in the code examples below can be described as:

1.  Declare an instance of a Message struct.
2.  Unwrap the NSValue to store its contained Message value at the
    address of this instance.
3.  Declare an empty C string, to act as a buffer.
4.  Use the vsnprintf function to populate the buffer with the formatted
    output string.
5.  Wrap this C string in an Objective-C NSString or Swift String.

~~~C
    // Objective-C
    - (void)printMessage:(NSValue *)infoObj
        Message info;
        [infoObj getValue:&info];
        char message[1024];
        vsnprintf(message, 1024, info.format, info.valist);
        NSString *messageStr = [NSString stringWithFormat:@"%s", message];
        NSLog(@"%@", messageStr);
    }
~~~

Note that in Swift, we have to create a `CVaListPointer` (equivalent to a
`va_list *` in C) for use with the `vsnprintf()` function:

~~~Swift
    // Swift
    func messageCallback(_ infoObj: NSValue) {
        var info = Message()
        infoObj.getValue(&info)
        let message = UnsafeMutablePointer<Int8>.allocate(capacity: 1024)
        let va_ptr: CVaListPointer = CVaListPointer(_fromUnsafeMutablePointer: &(info.valist))
        vsnprintf(message, 1024, info.format, va_ptr)
        let messageStr = String(cString: message)
        print(messageStr)
    }
~~~

In both cases above, we are printing the resulting string objects to
Xcode's console. This can be very useful for finding and addressing
issues that have to do with Csound or with a *.csd* file you might be
using.

We could also pass the resulting string object around in our program;
for example, we could insert the contents of this string object into a
UITextView for a simulated Csound console output.


### Csound-iOS and MIDI

The Csound iOS API provides two possible ways of passing MIDI
information to Csound. CsoundObj can receive MIDI events from CoreMIDI
directly. By default, this functionality is disabled, but setting
CsoundObj's midiInEnabled property to true (or *YES* on Objective-C)
enables it. This must, however be done before Csound is run.

Note that you must also set the appropriate command-line flag in your
csd, under CsOptions. For example, `-M0`. Additionally, the MIDI device
must be connected before the application is started.


#### MidiWidgetsManager

The second way that is provided to communicate MIDI information to
Csound is indirect, via the use of UI widgets and CsoundUI. In this
case, the MidiWidgetsManager uses a MidiWidgetsWrapper to connect a MIDI
CC to a UI object, and then CsoundUI can be used to connect this UI
object's value to a named channel in Csound. For instance:

~~~C
    // Objective-C
    MidiWidgetsManager *widgetsManager = [[MidiWidgetsManager alloc] init];
    [widgetsManager addSlider:self.cutoffSlider forControllerNumber:5];
    [csoundUI addSlider:self.cutoffSlider forChannelName:@"cutoff"];
    [widgetsManager openMidiIn];
~~~

~~~Swift
    // Swift
    let widgetsManager = MidiWidgetsManager()
    widgetsManager.add(cutoffSlider, forControllerNumber: 5)
    csoundUI?.add(cutoffSlider, forChannelName: "cutoff")
    widgetsManager.openMidiIn()
~~~

An advantage of this variant is that MIDI connections to the UI widgets
are active even when Csound is not running, so visual feedback can still
be provided, for example. At the time of writing, support is only
built-in for UISliders.


### Other Functionality

This section describes a few methods of CsoundObj that are potentially
helpful for more complex applications.


#### *getCsound*

    (CSOUND *)getCsound;

The `getCsound` method returns a pointer to a struct of type CSOUND, the
underlying Csound instance in the C API that the iOS API wraps. Because
the iOS API only wraps the most commonly needed functionality from the
Csound C API, this method can be helpful for accessing it directly
without needing to modify the Csound iOS API to do so.

Note that this returns an opaque pointer because the declaration of this
struct type is not directly accessible. This should, however, still
allow you to pass it into Csound C API functions in either Objective-C
or Swift if you would like to access them.


#### *getAudioUnit*

    (AudioUnit *)getAudioUnit;

The `getAudioUnit` method returns a pointer to a CsoundObj instance's I/O
AudioUnit, which provides audio input and output to Csound from iOS.

This can have several potential purposes. As a simple example, you can
use the AudioOutputUnitStop() function with the returned value's pointee
to pause rendering, and AudioOutputUnitStart() to resume.


#### *updateOrchestra*

    (void)updateOrchestra:(NSString *)orchestraString;

The `updateOrchestra` method allows you to supply a new Csound orchestra
as a string.


#### Other

Additionally, `getKsmps` returns the current *ksmps* value, and
`getNumChannels` returns the number of audio channels in use by the
current Csound instance. These both act directly as wrappers to Csound C
API functions.


II. How to Fully Integrate Csound into Apple&#39;s iOS CoreAudio
----------------------------------------------------------------

In the second part of this chapter we will study some strategies for a better integration of Csound with CoreAudio, in order to aid the development of iOS applications. There are some important issues to be considered for a professional audio application, such as the native Inter-App Audio routing, buffer frame etc. We will examine in detail the relevant code (Csound and Objective-C) taken from few audio apps based on Csound. We will learn how to manage the buffer frame and sampling rate; how to draw a Waveform in CoreGraphics from a Csound GEN Routine; how to write a Csound GEN table and much more.

### Getting Started

The development of professional audio applications involves to consider some important aspects of iOS in order to maximize the compatibility and versatility of the app.

The approach should focus on these five important points:

1. Implement Background Audio
2. Switch on/off your Audio Engine
3. Implement Core MIDI
4. Do not waste System Resources
5. Set up the Sampling Rate and Buffer Frame according to applications running in the system.

The code for the User Interface (UI) is written in Objective-C, whilst the Csound API (i.e. Application Programming Interface) is written in C. This duality allows us to understand in detail the interaction between both. As we will see in the next section, the control unit is based on the *callback* mechanism rather than the *pull* mechanism.

No Objective-C code was deliberately written in the C audio *callback*, since it is not recommended as well it is not recommended to allocate/de-allocate memory.

Since often we will refer to the tutorials (*xCode* projects), it would be useful to have on hand the *xCode* environment. These files can be downloaded 
[here](https://bitbucket.org/alessandropetrolati/tutorials/src/master/).

### Setup for an Audio App

In the first *xCode* project (*01\_csSetup*) we configure a Single View Application to work with audio and *Csound*. The project dependencies are the only **libcsound.a** and **libsndfile.a** with the headers (.h) files and *CsoundMIDI.h* as well as *CsoundMIDI.m.*

The code of *initializeAudio* function will enable the input/output audio:

    -(void)initializeAudio {
        
        /* Audio Session handler */
        AVAudioSession* session = [AVAudioSession sharedInstance];
        
        NSError* error = nil;
        BOOL success = NO;
        
        success = [session setCategory:AVAudioSessionCategoryPlayAndRecord
                           withOptions: (AVAudioSessionCategoryOptionMixWithOthers |
                                            AVAudioSessionCategoryOptionDefaultToSpeaker)
                                 error:&error];
        
        success = [session setActive:YES error:&error];
        
        
        /* Sets Interruption Listner */
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                    selector:@selector(InterruptionListener:)
                                                        name:AVAudioSessionInterruptionNotification
                                                   object:session];
        
        AudioComponentDescription defaultOutputDescription;
        defaultOutputDescription.componentType = kAudioUnitType_Output;
        defaultOutputDescription.componentSubType = kAudioUnitSubType_RemoteIO;
        defaultOutputDescription.componentManufacturer =    kAudioUnitManufacturer_Apple;
        defaultOutputDescription.componentFlags = 0;
        defaultOutputDescription.componentFlagsMask = 0;
        
        // Get the default playback output unit
        AudioComponent HALOutput = AudioComponentFindNext(NULL, &defaultOutputDescription);
        NSAssert(HALOutput, @"Can't find default output");
        
        // Create a new unit based on this that we will use for output
        err = AudioComponentInstanceNew(HALOutput, &csAUHAL);
        
        // Enable IO for recording
        UInt32 flag = 1;
        err = AudioUnitSetProperty(csAUHAL,
                                   kAudioOutputUnitProperty_EnableIO,
                                   kAudioUnitScope_Input,
                                   1,
                                   &flag,
                                   sizeof(flag));
        // Enable IO for playback
        err = AudioUnitSetProperty(csAUHAL,
                                   kAudioOutputUnitProperty_EnableIO,
                                   kAudioUnitScope_Output,
                                   0,
                                   &flag,
                                   sizeof(flag));
        
        err = AudioUnitInitialize(csAUHAL);
        
        
        /* AUDIOBUS and IAA  */
        [self initializeAB_IAA];
    }
 

This code is common to many audio applications, easily available online or from the Apple documentation.
Basically, we setup the app as *PlayAndRecord* category, then we create the AudioUnit. The *PlayAndRecord* category allows receiving audio from the system and simultaneously produce audio.

**IMPORTANT:**

For proper operation with Audiobus (AB) and Inter-App Audio (IAA), we must instantiate and initialize one Audio Unit (AU), once for the entire life cycle of the app. To destroy and recreate the AU would involve to require more memory (for each instance). If the app is connected to IAA or AB it will stop responding and we will experience unpredictable behavior, which may lead to an unexpected crash.

Actually there is no way to tell at runtime AB and / or IAA that the AU address has changed. The *InitializeAudio* function should be called only once, unlike the functions run/stop of *Csound*.

These aspects will be more clarified in the following paragraphs.

### Initialize Csound and Communicate with it

The ***AudioDSP.m*** class implements the entire audio structure and manages the user interface interaction with Csound. *AudioDSP* is a subclass of *NSObject* that is instantiated on the ***Main.storyboard***. A reference to this class on the storyboard greatly facilitates connections between the GUI (*IBOutlet* and *IBAction*) and the DSP i.e. Csound.

As we will see in the next section, all links are established graphically with the *Interface Builder*.

The main CSOUND structure is allocated in the *AudioDSP* constructor and initializes the audio system. This approach foresees that the \_cs (CSOUND\*) class variable persists for the entire life cycle of the app. As mentioned, the *initializeAudio* function should be called only once.

    - (instancetype)init {
        self = [super init];
        if (self) {
    
            // Creates an instance of Csound
            _cs = csoundCreate(NULL);
    
            // Setup CoreAudio
            [self initializeAudio];
        }
        return self;
    }


Since we have the CSOUND structure allocated and the CoreAudio properly configured, we can manage Csound asynchronously.

The main purpose of this simple example is to study how the user interface (UI) interacts with Csound. All connections have been established and managed graphically through the Interface Builder.

The UISwitch object is connected with the toggleOnOff, which has the task to toggle on/off Csound in this way:


    -(IBAction)toggleOnOff:(id)component {
        
        UISwitch* uiswitch = (UISwitch*)component;
       
        if(uiswitch.on) {
            
            NSString *tempFile = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"csd"];
           
            [self stopCsound];
            [self startCsound:tempFile];
            
        } else {
            [self stopCsound];
        }
    }


In the example the *test.csd* is performed which implements a simple sinusoidal oscillator. The frequency of the oscillator is controlled by the *UISlider* object. This is linked with the *sliderAction* callback.

As anticipated, the mechanism adopted is driven by events (callback). This means that the function associated with the event is called only when the user performs an action on the UI slider.

In this case the action is of type *Value Changed*. The Apple documentation concerning the UIControl framework should be consulted, for further clarification in this regard.


    -(IBAction)sliderAction:(id)sender {
         
       UISlider* sld = sender;
    
    	if (!_cs || !running)  return;
            
    	NSString* channelName = @"freq";
    	float *value;
    	csoundGetChannelPtr(_cs, &value, [channelName cStringUsingEncoding:NSASCIIStringEncoding],
                            CSOUND_CONTROL_CHANNEL | CSOUND_INPUT_CHANNEL);
            
    	*value = (float) sld.value;
    
    }


As we can see, we get the pointer through *csoundGetChannelPtr*, this is relative to incoming control signals. From the point of view of Csound, the signals in the input (CSOUND\_INPUT\_CHANNEL) are sampled from the software bus via *chnget*, while in the output (CSOUND\_OUTPUT\_CHANNEL) *chnset* is used.

The allocation is done by dereferencing the pointer in this way:

	*value = (float) sld.value;

or

	value[0] = (float) sld.value;


The *channelName* string *freq* is the reference text used by the *chnget* opcode in the *instr 1* of the Csound Orchestra.

	kfr chnget "freq" 

Since the control architecture is based on the callback mechanism and therefore depends on the user actions, we must send all values when Csound starts. We can use Csound's delegate:

    -(void)csoundObjDidStart {
    
       [_freq sendActionsForControlEvents:UIControlEventAllEvents];
    }

This operation must be repeated for all UI widgets in practice. Immediately after Csound is running we send an *UIControlEventAllEvents* message to all widgets. So we are sure that Csound receives properly the current state of the UI's widgets values.

In this case *\_freq* is the reference (IBOutlet) of the UISlider in the ***Main.storyboard***.


### Enabling Audiobus and Inter-App Audio

The last line of code in the *initializeAudio* function calls the *initializeAB\_IAA* for initialize and configure the Inter-App Audio and Audiobus.

The *XCode* tutorials do not includes the Audiobus SDK since it is covered by license, see the website for more information and to consult the official documentation [here](http://audiob.us).

However, the existing code to Audiobus should ensure proper functioning after the inclusion of the library.

In the file *AudioDSP.h* there are two macros: *AB* and *IAA*. These are used to include or exclude the needed code. The first step is to configure the two *AudioComponentDescriptions* for the types:
*kAudioUnitType\_RemoteInstrument* and *kAudioUnitType\_RemoteEffect*.

    /* Create Sender and Filter ports */
    AudioComponentDescription desc_instr = {
	    kAudioUnitType_RemoteInstrument,
	    'icso',
	    'iyou', 0, 0 
    };
    
    AudioComponentDescription desc_fx = {
	    kAudioUnitType_RemoteEffect,
	    'xcso',
	    'xyou', 0, 0 
    };

This point is crucial because you have to enter the same information in the file *Info.plist*-

![](../resources/images/12-d-plist.png)

In the *Info.plist* (i.e. Information Property List), the *Bundle display name* key and *Require background modes* must absolutely be defined to enable the audio in the background.

The app must continue to play audio even when it is not in the foreground. Here we configure the *Audio Components* (i.e. AU).


    typedef struct AudioComponentDescription {
        OSType              componentType;
        OSType              componentSubType;
        OSType              componentManufacturer;
        UInt32              componentFlags;
        UInt32              componentFlagsMask;
    } AudioComponentDescription;


As said, the *AudioComponentDescription* structure used for the configuration of the AU, must necessarily coincide in the *Info.plist*,

The structure fields (*OSType*) are of *FourCharCode*, so they must consist of four characters.

IMPORTANT: it is recommended to use different names for both *componentSubType* and *componentManufacturer* of each *AudioComponent*. In the example the character &#39;i&#39; and &#39;x&#39; refer to *Instrument* and *Fx*.

Only for the first field (componentType) of the AudioComponentDescription structure we can use the enumerator

    enum {
        kAudioUnitType_RemoteEffect         = 'aurx',
        kAudioUnitType_RemoteGenerator      = 'aurg',
        kAudioUnitType_RemoteInstrument     = 'auri',
        kAudioUnitType_RemoteMusicEffect    = 'aurm'
    };

where *auri* identifies the Instrument (Instr) and *aurx* the effect (Fx), at which point the app will appear on the lists of the various *IAA Host* as Instr and Fx and in Audiobus as Sender or Receiver.

At this point we are able to:

1. Perform Audio in the background
2. Get IAA and AB support for input/output
3. Toggle DSP (Csound) on and off
4. Control Csound through the *callback* mechanism
5. Record the output audio

In the following sections we will see how to manage the advanced settings for Csound's *ksmps*, according to the system BufferFrame.

### Buffer Frame vs ksmps

In IOS, the first audio app which is running (in foreground or in background), imposes its own Sampling Rate and BuffeFrame to the whole iOS (i.e. for all audio apps).

IOS allows power-of-two ​​BufferFrame values in the range 64, 128, 256, 512, 1024, etc ...

It is not recommended to use values ​​bigger than 1024 or smaller than 64. A good compromise is 256, as suggests the default value of *GarageBand* and Other similar applications.

In the Csound language, the BufferFrame is expressed as *ksmps*. So it is necessary to manage appropriately the values of BufferFrame and *ksmps*.

There are three main possible solutions:

1. Keep the *ksmps* static with a very low value, such as 32 or 64
2. Dynamically manage the *ksmps* depending on BufferFrame
3. Implement a mechanism for release of the two values

All three cases have advantages and disadvantages, in the first case the BufferFrame must be always >= *ksmps*, as the second must implement a spartan workaround for synchronize the *ksmps* with the BuffrFrame.

The third and more complex case, requires a control at run-time on the audio *callback* and we must manage an accumulation buffer. Thanks to this, the BufferFrame may be bigger than *ksmps* or vice versa. However there are some limitations. In fact, this approach does not always lead to the benefits hoped for in terms of performance.

### Static ksmps

An example of the first case just listed, is in the Orchestras of *Csound for iOS*. The *ksmps* is deliberately 64 and can not be changed.

As mentioned, the BufferFrame of iOS is always greater or equal than 64. The operation is assured thanks to the &#39;for&#39; statement in the *Csound\_Render:*

~~~
OSStatus  Csound_Render(void *inRefCon,
                         AudioUnitRenderActionFlags *ioActionFlags,
                         const AudioTimeStamp *inTimeStamp,
                         UInt32 dump,
                         UInt32 inNumberFrames,
                         AudioBufferList *ioData
                         )
{


    //…
	/* inNumberFrames => ksmps */
	for(int i = 0; i < (int)slices; ++i){
		ret = csoundPerformKsmps(cs);
	}
    //…
}
~~~

This &#39;C&#39; routine is called from the CoreAudio every *inNumberFrames* (i.e. BufferFrame).

The *ioData* pointer contains *inNumberFrames* of audio samples incoming from the input (mic/line),*Csound* read this data and it returns *ksmps* processed samples.

When the *inNumberFrames* and *ksmps* are identical, we can simply copy out the processed buffer, this is done by calling the csoundPerformKsmps() procedure.Since that *ksmps* is less or equal to *inNumberFrames*, we need to call *N slices* the *csoundPerformKsmps()*.

As said, the strong point of this mechanism is that *ksmps* is never greaterthan *inNumberFrames*.

Example:

~~~
ksmps = 64
inNumberFrames = 512

slices is calculated as follows:

int slices = inNumberFrames / csoundGetKsmps(cs);

slices is 8
~~~

In other words, every *Csound\_Render* call involves eight sub-calls to *csoundPerformKsmps()*, for every sub-call we fill the *ioData* with *ksmps* samples.

### Dynamic ksmps, Buffer Frame and Sampling Rate Synchronization

The *ksmps* value should be chosen according to the&#39;Csound Orchestra&#39; operating logic, for the Orchestras particularly heavy in terms of control (operations on variables k), which howeverdo not require low-latency, we can use higher values as 512 or 1024.

Increasing the *ksmps* we spare considerably the overhead of function calls (*k* functions) and it reduces the CPU load, this makes it possible to run orchestras complex even on first generation devices.

The second case in question was adopted for apps developed so far, in fact, except in cases specific, it is always convenient to set the *ksmps* with the same value of BufferFrame system.

If necessary, we should inform the user (for example, with a text message) whether the application works with values not suited.

Since the *ksmps* cannot be changed during the *Csound*performance, it is necessary a workaround to change it at the textual level, directly on the file Orchestra this value.

The following steps are required:

1. Stop and Cleaning *Csound* Object
2. Replace the Orchestra (.csd) Code with new *sr* and *ksmps*
3. Initialize and Run *Csound* Object with new modifyed Orchestra

This is a crass workaround but it works properly, we must enter a couple of placeholders in the Orchestra file.

~~~
<CsInstruments>
sr = 44100
ksmps = 512

;;;;SR;;;;		//strings replaced from Objective-C
;;;;KSMPS;;;;	

nchnls = 2
0dbfs = 1

…
~~~

The two univocal strings are the placeholders for *sr* and *ksmps*. Please note they begin with the semicolon character since *Csound* recognizes it as a comment.

The following function Objective-C, looks for the placeholders in the *myOrchestra.csd* and replaces them with new sr and *ksmps* values.

~~~
-(void)csoundApplySrAndKsmpsSettings:(Float64)sr withBuffer:(Float64)ksmps {

   NSString *pathAndName = [[[NSBundle mainBundle] resourcePath] 	
	stringByAppendingString:@"/myOrchestra.csd"];
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:pathAndName])
    {
        NSString *myString = [[NSString alloc] initWithContentsOfFile:pathAndName 
			encoding:NSUTF8StringEncoding error:NULL];
        
        myString = [myString stringByReplacingOccurrencesOfString:@";;;;SR;;;;" 				withString:
			[NSString stringWithFormat:@"sr = %f”, sr]];

        myString = [myString stringByReplacingOccurrencesOfString:@";;;;KSMPS;;;;" 				withString:
			[NSString stringWithFormat:@"ksmps = %f”, ksmps]];
        
        NSString *pathAndNameRUN = [NSString stringWithFormat:@"%@dspRUN.csd", 					NSTemporaryDirectory()];
        
		NSError* error = nil;

       //save copy of dspRUN.csd in library directory
       [myString writeToFile:pathAndNameRUN
                   atomically:NO
                     encoding:NSUTF8StringEncoding
                        error:&error];
        
       //Run Csound
       [self startCsound:pathAndNameRUN];
   }
    else
        NSLog(@"file %@ Does Not Exists At Path!!!", pathAndName);
}
~~~

The NSString *pathAndName* contains the file path of *myOrchestra.csd* in the Resources folder. This path is used to copyin *myString* the entire file (as NSString). Subsequently the *stringByReplacingOccurrencesOfString* method, replaces the placeholders with the valid strings.

Example:

~~~
sr = 44100		//strings replaced from Objective-C
ksmps = 512
~~~

Since iOS does not allow to edit files in the application &quot;Resources&quot; folder (i.e. *pathAndName*), we need to save the modified version in the new file *dspRUN.csd* that is saved in the temporary folder (i.e. *pathAndNameRUN*), this is achieved through the *writeToFile* method.

As a final step it is necessary re-initialise *Csound* by calling the *runCsound* which sends it running with the appropriate values of *sr* and *ksmps.*

### Release ksmps from Buffer Frame

As seen the second case is a good compromise, however it is not suitable in some particular conditions. So far we have only considered the aspect in which the app works on the main audio thread, with a BufferFrame imposed by iOS. However, there are special cases in which the app is called to work on a different thread and with a different BufferFrame.

For instance the &#39;freeze track feature&#39; implemented by major &#39;Host IAA apps&#39; (such Cubasis, Auria etc ...) bypasses the current setup of iOS and imposes an arbitrary BufferFrame(usually 64).

Since *Csound* it is still configured with the iOS BufferFrame (main audio thread) but during the &#39;freeze track&#39; process the *Csound\_Perform* routine is called with a differentBufferFrame, *Csound* cannot work properly.

In order to solve this limitation we need a run-time control on the audio callback and handle the exception.
On the *Csound\_Render* we will evaluate the condition for which *slices* is \&lt;1

~~~
OSStatus  Csound_Perform(void *inRefCon,
                         AudioUnitRenderActionFlags *ioActionFlags,
                         const AudioTimeStamp *inTimeStamp,
                         UInt32 dump,
                         UInt32 inNumberFrames,
                         AudioBufferList *ioData
                         ) {
    
   
    //…

    /* CSOUND PERFORM */
    if (slices < 1.0) {
     /* inNumberFrames < ksmps */
        Csound_Perform_DOWNSAMP(inRefCon, 
			ioActionFlags, 
			inTimeStamp, 
			dump, 
			inNumberFrames, 
			ioData);
    }
    else {

		/* inNumberFrames => ksmps */
		for(int i = 0; i < (int)slices; ++i){
			ret = csoundPerformKsmps(cs);
	  }
   //…
}
~~~

Please note that *slices* is calculated as follows:

~~~
int slices = inNumberFrames / csoundGetKsmps(cs);
~~~

Every time the *ksmps* (for some reason) is greater than BufferFrame,we will perform the *Csound\_Perform\_DOWNSAMP* procedure.

~~~
//Called when inNumberFrames < ksmps
OSStatus  Csound_Perform_DOWNSAMP(void *inRefCon,
                                  AudioUnitRenderActionFlags *ioActionFlags,
                                  const AudioTimeStamp *inTimeStamp,
                                  UInt32 dump,
                                  UInt32 inNumberFrames,
                                  AudioBufferList *ioData
                                  )
{
    AudioDSP *cdata = (__bridge AudioDSP*) inRefCon;

    int ret = cdata->ret, nchnls = cdata->nchnls;
    CSOUND *cs = cdata->_cs;
    
    MYFLT *spin = csoundGetSpin(cs);
    MYFLT *spout = csoundGetSpout(cs);
    MYFLT *buffer;
    
    /* DOWNSAMPLING FACTOR */
    int UNSAMPLING = csoundGetKsmps(cs)/inNumberFrames;
    
    if (cdata->counter < UNSAMPLING-1) {
        
        cdata->counter++;
    }
    else {
        
        cdata->counter = 0;
        
        /* CSOUND PROCESS KSMPS */
        if(!cdata->ret) {
            /* PERFORM CSOUND */
            cdata->ret = csoundPerformKsmps(cs);
        } else {
            cdata->running = false;
            
        }
    }
    
    /* INCREMENTS DOWNSAMPLING COUNTER */
    int slice_downsamp = inNumberFrames * cdata->counter;
    
    /* COPY IN CSOUND SYSTEM SLICE INPUT */
    for (int k = 0; k < nchnls; ++k){
        buffer = (MYFLT *) ioData->mBuffers[k].mData;
        for(int j = 0; j < inNumberFrames; ++j){
            spin[(j+slice_downsamp)*nchnls+k] = buffer[j];
        }
    }
    
    /* COPY OUT CSOUND KSMPS SLICE */
    for (int k = 0; k < nchnls; ++k) {
        buffer = (MYFLT *) ioData->mBuffers[k].mData;
        for(int j = 0; j < inNumberFrames; ++j) {
            
            buffer[j] = (MYFLT) spout[(j+slice_downsamp)*nchnls+k];
        }
    }
    
    cdata->ret = ret;
    return  noErr;
}
~~~

As mentioned we need a buffer for the accumulation, however, it is not necessary to create a new one since you can directly use those of *Csound*, i.e. *spin* and *spout*.

First we have to evaluate what is the level of under-sampling through.

Example:

~~~
Csound ksmps = 512
iOS inNumberFrames = 64

/* DOWNSAMPLING FACTOR */
int UNSAMPLING = csoundGetKsmps(cs)/inNumberFrames;

UNSAMPLING is 8
~~~

This value represents the required steps to accumulate the input signal in spin for every call of csoundPerformKsmps().

~~~
if (cdata->counter < UNSAMPLING-1) {
        
	cdata->counter++;
}
else {
        
	cdata->counter = 0;
        
	/* CSOUND PROCESS KSMPS */
	if(!cdata->ret) {
		cdata->ret = csoundPerformKsmps(cs);
}
~~~

The *Csound\_Perform\_DOWNSAMP* routine is called by iOS every 64 samples, while we must call *csoundPerformKsmps()* after 512 samples, it means we need to skip eight times (i.e. UNSAMPLING) until we have collected the input buffer.

From another point of view, before calling *csoundPerformKsmps()* we must accumulate eight *inNumberFrames* in *spin*, and for every call of*Csound\_Perform\_DOWNSAMP* we must returns *inNumberFrames* from *spout*.

In the example, the iOS audio is in the *buffer* who is a pointer of the *ioData* structure.

~~~
/* INCREMENTS DOWNSAMPLING COUNTER */
int slice_downsamp = inNumberFrames * cdata->counter;
    
/* COPY IN CSOUND SYSTEM SLICE INPUT */
for (int k = 0; k < nchnls; ++k){
	buffer = (MYFLT *) ioData->mBuffers[k].mData;
	for(int j = 0; j < inNumberFrames; ++j){
		spin[(j+slice_downsamp)*nchnls+k] = buffer[j];
	}
}
    
/* COPY OUT CSOUND KSMPS SLICE */
for (int k = 0; k < nchnls; ++k) {
	buffer = (MYFLT *) ioData->mBuffers[k].mData;
	for(int j = 0; j < inNumberFrames; ++j) {
            
		buffer[j] = (MYFLT) spout[(j+slice_downsamp)*nchnls+k];
	}
}
~~~

Ignoring the implementation details regarding the de-interlacing of the audio, we can focus on the  ***slice\_downsamp*** which serves as offset-index for the arrays *spin* and *spout*.

The implementation of both second and third cases, guarantees that the app works properly in every situation.

### Plot a Waveform

In this section we will see a more complex example to access memory (*gen*) of *Csound* and display the contents on a UIView.

The *waveDrawView* class interacts with the waveLoopPointsView, the *loopoints* allow us to select a portion of the file via the zoom on the waveform (pinch in / out). These values (loopoints) are managed by Csound which ensures the correct reading of the file and returns the normalized value (i.e. 0 ÷ 1) of the instantaneous phase of reading.

The two classes are instantiated in ***Main.storyboard***, please note to the hierarchy that must be respected for the setup of other projects as well as the three *UIView* must have the same size (frame) and cannot be dynamically resized.

![](../resources/images/12-d-draw.png)

In the score of the file *csound\_waveform.csd* file are declared two *gen* (i.e. *gen* 1) to load in memory the WAV files:

~~~
f2 0 0 1 "TimeAgo.wav" 0 0 1
f3 0 0 1 "Density_Sample08.wav" 0 0 1
~~~

In order to access the audio files in the app Resources folder, we need to setup some environment variables for *Csound*, this is done in the *runCsound* function.

From the *Csound* manual:

*You can set environment variables on the command line by using the command line flag --env:NAME=VALUE or --env:NAME+=VALUE, where NAME is the environment variable name, and VALUE is its value.*

**SFDIR: Default directory for sound files. Used if no full path is given for sound files.**

**SADIR: Default directory for analysis files. Used if no full path is given for analysis files.**

This code sets both SFDIR and SADIR:

~~~
// Set's Environment Sound Files Dir
NSString *resourcesPath = [[NSBundle mainBundle] resourcePath];    
NSString* envFlag = @"--env:SFDIR+=";

char* SFDIR = (char*)[[envFlag stringByAppendingString:resourcesPath] cStringUsingEncoding:NSASCIIStringEncoding];

envFlag = @"--env:SADIR+=";
char* SADIR = (char*)[[envFlag stringByAppendingString:resourcesPath] cStringUsingEncoding:NSASCIIStringEncoding];

char *argv[4] = { "csound", SFDIR, SADIR, (char*)[csdFilePath cStringUsingEncoding:NSASCIIStringEncoding]};
    
ret = csoundCompile(_cs, 4, argv);
~~~

The interaction between *Csound* and the UI is two-way, the class method *drawWaveForm* draws the contents of the *genNum*.

~~~
[waveView drawWaveFromCsoundGen:_cs genNumber:genNum];
~~~

After calling this method, we need to enable an *NSTimer* object in order to read continuosly (pull) the phase value returned by *Csound*.Please examine the *loadSample\_1* function code, for insights.

The timer is disabled when the DSP is switched off, in the timer-callback we get the pointer, this time from CSOUND\_OUTPUT\_CHANNEL, finally we use this value for synchronize the graphics cursor on the waveform (scrub) in the GUI.

~~~
- (void)updateScrubPositionFromTimer {
    
    if (!running)
        return;
    
    MYFLT* channelPtr_file_position = nil;
    csoundGetChannelPtr(_cs, &channelPtr_file_position,
                        [@“file_position_from_csound”
					cStringUsingEncoding:NSASCIIStringEncoding],
                        	CSOUND_CONTROL_CHANNEL | CSOUND_OUTPUT_CHANNEL);
    
    if (channelPtr_file_position)
        [waveView updateScrubPosition:*channelPtr_file_position];
}
~~~

In the Orchestra we find the corresponding code for write in the software bus.

~~~
	chnset kfilposphas , "file_position_from_csound"
~~~

### Write into a Csound GEN table

We already have seen how to read from the *Csound*&#39;s gen memory, in this section we will focus on the write operation with two possible ways.

The goal is to modify a table in realtime while being read (played) by an oscillator LUT (i.e. look-up table), a **Pad** XY, to the left in the UI, manages the interpolation on the four prototypes and, to the right of the interface, a **16-slider** surface controls the harmonic content of a wave.

Concerning the first example (pad morph), the waveform interpolations are implemented in the Orchestra file and performed by *Csound*. The UI communicates with *Csound*, by activating an instrument (i.e. *instr* 53), through a &#39;score message&#39;.Instead, in the second example (16-slider surface) the code is implemented in the ***AudioDSP.m*** file and, precisely, in the *didValueChanged* delegate. The architecture of this second example is based on addArm procedure that write in a temporary array. The resulting waveform is then copied on the gen-table, via the *csoundTableCopyIn* API.

In the first example, the &#39;*instr 53*&#39; is activated via a &#39;score message&#39; to every action on the pad, this is performed in ui\_wavesMorphPad:

~~~
NSString* score = [NSString stringWithFormat:@"i53 0 %f %f %f", 
								UPDATE_RES, 
								pad.xValue, 
								pad.yValue];

csoundInputMessage(_cs, [score cStringUsingEncoding:NSASCIIStringEncoding]);
~~~

The &#39;*instr* 53&#39; is kept active for UPDATE\_RES sec (0.1), the *maxalloc* opcode limits the number of simultaneous instances (notes). Thus, any score events which falls inside UPDATE\_RES time, are ignored.

~~~
maxalloc 53,1  ;iPad UI Waveforms morphing only 1 instance
~~~

This results as a sub-sampling of Csound ‘instr 53’, compared to the UI pad-callback. The waveform display's process is done by the Waveview class, it is a simplified version of the WaveDrawView class, introduced in the tutorial (**04_plotWaveForm**), that does not deserves particular investigation.
As mentioned, the waveforms's interpolations are performed by Csound, hereinafter is the 'instr 53' code:

~~~
tableimix giWaveTMP1, 0, giWaveSize, giSine, 0, 1.-p4, giTri, 0, p4
tableimix giWaveTMP2, 0, giWaveSize, giSawSmooth, 0, 1.-p4, giSquareSmooth, 0, p4
tableimix giWaveMORPH, 0, giWaveSize, giWaveTMP2, 0, 1.-p5, giWaveTMP1, 0, p5

chnset giWaveMORPH , "wave_func_table"
~~~

The p4 and p5 p-fields, are the XY pad axes used as weights for the three vector-interpolations which are required.The *tablemix* opcode, mixes two tables with different weights into *giWaveTMP1* destination table.In this case we interpolate a Sine Wave (i.e. *giSine*) with a triangular (i.e. *giTri*), while in the second line between *giSawSmooth* and *giSquareSmooth*,the result is in *giWaveTMP2*. At last of the process, ***giWaveMORPH*** contain the interpolated values of the two *giWaveTMP1* and *giWaveTMP2* arrays.

The global *ftgen*-tables, deliberately have been declared with the &#39;*p1**&#39;* value to zero. This means that the *gen*-table number is assigned dynamically from *Csound* at compile time. Since we do not know the number assigned, we must return the number of function through *chnset* at runtime.

In the ***AudioDSP.m*** class there is the implementation&#39;s code of the second example.

The *APE\_MULTISLIDER* class returns, through its own delegate method didValueChanged, an array with the indexed values of the sliders. These are used as amplitude-weights for the generation of the harmonic additive waveform.Let&#39;s leave out the code about the wave&#39;s amplitude normalization and we focus on this code:

~~~
MYFLT *tableNumFloat;
csoundGetChannelPtr(_cs, &tableNumFloat, 
	[@"harm_func_table" cStringUsingEncoding:NSASCIIStringEncoding],
                                CSOUND_CONTROL_CHANNEL | CSOUND_INPUT_CHANNEL);

/* Contain the table num (i.e. giWaveHARM) */
int tableNum = (int) *tableNumFloat;

/* Contain the table (giWaveHARM) Pointer */
MYFLT *tablePtr;
int tableLength = csoundGetTable(_cs, &tablePtr, tableNum);
            
/* Is invalid? Return */
if (tableLength <= 0 || tableNum <= 0 || !tablePtr) return;
            
/* Clear temporary array  */
memset(srcHarmonic, 0, tableLength * sizeof(MYFLT));

/* Generate an additive sinusoidal waveform with 16 harmonics */
for(int i = 0; i < maxnum; ++i) {
	[self appendHarm:i+1 
			Amp:(powf(value[i], 2.0))*average 
			SIZE:tableLength 
			DEST:srcHarmonic];
}
            
/* Write array in the Csound Gen Memory (i.e. giWaveHARM) */
csoundTableCopyIn(_cs, tableNum, srcHarmonic);
~~~

This function also can be sub-sampled by de-commenting the *DOWNSAMP\_FUNC* macro. This code is purely for purposes of example as it can be significantly optimized, in the case of vectors&#39;s operations, the Apple *vDSP* framework could be an excellent solution.

### Optimize performance and add a custom opcode

In this final section we'll understand how to use the programming environment to implement a *ocpode* directly on ***AudioDSP*** class and add it to the list of opcodes of Csound without re-compile *Csound*. This is fundamental in order to optimize some processes audio particularly heavy from the point of view of the CPU.In fact, outside of Csound it will be possible to use a series of instruments such as the highly powerful vDSP of Apple, especially for the implementation of FFT routines (i.e. Fast Fourier Transform).
The guidelines are consistent with the official documentation of Csound.
The steps involved are three:

1. add custom opcode to Csound list
2. declare opcode structure
3. functions implementation

The first step must be made in the *runCsound*, before calling *csoundCompile*.

~~~
csoundAppendOpcode(cs, "MOOGLADDER", sizeof(MOOGLADDER_OPCODE),
                       0, 3, "a", "akk", iMOOGLADDER, kMOOGLADDER, aMOOGLADDER);
~~~

Appends an opcode implemented by external softwareto Csound&#39;s internal opcode list. The opcode list is extended by one slot,and the parameters are copied into the new slot.

Basically, what we have done is declare three pointers to functions (iMOOGLADDER, kMOOGLADDER and aMOOGLADDER) implemented in the class AudioDSP.

The second step is to declare the data structure used from opcode in the **AudioDSP.h**, you must include the header file csdl.h according to documentation:

*Plugin opcodes can extend the functionality of Csound, providing new functionality that is exposed
as opcodes in the Csound language. Plugins need to include this header file only, as it will bring all necessary data structures to interact with Csound. It is not necessary for plugins to link to the libcsound library, as plugin opcodes will always receive a CSOUND* pointer (to the CSOUND_struct) which contains all the API functions inside.This is the basic template for a plugin opcode. See the manual for further details on accepted types and function call rates. The use of the LINKAGE macro is highly recommended, rather than calling the functions directly.*

~~~
typedef struct {
    OPDS    h;
    MYFLT   *ar, *asig, *kcutoff, *kresonance;
    //…
    
} MOOGLADDER_OPCODE;
~~~

Finally, the implementation of the three required functions in ***AudioDSP.m***:

~~~
int iMOOGLADDER(CSOUND *csound, void *p_) {
//…      
}

int kMOOGLADDER(CSOUND *csound, void *p_)
{
//…
}

int aMOOGLADDER(CSOUND *csound, void *p_)
{
//…
}
~~~

In the Orchestra code, we can call MOOGLADDER in the same way of the native opcodes compiled:

~~~
aOutput MOOGLADDER aInput, kcutoff, kres
~~~

The MOOGLADDER is a simplified and optimized implementation of the opcode moogladder by Victor Lazzarini. The iVCS3 app uses this mechanism for the Envelope and Filter implementationthat also allows a fine control of the cutoff (audio variable &#39;*a*&#39;).

### References

[Csound for iOS](http://www.csounds.com/)

[Online Tutorial](https://bitbucket.org/alessandropetrolati/tutorials/src/master/)

[apeSoft](http://www.apesoft.it/)

[Audiobus](http://audiob.us/)

[A Tasty](http://atastypixel.com/)

[The Open Music App Collaboration Manifesto](https://docs.google.com/document/d/1UW-8vPEf95p0zO0hV1lpwD5MTgefKB1y-jdWR-nFYM8/edit?hl=en_US&pli=1)
