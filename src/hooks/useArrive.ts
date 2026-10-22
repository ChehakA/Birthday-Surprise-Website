import { useEffect, useRef } from "react";

/** True when the visitor asked their device for less motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scrolls a newly unlocked section into view once, when it first appears.
 * Used so each completed activity leads straight into the next chapter.
 */
export function useArrive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const id = window.setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }, 120);
    return () => window.clearTimeout(id);
  }, []);
  return ref;
}
