import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { profile } from '../../data/profile';
import { SECTION_IDS, sectionPath } from '../../data/sections';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useLinkTo } from '../../hooks/useLinkTo';
import { useI18n } from '../../i18n/useI18n';
import { IconButton } from '../ui/IconButton';
import { LanguageMenu } from './LanguageMenu';
import { ThemeToggle } from './ThemeToggle';
import './Nav.css';

export function Nav() {
  const { messages } = useI18n();
  const linkTo = useLinkTo();
  const [menuOpen, setMenuOpen] = useState(false);
  const linksRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  useEscapeKey(closeMenu, menuOpen);
  useClickOutside([linksRef, menuButtonRef], closeMenu, menuOpen);

  return (
    <header className="site-header">
      <nav className="container nav" aria-label={messages.a11y.mainNav}>
        <Link to={linkTo('/')} className="brand" onClick={closeMenu}>
          <span className="monogram" aria-hidden="true">
            {profile.initials}
          </span>
          <span className="brand-name">{profile.shortName}</span>
        </Link>

        <div className="nav-actions">
          <ul id="nav-links" ref={linksRef} className={menuOpen ? 'nav-links open' : 'nav-links'}>
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <NavLink to={linkTo(sectionPath(id))} onClick={closeMenu}>
                  {messages.nav[id]}
                </NavLink>
              </li>
            ))}
          </ul>
          <LanguageMenu />
          <ThemeToggle />
          <IconButton
            ref={menuButtonRef}
            className="menu-button"
            icon={menuOpen ? 'close' : 'menu'}
            label={menuOpen ? messages.a11y.closeMenu : messages.a11y.openMenu}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
      </nav>
    </header>
  );
}
