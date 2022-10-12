import React, { useEffect } from "react";
import Layout from "~/components/Layout";
import QuestionBundle from "~/components/QuestionBundle";
import PageBtn from "~/components/PageBtn";
import Navbar from "~/components/Navbar";
import { createPairs, Questions } from "~/utils/question_data";
import styles from "~/styles/mainCriteriaContainer.module.css";
import {
  getBehaviorQuestions,
  IBehaviorQuestion,
} from "~/utils/score_behavior_question_data";
import VideoQuestion from "~/components/VideoQuestion";
import styled from "styled-components";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: auto;
  max-width: 60rem;
`;

interface IProps {
  questions?: Questions;
  scoreBehaviorQuestions?: IBehaviorQuestion;
  pagenumber: number;
  maxSliders: number;
  maxScoreBehaviors: number;
}

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const InterviewPage = ({
  questions,
  scoreBehaviorQuestions,
  pagenumber,
  maxSliders,
  maxScoreBehaviors,
}: IProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  console.log(maxSliders + maxScoreBehaviors);
  return (
    <Layout pagenumber={pagenumber}>
      <Navbar
        maxPage={maxSliders + maxScoreBehaviors}
        currentPage={pagenumber}
      />

      <main>
        {pagenumber <= maxSliders ? (
          <>
            <section className={styles.quote}>
              <h2 className="ir-only">안내 문구</h2>
              <p>
                각 질문별로 더 중요하게 고려해야 할 사항 쪽으로 가운데에 위치한{" "}
                <strong>회색 원</strong>을 옮겨주세요!
              </p>
            </section>

            <QuestionBundle
              currentPageQuestions={questions}
              pageIndex={pagenumber}
            />
          </>
        ) : (
          <>
            <section className={styles.quote}>
              <h2 className="ir-only">안내 문구</h2>
              <p>
                각 영상에 <strong>위험한 정도</strong>를 매겨주세요!
              </p>
              <p>1부터 10까지 위험도가 올라갑니다.</p>
            </section>
            <h3 className="text-question-title-mobile md:text-question-title m-auto mb-5 w-[960px]">
              {scoreBehaviorQuestions.question}
            </h3>
            <QuestionWrapper>
              {React.Children.toArray(
                scoreBehaviorQuestions.selectives.map((videoPath) => (
                  <div className="w-[400px]">
                    <VideoQuestion videoPath={videoPath}></VideoQuestion>
                    <select className="w-full" name="score" id="">
                      {React.Children.toArray([
                        <option value="">점수를 선택해주세요.</option>,
                        ...Array(10)
                          .fill(0)
                          .map((_, i) => (
                            <option value={i + 1}>{i + 1}</option>
                          )),
                      ])}
                    </select>
                  </div>
                ))
              )}
            </QuestionWrapper>
          </>
        )}
        <PageBtn
          maxPage={maxSliders + maxScoreBehaviors}
          currentPage={pagenumber}
        />
      </main>
    </Layout>
  );
};

export default InterviewPage;

type Params = {
  params: {
    pagenumber: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const questions = createPairs();
  const scoreBehaviors = getBehaviorQuestions();
  const pageNumber = parseInt(params.pagenumber);

  return {
    props: {
      questions:
        pageNumber <= questions.length ? questions[pageNumber - 1] : null,
      scoreBehaviorQuestions:
        pageNumber > questions.length
          ? scoreBehaviors[pageNumber - (questions.length + 1)]
          : null,
      pagenumber: pageNumber,
      maxSliders: questions.length,
      maxScoreBehaviors: scoreBehaviors.length,
    },
  };
}

export async function getStaticPaths() {
  const questions = createPairs();
  const scoreBehaviors = getBehaviorQuestions();

  return {
    paths: questions
      .map((_, i) => ({
        params: {
          pagenumber: (i + 1).toString(),
        },
      }))
      .concat(
        scoreBehaviors.map((_, i) => ({
          params: {
            pagenumber: (i + 1 + questions.length).toString(),
          },
        }))
      ),
    fallback: false,
  };
}
