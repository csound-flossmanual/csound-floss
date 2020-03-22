// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useReducer } from "react";
import { append, assoc, pipe, when } from "ramda";

export const CsoundStateContext = createContext();
export const CsoundDispatchContext = createContext();
CsoundStateContext.displayName = "CsoundStateContext";
CsoundStateContext.displayName = "CsoundStateContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_LIBCSOUND": {
      return assoc("libcsound", action.libcsound, state);
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
        case "realtimePerformanceEnded": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", false)
          )(state);
        }
        case "realtimePerformanceStarted": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", true),
            assoc("isLoading", false),
            when(s => !s.logDialogClosed, assoc("logDialogOpen", true))
          )(state);
        }
        case "realtimePerformancePaused": {
          return pipe(
            assoc("isPaused", true),
            assoc("isPlaying", false),
            assoc("isLoading", false)
          )(state);
        }
        case "realtimePerformanceResumed": {
          return pipe(
            assoc("isPaused", false),
            assoc("isPlaying", true),
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
    logDialogOpen: false,
    logDialogClosed: false,
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

// export const withCsound = C => props => (
//   <CsoundProvider>
//     <C {...props} />
//   </CsoundProvider>
// );

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
