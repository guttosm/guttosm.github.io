import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

function readInitialTheme(): Theme {
  // index.html already resolved the saved or system theme before first paint
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Storage can be blocked (private mode); the toggle still works for this visit
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
