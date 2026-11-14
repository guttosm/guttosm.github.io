import type { ComponentType } from 'react';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Experience } from '../components/sections/Experience';
import { Skills } from '../components/sections/Skills';
import type { SectionId } from '../data/sections';
import { usePageTitle } from '../hooks/usePageTitle';
import { useI18n } from '../i18n/useI18n';

// A new page needs its id in SECTION_IDS and its section component here
const SECTIONS: Record<SectionId, ComponentType> = {
  about: About,
  experience: Experience,
  skills: Skills,
  contact: Contact,
};

/** A page that shows one section of the portfolio, titled after its menu label. */
export function SectionPage({ id }: { id: SectionId }) {
  const { messages } = useI18n();
  usePageTitle(messages.nav[id]);
  const Content = SECTIONS[id];
  return <Content />;
}
