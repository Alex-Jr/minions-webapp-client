import { API } from "aws-amplify";
import awsConfig from "../awsConfig";

const APINAME = awsConfig.orders_apiGateway.NAME

export default {
  getAddress: async (cep) => {
    return await fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if ("erro" in data) throw new Error("CEP Não encontrado");
        return data;
      })
      .catch((err) => {
        return null;
      });
  },
  postOrders: async (order) => {
    return await API.post(APINAME, `orders`, {body: order})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  },
  getOrders: async(userId) => {
    return await API.get(APINAME, `orders?userId=${userId}`)
      .then((response) => {
        if(!Array.isArray(response)) throw new Error("Nenhum pedido foi encontrado")
        return response;
      })
      .catch((err) => {
        console.log(err)
        return [];
      });
  }
};
