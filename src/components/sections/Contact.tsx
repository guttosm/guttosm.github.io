import { profile } from '../../data/profile';
import { useClipboard } from '../../hooks/useClipboard';
import { useI18n } from '../../i18n/useI18n';
import { ButtonLink } from '../ui/ButtonLink';
import { Highlight } from '../ui/Highlight';
import { IconButton } from '../ui/IconButton';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './Contact.css';

interface ContactRow {
  key: string;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

export function Contact() {
  const { messages } = useI18n();
  const copy = messages.contact;
  const clipboard = useClipboard();

  const rows: ContactRow[] = [
    { key: 'email', label: copy.fields.email, value: profile.email, copyable: true },
    { key: 'phone', label: copy.fields.phone, value: profile.phone, copyable: true },
    { key: 'linkedin', label: copy.fields.linkedin, value: profile.linkedin.label, href: profile.linkedin.url },
    { key: 'location', label: copy.fields.location, value: copy.location },
  ];

  return (
    <Section id="contact" className="contact">
      <div className="contact-copy">
        <SectionHeader section="contact" title={<Highlight text={copy.title} />} />
        <p className="contact-lead">{copy.lead}</p>
        <div className="button-row">
          <ButtonLink href={`mailto:${profile.email}`}>{copy.emailMe}</ButtonLink>
          <ButtonLink href={profile.linkedin.url} variant="secondary" external>
            {copy.linkedIn}
          </ButtonLink>
        </div>
      </div>

      <dl className="card contact-card">
        {rows.map((row) => (
          <div key={row.key} className="contact-row">
            <dt>{row.label}</dt>
            <dd>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer">
                  {row.value}
                </a>
              ) : (
                <span>{row.value}</span>
              )}
              {row.copyable && (
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={clipboard.copiedValue === row.value ? 'check' : 'copy'}
                  label={copy.copyField(row.label)}
                  onClick={() => void clipboard.copy(row.value)}
                />
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="sr-only" aria-live="polite">
        {clipboard.copiedValue ? copy.copied : ''}
      </p>
    </Section>
  );
}
