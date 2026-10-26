import { EditorState } from "@codemirror/state";
import { getIndentation, syntaxTree } from "@codemirror/language";
import { csoundMode } from "@hlolli/codemirror-lang-csound";

it("indents Csound instruments with the installed CodeMirror parser", () => {
  const doc = "instr 1\n  aSignal oscili 0.1, 440\n  out aSignal\nendin";
  const state = EditorState.create({
    doc,
    extensions: [csoundMode({ fileType: "orc" })],
  });
  expect(syntaxTree(state).length).toBe(doc.length);
  expect(getIndentation(state, state.doc.line(3).from)).toBe(2);
  expect(getIndentation(state, state.doc.line(4).from)).toBe(0);
});
