import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// POLYFILLS
import "core-js/es/object";
import "core-js/es/weak-set";
import "core-js/es/string";
import "core-js/es/promise";
import "core-js/es/typed-array";
import "core-js/es/array-buffer";
// Hlolli style helpers
import "./hlolli.css";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
