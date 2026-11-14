/** Brand accents, cycled through repeated items such as timeline dots and skill groups. */
export const ACCENTS = ['purple', 'cyan', 'magenta'] as const;

export type Accent = (typeof ACCENTS)[number];

export function accentAt(index: number): Accent {
  return ACCENTS[index % ACCENTS.length];
}
