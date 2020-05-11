/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router } from "react-router-dom";
import Main from "./components/Main";
import LeftNav from "./components/LeftNav";
import Console from "./components/Console";
import { CsoundProvider } from "./CsoundContext";
import { BookProvider } from "./BookContext";
import routes from "./book_fragments/routes.json";
import { findIndex, isEmpty, propEq } from "ramda";
import { browserHistory } from "./history";

function App() {
  const initialState = (browserHistory.location.pathname || "").replace(
    /\/$/g,
    ""
  );
  const [currentRoute, setCurrentRoute] = useState(
    isEmpty(initialState) ? "/" : initialState
  );

  const routeIndex = findIndex(
    propEq(
      "url",
      currentRoute === "/" || currentRoute === "/introduction"
        ? "/introduction/preface"
        : currentRoute
    )
  )(routes);

  return (
    <BookProvider>
      <CsoundProvider>
        <Router history={browserHistory}>
          {routeIndex > -1 && <LeftNav routeIndex={routeIndex} />}
          <Main currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
        </Router>
        <Console />
      </CsoundProvider>
    </BookProvider>
  );
}

export default App;
