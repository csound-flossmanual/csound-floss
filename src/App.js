/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import TOC from "./book_fragments/00--aa-toc";
import { Router, Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import routes from "./book_fragments/routes.json";
import { findIndex, map, propEq } from "ramda";
import { browserHistory } from "./history";

function App() {
  const [currentRoute, setCurrentRoute] = useState(
    browserHistory.location.pathname
  );
  useEffect(() => {
    browserHistory.listen((location, action) => {
      setCurrentRoute(location.pathname);
    });
  }, []);

  const routeIndex = findIndex(
    propEq("url", currentRoute === "/" ? "/introduction/-aa-toc" : currentRoute)
  )(routes);

  return (
    <Router history={browserHistory}>
      <div
        css={css`
          flex: 1 0 auto;
          padding: 0 32px;
          & > div {
            background-color: #fff !important;
            margin-right: auto;
            margin-left: auto;
            padding: 50px !important;
            margin-bottom: 20px;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
          }
          @media (min-width: 1200px) {
            & > div {
              width: 970px;
            }
          }

          @media (min-width: 900px) {
            & {
              padding: 48px 72px;
            }
          }

          @media (max-width: 600px) {
            & {
              padding: 0 !important;
              overflow: auto !important;
            }
          }
        `}
      >
        <Suspense fallback={<div style={{ height: "80vh" }} />}>
          <div>
            <Switch>
              {map(
                route => (
                  <Route
                    path={route.url}
                    key={route.module}
                    component={lazy(() =>
                      import(`./book_fragments/${route.module}`)
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
      </div>
      <Footer routeIndex={routeIndex} />
    </Router>
  );
}

export default App;
