import styled from "@emotion/styled";
import { darken } from "polished";

export const Container = styled.div`
  width: 100%;
  padding: 1em;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PaddingAroundedContainer = styled.div`
  font-size: 14px;

  width: 100%;
  max-width: 800px;
  min-height: calc(100vh - 250px - 9em);

  padding: 0 1em;

  display: flex;
  flex-direction: column;

  margin-top: 8em;

  @media screen and (min-width: 799px) {
    min-height: calc(100vh - 450px - 9em);
  }

  @media screen and (min-width: 1269px) {
    min-height: calc(100vh - 550px - 9em);
  }
`;

export const GoHomeButtonContainer = styled.button<{ color: string }>`
  font-size: 48px;

  position: fixed;
  right: 0.8em;
  bottom: 1.2em;

  padding: 0.6em;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => darken(0.15, props.color)};

  cursor: pointer;

  .icon-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    svg {
      color: #eaf4f0;
      font-size: 1em;
      line-height: 1em;
      color: white;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 42px;
    right: 0.72em;
    bottom: 1.1em;
  }

  @media screen and (max-width: 500px) {
    font-size: 36px;
    right: 0.65em;
    bottom: 1em;
  }
`;
