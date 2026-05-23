import './Header.css';
import { TelegramIcon, WhatsAppIcon, ViberIcon } from '../common/SocialIcons';
import { openViberChat } from '../../services/viber';
import { trackContactClick } from '../../services/analytics';
import { WHATSAPP_HREF, TELEGRAM_HREF } from '../../constants/contact';

function Contacts() {
  return (
    <div className="header-contacts burger-header-contacts">
      <div className="div_icons">
        <a
          href={TELEGRAM_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          onClick={() => trackContactClick('telegram')}
        >
          <span className="tooltip">Telegram</span>
          <TelegramIcon className="contact-icon" />
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          onClick={() => trackContactClick('whatsapp')}
        >
          <span className="tooltip">WhatsApp</span>
          <WhatsAppIcon className="contact-icon" />
        </a>
        <a
          href="#!"
          aria-label="Viber"
          onClick={(e) => {
            trackContactClick('viber');
            openViberChat(e);
          }}
          rel="noopener noreferrer"
        >
          <span className="tooltip">Viber</span>
          <ViberIcon className="contact-icon" />
        </a>
      </div>
    </div>
  );
}

export default Contacts;
