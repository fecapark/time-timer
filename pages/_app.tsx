import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMediaMatch from "../hooks/useMediaMatch";
import { useState } from "react";
import Intro from "../components/Intro/Intro";

const qc = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [_, mediaSetted] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={qc}>
            <GlobalTheme />
            <Component {...pageProps} />
            {!mediaSetted || showIntro ? (
              <Intro setShowIntro={setShowIntro} />
            ) : null}
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
