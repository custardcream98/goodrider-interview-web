import { atom, selector } from "recoil";
import { checkSliderValid } from "./ahpValidation";
import { PassNonPass } from "./ahpValidation/types";
import { getUserInfoLocalStorage } from "./localStorage";

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
    return (
      completedQuestions.every((e) => e) &&
      Object.keys(getUserInfoLocalStorage() || {}).length === 3
    );
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

interface ICheckPassSelector {
  isScorePassed: boolean;
  nonPassedQuestionNum: number | PassNonPass;
  instructionForPass: string;
}

/**
 * 통과 검사
 */
export const checkPassSelector = selector<ICheckPassSelector>({
  key: "checkPass",
  get: ({ get }): ICheckPassSelector => {
    const { currentPageIndex, criteriaCount } = get(currentPageIndexState);
    const score = get(scoreState);

    if (currentPageIndex in score) {
      const { questionIndex, instruction } = checkSliderValid(
        criteriaCount,
        score[currentPageIndex] as ISliderScoreState
      );

      return {
        isScorePassed: questionIndex === PassNonPass.Pass,
        nonPassedQuestionNum: questionIndex,
        instructionForPass: instruction,
      };
    }

    return {
      isScorePassed: true,
      nonPassedQuestionNum: 0,
      instructionForPass: "",
    };
  },
});
