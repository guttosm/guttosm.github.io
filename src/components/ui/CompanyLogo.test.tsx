import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CompanyLogo } from './CompanyLogo';

describe('CompanyLogo', () => {
  it('shows the logo as a decorative image', () => {
    const { container } = render(<CompanyLogo org={{ name: 'PicPay', logo: '/logos/picpay.png' }} />);

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', '/logos/picpay.png');
    expect(image).toHaveAttribute('alt', '');
  });

  it('uses a custom tile color for logos drawn for dark backgrounds', () => {
    const { container } = render(
      <CompanyLogo org={{ name: 'Ewave', logo: '/logos/ewave.png', logoBackground: '#1e293b' }} />,
    );
    expect(container.querySelector('img')).toHaveStyle({ background: '#1e293b' });
  });

  it.each([
    ['Grupo Casas Bahia', 'GC'],
    ['SPC Brasil', 'SPC'],
    ['Engineering do Brasil', 'EB'],
    ['Jumbo', 'J'],
  ])('shows initials for %s when there is no logo', (name, expected) => {
    const { container } = render(<CompanyLogo org={{ name }} />);
    expect(container).toHaveTextContent(expected);
  });

  it('falls back to initials when the logo fails to load', () => {
    const { container } = render(<CompanyLogo org={{ name: 'Smart Staff', logo: '/logos/missing.png' }} />);

    fireEvent.error(container.querySelector('img')!);

    expect(container.querySelector('img')).toBeNull();
    expect(container).toHaveTextContent('SS');
  });

  it('renders nothing at the small size without a logo', () => {
    const { container } = render(<CompanyLogo org={{ name: 'Taking' }} size="sm" />);
    expect(container).toBeEmptyDOMElement();
  });
});
