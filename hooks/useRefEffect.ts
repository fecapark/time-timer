import { useEffect, EffectCallback, RefObject, DependencyList } from "react";

type RefDependencyList = Array<RefObject<HTMLElement>>;

export default function useRefEffect(
  effect: EffectCallback,
  refDeps: RefDependencyList,
  deps?: DependencyList
) {
  useEffect(() => {
    if (!refDeps.every((aRefDep) => aRefDep !== undefined && aRefDep !== null))
      return;
    effect();
  }, [...refDeps.map((aRefDep) => aRefDep.current), ...(deps ? deps : [])]);
}
