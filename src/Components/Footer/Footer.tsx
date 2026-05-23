import './Footer.css';
import {
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
  ViberIcon,
  InstagramIcon,
} from '../common/SocialIcons';
import { useTranslation } from 'react-i18next';
import { trackContactClick } from '../../services/analytics';
import {
  PHONE_NUMBER,
  PHONE_HREF,
  WHATSAPP_HREF,
  VIBER_HREF,
  TELEGRAM_HREF,
  INSTAGRAM_HREF,
  EMAIL,
  EMAIL_HREF,
} from '../../constants/contact';

/**
 * Site footer — contacts, company info, services links, scroll-to-top button.
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <address className="footer-section contacts">
          <h2>{t('footer.contacts')}</h2>
          <div className="icon-text">
            <PhoneIcon className="contact-icon" />
            <a
              href={PHONE_HREF}
              className="footer-contact-link"
              onClick={() => trackContactClick('phone')}
            >
              {' '}
              {PHONE_NUMBER}
            </a>
          </div>
          <div className="icon-text">
            <TelegramIcon className="contact-icon" />
            <a
              href={TELEGRAM_HREF}
              className="footer-contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('telegram')}
            >
              {' '}
              Telegram
            </a>
          </div>
          <div className="icon-text">
            <WhatsAppIcon className="contact-icon" />
            <a
              href={WHATSAPP_HREF}
              className="footer-contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('whatsapp')}
            >
              {' '}
              WhatsApp
            </a>
          </div>
          <div className="icon-text">
            <ViberIcon className="contact-icon" />
            <a
              href={VIBER_HREF}
              className="footer-contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('viber')}
            >
              {' '}
              Viber
            </a>
          </div>
          <div className="icon-text">
            <InstagramIcon className="contact-icon" />
            <a
              href={INSTAGRAM_HREF}
              className="footer-contact-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('instagram')}
            >
              {' '}
              Instagram
            </a>
          </div>
        </address>
        <div className="footer-section info">
          <h2>{t('footer.info')}</h2>
          <div className="icon-text">
            <p>{t('footer.company')}</p>
          </div>
          <p>{t('footer.address')}</p>
          <p>{t('footer.timework')}</p>
          <p>
            <a href={EMAIL_HREF} onClick={() => trackContactClick('email')}>
              {EMAIL}
            </a>
          </p>
          <p>
            <a href="/privacy.html">{t('footer.privacyPolicy')}</a>
          </p>
        </div>
        <div className="footer-section services">
          <h2>{t('footer.services')}</h2>
          <p>
            <a href="#pricelist" className="footer-contact-link">
              {t('footer.serviceLink1')}
            </a>
          </p>
          <p>
            <a href="#pricelist" className="footer-contact-link">
              {t('footer.serviceLink2')}
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Velenta Andrei LEGALLINE. {t('footer.rights')}
      </div>
    </footer>
  );
};

export default Footer;
