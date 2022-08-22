import { useEffect } from "react";
import storageKeys from "~/utils/localStorage";

const MainPage = () => {
  useEffect(() => {}, []);
  window.localStorage.getItem(storageKeys.isEnded);
  return <div>안녕</div>;
};

export default MainPage;
