import { useTranslation } from 'react-i18next';
import type { TranslationKey } from '../../i18n/keys';
import './FAQ.css';

const FAQ_COUNT = 5;

/**
 * FAQ accordion built on native <details>/<summary>: accessible and keyboard-
 * friendly out of the box, fully present in the DOM for crawlers (and the
 * prerender), and matched by a per-language FAQPage JSON-LD block injected at
 * build time (scripts/prerender.mjs).
 */
const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <h2 className="faq__title" id="faq-title">
        {t('faq.title')}
      </h2>
      <div className="faq__list">
        {Array.from({ length: FAQ_COUNT }, (_, i) => (
          <details className="faq__item" key={i}>
            <summary className="faq__q">
              <span>{t(`faq.${i}.q` as TranslationKey)}</span>
              <svg
                className="faq__chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="faq__a">
              <p>{t(`faq.${i}.a` as TranslationKey)}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
