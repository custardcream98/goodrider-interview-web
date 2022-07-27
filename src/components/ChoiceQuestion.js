import React, { useState, useEffect, useRef } from "react";
import MyCard from "./MyCard";
import styles from "../styles/ChoiceQuestion.module.css";

function ChoiceQuestion({ onChange, index, text, val, img }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  };

  useEffect(() => {
    myRef.current.scrollTop = 0;
  }, [index]);

  const myRef = useRef(null);

  return (
    <>
      <div style={{ width: "90%", maxWidth: "800px" }}>
        <h5>
          {index + 1}. {text}{" "}
        </h5>
      </div>
      <div ref={myRef} className={styles.Container}>
        <MyCard cardIndex={1} select={select} val={val} styles={styles} />
        <MyCard cardIndex={2} select={select} val={val} styles={styles} />
        <MyCard cardIndex={3} select={select} val={val} styles={styles} />
        <MyCard cardIndex={4} select={select} val={val} styles={styles} />
        <MyCard cardIndex={5} select={select} val={val} styles={styles} />
      </div>
    </>
  );
}

export default ChoiceQuestion;
