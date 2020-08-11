export default (price) => {
  price = price.toString().split(".");
  if (price.length === 1) return "R$" + price + ",00";
  if (price[1].length === 1) {
    price[1] += "0";
  }
  return "R$" + price.join(",");
};