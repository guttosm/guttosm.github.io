import { describe, expect, it } from 'vitest';
import { jobs } from '../data/profile';
import { dictionaries } from './dictionaries';
import { LOCALE_CODES } from './locales';

// The type check guarantees every key exists; these tests cover what types can't:
// empty text and lists of different lengths between languages.

/** Every string in a messages object with its path, skipping formatter functions. */
function strings(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => strings(child, path ? `${path}.${key}` : key));
  }
  return [];
}

const english = dictionaries.en;

describe.each(LOCALE_CODES)('%s messages', (locale) => {
  const messages = dictionaries[locale];

  it('has no empty text', () => {
    for (const [path, text] of strings(messages)) {
      expect(text.trim(), path).not.toBe('');
    }
  });

  it('has as many items as English in every list', () => {
    expect(messages.stats).toHaveLength(english.stats.length);
    expect(messages.about.body).toHaveLength(english.about.body.length);
    expect(messages.skills.facts).toHaveLength(english.skills.facts.length);
    for (const job of jobs) {
      expect(messages.experience.jobs[job.id].text, job.id).toHaveLength(
        english.experience.jobs[job.id].text.length,
      );
    }
  });

  it('describes every job', () => {
    for (const job of jobs) {
      expect(messages.experience.jobs[job.id].text.length, job.id).toBeGreaterThan(0);
    }
  });

  it('names the field in copy-button labels', () => {
    const { copyField, fields } = messages.contact;
    expect(copyField(fields.email).toLowerCase()).toContain(fields.email.toLowerCase());
  });
});
