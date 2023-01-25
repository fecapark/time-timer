import { useEffect, useRef, useState } from "react";
import { IntroContainer, Logo } from "./Intro.styled";
import { useRecoilState } from "recoil";
import { isIntroTimeoutedAtom as IIT } from "../../shared/atom";
import useMediaMatch from "../../hooks/useMediaMatch";

export default function Intro() {
  const logoRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [hideLogo, setHideLogo] = useState(false);
  const [hideWhole, setHideWhole] = useState(false);
  const [isIntroTimeouted, setIsIntroTimeouted] = useRecoilState(IIT);
  const [_, mediaSetted] = useMediaMatch("");

  const checkIntroedOnce = () => isIntroTimeouted;

  useEffect(() => {
    if (!logoRef.current) return;
    if (!introRef.current) return;
    if (checkIntroedOnce()) return;

    setTimeout(() => {
      if (!logoRef.current) return;

      setHideLogo(true);
      logoRef.current!.ontransitionend = () => {
        setTimeout(() => {
          if (!introRef.current) return;

          setHideWhole(true);
          introRef.current!.ontransitionend = () => {
            setIsIntroTimeouted(true);
            introRef.current!.ontransitionend = null;
          };
        }, 500);
        introRef.current!.ontransitionend = null;
      };
    }, 1500);
  }, [logoRef.current, introRef.current]);

  return isIntroTimeouted && mediaSetted ? null : (
    <IntroContainer ref={introRef} hide={hideWhole}>
      <Logo hide={hideLogo} ref={logoRef}>
        <div className="word">Time</div>
        <div className="word bottom">Timer</div>
      </Logo>
    </IntroContainer>
  );
}
