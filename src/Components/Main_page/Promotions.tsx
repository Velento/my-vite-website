import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { TranslationKey } from '../../i18n/keys';
import { trackCTAClick } from '../../services/analytics';
import './Promotions.css';

const ContactModal = lazy(() => import('./ContactModal'));

const PROMOS = [0, 1, 2] as const;
/** Index of the offer to spotlight as the most popular one. */
const FEATURED = 1;

const pad = (n: number) => String(n).padStart(2, '0');

/** Live countdown to the last moment of the current month (the promo deadline). */
function useMonthEndCountdown() {
  const [diff, setDiff] = useState(() => msToMonthEnd());
  useEffect(() => {
    const id = setInterval(() => setDiff(msToMonthEnd()), 1000);
    return () => clearInterval(id);
  }, []);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function msToMonthEnd() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return Math.max(0, end.getTime() - now.getTime());
}

const Promotions = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { days, hours, minutes, seconds } = useMonthEndCountdown();

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
        <div className="promo__countdown" role="timer" aria-label={t('promo.endsIn')}>
          <span className="promo__countdown-label">{t('promo.endsIn')}</span>
          <span className="promo__countdown-time">
            {days > 0 && (
              <>
                <b>{days}</b>
                <i>d</i>
              </>
            )}
            <b>{pad(hours)}</b>
            <i>:</i>
            <b>{pad(minutes)}</b>
            <i>:</i>
            <b>{pad(seconds)}</b>
          </span>
        </div>
      </div>

      <div className="promo__grid">
        {PROMOS.map((i) => {
          const oldPrice = t(`promo.${i}.old` as TranslationKey);
          const featured = i === FEATURED;
          return (
            <article className={`promo-card${featured ? ' promo-card--featured' : ''}`} key={i}>
              {featured && <span className="promo-card__ribbon">{t('promo.popular')}</span>}
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
