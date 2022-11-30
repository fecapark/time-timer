import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Seo from "../components/SEO/Seo";
import {
  isNotificationPermissionGranted,
  isNotificationSupportEnvironmentAtom,
} from "../shared/atom";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const setIsNotificationSupportEnvironment = useSetRecoilState(
    isNotificationSupportEnvironmentAtom
  );
  const setIsNotificationPermissionGranted = useSetRecoilState(
    isNotificationPermissionGranted
  );

  useEffect(() => {
    async function requestNotificationPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") setIsNotificationPermissionGranted(true);
    }

    if (!Notification) setIsNotificationSupportEnvironment(false);
    requestNotificationPermission();
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
