// src/Components/Footer/Footer.jsx
import React, { useState } from 'react';
import './Footer.css';
import '../Main_page/Modal.css';
import phoneIcon from '../images/phone-white.png';

import telegramIcon from '../images/telegram-white.png';
import whatsappIcon from '../images/whatsapp-white.png';
import viberIcon from '../images/viber-white.png';
import instagramIcon from '../images/instagram-white.png';
import locationIcon from '../images/location-white.png';
import ContactModal from '../Main_page/ContactModal';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const [showContactModal, setShowContactModal] = useState(false);

    const handleContactClick = () => {
        setShowContactModal(true);
    };

    const handleCloseModal = () => {
        setShowContactModal(false);
    };
// С ООО изменить на <ZOO>
// </ZOO>

// Под ценой коротко указать что мы будем делать за одну стоимость и за другую 
// Найти на отзовиках отзывы о том что не понравилось и собрать список претензий людей 
// Возвращаем ли деньги , если человек передумал
// перезваниваем ли людям или пропадаем 
// Блок о нас Фото сотрудников 
// квиз сделать. он дает до 5% конверсии. 3 вопроса. На какой вид ходите податься?. в конце оставь заявку.
// Создать раздел наши преимущества. Пойдем в ужонд и будем разговаривать по польски. Поможем сосотавить письмо для воеводы и тд



    return (
        <footer className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-section contacts">
                    <h2>{t('footer.contacts')}</h2>
                    <div className="icon-text">
                        <img src={phoneIcon} alt="Phone" className="contact-icon" />
                        <a href="tel:+48" className="footer-contact-link"> +48883734171</a>
                    </div>
                    <div className="icon-text">
                        <img src={telegramIcon} alt="Telegram" className="contact-icon" />
                        <a href="https://t.me/LegalLine_pl" className="footer-contact-link" target="_blank" rel="noopener noreferrer"> Telegram</a>
                    </div>
                    <div className="icon-text">
                        <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
                        <a href="https://wa.me/+48883734171" className="footer-contact-link" target="_blank" rel="noopener noreferrer"> WhatsApp</a>
                    </div>
                    <div className="icon-text">
                        <img src={viberIcon} alt="Viber" className="contact-icon" />
                        <a href="viber://chat?number=%2B48883734171" className="footer-contact-link" target="_blank" rel="noopener noreferrer"> Viber</a>
                    </div>
                    <div className="icon-text">
                        <img src={instagramIcon} alt="Instagram" className="contact-icon" />
                        <a href="https://www.instagram.com/legal_line_pl/" className="footer-contact-link" target="_blank" rel="noopener noreferrer"> Instagram</a>
                    </div>
                </div>
                <div className="footer-section info">
                    <h2>{t('footer.info')}</h2>
                    <div className="icon-text">
                        {/* <img src={locationIcon} alt="Location" className="contact-icon" /> */}
                    <p>{t('footer.company')}</p>
                    </div>
                        <p>{t('footer.address')}</p>
                        <p>{t('footer.timework')}</p>
                    <p><a href="https://docs.google.com/document/d/16JRprD0eDLu8pWrwxZxPboOX6q2ZrptjAw5_CMQENSE/edit" >{t('footer.privacyPolicy')}</a></p>
                </div>
                <div className="footer-section services">
                    <h2>{t('footer.services')}</h2>
                    <p style={{ color: 'white' }}><a href="#services" className="footer-contact-link">Karta czasowego pobytu</a></p>
                    <p style={{ color: 'white' }}><a href="#services" className="footer-contact-link">Karta stałego pobytu</a></p>
                    <button onClick={handleContactClick}>{t('footer.question')}</button>
                    <ContactModal show={showContactModal} onClose={handleCloseModal} />
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 {t('footer.rights')}
            </div>
        </footer>
    );
};

export default Footer;
