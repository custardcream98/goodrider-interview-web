/**
 * 슬라이더가 한 쪽에 몇 단계까지 있는지를 나타냄
 */
const SLIDER_STEPS = 9;

export const calValToScore = (val: number) => {
  if (val === 50) {
    val = 1;
  } else if (val < 50) {
    val = ((SLIDER_STEPS - 1) / SLIDER_STEPS) * (val / 50) + 1 / SLIDER_STEPS;
  } else {
    val = ((val - 50) / 50) * (SLIDER_STEPS - 1) + 1;
  }

  return val;
};

export const calScoreToVal = (score: number) => {
  if (score === 1) {
    return 50;
  } else if (score < 1) {
    return (
      (((score - 1 / SLIDER_STEPS) * SLIDER_STEPS) / (SLIDER_STEPS - 1)) * 50
    );
  } else {
    return ((score - 1) * 50) / (SLIDER_STEPS - 1) + 50;
  }
};
