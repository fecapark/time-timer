import styled from "@emotion/styled";

export const Container = styled.div`
  font-size: 13px;
  color: #e0e0e0;
`;

export const SupportContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const SupportTitle = styled.div`
  margin-top: 48px;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
`;

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
