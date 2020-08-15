import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { Link, useLocation } from "react-router-dom";
import ProductServices from "../services/ProductServices";

const ProductsList = () => {
  const [productListData, setProdcutListData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    ProductServices.getProductList(
      state === null ? "miniatura" : state.category
    )
      .then((data) => {
        setProdcutListData(data);
      })
      .catch(() => {
        setProdcutListData([]);
      });
  }, [state]);

  return (
    <div id="productList-page">
      <div id="productList-grid">
        {productListData.map((product, index) => {
          return (
            <Link to={"/products/" + product.productId} key={index}>
              <div className="productList-productContainer">
                <img
                  src={product.url}
                  alt={product.name}
                  className="productList-productImg"
                ></img>
                <div>
                  <div className="productList-textWhite productList-text">
                    {product.name}
                  </div>
                  <div className="productList-productPrice productList-text">
                    R$ {product.price}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
