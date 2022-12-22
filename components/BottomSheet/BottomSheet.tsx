import styled from "@emotion/styled";
import { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bottomSheetContentAtom,
  isBottomSheetActiveAtom,
} from "../../shared/atom";
import { useState, useEffect } from "react";
import { Vector2 } from "../../utils/vector";

const Container = styled.div<{ active: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.active ? "1" : "0")};
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
`;

const Background = styled.div`
  width: 100%;
  height: 100%;

  background-color: #00000077;
`;

const ContentContainer = styled.div<{ active: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 300px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  z-index: 100;
  background-color: #212124;

  transform: translate3d(0, ${(props) => (props.active ? "0" : "100%")}, 0);
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
`;

const ContentHeader = styled.div`
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  width: 100%;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  .mover {
    width: 30px;
    height: 4px;

    border-radius: 1000px;
    background-color: #626264;
  }
`;

let originOffset: number = 0;
let movement: number = 0;

export default function BottomSheet() {
  const contentRef = useRef<HTMLDivElement>(null);

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

    originOffset =
      document.body.clientHeight -
      contentRef.current.getBoundingClientRect().height;

    contentRef.current!.style.transition = "none";

    setIsPointerDown(true);
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
