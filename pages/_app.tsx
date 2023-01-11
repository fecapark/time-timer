import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMediaMatch from "../hooks/useMediaMatch";
import { useEffect, useState } from "react";
import Intro from "../components/Intro/Intro";
import { checkSetDefaultOption } from "../hooks/useIDB";

const qc = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [introTimeouted, setIntroTimeouted] = useState(false);
  const [isOptionLoaded, setIsOptionLoaded] = useState(false);
  const [_, mediaSetted] = useMediaMatch("");

  useEffect(() => {
    const setDefaultOption = async () => {
      await checkSetDefaultOption();
      setIsOptionLoaded(true);
    };
    setDefaultOption();
  }, []);

  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={qc}>
            <GlobalTheme />
            <Component {...pageProps} />
            {mediaSetted && isOptionLoaded && introTimeouted ? null : (
              <Intro setIntroTimeouted={setIntroTimeouted} />
            )}
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
