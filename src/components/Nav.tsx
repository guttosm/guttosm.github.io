import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/profile';
import type { Theme } from '../hooks/useTheme';
import { Icon } from './Icon';

interface NavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main">
        <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="monogram">{profile.initials}</span>
          <span className="brand-name">{profile.shortName}</span>
        </a>

        <div className="nav-actions">
          <ul id="nav-links" className={`nav-links${menuOpen ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="icon-button" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            type="button"
            className="icon-button menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  );
}
