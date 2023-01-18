import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import {
  getOptionFromDB,
  OPTION_DB_KEY,
  setOptionToDB,
} from "../../hooks/useIDB";
import useIsomorphicEffect from "../../hooks/useIsomorphicEffect";
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

export function useOptionQuery(
  setters: Partial<Record<keyof IOptionDataType, SetterOrUpdater<any>>>
) {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery([OPTION_DB_KEY], getOptionFromDB);
  const { mutate } = useMutation(mergeSetOptionData, {
    onSuccess: () => {
      queryClient.invalidateQueries([OPTION_DB_KEY]);
    },
  });
  useOptionSetEffect(data, setters);
  return { isLoading, data, mutate };
}
