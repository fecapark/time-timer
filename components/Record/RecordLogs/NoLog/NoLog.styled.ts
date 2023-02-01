import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const NoLogContainerFadeKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, calc(-14px * 4 + 30px), 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, calc(-14px * 4), 0);
  }
`;

export const NoLogContainer = styled.div`
  width: 100%;
  min-height: inherit;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  gap: 0.8em;

  color: #626262;

  opacity: 0;
  transform: translate3d(0, calc(-14px * 4 + 30px), 0);
  animation: ${NoLogContainerFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.65s
    forwards;

  svg {
    font-size: 4em;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 0.3em;

    .title {
      font-size: 1em;
      font-weight: 500;
    }

    .description {
      font-size: 0.68em;
    }
  }

  @media screen and (max-width: 1270px) {
    font-size: 22px;
  }

  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;
