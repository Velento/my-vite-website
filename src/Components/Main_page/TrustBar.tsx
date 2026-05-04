import { useTranslation } from 'react-i18next';
import './TrustBar.css';

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="trust-bar" aria-label="Trust indicators">
      <div className="trust-bar__inner">
        <TrustItem number="500+" label={t('trustBar.clients')} />
        <TrustItem number="5+" label={t('trustBar.experience')} />
        <TrustItem number="5" label={t('trustBar.languages')} />
      </div>
    </section>
  );
};

type TrustItemProps = { number: string; label: string };

const TrustItem = ({ number, label }: TrustItemProps) => (
  <div className="trust-item">
    <strong className="trust-item__number">{number}</strong>
    <span className="trust-item__label">{label}</span>
  </div>
);

export default TrustBar;
