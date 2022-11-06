/*
  numpy 대체 함수
*/

export function npTranspose(arr: number[][]) {
  return arr[0].map((_, i) => arr.map((e) => e[i]));
}

/**
 * 단위행렬 생성 함수
 *
 * `np.eye()`
 */
export function npEye(N: number, M: number, k: number): number[][] {
  let t = [];
  for (let i = 0; i < N; i++) {
    let p = [];
    for (let j = 0; j < M; j++) {
      p.push(j - i === k ? 1 : 0);
    }
    t.push(p);
  }
  return t;
}

/**
 * 배열의 평균 계산
 *
 * `np.average()`
 * @param arr
 * @returns 평균
 */
export function npAverageOfArr(arr: number[]) {
  return arr.reduce((acc, e) => acc + e, 0) / arr.length;
}

/**
 * 행렬곱 계산
 *
 * `np.dot()`
 */
export function npMatrixDot(matrix1: number[][], matrix2: number[][]) {
  return Array(matrix1.length)
    .fill(0)
    .map((_, i) =>
      Array(matrix2[0].length)
        .fill(0)
        .map((_, j) =>
          matrix1[i].reduce((acc, e, k) => acc + e * matrix2[k][j], 0)
        )
    );
}
