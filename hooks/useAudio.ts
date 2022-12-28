import { useCallback, useEffect, useState } from "react";

interface IPermissionOption {
  autoplayWhenAccepted?: boolean;
}

interface IPlayOption {
  replay?: boolean;
}

const dummyAudioSrc =
  "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

export default function useAudio(
  src: string | undefined | null
): [
  (option?: IPermissionOption) => void,
  (option?: IPlayOption) => void,
  boolean
] {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const getPermission = useCallback(
    ({ autoplayWhenAccepted = false }: IPermissionOption = {}) => {
      if (!audio) return;
      if (isPlayable) return;
      if (!src || src === "") return;

      audio.onloadeddata = () => {
        audio.play();
      };

      audio.onended = () => {
        audio.src = src;
        audio.onloadeddata = () => {
          setIsPlayable(true);
          audio.onloadeddata = null;

          if (autoplayWhenAccepted) audio.play();
        };
        audio.onended = null;
      };

      audio.src = dummyAudioSrc;
    },
    [audio, isPlayable, src]
  );

  const play = useCallback(
    ({ replay = false }: IPlayOption = {}) => {
      if (!audio) return;
      if (!isPlayable) return;

      if (replay) audio.currentTime = 0;
      audio.play();
    },
    [audio, isPlayable]
  );

  return [getPermission, play, isPlayable];
}
