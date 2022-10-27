interface ILocalAnswers {
  [key: number]: ILocalSliderAnswer | ILocalSelectiveAnswer;
}

interface ILocalSliderAnswer {
  [subIndex: number]: number;
}

export interface ILocalSelectiveAnswer {
  checked: number;
  values: number[];
}

const storageKeys = {
  isEnded: "isEnded",
  isOnGoing: "isOnGoing",
  answers: "answers",
};

export const getStorage = (key: string) => localStorage.getItem(key);
export const setStorage = (key: string, value) =>
  localStorage.setItem(key, value);

export const getAllAnswers = () => {
  const currentAnswers: ILocalAnswers = JSON.parse(
    getStorage(storageKeys.answers)
  );

  return currentAnswers || null;
};
export const getAnswer = (
  pageIndex: number,
  questionIndex: number
): number | null => {
  const currentAnswers: ILocalAnswers = getAllAnswers();

  return pageIndex in currentAnswers
    ? currentAnswers[pageIndex][questionIndex]
    : null;
};
export const setAnswer = (
  pageIndex: number,
  questionIndex: number,
  value: number
) => {
  let currentAnswers: ILocalAnswers =
    JSON.parse(getStorage(storageKeys.answers)) ?? {};

  if (!(pageIndex in currentAnswers)) currentAnswers[pageIndex] = {};
  currentAnswers[pageIndex][questionIndex] = value;

  localStorage.setItem(storageKeys.answers, JSON.stringify(currentAnswers));
};

interface ICheckerAnswerProps {
  questionIndex: string;
  values: number[];
  checked: number;
}

export const setCheckerAnswer = ({
  questionIndex,
  values,
  checked,
}: ICheckerAnswerProps) => {
  let currentAnswers: ILocalAnswers =
    JSON.parse(getStorage(storageKeys.answers)) ?? {};
  currentAnswers[questionIndex] = {
    checked,
    values,
  };
  localStorage.setItem(storageKeys.answers, JSON.stringify(currentAnswers));
};
export const getCheckerAnswer = (
  questionIndex: string
): { checked: number; values: number[] } | null => {
  const currentAnswers: ILocalAnswers = JSON.parse(
    getStorage(storageKeys.answers)
  );

  return currentAnswers !== null ? currentAnswers[questionIndex] : null;
};

export const removeLocalAnswer = () =>
  localStorage.removeItem(storageKeys.answers);
export const removeLocalisOnGoing = () =>
  localStorage.removeItem(storageKeys.answers);
export const setIsEndedLocalStorage = () =>
  setStorage(storageKeys.isEnded, true);

export default storageKeys;
