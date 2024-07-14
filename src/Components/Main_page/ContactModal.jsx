import React, { useState } from 'react';
import telegramIcon from '../images/telegram.png';
import whatsappIcon from '../images/whatsapp.png';
import viberIcon from '../images/viber.png';
import './ContactModal.css';
import { useTranslation } from 'react-i18next';
import FeedbackForm from './FeedBackForm';

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

const ContactModal = ({ show, onClose }) => {
    const { t } = useTranslation();
    const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);

    if (!show) return null;

    const handleOpenFeedbackForm = () => {
        setIsFeedbackFormVisible(true);
    };

    const handleCloseFeedbackForm = () => {
        setIsFeedbackFormVisible(false);
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{t('modal.title')}</h2>
                <p style={{ textAlign: 'center' }}>
                    {t('modal.call')} <a href="tel:+48777888999">+48 777 888 999</a>
                </p>
                <div className="contact-icons">
                    <a href="https://t.me/katringoncharuk" target="_blank" rel="noopener noreferrer">
                        <img src={telegramIcon} alt="Telegram" className="contact-icon" />
                    </a>
                    <a href="https://wa.me/yourwhatsapp" target="_blank" rel="noopener noreferrer">
                        <img src={whatsappIcon} alt="WhatsApp" className="contact-icon" />
                    </a>
                    <a href="#!" onClick={openViberChat}>
                        <img src={viberIcon} alt="Viber" className="contact-icon" />
                    </a>
                </div>
                <button className="feedback-button" onClick={handleOpenFeedbackForm}>{t('modal.feedbackButton')}</button>
                {isFeedbackFormVisible && <FeedbackForm onClose={handleCloseFeedbackForm} />}
            </div>
        </div>
    );
};

export default ContactModal;
