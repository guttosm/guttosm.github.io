# Gustavo Moraes · Portfolio

Personal portfolio site in English, Portuguese and Dutch, built with React 18, TypeScript and Vite. Design: cube-network hero with the GM Signature theme, in dark and light.

## Scripts

Requires Node.js 18 or newer.

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:5173 |
| `npm test` | Run the tests (Vitest and Testing Library) |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Type-check and build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |

## Edit the content

- **Same in every language** (contact details, companies, dates, tech names): `src/data/profile.ts`
- **Text in each language:** `src/i18n/messages/en.ts`, `pt.ts` and `nl.ts`
- **The CV behind "Download CV":** `public/Gustavo-Simoes-de-Moraes-CV.pdf`

The Jumbo role still has placeholder text in each language file: search for `TODO`.

- **Company icons:** `public/logos/`, taken from each company's official website and linked in `src/data/profile.ts`.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home: introduction and key numbers |
| `/about` | About |
| `/experience` | Experience timeline |
| `/skills` | Stack, education and languages |
| `/contact` | Contact |

Any other address shows a "page not found" page. Pages are client-side routes (React Router), so moving between them keeps the language and theme without reloading.

To add a page: add its id to `SECTION_IDS` (`src/data/sections.ts`), its component to `SECTIONS` (`src/pages/SectionPage.tsx`), and its menu label to each language file.

Every language file must implement the `Messages` interface in `src/i18n/types.ts`, so a missing translation fails the type check, and the tests catch empty text.

## Languages

The site picks a language in this order:

1. A `?lang=` link, for example `?lang=nl`
2. The visitor's earlier choice
3. The browser's language
4. English

Switching language updates the address bar, and links between pages keep it, so any link you copy opens in that language. Dates are formatted per language with `Intl.DateTimeFormat`.

To add a language:

1. Copy `src/i18n/messages/en.ts` to a new file and translate it.
2. Register it in `LOCALES` (`src/i18n/locales.ts`) and in `dictionaries` (`src/i18n/dictionaries.ts`).

## Architecture

```
src/
  App.tsx        composition root: providers and routes
  pages/         route-level components: home, one page per section, not found
  data/          language-neutral content and ids
  i18n/          languages, translations, detection, date formatting, provider
  hooks/         theme, clipboard, page title, links, Escape key
  components/
    ui/          reusable building blocks: ButtonLink, IconButton, TagList, CompanyLogo…
    layout/      page frame, header, language switcher, theme toggle, footer
    sections/    page content, each with its own stylesheet
  styles/        theme tokens and global base styles
```

How the code follows SOLID:

- **Single responsibility:** content, translations, formatting, side effects (in hooks) and presentation live in separate modules.
- **Open/closed:** a new language, job, skill group or page is a registry or data change, and existing components stay untouched. Building blocks take variants instead of being copied.
- **Liskov substitution:** every language implements the same `Messages` interface, so any one can replace another.
- **Interface segregation:** components take small, specific props and read only their own section's text.
- **Dependency inversion:** components depend on the `useI18n()` abstraction, not on concrete content files. The provider is wired in one place (`App`), and tests inject a fixed language.

Design patterns: Provider (React context) for translations, custom hooks for side effects, registries for languages and icons, a priority chain for language detection, and an adapter over `Intl.DateTimeFormat` for dates.

## Deploy to GitHub Pages

Deployment is automatic through `.github/workflows/deploy.yml`: every push to `main` runs lint, tests and the build, then publishes the site.

- **Base path:** the workflow asks GitHub Pages for the site's address and builds for it with `--base`: `/` for `username.github.io`, `/portfolio/` for a project site. Local builds use `/`.
- **Direct links:** GitHub Pages has no file for addresses like `/experience`, so it serves `404.html`. The build makes that a copy of `index.html` (see `vite.config.ts`), so the app loads and shows the right page. Search engines see those addresses as 404s, which matters little for a portfolio shared by link.

One-time setup:

1. Create a repository on GitHub. Name it `<your-username>.github.io` for the site to live at `https://<your-username>.github.io`, or any other name (for example `portfolio`) for `https://<your-username>.github.io/portfolio/`.
2. In the repository, open **Settings › Pages** and set **Source** to **GitHub Actions**.
3. Push this folder (`portfolio-site`) as the repository root, on the `main` branch.
4. Wait for the "Deploy to GitHub Pages" run in the **Actions** tab to finish. The site URL appears in the run summary.
