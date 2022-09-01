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
    <section className={styles.Container}>
      <h2>
        <span
          className="text-question-title-mobile md:text-question-title text-center block"
          style={{ wordBreak: "keep-all" }}
        >
          "{currentPageQuestions.mainCriteria}"
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 400,
            }}
          >
            에{" "}
          </span>
        </span>
        <span
          className="block text-center mb-4"
          style={{
            wordBreak: "keep-all",
            fontSize: "1.5rem",
          }}
        >
          중요한 것은 무엇인가요?
        </span>
      </h2>
      {React.Children.toArray(
        currentPageQuestions.pairs.map((sub) => {
          count++;

          return (
            <SliderQuestion
              key={`${pageIndex}-${count}`}
              questionIndex={`${pageIndex}-${count}`}
              subCriteria1={sub.criteria1}
              subCriteria2={sub.criteria2}
            />
          );
        })
      )}
    </section>
  );
};

export default QuestionBundle;
