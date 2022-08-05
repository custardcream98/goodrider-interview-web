import React, { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/ChoiceQuestion.module.css";
import Image from "./Image";

function ChoiceQuestion({ onChange, index, text, val, img }) {
  useEffect(() => {
    myRef.current.scrollTop = 0;
  }, [index]);

  const myRef = useRef(null);

  return (
    <>
      <div style={{ width: "90%", maxWidth: "800px" }}>
        <h5>
          {index + 1}. {text}
        </h5>
      </div>
      <div ref={myRef} className={styles.Container}>
        {React.Children.toArray(
          img.map((imgSrc, i) => {
            const onClick = () => onChange(index, i + 1);

            return (
              <Card
                onClick={onClick}
                className={val === i + 1 ? styles.SelectedItem : styles.Item}
              >
                <Card.Header>
                  <Card.Title>{i + 1}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Image imgSrc={imgSrc} />
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </>
  );
}

export default ChoiceQuestion;
