import React from "react";
import { Link } from "react-router-dom";

import { Slideshow } from "../../components"
import "./Home.css";

const slideshowData = [
  process.env.PUBLIC_URL + "/img/slide0.jpg",
  process.env.PUBLIC_URL + "/img/slide1.jpg",
];

const Home = () => {
  return (
    <div id="home-page">
      <section>
        <Slideshow data={slideshowData}/ >
        <div id="home-categoryContainer">
          <img
            src={process.env.PUBLIC_URL + "/img/minions-pls.png"}
            alt="minions-please"
            id="home-minionCategory"
          />
          <div id="home-categories">
            <Link
              to={{ pathname: "/products", state: { category: "miniatura" } }}
            >
              <div className="home-category">Miniaturas</div>
            </Link>
            <Link
              to={{ pathname: "/products", state: { category: "pelucia" } }}
            >
              <div className="home-category">Pelúcia</div>
            </Link>
            <Link to={{ pathname: "/products", state: { category: "roupa" } }}>
              <div className="home-category">Roupas</div>
            </Link>
            <Link to={{ pathname: "/products", state: { category: "misc" } }}>
              <div className="home-category">Miscelânia</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
