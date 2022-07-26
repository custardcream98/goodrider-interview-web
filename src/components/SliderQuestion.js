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
      <Card.Body>
        <div className={styles.Container}>
          <div className={styles.Item}>
            <h5>1.</h5>
            <div className={styles.Img}></div>
          </div>
          <div className={styles.Item}>
            <h5>2.</h5>
            <div className={styles.Img}></div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
      </Card.Footer>
    </Card>
  );
};

export default SliderQuestion;
