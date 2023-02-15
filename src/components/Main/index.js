/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import HomeScreen from "../HomeScreen";
import { Route, Routes } from "react-router-dom";
import routes from "../../book_fragments/routes.json";
import { map } from "ramda";
import { browserHistory } from "../../history";
import * as ß from "./styles";
import "rc-slider/assets/index.css";
import InteractiveDemo from "../../book_fragments/interactive-demo.jsx";

const LoadingSpinner = () => (
  <div
    style={{
      backgroundColor: "unset",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      border: "none",
    }}
  >
    <style>{"main {width: 100%;height:90vh;}"}</style>
    <div css={ß.loadingSpinner} />
  </div>
);

function Main({ currentRoute, mobileMode, setCurrentRoute }) {
  const onRouteChange = React.useCallback(
    (location, action) => {
      setCurrentRoute(location.pathname);
      if (action === "PUSH") {
        if (currentRoute !== location.pathname) {
          setTimeout(() => window.scroll({ top: 0, left: 0 }), 0);
        } else {
          if (location.hash.length === 0) {
            window.scroll({ top: 0, left: 0 });
          } else {
            const hashElem = document.getElementById(
              location.hash.replace("#", "")
            );
            hashElem && hashElem.scrollIntoView();
          }
        }
      }
    },
    [currentRoute, setCurrentRoute]
  );

  useEffect(() => {
    const listener = browserHistory.listen(onRouteChange);
    return listener;
  }, [onRouteChange]);

  return (
    <main
      css={currentRoute === "/" ? ß.home : mobileMode ? ß.mainMobile : ß.main}
    >
      <div>
        <Routes>
          {map((route) => {
            const LazyComp = lazy(() =>
              import(`../../book_fragments/${route.module}`)
            );
            return (
              <Route
                path={route.url}
                key={route.module}
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LazyComp />
                  </Suspense>
                }
              />
            );
          }, routes)}
          <Route path="/interactive-demo" element={<InteractiveDemo />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;
