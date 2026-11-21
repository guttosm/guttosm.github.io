import { Link, useLocation } from 'react-router';
import { profile } from '../../data/profile';
import { SECTION_IDS, sectionPath } from '../../data/sections';
import { useLinkTo } from '../../hooks/useLinkTo';
import { useI18n } from '../../i18n/useI18n';
import { PillNav } from '../ui/PillNav';
import { LanguageMenu } from './LanguageMenu';
import { ThemeToggle } from './ThemeToggle';
import './Nav.css';

export function Nav() {
  const { messages } = useI18n();
  const linkTo = useLinkTo();
  const { pathname } = useLocation();

  const items = SECTION_IDS.map((id) => ({ key: id, label: messages.nav[id], to: linkTo(sectionPath(id)) }));
  const activeIndex = SECTION_IDS.findIndex((id) => sectionPath(id) === pathname);

  return (
    <header className="site-header">
      <nav className="container nav" aria-label={messages.a11y.mainNav}>
        <Link to={linkTo('/')} className="brand">
          <span className="monogram" aria-hidden="true">
            {profile.initials}
          </span>
          {/* The monogram is the visible brand; the name stays for screen readers */}
          <span className="sr-only">{profile.shortName}</span>
        </Link>

        <div className="nav-actions">
          <PillNav
            items={items}
            activeIndex={activeIndex}
            openMenuLabel={messages.a11y.openMenu}
            closeMenuLabel={messages.a11y.closeMenu}
          />
          <LanguageMenu />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
