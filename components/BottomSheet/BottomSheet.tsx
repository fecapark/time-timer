import { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bottomSheetContentAtom,
  isBottomSheetActiveAtom,
} from "../../shared/atom";
import { useState, useEffect } from "react";
import {
  Background,
  Container,
  ContentContainer,
  ContentHeader,
} from "./BottomSheet.styled";

let movement: number = 0;

export default function BottomSheet() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [originOffset, setOriginOffset] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isBottomSheetActive, setIsBottomSheetActive] = useRecoilState(
    isBottomSheetActiveAtom
  );
  const bottomSheetContent = useRecoilValue(bottomSheetContentAtom);

  const closeBottomSheet = () => {
    setIsBottomSheetActive(false);
  };

  const onMove = (e: React.MouseEvent) => {
    if (!contentRef.current) return;
    if (!isPointerDown) return;

    const { clientY } = e.nativeEvent;
    movement = Math.max(clientY - originOffset, 0);

    requestAnimationFrame(() => {
      contentRef.current!.style.transform = `translate3d(0, ${movement}px, 0)`;
    });
  };

  const onDown = () => {
    if (!contentRef.current) return;
    contentRef.current!.style.transition = "none";

    setIsPointerDown(true);
    setOriginOffset(
      document.body.clientHeight -
        contentRef.current.getBoundingClientRect().height
    );
  };

  const onEnd = () => {
    if (!contentRef.current) return;
    if (!isPointerDown) return;

    contentRef.current!.style.transition = "";

    requestAnimationFrame(() => {
      contentRef.current!.style.transform = `translate3d(0, 100%, 0)`;
      contentRef.current!.ontransitionend = () => {
        contentRef.current!.style.transform = "";
        contentRef.current!.ontransitionend = null;
        setIsBottomSheetActive(false);
      };
    });

    setIsPointerDown(false);
  };

  useEffect(() => {
    window.addEventListener("pointerup", onEnd);
    return () => {
      window.removeEventListener("pointerup", onEnd);
    };
  }, []);

  return (
    <Container
      active={isBottomSheetActive}
      onPointerMove={onMove}
      onPointerUp={onEnd}
    >
      <Background onClick={closeBottomSheet} />
      <ContentContainer ref={contentRef} active={isBottomSheetActive}>
        <ContentHeader onPointerDown={onDown}>
          <div className="mover"></div>
        </ContentHeader>
        <div>{bottomSheetContent}</div>
      </ContentContainer>
    </Container>
  );
}
