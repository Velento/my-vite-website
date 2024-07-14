import React, { useState } from 'react';
import './MainPageSections.css';
import kateFoto from '../images/Kate.png'; 
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';

function openViberChat(e) {
    e.preventDefault();
    const viberUrl = "viber://chat?number=%2B375295817240";
    const fallbackUrl = "https://www.viber.com/download/";
  
    // Попытка открыть Viber
    window.location.href = viberUrl;
  
    // Если Viber не установлен, перенаправляем на fallback URL
    setTimeout(() => {
      if (!document.hasFocus()) {
        return;
      }
      window.location.href = fallbackUrl;
    }, 500);
}

const Section = ({ title, content, imgSrc, buttonText, buttonLink }) => {
  const [showContactModal, setShowContactModal] = useState(false);

  const handleShowModal = () => setShowContactModal(true);
  const handleCloseModal = () => setShowContactModal(false);

  return (
    <div className="section">
      <h3>{title}</h3>
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

const MainPageSections = () => {
  const { t } = useTranslation();
  return (
    <div className="main-page-sections">
      <div className="left-column">
        <Section
          title={t('section1.title')}
          content={t('section1.content')}
          buttonText={t('section1.buttonText')}
        />
        <Section
          title={t('section2.title')}
          content={t('section2.content')}
          buttonText={t('section2.buttonText')}
        />
        <Section
          title={t('section3.title')}
          content={t('section3.content')}
          buttonText={t('section3.buttonText')}
          buttonLink="https://www.instagram.com/katringoncharuk/"
        />
      </div>
      <div className="right-column">
        <Section
          title={t('section4.title')}
          imgSrc={kateFoto}
          content={t('section4.content')}
          buttonText={t('section4.buttonText')}
        />
        <Section
          title={t('section5.title')}
          content={t('section5.content')}
          buttonText={t('section5.buttonText')}
        />
      </div>
    </div>
  );
};

export default MainPageSections;

