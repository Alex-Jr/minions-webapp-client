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
    <div id="productListContainer">
      <div id="productGrid">
        {productListData.map((product, index) => {
          return (
            <Link to={"/product/" + product.id} key={index}>
              <div className="productContainer">
                <img src={product.img} alt={product.name} className="productImg"></img>
                <p className="productName">{product.name}</p>
                <p className="productPrice">R$ {product.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
