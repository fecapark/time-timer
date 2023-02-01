import { MdHeadset } from "react-icons/md";
import { useRecoilValue } from "recoil";
import useAudio from "../../../../hooks/useAudio";
import {
  languageOptionValueAtom as LOV,
  soundEffectAudioAtom as SEA,
} from "../../../../shared/atom";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import {
  Container,
  PreviewContentContainer,
  PreviewIconWrapper,
} from "./PreviewSoundModal.styled";

export default function PreviewSoundModal() {
  const language = useRecoilValue(LOV);
  const soundEffectAudio = useRecoilValue(SEA);
  const [requestOnce, setRequestOnce] = useState(false);
  const [getAudioPermission, playAudio, isAudioPlayable] = useAudio(
    soundEffectAudio?.src
  );
  const loading = requestOnce && !isAudioPlayable;

  const playSoundEffect = () => {
    setRequestOnce(true);
    if (!isAudioPlayable) {
      getAudioPermission({ autoplayWhenAccepted: true });
      return;
    }
    playAudio({ replay: true });
  };

  return (
    <Container>
      <p>
        {language === "kor" ? (
          <>
            하단의 <MdHeadset /> 을 눌러 소리가 나오는지 확인하고, 기기의 음량을
            조절하세요.
          </>
        ) : (
          <>
            Press the <MdHeadset /> below to the sound works, and set the volume
            of the appliance.
          </>
        )}
      </p>
      <PreviewContentContainer>
        <PreviewIconWrapper loading={loading} onClick={playSoundEffect}>
          {loading ? (
            <RotatingLines strokeColor="grey" width="28" />
          ) : (
            <MdHeadset />
          )}
        </PreviewIconWrapper>
      </PreviewContentContainer>
    </Container>
  );
}
