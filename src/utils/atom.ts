import { atom, selector } from "recoil";
import { checkSliderValid } from "./ahpValidation";

export interface IScoreState {
  [pageIndex: string]: ISliderScoreState | ISelectiveScoreState;
}

export interface ISliderScoreState {
  maxQuestions: number;
  [questionIndex: string]: number;
}

export interface ISelectiveScoreState {
  maxQuestions: number;
  checkedIndex: number;
  values: number[];
}

export const scoreState = atom<IScoreState>({
  key: "scoreState",
  default: {},
});

export const completedQuestionsState = atom<boolean[]>({
  key: "completedQuestionsState",
  default: [],
});

export const checkAllCompletedSelector = selector({
  key: "checkAllCompletedSelector",
  get: ({ get }) => {
    const completedQuestions = get(completedQuestionsState);
    return completedQuestions.every((e) => e);
  },
});

type IPageIndex = {
  currentPageIndex: number;
  criteriaCount: number;
};

export const currentPageIndexState = atom<IPageIndex>({
  key: "currentPageIndexState",
  default: {
    currentPageIndex: 1,
    criteriaCount: 3,
  },
});

/**
 * 통과 검사
 */
export const checkPassSelector = selector<[boolean, number, string]>({
  key: "checkPass",
  get: ({ get }): [boolean, number, string] => {
    const { currentPageIndex, criteriaCount } = get(currentPageIndexState);
    const score = get(scoreState);

    // const [questionIndex, instruction] = checkSliderValid(5, {
    //   maxQuestions: 10,
    //   1: 0.333,
    //   2: 4,
    //   3: 0.2,
    //   4: 0.453,
    //   5: 3,
    //   6: 0.167,
    //   7: 0.123,
    //   8: 0.143,
    //   9: 0.167,
    //   10: 4,
    // });

    if (currentPageIndex in score) {
      const [questionIndex, instruction] = checkSliderValid(
        criteriaCount,
        score[currentPageIndex] as ISliderScoreState
      );
      console.log(questionIndex, instruction);
      return [questionIndex === "pass", questionIndex as number, instruction];
    }

    return [true, 0, ""];
  },
});
