import { skillGroups } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { accentAt } from '../../utils/accent';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { TagList } from '../ui/TagList';
import './Skills.css';

export function Skills() {
  const { messages } = useI18n();
  const copy = messages.skills;

  return (
    <Section id="skills" className="stack-lg">
      <SectionHeader section="skills" title={copy.title} />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <div key={group.id} className="card skill-card">
            <h3>
              <span className={`swatch accent-${accentAt(index)}`} aria-hidden="true" />
              {copy.groups[group.id]}
            </h3>
            <TagList items={group.items} variant="chip" />
          </div>
        ))}
      </div>
      <div className="facts">
        {copy.facts.map((fact) => (
          <div key={fact.label} className="fact">
            <p className="fact-label">{fact.label}</p>
            <p className="fact-title">{fact.title}</p>
            <p className="fact-text">{fact.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
