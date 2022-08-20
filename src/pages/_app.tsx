import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import "~/styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
