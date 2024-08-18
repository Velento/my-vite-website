import React, { useState } from 'react';
import './MainPageSections.css';
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';
import kateFoto from '../images/Kate.png'; 
import sectionMoney from '../images/section_money.svg';
import sectionService from '../images/section_service.svg';
import sectionGame from '../images/section_game.svg';
import sectionPlan from '../images/section_plan.svg';

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
    <div className="main-page-sections" id= "advantages">
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
        <Section
          title={t('section3.title')}
          content={t('section3.content')}
          iconSrc={sectionGame}
          buttonText={t('section3.buttonText')}
          buttonLink="https://www.instagram.com/legal_line_pl/"
        />
      </div>
      <div className="right-column">
        <Section
          title={t('section4.title')}
          imgSrc={kateFoto}
          content={t('section4.content')}
          // iconSrc={sectionInsta}
          buttonText={t('section4.buttonText')}
        />
        <Section className = "rightColumnSection_2"
          title={t('section5.title')}
          content={t('section5.content')}
          iconSrc={sectionPlan}
          buttonText={t('section5.buttonText')}
        />
      </div>
    </div>
  );
};

export default MainPageSections;
