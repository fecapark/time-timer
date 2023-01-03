import styled from "@emotion/styled";
import { MdHeadset } from "react-icons/md";
import { useRecoilValue } from "recoil";
import useAudio from "../../../../hooks/useAudio";
import {
  languageOptionValueAtom as LOV,
  soundEffectAudioAtom as SEA,
} from "../../../../shared/atom";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

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

const PreviewIconWrapper = styled.div<{ loading: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid ${(props) => (props.loading ? "grey" : "white")};
  border-radius: 50%;

  font-size: 28px;
  padding: 0.8em;

  ${(props) =>
    props.loading
      ? `
        cursor: default;
      `
      : `
        cursor: pointer;
        &:hover {
          border-color: ${props.theme.background.hoverAccent};
          background-color: ${props.theme.background.hoverAccent};

          transition: 0.3s cubic-bezier(0.2, 0, 0, 1);
        }
  `}

  transition: 0.25s cubic-bezier(0, 0, 0, 1);
`;

export default function PreviewSoundModal() {
  const [requestOnce, setRequestOnce] = useState(false);
  const language = useRecoilValue(LOV);
  const soundEffectAudio = useRecoilValue(SEA);
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
