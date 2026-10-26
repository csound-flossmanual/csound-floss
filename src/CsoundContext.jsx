// eslint-disable-next-line no-unused-vars
import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { append, assoc, pipe, when } from "ramda";

import { createPlaybackController } from "./csound/playback";

export const CsoundStateContext = createContext();
export const CsoundDispatchContext = createContext();
CsoundStateContext.displayName = "CsoundStateContext";
CsoundDispatchContext.displayName = "CsoundDispatchContext";

export const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_EXAMPLE": {
      return assoc("example", action.example, state);
    }
    case "STORE_LIBCSOUND": {
      return assoc("libcsound", action.libcsound, state);
    }
    case "STORE_GUI_CODE": {
      return assoc("guiCode", action.guiCode, state);
    }
    case "STORE_LOG": {
      return assoc("logs", append(action.log, state.logs), state);
    }
    case "CLEAR_LOGS": {
      return assoc("logs", [], state);
    }
    case "SET_IS_LOADING": {
      return assoc("isLoading", action.isLoading, state);
    }
    case "SET_IS_RENDERING": {
      return assoc("isRendering", action.isRendering, state);
    }
    case "NOTIFY_NEW_FILES": {
      if (action.filesGenerated.length > 0) {
        return pipe(
          assoc("filesystemDialogOpen", true),
          assoc("filesGenerated", action.filesGenerated),
        )(state);
      } else {
        return pipe(
          assoc("filesystemDialogOpen", false),
          assoc("filesGenerated", []),
        )(state);
      }
    }
    case "CLOSE_FILES_DIALOG": {
      return pipe(
        assoc("filesystemDialogOpen", false),
        assoc("filesGenerated", []),
      )(state);
    }
    case "CLOSE_LOG_DIALOG": {
      return pipe(
        assoc("logDialogOpen", false),
        assoc("logDialogClosed", true),
      )(state);
    }
    case "OPEN_LOG_DIALOG": {
      return assoc("logDialogOpen", true, state);
    }
    case "OPEN_GUI_DIALOG": {
      return assoc("guiDialogOpen", true, state);
    }
    case "CLOSE_GUI_DIALOG": {
      return assoc("guiDialogOpen", false, state);
    }
    case "HANDLE_PLAY_STATE_CHANGE": {
      switch (action.change) {
        case "stop": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", false),
            assoc("isLoading", false),
            assoc("isRendering", false),
          )(state);
        }
        case "play": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", true),
            assoc("isLoading", false),
            when((s) => !s.logDialogClosed, assoc("logDialogOpen", true)),
          )(state);
        }
        case "pause": {
          return pipe(
            assoc("isPaused", true),
            assoc("isPlaying", false),
            assoc("isLoading", false),
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
    libcsound: null,
    example: null,
    isPaused: false,
    isPlaying: false,
    isLoading: false,
    isRendering: false,
    logDialogOpen: false,
    logDialogClosed: false,
    guiDialogOpen: false,
    guiCode: "",
    filesystemDialogOpen: false,
    filesGenerated: [],
    logs: [],
  });

  const controller = useRef();
  if (!controller.current)
    controller.current = createPlaybackController(dispatch);
  useEffect(
    () => () => {
      void controller.current.dispose();
    },
    [],
  );
  useEffect(() => {
    const files = state.filesGenerated;
    return () => files.forEach(({ url }) => URL.revokeObjectURL(url));
  }, [state.filesGenerated]);

  return (
    <CsoundStateContext.Provider
      value={{ ...state, playback: controller.current }}
    >
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
