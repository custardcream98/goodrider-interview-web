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
import storageKeys, {
  getAnswer,
  getStorage,
  setStorage,
} from "~/utils/localStorage";
import { useRecoilState } from "recoil";
import { IScoreState, scoreState } from "~/utils/atom";

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
  sliderQuestions?: Questions;
  descImages?: IDescriptionImages[];
  videoQuestions?: IBehaviorQuestion;
  pagenumber: number;
  maxSliders: number;
  maxVideoQuestions: number;
  sliderQuestionsCount: number[];
}

const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const InterviewPage = ({
  sliderQuestions,
  descImages,
  videoQuestions,
  pagenumber,
  maxSliders,
  maxVideoQuestions,
  sliderQuestionsCount,
}: IProps) => {
  const [scoreStorage, setScoreStorage] = useRecoilState(scoreState);

  useEffect(() => {
    scrollToTop();
    if (!getStorage(storageKeys.isOnGoing))
      setStorage(storageKeys.isOnGoing, "true");

    // scoreState 초기화
    setScoreStorage((_) => {
      let initScoreStorage: IScoreState = {};
      sliderQuestionsCount.forEach((e, i) => {
        initScoreStorage[i + 1] = {
          maxQuestions: e,
        };

        for (let questionIndex = 1; questionIndex <= e; questionIndex++) {
          const score = getAnswer(`${i + 1}-${questionIndex}`);

          if (score === 0 || !!score) {
            initScoreStorage[i + 1][questionIndex] = score;
          }
        }
      });
      return initScoreStorage;
    });
  }, []);

  // useEffect(() => {
  //   console.log(scoreStorage);
  // }, [scoreStorage]);

  return (
    <Layout pagenumber={pagenumber}>
      <Navbar
        maxPage={maxSliders + maxVideoQuestions}
        currentPage={pagenumber}
      />

      <Main>
        <Wrapper>
          {pagenumber <= maxSliders ? (
            <>
              <section className="quote">
                <h2 className="sr-only">안내 문구</h2>
                <p>
                  {sliderQuestions.mainCriteria === "난폭운전" ? (
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
                currentPageQuestions={sliderQuestions}
                descriptionImages={descImages}
                pageIndex={pagenumber}
              />
            </>
          ) : (
            <>
              <section className="quote">
                <h2 className="sr-only">안내 문구</h2>
                <p>
                  각 영상에 <strong>위험한 정도</strong>를 매겨주세요!
                </p>
                <p>1부터 10까지 위험도가 올라갑니다.</p>
              </section>
              <VideoQuestionBundle
                pageIndex={pagenumber}
                videoQuestions={videoQuestions}
              />
            </>
          )}
        </Wrapper>
        <PageBtn
          maxPage={maxSliders + maxVideoQuestions}
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
  const sliderQuestionsData = createPairs();
  const videoQuestionsData = getBehaviorQuestions();
  const pageNumber = parseInt(params.pagenumber);

  const descImages = sliderQuestionsData.map((question) =>
    getDescriptionImage(question.mainCriteria)
  );

  return {
    props: {
      sliderQuestions:
        pageNumber <= sliderQuestionsData.length
          ? sliderQuestionsData[pageNumber - 1]
          : null,
      descImages:
        pageNumber <= sliderQuestionsData.length
          ? descImages[pageNumber - 1]
          : null,
      videoQuestions:
        pageNumber > sliderQuestionsData.length
          ? videoQuestionsData[pageNumber - (sliderQuestionsData.length + 1)]
          : null,
      pagenumber: pageNumber,
      maxSliders: sliderQuestionsData.length,
      maxVideoQuestions: videoQuestionsData.length,
      sliderQuestionsCount: sliderQuestionsData.map((e) => e.pairs.length),
    },
  };
}

export async function getStaticPaths() {
  const sliderQuestions = createPairs();
  const videoQuestions = getBehaviorQuestions();

  return {
    paths: sliderQuestions
      .map((_, i) => ({
        params: {
          pagenumber: (i + 1).toString(),
        },
      }))
      .concat(
        videoQuestions.map((_, i) => ({
          params: {
            pagenumber: (i + 1 + sliderQuestions.length).toString(),
          },
        }))
      ),
    fallback: false,
  };
}
