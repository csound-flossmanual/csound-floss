/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import HomeScreen from "../HomeScreen";
// import TOC from "../../book_fragments/00--aa-toc";
import { Route, Switch } from "react-router-dom";
import routes from "../../book_fragments/routes.json";
import { map } from "ramda";
import { browserHistory } from "../../history";
import * as ß from "./styles";

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
    <main css={mobileMode ? ß.mainMobile : ß.main}>
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          <Switch>
            {map(
              route => (
                <Route
                  path={route.url}
                  key={route.module}
                  component={lazy(() =>
                    import(`../../book_fragments/${route.module}`)
                  )}
                />
              ),
              routes
            )}
            <Route path={"/"}>
              <HomeScreen />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </main>
  );
}

export default Main;
