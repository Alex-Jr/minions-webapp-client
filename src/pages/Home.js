import React, { useState, useEffect } from "react";
import "./Home.css";

const slideShowData = [
  process.env.PUBLIC_URL + "/img/slide1.webp",
  process.env.PUBLIC_URL + "/img/slide2.jpg",
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
    <div id="homeContainer">
      <section>
        <div id="slideshow">
          <button
            onClick={() => {
              slideShowHandler("left");
            }}
            id="left-arrowBtn"
            className="arrowBtn"
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
              alt="left-arrow"
              className="arrowSvg"
            />
          </button>
          <img src={currentImg} alt="minion" id="minions-img" />
          <button
            onClick={() => {
              slideShowHandler("right");
            }}
            id="right-arrowBtn"
            className="arrowBtn"
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
              alt="right-arrow"
              className="arrowSvg"
            />
          </button>
        </div>
        <div id="categoryContainer">
            <img src={process.env.PUBLIC_URL + "/img/minions-pls.png"} alt="minions-please" id="minions-pls-img"/>
            <div id="categories">
              <div className="category">
                Brinquedos
              </div>
              <div className="category">
                Pelúcia
              </div>
              <div className="category">
                Roupas
              </div>
              <div className="category">
                Miscelânia
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
