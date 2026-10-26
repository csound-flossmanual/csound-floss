/** @vitest-environment jsdom */
import { vi } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { EditorState } from "@codemirror/state";
import { getIndentation, syntaxTree } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { CompletionContext } from "@codemirror/autocomplete";
import { csound } from "@kunstmusik/codemirror-lang-csound";
import CodeElement from "../src/components/Editor";
import PlayControls from "../src/components/Editor/PlayControls";

vi.mock("../src/components/Editor/PlayControls", () => ({
  default: vi.fn(() => null),
}));

const orchestra = `sr = 48000
ksmps = 32
nchnls = 2
0dbfs = 1
instr Tone
  kfreq:k = 440
  asig:a = oscili(0.1, kfreq)
  outs(asig, asig)
endin
`;
const score = 'i "Tone" 0 1\ne\n';
const csd = `<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
${orchestra}</CsInstruments>
<CsScore>
${score}</CsScore>
</CsoundSynthesizer>
`;

let root, host;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(async () => {
  await act(() => root.unmount());
  host.remove();
  vi.clearAllMocks();
});

async function mount(data, lang) {
  await act(() =>
    root.render(React.createElement(CodeElement, { data, lang })),
  );
  return EditorView.findFromDOM(host.querySelector(".cm-editor"));
}

function expectParsed(state, rootName) {
  const tree = syntaxTree(state);
  const errors = [];
  tree.iterate({
    enter(node) {
      if (node.type.isError) errors.push(state.sliceDoc(node.from, node.to));
    },
  });
  expect(tree.topNode.name).toBe(rootName);
  expect(tree.length).toBe(state.doc.length);
  expect(errors).toEqual([]);
}

it.each([undefined, "", "undefined", "csound", "csd"])(
  "highlights a score section with language label '%s'",
  async (lang) => {
    const doc = '<CsScore>\ni "Hello" 0 2\n</CsScore>';
    const view = await mount(doc, lang);
    expect(view.state.readOnly).toBe(true);
    expect(PlayControls).not.toHaveBeenCalled();
    const highlighted = [...host.querySelectorAll(".cm-line span[class]")].map(
      (node) => node.textContent,
    );
    expect(highlighted).toEqual(
      expect.arrayContaining(["<CsScore>", '"Hello"', "0", "2", "</CsScore>"]),
    );
  },
);

it.each(["undefined", "csound", "sco"])(
  "highlights a bare score event labelled '%s'",
  async (lang) => {
    const view = await mount('i "Hello" 0 2', lang);
    expect(syntaxTree(view.state).topNode.name).toBe("ScoreFile");
    expect(view.state.readOnly).toBe(true);
    expect(host.querySelector(".cm-csoundScoreOpcodeType")?.textContent).toBe(
      "i",
    );
    expect(
      [...host.querySelectorAll(".cm-line span[class]")].map(
        (node) => node.textContent,
      ),
    ).toEqual(expect.arrayContaining(["0", "2"]));
    expect(PlayControls).not.toHaveBeenCalled();
  },
);

it("uses orchestra mode for the book's csound fence label", async () => {
  const view = await mount(orchestra, "csound");
  expectParsed(view.state, "OrchestraFile");
  expect(view.state.readOnly).toBe(true);
  expect(host.querySelector(".cm-csoundBuiltinOpcode")?.textContent).toBe(
    "oscili",
  );
  expect(PlayControls).not.toHaveBeenCalled();
});

it.each(["python", "c", "text"])(
  "keeps the explicit '%s' label on code containing CSD tags",
  async (lang) => {
    const view = await mount('section = "<CsScore>"', lang);
    expect(syntaxTree(view.state).topNode.name).not.toBe("CsdFile");
  },
);

it("keeps unlabelled non-Csound text as plain text", async () => {
  await mount("npm install\npython script.py", "undefined");
  expect(host.querySelectorAll(".cm-line span[class]")).toHaveLength(0);
});

it.each([
  ["orc", orchestra, "OrchestraFile"],
  ["sco", score, "ScoreFile"],
  ["csd", `<CsScore>\n${score}</CsScore>\n`, "CsdFile"],
])(
  "keeps %s examples read-only and uses the right parser",
  async (lang, doc, top) => {
    const view = await mount(doc, lang);
    if (lang === "csd") {
      // CSD fragments are useful in the book even though they are not whole files.
      expect(syntaxTree(view.state).topNode.name).toBe(top);
    } else {
      expectParsed(view.state, top);
    }
    expect(view.state.doc.toString()).toBe(doc);
    expect(view.state.readOnly).toBe(true);
    expect(
      view.state.languageDataAt("autocomplete", doc.indexOf("Tone")),
    ).toEqual([]);
    expect(PlayControls).not.toHaveBeenCalled();
  },
);

it.each(["", "csd", "orc", "sco", "csound"])(
  "keeps full CSDs editable with language label '%s' and sends edits to playback",
  async (lang) => {
    const view = await mount(csd, lang);
    expectParsed(view.state, "CsdFile");
    expect(view.state.readOnly).toBe(false);
    const pos = csd.indexOf("oscili") + 3;
    const sources = view.state.languageDataAt("autocomplete", pos);
    expect(sources).toHaveLength(1);
    const completion = await sources[0](
      new CompletionContext(view.state, pos, true),
    );
    expect(completion.options.some(({ label }) => label === "oscili")).toBe(
      true,
    );
    await act(() =>
      view.dispatch({
        changes: {
          from: csd.indexOf("440"),
          to: csd.indexOf("440") + 3,
          insert: "880",
        },
      }),
    );
    expect(PlayControls.mock.lastCall[0].currentEditorState).toBe(
      csd.replace("440", "880"),
    );
    const destroy = vi.spyOn(view, "destroy");
    await act(() => root.unmount());
    expect(destroy).toHaveBeenCalledOnce();
  },
);

it("keeps names beginning with header constants as whole identifiers", async () => {
  const doc = "sr = 48000\nkrate = 1\nksmpsValue = 32\n";
  const view = await mount(doc, "orc");
  expectParsed(view.state, "OrchestraFile");
  for (const name of ["krate", "ksmpsValue"]) {
    const node = syntaxTree(view.state).resolveInner(doc.indexOf(name) + 1);
    expect(view.state.sliceDoc(node.from, node.to)).toBe(name);
    expect(node.name).not.toBe("HeaderIdentifier");
  }
  expect(syntaxTree(view.state).resolveInner(1).name).toBe("HeaderIdentifier");
});

it("indents Csound instruments with the installed CodeMirror parser", () => {
  const doc = "instr 1\n  aSignal oscili 0.1, 440\n  out aSignal\nendin";
  const state = EditorState.create({
    doc,
    extensions: [csound({ mode: "orc" })],
  });
  expect(syntaxTree(state).length).toBe(doc.length);
  expect(getIndentation(state, state.doc.line(3).from)).toBe(2);
  expect(getIndentation(state, state.doc.line(4).from)).toBe(0);
});
