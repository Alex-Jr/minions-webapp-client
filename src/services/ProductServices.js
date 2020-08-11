import { API } from "aws-amplify";
import awsConfig from "../awsConfig";

export default {
  getProductInfo: async (id) => {
    return await API.get(awsConfig.products_apiGateway.NAME, `/products/${id}`)
      .then((data) => {
        if (!data) return null;
        return data;
      })
      .catch((err) => {
        return null;
      });
  },
}
