import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
} from "react";

export default function useIsomorphicEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  typeof document !== "undefined"
    ? useLayoutEffect(effect, deps)
    : useEffect(effect, deps);
}
