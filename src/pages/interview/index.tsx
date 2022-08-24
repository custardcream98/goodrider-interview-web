import React from "react";
import { createPairs, Questions } from "~/utils/question_data";
import SliderQuestion from "~/components/SliderQuestion";
import Layout from "~/components/Layout";

interface IProps {
  questions: Questions[];
}

const MainPage = ({ questions }: IProps) => {
  let count = 0;

  return (
    <Layout>
      {questions.map((lv) => (
        <div key={lv.mainCriteria} className="p-3 m-3 bg-slate-400">
          <h1 className="text-3xl">
            "{lv.mainCriteria}"에 중요한 것은 무엇인가요?
          </h1>
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
        </div>
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
