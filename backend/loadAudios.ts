import { IAudioData } from "../shared/types";
import { fbStorage } from "./firebaseConfig";
import { audioSrc } from "../shared/const";

interface ILoadAudios {
  onLoad: (audio: IAudioData) => void;
}

export function loadAudios({ onLoad }: ILoadAudios) {
  const fbStorageRef = fbStorage.ref();

  [audioSrc.audioFileName].forEach((aAudioFileName) => {
    fbStorageRef
      .child(`audio/${aAudioFileName}.wav`)
      .getDownloadURL()
      .then((url) => {
        onLoad({
          name: aAudioFileName,
          src: url,
          audio: new Audio(),
        });
      });
  });
}
