import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import Slider from "./Slider";

const SliderQuestion = ({ onChange, index, text, val }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleValue = (val) => {
    setSliderValue(val);
    onChange(index, val >= 50 ? (val - 50) / 7 + 1 : 1 / ((50 - val) / 7 + 1));
  };

  useEffect(() => {
    setSliderValue(val >= 1 ? (val - 1) * 7 + 50 : -((1 / val - 1) * 7) + 50);
  }, [index]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {index + 1}. {text}
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex justify-content-around">
        <div className={styles.Img}></div>
        <div className={styles.Img}></div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
      </Card.Footer>
    </Card>
  );
};

export default SliderQuestion;
