/** @jest-environment jsdom */
const React = require("react");
const { createRoot } = require("react-dom/client");
const { act } = require("react-dom/test-utils");
const { CsoundProvider, reducer } = require("../src/CsoundContext");
const PlayControls = require("../src/components/Editor/PlayControls").default;

jest.mock("@chakra-ui/react", () => ({
  Button: ({ children, variant, isDisabled, ...props }) =>
    require("react").createElement(
      "button",
      { ...props, disabled: props.disabled || isDisabled },
      children
    ),
}));
jest.mock(
  "@csound/browser",
  () => ({
    __esModule: true,
    default: jest.fn(),
    Csound: jest.fn(),
  }),
  { virtual: true }
);

let root, container, engine;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.AudioContext = jest.fn(() => ({
    resume: jest.fn().mockResolvedValue(),
    close: jest.fn().mockResolvedValue(),
    state: "running",
  }));
  engine = {
    on: jest.fn(),
    setOption: jest.fn().mockResolvedValue(0),
    compileCSD: jest.fn().mockResolvedValue(-1),
    start: jest.fn().mockResolvedValue(0),
    cleanup: jest.fn().mockResolvedValue(0),
    removeAllListeners: jest.fn(),
    terminateInstance: jest.fn().mockResolvedValue(),
    fs: { readdir: jest.fn().mockResolvedValue([]) },
  };
  require("@csound/browser").default.mockResolvedValue(engine);
  require("@csound/browser").Csound.mockResolvedValue(engine);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  jest.clearAllMocks();
});
async function mount() {
  await act(async () =>
    root.render(
      React.createElement(
        CsoundProvider,
        null,
        React.createElement(PlayControls, {
          currentEditorState: "<CsoundSynthesizer>invalid</CsoundSynthesizer>",
        })
      )
    )
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
    csoundDispatch: jest.fn(),
  });
  expect(engine.cleanup).not.toHaveBeenCalled();
});
