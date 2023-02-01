import styled from "@emotion/styled";

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
