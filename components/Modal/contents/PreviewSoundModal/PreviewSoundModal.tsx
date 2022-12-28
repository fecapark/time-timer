import styled from "@emotion/styled";
import { MdHeadset } from "react-icons/md";
import { useRecoilValue } from "recoil";
import useAudio from "../../../../hooks/useAudio";
import {
  languageOptionValueAtom as LOV,
  soundEffectAudioAtom as SEA,
} from "../../../../shared/atom";

const Container = styled.div`
  font-size: 13px;
  color: #e0e0e0;

  p {
    margin-bottom: 0.5em;

    svg {
      font-size: 1.6em;
      vertical-align: middle;
    }
  }
`;

const PreviewContentContainer = styled.div`
  margin-top: 42px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewIconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid white;
  border-radius: 50%;

  font-size: 28px;
  padding: 0.8em;

  &:hover {
    border-color: ${({ theme }) => theme.background.hoverAccent};
    background-color: ${({ theme }) => theme.background.hoverAccent};

    transition: 0.3s cubic-bezier(0.2, 0, 0, 1);
  }

  transition: 0.25s cubic-bezier(0, 0, 0, 1);
`;

export default function PreviewSoundModal() {
  const language = useRecoilValue(LOV);
  const soundEffectAudio = useRecoilValue(SEA);
  const [getAudioPermission, playAudio, isAudioPlayable] = useAudio(
    soundEffectAudio?.src
  );

  const playSoundEffect = () => {
    if (!isAudioPlayable) {
      getAudioPermission({ autoplayWhenAccepted: true });
      return;
    }
    playAudio();
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
        <PreviewIconWrapper onClick={playSoundEffect}>
          <MdHeadset />
        </PreviewIconWrapper>
      </PreviewContentContainer>
    </Container>
  );
}
