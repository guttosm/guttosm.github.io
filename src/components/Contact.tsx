import { useState } from 'react';
import { profile } from '../data/profile';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';

const rows = [
  { label: 'Email', value: profile.email, copy: true },
  { label: 'Phone', value: profile.phone, copy: true },
  { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
  { label: 'Based in', value: 'São Caetano do Sul, Brazil' },
];

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context); the value stays selectable
    }
  };

  return (
    <section id="contact" className="section band contact-band">
      <div className="container contact">
        <div className="contact-copy">
          <SectionHeader
            route="POST /contact"
            title={
              <>
                Let's build something <span className="text-purple">secure</span>
              </>
            }
          />
          <p className="contact-lead">
            Hiring for backend, cloud or identity work? Send me a message and I'll get back to you.
          </p>
          <div className="button-row">
            <a href={`mailto:${profile.email}`} className="button button-primary">
              Email me
            </a>
            <a href={profile.linkedin} className="button button-secondary" target="_blank" rel="noreferrer">
              Connect on LinkedIn
            </a>
          </div>
        </div>
        <dl className="card contact-card">
          {rows.map((row) => (
            <div key={row.label} className="contact-row">
              <dt className="muted">{row.label}</dt>
              <dd>
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noreferrer">
                    {row.value}
                  </a>
                ) : (
                  <span>{row.value}</span>
                )}
                {row.copy && (
                  <button
                    type="button"
                    className="copy-button"
                    onClick={() => copy(row.value)}
                    aria-label={`Copy ${row.label.toLowerCase()}`}
                  >
                    <Icon name={copied === row.value ? 'check' : 'copy'} size={15} />
                  </button>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </p>
    </section>
  );
}
