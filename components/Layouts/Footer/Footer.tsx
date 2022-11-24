import styled from "@emotion/styled";

const Container = styled.footer`
  font-size: 12px;
  color: #a0a0a0;
  width: 100%;

  padding: 3em 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Footer() {
  return (
    <Container>
      <span>Copyright &copy; 2022 Sanghyeok Park. All rights reserved.</span>
    </Container>
  );
}
