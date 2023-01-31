import { useRecoilValue } from "recoil";
import useMediaMatch from "../../hooks/useMediaMatch";
import {
  clockDegreeAtom as CD,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
  progressUnitValueAtom as PUV,
  maxClockTimeAtom as MCT,
} from "../../shared/atom";
import { Theme } from "../../styles/theme";
import {
  getPercentageFromDegree,
  getTimeFromDegree,
} from "../Timer/Timer.util";
import { TimeTextContainer } from "./TimeText.styled";

export default function TimeText() {
  const isTimingNow = useRecoilValue(ITN);
  const clockDegree = useRecoilValue(CD);
  const isClockPointerDown = useRecoilValue(ICPD);
  const progressUnit = useRecoilValue(PUV);
  const maxClockTime = useRecoilValue(MCT);
  const [isHideTimer, _] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  return (
    <TimeTextContainer
      triggerZoom={isClockPointerDown || isTimingNow}
      isHide={isHideTimer}
    >
      <div className="row">
        <span className="min">
          {progressUnit === "time"
            ? getTimeFromDegree(clockDegree, maxClockTime).min
            : getPercentageFromDegree(clockDegree).int}
        </span>
      </div>
      <div className="row">
        <span className="sec">
          {progressUnit === "time"
            ? getTimeFromDegree(clockDegree, maxClockTime).sec
            : "." + getPercentageFromDegree(clockDegree).float}
        </span>
      </div>
    </TimeTextContainer>
  );
}
