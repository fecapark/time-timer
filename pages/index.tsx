import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 100%;
`;

const Footer = styled.footer``;

export default function Home() {
  return (
    <Container>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </Container>
  );
}
