import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import type { Locale } from './i18n/locales';

function renderAt(path: string, locale?: Locale) {
  window.history.replaceState(null, '', path);
  return render(<App initialLocale={locale} />);
}

describe('App', () => {
  it('renders the home page in English', () => {
    renderAt('/', 'en');

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Gustavo Simões de Moraes');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Gustavo Simões de Moraes · Software Engineer');
  });

  it('opens each section as its own page from the menu', async () => {
    const user = userEvent.setup();
    renderAt('/', 'en');

    await user.click(screen.getByRole('link', { name: 'Experience' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'page');
    expect(window.location.pathname).toBe('/experience');
    expect(document.title).toBe('Experience · Gustavo Simões de Moraes');
  });

  it('switches language, then remembers and shares the choice', async () => {
    const user = userEvent.setup();
    renderAt('/about', 'en');

    await user.click(screen.getByRole('button', { name: 'Language: English' }));
    await user.click(screen.getByRole('button', { name: 'Nederlands' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Veilige systemen, gebouwd om te schalen' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Taal: Nederlands' })).toHaveAttribute('aria-expanded', 'false');
    expect(document.documentElement.lang).toBe('nl');
    expect(localStorage.getItem('locale')).toBe('nl');
    expect(window.location.search).toBe('?lang=nl');
    // Links to other pages keep the language
    expect(screen.getByRole('link', { name: 'Vaardigheden' })).toHaveAttribute('href', '/skills?lang=nl');
  });

  it('opens a shared link in its language, with localized dates', () => {
    renderAt('/experience?lang=pt');

    expect(screen.getByRole('heading', { level: 1, name: 'Experiência' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Experiência' })).toHaveTextContent(/mar\.? de 2025/);
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(document.title).toBe('Experiência · Gustavo Simões de Moraes');
  });

  it('shows a not-found page for unknown addresses', () => {
    renderAt('/nope', 'en');

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  });

  it('toggles the color theme', async () => {
    const user = userEvent.setup();
    renderAt('/', 'en');

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });
});
