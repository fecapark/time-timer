import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IntroContainer, Logo } from "./Intro.styled";

export default function Intro({
  setIntroTimeouted,
}: {
  setIntroTimeouted: Dispatch<SetStateAction<boolean>>;
}) {
  const logoRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [hideLogo, setHideLogo] = useState(false);
  const [hideWhole, setHideWhole] = useState(false);

  useEffect(() => {
    if (!logoRef.current) return;
    if (!introRef.current) return;

    setTimeout(() => {
      if (!logoRef.current) return;

      setHideLogo(true);
      logoRef.current!.ontransitionend = () => {
        setTimeout(() => {
          if (!introRef.current) return;

          setHideWhole(true);
          introRef.current!.ontransitionend = () => {
            setIntroTimeouted(true);
            introRef.current!.ontransitionend = null;
          };
        }, 500);
        introRef.current!.ontransitionend = null;
      };
    }, 1500);
  }, [logoRef.current, introRef.current]);

  return (
    <IntroContainer ref={introRef} hide={hideWhole}>
      <Logo hide={hideLogo} ref={logoRef}>
        <div className="word">Time</div>
        <div className="word bottom">Timer</div>
      </Logo>
    </IntroContainer>
  );
}
