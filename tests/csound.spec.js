import { vi } from "vitest";
/** @vitest-environment jsdom */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { CsoundProvider, reducer } from "../src/CsoundContext";
import PlayControls from "../src/components/Editor/PlayControls";
import { Csound } from "@csound/browser";

vi.mock("@chakra-ui/react", () => ({
  Button: ({ children, variant, isDisabled, ...props }) =>
    React.createElement(
      "button",
      { ...props, disabled: props.disabled || isDisabled },
      children,
    ),
}));
vi.mock("@csound/browser", () => ({
  __esModule: true,
  default: vi.fn(),
  Csound: vi.fn(),
}));

let root, container, engine;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.AudioContext = vi.fn(function () {
    return {
      resume: vi.fn().mockResolvedValue(),
      close: vi.fn().mockResolvedValue(),
      state: "running",
    };
  });
  engine = {
    on: vi.fn(),
    setOption: vi.fn().mockResolvedValue(0),
    compileCSD: vi.fn().mockResolvedValue(-1),
    start: vi.fn().mockResolvedValue(0),
    cleanup: vi.fn().mockResolvedValue(0),
    removeAllListeners: vi.fn(),
    terminateInstance: vi.fn().mockResolvedValue(),
    fs: { readdir: vi.fn().mockResolvedValue([]) },
  };
  Csound.mockResolvedValue(engine);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.clearAllMocks();
});
async function mount() {
  await act(async () =>
    root.render(
      React.createElement(
        CsoundProvider,
        null,
        React.createElement(PlayControls, {
          currentEditorState: "<CsoundSynthesizer>invalid</CsoundSynthesizer>",
        }),
      ),
    ),
  );
}
it("does not start an invalid CSD", async () => {
  await mount();
  await act(async () => container.querySelector("button").click());
  expect(engine.compileCSD).toHaveBeenCalled();
  expect(engine.start).not.toHaveBeenCalled();
  expect(container.querySelector("button").disabled).toBe(false);
});
it("disables pause before playback exists", async () => {
  await mount();
  expect(container.querySelectorAll("button")[1].disabled).toBe(true);
});
it("keeps engine effects out of the reducer", () => {
  const state = { libcsound: engine, loadedSamples: [], isPlaying: true };
  reducer(state, {
    type: "HANDLE_PLAY_STATE_CHANGE",
    change: "stop",
    csoundDispatch: vi.fn(),
  });
  expect(engine.cleanup).not.toHaveBeenCalled();
});
