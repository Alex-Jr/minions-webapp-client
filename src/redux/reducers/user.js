import { LOGIN, SINGOUT } from "../actions/user";

const initialState = {
  logged: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {logged: true}
    case SINGOUT:
      return {logged: false}    

    default:
      return state;
  }
};

export default userReducer;
