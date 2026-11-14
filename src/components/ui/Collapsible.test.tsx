import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Collapsible } from './Collapsible';

// jsdom doesn't lay out content, so fake the measured heights
function mockHeights(scrollHeight: number, clientHeight: number) {
  vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(scrollHeight);
  vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(clientHeight);
}

function renderCollapsible() {
  return render(
    <Collapsible id="details" moreLabel="Show more" lessLabel="Show less">
      <p>Description</p>
    </Collapsible>,
  );
}

describe('Collapsible', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows short content in full, without a toggle', () => {
    mockHeights(80, 96);
    renderCollapsible();

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('expands and collapses long content', async () => {
    mockHeights(400, 96);
    const user = userEvent.setup();
    renderCollapsible();

    const showMore = screen.getByRole('button', { name: 'Show more' });
    expect(showMore).toHaveAttribute('aria-expanded', 'false');
    expect(showMore).toHaveAttribute('aria-controls', 'details');

    await user.click(showMore);
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.getByRole('button', { name: 'Show more' })).toHaveAttribute('aria-expanded', 'false');
  });
});
