import React, { PropsWithChildren } from "react";
import Head from "next/head";

const Layout = ({
  children,
  pagenumber,
}: PropsWithChildren<{ pagenumber?: number }>) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg" href="../icon.svg" />
        <title>
          {(pagenumber ? `${pagenumber}번 문항: ` : "") +
            "이륜차 착한운전 평가를 위한 설문조사"}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="서울시립대학교 공간 데이터베이스 연구실에서 진행하는 이륜차 착한운전 평가를 위한 설문조사입니다."
        />
        <meta
          name="og:description"
          content="서울시립대학교 공간 데이터베이스 연구실에서 진행하는 이륜차 착한운전 평가를 위한 설문조사입니다."
        />
      </Head>
      {children}
    </>
  );
};

export default Layout;
