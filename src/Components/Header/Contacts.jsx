import React from 'react';
import './Header.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';

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

function Contacts() {
  return (
    <div className="header-contacts">
            <button class="contact-btn" onclick="window.location.href='tel:+48777888999'">Позвонить</button>
            <a href="tel:+48777888999" class="contact-link">+48 777 888 999</a>
            <span class="tooltip">Позвонить</span>
      <div className="div_icons">
        <a href="https://t.me/katringoncharuk" target="_blank" rel="noopener noreferrer">
          <span className="tooltip">Telegram</span>
          <img src={telegramIcon} alt="Telegram" className="contact-icon" />
        </a>
        <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
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

