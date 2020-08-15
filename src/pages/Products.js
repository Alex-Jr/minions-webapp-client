import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductServices from "../services/ProductServices";
import { addtocart } from "../redux/actions/cart";
import FormatPrice from "../utils/FormatPrice";

const Products = () => {
  const [productInfo, setProductInfo] = useState();
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    ProductServices.getProductInfo(id)
      .then((response) => {
        setProductInfo(response);
      })
      .catch((err) => {
        alert("Produto não encontrado")
        setProductInfo(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    productInfo["quantity"] = 1;
    dispatch(addtocart(productInfo));
  };

  return (
    <div id="product-page">
      {productInfo && (
        <div id="product-infoContainer">
          <div id="product-left" className="product-imgContainer">
            <img src={productInfo.url} alt="minions-please" id="product-img" />
          </div>
          <div id="product-right" className="product-textContainer">
            <div id="product-name">{productInfo.name}</div>
            <div id="product-desc">{productInfo.desc}</div>
            <div id="product-price">{FormatPrice(productInfo.price)}</div>
            <button
              id="product-addtocartBtn"
              onClick={() => {
                handleAddToCart();
                history.push("/cart");
              }}
            >
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
