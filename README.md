# Gustavo Moraes · Portfolio

Personal portfolio site built with React 18, TypeScript and Vite. Design: style P (cube network) with the GM Signature theme, dark and light.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

The static site is written to `dist/`. Asset paths are relative (`base: './'` in `vite.config.ts`), so the same build works at `username.github.io` and at a project URL like `username.github.io/portfolio/`.

## Deploy to GitHub Pages

Deployment is automatic through `.github/workflows/deploy.yml`: every push to `main` builds the site and publishes it.

One-time setup:

1. Create a repository on GitHub. Name it `<your-username>.github.io` for the site to live at `https://<your-username>.github.io`, or any other name (for example `portfolio`) for `https://<your-username>.github.io/portfolio/`.
2. Push this folder (`portfolio-site`) as the repository root, on the `main` branch.
3. In the repository, open **Settings › Pages** and set **Source** to **GitHub Actions**.
4. Wait for the "Deploy to GitHub Pages" run in the **Actions** tab to finish. The site URL appears in the run summary.

## Edit the content

All text (profile, selected work, experience, skills, contact) lives in `src/data/profile.ts`. Components never need to change for content updates.

- The CV served by the "Download CV" button is `public/Gustavo-Simoes-de-Moraes-CV.pdf`.
- The Jumbo role still has a placeholder bullet: search for `TODO` in `src/data/profile.ts`.

## Structure

```
src/
  data/profile.ts        all site content
  hooks/useTheme.ts      dark/light toggle, saved in localStorage
  components/            Nav, Hero, CubeNetwork, Work, About, Experience, Skills, Contact, Footer
  styles.css             theme tokens and all styles
```
