import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import Slider from "./Slider";

const Img = ({ qNum, imgSrc, sliderValue }) => (
  <div className={styles.Item}>
    <h5>{`${qNum + 1}. `}</h5>
    <img
      className={sliderValue <= 50 ? styles.SelectedImg : styles.Img}
      src={`http://localhost:3000/${imgSrc}`}
    />
  </div>
);

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
            <Img
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
