import { useEffect, EffectCallback, RefObject, DependencyList } from "react";

type RefDependencyList = Array<RefObject<HTMLElement>>;

export default function useRefEffect(
  effect: EffectCallback,
  refDeps: RefDependencyList,
  deps?: DependencyList
) {
  console.log(refDeps[0]);
  useEffect(() => {
    if (!refDeps.every((aRefDep) => aRefDep !== undefined && aRefDep !== null))
      return;
    console.log("in effect", refDeps[0]);
    effect();
  }, [...refDeps.map((aRefDep) => aRefDep.current), ...(deps ? deps : [])]);
}
