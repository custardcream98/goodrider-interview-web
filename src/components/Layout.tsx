import React from "react";
import Head from "next/head";

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
