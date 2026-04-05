import { useTranslation } from 'react-i18next';
import './TrustBar.css';

const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="trust-bar" aria-label="Trust indicators">
      <div className="trust-bar__inner">
        <div className="trust-bar__item">
          <strong className="trust-bar__number">500+</strong>
          <span className="trust-bar__label">{t('trustBar.clients')}</span>
        </div>
        <div className="trust-bar__item">
          <strong className="trust-bar__number">5+</strong>
          <span className="trust-bar__label">{t('trustBar.experience')}</span>
        </div>
        <div className="trust-bar__item">
          <strong className="trust-bar__number">5</strong>
          <span className="trust-bar__label">{t('trustBar.languages')}</span>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
