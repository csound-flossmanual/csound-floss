import { createMidiSession } from "../src/components/Console/midi";
import { fitConsole } from "../src/components/Console/geometry";
import { observeAudio } from "../src/components/Console/spectral/audio";

it("releases held MIDI notes once on their original channel", () => {
  const engine = { midiMessage: vi.fn() };
  const midi = createMidiSession(engine, 4);
  midi.noteOn(60);
  midi.noteOn(60);
  midi.noteOn(64);
  midi.noteOff(60);
  midi.release();
  midi.release();
  midi.noteOff(64);
  expect(engine.midiMessage.mock.calls).toEqual([
    [0x94, 60, 96],
    [0x94, 64, 96],
    [0x84, 60, 0],
    [0x84, 64, 0],
  ]);
});

it("reports rejected MIDI messages without an unhandled promise", async () => {
  const failed = vi.fn();
  const midi = createMidiSession(
    { midiMessage: () => Promise.reject(new Error("ended")) },
    0,
    failed,
  );
  midi.noteOn(60);
  await Promise.resolve();
  expect(failed).toHaveBeenCalledWith(
    expect.objectContaining({ message: "ended" }),
  );
});

it("keeps an expanded console within a small viewport and clamps dragging", () => {
  expect(
    fitConsole(
      { x: 900, y: 600, width: 552, height: 318 },
      { width: 375, height: 667 },
      800,
    ),
  ).toEqual({ x: 8, y: 8, width: 359, height: 651 });
  expect(
    fitConsole(
      { x: -200, y: -100, width: 552, height: 318 },
      { width: 1200, height: 800 },
    ).x,
  ).toBe(8);
});

it("disconnects only the analyser branch and removes the engine listener", async () => {
  const analyser = { disconnect: vi.fn() };
  const node = {
    connect: vi.fn(),
    disconnect: vi.fn(),
    context: { createAnalyser: () => analyser },
  };
  const engine = {
    getNode: vi.fn(async () => node),
    on: vi.fn(),
    off: vi.fn(),
  };
  const ready = vi.fn();
  const dispose = observeAudio(engine, ready, vi.fn());
  await Promise.resolve();
  expect(node.connect).toHaveBeenCalledWith(analyser);
  expect(ready).toHaveBeenCalledWith(analyser);
  dispose();
  expect(node.disconnect.mock.calls).toEqual([[analyser]]);
  expect(engine.off).toHaveBeenCalledWith(
    "realtimePerformanceStarted",
    expect.any(Function),
  );
});

it("does not connect an analyser after the tool closes during getNode", async () => {
  let resolve;
  const node = { connect: vi.fn() };
  const dispose = observeAudio(
    {
      getNode: () =>
        new Promise((r) => {
          resolve = r;
        }),
      on: vi.fn(),
      off: vi.fn(),
    },
    vi.fn(),
    vi.fn(),
  );
  dispose();
  resolve(node);
  await Promise.resolve();
  expect(node.connect).not.toHaveBeenCalled();
});
