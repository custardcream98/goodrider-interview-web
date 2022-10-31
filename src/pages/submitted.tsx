import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Layout from "~/components/Layout";
import LoadingSpinner from "~/components/LoadingSpinner";
import { checkAllCompletedSelector } from "~/utils/atom";
import { postData } from "~/utils/fetch";
import {
  getAllAnswers,
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

  useEffect(() => {
    if (!checkAllCompleted) {
      router.push("interview/1");
      return;
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted((_) => true);

    const phoneNumber = phoneEleRef.current.value.trim().replaceAll("-", "");

    const answers = getAllAnswers();
    const questionsCount = sliderQuestions.length + selectiveQuestions.length;

    let questionnaireData: IQuestionnaireData = {
      questions_count: questionsCount,
      results_slider: [],
      results_selective: [],
      phone: phoneNumber,
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

    removeLocalAnswer();
    removeLocalisOnGoing();
    setIsEndedLocalStorage();

    router.push("/");
  };

  const phoneEleRef = useRef<HTMLInputElement>(null);

  return (
    <Layout>
      <div className="centering h-screen w-full flex-col bg-white">
        <h1 className="keep-all mb-6 w-11/12 text-center text-title-mobile font-bold leading-normal text-gray-900 md:w-2/4 md:text-title">
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        {!isSubmitted ? (
          <main className="question-bundle max-w-[900px] p-4">
            <p className="mb-4 text-lg">
              설문에 참여해주셔서 감사합니다. <br />
              전화번호를 기입해주시면 추첨을 통해 <strong>기프티콘</strong>을
              보내드릴 예정이오니, 원하시는 경우 아래에 적고 제출하기를
              눌러주세요. <br /> <br />
              (원치 않으시는 경우 빈 칸으로 두고 제출하기를 눌러주세요.)
            </p>
            <form className="w-full" onSubmit={onSubmit}>
              <div className="flex flex-col items-center md:flex-row">
                <div className="mb-2 md:mb-0">
                  <label className="block" htmlFor="phone">
                    전화번호를 적어주세요:{" "}
                  </label>
                  <small>예시: 010-1234-5678</small>
                </div>
                <input
                  id="phone"
                  className="ml-3 rounded-md outline outline-2 outline-darkmint"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  ref={phoneEleRef}
                />
              </div>
              <button className="page-btn ml-auto block" type="submit">
                제출하기
              </button>
            </form>
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
