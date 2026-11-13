import { jobs } from '../data/profile';
import { SectionHeader } from './SectionHeader';

const dotAccents = ['purple', 'cyan', 'magenta'];

export function Experience() {
  return (
    <section id="experience" className="section band">
      <div className="container stack-lg">
        <SectionHeader
          route="GET /experience"
          title="Experience"
          lead="Nine roles, from Java EE in 2015 to Go and Kubernetes today."
        />
        <ol className="timeline">
          {jobs.map((job, i) => (
            <li key={`${job.company}-${job.dates}`} className="timeline-item">
              <span className={`timeline-dot accent-${dotAccents[i % dotAccents.length]}`} />
              <div className="timeline-when">
                <p className="mono-strong">{job.dates}</p>
                <p className="muted small">{job.place}</p>
              </div>
              <div className="timeline-body">
                <h3>
                  {job.company} <span className="job-role">{job.role}</span>
                </h3>
                <ul className="job-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul className="tags">
                  {job.tags.map((tag) => (
                    <li key={tag} className="tag tag-outline">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
