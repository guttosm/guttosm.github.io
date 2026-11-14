import { cx } from '../../utils/cx';
import './TagList.css';

interface TagListProps {
  items: readonly string[];
  variant: 'filled' | 'outline' | 'chip';
  className?: string;
}

export function TagList({ items, variant, className }: TagListProps) {
  return (
    <ul className={cx('tag-list', className)}>
      {items.map((item) => (
        <li key={item} className={`tag tag-${variant}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}
