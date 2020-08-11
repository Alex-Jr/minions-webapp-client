import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import ProductServices from "../services/ProductServices";

const Product = () => {
  let { id } = useParams();
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    ProductServices.getProductInfo(id)
      .then((response) => {
        if(response) setProductInfo(response)
      })
      .catch((err) => {
        console.log(err)
      });
  }, [id]);


  const formatPrice = (price) => {
    price = price.toString().split(".");
    if (price.length === 1) return price + ",00";
    if (price[1].length === 1) {
      price[1] += "0";
    }
    return price.join(",");
  };

  return (
    <div id="productListContainer">
      {productInfo && (
        <div id="productContainer">
          <div id="productLeftContainer" className="container">
            <img
              src={process.env.PUBLIC_URL + "/img/product1.png"}
              alt="minions-please"
              id="productImg"
            />
          </div>
          <div id="productRightContainer" className="container">
            <div id="productName">{productInfo.name}</div>
            <div id="productDesc">{productInfo.desc}</div>
            <div id="productPrice">R${formatPrice(productInfo.price)}</div>
            <button
              id="buyBtn"
              onClick={() => {
                alert("você me clicou!");
              }}
            >
              RESERVAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
