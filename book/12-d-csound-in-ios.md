12 D. CSOUND IN iOS
===================

Note: this chapter can be found in PDF form
[here](https://www.dropbox.com/s/319wxt38l9ncllx/CsoundiOS_AGuide.pdf?dl=0) and
the Csound iOS SDK can be downloaded
[here](http://csound.github.io/download).

### **1 Introduction**

This guide aims to introduce and illustrate some of the power that the
Csound language offers to iOS Developers. It assumes that the reader has
a rudimentary background in Csound, and some experience and
understanding of iOS development with either Swift or Objective-C.

**1.1 Csound for iOS**

Csound for iOS offers the developer a number of powerful tools have been
created to aid in the development of audio software for Apple\'s iOS
platform. Here we describe a promising avenue for audio programmers, and
especially for those with some background in Csound: the Csound for iOS
API. We hope that it will serve as a guide to those who hope to advance
or diversify as audio programmers for iOS by harnessing the powerful
synthesis, signal-processing, and other capabilities of Csound and the
Csound API.

The Csound for iOS Manual (Lazzarini, Yi, Boulanger) that ships with the
Csound for iOS API is intended to serve as a lighter reference for
developers. This guide is distinct from it in that it is intended to be
a more thorough, step-by-step approach to learning the API for the first
time.\

### **2 Getting Started**

There are a number of ways in which one might begin to learn to work
with the Csound for iOS API. Here, to aid in exploring it, we first
describe how the project of examples that ships with the API is
structured. We then talk about how to go about configuring a new iOS
Xcode project to work with Csound from scratch.

**2.1 Csound for iOS Examples**

The Csound for iOS Examples project contains a number of simple examples
(in both Objective-C and Swift) of how one might use Csound's synthesis
and signal processing capabilities, and the communicative functionality
of the API.

In the 'ViewControllers' group, a number of subgroups exist to organize
the various individual examples into a single application. This is done
using the Master-Detail application layout paradigm, wherein a set of
options, all of them listed in a 'master' table, correlates to a single
'detail' ViewController. Familiar examples of this design model,
employed by Apple and provided with every iOS device, are the Settings
app, and the Notes app -- each of these contains a master table upon
which the detail ViewController's content is predicated.

In each of these folders, you will find a unique example showcasing how
one might use some of the features of the Csound for iOS API to
communicate with Csound to produce and process sounds and make and play
music. These are designed to introduce you to these features in a
practical setting, and etch of these has a unifying theme that informs
its content, interactions, and structure.

**2.2 Adding Csound to Your Project**

If you are working in Objective-C, adding Csound for iOS to your project
is as simple as dragging the csound-iOS folder into your project. You
should select \"Groups\" rather than \"Folder References\", and it is
recommended that you elect to copy the csound-iOS folder into your
project folder (\"Copy Items if Needed\").

Once you have successfully added this folder, including the CsoundObj
class (the class that manages Csound on iOS) is as simple as adding an
import statement to the class. For example:

    //
    // ViewController.h
    //
    #import "CsoundObj.h"

Note that this only makes the CsoundObj class available, which provides
an interface for Csound. There are other objects containing UI and
CoreMotion bindings, as well as MIDI handling. These are discussed later
in this document, and other files will need to be imported in order to
access them.

For Swift users, the process is slightly different: you will need to
first create a \"bridging header\": a .h header file that can import the
Objective-C API for access in Swift. The naming convention is
\[YourProjectName\]-Bridging Header.h and this file can be easily
created manually in Xcode by choosing File \> New \> File \> Header File
(Under 'Source'), and using the naming convention described above. After
this, you will need to navigate to your project build settings and add
the path to this file (relative to your project's .xcodeproj project
file).

Once this is done, navigate to the bridging header in Xcode and add your
Objective-C \#import statements here. For example:

    //
    // CsoundiOS_ExampleSwift-Bridging-Header.h
    // CsoundiOS_ExampleSwift
    //

    #ifndef CsoundiOS_ExampleSwift_Bridging_Header_h
    #define CsoundiOS_ExampleSwift_Bridging_Header_h

    #import "CsoundObj.h"

    #endif /* CsoundiOS_ExampleSwift_Bridging_Header_h */

You do not need to add any individual import statements to Swift files,
CsoundObj's functionality should be accessible in your .swift files
after this process is complete.

**2.3 Playing a .csd File**

The first thing we will do so that we can play a .csd file is add our
.csd file to our project. In this case, we will add a simple .csd (in
this case named test.csd) that plays a sine tone with a frequency of
440Hz for ten seconds. Sample Csound code for this is:

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

We will add this to our Xcode project by dragging and dropping it into
our project's main folder, making sure to select \"Copy items if
needed\" and to add it to our main target.

In order to play this .csd file, we must first create an instance of the
CsoundObj class. We can do this by creating a property of our class as
follows, in our .h file (for example, in ViewController.h):

    //
    // ViewController.h
    // CsoundiOS_ExampleProject
    //

    #import <UIKit/UIKit.h>
    #import "CsoundObj.h"

    @interface ViewController : UIViewController

    @property CsoundObj *csound;

    @end

Once we've done this, we can move over to the corresponding .m file (in
this case, ViewController.m) and instantiate our Csound object. Here we
will do this in our viewDidLoad method, that is called when our
ViewController's view loads.

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

Note: in order to play our .csd file, we must first get a path to it
that we can give Csound. Because part of this path can vary depending on
certain factors (for example, the user's native language setting), we
cannot pass a static or \"hard-coded\" path. Instead, we will access the
file using the NSBundle class (or 'Bundle' in Swift).

The .csd file is copied as a resource (you can see this under the 'Build
Phases' tab in your target's settings), and so we will access it and
tell Csound to play it as follows:

    - (void)viewDidLoad {
        [super viewDidLoad];
        self.csound = [[CsoundObj alloc] init];
        //CsoundObj *csound is declared as a property in .h
        NSString *pathToCsd = [[NSBundle mainBundle] pathForResource: @"test" ofType:@ "csd"];
        [self.csound play:pathToCsd];
    }

Note that in Swift, this is a little easier and we can simply use:

    import UIKit
    class ViewController: UIViewController {
        var csound = CsoundObj()

        override func viewDidLoad() {
            super.viewDidLoad()
            let pathToCsd = Bundle.main.path(forResource: "test", ofType: "csd")
            self.csound.play(pathToCsd)
        }
    }

With this, the test.csd file should load and play, and we should hear a
ten-second long sine tone shortly after the application runs (i.e. when
the main ViewController's main view loads).

### **3 Recording and Rendering**

**3.1 Recording (Real-Time)**

To record the output of Csound in real-time, instead of the play method,
use:

    // Objective-C
    NSURL *docsDirURL = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSURL *file = [docsDirURL URLByAppendingPathComponent:@"outputFile.aif"];
    NSString *csdPath = [[NSBundle mainBundle] pathForResource:@"csdToRecord" ofType:@"csd"];
    [self.csound record:csdPath toURL:file];

    // Swift
    let docsDirURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    let file = docsDirURL.appendingPathComponent("outFile.aif")
    let csdPath = Bundle.main.path(forResource: "csdFile", ofType: "csd")
    csound.record(csdPath, to: file)

Alternatively, the recordToURL method can be used while Csound is
already running to begin recording:

    // Objective-C
    NSURL *docsDirURL = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSURL *file = [docsDirURL URLByAppendingPathComponent:@"outputFile.aif"];
    [self.csound recordToURL:file];

    // Swift
    let docsDirURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    let file = docsDirURL.appendingPathComponent("outFile.aif")
    csound.record(to: file)

Note: the stopRecording method is used to stop recording without also
stopping Csound's real-time rendering.

**3.2 Rendering (Offline)**

You can also render a .csd to an audio file offline. To render Csound
offline to disk, use the record:toFile: method, which takes a path
rather than a URL as its second argument. For example:

    // Objective-C
    NSString *docsDir = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
    NSString *file = [docsDir stringByAppendingPathComponent:@"outFile.aif"];
    NSString *csdPath = [[NSBundle mainBundle] pathForResource:@"csdFile" ofType:@"csd"];
    [self record:csdPath toFile:file];

    // Swift
    let docsDir = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
    let file = docsDir.appending("/outFile.aif")
    let csdPath = Bundle.main.path(forResource: "csdFile", ofType: "csd")
    csound.record(csdPath, toFile: file)

These demonstrations above save the audio files in the app's documents
directory, which allows write access for file and subdirectory storage
on iOS. Note that the -W and -A flags behave as usual on iOS: they will
decide whether the file rendered is a WAV or an AIFF file. In the event
that neither is provided, the latter will be used as a default.

### **4 The CsoundUI Class**

The CsoundUI class provides for direct bindings between named Csound
channels and commonly used objects from the UIKit iOS framework. While
it is not necessary to use a CsoundUI object for this communication
between iOS and Csound, it can, in many cases, abstract the process of
setting up a UI object binding to a single line of code. To initialize a
CsoundUI object, we must give it a reference to our Csound object:

    //Objective-C
    CsoundUI *csoundUI = [[CsoundUI alloc] initWithCsoundObj: self.csound];

    // Swift
    var csoundUI = CsoundUI(csoundObj: csound)

Normally, however, these objects are declared as properties rather than
locally in methods. As mentioned, CsoundUI uses named channels for
communicating to and from Csound. Once set-up, values passed to these
named channels are normally accessed through the chnget opcode, for
example:

    instr 1
    kfreq chnget " frequency "
    asig oscil 0.5 , kfreq
    outs asig , asig
    endin

Conversely, in order to pass values from Csound, the chnset opcode is
normally used with two arguments. The first is the variable, and it is
followed by the channel name:

    instr 1
    krand randomi 300 , 2000 , 1 , 3
    asig poscil 0.5 , krand
    outs asig , asig
    chnset krand , " randFreq "
    endin

\
**4.1 UIButton Binding**

The UIButton binding is predominantly contained within the
CsoundButtonBinding class, which CsoundUI uses to create individual
button bindings. To add a button binding, use:

    //Objective-C
    [self.csoundUI addButton:self.button forChannelName:"channelName"];

    // Swift
    csoundUI.add(button, forChannelName: "channelName")

Where self.button is the button you would like to bind to, and the
string \"channelName\" contains the name of the channel referenced by
chnget in Csound.

The corresponding value in Csound will be equal to 1 while the button is
touched, and reset to 0 when it is released. A simple example of how
this might be used in Csound, based on the pvscross example by Joachim
Heintz, is shown below:

    instr 1
    kpermut chnget " crossToggle "
    ain1 soundin " fox .wav"
    ain2 soundin " wave .wav"

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

**4.2 UISwitch Binding**

The UISwitch binding provides a connection between the UISwitch object
and a named channel in Csound. This binding is managed in the
CsoundSwitchBinding class and you can create a UISwitch binding by
using:

    //Objective-C
    [self.csoundUI addSwitch:self.uiSwitch forChannelName:"channelName"];

    // Swift
    csoundUI.add(switch, forChannelName: "channelName")

As in the case of the UIButton binding, the UISwitch binding provides an
on-off state value (1 or 0 respectively) to Csound. Below we use it to
turn on or off a simple note generator:

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

**4.3 UILabel Binding**

The UILabel binding allows you to display any value from Csound in a
UILabel object. This can often be a helpful way of providing feedback to
the user. You can add a label binding with:

    //Objective-C
    [self.csoundUI addLabel:self.label forChannelName:"channelName"];

    // Swift
    csoundUI.add(label, forChannelName: "channelName")

However, in this case the channel is an output channel. To demonstrate,
let us add an output channel in Csound to display the frequency of the
sound generating instrument's oscillator from the previous example (for
UISwitch):

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

Note additionally that the desired precision of the value display can be
set beforehand using the labelPrecision property of the CsoundUI object.
For example:

    self.csoundUI.labelPrecision = 4;

**4.4 UISlider Binding**

The UISlider binding is possibly the most commonly used UI binding - it
allows the value of a UISlider object to be passed to Csound whenever it
changes. This is set up in the CsoundSliderBinding class and we access
it via CsoundUI using:

    // Objective-C
    [self.csoundUI addSlider:self.slider
    forChannelName:"channelName"];

    // Swift
    csoundUI.add(slider, forChannelName: "channelName")

Note that this restricts you to using the slider's actual value, rather
than a rounded verion of it or some other variation, which would
normally be best suited to a manual value binding, which is addressed
later in this guide. An example is provided below of two simple such
UISlider-bound values in Csound:

    sr = 44100
    ksmps = 128
    nchnls = 2
    0dbfs = 1

    instr 1
    kfreq chnget " frequency " ; input 0 - 1
    kfreq expcurve kfreq , 500 ; exponential distribution
    kfreq *= 19980 ; scale to range
    kfreq += 20 ;add offset
    kamp chnget " amplitude "
    kamp port kamp , .001 ; smooth values
    asig poscil kamp , kfreq
    outs asig , asig
    endin

Above we get 'around' being restricted to the value of the UISlider by
creating an exponential distribution in Csound. Of course we could
simply make the minimum and maximum values of the UISlider 20 and 20000
respectively, but that would be a linear distribution by default. In
both cases here, the UISlider's range of floating point values is set to
be from 0 to 1.

**4.5 Momentary Button Binding**

The momentary button binding is similar to the normal UIButton binding
in that it uses a UIButton, however it differs in how it uses this
object. The UIButton binding passes a channel value of 1 for as long as
the UIButton is held, whereas the momentary button binding sets the
channel value to 1 for one Csound k-period (i.e. one k-rate sample). It
does this by setting an intermediate value to 1 when the button is
touched, passing this to Csound on the next k-cycle, and immediately
resetting it to 0 after passing it. This is all occurring predominantly
in the CsoundMomentaryButtonBinding class, which we access using:

    // Objective-C
    [self.csoundUI addMomentaryButton:self.triggerButton forChannelName:"channelName"];

    // Swift
    csoundUI.addMomentaryButton(triggerButton, forChannelName: "channelName")

Here's a simple usage example:

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

This replaces the automatic instrument triggering with a manual trigger.
Every time the UIButton is touched, a note (by way of an instance of
instr 2) will be triggered. This may seem like a more esoteric binding,
but there are a variety of potential uses.

### **5 The CsoundMotion Class**

The CsoundMotion class and its associated bindings allow information to
be passed from a device's motion sensors, via the CoreMotion framework,
to Csound. As with CsoundUI, it is possible to pass this data indirectly
by writing code to mediate between CoreMotion and Csound, but
CsoundMotion simplifies and greatly abstracts this process. Subsection
4.4 shows an example of how these values are accessed and might be used
in Csound. Note that with CsoundMotion, you do not assign channel names:
they are pre-assigned by the relevant objects (e.g. \"AccelerometerX\").

To declare and initialize a CsoundMotion object, use:

    // Objective-C
    CsoundMotion *csoundMotion = [[CsoundMotion alloc] initWithCsoundObj:self.csound];

    // Swift
    var csoundMotion = CsoundMotion(csoundObj: csound)

As with CsoundUI, it may often be advantageous to declare the
CsoundMotion object as a property rather than locally.

**5.1 Accelerometer Binding**

The acclerometer binding, implemented in the CsoundAccelerometerBinding
class and enabled through the CsoundMotion class, allows access to an
iOS device's accelerometer data along its three axes (X, Y, Z). The
accelerometer is a device that measures acceleration, aiding in several
basic interactions. To enable it, use:

    // Objective-C
    [csoundMotion enableAccelerometer];

    // Swift
    csoundMotion.enableAccelerometer()

**5.2 Gyroscope Binding**

The gyroscope binding, implemented in the CsoundGyroscopeBinding class
and enabled through the CsoundMotion class, allows access to an iOS
device's gyroscope data along its three axes (X, Y, Z). The
accelerometer is a device that allows rotational velocity to be
determined, and together with the accelerometer forms a system with six
degrees of freedom. To enable it, use:

    // Objective-C
    [csoundMotion enableGyroscope];

    // Swift
    csoundMotion.enableGyroscope() 

**5.3 Attitude Binding**

Finally, the attitude binding, implemented in CsoundAttitudeBinding and
enabled through CsoundMotion, allows access to an iOS device's 'attitude
data'. As the Apple reference notes, 'attitude' refers to the
orientation of a body relative to a given frame of reference.
CsoundMotion enables this as three Euler angle valies: 'roll', 'pitch',
and 'yaw' (rotation around X, Y, and Z respectively). To enable the
attitude binding, use:

    // Objective-C
    [csoundMotion enableAttitude];

    // Swift
    csoundMotion.enableAttitude()

Together, these bindings enable control of Csound parameters with device
motion in ways that are very simple and straightforward. In the
following subsection, an example demonstrating each of the pre-set
channel names as well as how some of this information might be used is
provided.

**5.4 Motion Csound Example**

Here is an example of a Csound instrument that accesses all of the data,
and demonstrates uses for some of it. This example is taken from the
Csound for iOS Examples project.

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

Each of the channel names is shown here, and each corresponds to what is
automatically set in the relevant binding. A little experimenting can be
very helpful in determining what to use these values for in your
particular application, and of course one is never under any obligation
to use all of them. Regardless, they can be helpful and very
straightforward ways to add now-familiar interactions.

### **6 The CsoundBinding Protocol**

The CsoundBinding protocol allows you to read values from and write
values to Csound using named channels that can be referenced in your
.csd file using opcodes like chnget and chnset, as described in the
earlier section on CsoundUI. The protocol definition from CsoundObj is:

    @protocol CsoundBinding <NSObject>
    - (void)setup:(CsoundObj*)csoundObj;
    @optional
    - (void)cleanup;
    - (void)updateValuesFromCsound;
    - (void)updateValuesToCsound;
    @end

In order to add a binding object to Csound, use CsoundObj's addBinding
method:

    // Objective-C
    [self.csound addBinding:self];

    // Swift
    csound.addBinding(self) 

Note that you will need to conform to the CsoundBinding protocol, and
implement. at minimum, the required setup method. The CsoundBinding
setup method will be called on every object added as a binding, and the
remaining methods, marked with the \@optional directive will be called
on any bindings that implement them.

**6.1 Channels and Channel Types**

Named channels allow us to pass data to and from Csound while it is
running. These channels refer to memory locations that we can write to
and Csound can read from, and vice-versa. The two most common channel
types are: CSOUND\_CONTROL\_CHANNEL refers to a floating point control
channel, normally associated with a k-rate variable in
Csound. CSOUND\_AUDIO\_CHANNEL refers to an array of floating point
audio samples of length ksmps.

Each of these can be an input or output channel depending on whether
values are being passed to or from Csound.

Given below is an example of using named channels in a simplified Csound
instrument. The polymorphic chnget and chnset opcodes are used, and the
context here implies that kverb received its value from an input control
channel named \"verbMix\", and that asig outputs to an audio channel
named \"samples\".

    giSqr ftgen 2 , 0 , 8192 , 10 , 1 , 0 , .33 , 0 , .2 , 0 , .14 , 0 , .11 , 0 , .09

    instr 1
    kfreq = p4
    kverb chnget " verbMix "
    aosc poscil .5 , kfreq , 2
    arvb reverb aosc , 1.5
    asig = (aosc * (1 - kverb) ) + (arvb * kverb)
    chnset asig , " samples "
    outs asig , asig
    endin

The section that follows will describe how to set up and pass values to
and from this instrument's channels in an iOS application.

### **6.2 The Setup Method**

The setup method is called before Csound's first performance pass, and
this is typically where channel references are created. For example:

    // Objective-C
    // verbPtr and samplesPtr are instance variables of type float*

    -(void)setup:(CsoundObj *)csoundObj {
        verbPtr = [csoundObj getInputChannelPtr:@"verbMix" channelType:CSOUND_CONTROL_CHANNEL];
        samplesPtr = [csoundObj getOutputChannelPtr:@"samples" channelType:CSOUND_AUDIO_CHANNEL];
    }

    // Swift
    var verbPtr: UnsafeMutablePointer<Float>?
    var samplesPtr: UnsafeMutablePointer<Float>?

    func setup(_ csoundObj: CsoundObj) {
        verbPtr = csoundObj.getInputChannelPtr("verbMix", channelType: CSOUND_CONTROL_CHANNEL)
        samplesPtr = csoundObj.getOutputChannelPtr("samples", channelType: CSOUND_AUDIO_CHANNEL)
    }

The cleanup method from CsoundBinding, also optional, is intended for
use in removing bindings once they are no longer active. This can be
done using CsoundObj's removeBinding method:

    // Objective-C
    // verbPtr and samplesPtr are instance variables of type float*
    -(void)cleanup {
        [self.csound removeBinding:self];
    }

    // Swift
    func cleanup() {
        csound.removeBinding(self)
    }

### **6.3 Communicating Values To and From Csound**

Communicating values to Csound is normally handled in the
updateValuesToCsound method. This method is called once per performance
pass (i.e. at the k-rate). For example:

    // Objective-C
    -(void)updateValuesToCsound {
        *verbPtr = self.verbSlider.value;
    }

    // Swift
    func updateValuesToCsound() {
        verbPtr?.pointee = verbSlider.value
    }

This updates the value at a memory location that Csound has already
associated with a named channel (in the setup method). This process has
essentially replicated the functionality of the CsoundUI API's slider
binding. The advantage here is that we could perform any transformation
on the slider value, or associate another value (that might not be
associated with a UI object) with the channel altogether. To pass values
back from Csound, we use the updateValuesFromCsound method.

    // Objective-C
    -(void)updateValuesFromCsound {
        float *samps = samplesPtr;
    }

Note that in Swift, we have do a little extra work in order to get an
array of samples that we can easily index into:

    // Swift
    func updateValuesFromCsound() {
        let samps = samplesPtr?.pointee
        let sampsArray = [Float](UnsafeBufferPointer(start: audioPtr,
        count: Int(csound.getKsmps())))
    }

Note also that updateValuesToCsound is called before
updateValuesFromCsound during each performance pass, with the Csound
engine performance call in between the two.

### **7 The CsoundObjListener Protocol**

The CsoundObjListener protocol allows objects in your program to be
notified when Csound begins running, and when it completes running. The
protocol definition from CsoundObj is:

    @protocol CsoundObjListener <NSObject>
    @optional
    - (void)csoundObjStarted:(CsoundObj *)csoundObj;
    - (void)csoundObjCompleted:(CsoundObj *)csoundObj;
    @end 

Note that there are no methods that an object is required to adopt in
order to conform to this protocol. These methods simply allow an object
to elect to be notified when Csound either begins, completes running, or
both. Note that these methods are not called on the main thread, so any
UI work must be explicitly run on the main thread. For example:

    // Objective-C
    -(void)viewDidLoad {
        [super viewDidLoad];
        [self.csound addListener:self];
    }
    - (void)csoundObjStarted:(CsoundObj *)csoundObj {
        [self.runningLabel performSelectorOnMainThread:@selector(setText:) withObject:@"Csound Running" waitUntilDone:NO];
    }

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

### **8 Console Output**

Console output from Csound is handled via a callback. You can set the
method that handles console info using CsoundObj's
setMessageCallbackSelector method, and passing in an appropriate
selector, for instance:

    // Objective-C
    [self.csound setMessageCallbackSelector:@selector(printMessage:)];

    // Swift
    csound.setMessageCallbackSelector(#selector(printMessage(_:)))

An object of type NSValue will be passed in. This object is acting as a
wrapper for a C struct of type Message. The definition for Message in
CsoundObj.h is:

    typedef struct {
        CSOUND *cs;
        int attr;
        const char *format;
        va_list valist;
    } Message; 

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

<!-- -->

    // Objective-C
    - (void)printMessage:(NSValue *)infoObj
        Message info;
        [infoObj getValue:&info];
        char message[1024];
        vsnprintf(message, 1024, info.format, info.valist);
        NSString *messageStr = [NSString stringWithFormat:@"%s", message];
        NSLog(@"%@", messageStr);
    }

Note that in Swift, we have to create a CVaListPointer (equivalent to a
va\_list\* in C) for use with the vsnprintf() function:

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

In both cases above, we are printing the resulting string objects to
Xcode's console. This can be very useful for finding and addressing
issues that have to do with Csound or with a .csd file you might be
using.

We could also pass the resulting string object around in our program;
for example, we could insert the contents of this string object into a
UITextView for a simulated Csound console output.

### **9 Csound-iOS and MIDI**

**9.1 CsoundObj and MIDI**

The Csound iOS API provides two possible ways of passing MIDI
information to Csound. CsoundObj can receive MIDI events from CoreMIDI
directly. By default, this functionality is disabled, but setting
CsoundObj's midiInEnabled property to true (or YES on Objective-C)
enables it. This must, however be done before Csound is run.

Note that you must also set the appropriate command-line flag in your
csd, under CsOptions. For example, -M0. Additionally, the MIDI device
must be connected before the application is started.

**9.2 MidiWidgetsManager**

The second way that is provided to communicate MIDI information to
Csound is indirect, via the use of UI widgets and CsoundUI. In this
case, the MidiWidgetsManager uses a MidiWidgetsWrapper to connect a MIDI
CC to a UI object, and then CsoundUI can be used to connect this UI
object's value to a named channel in Csound. For instance:

    // Objective-C
    MidiWidgetsManager *widgetsManager = [[MidiWidgetsManager alloc] init];
    [widgetsManager addSlider:self.cutoffSlider forControllerNumber:5];
    [csoundUI addSlider:self.cutoffSlider forChannelName:@"cutoff"];
    [widgetsManager openMidiIn];

    // Swift
    let widgetsManager = MidiWidgetsManager()
    widgetsManager.add(cutoffSlider, forControllerNumber: 5)
    csoundUI?.add(cutoffSlider, forChannelName: "cutoff")
    widgetsManager.openMidiIn()

An advantage of this variant is that MIDI connections to the UI widgets
are active even when Csound is not running, so visual feedback can still
be provided, for example. At the time of writing, support is only
built-in for UISliders.

### **10 Other Functionality**

This section describes a few methods of CsoundObj that are potentially
helpful for more complex applications.

**10.1 getCsound**

    (CSOUND *)getCsound;

The getCsound method returns a pointer to a struct of type CSOUND, the
underlying Csound instance in the C API that the iOS API wraps. Because
the iOS API only wraps the most commonly needed functionality from the
Csound C API, this method can be helpful for accessing it directly
without needing to modify the Csound iOS API to do so.

Note that this returns an opaque pointer because the declaration of this
struct type is not directly accessible. This should, however, still
allow you to pass it into Csound C API functions in either Objective-C
or Swift if you would like to access them.

**10.2 getAudioUnit**

    (AudioUnit *)getAudioUnit;

The getAudioUnit method returns a pointer to a CsoundObj instance's I/O
AudioUnit, which provides audio input and output to Csound from iOS.

This can have several potential purposes. As a simple example, you can
use the AudioOutputUnitStop() function with the returned value's pointee
to pause rendering, and AudioOutputUnitStart() to resume.

**10.3 updateOrchestra**

    (void)updateOrchestra:(NSString *)orchestraString;

The updateOrchestra method allows you to supply a new Csound orchestra
as a string.

**10.4 Other**

Additionally, getKsmps returns the current ksmps value, and
getNumChannels returns the number of audio channels in use by the
current Csound instance. These both act directly as wrappers to Csound C
API functions.

### **11 Example Projects**

The Csound iOS examples project, available in both Objective-C and
Swift, is a collection of code that demonstrates common uses of and
interactions with the Csound iOS API.

For documentation on the examples, refer to the Csound-iOS reference
manual (Yi, Lazzarini, Boulanger), included with the API and examples.

**11.1 csoundSynthesizer**

csoundSynthesizer is a separate project that demonstrates building a
small, simple iOS application that is usable as a rudimentary
synthesizer. It is not intended to be an exhaustive reference, for which
purpose the Csound iOS Examples projects are better suited, but to help
a new user get up and running with Csound on iOS. The project is
available in both Swift and Objective-C
[here.](https://github.com/nikhilsinghmus/csoundSynthesizer)

### **12 Conclusion**

This guide provides an outline of the Csound iOS API's functionality,
and demonstrates some common applications of it, in order to aid those
who have acquired even some background in Csound to develop powerful
audio applications without worrying about the low-level intricacies of
Apple's Core Audio.

We wish you all the best as you continue your journey into developing
apps with the power and possibilities Csound has to offer.
