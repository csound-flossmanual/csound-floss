# 12 A. THE CSOUND API

The Csound application programming interface (API) lets a host program
compile instruments, run performances, and exchange data with Csound.
The core API uses C functions. Wrappers and foreign function interfaces
let other languages call those functions.

Each Csound instance has an opaque `CSOUND *` pointer: the host passes
it to API functions without accessing the instance's internal fields.

The examples in this chapter use the Csound 7 host API.
Use headers and a library from the same Csound 7 installation.
On Linux, include csound.h and link with libcsound64 for double-precision
samples, or libcsound for single-precision samples. This precision is
separate from the processor's 32-bit or 64-bit architecture.
Here is a simple command-line host written in C:

```c
#include <csound/csound.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
  CSOUND *csound = csoundCreate(NULL, NULL);
  if (csound == NULL) return 1;
  const char **args = malloc(argc * sizeof(*args));
  if (args == NULL) {
    csoundDestroy(csound);
    return 1;
  }
  for (int i = 0; i < argc; ++i) args[i] = argv[i];
  int result = csoundCompile(csound, argc, args);
  free(args);
  if (result == 0) {
    result = csoundStart(csound);
  }
  if (result != 0) {
    csoundDestroy(csound);
    return 1;
  }
  while ((result = csoundPerformKsmps(csound)) == 0) {
    /* Perform one control block at a time. */
  }
  int failed = (result < 0 || csoundErrCnt(csound) > 0);
  csoundDestroy(csound);
  return failed;
}
```

First we create an instance of Csound.
`csoundCreate(NULL, NULL)` uses no host data and the default opcode directory.
It returns the opaque pointer passed to most Csound API functions.
We copy the command-line string pointers into the `const char *` array
expected by `csoundCompile()`, then compile the input files.
After a successful compilation, we must call `csoundStart()`.
Each call to `csoundPerformKsmps()` then performs one control block.
It returns zero to continue and a non-zero value when performance ends.
We also check `csoundErrCnt()` because an error can abort an instrument
without stopping the whole score. We destroy the instance on every exit path.
The [Csound 7 API migration guide](https://github.com/csound/csound/blob/develop/docs/API_Migration_Guide_Csound_6_to_7.md)
describes this lifecycle and the removal of `csoundPerform()`.

On Linux, with the include and library paths set, build against the
double-precision library as follows:

```none
gcc -std=c99 -o csoundCommand csoundCommand.c -lcsound64
```

For a single-precision library build:

```none
gcc -std=c99 -o csoundCommand csoundCommand.c -lcsound
```

The sample type used by the host must match the library's sample precision.
Csound 7 calls this type `cs_float`; `MYFLT` remains an alias.
The installed `float-version.h` selects the library's numeric types.
See the [numeric types guide](https://github.com/csound/csound/blob/develop/docs/numeric-types.md)
for the build options.

The C API has been wrapped in a C++ class for convenience.
This gives the Csound basic C++ API. With this API, the above example would become:

```cpp
#include <csound/csound.hpp>
#include <vector>

int main(int argc, char **argv)
{
  Csound cs;
  if (cs.GetCsound() == nullptr) return 1;
  std::vector<const char *> args(argv, argv + argc);
  int result = cs.Compile(argc, args.data());
  if (result == 0) {
    result = cs.Start();
  }
  if (result != 0) return 1;
  while ((result = cs.PerformKsmps()) == 0) {
    /* Perform one control block at a time. */
  }
  return (result < 0 || csoundErrCnt(cs.GetCsound()) > 0);
}
```

Here, we create a local Csound object and call its methods instead of C functions.
The vector supplies the string pointers expected by `Compile()`.
`GetCsound()` gives access to the C API's error-count check.
When `main` returns, the object's destructor calls `csoundDestroy()`,
so we do not need to call it ourselves. A raw pointer created with `new`
would instead need a matching `delete` to run that destructor. On Linux,
the example would be built with the following command:

```none
g++ -std=c++11 -o csoundCommandCpp csoundCommand.cpp -lcsound64
```

## Threading

A host can run Csound's performance loop in a worker thread while its
main thread reads input or draws a user interface. Threads are one way
to do this; a host can also process events between calls to
`csoundPerformKsmps()`, or call it from an audio callback.

Csound 7 declares its thread functions in `csound_threads.h`. The worker
takes a `void *` argument and returns a `uintptr_t` value:

```c
void *csoundCreateThread(uintptr_t (*threadRoutine)(void *),
                         void *userdata);
uintptr_t csoundJoinThread(void *thread);
```

The following host accepts a CSD filename. Its worker performs control
blocks until the score ends, an error stops performance, or the main
thread sets the stop flag. The C11 atomic flag lets both threads access
that flag safely. Only the main thread destroys Csound, after joining
the worker. The shared `UserData` stays alive until that join completes.

```c
#include <csound/csound.h>
#include <csound/csound_threads.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stdio.h>

typedef struct {
  CSOUND *csound;
  atomic_bool stop;
} UserData;

static uintptr_t perform(void *data)
{
  UserData *ud = data;
  int result = 0;
  while (!atomic_load(&ud->stop) && result == 0) {
    result = csoundPerformKsmps(ud->csound);
  }
  return (result < 0 || csoundErrCnt(ud->csound) > 0);
}

int main(int argc, char **argv)
{
  if (argc != 2) {
    fprintf(stderr, "Usage: %s file.csd\n", argv[0]);
    return 1;
  }
  CSOUND *csound = csoundCreate(NULL, NULL);
  if (csound == NULL) return 1;
  if (csoundCompileCSD(csound, argv[1], 0, 0) != 0 ||
      csoundStart(csound) != 0) {
    csoundDestroy(csound);
    return 1;
  }
  UserData ud = {.csound = csound};
  atomic_init(&ud.stop, false);
  void *thread = csoundCreateThread(perform, &ud);
  if (thread == NULL) {
    csoundDestroy(csound);
    return 1;
  }
  puts("Press Enter to stop.");
  getchar();
  atomic_store(&ud.stop, true);
  int failed = (int)csoundJoinThread(thread);
  csoundDestroy(csound);
  return failed;
}
```

Build and run it on Linux with a C11 compiler:

```none
gcc -std=c11 -o threadedHost threadedHost.c -lcsound64
./threadedHost myexample.csd
```

Use the CSD's `CsOptions` to choose audio output. This simple host waits
for Enter or end of input even if the score has already finished.
It also checks thread creation and joins the worker before returning.

## Channel I/O

Named channels let a host and an orchestra exchange control values,
audio blocks, strings, and other data. For example, this CSD reads a
frequency from the `pitch` channel:

```csound
<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1
  kPitch chnget "pitch"
  aSignal poscil 0.1, kPitch
  out aSignal
endin
</CsInstruments>
<CsScore>
i 1 0 3600
</CsScore>
</CsoundSynthesizer>
```

In Csound 7, `csoundGetChannelPtr()` takes a `void **` for the returned
pointer. Its type argument combines a data type, such as
`CSOUND_CONTROL_CHANNEL`, with `CSOUND_INPUT_CHANNEL` and/or
`CSOUND_OUTPUT_CHANNEL`. Input means data sent from the host to Csound.
Output means data sent from Csound to the host.

The function returns zero on success. A negative result reports an error;
a positive result reports an existing channel with an incompatible type.
The returned pointer refers to one `cs_float` for a control channel,
`ksmps` samples for an audio channel, or a `STRINGDAT` for a string channel.
Direct access through that pointer needs synchronization during threaded
performance. The channel get/set functions below handle that for us.

Save the CSD above as `pitch.csd`. This host checks the channel type and
sets its value with `csoundSetControlChannel()`. The worker and its stop
flag follow the same pattern as the previous example:

```c
#include <csound/csound.h>
#include <csound/csound_threads.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stdio.h>

typedef struct {
  CSOUND *csound;
  atomic_bool stop;
} UserData;

static uintptr_t perform(void *data)
{
  UserData *ud = data;
  int result = 0;
  while (!atomic_load(&ud->stop) && result == 0) {
    result = csoundPerformKsmps(ud->csound);
  }
  return (result < 0 || csoundErrCnt(ud->csound) > 0);
}

int main(int argc, char **argv)
{
  if (argc != 2) {
    fprintf(stderr, "Usage: %s file.csd\n", argv[0]);
    return 1;
  }
  CSOUND *csound = csoundCreate(NULL, NULL);
  if (csound == NULL) return 1;
  if (csoundCompileCSD(csound, argv[1], 0, 0) != 0 ||
      csoundStart(csound) != 0) {
    csoundDestroy(csound);
    return 1;
  }
  void *channel = NULL;
  int type = CSOUND_CONTROL_CHANNEL | CSOUND_INPUT_CHANNEL;
  if (csoundGetChannelPtr(csound, &channel, "pitch", type) != 0) {
    csoundDestroy(csound);
    return 1;
  }
  csoundSetControlChannel(csound, "pitch", 200);
  UserData ud = {.csound = csound};
  atomic_init(&ud.stop, false);
  void *thread = csoundCreateThread(perform, &ud);
  if (thread == NULL) {
    csoundDestroy(csound);
    return 1;
  }
  char line[128];
  puts("Enter a pitch in Hz, or 0 to stop.");
  while (fgets(line, sizeof(line), stdin) != NULL) {
    double pitch;
    if (sscanf(line, "%lf", &pitch) != 1) continue;
    if (pitch == 0) break;
    if (pitch > 0 && pitch < csoundGetSr(csound) / 2) {
      csoundSetControlChannel(csound, "pitch", (cs_float)pitch);
    }
  }
  atomic_store(&ud.stop, true);
  int failed = (int)csoundJoinThread(thread);
  csoundDestroy(csound);
  return failed;
}
```

```none
gcc -std=c11 -o channelHost channelHost.c -lcsound64
./channelHost pitch.csd
```

### Named Channels with no Callback

These functions copy channel data in a thread-safe way:

```c
cs_float csoundGetControlChannel(CSOUND *csound, const char *name,
                                int32_t *err);
void csoundSetControlChannel(CSOUND *csound, const char *name,
                             cs_float value);
void csoundGetAudioChannel(CSOUND *csound, const char *name,
                           cs_float *samples);
void csoundSetAudioChannel(CSOUND *csound, const char *name,
                           const cs_float *samples);
void csoundGetStringChannel(CSOUND *csound, const char *name,
                            char *string);
void csoundSetStringChannel(CSOUND *csound, const char *name,
                            const char *string);
```

Audio buffers must hold at least `ksmps` samples. For strings,
`csoundGetChannelDatasize()` reports the required buffer size in bytes.
A string can grow during performance, so a size query followed by a copy
also needs coordination with the writer. Reading between control blocks
in the performance thread avoids that race.

Use `chnget` and `chnset` in the orchestra. The numbered channels used by
`chani` and `chano` appear in the API as names such as `"1"` and `"17"`.

### Named Channels with Callback

The `invalue` and `outvalue` opcodes call host functions registered with:

```c
void csoundSetInputChannelCallback(CSOUND *csound,
                                   channelCallback_t callback);
void csoundSetOutputChannelCallback(CSOUND *csound,
                                    channelCallback_t callback);
```

The callback receives the channel name, a value pointer, and type
information. It must handle the channel's data type and return promptly,
since Csound may call it from the performance thread.

### Other Channel Functions

Csound 7 also provides array and spectral channels. Use
`csoundInitArrayChannel()` or `csoundInitPvsChannel()` to set them up.
The PVS copy functions use `PVSDAT`, with the channel name before the
data pointer:

```c
int32_t csoundSetPvsChannel(CSOUND *csound, const char *name,
                           const PVSDAT *data);
int32_t csoundGetPvsChannel(CSOUND *csound, const char *name,
                           PVSDAT *data);
```

`csoundSetControlChannelHints()` and `csoundGetControlChannelHints()`
store and retrieve metadata such as a control's range. Release attributes
returned by the getter with `csoundDeleteControlChannelHints()`.
For direct channel access, Csound 7 provides `csoundLockChannel()` and
`csoundUnlockChannel()`. Follow the rules for each data type in
[csound.h](https://github.com/csound/csound/blob/develop/include/csound.h).

## Score Events

Csound 7 uses `csoundEventString()` for text events and `csoundEvent()`
for numeric p-fields. A host can send events between control blocks,
or queue them from another thread by setting the final `async` argument
to 1. For example, given a running `CSOUND *csound`:

```c
/* Instrument 1, no delay, one second, p4 = 0.5, p5 = 440. */
csoundEventString(csound, "i 1 0 1 0.5 440", 1);

/* The same event as numeric p-fields. */
cs_float fields[] = {1, 0, 1, 0.5, 440};
csoundEvent(csound, CS_INSTR_EVENT, fields, 5, 1);
```

These are two alternatives; calling both schedules two notes. During
performance, p2 is a delay from the time Csound inserts the event.
Call `csoundStart()` before sending these events; numeric events sent
before that call have no effect. Use explicit start times for live events
rather than relying on score-file carry notation such as `+`.
The receiving instrument decides what p4 and later fields mean.

## Callbacks

A callback lets Csound call a host function when an event occurs. For
example, a message callback can route Csound's messages to a console or
log. This host adds a prefix and keeps the messages visible, including
errors:

```c
#include <csound/csound.h>
#include <stdarg.h>
#include <stdio.h>

static void message(CSOUND *csound, int attr, const char *format,
                    va_list args)
{
  (void)csound;
  (void)attr;
  fputs("[Csound] ", stderr);
  vfprintf(stderr, format, args);
}

int main(int argc, char **argv)
{
  if (argc != 2) return 1;
  CSOUND *csound = csoundCreate(NULL, NULL);
  if (csound == NULL) return 1;
  csoundSetMessageCallback(csound, message);
  int result = csoundCompileCSD(csound, argv[1], 0, 0);
  if (result == 0) result = csoundStart(csound);
  if (result != 0) {
    csoundDestroy(csound);
    return 1;
  }
  while ((result = csoundPerformKsmps(csound)) == 0) {}
  int failed = (result < 0 || csoundErrCnt(csound) > 0);
  csoundDestroy(csound);
  return failed;
}
```

Build this C host as in the first example. A real-time host should avoid
slow work in callbacks; console output here serves only to show the
mechanism. Csound 7 removes `csoundSetYieldCallback()`. To control each
block, put host work around `csoundPerformKsmps()`, or use the performance
thread's process callback.

Other callback groups have their own headers: `csound_files.h` for file
events, `csound_rtaudio.h` for audio, `csound_rtmidi.h` for MIDI, and
`csound_graph_display.h` for graphs.

## CsoundPerformanceThread

`CsoundPerformanceThread` runs the performance loop and queues commands
from the host. Csound 7 includes this C++ class in the main Csound library;
there is no separate `libcsnd6` dependency. Include `csound.hpp` before
`csPerfThread.hpp`.

Compile and start the Csound instance before creating the worker. The
worker begins paused; `Play()` starts processing. This host accepts `r`
to return to score time zero and `q` to quit. Press Enter after a command.
End of input also stops and joins the worker.

```cpp
#include <csound/csound.hpp>
#include <csound/csPerfThread.hpp>
#include <iostream>
#include <string>
#include <vector>

int main(int argc, char **argv)
{
  Csound cs;
  if (cs.GetCsound() == nullptr) return 1;
  std::vector<const char *> args(argv, argv + argc);
  if (cs.Compile(argc, args.data()) != 0 || cs.Start() != 0) return 1;
  CsoundPerformanceThread pt(cs.GetCsound());
  pt.Play();
  std::string command;
  std::cout << "r: rewind; q: quit" << std::endl;
  while (std::getline(std::cin, command)) {
    if (command == "q") break;
    if (command == "r") pt.SetScoreOffsetSeconds(0);
  }
  pt.Stop();
  int result = pt.Join();
  return (result < 0 || csoundErrCnt(cs.GetCsound()) > 0);
}
```

```none
g++ -std=c++11 -o perfThread perfThread.cpp -lcsound64
./perfThread myexample.csd
```

The input loop waits for `q` or end of input even after the score ends.
Rewinding seeks within an active performance; after the worker has
stopped, reset, compile, and start a new performance to play again.

The next host groups that lifecycle in a `CsoundSession` class. It owns
both objects, joins and deletes the worker before resetting Csound, and
checks for an active session before accepting events. A failed load does
not leave a worker behind. Commands and filenames each occupy one line.

```cpp
#include <csound/csound.hpp>
#include <csound/csPerfThread.hpp>
#include <iostream>
#include <memory>
#include <string>

class CsoundSession {
  Csound cs;
  std::unique_ptr<CsoundPerformanceThread> thread;
  std::string filename;
  bool failed = false;

public:
  ~CsoundSession() { stop(); }

  void stop()
  {
    if (thread) {
      thread->Stop();
      int result = thread->Join();
      failed |= (result < 0 || csoundErrCnt(cs.GetCsound()) > 0);
      thread.reset();
    }
    if (cs.GetCsound() != nullptr) cs.Reset();
  }

  void start(const std::string &name)
  {
    stop();
    if (!name.empty()) filename = name;
    if (filename.empty()) {
      std::cerr << "Load a CSD file first.\n";
      return;
    }
    if (cs.GetCsound() == nullptr ||
        cs.Compile(filename.c_str()) != 0 || cs.Start() != 0) {
      failed = true;
      return;
    }
    thread.reset(new CsoundPerformanceThread(cs.GetCsound()));
    thread->Play();
  }

  int mainLoop()
  {
    std::string command, value;
    std::cout << "l: load; e: event; r: rewind; t: pause/resume; "
                 "s: stop; p: replay; q: quit" << std::endl;
    while (std::getline(std::cin, command)) {
      if (command == "q") break;
      if (command == "l") {
        std::cout << "CSD filename: " << std::flush;
        if (!std::getline(std::cin, value)) break;
        start(value);
      } else if (command == "p") {
        start("");
      } else if (command == "s") {
        stop();
      } else if (command == "e" || command == "r" || command == "t") {
        if (!thread || thread->GetStatus() != 0) {
          std::cerr << "No active performance.\n";
          continue;
        }
        if (command == "e") {
          std::cout << "Score event: " << std::flush;
          if (!std::getline(std::cin, value)) break;
          thread->InputMessage(value.c_str());
        } else if (command == "r") {
          thread->SetScoreOffsetSeconds(0);
        } else {
          thread->TogglePause();
        }
      }
    }
    stop();
    return failed;
  }
};

int main(int argc, char **argv)
{
  CsoundSession session;
  if (argc > 1) session.start(argv[1]);
  return session.mainLoop();
}
```

```none
g++ -std=c++11 -o csoundSession csoundSession.cpp -lcsound64
./csoundSession myexample.csd
```

`InputMessage()` remains a method of `CsoundPerformanceThread`, although
Csound 7 removed the C function `csoundInputMessage()`. The thread class
also offers `ScoreEvent()`, `CompileOrc()`, and `SetProcessCallback()`.
The process callback runs before each control block. It must not wait
for keyboard input. `FlushMessageQueue()` waits for queued commands to
finish; call it from the host thread, never from the worker's callback.

## Csound API Review

This example changes instruments and sends score events during a
performance. It sets options before starting Csound, then uses the
performance thread's queue for both orchestra changes and events. Their
order matters: a new instrument must reach Csound before its notes.

```cpp
#include <csound/csound.hpp>
#include <csound/csPerfThread.hpp>
#include <iostream>
#include <string>

const char *orchestras[] = {
  R"(instr 1
    kEnv linen p4, 0.05, p3, 0.1
    aSignal poscil kEnv, cpspch(p5)
    out aSignal
  endin)",
  R"(instr 1
    kEnv linen p4, 0.05, p3, 0.1
    aSignal foscili kEnv, cpspch(p5), 1, 1.5, 1.25
    out aSignal
  endin)",
  R"(instr 1
    kEnv linen p4, 0.05, p3, 0.1
    aNoise rand 0.45
    aFilter moogvcf2 aNoise, cpspch(p5 - 1) * 4, 0.5
    aSignal balance aFilter, aNoise
    out kEnv * aSignal
  endin)"
};

const char *scores[] = {
  "i 1 0 1 0.5 8.00\ni 1 1 1 0.5 8.04\n"
  "i 1 2 1.5 0.5 8.07\ni 1 3.5 0.25 0.5 8.09\n"
  "i 1 3.75 0.25 0.5 8.11\ni 1 4 0.5 0.8 9.00\n",
  "i 1 0 1 0.5 9.00\ni 1 1 1 0.5 8.07\n"
  "i 1 2 1 0.5 8.04\ni 1 3 1 0.5 8.02\n"
  "i 1 4 1 0.5 8.00\n",
  "i 1 0 0.5 0.5 8.00\ni 1 0.5 0.5 0.5 8.04\n"
  "i 1 1 0.5 0.5 8.00\ni 1 1.5 0.5 0.5 8.04\n"
  "i 1 2 0.5 0.5 8.00\ni 1 2.5 0.5 0.5 8.04\n"
  "i 1 3 1 0.8 8.00\n"
};

int main(int argc, char **argv)
{
  Csound cs;
  if (cs.GetCsound() == nullptr) return 1;
  if (cs.SetOption("-odac") != 0) return 1;
  for (int i = 1; i < argc; ++i) {
    if (cs.SetOption(argv[i]) != 0) return 1;
  }
  const char *header = "sr=48000\nksmps=100\nnchnls=1\n0dbfs=1\n";
  std::string initial = std::string(header) + orchestras[0];
  if (cs.CompileOrc(initial.c_str()) != 0 || cs.Start() != 0) return 1;
  std::cout << cs.GetSr() << " Hz; " << cs.GetKr() << " blocks/s; "
            << cs.GetChannels() << " channel(s)\n";
  CsoundPerformanceThread pt(cs.GetCsound());
  pt.Play();
  std::cout << "1/2/3: instruments; 4/5/6: scores; q: quit" << std::endl;
  std::string command;
  while (std::getline(std::cin, command)) {
    if (command == "q") break;
    if (command.size() != 1) continue;
    char key = command[0];
    if (key >= '1' && key <= '3') {
      pt.CompileOrc(orchestras[key - '1']);
    } else if (key >= '4' && key <= '6') {
      pt.InputMessage(scores[key - '4']);
    }
  }
  pt.Stop();
  int result = pt.Join();
  return (result < 0 || csoundErrCnt(cs.GetCsound()) > 0);
}
```

Build with the same flags as the preceding C++ example. It uses the
audio device by default; pass `-n` to run without audio output. Starting
from orchestra text without a score lets it wait for host events until
the host stops it. Existing notes keep their instrument definition when
a new definition replaces it; later notes use the new definition.

## Removed Csound 6 Functions

Csound 7 removes several functions used by older hosts:

- Replace `csoundPerform()` with a loop over `csoundPerformKsmps()`.
- Instead of `csoundStop()`, end the host's performance loop.
- Replace `csoundCleanup()` with `csoundReset()` or `csoundDestroy()`.
- Replace `csoundInputMessage()` and `csoundReadScore()` with
  `csoundEventString()`.
- Replace `csoundSetParams()` and `csoundSetOutput()` with
  `csoundSetOption()`.
- Instead of `csoundSetYieldCallback()`, run host code between control
  blocks.

The thread class's `Stop()` method still exists: it sends a stop command
to that worker. See the
[migration guide](https://github.com/csound/csound/blob/develop/docs/API_Migration_Guide_Csound_6_to_7.md)
for changed signatures and functions moved to other headers.

## Builtin Wrappers

Use bindings built for the same Csound 7 API as the loaded library.
Package names and installation paths vary by system; a Csound 6 wrapper
does not become compatible just by loading a Csound 7 library.

### Python

The Csound 7 source includes `ctcsound.py`, which uses Python's `ctypes`
module and NumPy. Make the matching module available on Python's import
path. Its method names include `perform_ksmps()`, with an underscore.
`compile_()` takes separate arguments, so unpack the command-line list
with `*sys.argv`:

```python
import ctypes as ct
import sys
import ctcsound

# The wrapper does not yet expose an error-count method.
error_count = ctcsound.libcsound.csoundErrCnt
error_count.argtypes = [ct.c_void_p]
error_count.restype = ct.c_int32


def run(args):
    cs = ctcsound.Csound()
    if not cs.csound():
        return 1
    try:
        result = cs.compile_(*args)
        if result == 0:
            result = cs.start()
        if result != 0:
            return 1
        while True:
            result = cs.perform_ksmps()
            if result != 0:
                break
        return int(result < 0 or error_count(cs.csound()) > 0)
    finally:
        cs.destroy()


sys.exit(run(sys.argv))
```

```none
python3 csoundCommand.py myexample.csd
```

`destroy()` releases the native instance and its resources, including
open output files. The wrapper clears its pointer, so later object
destruction will not destroy that instance twice. Do not also call
`csoundDestroy()` on the pointer yourself.
The error-count call uses the wrapper's loaded library through `ctypes`;
it catches instrument errors that do not end the whole performance.

### Java

The old desktop `csnd6.jar` example uses the Csound 6 SWIG wrapper.
The Csound 7 source disables that desktop wrapper while the Java binding
moves toward [CsoundJNI](https://github.com/kunstmusik/CsoundJNI).
See the current
[Java binding notes](https://github.com/csound/csound/blob/develop/languages/java/README.md)
for its status. Do not assume a `csnd7` package with the old methods exists.
The Android binding has a separate build path.

A Java host needs a binding and native library built for its Csound API,
platform, and CPU architecture. The JVM must also support the binding's
class-file version; it need not be the exact JDK version used to build it.

## Foreign Function Interfaces

A foreign function interface (FFI) lets a language call functions in a C
library. It still needs exact signatures, compatible data types, and a
library built for the host's platform. The following examples use the
Csound 7 create, compile, start, perform-block, and destroy lifecycle.

### Java

Java 22 and later provide the Foreign Function & Memory API. This host
uses it to call the Csound 7 C API directly, without a wrapper JAR. Save
it as `Csound7Host.java`:

```java
import java.lang.foreign.Arena;
import java.lang.foreign.FunctionDescriptor;
import java.lang.foreign.Linker;
import java.lang.foreign.MemorySegment;
import java.lang.foreign.SymbolLookup;
import java.lang.invoke.MethodHandle;
import java.nio.file.Path;
import static java.lang.foreign.ValueLayout.ADDRESS;
import static java.lang.foreign.ValueLayout.JAVA_INT;

public class Csound7Host {
    private static MethodHandle bind(SymbolLookup library, String name,
                                     FunctionDescriptor signature) {
        return Linker.nativeLinker().downcallHandle(
            library.find(name).orElseThrow(), signature);
    }

    public static void main(String[] args) throws Throwable {
        if (args.length < 2) {
            throw new IllegalArgumentException(
                "Use: Csound7Host <library> [options] <CSD>");
        }
        try (Arena arena = Arena.ofConfined()) {
            SymbolLookup library = SymbolLookup.libraryLookup(
                Path.of(args[0]), arena);
            MethodHandle create = bind(library, "csoundCreate",
                FunctionDescriptor.of(ADDRESS, ADDRESS, ADDRESS));
            MethodHandle destroy = bind(library, "csoundDestroy",
                FunctionDescriptor.ofVoid(ADDRESS));
            MethodHandle compile = bind(library, "csoundCompile",
                FunctionDescriptor.of(JAVA_INT, ADDRESS, JAVA_INT, ADDRESS));
            MethodHandle start = bind(library, "csoundStart",
                FunctionDescriptor.of(JAVA_INT, ADDRESS));
            MethodHandle perform = bind(library, "csoundPerformKsmps",
                FunctionDescriptor.of(JAVA_INT, ADDRESS));
            MethodHandle errorCount = bind(library, "csoundErrCnt",
                FunctionDescriptor.of(JAVA_INT, ADDRESS));

            MemorySegment cs = (MemorySegment) create.invokeExact(
                MemorySegment.NULL, MemorySegment.NULL);
            if (cs.equals(MemorySegment.NULL)) {
                throw new IllegalStateException("could not create Csound");
            }
            try {
                MemorySegment argv = arena.allocate(ADDRESS, args.length);
                argv.setAtIndex(ADDRESS, 0, arena.allocateFrom("csound"));
                for (int i = 1; i < args.length; i++) {
                    argv.setAtIndex(ADDRESS, i, arena.allocateFrom(args[i]));
                }
                int result = (int) compile.invokeExact(cs, args.length, argv);
                if (result != 0) {
                    throw new IllegalStateException("compile failed");
                }
                result = (int) start.invokeExact(cs);
                if (result != 0) {
                    throw new IllegalStateException("start failed");
                }
                do {
                    result = (int) perform.invokeExact(cs);
                } while (result == 0);
                if (result < 0 || (int) errorCount.invokeExact(cs) != 0) {
                    throw new IllegalStateException("performance failed");
                }
            } finally {
                destroy.invokeExact(cs);
            }
        }
    }
}
```

The first argument names the native library. The remaining arguments go
to Csound, with a program name inserted at the start of its argument
array. Replace the library path below with your installation's path:

```none
java --enable-native-access=ALL-UNNAMED Csound7Host.java \
  /path/to/libcsound64.so myexample.csd
```

On macOS, use the binary inside the Csound framework. The arena keeps the
argument strings and library handle alive through performance. The
`finally` block destroys Csound before the arena closes, including when
compilation or performance fails.

### LuaJIT

LuaJIT provides the `ffi` module. This example loads `libcsound64` on
Linux. On other systems, set `CSOUND_LIBRARY` to the full path of the
Csound 7 shared library, such as the binary inside a macOS framework.

```lua
local ffi = require("ffi")
ffi.cdef[[
typedef struct CSOUND_ CSOUND;
CSOUND *csoundCreate(void *hostData, const char *opcodedir);
int32_t csoundCompile(CSOUND *, int32_t argc, const char **argv);
int32_t csoundStart(CSOUND *);
int32_t csoundPerformKsmps(CSOUND *);
int32_t csoundErrCnt(CSOUND *);
void csoundDestroy(CSOUND *);
]]

local api = ffi.load(os.getenv("CSOUND_LIBRARY") or "csound64")
local args = {arg[0]}
for i = 1, #arg do args[#args + 1] = arg[i] end
local argv = ffi.new("const char *[?]", #args + 1)
for i = 1, #args do argv[i - 1] = args[i] end
argv[#args] = nil

local csound = api.csoundCreate(nil, nil)
if csound == nil then os.exit(1) end
local result = api.csoundCompile(csound, #args, argv)
if result == 0 then result = api.csoundStart(csound) end
local failed = result ~= 0
if not failed then
  repeat
    result = api.csoundPerformKsmps(csound)
  until result ~= 0
  failed = result < 0 or api.csoundErrCnt(csound) > 0
end
api.csoundDestroy(csound)
os.exit(failed and 1 or 0)
```

```none
luajit csoundCommand.lua myexample.csd
```

The `args` table keeps the strings alive while C uses their pointers.
The first argument is the host program's name, as the C API expects.

### Go

Go's `cgo` compiles a small C interface alongside the Go code. This host
includes the Csound 7 header and uses C-allocated argument strings. It
frees those strings after compilation and destroys Csound before
`os.Exit()`, which does not run deferred calls itself.

```go
package main

/*
#cgo linux LDFLAGS: -lcsound64
#cgo darwin LDFLAGS: -framework CsoundLib64
#include <stdlib.h>
#include <csound/csound.h>
*/
import "C"

import (
    "os"
    "unsafe"
)

func compile(cs *C.CSOUND, args []string) int {
    argv := make([]*C.char, len(args))
    for i, arg := range args {
        argv[i] = C.CString(arg)
    }
    result := C.csoundCompile(cs, C.int32_t(len(argv)), &argv[0])
    for _, arg := range argv {
        C.free(unsafe.Pointer(arg))
    }
    return int(result)
}

func run(args []string) int {
    cs := C.csoundCreate(nil, nil)
    if cs == nil {
        return 1
    }
    defer C.csoundDestroy(cs)
    if compile(cs, args) != 0 || C.csoundStart(cs) != 0 {
        return 1
    }
    result := C.int32_t(0)
    for result == 0 {
        result = C.csoundPerformKsmps(cs)
    }
    if result < 0 || C.csoundErrCnt(cs) > 0 {
        return 1
    }
    return 0
}

func main() {
    os.Exit(run(os.Args))
}
```

With the Csound headers and library on the compiler's search paths:

```none
go build -o csoundCommand csoundCommand.go
./csoundCommand myexample.csd
```

For a nonstandard installation, set `CGO_CFLAGS` to its include path and
`CGO_LDFLAGS` to its library path. On macOS, the framework also needs to
be on the compiler's framework search path. The runtime loader must be
able to find the same library. Windows needs its own linker settings.

These small interfaces expose only the functions each host uses. When
extending them, check the current C header rather than copying declarations
from a Csound 6 wrapper. Calling an FFI function with the wrong signature
can corrupt memory or crash the host.

## References & Links

[Csound 7 host API header](https://github.com/csound/csound/blob/develop/include/csound.h)

[Csound 6 to 7 API migration guide](https://github.com/csound/csound/blob/develop/docs/API_Migration_Guide_Csound_6_to_7.md)

[Csound 7 C++ wrapper](https://github.com/csound/csound/blob/develop/include/csound.hpp)

[Csound 7 performance thread](https://github.com/csound/csound/blob/develop/include/csPerfThread.hpp)

[Csound 7 Python binding](https://github.com/csound/csound/blob/develop/languages/python/ctcsound.py)

The following articles provide historical background. Their code predates
Csound 7 and needs the API changes described above:

Rory Walsh 2006, Developing standalone applications using the Csound Host API and wxWidgets,
[Csound Journal Volume 1 Issue 4 - Summer 2006](http://csoundjournal.com/2006summer/wxCsound.html)

Rory Walsh 2010, Developing Audio Software with the Csound Host API,
The Audio Programming Book, DVD Chapter 35, The MIT Press

François Pinot 2011, Real-time Coding Using the Python API:
Score Events, [Csound Journal Issue 14 - Winter 2011](http://csoundjournal.com/issue14/realtimeCsoundPython.html)

François Pinot 2014, "Go Binding for Csound6", <https://github.com/fggp/go-csnd>
