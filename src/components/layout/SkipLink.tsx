import { useI18n } from '../../i18n/useI18n';
import './SkipLink.css';

/** Lets keyboard users jump past the header. */
export function SkipLink() {
  const { messages } = useI18n();
  return (
    <a href="#main" className="skip-link">
      {messages.a11y.skipToContent}
    </a>
  );
}
