import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const slideShowData = [
  process.env.PUBLIC_URL + "/img/slide0.jpg",
  process.env.PUBLIC_URL + "/img/slide1.jpg",
];

const Home = () => {
  const [currentImg, setCurrentImg] = useState(slideShowData[0]);
  const [counter, setCounter] = useState(0);

  const slideShowHandler = (direction) => {
    if (direction === "right") {
      if (counter === slideShowData.length - 1) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }
    if (direction === "left") {
      if (counter === 0) {
        setCounter(slideShowData.length - 1);
      } else {
        setCounter(counter - 1);
      }
    }
  };

  useEffect(() => {
    setCurrentImg(slideShowData[counter]);
  }, [counter]);

  return (
    <div id="home-page">
      <section>
        <div id="home-slideshow">
          <button
            onClick={() => {
              slideShowHandler("left");
            }}
            id="home-leftArrowBtn"
            className="home-arrowBtn"
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
              alt="left-arrow"
              className="home-arrowSvg"
            />
          </button>
          <img src={currentImg} alt="minion" id="home-slideshowImg" />
          <button
            onClick={() => {
              slideShowHandler("right");
            }}
            id="home-rightArrowBtn"
            className="home-arrowBtn"
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
              alt="right-arrow"
              className="home-arrowSvg"
            />
          </button>
        </div>
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
