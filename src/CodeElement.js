/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./code-mirror-csound-mode";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neo.css");

export const CodeElement = ({ data }) => {
  const [state, setState] = useState((data || "").replace(/\\n/g, "\n"));

  const onBeforeChange = (editor, data, value) => {
    setState(value);
  };
  const isCsd = data.includes("CsoundSynthesizer");

  return (
    <div
      css={css`
        margin-top: 12px;
        margin-bottom: 24px;
        & .CodeMirror-cursors {
          display: ${isCsd ? "inherit" : "none!important"};
        }
        & .CodeMirror-wrap pre {
          word-break: break-word;
        }
        & .CodeMirror-scroll {
          height: auto !important;
          overflow: hidden !important;
        }
        & .react-codemirror2 > div {
          background: #f5f2f0;
          height: auto;
          border: 1px solid #ccc;
        }
        & .CodeMirror-gutter-elt {
          color: #75787b !important;
          margin-left: 6px;
        }
      `}
    >
      <CodeMirror
        value={state}
        onBeforeChange={onBeforeChange}
        options={{
          lineWrapping: true,
          autoCloseBrackets: true,
          nocursor: true,
          mode: "csound",
          theme: "neo",
          lineNumbers: isCsd,
          readOnly: !isCsd
        }}
      />
    </div>
  );
};
