import React from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

const productListData = [
  {
    id: 124,
    name: "Boneco 12 Polegadas - Kevin",
    img: process.env.PUBLIC_URL + "/img/product1.png",
    price: 60.33,
  },
  {
    id: 2,
    name: "Mini Boneco 6cm - Kevin",
    img: process.env.PUBLIC_URL + "/img/product2.png",
    price: 12.11,
  },
  {
    id: 2,
    name: "Mini Boneco 6cm - Kevin",
    img: process.env.PUBLIC_URL + "/img/product2.png",
    price: 12.11,
  },
  {
    id: 2,
    name: "Mini Boneco 6cm - Kevin",
    img: process.env.PUBLIC_URL + "/img/product2.png",
    price: 12.11,
  },
  {
    id: 2,
    name: "Mini Boneco 6cm - Kevin",
    img: process.env.PUBLIC_URL + "/img/product2.png",
    price: 12.11,
  },
];

const ProductList = () => {
  return (
    <div id="productList-page">
      <div id="productList-grid">
        {productListData.map((product, index) => {
          return (
            <Link to={"/product/" + product.id} key={index}>
              <div className="productList-productContainer">
                <img src={product.img} alt={product.name} className="productList-productImg"></img>
                <p className="productList-productName productList-text">{product.name}</p>
                <p className="productList-productPrice productList-text">R$ {product.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
