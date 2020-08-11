import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductServices from "../services/ProductServices";
import { addtocart } from "../redux/actions/cart";

const Product = () => {
  let { id } = useParams();
  const [productInfo, setProductInfo] = useState();
  const dispatch = useDispatch();

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

  const handleAddToCart = () => {
    dispatch(addtocart(productInfo))
  }


  return (
    <div id="product-page">
      {productInfo && (
        <div id="product-infoContainer">
          <div id="product-left" className="product-imgContainer">
            <img
              src={process.env.PUBLIC_URL + "/img/product1.png"}
              alt="minions-please"
              id="product-img"
            />
          </div>
          <div id="product-right" className="product-textContainer">
            <div id="product-name">{productInfo.name}</div>
            <div id="product-desc">{productInfo.desc}</div>
            <div id="product-price">R${formatPrice(productInfo.price)}</div>
            <button
              id="product-addtocartBtn"
              onClick={() => {
                handleAddToCart()
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
