import type { Locale } from './locales';
import { en } from './messages/en';
import { nl } from './messages/nl';
import { pt } from './messages/pt';
import type { Messages } from './types';

/** Bundled translations. A new language needs a messages file, an entry here and one in LOCALES. */
export const dictionaries: Record<Locale, Messages> = { en, pt, nl };
