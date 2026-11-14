import type { YearMonth } from '../data/types';

function toDate(month: YearMonth): Date {
  const [year, monthNumber] = month.split('-').map(Number);
  return new Date(year, monthNumber - 1, 1);
}

/**
 * Formats a period of months with the language's month names and range style,
 * e.g. "Mar 2025 – Oct 2026" in English or "mrt 2025 – okt 2026" in Dutch.
 */
export function formatMonthRange(lang: string, start: YearMonth, end: YearMonth | undefined, presentLabel: string): string {
  const formatter = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' });
  if (!end) return `${formatter.format(toDate(start))} – ${presentLabel}`;
  return formatter.formatRange(toDate(start), toDate(end));
}
