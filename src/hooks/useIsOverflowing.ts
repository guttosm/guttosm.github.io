import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Whether an element's content is taller than the element itself.
 * Re-checked when the element resizes, when web fonts finish loading and when `contentKey` changes.
 */
export function useIsOverflowing(ref: RefObject<HTMLElement>, active: boolean, contentKey?: unknown): boolean {
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !active) return;

    let cancelled = false;
    const check = () => {
      if (!cancelled) setOverflowing(element.scrollHeight > element.clientHeight + 1);
    };
    check();
    // Web fonts can change line breaks after the first measurement
    void document.fonts?.ready.then(check);

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(check);
    observer?.observe(element);
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [ref, active, contentKey]);

  return overflowing;
}
