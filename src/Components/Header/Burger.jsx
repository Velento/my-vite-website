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
        className={`header_burger ${isOpen ? 'header_burger--open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <svg
          className="burger_icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line className="burger_icon__line burger_icon__line--top" x1="4" y1="7" x2="20" y2="7" />
          <line
            className="burger_icon__line burger_icon__line--mid"
            x1="4"
            y1="12"
            x2="20"
            y2="12"
          />
          <line
            className="burger_icon__line burger_icon__line--bot"
            x1="4"
            y1="17"
            x2="20"
            y2="17"
          />
        </svg>
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
