import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAnswer, setAnswer } from "~/utils/localStorage";
import { calScoreToVal, calValToScore } from "~/utils/calSlider";
import { checkPassSelector, scoreState } from "~/utils/atom";
import { PassNonPass } from "~/utils/ahpValidation/types";
import InputRangeWithIndicator from "./InputRangeWithIndicator";

/**
 * 한글 받침 확인용 함수
 *
 * @param word
 * @returns
 */
function checkBatchimEnding(word: string) {
  if (typeof word !== "string") return null;

  var lastLetter = word[word.length - 1];
  var uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
}

const getDescription = (
  score: number,
  criteria1: string,
  criteria2: string
) => {
  const rounded = score < 1 ? Math.round(1 / score) : Math.round(score);

  if (rounded === 1) {
    return "둘 다 똑같이 위험합니다.";
  }

  if (score < 1) {
    const adj = checkBatchimEnding(criteria1) ? "이" : "가";
    return (
      criteria1 +
      adj +
      " " +
      criteria2 +
      "보다 " +
      rounded +
      "점 더 위험합니다."
    );
  } else {
    const adj = checkBatchimEnding(criteria2) ? "이" : "가";
    return (
      criteria2 +
      adj +
      " " +
      criteria1 +
      "보다 " +
      rounded +
      "점 더 위험합니다."
    );
  }
};

type IProps = {
  pageIndex: number;
  questionIndex: number;
  criteria1: string;
  criteria2: string;
};

const Slider = ({ pageIndex, questionIndex, criteria1, criteria2 }: IProps) => {
  const [description, setDescription] = useState("회색 원을 옮겨주세요.");
  const [sliderWidth, setSliderWidth] = useState(0);

  const setScoreStorage = useSetRecoilState(scoreState);

  const { isScorePassed, nonPassedQuestionNum, instructionForPass } =
    useRecoilValue(checkPassSelector);
  const isPassed = !(
    !isScorePassed &&
    (nonPassedQuestionNum === questionIndex ||
      nonPassedQuestionNum === PassNonPass.NonPass)
  );

  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const score = getAnswer(pageIndex, questionIndex);

    if (score) {
      const answer = calScoreToVal(score);
      sliderRef.current.value = answer.toString();
      setDescription((_) => getDescription(score, criteria1, criteria2));
    }

    // 슬라이더 너비 가져오기
    setSliderWidth(sliderRef.current.offsetWidth);
  }, []);

  const onSliderMoveCallback = useCallback(() => {
    const val = parseFloat(sliderRef.current.value);

    const score = calValToScore(val);

    setAnswer(pageIndex, questionIndex, score);
    setDescription((_) => getDescription(score, criteria1, criteria2));

    setScoreStorage((prev) => {
      let newStoratge = {};
      for (let page of Object.keys(prev)) {
        newStoratge[page] = { ...prev[page] };
        if (page === pageIndex.toString()) {
          newStoratge[page][questionIndex] = score;
        }
      }

      return newStoratge;
    });
  }, [
    sliderRef,
    setAnswer,
    pageIndex,
    questionIndex,
    setDescription,
    criteria1,
    criteria2,
    setScoreStorage,
  ]);

  const scrollToWrongQuestion = () => {
    sliderRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <div className="m-auto w-95% md:w-[600px]">
        <InputRangeWithIndicator
          sliderRef={sliderRef}
          sliderWidth={sliderWidth}
          onChange={onSliderMoveCallback}
        />
        <div className="mb-2 flex w-full justify-between rounded-full bg-[#e1fbf5] px-2 text-sm font-semibold text-darkmint md:text-base">
          <span className="inline-block p-1">9점</span>
          <span className="inline-block p-1">같다</span>
          <span className="inline-block p-1">9점</span>
        </div>
        <p className="keep-all h-10 text-center md:h-fit">
          <span
            id="description"
            className={`bg-contain bg-left bg-no-repeat pl-6 ${
              isPassed && description !== "회색 원을 옮겨주세요."
                ? "bg-[url(../../public/Infobox_info_icon.svg)]"
                : "bg-[url(../../public/Infobox_info_icon_red.svg)] font-bold text-red-600"
            }`}
          >
            {isPassed
              ? description
              : (nonPassedQuestionNum === PassNonPass.NonPass
                  ? ""
                  : "일관성이 낮습니다. ") +
                instructionForPass +
                (nonPassedQuestionNum === PassNonPass.NonPass
                  ? ""
                  : "으로 움직여주세요.")}
          </span>
        </p>
      </div>
      <button
        className={`dark fixed bottom-[60px] right-4 z-10 rounded-full py-2 px-3 md:bottom-[100px] md:right-6 md:px-5 md:py-4 md:text-2xl ${
          isPassed || nonPassedQuestionNum === PassNonPass.NonPass
            ? "hidden"
            : ""
        }`}
        onClick={scrollToWrongQuestion}
      >
        오류 문항으로 이동
      </button>
    </>
  );
};

export default Slider;
