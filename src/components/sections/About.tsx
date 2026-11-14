import { FOCUS_AREA_IDS, type FocusAreaId } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { accentAt } from '../../utils/accent';
import { Icon, type IconName } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import './About.css';

const FOCUS_ICONS: Record<FocusAreaId, IconName> = {
  backends: 'flow',
  identity: 'shield',
  cloud: 'cloud',
};

export function About() {
  const { messages } = useI18n();
  const copy = messages.about;

  return (
    <Section id="about" className="about">
      <div className="about-copy">
        <SectionHeader section="about" title={copy.title} />
        <p className="about-lead">{copy.lead}</p>
        {copy.body.map((paragraph) => (
          <p key={paragraph} className="muted">
            {paragraph}
          </p>
        ))}
      </div>
      <ul className="focus-list">
        {FOCUS_AREA_IDS.map((id, index) => (
          <li key={id} className="card focus-card">
            <span className={`focus-icon accent-${accentAt(index)}`}>
              <Icon name={FOCUS_ICONS[id]} size={22} />
            </span>
            <div>
              <h3>{copy.focus[id].title}</h3>
              <p className="muted">{copy.focus[id].text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
