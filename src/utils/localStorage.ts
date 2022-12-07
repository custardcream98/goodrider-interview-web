import { IUserInfo } from "~/interfaces/userInfo";

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

enum storageKeys {
  isEnded = "isEnded",
  isOnGoing = "isOnGoing",
  answers = "answers",
  userInfo = "userInfo",
}

export const getStorage = (key: string) => localStorage.getItem(key);
export const setStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getUserInfoLocalStorage = () => {
  try {
    const userInfo: IUserInfo = JSON.parse(getStorage(storageKeys.userInfo));
    return userInfo || null;
  } catch (e) {
    return null;
  }
};
export const setUserInfoLocalStorage = ({
  age,
  gender,
  experiencedMotor,
}: Partial<IUserInfo>) =>
  setStorage(
    storageKeys.userInfo,
    JSON.stringify({ age, gender, experiencedMotor })
  );
export const checkUserInfoValid = () => {
  const userInfo = getUserInfoLocalStorage();
  return userInfo && Object.keys(userInfo).length === 3;
};

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

  if (currentAnswers)
    return pageIndex in currentAnswers
      ? currentAnswers[pageIndex][questionIndex]
      : null;
  return null;
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

  setStorage(storageKeys.answers, JSON.stringify(currentAnswers));
};
export const resetSliderAnswersOfPage = (pageIndex: number) => {
  let currentAnswers: ILocalAnswers =
    JSON.parse(getStorage(storageKeys.answers)) ?? {};

  delete currentAnswers[pageIndex];

  setStorage(storageKeys.answers, JSON.stringify(currentAnswers));
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
  localStorage.removeItem(storageKeys.isOnGoing);
export const removeLocalUserInfo = () =>
  localStorage.removeItem(storageKeys.userInfo);
export const setIsEndedLocalStorage = () =>
  setStorage(storageKeys.isEnded, "true");

export default storageKeys;
