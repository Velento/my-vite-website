import React, { useState } from 'react';
import './Burger.css';
import Contacts from './Contacts';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import ContactModal from '../Main_page/ContactModal';

function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
  };

  return (
    <div>
      <div className={`header_burger ${isOpen ? 'slide_burger_menu' : ''}`} onClick={toggleMenu}>
        <span className={`burger_line ${isOpen ? 'slide_burger_span1' : ''}`}></span>
        <span className={`burger_line ${isOpen ? 'slide_burger_span2' : ''}`}></span>
      </div>
      {isOpen && (
        <div className={`burger_menu_content ${isOpen ? 'burger_menu_content_active' : ''}`}>
          <LanguageSwitcher />
          <div className="footer-section services">
          <h2><a href="#services">{t('footer.services')}</a></h2>
            <button onClick={handleContactClick}>{t('footer.question')}</button>
            <ContactModal show={showContactModal} onClose={handleCloseModal} />
          </div>
          <Contacts />
        </div>
      )}
    </div>
  );
}

export default Burger;
