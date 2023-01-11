import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loadAudios } from "../backend/loadAudios";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import Clock from "../components/Clock/Clock";
import Intro from "../components/Intro/Intro";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import FixedMenu from "../components/Menu/FixedMenu/FixedMenu";
import MobileMenu from "../components/Menu/MobileMenu/MobileMenu";
import Modal from "../components/Modal/Modal";
import Seo from "../components/SEO/Seo";
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

  overflow-y: hidden;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const setSoundEffectAudio = useSetRecoilState(soundEffectAudioAtom);
  const [isHideTimer, mediaSetted] = useMediaMatch(
    Theme.mediaQueries.hideTimerMaxWidth
  );

  useEffect(() => {
    loadAudios({
      onLoad: (audio) => {
        setSoundEffectAudio(audio);
      },
    });
  }, []);

  return (
    <>
      <Seo
        title="Time Timer | 타임 타이머"
        description="60분 온라인 타이머를 사용해서 최고의 집중을 만들어보세요."
      />
      <Container>
        <Header />
        <Main>
          <Clock />
          {mediaSetted && !isHideTimer ? <Timer /> : null}
        </Main>
        <Footer />
        {mediaSetted ? !isHideTimer ? <FixedMenu /> : <MobileMenu /> : null}
        <BottomSheet />
        <Modal />
        {!mediaSetted || showIntro ? (
          <Intro setShowIntro={setShowIntro} />
        ) : null}
      </Container>
    </>
  );
}
