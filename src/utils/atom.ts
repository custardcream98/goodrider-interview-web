import { atom, selector } from "recoil";

export interface IScoreState {
  [pageIndex: string]:
    | {
        maxQuestions: number;
        [questionIndex: string]: number;
      }
    | {
        maxQuestions: number;
        checkedIndex: number;
        values: number[];
      };
}

export const scoreState = atom<IScoreState>({
  key: "scoreState",
  default: {},
});

/**
 * 통과 검사 로직이 들어와야 하는 곳
 *
 * 지금은 임시로 더미 로직 넣어놨습니다.
 */
export const checkPassSelector = selector({
  key: "checkPass",
  get: ({ get }) => {
    const score = get(scoreState);

    // if ("1-3" in score && "1-2" in score && "1-1" in score) {
    //   if (
    //     (score["1-3"] > 1 && score["1-2"] < 1 && score["1-1"] > 1) ||
    //     (score["1-3"] < 1 && score["1-2"] > 1 && score["1-1"] < 1)
    //   ) {
    //     return [false, "1-3"];
    //   }
    // }

    return [true, ""];
  },
});
