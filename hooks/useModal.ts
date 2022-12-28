import { useSetRecoilState } from "recoil";
import { isModalActiveAtom, modalContentAtom } from "../shared/atom";
import { IModalContentPayload } from "../shared/types";

export default function useModal(payload: IModalContentPayload) {
  const setIsModalActive = useSetRecoilState(isModalActiveAtom);
  const setModalContent = useSetRecoilState(modalContentAtom);

  const setThisModal = (state: boolean) => {
    setIsModalActive(state);
    setModalContent(payload);
  };

  return setThisModal;
}
