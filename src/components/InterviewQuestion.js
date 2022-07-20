import React from "react";
import styles from "./InterviewQuestion.module.css";

const InterviewQuestion = () => {
  return (
    <div>
      <div className="d-flex justify-content-around ">
        <div className={`bg-success ${styles.Img}`}></div>
        <div className={styles.Img}></div>
      </div>
    </div>
  );
};

export default InterviewQuestion;
