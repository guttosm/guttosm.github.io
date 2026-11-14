import { profile } from '../../data/profile';
import { sectionPath } from '../../data/sections';
import { useLinkTo } from '../../hooks/useLinkTo';
import { useI18n } from '../../i18n/useI18n';
import { ButtonLink, ButtonRouterLink } from '../ui/ButtonLink';
import { Icon } from '../ui/Icon';
import { CubeNetwork } from './CubeNetwork';
import './Hero.css';

export function Hero() {
  const { messages } = useI18n();
  const linkTo = useLinkTo();
  const { hero, stats } = messages;

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-main">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            {profile.firstName} <span className="text-highlight">{profile.lastName}</span>
          </h1>
          <p className="hero-intro">{hero.intro}</p>
          <div className="button-row">
            <ButtonRouterLink to={linkTo(sectionPath('experience'))} iconEnd="arrow">
              {hero.viewExperience}
            </ButtonRouterLink>
            <ButtonLink href={profile.cvUrl} variant="secondary" iconStart="download" download>
              {hero.downloadCv}
            </ButtonLink>
          </div>
          <p className="hero-meta">
            <Icon name="pin" size={16} /> {hero.location}
          </p>
        </div>
        <CubeNetwork />
      </div>

      <div className="container">
        <ul className="stats">
          {stats.map((stat) => (
            <li key={stat.value} className="card stat">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
