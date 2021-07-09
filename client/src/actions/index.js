import axios from "axios";

import { FETCH_USER } from "./types";

export const fetchUser = () => {
  // request to backend
  // redux-thunk will see a returned function
  // and use dispatch function to forward action to all reducers
  return function (dispatch) {
    axios
      .get("/api/current_user")
      .then((res) => dispatch({ type: FETCH_USER, payload: res }));
  };
};
