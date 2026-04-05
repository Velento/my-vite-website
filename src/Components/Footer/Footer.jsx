import './Footer.css';
import '../Main_page/Modal.css';
import phoneIcon from '../images/phone-white.png';
import telegramIcon from '../images/telegram-white.png';
import whatsappIcon from '../images/whatsapp-white.png';
import viberIcon from '../images/viber-white.png';
import instagramIcon from '../images/instagram-white.png';
import { useTranslation } from 'react-i18next';
import goUpImage from '../images/goUpImage.svg';

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
            <a href="tel:+48883734171" className="footer-contact-link">
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
            <a href="mailto:legalline.pl@gmail.com">legalline.pl@gmail.com</a>
          </p>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/document/d/16JRprD0eDLu8pWrwxZxPboOX6q2ZrptjAw5_CMQENSE/edit"
            >
              {t('footer.privacyPolicy')}
            </a>
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
      <button
        className="go-up"
        onClick={() => document.getElementById('pricelist')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <img src={goUpImage} alt="" />
      </button>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} {t('footer.rights')}
      </div>
    </footer>
  );
};

export default Footer;
