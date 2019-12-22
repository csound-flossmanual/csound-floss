/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense, useEffect, useState } from "react";
import TOC from "./book_fragments/00--aa-toc";
// import DocumentTitle from "react-document-title";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./book_fragments/routes.json";
import { map } from "ramda";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

function App() {
  // const [currentRoute, setCurrentRoute] = useState(
  // browserHistory.location.pathname
  // );
  useEffect(() => {
    browserHistory.listen((location, action) => {
      // console.log(action, location.pathname, location.state);
    });
  }, []);
  return (
    <BrowserRouter history={browserHistory}>
      <div
        css={css`
          padding: 0 32px;
          & > div {
            margin-right: auto;
            margin-left: auto;
            padding: 50px !important;
            background-color: #fff !important;
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
        <Suspense fallback={<div />}>
          <Switch>
            {map(
              route => (
                <Route
                  onChange={chng => console.log("XXX", chng)}
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
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
