import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loadAudios } from "../backend/loadAudios";
import Clock from "../components/Clock/Clock";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import Modal from "../components/Modal/Modal";
import Timer from "../components/Timer/Timer";
import useMediaMatch from "../hooks/useMediaMatch";
import { soundEffectAudioAtom } from "../shared/atom";
import { Theme } from "../styles/theme";

const Container = styled.div`
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

export default function Home() {
  const setSoundEffectAudio = useSetRecoilState(soundEffectAudioAtom);
  const isHideTimer = useMediaMatch(
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
        {isHideTimer ? null : <Timer />}
      </Main>
      <Footer />
      <Modal />
    </Container>
  );
}
