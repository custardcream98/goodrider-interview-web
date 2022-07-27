import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import Slider from "./Slider";
import styled from "styled-components";
import { string } from "prop-types";

const Img = styled.div`
  width: 100%;
  max-width: 800px;
  transform: scale(
    ${(props) =>
      props.position === "right" || props.sliderValue === 50
        ? (100 + (props.sliderValue - 50) / 10) / 100
        : (100 - (props.sliderValue - 50) / 10) / 100}
  );
  aspect-ratio: 1.5;
  border-color: ${(props) =>
    (props.position === "right") ^ (props.sliderValue < 50) ||
    props.sliderValue === 50
      ? "orange"
      : "silver"};
  border-width: ${(props) =>
    (props.position === "right") ^ (props.sliderValue < 50) ||
    props.sliderValue === 50
      ? (props.sliderValue - 50 >= 0
          ? props.sliderValue - 50
          : 50 - props.sliderValue) /
          7 +
        1 +
        "px"
      : "1px"};
  border-style: solid;
  border-radius: 6px;
  margin: auto;
`;

const SliderQuestion = ({ onChange, index, text, val }) => {
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
          <div className={styles.Item}>
            <h5>1.</h5>
            <Img sliderValue={sliderValue} position="left" />
          </div>
          <div className={styles.Item}>
            <h5>2.</h5>
            <Img sliderValue={sliderValue} position="right" />
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
