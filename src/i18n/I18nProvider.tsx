import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { detectLocale, readLocaleSources } from './detectLocale';
import { dictionaries } from './dictionaries';
import { formatMonthRange } from './format';
import { I18nContext, type I18nContextValue } from './I18nContext';
import { LOCALE_STORAGE_KEY, LOCALES, type Locale } from './locales';

interface I18nProviderProps {
  children: ReactNode;
  /** Skips detection, e.g. in tests. */
  initialLocale?: Locale;
}

function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked (private mode); the choice still applies for this visit
  }
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? detectLocale(readLocaleSources()));
  const messages = dictionaries[locale];

  // Screen readers and search engines read these from the document; pages set their own titles
  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', messages.meta.description);
  }, [locale, messages]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    rememberLocale(next);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      setLocale,
      formatPeriod: (start, end) => formatMonthRange(LOCALES[locale].htmlLang, start, end, messages.experience.present),
    }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
