import { DEFAULT_LOCALE, isLocale, LOCALE_QUERY_PARAM, LOCALE_STORAGE_KEY, type Locale } from './locales';

/** Where a language preference can come from, highest priority first. */
export interface LocaleSources {
  /** ?lang= from a shared link */
  query: string | null;
  /** The visitor's earlier choice */
  stored: string | null;
  /** Browser languages, most preferred first */
  browser: readonly string[];
}

/** Maps a language tag such as "pt-BR" or "nl" to a supported locale, or null. */
export function matchLocale(tag: string | null | undefined): Locale | null {
  if (!tag) return null;
  const base = tag.trim().toLowerCase().split(/[-_]/)[0];
  return isLocale(base) ? base : null;
}

/** Returns the first supported locale from the sources, in priority order, or the default. */
export function detectLocale({ query, stored, browser }: LocaleSources): Locale {
  for (const candidate of [query, stored, ...browser]) {
    const locale = matchLocale(candidate);
    if (locale) return locale;
  }
  return DEFAULT_LOCALE;
}

/** Reads the sources from the browser. */
export function readLocaleSources(): LocaleSources {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    // Storage can be blocked (private mode); the other sources still apply
  }
  return {
    query: new URLSearchParams(window.location.search).get(LOCALE_QUERY_PARAM),
    stored,
    browser: navigator.languages?.length ? navigator.languages : [navigator.language],
  };
}
