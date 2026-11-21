import { profile } from '../../data/profile';
import { useClipboard } from '../../hooks/useClipboard';
import { useI18n } from '../../i18n/useI18n';
import { ButtonLink } from '../ui/ButtonLink';
import { Highlight } from '../ui/Highlight';
import { Icon, type IconName } from '../ui/Icon';
import { IconButton } from '../ui/IconButton';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { StarBorder } from '../ui/StarBorder';
import './Contact.css';

interface ContactRow {
  key: string;
  label: string;
  value: string;
  href?: string;
  /** Logo shown before the value, for profiles on other sites */
  icon?: IconName;
  copyable?: boolean;
}

export function Contact() {
  const { messages } = useI18n();
  const copy = messages.contact;
  const clipboard = useClipboard();

  const rows: ContactRow[] = [
    { key: 'email', label: copy.fields.email, value: profile.email, copyable: true },
    { key: 'phone', label: copy.fields.phone, value: profile.phone, copyable: true },
    {
      key: 'linkedin',
      label: copy.fields.linkedin,
      value: profile.linkedin.label,
      href: profile.linkedin.url,
      icon: 'linkedin',
    },
    { key: 'github', label: copy.fields.github, value: profile.github.label, href: profile.github.url, icon: 'github' },
    { key: 'location', label: copy.fields.location, value: copy.location },
  ];

  return (
    <Section id="contact" className="contact">
      <div className="contact-copy">
        <SectionHeader section="contact" title={<Highlight text={copy.title} />} />
        <p className="contact-lead">{copy.lead}</p>
        <div className="button-row">
          <ButtonLink
            href={`mailto:${profile.email}`}
            starBorder={{ color: 'var(--cyan)', trailColor: 'var(--magenta)', thickness: 1.5, sparkle: true }}
          >
            {copy.emailMe}
          </ButtonLink>
          <ButtonLink href={profile.linkedin.url} variant="secondary" iconStart="linkedin" external>
            {copy.linkedIn}
          </ButtonLink>
          <ButtonLink href={profile.github.url} variant="secondary" iconStart="github" external>
            {copy.gitHub}
          </ButtonLink>
        </div>
      </div>

      <dl className="card contact-card star-border">
        <StarBorder color="var(--purple)" trailColor="var(--magenta)" stars={2} duration={10} glow={0.5} />
        {rows.map((row) => (
          <div key={row.key} className="contact-row">
            <dt>{row.label}</dt>
            <dd>
              {row.href ? (
                <a href={row.href} target="_blank" rel="noreferrer" className="contact-link">
                  {row.icon && <Icon name={row.icon} size={16} />}
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
