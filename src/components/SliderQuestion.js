import React from "react";
import { useState, useEffect, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import styled from "styled-components";
import Slider from "./Slider";
// import Image from "./Image";

const CardBody = styled(Card.Body)`
  padding: 0.3rem;
`;

const SpinnerBox = styled.div`
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  height: 33px;
`;

const ImgBox = styled.div`
  width: 95%;
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

  display: flex;
  justify-content: center;

  @media screen and (max-width: 680px) {
    width: 95%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Image = ({ qNum, imgSrc, sliderValue, position }) => {
  const [loading, setLoading] = useState(true);

  const imgLoaded = () => setLoading(false);

  return (
    <div className={styles.Item}>
      <h5 className="display-block">{`${qNum + 1}. `}</h5>
      <ImgBox sliderValue={sliderValue} position={position}>
        <SpinnerBox>
          <Spinner
            as="p"
            animation="border"
            role="status"
            className={`${loading ? "" : "visually-hidden"}`}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerBox>
        <Img
          className={loading ? "visually-hidden" : ""}
          src={`http://localhost:3000/${imgSrc}`}
          onLoad={imgLoaded}
        />
      </ImgBox>
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
              key={src}
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
