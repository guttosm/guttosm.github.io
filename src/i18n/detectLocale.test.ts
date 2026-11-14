import { describe, expect, it } from 'vitest';
import { detectLocale, matchLocale } from './detectLocale';

describe('matchLocale', () => {
  it.each([
    ['en', 'en'],
    ['en-GB', 'en'],
    ['pt-BR', 'pt'],
    ['pt_PT', 'pt'],
    ['NL-be', 'nl'],
  ])('maps %s to %s', (tag, expected) => {
    expect(matchLocale(tag)).toBe(expected);
  });

  it.each(['fr-FR', '', 'toString', null, undefined])('rejects %s', (tag) => {
    expect(matchLocale(tag)).toBeNull();
  });
});

describe('detectLocale', () => {
  it('prefers a shared ?lang= link over everything else', () => {
    expect(detectLocale({ query: 'nl', stored: 'pt', browser: ['en-US'] })).toBe('nl');
  });

  it("uses the visitor's earlier choice when the link has no language", () => {
    expect(detectLocale({ query: null, stored: 'pt', browser: ['nl-NL'] })).toBe('pt');
  });

  it('uses the first supported browser language', () => {
    expect(detectLocale({ query: null, stored: null, browser: ['fr-FR', 'nl-BE', 'en'] })).toBe('nl');
  });

  it('skips unsupported values and falls back to English', () => {
    expect(detectLocale({ query: 'de', stored: 'xx', browser: ['fr-FR'] })).toBe('en');
  });
});
