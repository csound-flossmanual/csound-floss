// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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
import routesFr from "./book_fragments_fr/routes.json";
import { findIndex, isEmpty, propEq } from "ramda";
import { browserHistory } from "./history";
import {
  isFrenchRoute,
  getDefaultContentRoute,
  isHomeRoute,
} from "./constants/routes";

const theme = {
  ...extendTheme({
    fonts: {
      heading: `'Roboto Condensed', sans-serif`,
      body: `'Roboto Condensed', sans-serif`,
    },
    colors: {
      linkColor: "#6f519b",
    },
  }),
  styles: {
    global: { a: { color: "#6f519b" } },
  },
};

function App() {
  const initialState = (browserHistory.location.pathname || "").replace(
    /\/$/g,
    ""
  );

  const [currentRoute, setCurrentRoute] = useState(
    isEmpty(initialState) ? "/" : initialState
  );

  // Determine if we're on French routes
  const isCurrentRouteFrench = isFrenchRoute(currentRoute);
  const allRoutes = isCurrentRouteFrench ? routesFr || [] : routes;

  const routeIndex = findIndex(
    propEq("url", getDefaultContentRoute(currentRoute))
  )(allRoutes);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);
    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [setWindowWidth]);

  const mobileMode = windowWidth < 800 && !isHomeRoute(currentRoute);

  return (
    <ChakraProvider theme={theme}>
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
            {!mobileMode && routeIndex > -1 && !isHomeRoute(currentRoute) && (
              <LeftNav
                routes={allRoutes}
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
              />
            )}
            <Main
              currentRoute={currentRoute}
              mobileMode={mobileMode}
              setCurrentRoute={setCurrentRoute}
            />
            {mobileMode && <MobileNav />}
          </BrowserRouter>
          <Console />
        </CsoundProvider>
      </BookProvider>
    </ChakraProvider>
  );
}

export default App;
