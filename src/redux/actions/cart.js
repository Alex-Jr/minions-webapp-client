export const ADD_TO_CART = "ADDTOCART";
export const UPDATE_CART = "UPDATECART";
export const REMOVE_FROM_CART = "REMOVEFROMCART";
export const CLEAR_CART = "CLEARCART";

export const addtocart = (product) => {
  return { type: ADD_TO_CART, product: product};
};

export const updatecart = (productId, newQuantity) => {
  return { type: UPDATE_CART, productId: productId, newQuantity: newQuantity};
};

export const removefromcart = (productId) => {
  return { type: REMOVE_FROM_CART, productId: productId };
};

export const clearcart = () => {
  return { type: CLEAR_CART };
};


