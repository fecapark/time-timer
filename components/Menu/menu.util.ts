import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { setOptionToDB } from "../../hooks/useIDB";
import useIsomorphicEffect from "../../hooks/useIsomorphicEffect";
import { clockColorValueAtom } from "../../shared/atom";
import { IOptionDataType } from "../../shared/types";

export async function mergeSetOptionData(data: Partial<IOptionDataType>) {
  const settedOption = await setOptionToDB((prev) => {
    return { ...prev, ...data };
  });
  return settedOption;
}

export function useOptionSetEffect(
  data: IOptionDataType | undefined | null,
  setters: Partial<Record<keyof IOptionDataType, SetterOrUpdater<any>>>
) {
  useIsomorphicEffect(() => {
    if (!data) return;

    Object.entries(setters).forEach(([k, set]) => {
      set(data[k as keyof IOptionDataType]);
    });
  }, [data]);
}
