import { ISliderScoreState } from "../atom";
import { calAhp, getChangedRows } from "./calculations";
import { npEye } from "./numpy";
import {
  CrPassCheck,
  Instruction,
  IQuestionToInstruct,
  PassNonPass,
} from "./types";

const CR_PASS = 0.1;

/**
 * 새로운 행렬을 가지고 각 Case에 대해 CR을 확인하여
 *
 * CR < 0.1이 되는 경우 확인 후 리턴하는 함수
 * @param matrixComparison
 * @returns
 */
function getTargetMatrixComparison(matrixComparison: number[][]): {
  newMatrixComparison: number[][];
  indexOfMinCr: number;
  indexOfMaxWeight: number;
  flag: CrPassCheck;
} {
  const { weight: originalWeight, Cr: originalCr } = calAhp(matrixComparison);
  console.log(originalCr);

  if (originalCr < CR_PASS) {
    /*
      통과일 경우 flag = 0;
    */
    return {
      newMatrixComparison: [[]],
      indexOfMinCr: 0,
      indexOfMaxWeight: 0,
      flag: CrPassCheck.Passed,
    };
  }

  const { changedRows, indexOfMaxWeight } = getChangedRows(
    matrixComparison,
    originalWeight
  );
  const elementCount = matrixComparison.length;

  // 행을 교체해 가며, 연산한 결과 CR을 arrCR에 저장
  const arrCr = changedRows.map((newRow) => {
    matrixComparison[indexOfMaxWeight] = newRow;

    // 바뀐 행에 따라 matrixComparison도 조정 필요
    for (let j = 0; j < elementCount; j++) {
      matrixComparison[j][indexOfMaxWeight] =
        1 / matrixComparison[indexOfMaxWeight][j];
    }

    const { Cr } = calAhp(matrixComparison);
    return Cr;
  });

  // arrCr에서 최소 CR의 인덱스
  const indexOfMinCr = arrCr.indexOf(Math.min(...arrCr));

  matrixComparison[indexOfMaxWeight] = changedRows[indexOfMinCr];

  for (
    let i = 0;
    i < elementCount;
    i++ // 바뀐 행에 따라 comparison_matrix도 조정 필요
  ) {
    matrixComparison[i][indexOfMaxWeight] =
      1 / matrixComparison[indexOfMaxWeight][i];
  }

  const minCr = arrCr[indexOfMinCr]; // 최소 CR

  const flag =
    minCr < CR_PASS ? CrPassCheck.PassedOnChange : CrPassCheck.ContinueToFind;

  return {
    newMatrixComparison: matrixComparison,
    indexOfMinCr,
    indexOfMaxWeight,
    flag,
  };
}

/**
 * CR 최솟값의 인덱스와 가중치 최댓값의 인덱스를 활용해
 *
 * 조정이 필요한 문항 번호와 지시사항을 리턴하는 함수
 * @param indexOfMinCr
 * @param indexOfMaxWeight
 * @param elementCount
 * @returns
 */
function getQuestionIndexAndInstruction(
  indexOfMinCr: number,
  indexOfMaxWeight: number,
  elementCount: number
): IQuestionToInstruct {
  let questionIndex = Math.floor((indexOfMinCr - 1) / 2) + 1;

  if (questionIndex > indexOfMaxWeight) {
    // 입력값 부분, 엑셀 실습에서 초록칸
    questionIndex -= indexOfMaxWeight;

    for (let i = 1; i < indexOfMaxWeight + 1; i++)
      questionIndex += elementCount - i;

    return {
      questionIndex,
      instruction:
        indexOfMinCr % 2 === 1 ? Instruction.Left : Instruction.Right,
    };
  } else {
    // 할당값 부분
    let k = indexOfMaxWeight - questionIndex + 1;

    for (let i = 1; i < questionIndex; i++) k += elementCount - i;

    questionIndex = k;
    return {
      questionIndex,
      instruction:
        indexOfMinCr % 2 === 1 ? Instruction.Right : Instruction.Left,
    };
  }
}

/**
 * 현재 점수 state를 입력받아 comparison matrix를 생성하는 함수
 * @param criteriaCount
 * @param sliderScore
 * @returns
 */
function getMatrixComparison(
  criteriaCount: number,
  sliderScore: ISliderScoreState
): number[][] {
  let matrixComparison = npEye(criteriaCount, criteriaCount, 0);

  let k = 0;
  let scoreIndex = 1;

  for (let i = 0; i < criteriaCount - 1; i++) {
    k++;
    for (let j = k; j < criteriaCount; j++) {
      if (i === j) continue;

      matrixComparison[i][j] = sliderScore[scoreIndex] ?? 1;
      matrixComparison[j][i] = 1 / sliderScore[scoreIndex] ?? 1;
      scoreIndex++;
    }
  }
  return matrixComparison;
}

/**
 * 현재 Slider Questions의 입력값을 가지고 값이 유효(CR < CR_PASS)한지 확인 후
 *
 * 조정이 필요한 경우 조정이 필요한 questionIndex와 instruction을 리턴하는 함수
 *
 * 조정이 필요없는 경우(조정 없이 통과) questionIndex = "NonPass"로 리턴합니다.
 * @param criteriaCount
 * @param sliderScore
 * @returns
 */
export function checkSliderValid(
  criteriaCount: number,
  sliderScore: ISliderScoreState
): IQuestionToInstruct {
  const matrixComparison = getMatrixComparison(criteriaCount, sliderScore);

  return findDirection(matrixComparison, criteriaCount, 0);
}

/**
 * 조정이 필요한 questionIndex와 instruction을 리턴하는 함수
 *
 * 재귀적으로 여러 경우의 수를 검사하며, 19번까지 검사합니다.
 * @param matrixComparison
 * @param criteriaCount
 * @param recursiveCount
 * @returns
 */
function findDirection(
  matrixComparison: number[][],
  criteriaCount: number,
  recursiveCount: number
): IQuestionToInstruct {
  if (recursiveCount === 20)
    return {
      questionIndex: PassNonPass.NonPass,
      instruction: Instruction.NotAbleToFind,
    };

  const { newMatrixComparison, indexOfMinCr, indexOfMaxWeight, flag } =
    getTargetMatrixComparison(matrixComparison);

  if (flag === CrPassCheck.Passed) {
    return {
      questionIndex: PassNonPass.Pass,
      instruction: Instruction.NoNeedToMove,
    };
  }

  if (flag === CrPassCheck.PassedOnChange) {
    return getQuestionIndexAndInstruction(
      indexOfMinCr,
      indexOfMaxWeight,
      criteriaCount
    );
  } else {
    return findDirection(newMatrixComparison, criteriaCount, ++recursiveCount);
  }
}
