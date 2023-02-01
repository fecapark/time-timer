import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;

  .grid-date-info {
    width: 40px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 28px;
    padding-left: 8px;

    font-size: 11px;
  }
`;

export const ContentContainer = styled.div`
  width: calc(100% - 40px);

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  font-family: ${({ theme }) => theme.font.family.primary};

  .grid-timeline-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    font-size: 11px;
    margin-bottom: 0.5em;
  }
`;

export const GrassGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 10px;
  grid-template-rows: repeat(7, 10px);
  gap: 4px;
  justify-content: flex-end;

  width: 100%;

  overflow-x: hidden;
`;
