import { getDownloadURL, ref } from "firebase/storage";
import { fbStorage } from "./firebaseConfig";

interface ILoadAudios {
  onAllLoad: (audios: Record<string, HTMLAudioElement>) => void;
}

const audioFileNames = [
  "attention-bell",
  // "achievement-bell"
];

export function loadAudios({ onAllLoad }: ILoadAudios) {
  function isAllLoaded() {
    return Object.keys(loadedAudios).length >= audioFileNames.length;
  }

  const loadedAudios: Record<string, HTMLAudioElement> = {};

  audioFileNames.forEach((aAudioFileName) => {
    getDownloadURL(ref(fbStorage, `audio/${aAudioFileName}.wav`)).then(
      (url) => {
        const audio = new Audio();
        audio.src = url;
        audio.onloadeddata = () => {
          loadedAudios[aAudioFileName] = audio;
          if (isAllLoaded()) onAllLoad(loadedAudios);
        };
      }
    );
  });
}
