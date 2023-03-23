/* eslint-disable */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useState, useRef, useEffect } from "react";
import { decode } from "he";
import { csoundMode } from "@hlolli/codemirror-lang-csound";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import useCsound from "../../CsoundContext";
import SourceMaterials from "../../assets/source_materials.json";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";
import LogIcon from "../../assets/logs_icon_wikimedia.svg";
import * as ß from "./styles";

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  await asyncForEach(SourceMaterials, async (fileName) => {
    if (!loadedSamples.includes(fileName)) {
      if (exampleString.includes(fileName)) {
        // One special case for 04H08_Scan_tablesize.csd
        // but let's not make this a habit!
        fileName =
          fileName === "circularstring" ? "circularstring-128" : fileName;
        const response = await fetch(`/resources/SourceMaterials/${fileName}`);
        if (response.status === 200) {
          const ab = await response.arrayBuffer();
          fetchedResources[fileName] = new Uint8Array(ab);
        }
      }
    }
  });
  return fetchedResources;
};

const checkIfPlayIsPossible = () => {
  return true;
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

  const hasCsoundWebElements = (
    currentEditorState || initialEditorState
  ).includes("<CsoundWebElements>");
  const csoundWebElementsMatch =
    hasCsoundWebElements &&
    (currentEditorState || initialEditorState)
      .replaceAll("\n", "")
      .match(/<CsoundWebElements>(.*?)<\/CsoundWebElements>/gm);
  // console.log({ hasGui, guiString, currentEditorState, initialEditorState });

  const onPlay = useCallback(async () => {
    if (isPaused) {
      onPause();
      return;
    }
    if (!csound) {
      csoundDispatch({ type: "SET_IS_LOADING", isLoading: true });
      const esModule = await import("@csound/browser");
      libcsound = await esModule.default();
      libcsound.setOption("-odac");

      if (hasCsoundWebElements && Array.isArray(csoundWebElementsMatch)) {
        csoundDispatch({
          type: "STORE_GUI_CODE",
          guiCode: csoundWebElementsMatch[0] || "",
        });
        csoundDispatch({ type: "OPEN_GUI_DIALOG" });
      }

      // eslint-disable-next-line
      libcsound.on("message", (log) => {
        csoundDispatch({ type: "STORE_LOG", log });
      });

      libcsound.on("renderStarted", () => {
        csoundDispatch({
          type: "HANDLE_PLAY_STATE_CHANGE",
          change: "play",
          csoundDispatch,
        });
      });
      libcsound.on("play", () => {
        csoundDispatch({
          type: "HANDLE_PLAY_STATE_CHANGE",
          change: "play",
          csoundDispatch,
        });
      });

      libcsound.on("renderEnded", () => {
        csoundDispatch({
          type: "HANDLE_PLAY_STATE_CHANGE",
          change: "stop",
          csoundDispatch,
        });
      });

      libcsound.on("stop", () => {
        csoundDispatch({
          type: "HANDLE_PLAY_STATE_CHANGE",
          change: "stop",
          csoundDispatch,
        });
        csoundDispatch({ type: "CLOSE_GUI_DIALOG" });
      });

      libcsound.on("pause", () => {
        csoundDispatch({
          type: "HANDLE_PLAY_STATE_CHANGE",
          change: "pause",
          csoundDispatch,
        });
      });

      csoundDispatch({ type: "STORE_LIBCSOUND", libcsound });
    } else {
      await libcsound.removeAllListeners();
      await libcsound.stop();
    }
    const fetchesResources = await ensureSourceMaterials(
      currentEditorState,
      loadedSamples
    );
    const newResources = Object.keys(fetchesResources) || [];
    newResources.length > 0 &&
      csoundDispatch({ type: "CONJ_LOADED_SAMPLES", newSamples: newResources });
    await asyncForEach(newResources, async (fileName) => {
      await libcsound.fs.writeFile(fileName, fetchesResources[fileName]);
    });
    // forcing 2 channel output until I track down the bug
    await libcsound.compileCsdText(currentEditorState);
    await libcsound.start();
  }, [
    libcsound,
    loadedSamples,
    currentEditorState,
    isPaused,
    hasCsoundWebElements,
  ]);

  const onPause = async () => {
    const newPauseState = !isPaused;
    if (newPauseState === true) {
      await libcsound.pause();
    } else {
      await libcsound.resume();
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
        onClick={async () => await libcsound.stop()}
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
  const isCsd = data.includes("CsoundSynthesizer");
  const editorReference = useRef(null);
  const initialEditorState = decode(data || "");
  const [state, setState] = useState(initialEditorState);
  const [hasMounted, setHasMounted] = useState(false);
  const [editorView, setEditorView] = useState(null);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted, setHasMounted]);

  useEffect(() => {
    if (hasMounted && editorReference.current && !editorView) {
      const newEditor = new EditorView({
        extensions: isCsd
          ? [basicSetup, csoundMode({ fileType: "csd" })]
          : [EditorState.readOnly.of(true), csoundMode({ fileType: "orc" })],
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
  }, [hasMounted, editorReference, isCsd, setEditorView, initialEditorState]);

  const onBeforeChange = (editor, data, value) => {
    setState(value);
  };

  return (
    <div css={ß.codeMirror(isCsd)}>
      {isCsd && (
        <PlayControls
          currentEditorState={state}
          initialEditorState={initialEditorState}
        />
      )}
      <div ref={editorReference} />
    </div>
  );
};

export default CodeElement;
