import React from "react";
import { Questions } from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import styles from "~/styles/mainCriteriaContainer.module.css";

interface IProps {
  currentPageQuestions: Questions;
  pageIndex: number;
}

const QuestionBundle = ({ currentPageQuestions, pageIndex }: IProps) => {
  let count = 0;

  return (
    <div className={styles.Container}>
      <h1
        className="text-question-title-mobile md:text-question-title text-center"
        style={{ wordBreak: "keep-all" }}
      >
        "{currentPageQuestions.mainCriteria}"
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
          }}
        >
          에
        </span>
      </h1>
      <h2
        style={{
          wordBreak: "keep-all",
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        중요한 것은 무엇인가요?
      </h2>
      {React.Children.toArray(
        currentPageQuestions.pairs.map((sub) => {
          count++;

          return (
            <SliderQuestion
              questionIndex={`${pageIndex}-${count}`}
              subCriteria1={sub.criteria1}
              subCriteria2={sub.criteria2}
            />
          );
        })
      )}
    </div>
  );
};

export default QuestionBundle;
