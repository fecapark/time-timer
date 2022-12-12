import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isModalActiveAtom, modalContentAtom } from "../../shared/atom";

const Container = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.active ? "1" : "0")};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #00000077;
`;

const ContentContainer = styled.div<{ active: boolean }>`
  width: 500px;
  background-color: white;

  z-index: 100;
  background-color: #212124;

  padding: 48px 32px;
  border-radius: 24px;

  opacity: ${(props) => (props.active ? "1" : "0")};
  transform: scale(${(props) => (props.active ? "1" : "1.1")});
  transition: 0.25s cubic-bezier(0.2, 0, 0, 1);
`;

const ContentHeader = styled.div`
  width: 100%;
  text-align: start;

  margin-bottom: 18px;

  span {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15px;
  }
`;

export default function Modal() {
  const [isModalActive, setIsModalActive] = useRecoilState(isModalActiveAtom);
  const modalContent = useRecoilValue(modalContentAtom);

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <Container active={isModalActive}>
      <Background onClick={closeModal} />
      <ContentContainer active={isModalActive}>
        <ContentHeader>
          <span>{modalContent?.title}</span>
        </ContentHeader>
        <div>{modalContent?.content}</div>
      </ContentContainer>
    </Container>
  );
}
