/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ResizeObserver from "resize-observer-polyfill";
import MobileNav from "./components/MobileNav";
import Main from "./components/Main";
import LeftNav from "./components/LeftNav";
import Console from "./components/Console";
import GuiRenderer from "./components/Gui";
import { CsoundProvider } from "./CsoundContext";
import { BookProvider } from "./BookContext";
import routes from "./book_fragments/routes.json";
import { equals, findIndex, isEmpty, propEq } from "ramda";
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);
    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setWindowWidth]);

  const mobileMode = windowWidth < 800 && currentRoute !== "/";

  return (
    <BookProvider>
      <CsoundProvider>
        <GuiRenderer />
        {mobileMode && (
          <style>{`html, body {
  overflow-x: hidden;
}`}</style>
        )}
        <style>{`#root {flex-direction: ${
          mobileMode ? "column" : "row"
        };}`}</style>
        <BrowserRouter key="hst" history={browserHistory}>
          {!mobileMode && routeIndex > -1 && !equals(currentRoute, "/") && (
            <LeftNav
              routes={routes}
              currentRoute={currentRoute}
              setCurrentRoute={setCurrentRoute}
            />
          )}
          <Main
            currentRoute={currentRoute}
            mobileMode={mobileMode}
            setCurrentRoute={setCurrentRoute}
          />
          {mobileMode && <MobileNav routeIndex={routeIndex} />}
        </BrowserRouter>
        <Console />
      </CsoundProvider>
    </BookProvider>
  );
}

export default App;
