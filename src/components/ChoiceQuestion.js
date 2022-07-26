import React, { useState, useEffect, useRef } from "react";
import MyCard from "./MyCard";
import styles from "../styles/ChoiceQuestion.module.css";

function ChoiceQuestion({ onChange, index, text, val }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  };

  useEffect(() => {
    myRef.current.scrollTop = 0;
  }, [index]);

  const myRef = useRef(null);

  return (
    <>
      <div ref={myRef} className={styles.Container}>
        <h5>
          {index + 1}. {text}
        </h5>
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
