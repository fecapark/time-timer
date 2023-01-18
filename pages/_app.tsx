import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMediaMatch from "../hooks/useMediaMatch";
import { useState } from "react";
import Intro from "../components/Intro/Intro";
import AppMiddleware from "../components/Middleware/AppMiddleware";

const qc = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [introTimeouted, setIntroTimeouted] = useState(false);
  const [_, mediaSetted] = useMediaMatch("");

  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={qc}>
            <GlobalTheme />
            <AppMiddleware />
            <Component {...pageProps} />
            {mediaSetted && introTimeouted ? null : (
              <Intro setIntroTimeouted={setIntroTimeouted} />
            )}
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
