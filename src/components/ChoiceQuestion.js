import React, { useState, useEffect } from "react";
import MyCard from "./MyCard";
import styles from "../styles/ChoiceQuestion.module.css";

function ChoiceQuestion({ onChange, index, text, val }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  };

  return (
    <>
      <h5>
        {index + 1}. {text}
      </h5>
      <div className={styles.Container}>
        <MyCard index={1} select={select} val={val} styles={styles} />
        <MyCard index={2} select={select} val={val} styles={styles} />
        <MyCard index={3} select={select} val={val} styles={styles} />
        <MyCard index={4} select={select} val={val} styles={styles} />
        <MyCard index={5} select={select} val={val} styles={styles} />
      </div>
    </>
  );
}

export default ChoiceQuestion;
