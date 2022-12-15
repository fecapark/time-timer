import { useEffect, useState } from "react";

export interface IMediaOption {}

export default function useMediaMatch(media: string) {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const isMatch = window.matchMedia(media).matches;
      setMatched(isMatch);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return matched;
}
