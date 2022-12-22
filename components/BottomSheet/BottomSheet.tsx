import { useRef, PointerEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bottomSheetContentAtom as BSC,
  isBottomSheetActiveAtom as IBSA,
} from "../../shared/atom";
import { useState } from "react";
import {
  Background,
  Container,
  ContentContainer,
  ContentHeader,
} from "./BottomSheet.styled";

export default function BottomSheet() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [originOffset, setOriginOffset] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isBottomSheetActive, setIsBottomSheetActive] = useRecoilState(IBSA);
  const bottomSheetContent = useRecoilValue(BSC);

  const closeBottomSheet = () => {
    setIsBottomSheetActive(false);
  };

  const setContentTransformY = (value: string) => {
    if (!contentRef.current) return;

    requestAnimationFrame(() => {
      contentRef.current!.style.transform = `translate3d(0, ${value}, 0)`;
    });
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isPointerDown) return;

    const { clientY } = e.nativeEvent;
    const movement = Math.max(clientY - originOffset, 0);

    setIsSticky(movement < 50);
    setContentTransformY(`${movement}px`);
  };

  const onPointerDown = () => {
    if (!contentRef.current) return;
    contentRef.current!.style.transition = "none";

    const stageHeight = document.body.clientHeight;
    const { height } = contentRef.current.getBoundingClientRect();

    setIsPointerDown(true);
    setOriginOffset(stageHeight - height);
  };

  const onPointerEnd = () => {
    if (!contentRef.current) return;
    if (!isPointerDown) return;

    setIsPointerDown(false);

    contentRef.current!.style.transition = "";
    requestAnimationFrame(() => {
      setContentTransformY(isSticky ? "0" : "100%");
      contentRef.current!.ontransitionend = () => {
        if (!isSticky) setIsBottomSheetActive(false);
        initContentTransition();
      };
    });
  };

  const initContentTransition = () => {
    if (!contentRef.current) return;
    contentRef.current!.style.transform = "";
    contentRef.current!.ontransitionend = null;
  };

  return (
    <Container
      active={isBottomSheetActive}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    >
      <Background onClick={closeBottomSheet} />
      <ContentContainer ref={contentRef} active={isBottomSheetActive}>
        <ContentHeader onPointerDown={onPointerDown}>
          <div className="mover"></div>
        </ContentHeader>
        <div>{bottomSheetContent}</div>
      </ContentContainer>
    </Container>
  );
}
