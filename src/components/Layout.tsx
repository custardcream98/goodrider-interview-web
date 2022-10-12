import React from "react";
import Head from "next/head";

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
  pagenumber?: number;
};

const Layout = ({ children, pagenumber }: Props) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg" href="../icon.svg" />
        <title>
          {(pagenumber ? `${pagenumber}번 문항: ` : "") +
            "착한 이륜차 평가 모델 관련 설문조사"}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="서울시립대학교 공간 데이터베이스 연구실에서 진행하는 '착한 이륜차 운전자 평가 모델' 개발 사업을 위한 설문 페이지입니다."
        />
      </Head>
      {children}
    </>
  );
};

export default Layout;
