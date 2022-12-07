import { useEffect, useState } from "react";

const dummyAudioSrc =
  "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

export default function useAudio(
  src: string | undefined | null
): [boolean, () => void, () => void] {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlayable, setIsPlayable] = useState(false);

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  const getPermission = () => {
    if (!audio) return;
    if (isPlayable) return;
    if (!src || src === "") return;

    audio.onended = () => {
      audio.src = src;
      audio.onended = null;

      setIsPlayable(true);
    };

    audio.src = dummyAudioSrc;
    audio.play();
  };

  const play = () => {
    if (!audio) return;
    if (!isPlayable) return;
    audio.play();
  };

  return [isPlayable, getPermission, play];
}
