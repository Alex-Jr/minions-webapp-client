import { API } from "aws-amplify";

export default {
  getProductInfo: async (id) => {
    return await API.get("prod-minions-webapp-products-api", `products/${id}`)
      .then((data) => {
        if (!data) return null;
        return data;
      })
      .catch((err) => {
        return null;
      });
  },
}
