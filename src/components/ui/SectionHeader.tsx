import type { ReactNode } from 'react';
import { sectionTitleId, type SectionId } from '../../data/sections';
import './SectionHeader.css';

interface SectionHeaderProps {
  section: SectionId;
  title: ReactNode;
  lead?: string;
}

export function SectionHeader({ section, title, lead }: SectionHeaderProps) {
  return (
    <div className="section-header">
      {/* Each section has its own page, so its title is the page's main heading */}
      <h1 id={sectionTitleId(section)}>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
