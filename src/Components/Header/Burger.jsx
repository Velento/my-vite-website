import { useState, useEffect } from 'react';
import './Burger.css';
import Contacts from './Contacts';
import Menu from '../Main_page/Menu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import ContactModal from '../Main_page/ContactModal';

function Burger() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onEsc = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

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
      <button
        type="button"
        className={`header_burger ${isOpen ? 'slide_burger_menu' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className={`burger_line ${isOpen ? 'slide_burger_span1' : ''}`}></span>
        <span className={`burger_line ${isOpen ? 'slide_burger_span2' : ''}`}></span>
      </button>
      {isOpen && (
        <>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div className="burger_backdrop" onClick={toggleMenu} />
          <div className={`burger_menu_content ${isOpen ? 'burger_menu_content_active' : ''}`}>
            <LanguageSwitcher />
            <Menu />
            <div className="footer-section services">
              <button onClick={handleContactClick}>{t('footer.question')}</button>
              <ContactModal show={showContactModal} onClose={handleCloseModal} />
            </div>
            <Contacts />
          </div>
        </>
      )}
    </div>
  );
}

export default Burger;
