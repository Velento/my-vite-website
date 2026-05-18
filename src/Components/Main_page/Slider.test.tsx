import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SliderComponent from './Slider';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) =>
      opts && typeof opts.defaultValue === 'string' ? opts.defaultValue : key,
  }),
}));

describe('SliderComponent', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders three slides with the first one active', () => {
    const { container } = render(<SliderComponent />);
    const slides = container.querySelectorAll('.slider-slide');
    expect(slides).toHaveLength(3);
    expect(slides[0]).toHaveClass('is-active');
    expect(slides[1]).not.toHaveClass('is-active');
    expect(slides[2]).not.toHaveClass('is-active');
  });

  it('renders three pagination dots', () => {
    const { container } = render(<SliderComponent />);
    expect(container.querySelectorAll('.slider-dot')).toHaveLength(3);
  });

  it('activates the matching slide when a pagination dot is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<SliderComponent />);
    const dots = container.querySelectorAll<HTMLButtonElement>('.slider-dot');
    const thirdDot = dots[2];
    if (!thirdDot) throw new Error('expected three pagination dots');

    await user.click(thirdDot);

    const slides = container.querySelectorAll('.slider-slide');
    expect(slides[2]).toHaveClass('is-active');
    expect(slides[0]).not.toHaveClass('is-active');
  });

  it('auto-advances to the next slide after the autoplay interval', () => {
    vi.useFakeTimers();
    const { container } = render(<SliderComponent />);
    expect(container.querySelectorAll('.slider-slide')[0]).toHaveClass('is-active');

    act(() => {
      vi.advanceTimersByTime(4500);
    });

    expect(container.querySelectorAll('.slider-slide')[1]).toHaveClass('is-active');
  });
});
