import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
import styles from "../styles/SliderQuestion.module.css";

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

export default Image;
