import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Layout from "~/components/Layout";
import storageKeys, {
  getStorage,
  getUserInfoLocalStorage,
  IUserInfo,
  setUserInfoLocalStorage,
} from "~/utils/localStorage";

type UserInfoName = "age" | "gender" | "experiencedMotor";

interface HTMLCustomInputSelectElement extends HTMLInputElement {
  name: UserInfoName;
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
    console.log(userInfoState);

    const userInfoStateKeys = Object.keys(userInfoState);

    if (userInfoStateKeys.length !== 0) setUserInfoLocalStorage(userInfoState);

    if (userInfoStateKeys.length === 3) {
      setIsUserInfoReady((_) => true);
    }
  }, [userInfoState]);

  useEffect(() => {
    setIsEnded((_) => JSON.parse(getStorage(storageKeys.isEnded)));
    setIsOnGoing((_) => JSON.parse(getStorage(storageKeys.isOnGoing)));

    const userInfo = getUserInfoLocalStorage();

    setUserInfoState((_) => userInfo || {});
  }, []);

  return (
    <Layout>
      <h1 className="keep-all my-4 text-center text-title-mobile font-bold leading-normal text-gray-900 md:text-title">
        착한 이륜차 운전자 평가 모델{" "}
        <span className="block md:inline">관련 설문조사</span>
      </h1>
      {isEnded ? (
        <p className="question-bundle mt-5 text-xl">
          설문에 참여해주셔서 감사합니다! 🙇
        </p>
      ) : (
        <main className="mx-auto p-4 md:w-920 md:p-0">
          <section className="quote keep-all mt-0 text-lg">
            <h2 className="sr-only">설문조사 소개</h2>
            <p>
              본 설문조사는 이륜차 착한운전 평가 시스템 개발에 관한
              설문지입니다. 본 설문지는 <strong>무기명</strong>으로 작성되며,
              설문의 결과는 이륜차 안전운전을 위한 기술 개발 연구에 사용되오니
              설문 항목에 성실히 응답해주시면 대단히 감사하겠습니다.
            </p>
            <p>
              설문에 대한 궁금한 점이 있거나 문의하실 사항이 있으시다면
              서울시립대학교 공간데이터베이스 연구실
              <a href="tel:+0264905657">(02-6490-5657)</a>로 연락주시기
              바랍니다.
            </p>
            <p className="my-5">
              아울러 응답해주신 분들 중 추첨을 통해 감사의 의미를 담아
              기프티콘을 드리고자 하오니 원하시는 분은 이메일 주소를
              기입해주시기 바랍니다.
            </p>
            <p className="my-5">
              바쁘신 중에도 귀중한 시간을 내시어 본 설문조사에 응해주셔서
              감사합니다.
            </p>
            <p className="mt-5 text-base">
              서울시립대학교 공간데이터베이스 연구실
            </p>
          </section>
          <section className="question-bundle mt-5">
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
          </section>
          <Link href="/interview/1">
            <a
              className={`page-btn mt-5 ml-auto block w-[200px] ${
                isUserInfoReady ? "" : "pointer-events-none opacity-30"
              }`}
            >
              {isOnGoing ? "설문 이어하기" : "설문 시작"}
              <span className="float-right">{">"}</span>
            </a>
          </Link>
        </main>
      )}
    </Layout>
  );
};

export default LandingPage;
