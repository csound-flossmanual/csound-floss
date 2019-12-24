12 A. THE CSOUND API
====================

An application programming interface (API) is an interface provided by a computer system, library or application that allows users to access functions and routines for a particular task. It gives developers a way to harness the functionality of existing software within a host application. The Csound API can be used to control an instance of Csound through a series of different functions thus making it possible to harness all the power of Csound in one’s own applications. In other words, almost anything that can be done within Csound can be done with the API. The API is written in C, but there are interfaces to other languages as well, such as Python, C++  and Java.

Though it is written in C, the Csound API uses an object structure. This is achieved through an opaque pointer representing a Csound instance. This opaque pointer is passed as the first argument when an API function is called from the host program.

To use the Csound C API, you have to include csound.h in your source file and to link your code with libcsound64 (or libcsound if using the 32 bit version of the library). Here is an example of the csound command line application written in C, using the Csound C API:

    #include <csound/csound.h>

    int main(int argc, char **argv)
    {
      CSOUND *csound = csoundCreate(NULL);
      int result = csoundCompile(csound, argc, argv);
      if (result == 0) {
        result = csoundPerform(csound);
      }
      csoundDestroy(csound);
      return (result >= 0 ? 0 : result);
    }

First we create an instance of Csound. To do this we call `csoundCreate()` which returns the opaque pointer that will be passed to most Csound API functions. Then we compile the orc/sco files or the csd file given as input arguments through the argv parameter of the main function. If the compilation is successful (result == 0), we call the `csoundPerform()` function. `csoundPerform()` will cause Csound to perform until the end of the score is reached. When this happens `csoundPerform()` returns a non-zero value and we destroy our instance before ending the program.

On a linux system, using libcsound64 (double version of the csound library), supposing that all include and library paths are set correctly, we would build the above example with the following command (notice the use of the -DUSE_DOUBLE flag to signify that we compile against the 64 bit version of the csound library):

    gcc -DUSE_DOUBLE -o csoundCommand csoundCommand.c -lcsound64

The command for building with a 32 bit version of the library would be:

    gcc -o csoundCommand csoundCommand.c -lcsound

Within the C or C++ examples of this chapter, we will use the MYFLT type for the audio samples. Doing so, the same source files can be used for both development (32 bit or 64 bit), the compiler knowing how to interpret MYFLT as double if the macro USE_DOUBLE is defined, or as float if the macro is not defined.

The C API has been wrapped in a C++ class for convenience. This gives the Csound basic C++ API. With this API, the above example would become:

    #include <csound/csound.hpp>

    int main(int argc, char **argv)
    {
      Csound *cs = new Csound();
      int result = cs->Compile(argc, argv);
      if (result == 0) {
        result = cs->Perform();
      }
      return (result >= 0 ? 0 : result);
    }

Here, we get a pointer to a Csound object instead of the csound opaque pointer. We call methods of this object instead of C functions, and we don't need to call `csoundDestroy()` in the end of the program, because the C++ object destruction mechanism takes care of this. On our linux system, the example would be built with the following command:

    g++ -DUSE_DOUBLE -o csoundCommandCpp csoundCommand.cpp -lcsound64

## Threading

Before we begin to look at how to control Csound in real time we need to look at threads. Threads are used so that a program can split itself into two or more simultaneously running tasks. Multiple threads can be executed in parallel on many computer systems. The advantage of running threads is that you do not have to wait for one part of your software to finish executing before you start another.

In order to control aspects of your instruments in real time your will need to employ the use of threads. If you run the first example found on this page you will see that the host will run for as long as `csoundPerform()` returns 0. As soon as it returns non-zero it will exit the loop and cause the application to quit. Once called, `csoundPerform()` will cause the program to hang until it is finished. In order to interact with Csound while it is performing you will need to call `csoundPerform()` in a separate unique thread.

When implementing threads using the Csound API, we must define a special performance-thread function. We then pass the name of this performance function to `csoundCreateThread()`, thus registering our performance-thread function with Csound. When defining a Csound performance-thread routine you must declare it to have a return type uintptr_t, hence it will need to return a value when called. The thread function will take only one parameter, a pointer to void. This pointer to void is quite important as it allows us to pass important data from the main thread to the performance thread. As several variables are needed in our thread function the best approach is to create a user defined data structure that will hold all the information your performance thread will need. For example:

    typedef struct {
      int result;        /* result of csoundCompile() */
      CSOUND *csound;    /* instance of csound */
      bool PERF_STATUS;  /* performance status */
    } userData;

Below is a basic performance-thread routine. `*data` is cast as a userData data type so that we can access its members.

    uintptr_t csThread(void *data)
    {
      userData *udata = (userData *)data;
      if (!udata->result) {
        while ((csoundPerformKsmps(udata->csound) == 0) &&
               (udata->PERF_STATUS == 1));
        csoundDestroy(udata->csound);
      }
      udata->PERF_STATUS = 0;
      return 1;
    }

In order to start this thread we must call the `csoundCreateThread()` API function which is declared in csound.h as:

    void *csoundCreateThread(uintptr_t (*threadRoutine (void *),
                             void *userdata);

If you are building a command line program you will need to use some kind of mechanism to prevent `int main()` from returning until after the performance has taken place. A simple while loop will suffice.

The first example presented above can now be rewritten to include a unique performance thread:

    #include <stdio.h>
    #include <csound/csound.h>

    uintptr_t csThread(void *clientData);

    typedef struct {
      int result;
      CSOUND *csound;
      int PERF_STATUS;
    } userData;

    int main(int argc, char *argv[])
    {
      int finish;
      void *ThreadID;
      userData *ud;
      ud = (userData *)malloc(sizeof(userData));
      MYFLT *pvalue;
      ud->csound = csoundCreate(NULL);
      ud->result = csoundCompile(ud->csound, argc, argv);

      if (!ud->result) {
        ud->PERF_STATUS = 1;
        ThreadID = csoundCreateThread(csThread, (void *)ud);
      }
      else {
        return 1;
      }

      /* keep performing until user types a number and presses enter */
      scanf("%d", &finish);
      ud->PERF_STATUS = 0;
      csoundDestroy(ud->csound);
      free(ud);
      return 0;
    }

    /* performance thread function */
    uintptr_t csThread(void *data)
    {
      userData *udata = (userData *)data;
      if (!udata->result) {
        while ((csoundPerformKsmps(udata->csound) == 0) &&
               (udata->PERF_STATUS == 1));
        csoundDestroy(udata->csound);
      }
      udata->PERF_STATUS = 0;
      return 1;
    }

The application above might not appear all that interesting. In fact it's almost the exact same as the first example presented except that users can now stop Csound by hitting 'enter'.  The real worth of threads can only be appreciated when you start to control your instrument in real time.



## Channel I/O

The big advantage to using the API is that it allows a host to control your Csound instruments in real time. There are several mechanisms provided by the API that allow us to do this. The simplest mechanism makes use of a 'software bus'.

The term bus is usually used to describe a means of communication between hardware components. Buses are used in mixing consoles to route signals out of the mixing desk into external devices. Signals get sent through the sends and are taken back into the console through the returns. The same thing happens in a software bus, only instead of sending analog signals to different hardware devices we send data to and from different software.

Using one of the software bus opcodes in Csound we can provide an interface for communication with a host application. An example of one such opcode is `chnget`. The `chnget` opcode reads data that is being sent from a host Csound API application on a particular named channel, and assigns it to an output variable. In the following example instrument 1 retrieves any data the host may be sending on a channel named "pitch":

    instr 1
    kfreq chnget "pitch"
    asig  oscil  10000, kfreq, 1
          out    asig
    endin

One way in which data can be sent from a host application to an instance of Csound is through the use of the `csoundGetChannelPtr()` API function which is defined in csound.h as:

    int csoundGetChannelPtr(CSOUND *, MYFLT **p, const char *name,  int type);

`CsoundGetChannelPtr()` stores a pointer to the specified channel of the bus in p. The channel pointer p is of type `MYFLT *`. The argument name is the name of the channel and the argument type is a bitwise OR of exactly one of the following values:

    CSOUND_CONTROL_CHANNEL - control data (one MYFLT value)
    CSOUND_AUDIO_CHANNEL   - audio data (ksmps MYFLT values)
    CSOUND_STRING_CHANNEL  - string data (MYFLT values with enough space to store csoundGetChannelDatasize()
                                characters, including the NULL character at the end of the string)

    and at least one of these:

    CSOUND_INPUT_CHANNEL   - when you need Csound to accept incoming values from a host
    CSOUND_OUTPUT_CHANNEL  - when you need Csound to send outgoing values to a host

If the call to `csoundGetChannelPtr()` is successful the function will return zero. If not, it will return a negative error code. We can now modify our previous code in order to send data from our application on a named software bus to an instance of Csound using `csoundGetChannelPtr()`.

    #include <stdio.h>
    #include <csound/csound.h>

    /* performance thread function prototype */
    uintptr_t csThread(void *clientData);

    /* userData structure declaration */
    typedef struct {
      int result;
      CSOUND *csound;
      int PERF_STATUS;
    } userData;

    /*-----------------------------------------------------------
     * main function
     *-----------------------------------------------------------*/
    int main(int argc, char *argv[])
    {
      int userInput = 200;
      void *ThreadID;
      userData *ud;
      ud = (userData *)malloc(sizeof(userData));
      MYFLT *pvalue;
      ud->csound = csoundCreate(NULL);
      ud->result = csoundCompile(ud->csound, argc, argv);
      if (csoundGetChannelPtr(ud->csound, &pvalue, "pitch",
              CSOUND_INPUT_CHANNEL | CSOUND_CONTROL_CHANNEL) != 0) {
        printf("csoundGetChannelPtr could not get the \"pitch\" channel");
        return 1;
      }
      if (!ud->result) {
        ud->PERF_STATUS = 1;
        ThreadID = csoundCreateThread(csThread, (void*)ud);
      }
      else {
        printf("csoundCompiled returned an error");
        return 1;
      }
      printf("\nEnter a pitch in Hz(0 to Exit) and type return\n");
      while (userInput != 0) {
        *pvalue = (MYFLT)userInput;
        scanf("%d", &userInput);
      }
      ud->PERF_STATUS = 0;
      csoundDestroy(ud->csound);
      free(ud);
      return 0;
    }

    /*-----------------------------------------------------------
     * definition of our performance thread function
     *-----------------------------------------------------------*/
    uintptr_t csThread(void *data)
    {
      userData *udata = (userData *)data;
      if (!udata->result) {
        while ((csoundPerformKsmps(udata->csound) == 0) &&
               (udata->PERF_STATUS == 1));
        csoundDestroy(udata->csound);
      }
      udata->PERF_STATUS = 0;
      return 1;
    }

There are several ways of sending data to and from Csound through software buses. They are divided in two categories:


### Named Channels with no Callback

This category uses `csoundGetChannelPtr()` to get a pointer to the data of the named channel. There are also six functions to send data to and from a named channel in a thread safe way:

    MYFLT csoundGetControlChannel(CSOUND *csound, const char *name, int *err)
    void csoundSetControlChannel(CSOUND *csound, const char *name, MYFLT val)
    void csoundGetAudioChannel(CSOUND *csound, const char *name, MYFLT *samples)
    void csoundSetAudioChannel(CSOUND *csound, const char *name, MYFLT *samples)
    void csoundGetStringChannel(CSOUND *csound, const char *name, char *string)
    void csoundSetStringChannel(CSOUND *csound, const char *name, char *string)



The opcodes concerned are `chani`, `chano`, `chnget` and `chnset`. When using numbered channels with `chani` and `chano`, the API sees those channels as named channels, the name being derived from the channel number (i.e. 1 gives "1", 17 gives "17", etc).

There is also a helper function returning the data size of a named channel:

    int csoundGetChannelDatasize(CSOUND *csound, const char *name)

It is particularly useful when dealing with string channels.


### Named Channels with Callback

Each time a named channel with callback is used (opcodes `invalue`, `outvalue`, `chnrecv`, and `chnsend`), the corresponding callback registered by one of those functions will be called:

    void csoundSetInputChannelCallback(CSOUND *csound, channelCallback_t inputChannelCalback)
    void csoundSetOutputChannelCallback(CSOUND *csound, channelCallback_t outputChannelCalback)


### Other Channel Functions

    int csoundSetPvsChannel(CSOUND *, const PVSDATEXT *fin, const char *name), and
    int csoundGetPvsChannel(CSOUND *csound, PVSDATEXT *fout, const char *name)

    int csoundSetControlChannelHints(CSOUND *, const char *name, controlChannelHints_t hints), and
    int csoundGetControlChannelHints(CSOUND *, const char *name, controlChannelHints_t *hints)

    int *csoundGetChannelLock(CSOUND *, const char *name)
    int csoundKillInstance(CSOUND *csound, MYFLT instr, char *instrName, int mode, int allow_release)
        kills off one or more running instances of an instrument.

    int csoundRegisterKeyboardCallback(CSOUND *,
                                        int (*func)(void *userData, void *p, unsigned int type),
                                        void *userData, unsigned int type), and
    void csoundRemoveKeyboardCallback(CSOUND *csound,
                                        int (*func)(void *, void *, unsigned int))
        replace csoundSetCallback() and csoundRemoveCallback().


## Score Events

Adding score events to the csound instance is easy to do. It requires that csound has its threading done, see the paragraph above on threading. To enter a score event into csound, one calls the following function:

    void myInputMessageFunction(void *data, const char *message)
    {
      userData *udata = (userData *)data;
      csoundInputMessage(udata->csound, message );
    }

Now we can call that function to insert Score events into a running csound instance. The formatting of the message should be the same as one would normally have in the Score part of the .csd file. The example shows the format for the message. Note that if you're allowing csound to print its error messages, if you send a malformed message, it will warn you. Good for debugging. There's an example with the csound source code that allows you to type in a message, and then it will send it.

    /*                     instrNum  start  duration   p4   p5   p6  ... pN */
    const char *message = "i1        0      1          0.5  0.3  0.1";
    myInputMessageFunction((void*)udata, message);



## Callbacks

Csound can call subroutines declared in the host program when some special events occur. This is done through the callback mechanism. One has to declare to Csound the existence of a callback routine using an API setter function. Then when a corresponding event occurs during performance, Csound will call the host callback routine, eventually passing some arguments to it.

The example below shows a very simple command line application allowing the user to rewind the score or to abort the performance. This is achieved by reading characters from the keyboard: 'r' for rewind and 'q' for quit. During performance, Csound executes a loop. Each pass in the loop yields ksmps audio frames. Using the API `csoundSetYieldCallback()` function, we can tell to Csound to call our own routine after each pass in its internal loop.

The yieldCallback routine must be non-blocking. That's why it is a bit tricky to force the C `getc` function to be non-blocking. To enter a character, you have to type the character and then hit the return key.

    #include <csound/csound.h>

    int yieldCallback(CSOUND *csound)
    {
      int fd, oldstat, dummy;
      char ch;

      fd = fileno(stdin);
      oldstat = fcntl(fd, F_GETFL, dummy);
      fcntl(fd, F_SETFL, oldstat | O_NDELAY);
      ch = getc(stdin);
      fcntl(fd, F_SETFL, oldstat);
      if (ch == -1)
        return 1;
      switch (ch) {
      case 'r':
        csoundRewindScore(csound);
        break;
      case 'q':
        csoundStop(csound);
        break;
      }
      return 1;
    }

    int main(int argc, char **argv)
    {
      CSOUND *csound = csoundCreate(NULL);
      csoundSetYieldCallback(csound, yieldCallback);
      int result = csoundCompile(csound, argc, argv);
      if (result == 0) {
        result = csoundPerform(csound);
      }
      csoundDestroy(csound);
      return (result >= 0 ? 0 : result);
    }

The user can also set callback routines for file open events, real-time audio events, real-time MIDI events, message events, keyboards events, graph events,  and channel invalue and outvalue events.

## CsoundPerformanceThread: A Swiss Knife for the API

Beside the API, Csound provides a helper C++ class to facilitate threading issues: `CsoundPerformanceThread`. This class performs a score in a separate thread, allowing the host program to do its own processing in its main thread during the score performance. The host program will communicate with the `CsoundPerformanceThread` class by sending messages to it, calling `CsoundPerformanceThread` methods. Those messages are queued inside `CsoundPerformanceThread` and are treated in a first in first out (FIFO) manner.

The example below is equivalent to the example in the callback section. But this time, as the characters are read in a different thread, there is no need to have a non-blocking character reading routine.

    #include <csound/csound.hpp>
    #include <csound/csPerfThread.hpp>

    #include <iostream>
    using namespace std;

    int main(int argc, char **argv)
    {
      Csound *cs = new Csound();
      int result = cs->Compile(argc, argv);
      if (result == 0) {
        CsoundPerformanceThread *pt = new CsoundPerformanceThread(cs);
        pt->Play();
        while (pt->GetStatus() == 0) {
          char c = cin.get();
          switch (c) {
          case 'r':
            cs->RewindScore();
            break;
          case 'q':
            pt->Stop();
            pt->Join();
            break;
          }
        }
      }
      return (result >= 0 ? 0 : result);
    }

Because `CsoundPerformanceThread` is not part of the API, we have to link to libcsnd6 to get it working:

    g++ -DUSE_DOUBLE -o perfThread perfThread.cpp -lcsound64 -lcsnd6

When using this class from Python or Java, this is not an issue because the ctcsound.py module and the csnd6.jar package include the API functions and classes, and the `CsoundPerformanceThread` class as well (see below).

Here is a more complete example which could be the base of a frontal application to run Csound. The host application is modeled through the `CsoundSession` class which has its own event loop (mainLoop). `CsoundSession` inherits from the API `Csound` class and it embeds an object of type `CsoundPerformanceThread`. Most of the `CsoundPerformanceThread` class methods are used.

    #include <csound/csound.hpp>
    #include <csound/csPerfThread.hpp>

    #include <iostream>
    #include <string>
    using namespace std;

    class CsoundSession : public Csound
    {
    public:
      CsoundSession(string const &csdFileName = "") : Csound() {
        m_pt = NULL;
        m_csd = "";
        if (!csdFileName.empty()) {
          m_csd = csdFileName;
          startThread();
        }
      };

      void startThread() {
        if (Compile((char *)m_csd.c_str()) == 0 ) {
          m_pt = new CsoundPerformanceThread(this);
          m_pt->Play();
        }
      };

      void resetSession(string const &csdFileName) {
        if (!csdFileName.empty())
          m_csd = csdFileName;
        if (!m_csd.empty()) {
          stopPerformance();
          startThread();
        }
      };

      void stopPerformance() {
        if (m_pt) {
          if (m_pt->GetStatus() == 0)
            m_pt->Stop();
          m_pt->Join();
          m_pt = NULL;
        }
        Reset();
      };

      void mainLoop() {
        string s;
        bool loop = true;
        while (loop) {
          cout << endl << "l)oad csd; e(vent; r(ewind; t(oggle pause; s(top; p(lay; q(uit: ";
          char c = cin.get();
          switch (c) {
          case 'l':
            cout << "Enter the name of csd file:";
            cin >> s;
            resetSession(s);
            break;
          case 'e':
            cout << "Enter a score event:";
            cin.ignore(1000, '\n'); //a bit tricky, but well, this is C++!
            getline(cin, s);
            m_pt->InputMessage(s.c_str());
            break;
          case 'r':
            RewindScore();
            break;
          case 't':
            if (m_pt)
              m_pt->TogglePause();
            break;
          case 's':
            stopPerformance();
            break;
          case 'p':
            resetSession("");
            break;
          case 'q':
            if (m_pt) {
              m_pt->Stop();
              m_pt->Join();
            }
            loop = false;
            break;
          }
          cout << endl;
        }
      };

    private:
      string m_csd;
      CsoundPerformanceThread *m_pt;
    };

    int main(int argc, char **argv)
    {
      string csdName = "";
      if (argc > 1)
        csdName = argv[1];
      CsoundSession *session = new CsoundSession(csdName);
      session->mainLoop();
    }

 The application is built with the following command:

    g++ -o csoundSession csoundSession.cpp -lcsound64 -lcsnd6

There are also methods in `CsoundPerformanceThread` for sending score events (`ScoreEvent`), for moving the time pointer (`SetScoreOffsetSeconds`), for setting a callback function (`SetProcessCallback`) to be called at the end of each pass in the process loop, and for flushing the message queue (`FlushMessageQueue`).

As an exercise, the user should complete this example using the methods above and then try to rewrite the example in Python and/or in Java (see below).

##Csound API Review

The best source of information is the csound.h header file. Let us review some important API functions in a C++ example:

    #include <csound/csound.hpp>
    #include <csound/csPerfThread.hpp>

    #include <iostream>
    #include <string>
    #include <vector>
    using namespace std;

    string orc1 =
    "instr 1              \n"
    "idur = p3            \n"
    "iamp = p4            \n"
    "ipch = cpspch(p5)    \n"
    "kenv linen  iamp, 0.05, idur, 0.1 \n"
    "a1   poscil kenv, ipch \n"
    "     out    a1         \n"
    "endin";

    string orc2 =
    "instr 1    \n"
    "idur = p3  \n"
    "iamp = p4  \n"
    "ipch = cpspch(p5)  \n"
    "a1 foscili iamp, ipch, 1, 1.5, 1.25  \n"
    "   out     a1      \n"
    "endin\n";

    string orc3 =
    "instr 1    \n"
    "idur = p3  \n"
    "iamp = p4  \n"
    "ipch = cpspch(p5-1)         \n"
    "kenv  linen    iamp, 0.05, idur, 0.1  \n"
    "asig  rand     0.45         \n"
    "afilt moogvcf2 asig, ipch*4, ipch/(ipch * 1.085)  \n"
    "asig  balance  afilt, asig  \n"
    "      out      kenv*asig    \n"
    "endin\n";

    string sco1 =
    "i 1 0 1    0.5 8.00\n"
    "i 1 + 1    0.5 8.04\n"
    "i 1 + 1.5  0.5 8.07\n"
    "i 1 + 0.25 0.5 8.09\n"
    "i 1 + 0.25 0.5 8.11\n"
    "i 1 + 0.5  0.8 9.00\n";

    string sco2 =
    "i 1 0 1    0.5 9.00\n"
    "i 1 + 1    0.5 8.07\n"
    "i 1 + 1    0.5 8.04\n"
    "i 1 + 1    0.5 8.02\n"
    "i 1 + 1    0.5 8.00\n";

    string sco3 =
    "i 1 0 0.5  0.5 8.00\n"
    "i 1 + 0.5  0.5 8.04\n"
    "i 1 + 0.5  0.5 8.00\n"
    "i 1 + 0.5  0.5 8.04\n"
    "i 1 + 0.5  0.5 8.00\n"
    "i 1 + 0.5  0.5 8.04\n"
    "i 1 + 1.0  0.8 8.00\n";

    void noMessageCallback(CSOUND* cs, int attr, const char *format, va_list valist)
    {
      // Do nothing so that Csound will not print any message,
      // leaving a clean console for our app
      return;
    }

    class CsoundSession : public Csound
    {
    public:
      CsoundSession(vector<string> & orc, vector<string> & sco) : Csound() {
        m_orc = orc;
        m_sco = sco;
        m_pt = NULL;
      };

      void mainLoop() {
        SetMessageCallback(noMessageCallback);
        SetOutput((char *)"dac", NULL, NULL);
        GetParams(&m_csParams);
        m_csParams.sample_rate_override = 48000;
        m_csParams.control_rate_override = 480;
        m_csParams.e0dbfs_override = 1.0;
        // Note that setParams is called before first compilation
        SetParams(&m_csParams);
        if (CompileOrc(orc1.c_str()) == 0) {
          Start(this->GetCsound());
          // Just to be sure...
          cout << GetSr() << ", " << GetKr() << ", ";
          cout << GetNchnls() << ", " << Get0dBFS() << endl;
          m_pt = new CsoundPerformanceThread(this);
          m_pt->Play();
        }
        else {
          return;
        }

        string s;
        TREE *tree;
        bool loop = true;
        while (loop) {
          cout << endl << "1) 2) 3): orchestras, 4) 5) 6): scores; q(uit: ";
          char c = cin.get();
          cin.ignore(1, '\n');
          switch (c) {
          case '1':
            tree = ParseOrc(m_orc[0].c_str());
            CompileTree(tree);
            DeleteTree(tree);
            break;
          case '2':
            CompileOrc(m_orc[1].c_str());
            break;
          case '3':
            EvalCode(m_orc[2].c_str());
            break;
          case '4':
            ReadScore((char *)m_sco[0].c_str());
            break;
          case '5':
            ReadScore((char *)m_sco[1].c_str());
            break;
          case '6':
            ReadScore((char *)m_sco[2].c_str());
            break;
          case 'q':
            if (m_pt) {
              m_pt->Stop();
              m_pt->Join();
            }
            loop = false;
            break;
          }
        }
      };

    private:
      CsoundPerformanceThread *m_pt;
      CSOUND_PARAMS m_csParams;
      vector<string> m_orc;
      vector<string> m_sco;
    };

    int main(int argc, char **argv)
    {
      vector<string> orc;
      orc.push_back(orc1);
      orc.push_back(orc2);
      orc.push_back(orc3);
      vector<string> sco;
      sco.push_back(sco1);
      sco.push_back(sco2);
      sco.push_back(sco3);
      CsoundSession *session = new CsoundSession(orc, sco);
      session->mainLoop();
    }

## Deprecated Functions

    csoundQueryInterface()
    csoundSetInputValueCallback()
    csoundSetOutputValueCallback()
    csoundSetChannelIOCallback()
    csoundPerformKsmpsAbsolute()

are still in the header file but are now deprecated.

## Builtin Wrappers

The Csound API has also been wrapped to other languages. Usually Csound is built and distributed including a wrapper for Python and a wrapper for Java.

To use the Python Csound API wrapper, you have to import the ctcsound module. The ctcsound module is normally installed in the site-packages or dist-packages directory of your python distribution as a ctcsound.py file. Our csound command example becomes:

    import sys
    import ctcsound

    cs = ctcsound.Csound()
    result = cs.compile_(sys.argv)
    if result == 0:
        result = cs.perform()
    cs.cleanup()
    del cs
    sys.exit(result)

We use a Csound object (remember Python has OOp features). Note the use of the `sys.argv` list to get the program input arguments.

This example would be launched with the following command:

    python csoundCommand.py myexample.csd

To use the Java Csound API wrapper, you have to import the csnd6 package. The csnd6 package is located in the csnd6.jar archive which has to be known from your Java path. Our csound command example becomes:

    import csnd6.*;

    public class CsoundCommand
    {
      private Csound csound = null;
      private CsoundArgVList arguments = null;

      public CsoundCommand(String[] args) {
        csound = new Csound();
        arguments = new CsoundArgVList();
        arguments.Append("dummy");
        for (int i = 0; i < args.length; i++) {
          arguments.Append(args[i]);
        }
        int result = csound.Compile(arguments.argc(), arguments.argv());
        if (result == 0) {
          result = csound.Perform();
        }
        System.out.println(result);
      }


      public static void main(String[] args) {
        CsoundCommand csCmd = new CsoundCommand(args);
      }
    }

Note the "dummy" string as first argument in the arguments list. C, C++ and Python expect that the first argument in a program argv input array is implicitly the name of the calling program. This is not the case in Java: the first location in the program argv input array contains the first command line argument if any.  So we have to had this "dummy" string value in the first location of the arguments array so that the C API function called by our csound.Compile method is happy.
This illustrates a fundamental point about the Csound API. Whichever API wrapper is used (C++, Python, Java, etc), it is the C API which is working under the hood. So a thorough knowledge of the Csound C API is highly recommended if you plan to use the Csound API in any of its different flavours.

On our linux system, with csnd.jar located in /usr/local/lib/, our Java Program would be compiled and run with the following commands:

    javac -cp /usr/local/lib/csnd6.jar CsoundCommand.java
    java -cp /usr/local/lib/csnd6.jar:. CsoundCommand

There is a drawback using the java wrappers: as it is built during the Csound build, the host system on which Csound will be used must have the same version of Java than the one which were on the system used to build Csound. The mechanism presented in the next section can solve this problem.

## Foreign Function Interfaces

Modern programming languages often propose a mechanism called Foreign Function Interface (FFI) which allows the user to write an interface to shared libraries written in C.

Python provides the ctypes module which is used by the ctcsound.py module.

Lua proposes the same functionality through the LuaJIT project. Here is a version of the csound command using LuaJIT FFI:

    -- This is the wrapper part defining our LuaJIT interface to
    -- the Csound API functions that we will use, and a helper function
    -- called csoundCompile, which makes a pair of C argc, argv arguments from
    -- the script input args and calls the API csoundCompile function
    -- This wrapper could be written in a separate file and imported
    -- in the main program.

    local ffi = require("ffi")
    ffi.cdef[[
    typedef void CSOUND;
    CSOUND *csoundCreate(void *hostData);
    int csoundCompile(CSOUND *, int argc, const char *argv[]);
    int csoundPerform(CSOUND *);
    void csoundDestroy(CSOUND *);
    ]]

    csoundAPI = ffi.load("csound64.so")

    string_array_t = ffi.typeof("const char *[?]")

    function csoundCompile(csound, args)
      local argv = {"dummy"}
      for i, v in ipairs(args) do
        argv[i+1] = v
      end
      local cargv = string_array_t(#argv + 1, argv)
      cargv[#argv] = nil
      return csoundAPI.csoundCompile(csound, #argv, cargv)
    end

    -- This is the Csound commandline program using the wrapper interface
    csound = csoundAPI.csoundCreate(nil)
    result = csoundCompile(csound, {...})
    if result == 0 then
      csoundAPI.csoundPerform(csound)
    end
    csoundAPI.csoundDestroy(csound)

The FFI package of the Google Go programming language is called cgo. Here is a version of the csound command using cgo:

    package main

    /* This is the wrapper part defining our Go interface to
       the Csound API functions that we will use. It uses the go object
       model building methods that will call the corresponding API functions.
       This wrapper could be written in a separate file and imported
       in the main program.
    */

    /*
    #cgo CFLAGS: -DUSE_DOUBLE=1
    #cgo CFLAGS: -I /usr/local/include
    #cgo linux CFLAGS: -DLINUX=1
    #cgo LDFLAGS: -lcsound64

    #include <csound/csound.h>
    */
    import "C"

    import (
	    "os"
	    "unsafe"
    )

    type CSOUND struct {
	    Cs (*C.CSOUND)
    }

    type MYFLT float64

    func CsoundCreate(hostData unsafe.Pointer) CSOUND {
	    var cs (*C.CSOUND)
	    if hostData != nil {
		    cs = C.csoundCreate(hostData)
	    } else {
		    cs = C.csoundCreate(nil)
	    }
	    return CSOUND{cs}
    }

    func (csound CSOUND) Compile(args []string) int {
	    argc := C.int(len(args))
	    argv := make([]*C.char, argc)
	    for i, arg := range args {
		    argv[i] = C.CString(arg)
	    }
	    result := C.csoundCompile(csound.Cs, argc, &argv[0])
	    for _, arg := range argv {
		    C.free(unsafe.Pointer(arg))
	    }
	    return int(result)
    }

    func (csound CSOUND) Perform() int {
	    return int(C.csoundPerform(csound.Cs))
    }

    func (csound *CSOUND) Destroy() {
	    C.csoundDestroy(csound.Cs)
	    csound.Cs = nil
    }

    // This is the Csound commandline program using the wrapper interface
    func main() {
	    csound := CsoundCreate(nil)
	    if result := csound.Compile(os.Args); result == 0 {
		    csound.Perform()
	    }
	    csound.Destroy()
    }

A complete wrapper to the Csound API written in Go is available at the
[Go-Csnd projekt](https://github.com/fggp/go-csnd) on github.

The different examples in this section are written for Linux. For other operating systems, some adaptations are needed: for example, for Windows the library name suffix is .dll instead of .so.

The advantage of FFI over Builtin Wrappers is that as long as the signatures of the functions in the interface are the same than the ones in the API, it will work without caring about the version number of the foreign programming language used to write the host program. Moreover, one needs to include in the interface only the functions used in the host program. However a good understanding of the C language low level features is needed to write the helper functions needed to adapt the foreign language data structures to the C pointer system.


## References & Links

[Csound API Docs](https://csound.com/docs/api/index.html)

[Csound API Examples](https://github.com/csound/csoundAPI_examples)

[ctcsound Docs](https://csound.com/docs/ctcsound)

Rory Walsh 2006, Developing standalone applications using the Csound Host API and wxWidgets,
[Csound Journal Volume 1 Issue 4 - Summer 2006](http://csoundjournal.com/2006summer/wxCsound.html)

Rory Walsh 2010, Developing Audio Software with the Csound Host API,  The Audio Programming Book, DVD Chapter 35, The MIT Press

François Pinot 2011, Real-time Coding Using the Python API: Score Events, [Csound Journal Issue 14 - Winter 2011](http://csoundjournal.com/issue14/realtimeCsoundPython.html)

François Pinot 2014, "Go Binding for Csound6",
<https://github.com/fggp/go-csnd>


