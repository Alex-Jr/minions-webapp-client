import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FormatPrice from "../Utils/FormatPrice";
import { updatecart, removefromcart } from "../redux/actions/cart";
import "./Cart.css";

const Cart = () => {
  const {products, totalPrice} = useSelector((state) => state.cartReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updatecart(productId, newQuantity))
  }

  const handleRemoveProduct = (productId) => {
    dispatch(removefromcart(productId))
  }

  return (
    <div id="cart-page">
      <table id="cart-table">
        <thead id="cart-tableHeader">
          <tr>
            <th>Imagem</th>
            <th>Produto</th>
            <th>Valor Uninário</th>
            <th>Quantidade</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody id="cart-tableBody">
          {Object.values(products).map((product, index) => {
            return (
              <tr key={index}>
                <th>
                  <img
                    src={product.url}
                    alt="product-img"
                    className="cart-productImg"
                    />
                </th>
                <th>
                  {product.name}
                  <img
                    src={process.env.PUBLIC_URL + "/svg/remove.svg"}
                    alt="minus-icon"
                    className="cart-svg cart-remove"
                    onClick={() => {handleRemoveProduct(product.productId)}}
                  />
                </th>
                <th>{FormatPrice(product.price)}</th>
                <th>
                  <img
                    src={process.env.PUBLIC_URL + "/svg/minus.svg"}
                    alt="minus-icon"
                    className="cart-svg"
                    onClick={() => {handleQuantityChange(product.productId, -1)}}
                  />
                  {product.quantity}
                  <img
                    src={process.env.PUBLIC_URL + "/svg/add.svg"}
                    alt="plus-icon"
                    className="cart-svg"
                    onClick={() => {handleQuantityChange(product.productId, +1)}}
                  />
                </th>
                <th>{FormatPrice(product.price * product.quantity)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="cart-finishPurchase">
        <div id="cart-finishPurchaseTotal">TOTAL: {FormatPrice(totalPrice)}</div>
        <button id="cart-finishPurchaseBtn" onClick={() => {history.push("/checkout")}}>FINALIZAR COMPRA</button>
      </div>
    </div>
  );
};

export default Cart;
