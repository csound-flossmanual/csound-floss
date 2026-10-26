/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState, useRef, useEffect } from "react";
import { decode } from "he";
import { csound } from "@kunstmusik/codemirror-lang-csound";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import PlayControls from "./PlayControls";
import { csoundTheme } from "./csound-theme";
import * as ß from "./styles";

const CodeElement = ({ data, lang, filename = "example.csd" }) => {
  const editorReference = useRef(null);
  const initialEditorState = decode(data || "");
  const isCsd =
    initialEditorState.includes("<CsoundSynthesizer>") &&
    initialEditorState.includes("</CsoundSynthesizer>");
  const [state, setState] = useState(initialEditorState);
  const [hasMounted, setHasMounted] = useState(false);
  const [editorView, setEditorView] = useState(null);

  useEffect(() => () => editorView?.destroy(), [editorView]);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted, setHasMounted]);

  const onChange = useCallback(
    (event) => {
      if (event?.state?.doc) {
        setState(event.state.doc.toString());
      }
    },
    [setState],
  );

  useEffect(() => {
    if (hasMounted && editorReference.current && !editorView) {
      const language = new Compartment();
      const newEditor = new EditorView({
        extensions: isCsd
          ? [
              basicSetup,
              csound({ mode: "csd" }),
              csoundTheme,
              EditorView.updateListener.of(onChange),
            ]
          : lang === "python"
            ? [
                EditorState.readOnly.of(true),
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                python(),
              ]
            : lang === "c"
              ? [
                  EditorState.readOnly.of(true),
                  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                  language.of(cpp()),
                ]
              : ["orc", "csd", "sco"].includes(lang)
                ? [
                    EditorState.readOnly.of(true),
                    syntaxHighlighting(defaultHighlightStyle, {
                      fallback: true,
                    }),
                    csound({
                      mode: lang,
                      hover: false,
                      completion: false,
                    }),
                    csoundTheme,
                  ]
                : [
                    EditorState.readOnly.of(true),
                    syntaxHighlighting(defaultHighlightStyle, {
                      fallback: true,
                    }),
                  ],
        parent: editorReference.current,
      });
      setEditorView(newEditor);
      newEditor.dispatch({
        changes: {
          from: 0,
          to: newEditor.state.doc.length,
          insert: initialEditorState,
        },
      });
    }
  }, [
    hasMounted,
    editorReference,
    isCsd,
    setEditorView,
    initialEditorState,
    onChange,
    lang,
  ]);

  return (
    <div css={isCsd ? ß.codeMirror(isCsd) : [ß.codeMirror(isCsd), ß.readOnly]}>
      {isCsd && (
        <PlayControls
          filename={filename}
          currentEditorState={state}
          initialEditorState={initialEditorState}
        />
      )}
      <div ref={editorReference} />
    </div>
  );
};

export default CodeElement;
