import { FETCH_USER } from "../actions/types";

// create and export reducer
const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // logged out: "" || false
      // logged in: the user model
      // {
      //   googleId: "105678131036301297788"
      //   __v: 0
      //   _id: "60bd19785e9e50866f8781eb"
      // }
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
