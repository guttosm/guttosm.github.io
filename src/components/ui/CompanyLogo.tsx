import { useState } from 'react';
import type { Org } from '../../data/types';
import { cx } from '../../utils/cx';
import './CompanyLogo.css';

const MINOR_WORDS = new Set(['da', 'das', 'de', 'do', 'dos', 'of', 'the']);

/** "Grupo Casas Bahia" → "GC", "SPC Brasil" → "SPC", "Engineering do Brasil" → "EB" */
function initials(name: string): string {
  const words = name.split(/\s+/).filter((word) => !MINOR_WORDS.has(word.toLowerCase()));
  if (/^[A-Z]{2,4}$/.test(words[0] ?? '')) return words[0];
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

interface CompanyLogoProps {
  org: Org;
  size?: 'md' | 'sm';
}

/**
 * A company's emblem. Decorative, since the company name is always shown beside it.
 * Without a logo (or if it fails to load) the medium size shows initials and the small size shows nothing.
 */
export function CompanyLogo({ org, size = 'md' }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);

  if (org.logo && !failed) {
    return (
      <img
        className={cx('company-logo', `company-logo-${size}`)}
        src={org.logo}
        style={org.logoBackground ? { background: org.logoBackground } : undefined}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  if (size === 'sm') return null;

  return (
    <span className={cx('company-logo', `company-logo-${size}`, 'company-logo-initials')} aria-hidden="true">
      {initials(org.name)}
    </span>
  );
}
