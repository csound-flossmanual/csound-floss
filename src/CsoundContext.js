// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useReducer } from "react";
import { getType as mimeLookup } from "mime/lite";
import {
  append,
  assoc,
  concat,
  filter,
  isEmpty,
  pipe,
  reject,
  when,
} from "ramda";

export const CsoundStateContext = createContext();
export const CsoundDispatchContext = createContext();
CsoundStateContext.displayName = "CsoundStateContext";
CsoundStateContext.displayName = "CsoundStateContext";

const handleEndOfPerformance = async (
  csoundDispatch,
  libcsound,
  loadedSamples
) => {
  const files = await libcsound.fs.readdir("/");
  const newFiles = reject((f) => loadedSamples.includes(f), files);

  if (!isEmpty(newFiles)) {
    const newFilesWithBlobs = await Promise.all(
      newFiles.map(async (f) => {
        const arrayBuffer = await libcsound.fs.readFile(f);
        const mimeType = mimeLookup(f);
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        return { type: mimeType, url, name: f, size: arrayBuffer.byteLength };
      })
    );
    csoundDispatch({
      type: "NOTIFY_NEW_FILES",
      filesGenerated: newFilesWithBlobs,
    });
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_LIBCSOUND": {
      return pipe(
        assoc("libcsound", action.libcsound),
        assoc("filesystemDialogOpen", false),
        assoc("filesGenerated", []),
        assoc("logs", [])
      )(state);
    }
    case "STORE_LOG": {
      return assoc("logs", append(action.log, state.logs), state);
    }
    case "CLEAR_LOGS": {
      return assoc("logs", [], state);
    }
    case "STORE_CSOUND": {
      return assoc("csound", action.csound, state);
    }
    case "SET_IS_LOADING": {
      return assoc("isLoading", action.isLoading, state);
    }
    case "CONJ_LOADED_SAMPLES": {
      return assoc(
        "loadedSamples",
        concat(state.loadedSamples, action.newSamples),
        state
      );
    }
    case "NOTIFY_NEW_FILES": {
      if (action.filesGenerated.length > 0) {
        return pipe(
          assoc("filesystemDialogOpen", true),
          assoc("filesGenerated", action.filesGenerated)
        )(state);
      } else {
        return pipe(
          assoc("filesystemDialogOpen", false),
          assoc("filesGenerated", [])
        )(state);
      }
    }
    case "CLOSE_FILES_DIALOG": {
      // action.filesGenerated.forEach(state.libcsound.fs.unlink);
      return pipe(
        assoc("filesystemDialogOpen", false),
        assoc("filesGenerated", [])
      )(state);
    }
    case "CLOSE_LOG_DIALOG": {
      return pipe(
        assoc("logDialogOpen", false),
        assoc("logDialogClosed", true)
      )(state);
    }
    case "OPEN_LOG_DIALOG": {
      return assoc("logDialogOpen", true, state);
    }
    case "HANDLE_PLAY_STATE_CHANGE": {
      switch (action.change) {
        case "stop": {
          handleEndOfPerformance(
            action.csoundDispatch,
            state.libcsound,
            state.loadedSamples
          ).then(() => {});
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", false)
          )(state);
        }
        case "play": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", true),
            assoc("isLoading", false),
            when((s) => !s.logDialogClosed, assoc("logDialogOpen", true))
          )(state);
        }
        case "pause": {
          return pipe(
            assoc("isPaused", true),
            assoc("isPlaying", false),
            assoc("isLoading", false)
          )(state);
        }
        default: {
          return state;
        }
      }
    }
    default: {
      console.error(`Unknown dispatch type ${action.type}`);
      return state;
    }
  }
};

export const CsoundProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    csound: null,
    libcsound: null,
    isPaused: false,
    isPlaying: false,
    loadedSamples: [],
    logDialogOpen: false,
    logDialogClosed: false,
    filesystemDialogOpen: false,
    filesGenerated: [],
    logs: [],
  });

  return (
    <CsoundStateContext.Provider value={state}>
      <CsoundDispatchContext.Provider value={dispatch}>
        {children}
      </CsoundDispatchContext.Provider>
    </CsoundStateContext.Provider>
  );
};

export const useCsoundState = () => {
  const context = useContext(CsoundStateContext);
  if (context === undefined) {
    throw new Error("useCsoundState must be used within a CsoundProvider");
  }
  return context;
};

export const useCsoundDispatch = () => {
  const context = useContext(CsoundDispatchContext);
  if (context === undefined) {
    throw new Error("useCsoundDispatch must be used within a CsoundProvider");
  }
  return context;
};

export const useCsound = () => [useCsoundState(), useCsoundDispatch()];

export default useCsound;
