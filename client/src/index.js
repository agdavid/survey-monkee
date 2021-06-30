// data layer control (Redux)

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";

// redux store at top-level of application
const store = createStore(() => [], {}, applyMiddleware());

// wrap App in Provider so all children components have access to store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
