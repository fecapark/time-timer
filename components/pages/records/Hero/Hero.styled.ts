import styled from "@emotion/styled";

export const HeroContainer = styled.div`
  max-width: 1760px;
  width: 100%;
  height: 250px;

  @media screen and (min-width: 799px) {
    height: 450px;
  }

  @media screen and (min-width: 1269px) {
    height: 550px;
  }
`;
