/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import useCsound, { withCsound } from "./context";
import { decode } from "he";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./code-mirror-csound-mode";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neo.css");

const CodeElement = ({ data }) => {
  const [state, setState] = useState(decode(data || ""));
  let [{ libcsound, csound, isPaused }, csoundDispatch] = useCsound();

  const onPlay = async () => {
    if (isPaused) {
      onPause();
      return;
    }
    if (!csound) {
      const esModule = await import("csound-wasm");
      libcsound = await esModule.default();
      csound = await libcsound.csoundCreate();
      await libcsound.csoundInitialize(0);
      csoundDispatch({ type: "STORE_LIBCSOUND", libcsound });
      csoundDispatch({ type: "STORE_CSOUND", csound });
    } else {
      await libcsound.csoundStop(csound);
      await libcsound.csoundCleanup(csound);
      await libcsound.csoundReset(csound);
    }
    await libcsound.csoundPrepareRT(csound);
    // await libcsound.csoundSetOption(csound, "--0dbfs=1");
    // await libcsound.csoundSetOption(csound, "--nchnls=2");
    // await libcsound.csoundSetOption(csound, "-odac");
    await libcsound.csoundCompileCsdText(csound, state);
    await libcsound.csoundStart(csound);
    await libcsound.startWebAudio(csound);
  };

  const onPause = async () => {
    const newPauseState = !isPaused;
    if (newPauseState === true) {
      libcsound.csoundPause(csound);
    } else {
      libcsound.csoundResume(csound);
    }
    csoundDispatch({ type: "SET_PAUSE_STATE", isPaused: newPauseState });
  };

  const onBeforeChange = (editor, data, value) => {
    setState(value);
  };
  const isCsd = data.includes("CsoundSynthesizer");

  return (
    <div
      css={css`
        margin-top: 12px;
        white-space: pre-wrap;
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
      {isCsd && (
        <div>
          <button onClick={onPlay}>PLAY</button>
          <button onClick={onPause}>PAUSE</button>
        </div>
      )}
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
          readOnly: !isCsd,
        }}
      />
    </div>
  );
};

export default withCsound(CodeElement);
