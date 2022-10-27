import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { getAnswer, setAnswer } from "~/utils/localStorage";
import { calScoreToVal, calValToScore } from "~/utils/calSlider";
import { checkPassSelector, IScoreState, scoreState } from "~/utils/atom";

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

type Props = {
  questionIndex: string;
  criteria1: string;
  criteria2: string;
};

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

type Color = {
  red: number;
  green: number;
  blue: number;
};

const green: Color = { red: 16, green: 152, blue: 43 };
const gray: Color = { red: 151, green: 151, blue: 151 };
const red: Color = { red: 119, green: 0, blue: 152 };

/**
 * 색을 보간법으로 계산해주는 함수
 *
 * 개발중, 미사용
 * @param x `number`
 * @returns `number`
 */
function colorInterpolated(x: number): string {
  let res = { red: 0, green: 0, blue: 0 };

  Object.keys(gray).forEach((c) => {
    const color = x <= 50 ? green : x >= 51 ? red : 0;
    if (color === 0) return `rgb(${gray.red},${gray.green},${gray.blue})`;

    const denominator = Math.abs(color[c] - gray[c]);
    res[c] = Math.round(
      x <= 50
        ? (denominator * (50 - x)) / 50 + Math.min(gray[c], color[c])
        : x >= 51
        ? (denominator * (x - 50)) / 50 + Math.min(gray[c], color[c])
        : gray[c]
    );
  });
  return `rgb(${res.red},${res.green},${res.blue})`;
}

function checkBatchimEnding(word: string) {
  if (typeof word !== "string") return null;

  var lastLetter = word[word.length - 1];
  var uni = lastLetter.charCodeAt(0);

  if (uni < 44032 || uni > 55203) return null;

  return (uni - 44032) % 28 != 0;
}

const getDescription = (
  isPassed: boolean,
  score: number,
  criteria1: string,
  criteria2: string
) => {
  if (score === 1) {
    return "회색 원을 옮겨주세요.";
  }

  if (!isPassed) {
    return "일관적이지 않은 응답입니다. 다시 고민해주세요.";
  }

  const rounded = score < 1 ? Math.round(1 / score) : Math.round(score);

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

const getPageNumAndQuestionNum = (questionIndex: string) =>
  questionIndex.split("-");

const setScoreState = (
  questionIndex: string,
  score: number,
  setScoreStorage: SetterOrUpdater<IScoreState>
) => {
  setScoreStorage((prev) => {
    const [pageIndex, questionNum] = getPageNumAndQuestionNum(questionIndex);
    let newStoratge = {};
    for (let page of Object.keys(prev)) {
      newStoratge[page] = { ...prev[page] };
      if (page === pageIndex.toString()) {
        newStoratge[page][questionNum] = score;
      }
    }

    return newStoratge;
  });
};

const Slider = ({ questionIndex, criteria1, criteria2 }: Props) => {
  const [description, setDescription] = useState("회색 원을 옮겨주세요.");
  const [sliderWidth, setSliderWidth] = useState(0);

  const setScoreStorage = useSetRecoilState(scoreState);

  const [isScorePassed, nonPassedQuestionNum] =
    useRecoilValue(checkPassSelector);
  const isPassed = !(!isScorePassed && nonPassedQuestionNum === questionIndex);

  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const score = getAnswer(questionIndex);

    if (score) {
      const answer = calScoreToVal(score);
      sliderRef.current.value = answer.toString();
      setDescription((_) =>
        getDescription(isPassed, score, criteria1, criteria2)
      );
    }

    // 슬라이더 너비 가져오기
    setSliderWidth(sliderRef.current.offsetWidth);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(event.target.value);

    const score = calValToScore(val);

    setAnswer(questionIndex, score);
    setDescription((_) =>
      getDescription(isPassed, score, criteria1, criteria2)
    );

    setScoreState(questionIndex, score, setScoreStorage);

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
          {description}
        </span>
      </p>
    </div>
  );
};

export default Slider;
