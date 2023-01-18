import { set, get } from "idb-keyval";
import { optionDefaultValue } from "../shared/const";
import { IOptionDataType } from "../shared/types";

export const OPTION_DB_KEY = "option-db";

export async function checkSetDefaultOption() {
  const data = getOptionFromDB();

  if (data === undefined) {
    setOptionToDB(optionDefaultValue);
  }
}

export async function getOptionFromDB(): Promise<IOptionDataType | undefined> {
  const data = await get(OPTION_DB_KEY);
  return data;
}

export async function setOptionToDB(
  setter: ((prev: IOptionDataType) => IOptionDataType) | IOptionDataType
) {
  if (typeof setter === "function") {
    let prev = await getOptionFromDB();

    if (prev === undefined) {
      await setOptionToDB(optionDefaultValue);
      prev = optionDefaultValue;
    }

    const res = setter(prev);
    await set(OPTION_DB_KEY, setter(prev));
    return res;
  }

  await set(OPTION_DB_KEY, setter);
  return setter;
}
