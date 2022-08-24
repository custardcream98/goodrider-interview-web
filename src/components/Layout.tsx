import React from "react";
import Head from "next/head";

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>착한 이륜차 평가 모델 관련 설문조사</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
