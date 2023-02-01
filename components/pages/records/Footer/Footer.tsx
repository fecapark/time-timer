import { MdOpenInNew } from "react-icons/md";
import { Logo } from "../../../Intro/Intro.styled";
import { Container } from "./Footer.styled";

export default function Footer() {
  return (
    <Container>
      <Logo
        size={14}
        hide={false}
        style={{ filter: "brightness(0.94)", flexDirection: "row" }}
      >
        <div className="word">Time</div>
        <div className="word bottom">Timer</div>
      </Logo>
      <span className="copyright">
        Copyright &copy; {new Date().getFullYear()} Sanghyeok Park. All rights
        reserved.
      </span>
      <div className="links">
        <a
          href="https://github.com/fecapark/time-timer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Github</span>
          <MdOpenInNew />
        </a>
        <a
          href="https://www.timetimer.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>About Time Timer</span>
          <MdOpenInNew />
        </a>
      </div>
    </Container>
  );
}
