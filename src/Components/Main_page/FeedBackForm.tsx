import FocusTrap from 'focus-trap-react';
import { useTranslation } from 'react-i18next';
import LeadFormFields from './LeadFormFields';
import './FeedBackForm.css';

type FeedbackFormProps = {
  onClose?: () => void;
};

const FeedbackForm = ({ onClose }: FeedbackFormProps) => {
  const { t } = useTranslation();
  const handleClose = () => onClose?.();

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className="feedback-modal"
        id="feed-back"
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        role="dialog"
        aria-modal="true"
        aria-label={t('feedbackForm.title')}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div className="feedback-modal__content" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="feedback-modal__close"
            onClick={handleClose}
            aria-label={t('feedbackForm.cancel', 'Close')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
          <h2>{t('feedbackForm.title')}</h2>
          <LeadFormFields
            idPrefix="feedback"
            thankYouDelayMs={5000}
            onClose={handleClose}
            onCancel={handleClose}
          />
        </div>
      </div>
    </FocusTrap>
  );
};

export default FeedbackForm;
