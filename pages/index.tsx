import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loadAudios } from "../backend/loadAudios";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import Clock from "../components/Clock/Clock";
import Footer from "../components/pages/index/Footer/Footer";
import FixedMenu from "../components/Menu/FixedMenu/FixedMenu";
import MobileMenu from "../components/Menu/MobileMenu/MobileMenu";
import Modal from "../components/Modal/Modal";
import Seo from "../components/SEO/Seo";
import Timer from "../components/Timer/Timer";
import useMediaMatch from "../hooks/useMediaMatch";
import { soundEffectAudioAtom } from "../shared/atom";
import { Theme } from "../styles/theme";
import Header from "../components/pages/index/Header/Header";
import { Container, Main } from "../components/pages/index/index.styled";

export default function Home() {
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
      </Container>
    </>
  );
}
