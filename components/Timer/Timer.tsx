import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clockDegreeAtom,
  isClockPointerDownAtom,
  isNotificationPermissionGrantedAtom,
  isNotificationSupportEnvironmentAtom,
  isTimingNowAtom,
  soundEffectAudioAtom,
} from "../../shared/atom";
import { audioSrc } from "../../shared/const";
import Switch from "../Switch/Switch";
import {
  Container,
  OptionSwitchContainer,
  OptionSwitchRow,
  TimerButtonContainer,
  TimeText,
} from "./Timer.styled";
import { getTimeFromDegree, requestNotificationPermission } from "./Timer.util";
import { getMessagingToken } from "../../backend/getMessagingToken";
import "firebase/messaging";

let timerInterval: NodeJS.Timer | null = null;
let audio: HTMLAudioElement | null = null;
let realAudioSrc: string | null = null;

/*
  1. 여기서 오디오하고 푸쉬메시지 하는거 그거 따로 떼내야함

  hooks?로 떼네는게 제일 베스트일듯

  그리고
  2. Option container 이거 하나 컴포넌트로 추출하는게 나을듯 함
*/

export default function Timer() {
  const [pushToken, setPushToken] = useState("");
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useState(false);
  const [isSendPushNotificationOn, setIsSendPushNotificationOn] =
    useState(false);
  const [isTimingNow, setIsTimingNow] = useRecoilState(isTimingNowAtom);
  const [clockDegree, setClockDegree] = useRecoilState(clockDegreeAtom);
  const [
    isNotificationSupportEnvironment,
    setIsNotificationSupportEnvironment,
  ] = useRecoilState(isNotificationSupportEnvironmentAtom);
  const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] =
    useRecoilState(isNotificationPermissionGrantedAtom);
  const isClockPointerDown = useRecoilValue(isClockPointerDownAtom);
  const soundEffectAudio = useRecoilValue(soundEffectAudioAtom);
  const isEmptyClockDegree = clockDegree >= 360;

  const startTimer = () => {
    const getNextDegree = (prevDegree: number, elapsedTime: number) => {
      const result = prevDegree + elapsedTime / 10;
      const degreeOvered = result > 360;

      if (degreeOvered && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }

      return Math.min(360, result);
    };

    const onInterval = () => {
      const curTime = new Date().getTime();
      const elapsed = (curTime - prevTime) / 1000;
      setClockDegree((prevDegree) => getNextDegree(prevDegree, elapsed));
      prevTime = curTime;
    };

    setIsTimingNow((prev) => !prev);

    if (audio && audio.src === "") {
      audio.src = audioSrc.dummyAudioSrc;
      audio.play();

      audio.onended = () => {
        audio!.src = realAudioSrc!;
        audio!.onended = null;
      };
    }

    let prevTime = new Date().getTime();
    timerInterval = setInterval(onInterval, 1000);
  };

  const pauseTimer = () => {
    if (!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval = null;
    setIsTimingNow(false);
  };

  useEffect(() => {
    if (audio) return;
    if (!soundEffectAudio) return;
    audio = soundEffectAudio.audio;
    realAudioSrc = soundEffectAudio.src;
  }, [soundEffectAudio]);

  useEffect(() => {
    const isTimingEnd = !isClockPointerDown && isEmptyClockDegree;
    const canPlayAudio = audio && isAlarmSoundOn;

    if (!isTimingEnd) return;
    if (isEmptyClockDegree && canPlayAudio) {
      audio!.play();
    }

    sendPushMessage();
    setIsTimingNow(false);
  }, [clockDegree, isClockPointerDown, pushToken]);

  const sendPushMessage = useCallback(() => {
    if (pushToken === "") return;
    if (!isNotificationPermissionGranted) return;
    if (!isNotificationSupportEnvironment) return;

    const NOTIFICATION_CONTENT = {
      title: "설정한 시간이 종료되었습니다.",
      body: "잠시 쉬었다 다시 시작해볼까요?",
    };

    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          process.env.NEXT_PUBLIC_FB_MESSAGING_REST_AUTH_HEADER ?? "",
      },
      body: JSON.stringify({
        to: pushToken,
        notification: NOTIFICATION_CONTENT,
      }),
    });
  }, [
    pushToken,
    isNotificationPermissionGranted,
    isNotificationSupportEnvironment,
  ]);

  return (
    <Container>
      <TimerButtonContainer triggerHide={!isTimingNow}>
        <button disabled={!isTimingNow} onClick={pauseTimer}>
          일시정지
        </button>
      </TimerButtonContainer>
      <TimerButtonContainer triggerHide={isClockPointerDown || isTimingNow}>
        <button disabled={isEmptyClockDegree} onClick={startTimer}>
          {isEmptyClockDegree ? "시간을 설정해주세요" : "집중 시작하기"}
        </button>
      </TimerButtonContainer>
      <OptionSwitchContainer triggerHide={isClockPointerDown || isTimingNow}>
        <OptionSwitchRow isOn={isAlarmSoundOn}>
          <span>종료시 알람 소리 켜기</span>
          <Switch
            defaultState="off"
            onOn={() => {
              setIsAlarmSoundOn(true);
            }}
            onOff={() => {
              setIsAlarmSoundOn(false);
            }}
          />
        </OptionSwitchRow>
        <OptionSwitchRow isOn={isSendPushNotificationOn}>
          <span>종료시 푸쉬 알림 켜기</span>
          <Switch
            defaultState="off"
            onOn={async (setSwitchState) => {
              const requestPermissionResult =
                await requestNotificationPermission()!;

              if (requestPermissionResult === "granted") {
                setIsNotificationPermissionGranted(true);
                const token = await getMessagingToken();
                setPushToken(token);
              } else if (requestPermissionResult === "denied") {
                setSwitchState("off");
              } else {
                setIsNotificationSupportEnvironment(false);
                setSwitchState("off");
              }
            }}
            onOff={() => {
              setIsSendPushNotificationOn(false);
            }}
          />
        </OptionSwitchRow>
      </OptionSwitchContainer>
      <TimeText triggerZoom={isClockPointerDown || isTimingNow}>
        <div className="row">
          <span className="min">{getTimeFromDegree(clockDegree).min}</span>
        </div>
        <div className="row">
          <span className="sec">{getTimeFromDegree(clockDegree).sec}</span>
        </div>
      </TimeText>
    </Container>
  );
}
