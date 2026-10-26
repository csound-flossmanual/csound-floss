export function createMidiSession(engine, channel = 0, failed = () => {}) {
  const held = new Set();
  const send = (...message) => {
    try {
      Promise.resolve(engine.midiMessage(...message)).catch(failed);
    } catch (error) {
      failed(error);
    }
  };
  return {
    noteOn(note) {
      if (!held.has(note)) {
        held.add(note);
        send(0x90 + channel, note, 96);
      }
    },
    noteOff(note) {
      if (held.delete(note)) send(0x80 + channel, note, 0);
    },
    release() {
      for (const note of held) send(0x80 + channel, note, 0);
      held.clear();
    },
  };
}
