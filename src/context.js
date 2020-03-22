// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useReducer } from "react";
import { assoc } from "ramda";

export const CsoundStateContext = createContext();
export const CsoundDispatchContext = createContext();
CsoundStateContext.displayName = "CsoundStateContext";
CsoundStateContext.displayName = "CsoundStateContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "STORE_LIBCSOUND": {
      state = assoc("libcsound", action.libcsound, state);
      break;
    }
    case "STORE_CSOUND": {
      state = assoc("csound", action.csound, state);
      break;
    }
    case "SET_PAUSE_STATE": {
      state = assoc("isPaused", action.isPaused, state);
      break;
    }
    default: {
      console.error(`Unknown dispatch type ${action.type}`);
      return state;
    }
  }
  return state;
};

export const CsoundProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    csound: null,
    libcsound: null,
    isPaused: false,
  });

  return (
    <CsoundStateContext.Provider value={state}>
      <CsoundDispatchContext.Provider value={dispatch}>
        {children}
      </CsoundDispatchContext.Provider>
    </CsoundStateContext.Provider>
  );
};

export const withCsound = C => props => (
  <CsoundProvider>
    <C {...props} />
  </CsoundProvider>
);

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
