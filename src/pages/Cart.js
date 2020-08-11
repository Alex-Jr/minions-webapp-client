import React from "react";
import { useSelector } from "react-redux";
import FormatPrice from "../Utils/FormatPrice";
import "./Cart.css";

const Cart = () => {
  const products = useSelector((state) => state.cartReducer.products);
  const handleSubmitPurchase = () => {
    
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
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <th>
                  <img
                    src={process.env.PUBLIC_URL + "/img/product1.png"}
                    alt="product-img"
                    className="cart-productImg"
                    />
                </th>
                <th>{product.name}</th>
                <th>{FormatPrice(product.price)}</th>
                <th>{product.quantity}</th>
                <th>{FormatPrice(product.price * product.quantity)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="cart-finishPurchase">
        <div id="cart-finishPurchaseTotal">TOTAL: {FormatPrice(40.50)}</div>
        <button id="cart-finishPurchaseBtn" onClick={() => {handleSubmitPurchase()}}>FINALIZAR COMPRA</button>
      </div>
    </div>
  );
};

export default Cart;
