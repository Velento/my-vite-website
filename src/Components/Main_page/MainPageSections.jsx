import React, { useState } from 'react';
import './MainPageSections.css';
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';
import kateFoto from '../images/Kate.png'; 
import sectionMoney from '../images/section_money.svg';
import sectionService from '../images/section_service.svg';
import sectionPlan from '../images/section_plan.svg';
import icon1 from '../images/icon1.svg';

const MainPageSections = () => {
  const { t } = useTranslation();
  
  const Section = ({ title, content, imgSrc, iconSrc, buttonText, buttonLink }) => {
    const [showContactModal, setShowContactModal] = useState(false);

    const handleShowModal = () => setShowContactModal(true);
    const handleCloseModal = () => setShowContactModal(false);

    return (
      <div className="section">
        <h3>{title}</h3>
        {iconSrc && <img src={iconSrc} alt={`${title} icon`} className="section-icon" />}
        <div className="section-content">
          <p>{content}</p>
          {imgSrc && <img src={imgSrc} alt="Section" className="kate_foto" />}
        </div>
        {buttonLink ? (
          <a href={buttonLink} target="_blank" rel="noopener noreferrer">
            <button>{buttonText}</button>
          </a>
        ) : (
          <button className="button-i-want" onClick={handleShowModal}>{buttonText}</button>
        )}
        
        <ContactModal show={showContactModal} onClose={handleCloseModal} />
      </div>
    );
  };

  return (
    <div>
      <div className="benefits-intro" id="advantages">
        <h2 className="benefits-h2">{t('benefits.title')}</h2>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason1.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason1.content')}</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason2.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason2.content')}</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason3.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason3.content')}</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason4.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason4.content')}</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason5.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason5.content')}</p>
        </div>
        <div className="benefit-item">
          <img src={icon1} alt="Icon" className="benefit-icon" />
          <strong className="benefits-reasons-strong">{t('benefits.reason6.title')}</strong>
          <p className="benefits-answers-p">{t('benefits.reason6.content')}</p>
        </div>
      </div>

      <div className="main-page-sections">
        <div className="left-column">
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
        <div className="right-column">
          <Section
            title={t('section4.title')}
            imgSrc={kateFoto}
            content={t('section4.content')}
            buttonText={t('section4.buttonText')}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPageSections;
