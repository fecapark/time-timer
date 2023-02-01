import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { IValueDisplayerStyleProps } from "./RecordOverview.type";

export const ContentHeader = styled.div`
  font-size: 1.45em;
  margin-bottom: 4.5em;

  h2 {
    font-family: ${({ theme }) => theme.font.family.raleway};
    font-size: 1.6em;
    line-height: 1.7em;
    font-weight: 600;
  }

  h3 {
    font-family: ${({ theme }) => theme.font.family.raleway};
    font-size: 0.85em;
    font-weight: 400;
    color: #e0e0e0;
  }

  @media screen and (min-width: 499px) {
    font-size: 1.7em;
  }

  @media screen and (min-width: 799px) {
    font-size: 2em;
  }
`;

export const ContentBody = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3em;

  @media screen and (min-width: 799px) {
    &[data-name="total-time"] {
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      row-gap: 5em;

      & > div[data-head="true"] {
        grid-column: 1 / 4;
      }
    }

    &[data-name="behavior"] {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export const ValueItem = styled.div`
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family.poppins};

  &[data-head="true"] {
    font-size: 20px;
    margin-bottom: 2em;
  }
`;

export const ValueDisplayer = styled.div<IValueDisplayerStyleProps>`
  span {
    line-height: calc(1em + 10px);
    font-weight: 400;
  }

  .big {
    font-size: 4em;
    line-height: calc(1em + 10px);
    color: ${(props) => props.theme.clock.color[props.testColor]};
  }

  .mid {
    font-size: 2em;
    color: ${(props) => props.theme.clock.color[props.testColor]};
  }

  .small {
    font-size: 1.3em;
    margin-left: 6px;
  }

  @media screen and (min-width: 799px) {
    ${(props) =>
      props.inHead
        ? `
    font-size: 1.4em;
    `
        : ""}
  }
`;

export const ValueInfo = styled.span`
  font-size: 1.2em;
  line-height: 1.1em;

  font-weight: 300;
`;

export const ContentSection = styled.div<{
  show?: boolean;
  scrolled?: boolean;
}>`
  margin-bottom: 16em;

  opacity: ${(props) => (props.show ? "1" : "0")};
  transform: translate3d(0, ${(props) => (props.show ? "0" : "80px")}, 0);

  transition: 0.4s cubic-bezier(0.2, 0, 0, 1);
  transition-delay: ${(props) => (props.scrolled ? "0s" : "0.65s")};
`;

ContentSection.defaultProps = {
  show: true,
  scrolled: false,
};
