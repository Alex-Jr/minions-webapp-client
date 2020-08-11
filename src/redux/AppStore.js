import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/user";
import cartReducer from "./reducers/cart";

export default createStore(
  combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer
  })
)