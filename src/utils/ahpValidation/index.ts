import { ISliderScoreState } from "../atom";
import { calAhp, getChangedRows } from "./calculations";
import { npEye, npTranspose } from "./numpy";

const CR_PASS = 0.1;

function getTargetMatrixComparison(
  matrixComparison: number[][]
): [number[][], number, number, number] {
  const [originalWeight, originalCr] = calAhp(matrixComparison);
  console.log(originalCr);

  if (originalCr < CR_PASS) {
    /*
      통과일 경우 flag = 0;
    */
    return [[[]], 0, 0, 0];
  }

  const [changedRows, indexOfMaxWeight] = getChangedRows(
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

    const [_, cr] = calAhp(matrixComparison);
    return cr;
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

  const flag = minCr < 0.1 ? 1 : 2;

  return [matrixComparison, indexOfMinCr, indexOfMaxWeight, flag];
}

type questionIndex = number;
type instruction = string;

function countPr(
  indexOfMinCr: number,
  indexOfMaxWeight: number,
  elementCount: number
): [questionIndex, instruction] {
  let questionIndex = Math.floor((indexOfMinCr - 1) / 2) + 1;
  let updown = indexOfMinCr % 2;

  if (questionIndex > indexOfMaxWeight) {
    // 입력값 부분, 엑셀 실습에서 초록칸
    questionIndex -= indexOfMaxWeight;

    for (let i = 1; i < indexOfMaxWeight + 1; i++)
      questionIndex += elementCount - i;
  } else {
    // 할당값 부분
    let k = indexOfMaxWeight - questionIndex + 1;

    for (let i = 1; i < questionIndex; i++) k += elementCount - i;

    questionIndex = k;
  }

  if (updown === 0) return [questionIndex, "왼쪽"];
  else return [questionIndex, "오른쪽"];
}

function getMatrixComparison(
  criteriaCount: number,
  sliderScore: ISliderScoreState
) {
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

export function checkSliderValid(
  criteriaCount: number,
  sliderScore: ISliderScoreState
): [questionIndex | "pass", instruction] {
  const matrixComparison = getMatrixComparison(criteriaCount, sliderScore);
  const [firstMatrixComparison, indexOfMinCr, indexOfMaxWeight, flag] =
    getTargetMatrixComparison(matrixComparison);

  if (flag === 0) {
    return ["pass", ""];
  }

  if (flag === 1) {
    return countPr(indexOfMinCr, indexOfMaxWeight, criteriaCount);
  } else {
    const [_, secoundIndexOfMinCr, secoundIndexOfMaxWeight, secoundFlag] =
      getTargetMatrixComparison(firstMatrixComparison);

    if (secoundFlag === 2) {
      /*
        두 번 확인했으나 일관성 지수가 벗어난 경우
        이전 값을 리턴합니다.
      */
      return [-1, "일관성 지수가 크게 벗어났습니다. 다시 설문해주세요!"];
    } else {
      return countPr(
        secoundIndexOfMinCr,
        secoundIndexOfMaxWeight,
        criteriaCount
      );
    }
  }
}
