const storageKeys = {
  isEnded: 'isEnded',
  isOnGoing: 'isOnGoing'
}

export const getStorage = (key) =>
  window.localStorage.getItem(key);
export const setStorage = (key, value) => window.localStorage.setItem(key, value);

export default storageKeys;