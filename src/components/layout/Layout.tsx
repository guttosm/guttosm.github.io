import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import ClickSpark from '../ui/ClickSpark';
import { Footer } from './Footer';
import { Nav } from './Nav';
import { SkipLink } from './SkipLink';
import './Layout.css';

const SPARK_COLORS = ['#8b5cf6', '#06b6d4', '#ec4899'];

/** The frame every page shares: header, main content and footer. */
export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lastPathname = useRef(pathname);

  // On a page change, start at the top and move focus to the new content, like a full page load
  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <ClickSpark
      selector="button, .button"
      sparkColor={SPARK_COLORS}
      sparkSize={12}
      sparkRadius={28}
      sparkCount={10}
      duration={450}
      zIndex={50}
      style={{ height: 'auto' }}
    >
      <SkipLink />
      <Nav />
      <main id="main" ref={mainRef} tabIndex={-1} className="site-main">
        <Outlet />
      </main>
      <Footer />
    </ClickSpark>
  );
}
