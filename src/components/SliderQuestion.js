import React, { useState, useEffect, useRef } from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "../styles/SliderQuestion.module.css";
import Slider from "./Slider";
import Image from "./Image";

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
    <>
      <h5>
        {index + 1}. {text}
      </h5>
      <Card>
        <Card.Body>
          <div ref={myRef} className={styles.Container}>
            {img.map((src, index) => (
              <div
                className={`${styles.Item} ${
                  index === 0
                    ? sliderValue < 50
                      ? styles.SelectedImg
                      : styles.Img
                    : sliderValue > 50
                    ? styles.SelectedImg
                    : styles.Img
                }`}
              >
                <h5 className="display-block">{`${index + 1}. `}</h5>
                <Image key={src} imgSrc={src} />
              </div>
            ))}
          </div>
        </Card.Body>
        <Card.Footer>
          <Slider currentValue={sliderValue} setCurrentValue={handleValue} />
        </Card.Footer>
      </Card>
    </>
  );
};

export default SliderQuestion;
