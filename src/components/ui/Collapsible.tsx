import { useRef, useState, type ReactNode } from 'react';
import { useIsOverflowing } from '../../hooks/useIsOverflowing';
import { cx } from '../../utils/cx';
import { Icon } from './Icon';
import './Collapsible.css';

interface CollapsibleProps {
  /** Id of the content, referenced by the toggle */
  id: string;
  moreLabel: string;
  lessLabel: string;
  /** Re-measure when this changes, e.g. the language */
  contentKey?: unknown;
  children: ReactNode;
}

/**
 * Shows the first lines of long content with a toggle to reveal the rest.
 * Short content is shown in full, without a toggle. Screen readers always get the full text.
 */
export function Collapsible({ id, moreLabel, lessLabel, contentKey, children }: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const overflowing = useIsOverflowing(contentRef, !expanded, contentKey);

  return (
    <div className="collapsible">
      <div
        id={id}
        ref={contentRef}
        className={cx('collapsible-content', !expanded && 'is-clamped', !expanded && overflowing && 'is-faded')}
      >
        {children}
      </div>
      {(overflowing || expanded) && (
        <button
          type="button"
          className="collapsible-toggle"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? lessLabel : moreLabel}
          <span className={cx('collapsible-chevron', expanded && 'is-open')}>
            <Icon name="chevron" size={16} />
          </span>
        </button>
      )}
    </div>
  );
}
