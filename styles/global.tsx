import { Global, css, useTheme } from "@emotion/react";
import { Theme } from "./theme";

const GlobalStyle = css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;

    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
  }

  body {
    font-size: 14px;
    color: ${Theme.font.primary};
    background-color: ${Theme.background.primary};
  }
`;

export default function GlobalTheme() {
  return <Global styles={GlobalStyle} />;
}
