import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAnswer, setAnswer } from "~/utils/localStorage";
import { calScoreToVal, calValToScore } from "~/utils/calSlider";
import { checkPassSelector, scoreState } from "~/utils/atom";
import { PassNonPass } from "~/utils/ahpValidation/types";

interface Position {
  x: number;
}

const Indicator = styled.div<Position>`
  position: absolute;
  top: 20px;
  left: ${(props) => props.x.toString() + "px"};
  width: 4px;
  height: 30px;
  background-color: #cdcdcd;
  border-radius: 2px;
  z-index: 10;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    top: 10px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 70px;
  width: 100%;
  margin-bottom: 7px;
  background-color: #e5eeec;
  border-radius: 100px;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

/**
 * 로직은 아직 덜짬
 */

const InputRange = styled.input`
  position: relative;
  -webkit-appearance: none;
  appearance: none;

  height: 100%;
  width: 100%;
  margin: auto;
  padding: 5px;
  background-color: transparent;

  z-index: 20;
  outline: none;

  --ThumbColor: rgb(151, 151, 151);

  @media (max-width: 768px) {
    padding: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 44px;
      height: 44px;
    }
  }
  &::-moz-range-thumb {
    width: 60px;
    height: 60px;
    background-color: var(--ThumbColor);
    border-radius: 100%;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 44px;
      height: 44px;
    }
  }

  &:hover {
    opacity: 1;
  }
`;

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
  // isPassed: boolean,
  score: number,
  criteria1: string,
  criteria2: string
) => {
  // if (!isPassed) {
  //   return "일관적이지 않은 응답입니다. 다시 고민해주세요.";
  // }

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(event.target.value);

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

    // handle.current.style.setProperty(
    //   "--ThumbColor",
    //   colorInterpolated(parseFloat(event.target.value))
    // );
  };

  return (
    <div className="m-auto w-95% md:w-[600px]">
      <Wrapper>
        {React.Children.toArray(
          new Array(9)
            .fill(0)
            .map((_, i) => <Indicator x={(sliderWidth * (i + 1)) / 10} />)
        )}
        <InputRange
          ref={sliderRef}
          type="range"
          step="0.1"
          onChange={onChange}
        />
      </Wrapper>
      <div className="mb-2 flex w-full justify-between rounded-full bg-[#e1fbf5] px-2 text-sm font-semibold text-darkmint md:text-base">
        <span className="inline-block p-1">9점</span>
        <span className="inline-block p-1">같다</span>
        <span className="inline-block p-1">9점</span>
      </div>
      <p className="text-center">
        <span
          id="description"
          className={`bg-contain bg-left bg-no-repeat pl-6 ${
            isPassed
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
  );
};

export default Slider;
