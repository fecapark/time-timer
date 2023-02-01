import { useQuery } from "@tanstack/react-query";
import { clear } from "idb-keyval";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  checkSetDefaultOption,
  checkSetDefaultBehavior,
  getOptionFromDB,
  OPTION_DB_KEY,
  getBehaviorFromDB,
  BEHAVIOR_DB_KEY,
  TIME_RECORD_DB_KEY,
  getTimeRecordsFromDB,
  checkSetDefaultTimeRecords,
} from "../../hooks/useIDB";
import useIsomorphicEffect from "../../hooks/useIsomorphicEffect";
import {
  clockColorValueAtom as CCV,
  progressUnitValueAtom as PUV,
  maxClockTimeAtom as MCT,
  clockTimeUnitAtom as CTU,
  languageOptionValueAtom as LOV,
} from "../../shared/atom";

export default function AppMiddleware() {
  const [isDefaultLoaded, setIsDefaultLoaded] = useState(false);
  const setClockColor = useSetRecoilState(CCV);
  const setProgressUnit = useSetRecoilState(PUV);
  const setMaxClockTime = useSetRecoilState(MCT);
  const setClockTimeUnit = useSetRecoilState(CTU);
  const setLanguage = useSetRecoilState(LOV);

  const { refetch: optionRefetch } = useQuery([OPTION_DB_KEY], getOptionFromDB);
  const { refetch: behaviorRefetch } = useQuery(
    [BEHAVIOR_DB_KEY],
    getBehaviorFromDB
  );
  const { refetch: timeRecordsRefetch } = useQuery(
    [TIME_RECORD_DB_KEY],
    getTimeRecordsFromDB
  );

  /*
    Default value set effect
  */
  useIsomorphicEffect(() => {
    const setDefaultValues = async () => {
      await checkSetDefaultOption();
      await checkSetDefaultBehavior();
      await checkSetDefaultTimeRecords();
      setIsDefaultLoaded(true);
    };
    setDefaultValues();
  }, []);

  /*
    Refetch effect after default value setted
  */
  useIsomorphicEffect(() => {
    const refetchAndSetOptionsToAtom = async () => {
      const { data } = await optionRefetch();
      if (data === undefined) return;

      setClockColor(data.clockColor);
      setProgressUnit(data.progressUnit);
      setMaxClockTime(data.maxClockTime);
      setClockTimeUnit(data.clockTimeUnit);
      setLanguage(data.language);
    };

    const refetchBehavior = async () => {
      await behaviorRefetch();
    };

    const refetchTimeRecords = async () => {
      await timeRecordsRefetch();
      clear();
    };

    if (!isDefaultLoaded) return;
    refetchAndSetOptionsToAtom();
    refetchBehavior();
    refetchTimeRecords();
  }, [isDefaultLoaded]);

  return <></>;
}
