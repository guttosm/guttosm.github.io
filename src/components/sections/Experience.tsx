import type { CSSProperties } from 'react';
import { jobs } from '../../data/profile';
import type { Org } from '../../data/types';
import { useI18n } from '../../i18n/useI18n';
import { accentAt } from '../../utils/accent';
import { Collapsible } from '../ui/Collapsible';
import { CompanyLogo } from '../ui/CompanyLogo';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { TagList } from '../ui/TagList';
import './Experience.css';

function OrgName({ org }: { org: Org }) {
  if (!org.url) return <>{org.name}</>;
  return (
    <a className="org-link" href={org.url} target="_blank" rel="noreferrer">
      {org.name}
    </a>
  );
}

export function Experience() {
  const { locale, messages, formatPeriod } = useI18n();
  const copy = messages.experience;

  return (
    <Section id="experience" className="stack-lg">
      <SectionHeader section="experience" title={copy.title} lead={copy.lead} />
      <ol className="timeline">
        {jobs.map((job, index) => {
          const { role, place, text } = copy.jobs[job.id];
          return (
            <li key={job.id} className="timeline-item">
              <span
                className={`timeline-dot accent-${accentAt(index)}`}
                // Each dot pings a moment after the one above, so the pulse runs down the timeline
                style={{ '--pulse-delay': `${index * 0.35}s` } as CSSProperties}
                aria-hidden="true"
              />
              <div className="timeline-when">
                <p className="timeline-period">{formatPeriod(job.start, job.end)}</p>
                <p className="muted small">{place}</p>
                {job.via && (
                  <p className="muted small">
                    {copy.via} <CompanyLogo org={job.via} size="sm" />
                    <OrgName org={job.via} />
                  </p>
                )}
              </div>
              <div className="timeline-body">
                <div className="job-head">
                  <CompanyLogo org={job.company} />
                  <h3>
                    <OrgName org={job.company} /> <span className="job-role">{role}</span>
                  </h3>
                </div>
                <Collapsible
                  id={`job-${job.id}`}
                  moreLabel={copy.showMore}
                  lessLabel={copy.showLess}
                  contentKey={locale}
                >
                  {text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Collapsible>
                {job.tags.length > 0 && <TagList items={job.tags} variant="outline" />}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
