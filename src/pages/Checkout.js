import React, { useState, useEffect } from "react";

import "./Checkout.css";
import FormatNumber from "../Utils/FormatNumber";
import OrderService from "../services/OrderService";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitButton } from "../components";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cep, setCEP] = useState("");
  const [street, setStreet] = useState("");
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
      userId: user.userId,
      email: user.email,
      address: {
        cep: `${cep}`,
        street: `${street},${streetNumber}`,
        neighborhood: `${neighborhood}`,
        city: `${city} - ${uf}`,
        additional: `${additional}`
      },
      products: cart.products,
      totalPrice: cart.totalPrice
    }
    await OrderService.postOrders(order).then((response) => {
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
        if(!fullAddress) {
          alert("CEP Não encontrado");
          return
        }
        setStreet(fullAddress.logradouro);
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
              value={street}
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
              value={user.email}
              disabled
            />
          </label>
          <label className="checkout-label">
            Telefone:
            <br />
            <input className="checkout-input" type="text" />
          </label>
          <SubmitButton
            isLoading={isLoading}
            title="RESERVAR PEDIDO"
            className="checkout-btn"
          />
          </label>
          <button id="checkout-button" onClick={() => {handleSubmitPurchase()}}>RESERVAR PEDIDO</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
