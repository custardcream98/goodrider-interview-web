import { ChangeEventHandler, useEffect, useRef, Children, useState } from "react";
import useCheckboxState from "~/hooks/useCheckboxState";
import EmbededContent from "./EmbededContent";

interface IProps {
  questionIndex: number;
  pageIndex: number;
  videoPath: string;
  criteria: string;
}

const VideoCheckerQuestion = ({
  questionIndex,
  pageIndex,
  videoPath,
  criteria,
}: IProps) => {
  // const checkboxEleRef = useRef<HTMLInputElement>(null);
  const selectEleRef = useRef<HTMLSelectElement>(null);
  const questionId = (type: "checkbox" | "select") =>
    [type, pageIndex, questionIndex].join("-");
  const {
    isPageIndexInStoreage,
    isChecked,
    selectedVal,
    maxQuestions,
    setCheckbox,
    setSelectScore,
  } = useCheckboxState({ questionIndex, pageIndex });

  const onCheck: ChangeEventHandler<HTMLInputElement> = () => {
    setCheckbox();
  };

  const onSelectScore: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;

    setSelectScore(value);
  };

  useEffect(() => {
    if (!isPageIndexInStoreage) {
      return;
    }

    if (!isChecked) {
      selectEleRef.current.value = "0";
      return;
    }

    selectEleRef.current.value = selectedVal;
  }, [isPageIndexInStoreage, isChecked, selectedVal, questionIndex]);

  return (
    <div className="relative">
      <EmbededContent src={videoPath} />
      <div className="video-number absolute top-2 left-2">
        {questionIndex}번
      </div>

      <input
        id={questionId("checkbox")}
        className="sr-only"
        type="checkbox"
        name={"checkbox-" + pageIndex}
        value={questionIndex}
        onChange={onCheck}
        checked={isChecked}
      />
      <label className={`my-2 py-1 text-center block mx-auto border-2 rounded-lg cursor-pointer border-darkmint${isChecked ? " dark" : " light"}`} htmlFor={questionId("checkbox")}>
        {criteria}
      </label>

      <select
        className="select w-full"
        id={questionId("select")}
        ref={selectEleRef}
        disabled={isPageIndexInStoreage ? !isChecked : true}
        onChange={onSelectScore}
      >
        {Children.toArray([
          <option value="0">점수를 선택해주세요.</option>,
          ...Array(isPageIndexInStoreage ? maxQuestions : 5)
            .fill(0)
            .map((_, i) => <option value={i + 1}>{i + 1}점</option>),
        ])}
      </select>
    </div>
  );
};

export default VideoCheckerQuestion;
