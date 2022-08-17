import React, { useState, useEffect, useRef } from "react";
import { Card, Container, Row, FormSelect } from "react-bootstrap";
import styles from "../styles/ChoiceQuestion.module.css";
import Image from "./Image";

function ChoiceQuestion({ onChange, index, text, val, img }) {
  return (
    <Container fluid>
      <h5>
        {index + 1}. {text}
      </h5>
      <div className="row row-cols-1 row-cols-md-2">
        {React.Children.toArray(
          img.map((imgSrc, i) => {
            const onClick = () => onChange(index, i + 1);

            return (
              <div className="col">
                <Card onClick={onClick} style={{ marginBottom: "1rem" }}>
                  <Card.Header>
                    <Card.Title>{i + 1}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Image imgSrc={imgSrc} style={{ marginBottom: "1rem" }} />
                    <FormSelect onChange={console.log}>
                      {React.Children.toArray(
                        [...Array(10)].map((_, i) => (
                          <option value={i + 1}>{i + 1}</option>
                        ))
                      )}
                    </FormSelect>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </Container>
  );
}

export default ChoiceQuestion;
