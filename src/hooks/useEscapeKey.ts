import { useEffect, useRef } from 'react';

/** Calls `onEscape` when the Escape key is pressed, while `enabled` is true. */
export function useEscapeKey(onEscape: () => void, enabled = true) {
  // Keep the latest handler without re-subscribing on every render
  const handler = useRef(onEscape);
  useEffect(() => {
    handler.current = onEscape;
  });

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled]);
}
