import styled from "@emotion/styled";

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.background.primary};
`;

export default function Home() {
  return <Container>hello</Container>;
}
