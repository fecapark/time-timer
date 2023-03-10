import styled from "@emotion/styled";

export const TimeTextContainer = styled.div<{
  triggerZoom: boolean;
  isHide: boolean;
}>`
  ${({ theme }) => theme.shareCSS.noDrag};

  font-size: ${(props) => (props.isHide ? "72" : "60")}px;
  line-height: 1em;
  font-weight: 100;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  transform-origin: right bottom;
  transform: scale(${(props) => (props.triggerZoom ? 2.5 : 1)});
  transition: transform
    ${(props) =>
      props.triggerZoom
        ? "0.3s cubic-bezier(0.2, 0, 0, 1)"
        : "0.15s cubic-bezier(0, 0, 0, 1)"};
  transition-delay: 0.3s;

  .row {
    width: 100px;
    display: flex;
    justify-content: ${(props) => (props.isHide ? "center" : "flex-end")};

    .min,
    .sec {
      font-family: "Poppins", sans-serif;
    }
  }
`;
