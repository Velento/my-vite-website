import './Header.css';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import { openViberChat } from '../../services/viber';
import { trackContactClick } from '../../services/analytics';

function Contacts() {
  return (
    <div className="header-contacts burger-header-contacts">
      <div className="div_icons">
        <a
          href="https://t.me/LegalLine_pl"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick('telegram')}
        >
          <span className="tooltip">Telegram</span>
          <img
            src={telegramIcon}
            alt="Telegram"
            className="contact-icon"
            width={22}
            height={22}
            decoding="async"
          />
        </a>
        <a
          href="https://wa.me/+48883734171"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick('whatsapp')}
        >
          <span className="tooltip">WhatsApp</span>
          <img
            src={whatsappIcon}
            alt="WhatsApp"
            className="contact-icon"
            width={22}
            height={22}
            decoding="async"
          />
        </a>
        <a
          href="#!"
          onClick={(e) => {
            trackContactClick('viber');
            openViberChat(e);
          }}
          rel="noopener noreferrer"
        >
          <span className="tooltip">Viber</span>
          <img
            src={viberIcon}
            alt="Viber"
            className="contact-icon"
            width={22}
            height={22}
            decoding="async"
          />
        </a>
      </div>
    </div>
  );
}

export default Contacts;
