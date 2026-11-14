import { Hero } from '../components/sections/Hero';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
  usePageTitle();
  return <Hero />;
}
