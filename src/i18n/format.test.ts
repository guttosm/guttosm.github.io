import { describe, expect, it } from 'vitest';
import { formatMonthRange } from './format';

// ICU puts thin or no-break spaces around the dash; compare with plain spaces
const plain = (text: string) => text.replace(/\s+/g, ' ');

describe('formatMonthRange', () => {
  it('formats a range across years', () => {
    expect(plain(formatMonthRange('en', '2025-03', '2026-10', 'Present'))).toBe('Mar 2025 – Oct 2026');
  });

  it('shows the year once when both months share it', () => {
    expect(plain(formatMonthRange('en', '2015-04', '2015-10', 'Present'))).toBe('Apr – Oct 2015');
  });

  it("uses each language's month names", () => {
    expect(plain(formatMonthRange('nl', '2025-03', '2026-10', 'heden'))).toMatch(/^mrt\.? 2025 [–-] okt\.? 2026$/);
    expect(plain(formatMonthRange('pt-BR', '2025-03', '2026-10', 'atual'))).toMatch(
      /^mar\.? de 2025 [–-] out\.? de 2026$/,
    );
  });

  it('ends an open period with the "present" label', () => {
    expect(plain(formatMonthRange('en', '2025-03', undefined, 'Present'))).toBe('Mar 2025 – Present');
  });
});
