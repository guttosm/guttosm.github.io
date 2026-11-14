import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClipboard } from './useClipboard';

function mockClipboard(clipboard: Partial<Clipboard> | undefined) {
  Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });
}

describe('useClipboard', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('remembers the copied value, then forgets it', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard({ writeText });
    const { result } = renderHook(() => useClipboard(1000));

    let copied = false;
    await act(async () => {
      copied = await result.current.copy('gsimoes');
    });

    expect(copied).toBe(true);
    expect(writeText).toHaveBeenCalledWith('gsimoes');
    expect(result.current.copiedValue).toBe('gsimoes');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.copiedValue).toBeNull();
  });

  it('reports failure when the clipboard is unavailable', async () => {
    mockClipboard(undefined);
    const { result } = renderHook(() => useClipboard());

    let copied = true;
    await act(async () => {
      copied = await result.current.copy('gsimoes');
    });

    expect(copied).toBe(false);
    expect(result.current.copiedValue).toBeNull();
  });
});
