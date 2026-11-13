import { profile, stats } from '../data/profile';
import { CubeNetwork } from './CubeNetwork';
import { Icon } from './Icon';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-main">
        <div className="hero-copy">
          <p className="eyebrow">{profile.title}</p>
          <h1>
            {profile.firstName} <span className="text-purple">{profile.lastName}</span>
          </h1>
          <p className="hero-intro">{profile.intro}</p>
          <div className="button-row">
            <a href="#experience" className="button button-primary">
              View experience <Icon name="arrow" size={16} />
            </a>
            <a href={profile.cvUrl} className="button button-secondary" download>
              <Icon name="download" size={16} /> Download CV
            </a>
          </div>
          <p className="hero-meta">
            <Icon name="pin" size={16} /> {profile.location} · {profile.languagesLine}
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
