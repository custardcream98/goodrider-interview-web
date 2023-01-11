import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { IScoreState, ISelectiveScoreState, scoreState } from "~/utils/atom";

export default ({
  pageIndex,
  questionIndex,
}: {
  pageIndex: number;
  questionIndex: number;
}) => {
  const [scoreStorage, setScoreStorage] = useRecoilState(scoreState);

  const setCheckbox = useCallback(
    () =>
      setScoreStorage((prev): IScoreState => {
        let newPageStorage = {
          ...prev[pageIndex],
        };

        newPageStorage.checkedIndex = questionIndex;

        newPageStorage.values = (newPageStorage.values as number[]).map(
          (e, i) => (i + 1 < questionIndex ? 0 : e)
        );

        return { ...prev, [pageIndex]: newPageStorage };
      }),
    [questionIndex, pageIndex]
  );

  const setSelectScore = useCallback(
    (value: string) =>
      setScoreStorage((prev): IScoreState => {
        let newPageStorage = {
          ...prev[pageIndex],
        } as ISelectiveScoreState;

        newPageStorage.values = [...newPageStorage.values];
        newPageStorage.values.splice(questionIndex - 1, 1, parseInt(value));

        return { ...prev, [pageIndex]: newPageStorage };
      }),
    [questionIndex, pageIndex]
  );

  const isPageIndexInStoreage = pageIndex in scoreStorage;
  const checkedIndex = scoreStorage[pageIndex]?.checkedIndex;
  const selectedVal =
    scoreStorage[pageIndex]?.values[questionIndex - 1].toString();
  const maxQuestions = scoreStorage[pageIndex]?.maxQuestions;

  return {
    isPageIndexInStoreage,
    checkedIndex,
    selectedVal,
    maxQuestions,
    setCheckbox,
    setSelectScore,
  };
};
