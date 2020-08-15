import React, { useState, useCallback, useEffect } from "react";

import "./Slideshow.css";

const Slideshow = ({ data }) => {
  const [counter, setCounter] = useState(0);

  const slideShowHandler = useCallback(
    (direction) => {
      if (direction === "right") {
        if (counter === data.length - 1) {
          setCounter(0);
        } else {
          setCounter(counter + 1);
        }
      }
      if (direction === "left") {
        if (counter === 0) {
          setCounter(data.length - 1);
        } else {
          setCounter(counter - 1);
        }
      }
    },
    [counter, data]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      slideShowHandler("right");
    }, 5000);
    return () => clearInterval(interval);
  }, [slideShowHandler]);
  return (
    <div id="slideshow">
      <button
        onClick={() => {
          slideShowHandler("left");
        }}
        id="leftArrowBtn"
        className="arrowBtn"
      >
        <img
          src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
          alt="left-arrow"
          className="arrowSvg"
        />
      </button>
      {data.map((slideUrl, index) => (
        <img
          key={index}
          src={slideUrl}
          alt="minion"
          className={`${
            counter === index ? "currentSlideshow" : "displayNone"
          }`}
        />
      ))}
      <button
        onClick={() => {
          slideShowHandler("right");
        }}
        id="rightArrowBtn"
        className="arrowBtn"
      >
        <img
          src={process.env.PUBLIC_URL + "/svg/right-arrow.svg"}
          alt="right-arrow"
          className="arrowSvg"
        />
      </button>
    </div>
  );
};

export default Slideshow;
