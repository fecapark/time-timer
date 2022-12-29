import styled from "@emotion/styled";

export const Container = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.active ? "1" : "0")};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};

  transition: ${(props) =>
    props.active
      ? "none"
      : `
    opacity 0s linear 0.25s,
    visibility 0s linear 0.25s
  `};
`;

export const Background = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.active ? "1" : "0")};
  transition: opacity 0.25s cubic-bezier(0.2, 0, 0, 1);

  background-color: #00000077;
`;

export const ContentContainer = styled.div<{ active: boolean }>`
  width: 500px;
  max-height: calc(100% - 32px * 2);

  z-index: 100;
  background-color: #212124;

  margin: 0 24px;
  padding: 48px 32px;
  border-radius: 24px;

  opacity: ${(props) => (props.active ? "1" : "0")};
  transform: scale(${(props) => (props.active ? "1" : "1.1")});
  transition: 0.25s cubic-bezier(0.2, 0, 0, 1);

  overflow-y: auto;
`;

export const ContentHeader = styled.div`
  width: 100%;
  text-align: start;

  margin-bottom: 18px;

  span {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15px;
  }
`;
