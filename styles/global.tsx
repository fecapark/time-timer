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
  body,
  #__next {
    width: 100%;
    height: 100%;
  }

  html,
  body {
    position: fixed;
    overflow: hidden;
  }

  body {
    font-family: ${Theme.font.family.primary};
    font-size: 14px;
    color: ${Theme.font.color.primary};
    background-color: ${Theme.background.primary};
  }

  #__next {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

export default function GlobalTheme() {
  return <Global styles={GlobalStyle} />;
}
