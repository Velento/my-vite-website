import './Footer.css';
import '../Main_page/Modal.css';
import phoneIcon from '../images/phone-white.png';
import telegramIcon from '../images/telegram-white.png';
import whatsappIcon from '../images/whatsapp-white.png';
import viberIcon from '../images/viber-white.png';
import instagramIcon from '../images/instagram-white.png';
import { useTranslation } from 'react-i18next';
import { trackContactClick } from '../../services/analytics';

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
            <img src={phoneIcon} alt="" className="contact-icon" loading="lazy" />
            <a
              href="tel:+48883734171"
              className="footer-contact-link"
              onClick={() => trackContactClick('phone')}
            >
              {' '}
              +48883734171
            </a>
          </div>
          <div className="icon-text">
            <img src={telegramIcon} alt="" className="contact-icon" loading="lazy" />
            <a
              href="https://t.me/LegalLine_pl"
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
            <img src={whatsappIcon} alt="" className="contact-icon" loading="lazy" />
            <a
              href="https://wa.me/+48883734171"
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
            <img src={viberIcon} alt="" className="contact-icon" loading="lazy" />
            <a
              href="viber://chat?number=%2B48883734171"
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
            <img src={instagramIcon} alt="" className="contact-icon" loading="lazy" />
            <a
              href="https://www.instagram.com/legal_line_pl/"
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
            <a href="mailto:legalline.pl@gmail.com" onClick={() => trackContactClick('email')}>
              legalline.pl@gmail.com
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
              Karta czasowego pobytu
            </a>
          </p>
          <p>
            <a href="#pricelist" className="footer-contact-link">
              Karta stałego pobytu
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
