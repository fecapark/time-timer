import { useRecoilValue } from "recoil";
import { languageOptionValueAtom as LOV } from "../../../../shared/atom";
import useModal from "../../../../hooks/useModal";
import SupportingInfoModal from "../../../Modal/contents/SupportingInfoModal/SupportingInfoModal";
import PreviewSoundModal from "../../../Modal/contents/PreviewSoundModal/PreviewSoundModal";
import { SelectableItem } from "../../menu";
import { FadeContentAnimationCSS } from "../FixedMenu.styled";

export default function NotificationSectionContent() {
  const language = useRecoilValue(LOV);

  const setSupportModalActive = useModal({
    title:
      language === "kor"
        ? "백그라운드 푸쉬 알림 지원을 확인하세요"
        : "Check background push notification supports",
    content: <SupportingInfoModal notSupport={false} />,
  });
  const setPreviewSoundModalActive = useModal({
    title:
      language === "kor"
        ? "알람 소리를 미리 들어보세요"
        : "Preview alarm sound before start",
    content: <PreviewSoundModal />,
  });

  return (
    <div css={FadeContentAnimationCSS}>
      <SelectableItem
        content={
          language === "kor" ? "알람 소리 미리 듣기" : "Preview alarm sound"
        }
        onClick={() => {
          setPreviewSoundModalActive(true);
        }}
      />
      <SelectableItem
        content={
          language === "kor"
            ? "백그라운드 푸쉬 알림 지원"
            : "About push notification"
        }
        onClick={() => {
          setSupportModalActive(true);
        }}
      />
    </div>
  );
}
