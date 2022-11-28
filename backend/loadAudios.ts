import { getDownloadURL, ref } from "firebase/storage";
import { fbStorage } from "./firebaseConfig";

interface ILoadAudios {
  onAllLoad: (audios: Array<HTMLAudioElement>) => void;
}

const audioFileNames = ["attention-bell.wav", "achievement-bell.wav"];

export function loadAudios({ onAllLoad }: ILoadAudios) {
  function isAllLoaded() {
    return loadedAudios.length >= audioFileNames.length;
  }

  const loadedAudios: Array<HTMLAudioElement> = [];

  audioFileNames.forEach((aAudioFileName) => {
    getDownloadURL(ref(fbStorage, `audio/${aAudioFileName}`)).then((url) => {
      const audio = new Audio();
      audio.src = url;
      audio.onloadeddata = () => {
        loadedAudios.push(audio);
        if (isAllLoaded()) onAllLoad(loadedAudios);
      };
    });
  });
}
