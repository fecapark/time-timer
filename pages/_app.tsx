import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import GlobalTheme from "../styles/global";
import { Theme } from "../styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Intro from "../components/Intro/Intro";
import AppMiddleware from "../components/Middleware/AppMiddleware";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const qc = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          <QueryClientProvider client={qc}>
            <ReactQueryDevtools />
            <GlobalTheme />
            <AppMiddleware />
            <Component {...pageProps} />
            <Intro />
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
