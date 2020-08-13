import { API } from "aws-amplify";
import awsConfig from "../awsConfig";

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
        return;
      });
  },
  postOrders: async (order) => {
    return await API.post(awsConfig.orders_apiGateway.NAME, `orders`, {body: order})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
};
