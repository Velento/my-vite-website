import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import './MainPageSections.css';
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';
import kateFoto from '../images/Kate.webp';
import sectionMoney from '../images/section_money.svg';
import sectionService from '../images/section_service.svg';
import icon1 from '../images/icon1.svg';

/**
 * Individual content section card with optional image, icon, and CTA.
 * @param {{ title: string, content: string, imgSrc?: string, iconSrc?: string, buttonText: string, buttonLink?: string }} props
 */
const Section = memo(({ title, content, imgSrc, iconSrc, buttonText, buttonLink }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <article className="section">
      <h3 className="section__title">{title}</h3>
      {iconSrc && <img src={iconSrc} alt="" className="section__icon" />}
      <div className="section__content">
        <p>{content}</p>
        {imgSrc && <img src={imgSrc} alt={title} className="section__image" loading="lazy" />}
      </div>
      {buttonLink ? (
        <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="section__cta">
          {buttonText}
        </a>
      ) : (
        <button type="button" className="section__cta" onClick={() => setShowContactModal(true)}>
          {buttonText}
        </button>
      )}
      <ContactModal show={showContactModal} onClose={() => setShowContactModal(false)} />
    </article>
  );
});

Section.displayName = 'Section';

Section.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  iconSrc: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  buttonLink: PropTypes.string,
};

/**
 * Single benefit row — icon + title + description.
 * @param {{ title: string, content: string }} props
 */
const BenefitItem = memo(({ title, content }) => (
  <div className="benefit-item">
    <img src={icon1} alt="" className="benefit-item__icon" />
    <strong className="benefit-item__title">{title}</strong>
    <p className="benefit-item__content">{content}</p>
  </div>
));

BenefitItem.displayName = 'BenefitItem';

BenefitItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

/** @type {string[]} Translation keys for benefit items */
const BENEFIT_KEYS = ['reason1', 'reason2', 'reason3', 'reason4', 'reason5', 'reason6'];

/**
 * Main page sections: benefits list + two-column content cards.
 */
const MainPageSections = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="benefits-intro" id="advantages">
        <h2 className="benefits-intro__title">{t('benefits.title')}</h2>
        {BENEFIT_KEYS.map((key) => (
          <BenefitItem
            key={key}
            title={t(`benefits.${key}.title`)}
            content={t(`benefits.${key}.content`)}
          />
        ))}
      </section>

      <section className="main-page-sections">
        <div className="main-page-sections__left">
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
        </div>
        <div className="main-page-sections__right">
          <Section
            title={t('section4.title')}
            imgSrc={kateFoto}
            content={t('section4.content')}
            buttonText={t('section4.buttonText')}
          />
        </div>
      </section>
    </>
  );
};

export default MainPageSections;
