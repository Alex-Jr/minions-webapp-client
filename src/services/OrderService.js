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
      });
  },
  postOrders: async (order) => {
    return await API.post(APINAME, `/orders`, { body: order })
      .then((response) => {
        if (!("orderId" in response)) throw new Error();
        return response;
      });
  },
  getOrdersList: async () => {
    return await API.get(APINAME, `/orders`)
      .then((response) => {
        if (!Array.isArray(response)) throw new Error("Nenhum pedido foi encontrado");
        return response;
      });
  },
  getOrders: async (orderId) => {
    return await API.get(APINAME, `/orders/${orderId}`)
      .then((response) => {
        if ("message" in response || response === "no data") throw new Error("Nenhum pedido foi encontrado");
        return response;
      })
  },
};
