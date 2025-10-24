import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (ev?: Event) => void
) {
  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref?.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}