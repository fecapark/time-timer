import styled from "@emotion/styled";
import RemixableHeader from "../components/Layouts/Header/RemixableHeader";

const Container = styled.div`
  width: 100%;
  padding: 2.5em 0;
`;

export default function Record() {
  return (
    <Container>
      <RemixableHeader title="Records" />
    </Container>
  );
}
