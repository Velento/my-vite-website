import type { ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: unknown) => (typeof fallback === 'string' ? fallback : key),
  }),
}));

vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

describe('Modal', () => {
  it('renders nothing when show is false', () => {
    const { container } = render(
      <Modal show={false} onClose={() => {}}>
        <p>Body</p>
      </Modal>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the dialog and its children when show is true', () => {
    render(
      <Modal show onClose={() => {}}>
        <p>Body content</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal show onClose={onClose}>
        <p>Body</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal show onClose={onClose}>
        <p>Body</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('stays open when the content area is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal show onClose={onClose}>
        <p>Body content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('Body content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on the Escape key', () => {
    const onClose = vi.fn();
    render(
      <Modal show onClose={onClose}>
        <p>Body</p>
      </Modal>
    );
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
