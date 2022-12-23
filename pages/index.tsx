import styled from "@emotion/styled";
import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSetRecoilState } from "recoil";
import { loadAudios } from "../backend/loadAudios";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import Clock from "../components/Clock/Clock";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import Modal from "../components/Modal/Modal";
import Timer from "../components/Timer/Timer";
import useMediaMatch from "../hooks/useMediaMatch";
import { soundEffectAudioAtom } from "../shared/atom";
import { Theme } from "../styles/theme";

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2.5em 0;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const IntroContainer = styled.div<{ hide: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background.primary};

  opacity: ${(props) => (props.hide ? "0" : "1")};
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  transition: 0.4s cubic-bezier(0.2, 0, 0, 1);
`;

const Logo = styled.div<{ hide: boolean }>`
  ${({ theme }) => theme.shareCSS.noDrag};
  font-size: 18px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.11em;

  font-family: "Raleway", sans-serif;
  font-weight: 600;
  letter-spacing: 0.3px;

  .word {
    padding: 0.16em 0.33em;

    &.bottom {
      background-color: white;
      color: #212121;
    }
  }

  opacity: ${(props) => (props.hide ? "0" : "1")};
  visibility: ${(props) => (props.hide ? "hidden" : "visible")};
  transition: 0.22s ease;
`;

function Intro({
  setShowIntro,
}: {
  setShowIntro: Dispatch<SetStateAction<boolean>>;
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
            setShowIntro(false);
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

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const setSoundEffectAudio = useSetRecoilState(soundEffectAudioAtom);
  const [isHideTimer, mediaSetted] = useMediaMatch(
    `screen and (max-width: ${Theme.responsiveSizes.hideTimer}px)`
  );

  useEffect(() => {
    loadAudios({
      onLoad: (audio) => {
        setSoundEffectAudio(audio);
      },
    });
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Clock />
        {mediaSetted && !isHideTimer ? <Timer /> : null}
      </Main>
      <Footer />
      <BottomSheet />
      <Modal />
      {!mediaSetted || showIntro ? <Intro setShowIntro={setShowIntro} /> : null}
    </Container>
  );
}
