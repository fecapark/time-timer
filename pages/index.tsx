import styled from "@emotion/styled";
import Clock from "../components/Clock/Clock";
import Timer from "../components/Timer/Timer";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  font-size: 18px;
  padding: 2em 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    display: flex;
    gap: 2px;

    font-family: "Raleway", sans-serif;
    font-weight: 600;
    letter-spacing: 0.3px;

    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;

    cursor: default;

    .word {
      padding: 3px 6px;
      line-height: 1em;

      &.right {
        background-color: white;
        color: #212121;
      }
    }
  }
`;

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
      <Header>
        <div className="logo">
          <div className="left word">Time</div>
          <div className="right word">Timer</div>
        </div>
      </Header>
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
