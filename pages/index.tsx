import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getMessagingToken } from "../backend/getMessagingToken";
import { loadAudios } from "../backend/loadAudios";
import Clock from "../components/Clock/Clock";
import Footer from "../components/Layouts/Footer/Footer";
import Header from "../components/Layouts/Header/Header";
import Timer from "../components/Timer/Timer";
import {
  isNotificationPermissionGranted,
  isNotificationSupportEnvironmentAtom,
  soundEffectAudiosAtom,
  soundEffectLoadedAtom,
} from "../shared/atom";

import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from "../backend/firebaseConfig";

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
  const setIsNotificationSupportEnvironment = useSetRecoilState(
    isNotificationSupportEnvironmentAtom
  );
  const setIsNotificationPermissionGranted = useSetRecoilState(
    isNotificationPermissionGranted
  );

  useEffect(() => {
    function isClientSupportNotification() {
      return (
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window
      );
    }

    async function requestNotificationPermission() {
      const permission = await Notification.requestPermission();
      setIsNotificationPermissionGranted(permission === "granted");
    }

    if (!isClientSupportNotification())
      setIsNotificationSupportEnvironment(false);
    else requestNotificationPermission();
  }, []);

  useEffect(() => {
    loadAudios({
      onAllLoad: (audios) => {
        setSoundEffectLoaded(true);
        setSoundEffectAudios(audios);
      },
    });
  }, []);

  useEffect(() => {
    async function getToken() {
      const messaging = firebase.messaging();
      const token = await messaging.getToken({
        vapidKey: process.env.NEXT_PUBLIC_FB_MESSAGING_KEY,
      });
    }

    getToken();
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
