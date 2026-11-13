import { focusAreas } from '../data/profile';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';

export function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div className="about-copy">
          <SectionHeader route="GET /about" title="Secure systems, built to scale" />
          <p className="about-lead">
            I'm a software engineer with 11+ years of experience building event-driven microservices in Java and Go.
            I specialize in identity and access management with Okta, SAML, OAuth and SCIM, cloud infrastructure on
            AWS and GCP, and Kubernetes-based delivery.
          </p>
          <p className="muted">
            Most recently I was a Senior Software Engineer at Jumbo in the Netherlands, after roles at Ambush, working
            on Binance's Wallet, and at the fintechs Clara and PicPay.
          </p>
          <p className="muted">Away from the keyboard: behavioral economics, dog training, the gym and anime.</p>
        </div>
        <ul className="focus-list">
          {focusAreas.map((area) => (
            <li key={area.title} className="card focus-card">
              <span className={`focus-icon accent-${area.accent}`}>
                <Icon name={area.icon} size={22} />
              </span>
              <div>
                <h3>{area.title}</h3>
                <p className="muted">{area.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
