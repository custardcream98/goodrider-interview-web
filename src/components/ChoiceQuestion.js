import React, { useState, useEffect } from "react";
import MyCard from "./MyCard";
import styles from "../styles/ChoiceQuestion.module.css"

function ChoiceQuestion({ onChange, index, text }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  }

  return (
    <>
      <h5>{index + 1}. {text}</h5>
      <div className={styles.Container}>
        <div className={styles.Item}>
          <MyCard index={1} select={select} />
        </div>
        <div className={styles.Item}>
          <MyCard index={2} select={select} />
        </div>
        <div className={styles.Item}>
          <MyCard index={3} select={select} />
        </div>
        <div className={styles.Item}>
          <MyCard index={4} select={select} />
        </div>
        <div className={styles.Item}>
          <MyCard index={5} select={select} />
        </div>
      </div>
    </>
  )
}

export default ChoiceQuestion;
