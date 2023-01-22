import { set, get } from "idb-keyval";
import { behaviorDefaultValue, optionDefaultValue } from "../shared/const";
import { IBehaviorDataType, IOptionDataType } from "../shared/types";

type ObjectExcludedFunctionType = Exclude<object, Function>;

/*
  Keys
*/

export const OPTION_DB_KEY = "option-db";
export const RECORD_DB_KEY = "time-record-db";
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
  dataSetter: ((prev: T) => T) | T,
  defaultValue: T
) {
  async function setter(dataSetter: ((prev: T) => T) | T) {
    if (typeof dataSetter === "function") {
      let prev: T | undefined = await getterFactory<T>(key);

      if (prev === undefined) {
        await setter(defaultValue);
        prev = defaultValue;
      }

      const res = dataSetter(prev);

      console.log(res);

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

/*
  Getters
*/

export function getOptionFromDB() {
  return getterFactory<IOptionDataType>(OPTION_DB_KEY);
}

export function getBehaviorFromDB() {
  return getterFactory<IBehaviorDataType>(BEHAVIOR_DB_KEY);
}

/*
  Setters
*/

export function setOptionToDB(
  setter: ((prev: IOptionDataType) => IOptionDataType) | IOptionDataType
) {
  return setterFactory<IOptionDataType>(
    OPTION_DB_KEY,
    setter,
    optionDefaultValue
  );
}

export function setBehaviorToDB(
  setter: ((prev: IBehaviorDataType) => IBehaviorDataType) | IBehaviorDataType
) {
  return setterFactory<IBehaviorDataType>(
    BEHAVIOR_DB_KEY,
    setter,
    behaviorDefaultValue
  );
}
