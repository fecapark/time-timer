import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Seo from "../components/SEO/Seo";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";

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
