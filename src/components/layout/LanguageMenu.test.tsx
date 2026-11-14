import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { I18nProvider } from '../../i18n/I18nProvider';
import { LanguageMenu } from './LanguageMenu';

function renderMenu() {
  return render(
    <I18nProvider initialLocale="en">
      <MemoryRouter>
        <p>Outside</p>
        <LanguageMenu />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe('LanguageMenu', () => {
  it('shows the languages when the globe button is pressed', async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Language: English' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Português' })).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'Português' })).toHaveAttribute('lang', 'pt-BR');
    expect(screen.getByRole('button', { name: 'Nederlands' })).toBeInTheDocument();
  });

  it('switches language, then closes and returns focus to the globe button', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.click(screen.getByRole('button', { name: 'Language: English' }));
    await user.click(screen.getByRole('button', { name: 'Português' }));

    const trigger = screen.getByRole('button', { name: 'Idioma: Português' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Language: English' });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Language: English' });

    await user.click(trigger);
    await user.click(screen.getByText('Outside'));

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
