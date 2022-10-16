import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "~/components/Layout";
import SliderQuestionBundle from "~/components/SliderQuestionBundle";
import PageBtn from "~/components/PageBtn";
import Navbar from "~/components/Navbar";
import {
  createPairs,
  getDescriptionImage,
  IDescriptionImages,
  Questions,
} from "~/utils/question_data";
import {
  getBehaviorQuestions,
  IBehaviorQuestion,
} from "~/utils/score_behavior_question_data";
import VideoQuestionBundle from "~/components/VideoQuestionBundle";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 64px;
`;

const Wrapper = styled.div`
  flex-grow: 1;
`;

interface IProps {
  questions?: Questions;
  descImages?: IDescriptionImages[];
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
  descImages,
  scoreBehaviorQuestions,
  pagenumber,
  maxSliders,
  maxScoreBehaviors,
}: IProps) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <Layout pagenumber={pagenumber}>
      <Navbar
        maxPage={maxSliders + maxScoreBehaviors}
        currentPage={pagenumber}
      />

      <Main>
        <Wrapper>
          {pagenumber <= maxSliders ? (
            <>
              <section className="quote">
                <h2 className="ir-only">안내 문구</h2>
                <p>
                  {questions.mainCriteria === "난폭운전" ? (
                    <>
                      영상을 플레이하여 천천히 살펴보신 뒤,
                      <br />
                    </>
                  ) : (
                    ""
                  )}
                  더 위험하다고 생각되는 항목 쪽으로 상대적으로 얼마나 더
                  위험한지 <strong>회색 원을 옮겨서</strong> 점수를
                  부여해주세요.
                </p>
              </section>
              <SliderQuestionBundle
                currentPageQuestions={questions}
                descriptionImages={descImages}
                pageIndex={pagenumber}
              />
            </>
          ) : (
            <>
              <section className="quote">
                <h2 className="ir-only">안내 문구</h2>
                <p>
                  각 영상에 <strong>위험한 정도</strong>를 매겨주세요!
                </p>
                <p>1부터 10까지 위험도가 올라갑니다.</p>
              </section>
              <VideoQuestionBundle
                pageIndex={pagenumber}
                scoreBehaviorQuestions={scoreBehaviorQuestions}
              />
            </>
          )}
        </Wrapper>
        <PageBtn
          maxPage={maxSliders + maxScoreBehaviors}
          currentPage={pagenumber}
        />
      </Main>
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

  const descImages = questions.map((question) =>
    getDescriptionImage(question.mainCriteria)
  );

  return {
    props: {
      questions:
        pageNumber <= questions.length ? questions[pageNumber - 1] : null,
      descImages:
        pageNumber <= questions.length ? descImages[pageNumber - 1] : null,
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
