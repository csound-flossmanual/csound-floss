/** @jsx jsx */
import { jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import TOC from "../../book_fragments/00--aa-toc";
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
      justifyContent: "center"
    }}
  >
    <style>{"main {width: 100%;height:90vh;}"}</style>
    <div css={ß.loadingSpinner} />
  </div>
);

function Main({ currentRoute, setCurrentRoute }) {
  useEffect(() => {
    browserHistory.listen((location, action) => {
      setCurrentRoute(location.pathname);
      if (action === "PUSH") {
        setTimeout(() => window.scroll({ top: 0, left: 0 }), 0);
      }
    });
  }, [setCurrentRoute]);

  return (
    <main css={ß.main}>
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
              <TOC />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </main>
  );
}

export default Main;
