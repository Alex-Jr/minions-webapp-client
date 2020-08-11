import React from "react";
// import React, { useEffect, useState } from "react"
import "./Product.css";
// import { useParams } from "react-router-dom";
// import { API } from "aws-amplify";

const Product = () => {
  // let { id } = useParams();
  // const [productInfo, setProductInfo] = useState();
  const productInfo = {
    category: "brinquedos",
    price: 13.5,
    url: "teste",
    name: "Kevin 16 cm",
    productId: "123",
    desc:
      "Com sua roupa mais simples, Kevin está chegando para arrasar com seus incríveis 16 cm de altura para conquistar seu coração",
  };

  const formatPrice = (price) =>{
    price = price.toString().split(".");
    if(price.length === 1) return price + ",00"
    if(price[1].length === 1) {
      price[1] += "0"
    }
    return price.join(",")
  }

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
            <button id="buyBtn" onClick={() => {alert("você me clicou!")}}>RESERVAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
