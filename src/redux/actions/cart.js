export const ADD_TO_CART = "ADDTOCART";
export const INIT_CART = "INITCART";

export const addtocart = (product) => {
  return { type: ADD_TO_CART, product: product};
};


