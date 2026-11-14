import { useEffect, useRef, type RefObject } from 'react';

/** Calls `onOutside` when a press lands outside all the given elements, while `enabled` is true. */
export function useClickOutside(
  refs: ReadonlyArray<RefObject<HTMLElement>>,
  onOutside: () => void,
  enabled = true,
) {
  // Keep the latest values without re-subscribing on every render
  const latest = useRef({ refs, onOutside });
  useEffect(() => {
    latest.current = { refs, onOutside };
  });

  useEffect(() => {
    if (!enabled) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (latest.current.refs.some((ref) => ref.current?.contains(target))) return;
      latest.current.onOutside();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [enabled]);
}
