import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import FormatPrice from "../../utils/FormatPrice";
import { updatecart, removefromcart } from "../../redux/actions/cart";
import "./Cart.css";

const Cart = () => {
  const { products, totalPrice } = useSelector((state) => state.cartReducer);
  const { logged } = useSelector((state) => state.userReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updatecart(productId, newQuantity));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removefromcart(productId));
  };

  const handleFinishPurchase = () => {
    if(totalPrice === 0) {
      alert("Seu carrinho está vazio!");
      return
    }
    if(!logged){
      history.push("/login")
      return
    }
    history.push("/checkout")
  }

  return (
    <div id="cart-page">
      <table id="cart-table">
        <thead id="cart-tableHeader">
          <tr>
            <th>Imagem</th>
            <th>Produto</th>
            <th className="cart-mobileStyle">Valor Uninário</th>
            <th>Quantidade</th>
            <th className="cart-mobileStyle">SubTotal</th>
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
                    onClick={() => {
                      handleRemoveProduct(product.productId);
                    }}
                  />
                </th>
                <th className="cart-mobileStyle">{FormatPrice(product.price)}</th>
                <th>
                  <img
                    src={process.env.PUBLIC_URL + "/svg/minus.svg"}
                    alt="minus-icon"
                    className="cart-svg"
                    onClick={() => {
                      if (product.quantity - 1 === 0) {
                        handleRemoveProduct(product.productId);
                      } else {
                        handleQuantityChange(product.productId, -1);
                      }
                    }}
                  />
                  {product.quantity}
                  <img
                    src={process.env.PUBLIC_URL + "/svg/add.svg"}
                    alt="plus-icon"
                    className="cart-svg"
                    onClick={() => {
                      handleQuantityChange(product.productId, +1);
                    }}
                  />
                </th>
                <th className="cart-mobileStyle">{FormatPrice(product.price * product.quantity)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="cart-finishPurchase">
        <div id="cart-finishPurchaseTotal">
          TOTAL: {FormatPrice(totalPrice)}
        </div>
        <button
          id="cart-finishPurchaseBtn"
          onClick={() => {
            handleFinishPurchase()
          }}
        >
          FINALIZAR COMPRA
        </button>
      </div>
    </div>
  );
};

export default Cart;
