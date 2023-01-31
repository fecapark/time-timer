import { useRecoilValue } from "recoil";
import {
  isTimingNowAtom as ITN,
  isClockPointerDownAtom as ICPD,
} from "../../shared/atom";
import { Container } from "./TimerOption.styled";
import AlarmSwitch from "./AlarmSwitch/AlarmSwitch";
import NotificationSwitch from "./NotificationSwitch/NotificationSwitch";

export default function TimerOption() {
  const isTimingNow = useRecoilValue(ITN);
  const isClockPointerDown = useRecoilValue(ICPD);

  return (
    <Container triggerHide={isClockPointerDown || isTimingNow}>
      <AlarmSwitch />
      <NotificationSwitch />
    </Container>
  );
}
