import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { SECTION_IDS } from './data/sections';
import { I18nProvider } from './i18n/I18nProvider';
import type { Locale } from './i18n/locales';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SectionPage } from './pages/SectionPage';

// The router wants the site's base path without the trailing slash: "/portfolio", or "/" at the domain root
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

interface AppProps {
  /** Skips language detection, e.g. in tests. */
  initialLocale?: Locale;
}

/** Composition root: wires the providers and the pages. */
export default function App({ initialLocale }: AppProps) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <BrowserRouter basename={BASENAME}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {SECTION_IDS.map((id) => (
              <Route key={id} path={id} element={<SectionPage id={id} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
