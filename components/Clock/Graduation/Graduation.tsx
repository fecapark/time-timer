import { useRecoilValue } from "recoil";
import { IGraduationProps } from "./Graduation.type";
import {
  clockDegreeAtom as CD,
  maxClockTimeAtom as MCT,
} from "../../../shared/atom";
import { GraduationContainer } from "./Graduation.styled";

export default function Graduation({ index }: IGraduationProps) {
  const INDEX_GAP = 5;
  const ROTATED_DEGREE = index * 6;
  const clockDegree = useRecoilValue(CD);
  const maxClockTime = useRecoilValue(MCT);

  const isDisplayGraduation = () => {
    const gapRatio = maxClockTime >= 60 ? 1 : Math.round(30 / maxClockTime);
    return index % (gapRatio * INDEX_GAP) == 0;
  };

  const getGraduationContent = () => {
    const gValue = Math.round((index * maxClockTime) / 6) / 10;

    // If gValue is float
    if (gValue !== Math.floor(gValue)) {
      const float = gValue - Math.floor(gValue);
      return (
        <span>
          {Math.floor(gValue)}
          <span className="min">/{60 * float}</span>
        </span>
      );
    }

    return <span>{gValue}</span>;
  };

  return (
    <GraduationContainer
      rotate={ROTATED_DEGREE}
      accent={index % INDEX_GAP == 0}
      gap={24}
      spanAccent={360 - clockDegree >= ROTATED_DEGREE}
    >
      {isDisplayGraduation() ? getGraduationContent() : null}
    </GraduationContainer>
  );
}
