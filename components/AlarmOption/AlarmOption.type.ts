export interface IProps {
  timer: {
    isTimingNow: boolean;
    isEmptyClockDegree: boolean;
  };
  audio: {
    isAudioLoaded: boolean;
    playAudio: () => void;
  };
}
