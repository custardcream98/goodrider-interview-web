import React, { useEffect } from "react";
import Link from "next/link";
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
import { getVideoQuestions, IVideoQuestion } from "~/utils/video_question_data";
import VideoCheckerQuestionBundle from "~/components/VideoCheckerQuestionBundle";
import storageKeys, {
  getAnswer,
  getCheckerAnswer,
  getStorage,
  getUserInfoLocalStorage,
  setStorage,
} from "~/utils/localStorage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkAllCompletedSelector,
  currentPageIndexState,
  IScoreState,
  scoreState,
} from "~/utils/atom";
import { useRouter } from "next/router";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 64px;
`;

interface IProps {
  sliderQuestions?: Questions;
  descImages?: IDescriptionImages[];
  videoQuestions?: IVideoQuestion;
  pagenumber: number;
  maxSliders: number;
  maxVideoQuestions: number;
  sliderQuestionsCount: number[];
  videoCheckerQuestionsCount: number[];
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
  videoCheckerQuestionsCount,
}: IProps) => {
  const setScoreStorage = useSetRecoilState(scoreState);
  const setCurrentPageIndexStorage = useSetRecoilState(currentPageIndexState);
  const checkAllCompleted = useRecoilValue(checkAllCompletedSelector);
  const router = useRouter();

  useEffect(() => {
    scrollToTop();
    if (
      !getStorage(storageKeys.isOnGoing) &&
      !getStorage(storageKeys.isEnded)
    ) {
      setStorage(storageKeys.isOnGoing, "true");
    }

    // scoreState 초기화
    setScoreStorage((_) => {
      let initScoreStorage: IScoreState = {};
      sliderQuestionsCount.forEach((e, i) => {
        initScoreStorage[i + 1] = {
          maxQuestions: e,
        };

        for (let questionIndex = 1; questionIndex <= e; questionIndex++) {
          const score = getAnswer(i + 1, questionIndex);

          if (score === 0 || !!score) {
            initScoreStorage[i + 1][questionIndex] = score;
          }
        }
      });

      videoCheckerQuestionsCount.forEach((e, i) => {
        const score = getCheckerAnswer((i + 1 + maxSliders).toString());
        if (!!score) {
          initScoreStorage[i + 1 + maxSliders] = {
            maxQuestions: e,
            checkedIndex: score.checked,
            values: score.values,
          };
        } else {
          initScoreStorage[i + 1 + maxSliders] = {
            maxQuestions: e,
            checkedIndex: 999,
            values: Array(e).fill(0),
          };
        }
      });

      return initScoreStorage;
    });
  }, []);

  useEffect(() => {
    const userInfo = getUserInfoLocalStorage();
    if ((userInfo && Object.keys(userInfo).length !== 3) || !userInfo) {
      router.push("/");
      return;
    }

    if (pagenumber <= maxSliders) {
      setCurrentPageIndexStorage((_) => ({
        currentPageIndex: pagenumber,
        criteriaCount: descImages.length,
      }));
    }
  }, [pagenumber]);

  return (
    <Layout pagenumber={pagenumber}>
      <Navbar
        maxSliders={maxSliders}
        maxVideoQuestions={maxVideoQuestions}
        currentPage={pagenumber}
      />
      <main className="main pt-20 md:pt-16">
        <div className="grow p-4">
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
                  다음의 영상들 중{" "}
                  <strong>
                    어느 영상부터 {videoQuestions.question}이라 생각하는지
                    체크하고,
                  </strong>
                </p>
                <p>
                  해당 영상부터{" "}
                  <strong>1 ~ 5점 사이의 위험운전 점수를 부여</strong>
                  해주십시오.
                </p>
              </section>
              <VideoCheckerQuestionBundle
                pageIndex={pagenumber}
                videoQuestions={videoQuestions}
              />
            </>
          )}
        </div>
        <PageBtn
          maxPage={maxSliders + maxVideoQuestions}
          currentPage={pagenumber}
        />
        <aside>
          <Link href="/submitted">
            <a
              className={`dark fixed bottom-4 right-4 rounded-full py-2 px-3 ${
                checkAllCompleted ? "" : "pointer-events-none opacity-30"
              }`}
            >
              제출하기
            </a>
          </Link>
        </aside>
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
  const sliderQuestionsData = createPairs();
  const videoQuestionsData = getVideoQuestions();
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
      videoCheckerQuestionsCount: videoQuestionsData.map(
        (e) => e.selectives.length
      ),
    },
  };
}

export async function getStaticPaths() {
  const sliderQuestions = createPairs();
  const videoQuestions = getVideoQuestions();

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
