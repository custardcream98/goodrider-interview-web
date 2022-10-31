import { npAverageOfArr, npMatrixDot, npTranspose } from "./numpy";

/**
 * Random Index 값
 */
const randomIndexTable = [
  0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57,
  1.59,
];

/**
 * 가중치와 CR을 계산하는 함수
 *
 * @param matrixComparison
 * @returns `[weight, CR]`
 */
export function calAhp(matrixComparison: number[][]): {
  weight: number[];
  Cr: number;
} {
  const elementCount = matrixComparison.length;

  /*
    2. comparison matrix 열의 합 계산
  */

  let matrixSum = npTranspose(matrixComparison).map((line) =>
    line.reduce((acc, e) => acc + e, 0)
  );

  /*
    3. 1,2번을 이용, normalized matrix 계산
  */

  let matrixNomalized = matrixComparison.map((line) =>
    line.map((e, i) => e / matrixSum[i])
  );

  /*
    4. 가중치(weight) 계산
  */

  const weight = matrixNomalized.map((line) => [npAverageOfArr(line)]);

  /*
    5. 일관성 체크
  */

  const AW = npMatrixDot(matrixComparison, weight).map((e) => e[0]);
  const lambda = AW.map((awElement, i) => awElement / weight[i][0]);
  const lambdaMax = npAverageOfArr(lambda);
  const Ci = (lambdaMax - elementCount) / (elementCount - 1);

  const Cr = Ci / randomIndexTable[elementCount - 1] || 0; // 요소의 개수가 두개일 경우 NaN

  return { weight: weight.map((e) => e[0]), Cr };
}

/**
 * `getChangedRows()` 에서 필요한 1 미만 값 break points
 */
// const minorities = [1 / 2, 1 / 3, 1 / 4, 1 / 5, 1 / 6, 1 / 7, 1 / 8, 1 / 9];

/**
  * 가중치가 가장 큰 행을 찾아 각 항목에 +-1을(1이하의 수는 분모의 +-1) 계산한 배열을 생성    
  * * 입력값 : matrixComparison, 가중치(weight)  
  * * 리턴값 : +-1 연산된 행들의 배열(changedRows), matrixComparison에서 가중치가 가장큰 행의 위치 인덱스(indexOfMaxWeight)  
  
 * 위 리턴값 두 가지로 matrixComparison을 바꾸어 가며, 최소의 CR을 가진 matrixComparison을 찾음.
 * @param matrixComparison 
 * @param weight 
 * @returns `[changedRows, indexOfMaxWeight]`
 */
export function getChangedRows(
  matrixComparison: number[][],
  weight: number[]
): { changedRows: number[][]; indexOfMaxWeight: number } {
  const indexOfMaxWeight = weight.indexOf(Math.max(...weight));
  // 가중치가 높은 항목의 인덱스 찾기

  const maxWeightRow = matrixComparison[indexOfMaxWeight];
  // 가중치가 가장 높은 행을 그대로 저장

  let changedRows = []; // 각 행 요소마다 +-1을 한 행들의 집합

  for (let i = 0; i < maxWeightRow.length; i++) {
    if (i === indexOfMaxWeight)
      // 대각행렬 제외
      continue;
    let increased = [...maxWeightRow],
      decreased = [...maxWeightRow];

    const { increasedElement, decreasedElement } = getChangedRowDelta(
      maxWeightRow[i]
    );
    increased[i] = increasedElement;
    decreased[i] = decreasedElement;
    changedRows.push(increased);
    changedRows.push(decreased);
  }

  // [1,3,5,7] => changedRows = [[1,4,5,7],[1,2,5,7],[1,3,6,7],[1,3,4,7].....]
  return { changedRows, indexOfMaxWeight };
}

/**
 * 1 미만 여부 확인하여 increasedElement, decreasedElement 계산하는 함수
 * @param numToChange
 * @returns
 */
function getChangedRowDelta(numToChange: number): {
  increasedElement: number;
  decreasedElement: number;
} {
  let isInversed = false;
  let increasedElement = 0,
    decreasedElement = 0;

  if (numToChange < 1) {
    isInversed = true;
    numToChange = 1 / numToChange;
  }

  if (numToChange >= 8) {
    if (isInversed) {
      decreasedElement = 9;
      increasedElement = numToChange - 1;
    } else {
      increasedElement = 9;
      decreasedElement = numToChange - 1;
    }
  } else {
    if (isInversed) {
      decreasedElement = numToChange + 1;
      increasedElement = numToChange - 1;
    } else {
      increasedElement = numToChange + 1;
      decreasedElement = numToChange - 1;
    }
  }

  return isInversed
    ? {
        increasedElement: 1 / increasedElement,
        decreasedElement: 1 / decreasedElement,
      }
    : {
        increasedElement,
        decreasedElement,
      };
}
