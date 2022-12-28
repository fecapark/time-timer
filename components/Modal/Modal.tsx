import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isModalActiveAtom, modalContentAtom } from "../../shared/atom";
import {
  Background,
  Container,
  ContentContainer,
  ContentHeader,
} from "./Modal.styled";

export default function Modal() {
  const [isModalActive, setIsModalActive] = useRecoilState(isModalActiveAtom);
  const modalContent = useRecoilValue(modalContentAtom);

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <Container active={isModalActive}>
      <Background active={isModalActive} onClick={closeModal} />
      <ContentContainer active={isModalActive}>
        <ContentHeader>
          <span>{modalContent?.title}</span>
        </ContentHeader>
        <div>{modalContent?.content}</div>
      </ContentContainer>
    </Container>
  );
}
