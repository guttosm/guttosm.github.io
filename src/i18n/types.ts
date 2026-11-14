import type { FocusAreaId, JobId, SkillGroupId } from '../data/profile';
import type { SectionId } from '../data/sections';

/** A sentence with one emphasized phrase, so each language can place it where its word order needs. */
export interface Highlighted {
  before: string;
  highlight: string;
  after?: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface JobCopy {
  role: string;
  place: string;
  /** Description, one string per paragraph */
  text: readonly string[];
}

/**
 * Every translatable text on the site. Each language file implements this interface
 * in full, so a missing translation fails the type check instead of showing up blank.
 */
export interface Messages {
  meta: { title: string; description: string };
  a11y: {
    skipToContent: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    switchToLight: string;
    switchToDark: string;
    language: string;
  };
  nav: Record<SectionId, string>;
  hero: {
    eyebrow: string;
    intro: string;
    viewExperience: string;
    downloadCv: string;
    location: string;
  };
  stats: readonly { value: string; label: string }[];
  about: {
    title: string;
    lead: string;
    body: readonly string[];
    focus: Record<FocusAreaId, TitledText>;
  };
  experience: {
    title: string;
    lead: string;
    /** End of a current role's period, as in "Mar 2025 – Present". */
    present: string;
    /** Introduces the employer of a client placement, as in "via Ewave". */
    via: string;
    showMore: string;
    showLess: string;
    jobs: Record<JobId, JobCopy>;
  };
  skills: {
    title: string;
    groups: Record<SkillGroupId, string>;
    facts: readonly (TitledText & { label: string })[];
  };
  contact: {
    title: Highlighted;
    lead: string;
    emailMe: string;
    linkedIn: string;
    fields: { email: string; phone: string; linkedin: string; location: string };
    location: string;
    /** Accessible name of a copy button, e.g. "Copy email". */
    copyField: (field: string) => string;
    copied: string;
  };
  notFound: { title: string; text: string; home: string };
}
