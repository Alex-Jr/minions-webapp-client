import React, { useState, useEffect } from "react";

import "./Checkout.css";
import FormatNumber from "../utils/FormatNumber";
import OrderService from "../services/OrderService";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitButton } from "../components";
import { clearcart } from "../redux/actions/cart";

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

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(cart.products).length === 0) history.push("/");
    if (!user.logged) history.push("/cart");
  }, [cart, history, user]);

  const handleSubmitPurchase = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const order = {
      userId: user.userId,
      email: user.email,
      address: {
        cep: `${cep}`,
        street: `${street},${streetNumber}`,
        neighborhood: `${neighborhood}`,
        city: `${city} - ${uf}`,
        additional: `${additional}`,
      },
      products: cart.products,
      totalPrice: cart.totalPrice,
    };
    await OrderService.postOrders(order).then((response) => {
      if ("orderId" in response) {
        alert("Pedido realizado com sucesso");
        dispatch(clearcart());
        history.push("/");
      } else {
        alert("Falha ao realizar pedido!");
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if(cep.length !== 9) return;
    const regex =  new RegExp("^([0-9]{5})-([0-9]{3})");
    if (regex.test(cep)) {
      OrderService.getAddress(cep.replace("-",""))
        .then((fullAddress) => {
          setStreet(fullAddress.logradouro);
          setNeighborhood(fullAddress.bairro);
          setCity(fullAddress.localidade);
          setUf(fullAddress.uf);
        })
    } else {
      alert("CEP Inválido")
    }
  }, [cep]);

  return (
    <div id="checkout-page">
      <form
        id="checkout-grid"
        onSubmit={(event) => {
          handleSubmitPurchase(event);
        }}
      >
        <div id="checkout-addressContainer">
          <h1 className="checkout-title">Dados de Entrega</h1>
          <label className="checkout-label">
            CEP:
            <br />
            <input
              required={true}
              className="checkout-input"
              type="text"
              value={cep}
              maxLength={9}
              onChange={(event) => {
                setCEP(event.target.value);
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
          <h1 className="checkout-title">Informações Pessoais</h1>
          <label className="checkout-label">
            Nome:
            <br />
            <input className="checkout-input" type="text" />
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
        </div>
      </form>
    </div>
  );
};

export default Checkout;
