import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import styled from "styled-components";
import Slider from "./Slider";
import Image from "./Image";

const CardBody = styled(Card.Body)`
  padding: 0.3rem;
`;

const SliderQuestion = ({ onChange, index, text, val, img }) => {
  const [sliderValue, setSliderValue] = useState(50);

  const handleValue = (val) => {
    setSliderValue(val);
    onChange(index, val >= 50 ? (val - 50) / 7 + 1 : 1 / ((50 - val) / 7 + 1));
  };

  useEffect(() => {
    setSliderValue(val >= 1 ? (val - 1) * 7 + 50 : -((1 / val - 1) * 7) + 50);
    myRef.current.scrollTop = 0;
  }, [index, val]);

  const myRef = useRef(null);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {index + 1}. {text}
        </Card.Title>
      </Card.Header>
      <CardBody>
        <div ref={myRef} className={styles.Container}>
          {img.map((src, index) => (
            <Image
              qNum={index}
              imgSrc={src}
              sliderValue={sliderValue}
              position={index === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </CardBody>
      <Card.Footer>
        <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
      </Card.Footer>
    </Card>
  );
};

export default SliderQuestion;
