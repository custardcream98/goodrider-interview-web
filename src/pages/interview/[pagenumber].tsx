import React, { useEffect } from "react";
import Link from "next/link";
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
  checkUserInfoValid,
  getAnswer,
  getCheckerAnswer,
  getStorage,
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

interface IProps {
  sliderQuestions?: Questions;
  descImages?: IDescriptionImages[][];
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
    if (!checkUserInfoValid()) {
      router.push("/");
      return;
    }

    if (pagenumber <= maxSliders) {
      setCurrentPageIndexStorage((_) => ({
        currentPageIndex: pagenumber,
        criteriaCount: descImages[pagenumber - 1].length,
      }));
    }
  }, [pagenumber]);

  return (
    <Layout pagenumber={pagenumber}>
      <Navbar
        maxSliders={maxSliders}
        maxVideoQuestions={maxVideoQuestions}
        currentPage={pagenumber}
        criteriaCounts={descImages.map((imgArr) => imgArr.length)}
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
                descriptionImages={descImages[pagenumber - 1]}
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
                    <span className="text-red-600">어느 영상부터</span> {videoQuestions.question}(위험운전)이라
                    생각되십니까?
                  </strong>
                </p>
                <p>
                  위험운전이라 생각되는 영상들에{" "}
                  <strong>1 ~ {videoQuestions.selectives.length}점 사이의 위험운전 점수를 부여</strong>
                  해주십시오.
                </p>
              </section>
              <VideoCheckerQuestionBundle
                pageIndex={pagenumber}
                videoQuestions={videoQuestions}
              />
            </>
          )}
          <aside>
            <Link href="/submit">
              <a
                className={`dark fixed bottom-4 right-4 rounded-full py-2 px-3 md:bottom-6 md:right-6 md:px-5 md:py-4 md:text-2xl ${
                  checkAllCompleted ? "" : "pointer-events-none opacity-30"
                }`}
              >
                제출하기
              </a>
            </Link>
          </aside>
        </div>
        <PageBtn
          maxPage={maxSliders + maxVideoQuestions}
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
      descImages,
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
