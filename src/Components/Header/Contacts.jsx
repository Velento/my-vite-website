import React from 'react';
import './Header.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import { useTranslation } from 'react-i18next';




function openViberChat(e) {
  e.preventDefault();
  const viberUrl = "viber://chat?number=%2B48883734171";
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

function Contacts() {
  const { t } = useTranslation();


  return (
    <div className="header-contacts burger-header-contacts">
      <button className="contact-btn" onClick={() => window.location.href = 'tel:+48883734171'}>
        {t('actionToCall')}
      </button>
      <a href="tel:+48883734171" className="contact-link">+48883734171</a>
      <span className="tooltip">{t('actionToCall')}</span>
      <div className="div_icons">
        <a href="https://t.me/LegalLine_pl" target="_blank" rel="noopener noreferrer">
          <span className="tooltip">Telegram</span>
          <img src={telegramIcon} alt="Telegram" className="contact-icon" />
        </a>
        <a href="https://wa.me/+48883734171" target="_blank" rel="noopener noreferrer">
          <span className="tooltip">WhatsApp</span>
          <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
        </a>
        <a href="#!" onClick={openViberChat}>
          <span className="tooltip">Viber</span>
          <img src={viberIcon} alt="Viber" className="contact-icon" />
        </a>
      </div>
    </div>
  );
}

export default Contacts;


