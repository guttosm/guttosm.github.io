/** Pages in navigation order; each shows one section of the portfolio. */
export const SECTION_IDS = ['about', 'experience', 'skills', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Id of a section's heading, which also names the section for screen readers. */
export const sectionTitleId = (id: SectionId) => `${id}-title`;

/** Address of a section's page within the site. */
export const sectionPath = (id: SectionId) => `/${id}`;
