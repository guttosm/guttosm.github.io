/** Supported languages. `htmlLang` is the BCP 47 tag used for <html lang> and date formatting. */
export const LOCALES = {
  en: { htmlLang: 'en', label: 'EN', name: 'English' },
  pt: { htmlLang: 'pt-BR', label: 'PT', name: 'Português' },
  nl: { htmlLang: 'nl', label: 'NL', name: 'Nederlands' },
} as const;

export type Locale = keyof typeof LOCALES;

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

export const DEFAULT_LOCALE: Locale = 'en';

/** localStorage key for the visitor's explicit choice. */
export const LOCALE_STORAGE_KEY = 'locale';

/** Query parameter for links that open in a given language, e.g. ?lang=nl */
export const LOCALE_QUERY_PARAM = 'lang';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(LOCALES, value);
}
