import { LOGIN, SINGOUT } from "../actions/user";

const initialState = {
  logged: false,
  userId: null,
  email: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {logged: true, userId: action.userId, email:action.email}
    case SINGOUT:
      return {logged: false, userId: null, email: null}    

    default:
      return state;
  }
};

export default userReducer;
