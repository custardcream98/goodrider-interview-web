import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import Slider from "./Slider";
// import Image from "./Image";

const Image = ({ qNum, imgSrc, sliderValue }) => {
  const [loading, setLoading] = useState(true);

  const imgLoaded = () => setLoading(false);

  return (
    <div className={styles.Item}>
      <h5 className="display-block">{`${qNum + 1}. `}</h5>
      <div className={styles.ImgBox}>
        <Spinner
          as="p"
          animation="border"
          role="status"
          className={`${loading ? "" : "visually-hidden"}`}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <img
          className={`${loading ? "visually-hidden" : ""} ${
            qNum === 0
              ? sliderValue < 50
                ? styles.SelectedImg
                : styles.Img
              : sliderValue > 50
              ? styles.SelectedImg
              : styles.Img
          }`}
          src={`http://localhost:3000/${imgSrc}`}
          onLoad={imgLoaded}
        />
      </div>
    </div>
  );
};

const SliderQuestion = ({ onChange, index, text, val, img }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleValue = (val) => {
    setSliderValue(val);
    onChange(index, val >= 50 ? (val - 50) / 7 + 1 : 1 / ((50 - val) / 7 + 1));
  };

  useEffect(() => {
    setSliderValue(val >= 1 ? (val - 1) * 7 + 50 : -((1 / val - 1) * 7) + 50);
    myRef.current.scrollTop = 0;
  }, [index]);

  const myRef = useRef(null);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {index + 1}. {text}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <div ref={myRef} className={styles.Container}>
          {img.map((src, index) => (
            <Image
              key={src}
              qNum={index}
              imgSrc={src}
              sliderValue={sliderValue}
            />
          ))}
        </div>
      </Card.Body>
      <Card.Footer>
        <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
      </Card.Footer>
    </Card>
  );
};

export default SliderQuestion;
