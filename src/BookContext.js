// eslint-disable-next-line no-unused-vars
import React, { createContext, useContext, useReducer } from "react";
import { assoc, pipe } from "ramda";

export const BookStateContext = createContext();
export const BookDispatchContext = createContext();
BookStateContext.displayName = "BookStateContext";
BookStateContext.displayName = "BookStateContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSections": {
      return pipe(
        assoc("sections", action.sections),
        assoc("sectionIndex", 0),
        assoc("subSectionIndex", -1)
      )(state);
    }
    case "setSectionIndex": {
      return pipe(
        assoc("sectionIndex", action.sectionIndex),
        assoc("subSectionIndex", action.subSectionIndex || -1)
      )(state);
    }
    default: {
      return state;
    }
  }
};

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    sections: [],
    sectionIndex: 0,
  });

  return (
    <BookStateContext.Provider value={state}>
      <BookDispatchContext.Provider value={dispatch}>
        {children}
      </BookDispatchContext.Provider>
    </BookStateContext.Provider>
  );
};

export const useBookState = () => {
  const context = useContext(BookStateContext);
  if (context === undefined) {
    throw new Error("useBookState must be used within a BookProvider");
  }
  return context;
};

export const useBookDispatch = () => {
  const context = useContext(BookDispatchContext);
  if (context === undefined) {
    throw new Error("useBookDispatch must be used within a BookProvider");
  }
  return context;
};

export const useBook = () => [useBookState(), useBookDispatch()];

export default useBook;
