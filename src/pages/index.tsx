import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "~/components/Layout";
import storageKeys, {
  getStorage,
  getUserInfoLocalStorage,
  removeLocalAnswer,
  removeLocalisOnGoing,
  removeLocalUserInfo,
  setUserInfoLocalStorage,
} from "~/utils/localStorage";
import { IUserInfo } from "~/interfaces/userInfo";
import Router from "next/router";
import GreetingMessage from "~/components/GreetingMessage";

interface HTMLCustomInputSelectElement extends HTMLInputElement {
  name: keyof IUserInfo;
}

/**
 * key에 따라 `onFormChange()`에서 사용될 적절한 파싱 함수를 담고 있는 map 역할의 객체
 */
const parseValueMap: {
  [key: string]: (input: string) => number | string | boolean;
} = {
  age: parseInt,
  gender: (g: string) => g,
  experiencedMotor: (e: string) => JSON.parse(e),
};

const LandingPage = () => {
  const [isEnded, setIsEnded] = useState(false);
  const [isOnGoing, setIsOnGoing] = useState(false);

  const [isUserInfoReady, setIsUserInfoReady] = useState(false);
  const [userInfoState, setUserInfoState] = useState<Partial<IUserInfo>>({});

  /**
   * form 값이 바뀔 때마다 적절한 파싱을 진행해
   * userInfo state를 변경하는 콜백함수
   */
  const onFormChange = (event: FormEvent<HTMLFormElement>) => {
    const { name, value } = event.target as HTMLCustomInputSelectElement;
    const parsedValue = parseValueMap[name](value);

    setUserInfoState((prev) => ({ ...prev, [name]: parsedValue }));
  };

  useEffect(() => {
    const userInfoStateKeys = Object.keys(userInfoState);

    if (userInfoStateKeys.length !== 0) setUserInfoLocalStorage(userInfoState);

    if (userInfoStateKeys.length === 3) {
      setIsUserInfoReady(true);
    }
  }, [userInfoState]);

  useEffect(() => {
    setIsEnded(JSON.parse(getStorage(storageKeys.isEnded)));
    setIsOnGoing(JSON.parse(getStorage(storageKeys.isOnGoing)));

    const userInfo = getUserInfoLocalStorage();

    setUserInfoState(userInfo || {});
  }, []);

  const handleReset = () => {
    removeLocalAnswer();
    removeLocalisOnGoing();
    removeLocalUserInfo();

    Router.reload();
  };

  return (
    <Layout>
      <h1 className="keep-all my-4 text-center text-title-mobile font-bold leading-normal text-gray-900 md:text-title">
        이륜차 착한운전 평가를 위한{" "}
        <span className="block md:inline">설문조사</span>
      </h1>
      {isEnded ? (
        <p className="question-bundle mt-5 text-xl">
          설문에 참여해주셔서 감사합니다! 🙇
        </p>
      ) : (
        <main className="mx-auto p-4 md:w-920 md:p-0">
          <GreetingMessage />
          <section>
            <div className="question-bundle mt-5">
              <h2 className="sr-only">개인정보 입력</h2>
              <form
                action="#"
                onChange={onFormChange}
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <label className="mb-2 block text-lg" htmlFor="age">
                  나이대
                </label>
                <select
                  className="select block"
                  id="age"
                  name="age"
                  value={userInfoState.age}
                >
                  <option value="">나이대를 선택해주세요.</option>
                  <option value="10">10대</option>
                  <option value="20">20대</option>
                  <option value="30">30대</option>
                  <option value="40">40대</option>
                  <option value="50">50대</option>
                  <option value="60">60대 이상</option>
                </select>
                <fieldset className="my-4">
                  <legend className="mb-2 block text-lg">성별</legend>
                  <input
                    className="mx-1"
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked={userInfoState.gender === "male"}
                  />
                  <label htmlFor="male">남성</label>
                  <input
                    className="ml-3 mr-1"
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    defaultChecked={userInfoState.gender === "female"}
                  />
                  <label htmlFor="female">여성</label>
                </fieldset>
                <fieldset className="mt-4">
                  <legend className="mb-2 block text-lg">
                    이륜차 운전 경험 여부
                  </legend>
                  <input
                    className="mx-1"
                    id="yes"
                    type="radio"
                    name="experiencedMotor"
                    value="true"
                    defaultChecked={userInfoState.experiencedMotor === true}
                  />
                  <label htmlFor="yes">있음</label>
                  <input
                    className="ml-3 mr-1"
                    id="no"
                    type="radio"
                    name="experiencedMotor"
                    value="false"
                    defaultChecked={userInfoState.experiencedMotor === false}
                  />
                  <label htmlFor="no">없음</label>
                </fieldset>
              </form>
            </div>
            {(isOnGoing || Object.keys(userInfoState).length !== 0) && (
              <button
                className="page-btn mt-4 w-[200px]"
                type="button"
                onClick={handleReset}
              >
                응답 초기화하기
              </button>
            )}
            <Link href="/interview/1">
              <a
                className={`page-btn float-right my-4 w-[200px] ${
                  isUserInfoReady ? "" : "pointer-events-none opacity-30"
                }`}
              >
                {isOnGoing ? "설문 이어하기" : "설문 시작"}
                <span className="float-right">{">"}</span>
              </a>
            </Link>
          </section>
        </main>
      )}
    </Layout>
  );
};

export default LandingPage;
