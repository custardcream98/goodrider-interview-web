import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./InterviewQuestion.module.css";
import Slider from "./Slider";

const InterviewQuestion = ({ onChange, index, text }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleValue = (val) => {
    setSliderValue(val);
    onChange(index, (val >=50 ? (val-50)/7 + 1 : 1 / ((50-val)/7 + 1)));
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {index + 1}. {text}
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex justify-content-around ">
        <div className={styles.Img}></div>
        <div className={styles.Img}></div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
        <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
      </Card.Footer>
    </Card>
  );
};

export default InterviewQuestion;
