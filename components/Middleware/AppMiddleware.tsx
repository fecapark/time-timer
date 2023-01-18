import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  checkSetDefaultOption,
  getOptionFromDB,
  OPTION_DB_KEY,
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
  const [isOptionLoaded, setIsOptionLoaded] = useState(false);
  const setClockColor = useSetRecoilState(CCV);
  const setProgressUnit = useSetRecoilState(PUV);
  const setMaxClockTime = useSetRecoilState(MCT);
  const setClockTimeUnit = useSetRecoilState(CTU);
  const setLanguage = useSetRecoilState(LOV);
  const { refetch } = useQuery([OPTION_DB_KEY], getOptionFromDB);

  useIsomorphicEffect(() => {
    const refetchAndSetOptionsToAtom = async () => {
      const { data } = await refetch();
      if (data === undefined) return;

      setClockColor(data.clockColor);
      setProgressUnit(data.progressUnit);
      setMaxClockTime(data.maxClockTime);
      setClockTimeUnit(data.clockTimeUnit);
      setLanguage(data.language);
    };

    if (!isOptionLoaded) return;
    refetchAndSetOptionsToAtom();
  }, [isOptionLoaded]);

  useIsomorphicEffect(() => {
    const setDefaultOption = async () => {
      await checkSetDefaultOption();
      setIsOptionLoaded(true);
    };
    setDefaultOption();
  }, []);

  return <></>;
}
