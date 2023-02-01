import styled from "@emotion/styled";

export const Container = styled.div<{
  borderColor: string;
  show?: boolean;
  scrolled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 18px;

  border-left: 4px solid ${(props) => props.borderColor};
  padding-left: 32px;

  opacity: ${(props) => (props.show ? "1" : "0")};
  transform: translate3d(0, ${(props) => (props.show ? "0" : "80px")}, 0);

  transition: 0.45s cubic-bezier(0.2, 0, 0, 1);
  transition-delay: ${(props) => (props.scrolled ? "0s" : "0.65s")};

  @media screen and (max-width: 800px) {
    padding-left: 24px;
  }
`;

Container.defaultProps = {
  show: true,
  scrolled: false,
};
