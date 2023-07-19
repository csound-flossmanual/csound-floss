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
import { equals, findIndex, isEmpty, propEq } from "ramda";
import { browserHistory } from "./history";

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
            {mobileMode && <MobileNav />}
          </BrowserRouter>
          <Console />
        </CsoundProvider>
      </BookProvider>
    </ChakraProvider>
  );
}

export default App;
