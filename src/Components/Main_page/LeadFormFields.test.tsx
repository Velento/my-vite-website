import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeadFormFields from './LeadFormFields';

// ── Mocks ────────────────────────────────────────────────────────────────────
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: unknown) => (typeof fallback === 'string' ? fallback : key),
  }),
}));

const sendLeadToTelegram = vi.fn();
vi.mock('../../services/telegram', () => ({
  sendLeadToTelegram: (...args: unknown[]) => sendLeadToTelegram(...args),
}));

vi.mock('../../services/analytics', () => ({
  trackFormStart: vi.fn(),
  trackLeadConversion: vi.fn(),
  trackContactClick: vi.fn(),
}));

// hCaptcha + focus-trap are third-party widgets irrelevant to the form logic.
vi.mock('@hcaptcha/react-hcaptcha', () => ({ default: () => null }));
vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

describe('LeadFormFields', () => {
  beforeEach(() => {
    sendLeadToTelegram.mockReset();
    sessionStorage.clear();
  });

  it('renders the name, phone and submit controls', () => {
    render(<LeadFormFields idPrefix="test" />);
    expect(screen.getByLabelText('feedbackForm.name')).toBeInTheDocument();
    expect(screen.getByLabelText('feedbackForm.phone')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'feedbackForm.submit' })).toBeInTheDocument();
  });

  it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<LeadFormFields idPrefix="test" />);

    await user.click(screen.getByRole('button', { name: 'feedbackForm.submit' }));

    expect(sendLeadToTelegram).not.toHaveBeenCalled();
  });

  it('shows a validation error once an invalid field is touched', async () => {
    const user = userEvent.setup();
    render(<LeadFormFields idPrefix="test" />);

    await user.type(screen.getByLabelText('feedbackForm.name'), 'A'); // shorter than min 2
    await user.tab(); // blur marks the field touched -> error renders

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(sendLeadToTelegram).not.toHaveBeenCalled();
  });

  it('sends valid data to the telegram service', async () => {
    sendLeadToTelegram.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    render(<LeadFormFields idPrefix="test" thankYouDelayMs={10} />);

    await user.type(screen.getByLabelText('feedbackForm.name'), 'Anna');
    await user.type(screen.getByLabelText('feedbackForm.phone'), '+48883734171');
    await user.click(screen.getByRole('button', { name: 'feedbackForm.submit' }));

    await waitFor(() => expect(sendLeadToTelegram).toHaveBeenCalledOnce());
    expect(sendLeadToTelegram).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Anna', phone: '+48883734171' })
    );
  });

  it('treats a filled honeypot as a bot: shows success without calling the network', async () => {
    const user = userEvent.setup();
    const { container } = render(<LeadFormFields idPrefix="test" thankYouDelayMs={10} />);

    await user.type(screen.getByLabelText('feedbackForm.name'), 'Anna');
    await user.type(screen.getByLabelText('feedbackForm.phone'), '+48883734171');

    const honeypot = container.querySelector<HTMLInputElement>('input[name="website"]');
    if (!honeypot) throw new Error('honeypot input not found');
    fireEvent.change(honeypot, { target: { value: 'http://spam.example' } });

    await user.click(screen.getByRole('button', { name: 'feedbackForm.submit' }));

    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(sendLeadToTelegram).not.toHaveBeenCalled();
  });
});
