interface answers {
  [key: number]: number;
}

const storageKeys = {
  isEnded: 'isEnded',
  isOnGoing: 'isOnGoing',
  answers: 'answers'
}

export const getStorage = (key:string) =>
  localStorage.getItem(key);
export const setStorage = (key: string, value) => localStorage.setItem(key, value);

export const getAnswer = (questionIndex: string):number|null => {
  const currentAnswers: answers = JSON.parse(getStorage(storageKeys.answers));
  
  return currentAnswers !== null ? currentAnswers[questionIndex] : null;
}
export const setAnswer = (questionIndex: string, value: number) => {
  let currentAnswers:answers = JSON.parse(getStorage(storageKeys.answers)) ?? {};
  currentAnswers[questionIndex] = value;
  localStorage.setItem(storageKeys.answers, JSON.stringify(currentAnswers))
}

export default storageKeys;