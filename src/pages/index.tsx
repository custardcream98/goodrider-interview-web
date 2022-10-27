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
      <div className="centering h-screen w-full flex-col bg-white">
        <h1 className="keep-all w-11/12 text-center text-title-mobile font-bold leading-normal text-gray-900 md:w-2/4 md:text-title">
          착한 이륜차 운전자 평가 모델 관련 설문조사
        </h1>
        {isEnded ? (
          <p className="mt-5 text-xl">
            이미 설문에 참여하셨습니다. 감사합니다.
          </p>
        ) : (
          <Link href="/interview/1">
            <a type="button" className="page-btn mt-5">
              {isOnGoing ? "설문 이어하기" : "설문 시작"}
            </a>
          </Link>
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
