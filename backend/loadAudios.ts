import { IAudioData } from "../shared/types";
import { fbStorage } from "./firebaseConfig";
import { audioFileName } from "../shared/const";

interface ILoadAudios {
  onLoad: (audio: IAudioData) => void;
}

export function loadAudios({ onLoad }: ILoadAudios) {
  const fbStorageRef = fbStorage.ref();

  [audioFileName].forEach((aAudioFileName) => {
    fbStorageRef
      .child(`audio/${aAudioFileName}.wav`)
      .getDownloadURL()
      .then((url) => {
        onLoad({
          name: aAudioFileName,
          src: url,
        });
      });
  });
}
