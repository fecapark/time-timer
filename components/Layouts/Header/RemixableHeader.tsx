import { Container } from "./RemixableHeader.style";

interface IRemixableHeaderProps {
  title: string;
}

export default function RemixableHeader({ title }: IRemixableHeaderProps) {
  return (
    <Container>
      <div className="logo">
        <div className="left word">Time</div>
        <div className="right word">{title}</div>
      </div>
    </Container>
  );
}
