import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OrderService from "../../services/OrderService";
import { SubmitButton } from "../../components";
import { clearcart } from "../../redux/actions/cart";
import { useForm } from "../../hooks";
import "./Checkout.css";

const Checkout = () => {
  const [{ values, isLoading }, handleChange, handleSubmit] = useForm();

  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    uf: "",
  });

  const user = useSelector((state) => state.userReducer);
  const cart = useSelector((state) => state.cartReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.values(cart.products).length === 0) history.push("/");
  }, [cart, history]);

  const handlePurchase = async () => {
    const order = {
      email: user.email,
      address: { ...address, ...values },
      products: cart.products,
      totalPrice: cart.totalPrice,
    };
    await OrderService.postOrders(order)
      .then(() => {
        alert("Pedido realizado com sucesso");
        dispatch(clearcart());
      })
      .catch(() => {
        alert("Falha ao realizar pedido!");
      });
  };

  useEffect(() => {
    const { cep } = values;
    if (!cep) return;
    if (cep.length !== 9) return;
    const regex = new RegExp("^([0-9]{5})-([0-9]{3})");
    if (regex.test(cep)) {
      OrderService.getAddress(cep.replace("-", ""))
        .then((fullAddress) => {
          setAddress({
            street: fullAddress.logradouro,
            neighborhood: fullAddress.bairro,
            city: fullAddress.localidade,
            uf: fullAddress.uf,
          });
        })
        .catch(() => {
          alert("CEP Não encontrado");
        });
    } else {
      alert("CEP Inválido");
    }
  }, [values]);

  return (
    <div id="checkout-page">
      <form id="checkout-grid" onSubmit={handleSubmit(handlePurchase)}>
        <div id="checkout-addressContainer">
          <h1 className="checkout-title">Dados de Entrega</h1>
          <label className="checkout-label">
            CEP:
            <br />
            <input
              required={true}
              className="checkout-input"
              type="text"
              name="cep"
              maxLength={9}
              onChange={handleChange}
            />
          </label>
          <label className="checkout-label checkout-float">
            Endereço:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={address.street}
              disabled
            />
          </label>
          <label className="checkout-label">
            N°:
            <br />
            <input
              className="checkout-input checkout-small"
              type="text"
              name="streetNumber"
              onChange={handleChange}
            />
          </label>
          <label className="checkout-label">
            Bairro:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={address.neighborhood}
              disabled
            />
          </label>
          <label className="checkout-label checkout-float">
            Estado:
            <br />
            <input
              className="checkout-input"
              type="text"
              value={address.city}
              disabled
            />
          </label>
          <label className="checkout-label">
            UF:
            <br />
            <input
              className="checkout-input checkout-small"
              type="text"
              value={address.uf}
              disabled
            />
          </label>
          <label className="checkout-label">
            Complemento:
            <br />
            <input
              className="checkout-input"
              type="text"
              name="additional"
              onChange={handleChange}
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
