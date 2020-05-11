/* eslint-disable */
/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import useCsound from "../../CsoundContext";
import { decode } from "he";
import { Controlled as CodeMirror } from "react-codemirror2";
import * as ß from "./styles";
import "./code-mirror-csound-mode";
import SourceMaterials from "../../assets/source_materials.json";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";
import LogIcon from "../../assets/logs_icon_wikimedia.svg";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/neo.css");

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const ensureSourceMaterials = async (exampleString, loadedSamples) => {
  const fetchedResources = {};
  await asyncForEach(SourceMaterials, async fileName => {
    if (!loadedSamples.includes(fileName)) {
      if (exampleString.includes(fileName)) {
        // One special case for 04H08_Scan_tablesize.csd
        // but let's not make this a habit!
        fileName =
          fileName === "circularstring" ? "circularstring-128" : fileName;
        const response = await fetch(`/resources/SourceMaterials/${fileName}`);
        if (response.status === 200) {
          const ab = await response.arrayBuffer();
          fetchedResources[fileName] = ab;
        }
      }
    }
  });
  return fetchedResources;
};

const checkIfPlayIsPossible = () => {
  const hasSAB = typeof SharedArrayBuffer !== "undefined";
  const hasAudioCtx = typeof AudioNode !== "undefined";
  const hasWorklets = typeof AudioWorkletNode !== "undefined";
  if (hasSAB && hasAudioCtx && hasWorklets) {
    return true;
  } else {
    alert(`Your browser doesn't have some or all of following
features needed to play csound via webassembly.

           1. SharedArrayBuffer ${hasSAB ? "Found" : "Not Found"}
           2. AudioContext ${hasAudioCtx ? "Found" : "Not Found"}
           3. AudioWorkletNode ${hasWorklets ? "Found" : "Not Found"}

Chromium and GoogleChromse versions later than 78 should work.
Firefox support will hopefully arrive soon.`);
    return false;
  }
};

const PlayControls = ({ initialEditorState, currentEditorState }) => {
  let [
    {
      libcsound,
      csound,
      isLoading,
      isPaused,
      isPlaying,
      loadedSamples,
      logDialogClosed,
      logDialogOpen,
    },
    csoundDispatch,
  ] = useCsound();

  const onPlay = async () => {
    if (!checkIfPlayIsPossible()) {
      return;
    }
    if (isPaused) {
      onPause();
      return;
    }
    if (!csound) {
      csoundDispatch({ type: "SET_IS_LOADING", isLoading: true });
      const esModule = await import("csound-wasm");
      libcsound = await esModule.default();
      // eslint-disable-next-line
      await libcsound.setMessageCallback(log => {
        console.log(log);
        csoundDispatch({ type: "STORE_LOG", log });
      });
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
    const fetchesResources = await ensureSourceMaterials(
      initialEditorState,
      loadedSamples
    );
    const newResources = Object.keys(fetchesResources) || [];
    newResources.length > 0 &&
      csoundDispatch({ type: "CONJ_LOADED_SAMPLES", newSamples: newResources });
    await asyncForEach(newResources, async fileName => {
      await libcsound.copyToFs(fetchesResources[fileName], fileName);
    });
    await libcsound.csoundCompileCsdText(csound, currentEditorState);
    await libcsound.csoundStart(csound);
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
  const initialEditorState = decode(data || "");
  const [state, setState] = useState(initialEditorState);

  const onBeforeChange = (editor, data, value) => {
    setState(value);
  };
  const isCsd = data.includes("CsoundSynthesizer");

  return (
    <div css={ß.codeMirror(isCsd)}>
      {isCsd && (
        <PlayControls
          currentEditorState={state}
          initialEditorState={initialEditorState}
        />
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

export default CodeElement;
