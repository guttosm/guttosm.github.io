import type { ReactNode } from 'react';
import { skillGroups, type SkillGroupId } from '../../data/profile';
import { useI18n } from '../../i18n/useI18n';
import { accentAt } from '../../utils/accent';
import { MagicBento } from '../ui/MagicBento';
import { BentoBars, BentoHub, BentoPipeline, BentoToggles } from '../ui/MagicBentoVisuals';
import { Section } from '../ui/Section';
import { SectionHeader } from '../ui/SectionHeader';
import { TagList } from '../ui/TagList';
import './Skills.css';

// Bento layout on three columns: wide and narrow cards alternate, so every row fills up. Wide cards put
// their visual beside the chips, which keeps them about as tall as the narrow card next to them.
//   [ identity + toggles   ][ languages    ]
//   [ aws + EKS ][ devops + pipeline       ]
//   [ data + hub           ][ gcp + GKE    ]
const BENTO_ORDER: readonly SkillGroupId[] = ['identity', 'languages', 'aws', 'devops', 'data', 'gcp'];
const WIDE_GROUPS: ReadonlySet<SkillGroupId> = new Set(['identity', 'devops', 'data']);

// Animated visuals from Magic Bento, drawn with technologies from each group
const VISUALS: Partial<Record<SkillGroupId, ReactNode>> = {
  identity: (
    <BentoToggles
      settings={[
        { icon: 'key', label: 'SSO · Okta' },
        { icon: 'fingerprint', label: 'MFA · Duo' },
        { icon: 'users', label: 'SCIM provisioning' },
      ]}
    />
  ),
  devops: (
    <BentoPipeline
      trigger="git push"
      meta="main · GitHub Actions"
      steps={['Build', 'Test', 'Docker image', 'Helm deploy · canary']}
    />
  ),
  // Java and Go services publish events through Kafka into the databases
  data: (
    <BentoHub
      center="Kafka"
      nodes={[
        { label: 'Java', x: 16, y: 20 },
        { label: 'Go', x: 16, y: 80 },
        { label: 'PostgreSQL', x: 82, y: 20 },
        { label: 'MongoDB', x: 82, y: 80 },
      ]}
    />
  ),
};

// Cluster dashboards for the cloud cards: decorative bars (a week, in % of the tallest), no real metrics
const CLUSTER_BARS: Partial<Record<SkillGroupId, { cluster: string; bars: readonly number[] }>> = {
  aws: { cluster: 'EKS', bars: [42, 58, 49, 71, 63, 88, 76] },
  gcp: { cluster: 'GKE', bars: [36, 52, 61, 47, 74, 66, 83] },
};

export function Skills() {
  const { messages } = useI18n();
  const copy = messages.skills;

  const visualFor = (id: SkillGroupId) => {
    const dashboard = CLUSTER_BARS[id];
    return dashboard ? (
      <BentoBars value={dashboard.cluster} note={copy.clusterLoad} bars={dashboard.bars} />
    ) : (
      VISUALS[id]
    );
  };

  return (
    <Section id="skills" className="stack-lg">
      <SectionHeader section="skills" title={copy.title} />
      <MagicBento
        columns={3}
        minCellWidth={260}
        gap={20}
        enableStars
        items={[...skillGroups]
          .sort((a, b) => BENTO_ORDER.indexOf(a.id) - BENTO_ORDER.indexOf(b.id))
          .map((group, index) => {
            const visual = visualFor(group.id);
            return {
              id: group.id,
              colSpan: WIDE_GROUPS.has(group.id) ? 2 : 1,
              className: `skill-card skill-card-${group.id}`,
              content: (
                <>
                  <div className="skill-card-text">
                    <h3>
                      <span className={`swatch accent-${accentAt(index)}`} aria-hidden="true" />
                      {copy.groups[group.id]}
                    </h3>
                    <TagList items={group.items} variant="chip" />
                  </div>
                  {visual && <div className="magic-bento__visual skill-visual">{visual}</div>}
                </>
              ),
            };
          })}
      />
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
