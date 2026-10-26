/** @vitest-environment jsdom */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import {
  CsoundStateContext,
  CsoundDispatchContext,
} from "../src/CsoundContext";
import MidiKeyboard from "../src/components/Console/MidiKeyboard";
import Transport from "../src/components/Console/Transport";
import Console from "../src/components/Console";
import PlayControls from "../src/components/Editor/PlayControls";
import { downloadExample } from "../src/csound/download";

vi.mock("@chakra-ui/react", () => ({
  Button: ({ children, variant, ...props }) =>
    React.createElement("button", props, children),
}));
vi.mock("../src/csound/download", () => ({
  downloadExample: vi.fn().mockResolvedValue(),
}));
let host, root, state;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  state = {
    logDialogOpen: true,
    logs: [],
    isPlaying: true,
    isPaused: false,
    isLoading: false,
    isRendering: false,
    example: { filename: "tone.csd", source: "current code" },
    libcsound: {
      midiMessage: vi.fn().mockResolvedValue(),
      isRequestingRtMidiInput: vi.fn().mockResolvedValue(true),
    },
    playback: { play: vi.fn(), pause: vi.fn(), stop: vi.fn(), resume: vi.fn() },
  };
});
afterEach(async () => {
  await act(() => root.unmount());
  host.remove();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});
async function render(component) {
  await act(async () =>
    root.render(
      React.createElement(
        CsoundStateContext.Provider,
        { value: state },
        React.createElement(
          CsoundDispatchContext.Provider,
          { value: vi.fn() },
          component,
        ),
      ),
    ),
  );
}
const button = (label) => host.querySelector(`button[aria-label="${label}"]`);
const key = async (target, type, key) =>
  act(() =>
    target.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true })),
  );

it("follows new logs and resized output, but leaves old output in place while reading", async () => {
  let resize;
  vi.stubGlobal(
    "ResizeObserver",
    class {
      connected = false;
      constructor(callback) {
        resize = () => this.connected && callback();
      }
      observe() {
        this.connected = true;
      }
      disconnect() {
        this.connected = false;
      }
    },
  );
  await render(React.createElement(Console));
  const log = host.querySelector('pre[aria-label="Csound output"]');
  let height = 400;
  Object.defineProperties(log, {
    scrollHeight: { get: () => height },
    clientHeight: { value: 100 },
  });
  state = { ...state, logs: ["First line", "Newest line"] };
  await render(React.createElement(Console));
  expect(log.scrollTop).toBe(height);

  // Narrowing the dialog wraps lines and changes the scroll height.
  height = 600;
  await act(() => log.dispatchEvent(new Event("scroll")));
  await act(() => resize?.());
  expect(log.scrollTop).toBe(height);

  await act(() => {
    log.scrollTop = 50;
    log.dispatchEvent(new Event("scroll"));
  });
  state = { ...state, logs: [...state.logs, "Another line"] };
  await render(React.createElement(Console));
  expect(log.scrollTop).toBe(50);
  const follow = [...host.querySelectorAll("button")].find(
    (b) => b.textContent === "Follow log",
  );
  await act(() => follow.click());
  expect(log.scrollTop).toBe(height);
});

it("minimizes to a title and transport, releases MIDI notes, and restores the tools", async () => {
  await render(React.createElement(Console));
  const keyboard = () =>
    host.querySelector('button[aria-controls="console-keyboard"]');
  await act(() => keyboard().click());
  await key(button("C3"), "keydown", " ");
  expect(state.libcsound.midiMessage).toHaveBeenLastCalledWith(0x90, 48, 96);
  await act(() => button("Minimize console").click());
  expect(state.libcsound.midiMessage).toHaveBeenLastCalledWith(0x80, 48, 0);
  expect(host.querySelectorAll("button")).toHaveLength(3);
  expect(host.querySelector("pre")).toBeNull();
  expect(button("Restore console").textContent).toBe("tone.csd");
  expect(document.activeElement).toBe(button("Restore console"));
  await act(() => button("Stop").click());
  expect(state.playback.stop).toHaveBeenCalledOnce();
  state = { ...state, isPlaying: false, isPaused: true };
  await render(React.createElement(Console));
  await act(() => button("Resume").click());
  expect(state.playback.resume).toHaveBeenCalledOnce();
  await act(() => button("Restore console").click());
  expect(keyboard().getAttribute("aria-expanded")).toBe("true");
  expect(host.querySelector("pre")).not.toBeNull();
  expect(document.activeElement).toBe(button("Minimize console"));
});

it("plays from the console, resumes paused code, and stops while loading", async () => {
  state.isPlaying = false;
  await render(React.createElement(Transport, { labels: true }));
  await act(() => button("Play").click());
  expect(state.playback.play).toHaveBeenCalledWith("current code", "tone.csd");
  state = { ...state, isPaused: true };
  await render(React.createElement(Transport));
  await act(() => button("Resume").click());
  expect(state.playback.resume).toHaveBeenCalledOnce();
  state = { ...state, isPaused: false, isLoading: true };
  await render(React.createElement(Transport));
  expect(button("Play").disabled).toBe(true);
  await act(() => button("Stop").click());
  expect(state.playback.stop).toHaveBeenCalledOnce();
});

it("downloads current editor text and reports a failed download beside the editor", async () => {
  await render(
    React.createElement(PlayControls, {
      initialEditorState: "old",
      currentEditorState: "edited",
      filename: "edited.csd",
    }),
  );
  const download = () =>
    [...host.querySelectorAll("button")].find((b) =>
      b.textContent.includes("Download ZIP"),
    );
  await act(async () => download().click());
  expect(downloadExample).toHaveBeenCalledWith("edited", "edited.csd");
  downloadExample.mockRejectedValueOnce(new Error("Sample unavailable"));
  await act(async () => download().click());
  expect(host.querySelector('[role="alert"]').textContent).toBe(
    "Sample unavailable",
  );
});

it("scopes piano shortcuts to the piano and releases notes on blur, octave change, pause and unmount", async () => {
  await render(React.createElement(MidiKeyboard));
  const engine = state.libcsound;
  const piano = () => host.querySelector('[role="group"]');
  await key(document.body, "keydown", "a");
  expect(engine.midiMessage).not.toHaveBeenCalled();
  await key(piano(), "keydown", "a");
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x90, 48, 96);
  await act(() => window.dispatchEvent(new Event("blur")));
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x80, 48, 0);
  await key(piano(), "keydown", "a");
  await act(() => button("Octave up").click());
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x80, 48, 0);
  await key(piano(), "keydown", "a");
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x90, 60, 96);
  state = { ...state, isPlaying: false, isPaused: true };
  await render(React.createElement(MidiKeyboard));
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x80, 60, 0);
  state = { ...state, isPlaying: true, isPaused: false };
  await render(React.createElement(MidiKeyboard));
  await key(piano(), "keydown", "a");
  await render(null);
  expect(engine.midiMessage).toHaveBeenLastCalledWith(0x80, 60, 0);
});

it("releases notes on the old MIDI channel before selecting a new channel", async () => {
  await render(React.createElement(MidiKeyboard));
  await key(button("C3"), "keydown", " ");
  const channel = host.querySelector("select");
  await act(() => {
    channel.value = "2";
    channel.dispatchEvent(new Event("change", { bubbles: true }));
  });
  expect(state.libcsound.midiMessage).toHaveBeenLastCalledWith(0x80, 48, 0);
  await key(button("C3"), "keydown", " ");
  expect(state.libcsound.midiMessage).toHaveBeenLastCalledWith(0x92, 48, 96);
});

it("keeps piano keys silent when an example has no MIDI input", async () => {
  state.libcsound.isRequestingRtMidiInput.mockResolvedValue(false);
  await render(React.createElement(MidiKeyboard));
  await key(host.querySelector('[role="group"]'), "keydown", "a");
  expect(state.libcsound.midiMessage).not.toHaveBeenCalled();
  expect(host.textContent).toContain("no live MIDI input");
});
