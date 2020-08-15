import { API } from "aws-amplify";
import awsConfig from "../awsConfig";

const APINAME = awsConfig.products_apiGateway.NAME;

export default {
  getProductInfo: async (id) => {
    return await API.get(APINAME, `/products/${id}`)
      .then((data) => {
        if (!data) throw new Error();
        return data;
      })
  },
  getProductList: async (category) => {
    return await API.get(APINAME, `/products?category=${category}`)
      .then((data) => {
        if (!data) throw new Error();
        return data;
      })
  },
};
