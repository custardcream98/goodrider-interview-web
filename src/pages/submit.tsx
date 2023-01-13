import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Layout from "~/components/Layout";
import LoadingSpinner from "~/components/LoadingSpinner";
import { checkAllCompletedSelector } from "~/utils/atom";
import { postData } from "~/utils/fetch";
import {
  checkUserInfoValid,
  getAllAnswers,
  getUserInfoLocalStorage,
  ILocalSelectiveAnswer,
  removeLocalAnswer,
  removeLocalisOnGoing,
  setIsEndedLocalStorage,
} from "~/utils/localStorage";
import { IQuestionnaireData } from "~/utils/questionnaireDataInterface";
import { createPairs, Questions } from "~/utils/question_data";
import { getVideoQuestions, IVideoQuestion } from "~/utils/video_question_data";

interface IProps {
  sliderQuestions: Questions[];
  selectiveQuestions: IVideoQuestion[];
}

const Submitted = ({ sliderQuestions, selectiveQuestions }: IProps) => {
  const router = useRouter();
  const checkAllCompleted = useRecoilValue(checkAllCompletedSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailInputEleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkUserInfoValid()) {
      router.push("/");
      return;
    }

    if (!checkAllCompleted) {
      router.push("interview/1");
      return;
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted((_) => true);

    const email = emailInputEleRef.current.value.trim();

    const answers = getAllAnswers();
    const questionsCount = sliderQuestions.length + selectiveQuestions.length;

    const userInfo = getUserInfoLocalStorage();

    let questionnaireData: IQuestionnaireData = {
      questions_count: questionsCount,
      results_slider: [],
      results_selective: [],
      email,
      ...userInfo,
    };

    for (
      let sliderQuestionIndex = 0;
      sliderQuestionIndex < sliderQuestions.length;
      sliderQuestionIndex++
    ) {
      questionnaireData.results_slider.push({
        main_criteria_id: sliderQuestionIndex,
        main_criteria: sliderQuestions[sliderQuestionIndex].mainCriteria,
        sub_criterias: sliderQuestions[sliderQuestionIndex].pairs,
        results: Array(sliderQuestions[sliderQuestionIndex].pairs.length)
          .fill(0)
          .map((_, subcriteriaIndex) => ({
            sub_criteria_id: subcriteriaIndex,
            sub_criteria_score:
              answers[sliderQuestionIndex + 1][subcriteriaIndex + 1].toFixed(4),
          })),
      });
    }

    for (
      let selectiveQuestionIndex = 0;
      selectiveQuestionIndex < selectiveQuestions.length;
      selectiveQuestionIndex++
    ) {
      questionnaireData.results_selective.push({
        selective_criteria_id: selectiveQuestionIndex + 1,
        selective_criteria: selectiveQuestions[selectiveQuestionIndex].question,
        results: Array(
          selectiveQuestions[selectiveQuestionIndex].selectives.length
        )
          .fill(0)
          .map((_, subcriteriaIndex) => ({
            sub_criteria_id: subcriteriaIndex,
            sub_criteria_score: (
              answers[
                selectiveQuestionIndex + sliderQuestions.length + 1
              ] as ILocalSelectiveAnswer
            ).values[subcriteriaIndex],
          })),
      });
    }

    if (!(await postData(questionnaireData))) {
      router.push("interview/1");
      return;
    }

    console.log(questionnaireData);

    removeLocalAnswer();
    removeLocalisOnGoing();
    setIsEndedLocalStorage();

    router.push("/");
  };

  return (
    <Layout>
      <div className="centering h-screen w-full flex-col bg-white">
        <h1 className="keep-all my-4 text-center text-title-mobile font-bold leading-normal text-gray-900 md:text-title">
          착한 이륜차 운전자 평가 모델{" "}
          <span className="block md:inline">관련 설문조사</span>
        </h1>
        {!isSubmitted ? (
          <main className="mx-auto p-4 md:w-920 md:p-0">
            <div className="question-bundle keep-all p-4">
              <p className="text-lg">
                설문에 참여해주셔서 감사합니다. <br />
                이메일을 기입해주시면 추첨을 통해 <strong>기프티콘</strong>을
                보내드릴 예정이오니, 원하시는 경우 아래에 적고 제출하기를
                눌러주세요. <br /> <br />
                (원치 않으시는 경우 빈 칸으로 두고 제출하기를 눌러주세요.)
              </p>
              <form
                className="mt-3 w-full"
                id="submit-answers"
                onSubmit={onSubmit}
              >
                <div className="flex w-full flex-col md:flex-row">
                  <label className="mb-2 md:mb-0" htmlFor="email">
                    이메일을 적어주세요:
                  </label>
                  <input
                    id="email"
                    className="max-w-[300px] grow rounded-md px-1 outline outline-2 outline-darkmint md:ml-3"
                    type="email"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    ref={emailInputEleRef}
                  />
                </div>
              </form>
            </div>
            <button
              className="page-btn mt-4 ml-auto block w-[200px]"
              type="submit"
              form="submit-answers"
            >
              제출하기
            </button>
          </main>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </Layout>
  );
};

export default Submitted;

export async function getStaticProps(): Promise<{ props: IProps }> {
  const sliderQuestions = createPairs();
  const selectiveQuestions = getVideoQuestions();

  return {
    props: { sliderQuestions, selectiveQuestions },
  };
}
