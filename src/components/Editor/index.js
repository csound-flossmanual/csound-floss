/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import useCsound from "../../context";
import { decode } from "he";
import { Controlled as CodeMirror } from "react-codemirror2";
import * as ß from "./styles";
import "./code-mirror-csound-mode";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";
import LogIcon from "../../assets/logs_icon_wikimedia.svg";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neo.css");

const PlayControlsLoadingSpinner = () => (
  <div
    style={{
      backgroundColor: "unset",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      border: "none",
    }}
  >
    <div css={ß.playLoadingSpinner} />
  </div>
);

const PlayControls = ({ currentEditorState }) => {
  let [
    {
      libcsound,
      csound,
      isLoading,
      isPaused,
      isPlaying,
      logDialogClosed,
      logDialogOpen,
    },
    csoundDispatch,
  ] = useCsound();

  const onPlay = async () => {
    if (isPaused) {
      onPause();
      return;
    }
    if (!csound) {
      csoundDispatch({ type: "SET_IS_LOADING", isLoading: true });
      const esModule = await import("csound-wasm");
      libcsound = await esModule.default();
      await libcsound.setMessageCallback(log =>
        csoundDispatch({ type: "STORE_LOG", log })
      );
      await libcsound.setCsoundPlayStateChangeCallback(change =>
        csoundDispatch({ type: "HANDLE_PLAY_STATE_CHANGE", change })
      );
      csound = await libcsound.csoundCreate();
      await libcsound.csoundInitialize(0);
      csoundDispatch({ type: "STORE_LIBCSOUND", libcsound });
      csoundDispatch({ type: "STORE_CSOUND", csound });
    } else {
      csoundDispatch({ type: "CLEAR_LOGS" });
      await libcsound.csoundStop(csound);
      await libcsound.csoundCleanup(csound);
      await libcsound.csoundReset(csound);
    }
    await libcsound.csoundPrepareRT(csound);
    await libcsound.csoundCompileCsdText(csound, currentEditorState);
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
  };

  return (
    <div css={ß.controllers}>
      <button onClick={onPlay} disabled={isPlaying || isLoading}>
        {isLoading ? (
          <PlayControlsLoadingSpinner />
        ) : (
          <img
            alt="play"
            src={PlayIcon}
            style={{ height: 40, width: 20, marginTop: -5, marginLeft: 1 }}
          />
        )}
      </button>
      <button
        onClick={onPause}
        style={{ marginLeft: 3 }}
        disabled={isPaused || isLoading}
      >
        <img alt="pause" src={PauseIcon} style={{ height: 30, width: 20 }} />
      </button>
      <button
        onClick={async () => await libcsound.csoundStop(csound)}
        style={{ marginLeft: 3 }}
        disabled={!isPlaying && !isPaused}
      >
        <img
          alt="stop"
          src={StopIcon}
          style={{ height: 22, width: 22, marginTop: 5 }}
        />
      </button>
      <button
        onClick={() => csoundDispatch({ type: "OPEN_LOG_DIALOG" })}
        style={{ marginLeft: 3 }}
        disabled={logDialogOpen || (!logDialogOpen && !logDialogClosed)}
      >
        <img
          alt="console logs"
          src={LogIcon}
          style={{
            height: 22,
            width: 22,
            marginTop: 5,
            filter: "unset",
          }}
        />
      </button>
    </div>
  );
};

const CodeElement = ({ data }) => {
  const [state, setState] = useState(decode(data || ""));

  const onBeforeChange = (editor, data, value) => {
    setState(value);
  };
  const isCsd = data.includes("CsoundSynthesizer");

  return (
    <div css={ß.codeMirror(isCsd)}>
      {isCsd && <PlayControls currentEditorState={state} />}
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

export default CodeElement;
