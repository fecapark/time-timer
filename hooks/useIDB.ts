import { set, get } from "idb-keyval";
import {
  behaviorDefaultValue,
  optionDefaultValue,
  timeRecordsDefaultValue,
} from "../shared/const";
import {
  IBehaviorDataType,
  IOptionDataType,
  ITimeRecordDataType,
} from "../shared/types";

type ObjectExcludedFunctionType = Exclude<object, Function>;
type SetterPropType<T> = ((prev: T) => T) | T;

/*
  Keys
*/

export const OPTION_DB_KEY = "option-db";
export const TIME_RECORD_DB_KEY = "time-record-db";
export const BEHAVIOR_DB_KEY = "behavior-db";

/*
  Factories
*/

function defaultValueSetterFactory<T extends ObjectExcludedFunctionType>(
  key: string,
  defaultValue: T
) {
  async function setter() {
    const data = await getterFactory<T>(key);

    if (data === undefined) {
      await setterFactory<T>(key, defaultValue, defaultValue);
      return true;
    }

    return false;
  }

  return setter();
}

function getterFactory<T extends ObjectExcludedFunctionType>(key: string) {
  async function getter(): Promise<T | undefined> {
    return await get(key);
  }

  return getter();
}

async function setterFactory<T extends ObjectExcludedFunctionType>(
  key: string,
  dataSetter: SetterPropType<T>,
  defaultValue: T
) {
  async function setter(dataSetter: SetterPropType<T>) {
    if (typeof dataSetter === "function") {
      let prev: T | undefined = await getterFactory<T>(key);

      if (prev === undefined) {
        await setter(defaultValue);
        prev = defaultValue;
      }

      const res = dataSetter(prev);

      await set(key, res);
      return res;
    }

    await set(key, dataSetter);
    return dataSetter;
  }

  return setter(dataSetter);
}

/*
  Default Value Setters
*/

export function checkSetDefaultOption() {
  return defaultValueSetterFactory<IOptionDataType>(
    OPTION_DB_KEY,
    optionDefaultValue
  );
}

export function checkSetDefaultBehavior() {
  return defaultValueSetterFactory<IBehaviorDataType>(
    BEHAVIOR_DB_KEY,
    behaviorDefaultValue
  );
}

export function checkSetDefaultTimeRecords() {
  return defaultValueSetterFactory<Array<ITimeRecordDataType>>(
    TIME_RECORD_DB_KEY,
    timeRecordsDefaultValue
  );
}

/*
  Getters
*/

export function getOptionFromDB() {
  return getterFactory<IOptionDataType>(OPTION_DB_KEY);
}

export function getBehaviorFromDB() {
  return getterFactory<IBehaviorDataType>(BEHAVIOR_DB_KEY);
}

export function getTimeRecordsFromDB() {
  return getterFactory<Array<ITimeRecordDataType>>(TIME_RECORD_DB_KEY);
}

/*
  Setters
*/

export function setOptionToDB(setter: SetterPropType<IOptionDataType>) {
  return setterFactory<IOptionDataType>(
    OPTION_DB_KEY,
    setter,
    optionDefaultValue
  );
}

export function setBehaviorToDB(setter: SetterPropType<IBehaviorDataType>) {
  return setterFactory<IBehaviorDataType>(
    BEHAVIOR_DB_KEY,
    setter,
    behaviorDefaultValue
  );
}

export function setTimeRecordsToDB(
  setter: SetterPropType<Array<ITimeRecordDataType>>
) {
  return setterFactory<Array<ITimeRecordDataType>>(
    TIME_RECORD_DB_KEY,
    setter,
    timeRecordsDefaultValue
  );
}
