import styled from "@emotion/styled";
import {
  FaFirefoxBrowser,
  FaEdge,
  FaSafari,
  FaInternetExplorer,
  FaApple,
} from "react-icons/fa";
import { SiGooglechrome } from "react-icons/si";
import { MdCheck, MdClose } from "react-icons/md";

const Container = styled.div`
  font-size: 13px;
  color: #e0e0e0;
`;

const SupportContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const SupportTitle = styled.div`
  margin-top: 48px;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
`;

const SupportItemContainer = styled.div<{ support?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    svg {
      font-size: 20px;
    }

    span {
      font-size: 12px;
    }
  }

  .status {
    margin-top: 12px;

    svg {
      font-size: 18px;
      color: ${(props) => (props.support ? "#b7f297" : "#db4544")};
    }
  }
`;

interface ISupportItemProp {
  name: string;
  icon: JSX.Element;
  support?: boolean;
}

function SupportItem({ name, icon, support = true }: ISupportItemProp) {
  return (
    <SupportItemContainer support={support}>
      <div className="icon-wrapper">
        {icon}
        <span>{name}</span>
      </div>
      <div className="status">{support ? <MdCheck /> : <MdClose />}</div>
    </SupportItemContainer>
  );
}

export default function NotSupportedInfoModal() {
  return (
    <Container>
      <span>
        현재 사용중이신 브라우저는 백그라운드 푸쉬 알림을 지원하지 않습니다.
      </span>
      <br />
      <span>하단의 지원 항목을 참고해주세요.</span>
      <SupportTitle>데스크탑 지원</SupportTitle>
      <SupportContainer>
        <SupportItem name="Firefox" icon={<FaFirefoxBrowser />} />
        <SupportItem name="Edge" icon={<FaEdge />} />
        <SupportItem name="Chrome" icon={<SiGooglechrome />} />
        <SupportItem name="Safari" icon={<FaSafari />} />
        <SupportItem name="IE" icon={<FaInternetExplorer />} support={false} />
      </SupportContainer>
      <SupportTitle>모바일 지원</SupportTitle>
      <SupportContainer>
        <SupportItem name="Firefox" icon={<FaFirefoxBrowser />} />
        <SupportItem name="Edge" icon={<FaEdge />} support={false} />
        <SupportItem name="Chrome" icon={<SiGooglechrome />} />
        <SupportItem name="IOS Browsers" icon={<FaApple />} support={false} />
      </SupportContainer>
    </Container>
  );
}
