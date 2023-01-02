import { useEffect, useState } from "react";
import {
  clockColorDefaultValue,
  languageOptionDefaultValue,
  maxClockTimeDefaultValue,
  progressUnitDefaultValue,
  clockTimeUnitDefaultValue,
} from "../shared/atom";
import { optionKey } from "../shared/const";
import { IOptionDataType } from "../shared/types";
import useIsomorphicEffect from "./useIsomorphicEffect";

export default function useOptionStorage(): [
  IOptionDataType,
  (toSet: Partial<IOptionDataType>) => void,
  boolean
] {
  const [canAccess, setCanAccess] = useState(false);
  const [value, setValue] = useState<IOptionDataType | null>(null);

  const getDefaultData = (): IOptionDataType => {
    return {
      language: languageOptionDefaultValue,
      clockColor: clockColorDefaultValue,
      progressUnit: progressUnitDefaultValue,
      maxClockTime: maxClockTimeDefaultValue,
      clockTimeUnit: clockTimeUnitDefaultValue,
    };
  };

  const set = (toSet: Partial<IOptionDataType>) => {
    const mergeWith = (object: IOptionDataType): IOptionDataType => {
      const mergedEntries = Object.entries(object).map(([k, v]) => {
        if (toSet[k as keyof IOptionDataType] === undefined) {
          return [k, v];
        }
        return [k, toSet[k as keyof IOptionDataType]];
      });

      return Object.fromEntries(mergedEntries);
    };

    if (!canAccess)
      throw Error(
        "Cannot access to option storage outside of client environment."
      );

    setValue((prev) => {
      const data = mergeWith(prev === null ? getDefaultData() : prev);
      window.localStorage.setItem(optionKey, JSON.stringify(data));
      return data;
    });
  };

  const get = (fromStorage = false): IOptionDataType => {
    if (!canAccess)
      throw Error(
        "Cannot access to option storage outside of client environment."
      );

    const rawData = window.localStorage.getItem(optionKey);

    if (rawData === null) {
      const defaultData = getDefaultData();
      setValue(defaultData);
      return defaultData;
    }

    const data: IOptionDataType =
      value === null || fromStorage ? JSON.parse(rawData) : value;

    return { ...data };
  };

  useEffect(() => {
    setCanAccess(true);
  }, []);

  useIsomorphicEffect(() => {
    if (!canAccess) return;
    const data = get();
    set(data);
  }, [canAccess]);

  return [value ? value : getDefaultData(), set, canAccess];
}
