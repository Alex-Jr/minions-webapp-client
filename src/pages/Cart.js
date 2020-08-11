import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormatPrice from "../Utils/FormatPrice";
import "./Cart.css";

const Cart = () => {
  const history = useHistory()
  const products = useSelector((state) => state.cartReducer.products);
  const logged = useSelector((state) => state.userReducer.logged);
  const handleSubmitPurchase = () => {
    if(!logged){
      history.push("/login")
    }
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
