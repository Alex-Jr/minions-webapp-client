import React, { useState, useEffect } from "react";

import "./Checkout.css";
import FormatNumber from "../Utils/FormatNumber";
import OrderService from "../services/OrderService";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const [cep, setCEP] = useState("");
  const [address, setAddress] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [additional, setAdditional] = useState("");

  const user = useSelector((state) => state.userReducer);
  const cart = useSelector((state) => state.cartReducer);

  const history = useHistory()

  const handleCepChange = (cep) => {
    setCEP(FormatNumber(cep));
  };

  const handleSubmitPurchase = async() => {
    if(!user.logged){
      history.push("/login")
      return
    } 
    const order = {
      userId: "teste",
      address: {
        street: "Rua capitão Lafay, 330",
        cep: 23059160
      },
      products: cart.products,
      totalPrice: cart.totalPrice
    }
    await OrderService.postOrder(order).then((response) => {
      if("orderId" in response){
        history.push("/orderSucessful", {orderId: response.orderId});
      } else {
        alert("Falha ao realizar pedido!")
      }
    })
    
  }

  useEffect(() => {
    if (cep.length === 8) {
      OrderService.getAddress(cep).then((fullAddress) => {
        setAddress(fullAddress.logradouro);
        setNeighborhood(fullAddress.bairro);
        setCity(fullAddress.localidade);
        setUf(fullAddress.uf);
      });
    }
  }, [cep]);

  return (
    <div id="checkout-page">
      <div id="checkout-grid">
        <div id="checkout-addressContainer">
          <h1 className="checkout-title">Dados de Entrega</h1>
          <label className="checkout-label">
            CEP:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={cep}
              maxLength={8}
              onChange={(event) => {
                handleCepChange(event.target.value);
              }}
            />
          </label>
          <label className="checkout-label checkout-float">
            Endereço:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={address}
              disabled
            />
          </label>
          <label className="checkout-label">
            N°:
            <br />
            <input
              className="checkout-input checkout-small"
              type="text"
              value={streetNumber}
              onChange={(event) => {
                setStreetNumber(FormatNumber(event.target.value));
              }}
            />
          </label>
          <label className="checkout-label">
            Bairro:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={neighborhood}
              disabled
            />
          </label>
          <label className="checkout-label checkout-float">
            Estado:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={city}
              disabled
            />
          </label>
          <label className="checkout-label">
            UF:
            <br />
            <input
              className="checkout-input checkout-small"
              type="text"
              value={uf}
              disabled
            />
          </label>
          <label className="checkout-label">
            Complemento:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={additional}
              onChange={(event) => {
                setAdditional(event.target.value);
              }}
            />
          </label>
        </div>
        <div id="checkout-paymentMethod">
          <h1 className="checkout-title">Informação de contato</h1>
          <label className="checkout-label">
            Nome:
            <br />
            <input
              className="checkout-input"
              type="text"
            />
          </label>
          <label className="checkout-label">
            Email:
            <br />
            <input
              className="checkout-input"
              type="text"
              disabled
            />
          </label>
          <label className="checkout-label">
            Telefone:
            <br />
            <input
              className="checkout-input"
              type="text"
            />
          </label>
          <button id="checkout-button" onClick={() => {handleSubmitPurchase()}}>RESERVAR PEDIDO</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
