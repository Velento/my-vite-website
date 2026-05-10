import { useTranslation } from 'react-i18next';
import LeadFormFields from './LeadFormFields';
import './LeedForm.css';

type LeedFormProps = {
  onClose?: () => void;
};

const LeedForm = ({ onClose }: LeedFormProps) => {
  const { t } = useTranslation();

  return (
    <section className="leed-form-container" id="leedform">
      <h2>{t('feedbackForm.title')}</h2>
      <LeadFormFields idPrefix="leedform" thankYouDelayMs={3000} onClose={onClose} />
    </section>
  );
};

export default LeedForm;
