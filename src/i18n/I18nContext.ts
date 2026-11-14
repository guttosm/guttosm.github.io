import { createContext } from 'react';
import type { YearMonth } from '../data/types';
import type { Locale } from './locales';
import type { Messages } from './types';

export interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  /** A job period in the current language, e.g. "Mar 2025 – Oct 2026". */
  formatPeriod: (start: YearMonth, end?: YearMonth) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
