import {
  FaFirefoxBrowser,
  FaEdge,
  FaSafari,
  FaInternetExplorer,
  FaApple,
} from "react-icons/fa";
import { SiGooglechrome } from "react-icons/si";
import {
  Container,
  SupportTitle,
  SupportContainer,
} from "./SupportingInfoModal.styled";
import { ISupportModalProps } from "./SupportingInfoModal.type";
import { useRecoilValue } from "recoil";
import { languageOptionValueAtom as LOV } from "../../../../shared/atom";
import SupportItem from "./SupportItem/SupportItem";

export default function SupportingInfoModal({
  notSupport = true,
}: ISupportModalProps) {
  const language = useRecoilValue(LOV);

  return (
    <Container>
      <div>
        <p>
          {notSupport
            ? language === "kor"
              ? "현재 사용중이신 브라우저는 백그라운드 푸쉬 알림을 지원하지 않습니다."
              : "Your browser does not support background push notification."
            : language === "kor"
            ? "일부 브라우저 및 환경에서는 백그라운드 푸쉬 알림을 지원하지 않습니다."
            : "Background push notifications are not supported in some browsers and environments."}
        </p>
        <p>
          {language === "kor"
            ? "하단의 지원 항목을 참고해주세요."
            : "Please refer to the support items below."}
        </p>
      </div>
      <div>
        <SupportTitle>
          {language === "kor" ? "데스크탑 지원" : "Desktop"}
        </SupportTitle>
        <SupportContainer>
          <SupportItem name="Firefox" icon={<FaFirefoxBrowser />} />
          <SupportItem name="Edge" icon={<FaEdge />} />
          <SupportItem name="Chrome" icon={<SiGooglechrome />} />
          <SupportItem name="Safari" icon={<FaSafari />} />
          <SupportItem
            name="IE"
            icon={<FaInternetExplorer />}
            support={false}
          />
        </SupportContainer>
      </div>
      <div>
        <SupportTitle>
          {language === "kor" ? "모바일 지원" : "Mobile"}
        </SupportTitle>
        <SupportContainer>
          <SupportItem
            name="Firefox"
            icon={<FaFirefoxBrowser />}
            support={false}
          />
          <SupportItem name="Edge" icon={<FaEdge />} support={false} />
          <SupportItem name="Chrome" icon={<SiGooglechrome />} />
          <SupportItem name="IOS Browsers" icon={<FaApple />} support={false} />
        </SupportContainer>
      </div>
    </Container>
  );
}
