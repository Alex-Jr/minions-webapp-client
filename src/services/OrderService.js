import { API } from "aws-amplify";
import awsConfig from "../awsConfig";

const APINAME = awsConfig.orders_apiGateway.NAME;

export default {
  getAddress: async (cep) => {
    return await fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .then((data) => {
        if ("erro" in data) throw new Error();
        return data;
      })
      .catch((err) => {
        alert("CEP não encontrado")
        return {
          logradouro: "",
          bairro: "",
          localidade: "",
          uf: "",
        };
      });
  },
  postOrders: async (order) => {
    return await API.post(APINAME, `/orders`, { body: order })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  },
  getOrdersList: async (userId) => {
    return await API.get(APINAME, `/orders?userId=${userId}`)
      .then((response) => {
        if (!Array.isArray(response))
          throw new Error("Nenhum pedido foi encontrado");
        return response;
      })
      .catch((err) => {
        return [];
      });
  },
  getOrders: async (orderId) => {
    return await API.get(APINAME, `/orders/${orderId}`)
      .then((response) => {
        if ("message" in response || response === "no data") throw new Error("Nenhum pedido foi encontrado");
        return response;
      })
      .catch((err) => {
        return {};
      });
  },
};
