import { useRecoilState, useRecoilValue } from "recoil";
import OptionSwitch from "../OptionSwitch/OptionSwitch";
import {
  languageOptionValueAtom as LOV,
  isAlarmSoundOnAtom as IASO,
  clockDegreeAtom as CD,
  isTimingNowAtom as ITN,
  soundEffectAudioAtom as SEA,
} from "../../../shared/atom";
import useAudio from "../../../hooks/useAudio";
import { useEffect } from "react";

export default function AlarmSwitch() {
  const language = useRecoilValue(LOV);
  const isTimingNow = useRecoilValue(ITN);
  const clockDegree = useRecoilValue(CD);
  const soundEffectAudio = useRecoilValue(SEA);
  const [isAlarmSoundOn, setIsAlarmSoundOn] = useRecoilState(IASO);
  const [getAudioPermission, playAudio] = useAudio(soundEffectAudio?.src);
  const isEmptyClockDegree = clockDegree >= 360;

  const onSoundAlarmOn = () => {
    getAudioPermission();
    setIsAlarmSoundOn(true);
  };

  const onSoundAlarmOff = () => {
    setIsAlarmSoundOn(false);
  };

  const playWrapper = () => {
    if (!isAlarmSoundOn) return;
    playAudio();
  };

  useEffect(() => {
    if (isTimingNow) return;
    if (!isEmptyClockDegree) return;
    playWrapper();
  }, [isTimingNow, isEmptyClockDegree]);

  return (
    <OptionSwitch
      text={
        language === "kor" ? "종료시 알람 소리 켜기" : "Activate alarm sound"
      }
      isActive={isAlarmSoundOn}
      isLoading={soundEffectAudio === null}
      onSwitchOn={onSoundAlarmOn}
      onSwitchOff={onSoundAlarmOff}
    />
  );
}
