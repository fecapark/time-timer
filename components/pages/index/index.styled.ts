import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2.5em 0;
  overflow-y: hidden;

  @media screen and (max-width: 768px) {
    padding: 1.5em 0;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;
