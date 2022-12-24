import styled from "@emotion/styled";

export const Container = styled.div<{ active: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.active ? "1" : "0")};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;

  background-color: #00000077;
`;

export const ContentContainer = styled.div<{ active: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  z-index: 100;
  background-color: #212124;

  transform: translate3d(0, ${(props) => (props.active ? "0" : "100%")}, 0);
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
`;

export const ContentHeader = styled.div`
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  width: 100%;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  touch-action: none;

  .mover {
    width: 30px;
    height: 4px;

    border-radius: 1000px;
    background-color: #626264;
  }
`;
