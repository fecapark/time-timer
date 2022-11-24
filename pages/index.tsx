import styled from "@emotion/styled";
import Clock from "../components/Clock/Clock";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import Timer from "../components/Timer/Timer";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export default function Home() {
  return (
    <Container>
      <Header />
      <Main>
        <Clock />
        <Timer />
      </Main>
      <Footer />
    </Container>
  );
}
