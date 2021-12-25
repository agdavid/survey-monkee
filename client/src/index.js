// data layer control (Redux)

import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

// Development only axios helpers!
import axios from "axios";
window.axios = axios;

// redux store at top-level of application
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// wrap App in Provider so all children components have access to store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
