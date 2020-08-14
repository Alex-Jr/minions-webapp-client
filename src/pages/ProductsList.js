import React, { useState, useEffect } from "react";
import "./ProductList.css";
import { Link, useLocation } from "react-router-dom";
import ProductServices from "../services/ProductServices";

const ProductsList = () => {
  const [productListData, setProdcutListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  useEffect(() => {
    if (isLoading) {
      ProductServices.getProductList(
        state === null ? "miniatura" : state.category
      ).then((data) => {
        setProdcutListData(data);
        setIsLoading(false);
      });
    }
  }, [isLoading, state]);

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
