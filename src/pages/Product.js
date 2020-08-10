import React from "react";
import "./ProductList.css";
import { useParams } from "react-router-dom";

const Product = () => {
  let { id } = useParams()
  console.log(id)
  return (
    <div id="productListContainer">
      
    </div>
  );
};

export default Product;
