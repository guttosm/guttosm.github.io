import type { Highlighted } from '../../i18n/types';

/** A translated sentence with its emphasized phrase in the accent color. */
export function Highlight({ text }: { text: Highlighted }) {
  return (
    <>
      {text.before}
      <span className="text-highlight">{text.highlight}</span>
      {text.after}
    </>
  );
}
