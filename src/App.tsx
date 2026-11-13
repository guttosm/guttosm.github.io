import { About } from './components/About';
import ClickSpark from './components/ClickSpark';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Skills } from './components/Skills';
import { Work } from './components/Work';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ClickSpark
      selector="button, .button"
      sparkColor={['#8b5cf6', '#06b6d4', '#ec4899']}
      sparkSize={12}
      sparkRadius={28}
      sparkCount={10}
      duration={450}
      zIndex={50}
      style={{ height: 'auto' }}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ClickSpark>
  );
}
