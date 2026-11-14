/** A calendar month written as `YYYY-MM`, e.g. `2025-03`. */
export type YearMonth = `${number}-${number}`;

/** A company, optionally linked to its page. */
export interface Org {
  name: string;
  url?: string;
  /** URL of a square logo image; companies without one show their initials */
  logo?: string;
  /** Tile color behind the logo, for logos drawn for dark backgrounds (default white) */
  logoBackground?: string;
}

export interface Job {
  id: string;
  /** Where the work was done */
  company: Org;
  /** The employer, when the job was a placement at a client */
  via?: Org;
  start: YearMonth;
  /** Leave out for a current role. */
  end?: YearMonth;
  tags: readonly string[];
}

export interface SkillGroup {
  id: string;
  items: readonly string[];
}
