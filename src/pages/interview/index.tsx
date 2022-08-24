import React from "react";
import { createPairs, Questions } from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import Layout from "~/components/Layout";
import styled from "styled-components";

const MainCriteriaContainer = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: #effdfa;
  margin: 1rem auto;
  width: 60rem;
  @media (max-width: 400px) {
    width: 95%;
  }
`;

interface IProps {
  questions: Questions[];
}

const MainPage = ({ questions }: IProps) => {
  let count = 0;

  return (
    <Layout>
      {questions.map((lv) => (
        <MainCriteriaContainer key={lv.mainCriteria}>
          <h1
            className="text-question-title-mobile md:text-question-title text-center"
            style={{ wordBreak: "keep-all" }}
          >
            "{lv.mainCriteria}"
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
          {lv.pairs.map((sub) => {
            count++;

            return (
              <SliderQuestion
                key={sub.criteria1 + sub.criteria2}
                questionIndex={count}
                subCriteria1={sub.criteria1}
                subCriteria2={sub.criteria2}
              />
            );
          })}
        </MainCriteriaContainer>
      ))}
    </Layout>
  );
};

export function getStaticProps() {
  const questions = createPairs();
  return {
    props: {
      questions: questions,
    },
  };
}

export default MainPage;
