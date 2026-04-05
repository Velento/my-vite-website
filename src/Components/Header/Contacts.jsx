import './Header.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import { useTranslation } from 'react-i18next';
import { openViberChat } from '../../services/viber';

function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="header-contacts burger-header-contacts">
      <a href="tel:+48883734171" className="contact-btn">
        {t('actionToCall')}
      </a>
      <a href="tel:+48883734171" className="contact-link">
        +48883734171
      </a>
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
        <a href="#!" onClick={openViberChat} rel="noopener noreferrer">
          <span className="tooltip">Viber</span>
          <img src={viberIcon} alt="Viber" className="contact-icon" />
        </a>
      </div>
    </div>
  );
}

export default Contacts;
