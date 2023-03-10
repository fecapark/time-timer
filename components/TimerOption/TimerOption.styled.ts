import styled from "@emotion/styled";

export const Container = styled.div<{ triggerHide: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  opacity: ${(props) => (props.triggerHide ? "0" : "1")};
  visibility: ${(props) => (props.triggerHide ? "hidden" : "visible")};
  transform: translate3d(
    0,
    ${(props) => (props.triggerHide ? "-20" : "0")}px,
    0
  );
  transition: ${(props) =>
    props.triggerHide
      ? "0.3s cubic-bezier(0.2, 0, 0, 1) 0.1s"
      : "0.2s cubic-bezier(0, 0, 0, 1) 0.5s"};
`;
