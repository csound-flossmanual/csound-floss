/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import HomeScreen from "../HomeScreen";
import { Route, Routes } from "react-router-dom";
import routes from "../../book_fragments/routes.json";
import routesFr from "../../book_fragments_fr/routes.json";
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

function scrollIntoView(element) {
  let count = 0;
  const intervalHandler = setInterval(() => {
    try {
      element.scrollIntoView();
    } catch (error) {
      console.error("error scrolling into view", error);
    }
    if (count === 3) {
      clearInterval(intervalHandler);
    } else {
      count += 1;
    }
  }, 10);
}

function Main({ currentRoute, mobileMode, setCurrentRoute }) {
  const onRouteChange = React.useCallback(
    ({ action, location }) => {
      // console.log({ action, location });
      setCurrentRoute(location.pathname);
      if (["POP", "PUSH"].includes(action)) {
        if (!location.hash || location.hash.length === 0) {
          window.scroll({ top: 0, left: 0 });
          setTimeout(() => {
            window.scroll({ top: 0, left: 0 });
          }, 50);
        } else {
          const hashElem = document.getElementById(
            location.hash.replace("#", "")
          );
          if (hashElem) {
            scrollIntoView(hashElem);
          }
        }
      }
    },
    [setCurrentRoute]
  );

  useEffect(() => {
    const listener = browserHistory.listen(onRouteChange);
    return listener;
  }, [onRouteChange]);

  const memoizedRoutes = useMemo(() => {
    const englishRoutes = map((route) => {
      const LazyComp = lazy(
        () => import(`../../book_fragments/${route.module}`)
      );
      return (
        <Route
          path={route.url}
          key={route.url}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyComp key={"lazy-" + route.url} />
            </Suspense>
          }
        />
      );
    }, routes);

    const frenchRoutes = map((route) => {
      const LazyComp = lazy(
        () => import(`../../book_fragments_fr/${route.module}`)
      );
      return (
        <Route
          path={route.url}
          key={route.url}
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyComp key={"lazy-fr-" + route.url} />
            </Suspense>
          }
        />
      );
    }, routesFr || []);

    return [...englishRoutes, ...frenchRoutes];
  }, []);

  return (
    <main
      css={currentRoute === "/" ? ß.home : mobileMode ? ß.mainMobile : ß.main}
    >
      <div>
        <Routes>
          {memoizedRoutes}
          <Route path="/interactive-demo" element={<InteractiveDemo />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;
