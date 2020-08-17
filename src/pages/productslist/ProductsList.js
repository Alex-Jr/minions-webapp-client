import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import ProductServices from "../../services/ProductServices";
import FormatPrice from "../../utils/FormatPrice"
import "./ProductsList.css";

const ProductsList = () => {
  const [productListData, setProdcutListData] = useState([]);
  const { state } = useLocation();

  useEffect(() => {
    ProductServices.getProductList(
      state !== null ? state.category : undefined
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
                    {FormatPrice(product.price)}
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
