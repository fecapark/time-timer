import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalTheme />
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
