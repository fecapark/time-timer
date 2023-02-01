import styled from "@emotion/styled";

export const Container = styled.div`
  font-size: 13px;
  color: #e0e0e0;

  p {
    margin-bottom: 0.5em;

    svg {
      font-size: 1.6em;
      vertical-align: middle;
    }
  }
`;

export const PreviewContentContainer = styled.div`
  margin-top: 42px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreviewIconWrapper = styled.div<{ loading: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${(props) => (props.loading ? "grey" : "white")};
  border-radius: 50%;

  font-size: 28px;
  padding: 0.8em;

  ${(props) =>
    props.loading
      ? `
      cursor: default;
    `
      : `
      cursor: pointer;
      &:hover {
        border-color: ${props.theme.background.hoverAccent};
        background-color: ${props.theme.background.hoverAccent};

        transition: 0.3s cubic-bezier(0.2, 0, 0, 1);
      }
`}

  transition: 0.25s cubic-bezier(0, 0, 0, 1);
`;
