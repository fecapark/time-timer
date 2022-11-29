import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getMessagingToken } from "../backend/getMessagingToken";
import { loadAudios } from "../backend/loadAudios";
import Clock from "../components/Clock/Clock";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import Timer from "../components/Timer/Timer";
import { soundEffectAudiosAtom, soundEffectLoadedAtom } from "../shared/atom";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

export default function Home() {
  const setSoundEffectLoaded = useSetRecoilState(soundEffectLoadedAtom);
  const setSoundEffectAudios = useSetRecoilState(soundEffectAudiosAtom);

  useEffect(() => {
    console.log("start get audios from firebase storage");

    loadAudios({
      onAllLoad: (audios) => {
        setSoundEffectLoaded(true);
        setSoundEffectAudios(audios);

        console.log("audio src: ", Object.values(audios)[0].src);
      },
    });
  }, []);

  useEffect(() => {
    async function token() {
      console.log("#0 Is token async function executed?");
      const tk = await getMessagingToken();
      console.log("messaging token: ", tk);
    }

    console.log("start get messaging token effect");
    token();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <Clock />
        <Timer />
      </Main>
      <Footer />
    </Container>
  );
}
