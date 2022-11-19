import { Global, css } from "@emotion/react";

const GlobalStyle = css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;

    box-sizing: border-box;
  }

  html {
    font-size: 14px;
    color: white;
  }

  body {
  }
`;

export default function GlobalTheme() {
  return <Global styles={GlobalStyle} />;
}
