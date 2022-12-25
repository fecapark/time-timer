import styled from "@emotion/styled";

export const IntroContainer = styled.div<{ hide: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background.primary};

  opacity: ${(props) => (props.hide ? "0" : "1")};
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  transition: 0.4s cubic-bezier(0.2, 0, 0, 1);
`;

export const Logo = styled.div<{ hide: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};
  font-size: 18px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.11em;

  font-family: "Raleway", sans-serif;
  font-weight: 600;
  letter-spacing: 0.3px;

  .word {
    padding: 0.16em 0.33em;

    &.bottom {
      background-color: white;
      color: #212121;
    }
  }

  opacity: ${(props) => (props.hide ? "0" : "1")};
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  transition: 0.22s ease;
`;
