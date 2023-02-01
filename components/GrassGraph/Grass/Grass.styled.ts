import styled from "@emotion/styled";

export const GrassBlock = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};

  border-radius: 1px;
`;
