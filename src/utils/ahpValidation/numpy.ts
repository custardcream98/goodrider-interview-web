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
 * @param N
 * @param M
 * @param k
 * @returns 단위행렬
 */
export function npEye(N: number, M: number, k: number) {
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
export function npAverage(arr: number[]) {
  return arr.reduce((acc, e) => acc + e, 0) / arr.length;
}

/**
 * 행렬곱 계산
 *
 * `np.dot()`
 * @param arr1
 * @param arr2
 * @returns
 */
export function npMatrixDot(arr1: number[][], arr2: number[][]) {
  return Array(arr1.length)
    .fill(0)
    .map((_, i) =>
      Array(arr2[0].length)
        .fill(0)
        .map((_, j) => arr1[i].reduce((acc, e, k) => acc + e * arr2[k][j], 0))
    );
}
