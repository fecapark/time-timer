import styled from "@emotion/styled";

export const SupportItemContainer = styled.div<{ support?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    svg {
      font-size: 20px;
    }

    span {
      font-size: 12px;
      text-align: center;
    }
  }

  .status {
    margin-top: 16px;

    svg {
      font-size: 18px;
      color: ${(props) => (props.support ? "#b7f297" : "#db4544")};
    }
  }
`;
