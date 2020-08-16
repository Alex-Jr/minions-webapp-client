import { LOGIN, SINGOUT } from "../actions/user";

const initialState = {
  logged: false,
  email: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {logged: true, email:action.email}
    case SINGOUT:
      return {logged: false, email: null}    

    default:
      return state;
  }
};

export default userReducer;
