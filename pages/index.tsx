import styled from "@emotion/styled";
import Clock from "../components/Clock/Clock";
import Timer from "../components/Timer/Timer";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Footer = styled.footer`
  font-size: 12px;
  color: #a0a0a0;
  width: 100%;

  padding: 3em 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <Container>
      <Header></Header>
      <Main>
        <Clock />
        <Timer />
      </Main>
      <Footer>
        <span>Copyright &copy; 2022 Sanghyeok Park. All rights reserved.</span>
      </Footer>
    </Container>
  );
}
