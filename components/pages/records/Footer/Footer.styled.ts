import styled from "@emotion/styled";

export const Container = styled.footer`
  width: 99%;
  height: 240px;

  border-top: 2px solid ${({ theme }) => theme.background.secondary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .copyright {
    font-size: 12px;
    color: #a0a0a0;
  }

  .links {
    margin-top: 12px;
    display: flex;
    gap: 16px;

    a {
      display: flex;
      gap: 4px;
      align-items: center;

      color: #a0a0a0;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (min-width: 768px) {
    height: 360px;
  }
`;
