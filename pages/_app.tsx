import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Seo from "../components/SEO/Seo";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { fbApp, fbStorage } from "../backend/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getDownloadURL(ref(fbStorage, "audio/attention-bell.wav")).then((url) => {
      console.log(url);
    });
  }, []);

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
