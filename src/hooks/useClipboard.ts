import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard and remembers the copied value for a moment,
 * so the UI can confirm it.
 */
export function useClipboard(resetAfterMs = 1800) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const resetTimer = useRef<number | undefined>(undefined);

  // Clear a pending reset when the component unmounts
  useEffect(() => {
    const timer = resetTimer;
    return () => window.clearTimeout(timer.current);
  }, []);

  const copy = useCallback(
    async (value: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // No clipboard access (insecure context or denied); the text stays selectable
        return false;
      }
      setCopiedValue(value);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopiedValue(null), resetAfterMs);
      return true;
    },
    [resetAfterMs],
  );

  return { copiedValue, copy };
}
