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
import VideoQuestionBundle from "~/components/VideoQuestionBundle";

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

            <VideoQuestionBundle
              pageIndex={pagenumber}
              scoreBehaviorQuestions={scoreBehaviorQuestions}
            ></VideoQuestionBundle>
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
