import { ADD_TO_CART, INIT_CART } from "../actions/cart";

const initialState = {
  count : 0,
  products: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log(state)
      console.log(action)
      return {
        count : state.count + 1,
        products: state.products.concat([action.product])
      }

    default:
      return state;
  }
};

export default cartReducer;
