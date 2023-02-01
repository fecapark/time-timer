import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const CardContainerFadeKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const CardBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 80px;

  opacity: 0;
  transform: translate3d(0, 30px, 0);
  animation: ${CardContainerFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.65s
    forwards;
`;
