import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "~/components/Layout";
import storageKeys, { getStorage } from "~/utils/localStorage";

const LandingPage = () => {
  const [isEnded, setIsEnded] = useState(false);
  const [isOnGoing, setIsOnGoing] = useState(false);

  useEffect(() => {
    setIsEnded(Boolean(getStorage(storageKeys.isEnded)));
    setIsOnGoing(Boolean(getStorage(storageKeys.isOnGoing)));
  }, []);

  return (
    <Layout>
      <div className="h-screen w-full bg-white centering flex-col">
        <h1
          className="text-title-mobile md:text-title text-gray-900 font-bold md:w-2/4 w-11/12 text-center leading-normal"
          style={{ wordBreak: "keep-all" }}
        >
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        {isEnded ? (
          <p className="mt-5 text-xl">
            이미 설문에 참여하셨습니다. 감사합니다.
          </p>
        ) : (
          <Link href={"/interview"}>
            <button
              className="py-2 px-3 mt-5 bg-indigo-500 text-white text-m md:text-xl font-semibold rounded-md shadow focus:outline-none"
              disabled={isOnGoing}
            >
              {isOnGoing ? "설문 이어하기" : "설문 시작"}
            </button>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
