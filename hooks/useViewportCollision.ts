import { RefObject, useEffect, useState } from "react";

interface IUseViewportCollisionProps {
  ref: RefObject<HTMLElement>;
  threshold?: number | number[] | undefined;
  rootMargin?: string | undefined;
  initWhenOut?: boolean;
}

export default function useViewportCollision({
  ref,
  threshold,
  rootMargin,
  initWhenOut = false,
}: IUseViewportCollisionProps) {
  const [collide, setCollide] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(true);
    };

    const scrollableAncestor = document.getElementById("__next");
    scrollableAncestor?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableAncestor?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCollide(true);
          } else if (initWhenOut) {
            setCollide(false);
          }
        });
      },
      {
        root: null,
        threshold,
        rootMargin,
      }
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return { collide, scrolled };
}
