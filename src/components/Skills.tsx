import { facts, skills } from '../data/profile';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container stack-lg">
        <SectionHeader route="GET /skills" title="Stack" />
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.name} className="card skill-card">
              <h3>
                <span className={`swatch accent-${group.accent}`} />
                {group.name}
              </h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="facts">
          {facts.map((fact) => (
            <div key={fact.label} className="fact">
              <p className="label">{fact.label}</p>
              <p className="fact-title">{fact.title}</p>
              <p className="muted small">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
