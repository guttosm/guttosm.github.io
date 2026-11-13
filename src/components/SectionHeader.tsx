import type { ReactNode } from 'react';

interface SectionHeaderProps {
  route: string;
  title: ReactNode;
  lead?: string;
}

// Section labels are styled as API routes (GET /work, POST /contact)
export function SectionHeader({ route, title, lead }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className="route">{route}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
