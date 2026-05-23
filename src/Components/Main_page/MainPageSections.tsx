import { useState, memo, lazy, Suspense } from 'react';
import './MainPageSections.css';
import { useTranslation } from 'react-i18next';
import { trackCTAClick } from '../../services/analytics';

const ContactModal = lazy(() => import('./ContactModal'));
import sectionMoney from '../images/section_money.svg';
import sectionService from '../images/section_service.svg';
import icon1 from '../images/icon1.svg';

type SectionProps = {
  title: string;
  content: string;
  imgSrc?: string;
  iconSrc?: string;
  buttonText: string;
  buttonLink?: string;
};

const Section = memo(function Section({
  title,
  content,
  imgSrc,
  iconSrc,
  buttonText,
  buttonLink,
}: SectionProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <article className="section">
      <h3 className="section__title">{title}</h3>
      {iconSrc && (
        <img
          src={iconSrc}
          alt=""
          className="section__icon"
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="section__content">
        <p>{content}</p>
        {imgSrc && (
          <img
            src={imgSrc}
            alt={title}
            className="section__image"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      {buttonLink ? (
        <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="section__cta">
          {buttonText}
        </a>
      ) : (
        <button
          type="button"
          className="section__cta"
          onClick={() => {
            trackCTAClick(title);
            setShowContactModal(true);
          }}
        >
          {buttonText}
        </button>
      )}
      <Suspense fallback={null}>
        <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
      </Suspense>
    </article>
  );
});

type BenefitItemProps = {
  title: string;
  content: string;
};

const BenefitItem = memo(function BenefitItem({ title, content }: BenefitItemProps) {
  return (
    <div className="benefit-item">
      <img
        src={icon1}
        alt=""
        className="benefit-item__icon"
        width={24}
        height={24}
        decoding="async"
      />
      <strong className="benefit-item__title">{title}</strong>
      <p className="benefit-item__content">{content}</p>
    </div>
  );
});

/** Translation key suffixes for benefit items. `as const` keeps the
 *  `benefits.<key>.title` lookups statically checked against the locale. */
const BENEFIT_KEYS = ['reason1', 'reason2', 'reason3', 'reason4', 'reason5', 'reason6'] as const;

/**
 * Main page sections: benefits list + two-column content cards.
 */
const MainPageSections = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="benefits-intro" id="advantages">
        <h2 className="benefits-intro__title">{t('benefits.title')}</h2>
        <div className="benefits-grid">
          {BENEFIT_KEYS.map((key) => (
            <BenefitItem
              key={key}
              title={t(`benefits.${key}.title`)}
              content={t(`benefits.${key}.content`)}
            />
          ))}
        </div>
      </section>

      <section className="main-page-sections">
        <Section
          title={t('section1.title')}
          content={t('section1.content')}
          iconSrc={sectionMoney}
          buttonText={t('section1.buttonText')}
        />
        <Section
          title={t('section2.title')}
          content={t('section2.content')}
          iconSrc={sectionService}
          buttonText={t('section2.buttonText')}
        />
      </section>
    </>
  );
};

export default MainPageSections;
