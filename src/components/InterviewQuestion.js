import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./InterviewQuestion.module.css";

const InterviewQuestion = ({ onChange, index, text }) => {
  const onSliderChange = () => {
    onChange(index, Date.now());
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
        <Button onClick={onSliderChange}>슬라이더</Button>
      </Card.Footer>
    </Card>
  );
};

export default InterviewQuestion;
