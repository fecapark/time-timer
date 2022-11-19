import styled from "@emotion/styled";
import Clock from "../components/Clock/Clock";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer``;

export default function Home() {
  return (
    <Container>
      <Header></Header>
      <Main>
        <Clock />
      </Main>
      <Footer></Footer>
    </Container>
  );
}
