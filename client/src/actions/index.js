import axios from "axios";

import { FETCH_USER } from "./types";

const fetchUser = () => {
  // request to backend
  axios.get("/api/current_user");
};
