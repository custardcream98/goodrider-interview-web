import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { IScoreState, scoreState } from "~/utils/atom";
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
  const radioEleRef = useRef(null);
  const selectEleRef = useRef(null);
  const questionId = (type: "radio" | "select") =>
    [type, pageIndex, questionIndex].join("-");
  const [scoreStorage, setScoreStorage] = useRecoilState(scoreState);

  const onCheck = () => {
    setScoreStorage((prev): IScoreState => {
      let newPageStorage = {
        ...prev[pageIndex],
      };

      newPageStorage.checkedIndex = questionIndex;

      newPageStorage.values = (newPageStorage.values as number[]).map((e, i) =>
        i + 1 < questionIndex ? 0 : e
      );

      let newStorage = { ...prev };
      newStorage[pageIndex] = newPageStorage;

      return newStorage;
    });
  };

  const onSelectScore = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setScoreStorage((prev): IScoreState => {
      let newPageStorage = {
        ...prev[pageIndex],
      };

      newPageStorage.values = [...(newPageStorage.values as number[])];
      newPageStorage.values.splice(questionIndex - 1, 1, parseInt(value));

      let newStorage = { ...prev };
      newStorage[pageIndex] = newPageStorage;

      return newStorage;
    });
  };

  useEffect(() => {
    if (pageIndex in scoreStorage) {
      if (scoreStorage[pageIndex].checkedIndex > questionIndex) {
        (selectEleRef.current as HTMLSelectElement).value = "0";
      }
    }
  }, [scoreStorage]);

  useEffect(() => {
    if (pageIndex in scoreStorage) {
      if (scoreStorage[pageIndex].checkedIndex > questionIndex) {
        (selectEleRef.current as HTMLSelectElement).value = "0";
        (radioEleRef.current as HTMLInputElement).checked = false;
      } else {
        if (scoreStorage[pageIndex].checkedIndex === questionIndex) {
          (radioEleRef.current as HTMLInputElement).checked = true;
        }
        (selectEleRef.current as HTMLSelectElement).value =
          scoreStorage[pageIndex].values[questionIndex - 1].toString();
      }
    }
  }, [pageIndex]);

  return (
    <div className="relative">
      <EmbededContent src={videoPath} />
      <div className="video-number absolute top-2 left-2">
        {questionIndex}번
      </div>
      <div className="my-2">
        <input
          type="radio"
          id={questionId("radio")}
          value={questionIndex}
          name={"radio-" + pageIndex}
          onClick={onCheck}
          ref={radioEleRef}
        />
        <label className="ml-1" htmlFor={questionId("radio")}>
          {questionIndex}번부터 {criteria}이다.
        </label>
      </div>
      <select
        className="w-full rounded-lg bg-[#00000022] p-2 disabled:opacity-30"
        id={questionId("select")}
        ref={selectEleRef}
        disabled={
          (pageIndex in scoreStorage
            ? scoreStorage[pageIndex].checkedIndex
            : 0) > questionIndex
        }
        onChange={onSelectScore}
      >
        {React.Children.toArray([
          <option value="0">점수를 선택해주세요.</option>,
          ...Array(
            pageIndex in scoreStorage ? scoreStorage[pageIndex].maxQuestions : 5
          )
            .fill(0)
            .map((_, i) => <option value={i + 1}>{i + 1}점</option>),
        ])}
      </select>
    </div>
  );
};

export default VideoCheckerQuestion;
