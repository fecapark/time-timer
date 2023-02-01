import { FaBoxOpen } from "react-icons/fa";
import { NoLogContainer } from "./NoLog.styled";
import { languageOptionValueAtom as LOV } from "../../../../../shared/atom";
import { useRecoilValue } from "recoil";

export default function NoLog() {
  const language = useRecoilValue(LOV);

  return (
    <NoLogContainer>
      <FaBoxOpen />
      <div>
        <span
          className="title"
          style={{ letterSpacing: language === "kor" ? "0" : "1.5px" }}
        >
          {language === "kor" ? "비어있음" : "EMPTY"}
        </span>
        <span className="description">
          {language === "kor"
            ? "먼저 타이머를 시작해 10분 이상의 시간을 기록해보세요."
            : "Start the timer over 10 minutes first."}
        </span>
      </div>
    </NoLogContainer>
  );
}
