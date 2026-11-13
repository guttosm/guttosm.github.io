import { work } from '../data/profile';
import { SectionHeader } from './SectionHeader';

export function Work() {
  return (
    <section id="work" className="section band">
      <div className="container stack-lg">
        <SectionHeader
          route="GET /work"
          title="Selected work"
          lead="Systems I designed or led, with the result they delivered."
        />
        <div className="work-grid">
          {work.map((item) => (
            <article key={item.title} className="card work-card">
              <div className="work-top">
                <p className="mono-meta">{item.where}</p>
                <p className="work-metric">{item.metric}</p>
              </div>
              <h3>{item.title}</h3>
              <p className="muted">{item.text}</p>
              <ul className="tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="tag tag-filled">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
