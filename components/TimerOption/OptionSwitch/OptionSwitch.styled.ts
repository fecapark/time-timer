import styled from "@emotion/styled";

export const OptionSwitchContainer = styled.div<{ isOn: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 12px;
    font-family: ${({ theme }) => theme.font.family.openSans};
    font-size: 13px;
    text-align: end;
    color: ${(props) => (props.isOn ? "white" : "grey")};
  }
`;

export const LoaderWrapper = styled.div`
  width: 50px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
