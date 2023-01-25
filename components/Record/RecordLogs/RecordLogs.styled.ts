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
  transform: translate3d(0, calc(-14px * 4), 0);
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
      letter-spacing: 1.5px;
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

export const CardBox = styled.div<{ borderColor: string }>`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 48px;

  opacity: 0;
  animation: ${CardContainerFadeKeyframe} 0.4s cubic-bezier(0.2, 0, 0, 1) 0.65s
    forwards;

  .same-day-container {
    display: flex;
    flex-direction: column;
    gap: 18px;

    border-left: 4px solid ${(props) => props.borderColor};
    padding-left: 32px;
  }

  @media screen and (max-width: 800px) {
    .same-day-container {
      padding-left: 24px;
    }
  }
`;

export const CardContainer = styled.div<{ accentColor: string }>`
  width: 100%;
  height: 150px;

  display: flex;

  .time-displayer {
    width: 150px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 42px;
    line-height: 1em;
    font-family: ${({ theme }) => theme.font.family.poppins};
    font-weight: 200;

    border-radius: 24px;
    background-color: ${({ theme }) => theme.background.secondary};

    .hr {
      margin: 0.25em 0;
      width: 100%;
      height: 4px;
      background-color: ${({ theme }) => theme.background.primary};
    }
  }

  .info-container {
    font-size: 16px;

    width: 100%;
    height: 100%;
    padding: 16px 0;
    padding-left: 48px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .pause-info {
      font-size: 2.8em;
      font-weight: 500;
      color: ${(props) => props.accentColor};

      .percentage {
        font-family: ${({ theme }) => theme.font.family.poppins};
        line-height: 1em;
      }

      .goal {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 0.8em;
          filter: brightness(1.3);
        }
      }
    }

    .date-info {
      font-size: 1.15em;
      display: flex;
      flex-direction: column;
      gap: 0.2em;

      .full-date {
        color: #a0a0a0;
        font-size: 0.8em;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .info-container {
      padding-left: 36px;
    }
  }

  @media screen and (max-width: 500px) {
    .info-container > .pause-info {
      font-size: 2.4em;
    }

    .time-displayer {
      font-size: 36px;

      .hr {
        margin: 0.33em 0;
      }
    }
  }
`;
