import { useRef, PointerEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bottomSheetContentConstructorAtom as BSCC,
  isBottomSheetActiveAtom as IBSA,
} from "../../shared/atom";
import { useState } from "react";
import {
  Background,
  Container,
  ContentContainer,
  ContentHeader,
  ContentWrapper,
} from "./BottomSheet.styled";
import useMediaMatch from "../../hooks/useMediaMatch";
import { Theme } from "../../styles/theme";

export default function BottomSheet() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hideContent, setHideContent] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [pointerDownOffset, setPointerDownOffset] = useState(0);
  const [originOffset, setOriginOffset] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isBottomSheetActive, setIsBottomSheetActive] = useRecoilState(IBSA);
  const BottomSheetContentConstructor = useRecoilValue(BSCC);
  const [isHideTimer, _] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

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
    const movement = Math.max(clientY - originOffset - pointerDownOffset, 0);

    setIsSticky(movement < 50);
    setContentTransformY(`${movement}px`);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!contentRef.current) return;
    contentRef.current.style.transition = "none";

    const { clientY } = e.nativeEvent;
    const { height } = contentRef.current.getBoundingClientRect();
    const stageHeight = document.body.clientHeight;
    const originOffset = stageHeight - height;

    setIsPointerDown(true);
    setOriginOffset(originOffset);
    setPointerDownOffset(clientY - originOffset);
  };

  const onPointerEnd = () => {
    if (!isPointerDown) return;

    setIsPointerDown(false);
    hideThisWithTransition();
  };

  const hideThisWithTransition = () => {
    if (!contentRef.current) return;

    contentRef.current!.style.transition = "";

    requestAnimationFrame(() => {
      contentRef.current!.style.transform = "";
      if (isSticky) setIsSticky(false);
      else closeBottomSheet();
    });
  };

  useEffect(() => {
    if (!contentRef.current) return;
    if (isHideTimer) return;

    closeBottomSheet();
  }, [isHideTimer, contentRef.current]);

  return (
    <Container
      active={isBottomSheetActive}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    >
      <Background active={isBottomSheetActive} onClick={closeBottomSheet} />
      <ContentContainer ref={contentRef} active={isBottomSheetActive}>
        <ContentHeader onPointerDown={onPointerDown}>
          <div className="mover"></div>
        </ContentHeader>
        <ContentWrapper active={isBottomSheetActive}>
          <BottomSheetContentConstructor
            hideBottomSheet={hideThisWithTransition}
          />
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
}
