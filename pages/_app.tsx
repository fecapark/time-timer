import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Seo from "../components/SEO/Seo";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { useEffect } from "react";
import { loadAudios } from "../backend/loadAudios";
import { soundEffectAudiosAtom, soundEffectLoadedAtom } from "../shared/atom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <Seo />
        <GlobalTheme />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
