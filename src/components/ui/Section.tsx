import type { ReactNode } from 'react';
import { sectionTitleId, type SectionId } from '../../data/sections';
import { cx } from '../../utils/cx';
import './Section.css';

interface SectionProps {
  id: SectionId;
  /** Alternate background band */
  band?: boolean;
  /** Layout class for the inner container */
  className?: string;
  children: ReactNode;
}

/** A page section named by its heading, so screen readers list it as a landmark. */
export function Section({ id, band = false, className, children }: SectionProps) {
  return (
    <section id={id} className={cx('section', band && 'band')} aria-labelledby={sectionTitleId(id)}>
      <div className={cx('container', className)}>{children}</div>
    </section>
  );
}
