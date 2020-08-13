import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/cart";

const initialState = {
  count : 0,
  products: {},
  totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if(action.product.productId in state.products) return (state);

      const product = action.product;
      let obj = {}
      obj[product.productId] = product;

      return {
        count : state.count + 1,
        products: {...state.products, ...obj},
        totalPrice: state.totalPrice + (product.quantity * product.price)
      }
      
    case UPDATE_CART:
      const newProductsList = state.products
      newProductsList[action.productId].quantity += action.newQuantity 

      return {
        count: state.count,
        products: newProductsList,
        totalPrice: state.totalPrice + newProductsList[action.productId].price * action.newQuantity 
      };

    case REMOVE_FROM_CART:
      const newProductList = state.products
      const { quantity, price } = newProductList[action.productId]
      delete newProductList[action.productId] 

      return {
        count: state.count - 1,
        products: newProductList,
        totalPrice: state.totalPrice - (quantity * price)
      };

    case CLEAR_CART:
      return {
        count: 0,
        products: {},
        totalPrice: 0
      }

    default:
      return state;
  }
};

export default cartReducer;
