import { jobs, profile } from '../../data/profile';
import { sectionPath } from '../../data/sections';
import { useLinkTo } from '../../hooks/useLinkTo';
import { useI18n } from '../../i18n/useI18n';
import { ButtonLink, ButtonRouterLink } from '../ui/ButtonLink';
import { Icon } from '../ui/Icon';
import { MagicBento } from '../ui/MagicBento';
import { BentoChart } from '../ui/MagicBentoVisuals';
import { StarBorder } from '../ui/StarBorder';
import { CubeNetwork } from './CubeNetwork';
import './Hero.css';

// One accent per stat card, each starting at a different point so the stars don't move in step
const STAT_STARS = [
  { color: 'var(--purple)', startAt: 0 },
  { color: 'var(--cyan)', startAt: 0.25 },
  { color: 'var(--magenta)', startAt: 0.5 },
];

const yearOf = (month: string) => Number(month.slice(0, 4));

/**
 * The graph in the first stat card: how many distinct technologies the roles started up to each year
 * list, from the first year in the experience data to the last. Fills in as roles get their tags.
 */
function stackByYear() {
  const first = Math.min(...jobs.map((job) => yearOf(job.start)));
  const last = Math.max(...jobs.flatMap((job) => (job.end ? [job.start, job.end] : [job.start])).map(yearOf));
  const years = Array.from({ length: last - first + 1 }, (_, index) => first + index);
  return {
    labels: years.map(String),
    values: years.map(
      (year) => new Set(jobs.filter((job) => yearOf(job.start) <= year).flatMap((job) => job.tags)).size,
    ),
  };
}

const STACK = stackByYear();

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
            <ButtonRouterLink
              to={linkTo(sectionPath('experience'))}
              iconEnd="arrow"
              starBorder={{ color: 'var(--cyan)', trailColor: 'var(--magenta)', thickness: 1.5, sparkle: true }}
            >
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
        <div className="stats">
          <MagicBento
            as="ul"
            columns={4}
            minCellWidth={200}
            gap={16}
            radius={14}
            enableStars
            items={stats.map((stat, index) => ({
              id: stat.value,
              // The first stat is the headline: a tall card with the graph, the others stack beside it
              colSpan: 2,
              rowSpan: index === 0 ? 2 : 1,
              className: 'stat',
              decoration: (
                <StarBorder {...STAT_STARS[index % STAT_STARS.length]} duration={7} glow={0.45} trailLength={0.35} />
              ),
              content: (
                <>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                  {index === 0 && (
                    <div className="magic-bento__visual stat-chart">
                      <BentoChart
                        values={STACK.values}
                        labels={STACK.labels}
                        format={hero.stackChart.count}
                        label={hero.stackChart.label}
                      />
                    </div>
                  )}
                </>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
