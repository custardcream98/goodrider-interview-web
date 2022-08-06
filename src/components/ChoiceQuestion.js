import React, { useEffect, useRef } from "react";
import styles from "../styles/ChoiceQuestion.module.css";
import MyCard from "./MyCard";

function ChoiceQuestion({ onChange, index, text, val, img }) {
  const select = (selectedNum) => {
    onChange(index, selectedNum);
  };

  useEffect(() => {
    myRef.current.scrollTop = 0;
  }, [index]);

  const myRef = useRef(null);

  const RenderCards = (num) => {
    const result = [];
    for (let i = 1; i <= num; i++) {
      result.push(
        <MyCard cardIndex={i} select={select} val={val} styles={styles} />
      );
    }
    return result;
  };

  return (
    <>
      <div style={{ width: "90%", maxWidth: "800px" }}>
        <h5>
          {index + 1}. {text}
        </h5>
      </div>
      <div ref={myRef} className={styles.Container}>
        {RenderCards(5)}
      </div>
    </>
  );
}

export default ChoiceQuestion;
