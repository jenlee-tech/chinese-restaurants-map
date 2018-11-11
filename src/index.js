import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render( < App / > , document.getElementById("root"));

// I called the register() but there is an option to turn it off
// to unregister(). There are some caveats to calling register(), read below.
// Learn more about service workers:
//https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app#offline-first-considerations

serviceWorker.register();