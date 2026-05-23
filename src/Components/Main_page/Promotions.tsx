import { useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { TranslationKey } from '../../i18n/keys';
import { trackCTAClick } from '../../services/analytics';
import './Promotions.css';

const ContactModal = lazy(() => import('./ContactModal'));

const PROMOS = [0, 1, 2] as const;

const Promotions = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    trackCTAClick('promotions');
    setShowModal(true);
  };

  return (
    <section className="promo" id="promotions" aria-labelledby="promo-title">
      <div className="promo__head">
        <span className="promo__eyebrow">{t('promo.badge')}</span>
        <h2 className="promo__title" id="promo-title">
          {t('promo.title')}
        </h2>
        <p className="promo__deadline">
          {t('promo.deadline')}
          <span className="promo__code">
            {t('promo.codeLabel')} <strong>{t('promo.code')}</strong>
          </span>
        </p>
      </div>

      <div className="promo__grid">
        {PROMOS.map((i) => {
          const oldPrice = t(`promo.${i}.old` as TranslationKey);
          return (
            <article className="promo-card" key={i}>
              <span className="promo-card__badge">{t('promo.badge')}</span>
              <h3 className="promo-card__name">{t(`promo.${i}.name` as TranslationKey)}</h3>
              <div className="promo-card__pricing">
                {oldPrice && <span className="promo-card__old">{oldPrice}</span>}
                <span className="promo-card__new">{t(`promo.${i}.new` as TranslationKey)}</span>
              </div>
              <button type="button" className="promo-card__cta" onClick={openModal}>
                {t('promo.cta')}
              </button>
            </article>
          );
        })}
      </div>

      <Suspense fallback={null}>
        <ContactModal show={showModal} onClose={() => setShowModal(false)} />
      </Suspense>
    </section>
  );
};

export default Promotions;
