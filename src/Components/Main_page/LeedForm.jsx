import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';
import './LeedForm.css';

const LeedForm = ({ onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [promo, setPromo] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const isNameValid = /^[A-Za-zА-Яа-яЁё\s]+$/.test(name);
    const isPhoneValid = /^[+\d][\d\s\-()]{8,}$/.test(phone);
    const isFormValid = isNameValid && isPhoneValid;

    // Функция отправки данных в Telegram
    const sendToTelegram = async (data) => {
        const botToken = '7468472524:AAHqkzNo-VmM0DFmmtCDxF448jMgTnI_hK4';
        const chatId = '509830008';
        const message = `Name: ${data.name}\nPhone: ${data.phone}\nPromo: ${data.promo}`;

        try {
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: message,
            });
            console.log('Данные успешно отправлены в Telegram');
        } catch (error) {
            console.error('Ошибка при отправке в Telegram:', error);
            throw new Error('Failed to send data to Telegram');
        }
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправка данных в Telegram
            await sendToTelegram({ name, phone, promo });

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setShowThankYou(true);
            }, 5000);
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            alert(t('feedbackForm.errorMessage'));
        }
    };

    const handleThankYouClose = () => {
        setShowThankYou(false);
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="leed-form-container" id='leedform'>
            <h2>{t('feedbackForm.title')}</h2>
            {!showThankYou ? (
                <form onSubmit={handleSubmit}>
                    <div className={`form-group ${!isNameValid && name ? 'error' : ''}`}>
                        <label htmlFor="name">{t('feedbackForm.name')}</label>
                        <input
                            id="name"
                            type="text"
                            placeholder={t('feedbackForm.namePlaceholder', 'Anna')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={!isNameValid}
                        />
                        {!isNameValid && name && (
                            <span className="error-message">{t('feedbackForm.nameError')}</span>
                        )}
                    </div>
                    <div className={`form-group ${!isPhoneValid && phone ? 'error' : ''}`}>
                        <label htmlFor="phone">{t('feedbackForm.phone')}</label>
                        <input
                            id="phone"
                            type="text"
                            placeholder={t('feedbackForm.phonePlaceholder', '+48123123123')}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            aria-invalid={!isPhoneValid}
                        />
                        {!isPhoneValid && phone && (
                            <span className="error-message">{t('feedbackForm.phoneError')}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="promo">{t('feedbackForm.promo')}</label>
                        <input
                            id="promo"
                            type="text"
                            placeholder={t('feedbackForm.promoPlaceholder', 'PROMO2024')}
                            value={promo}
                            onChange={(e) => setPromo(e.target.value)}
                        />
                    </div>
                    <div className="form-buttons">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`submit-button ${isFormValid ? 'active' : ''}`}
                        >
                            {t('feedbackForm.submit')}
                        </button>
                    </div>
                </form>
            ) : null}
            {showMessage && (
                <div className="message-alert">
                    {t('messageAlert')}
                </div>
            )}
            {showThankYou && <ThankYou name={name} onClose={handleThankYouClose} />}
        </div>
    );
};

export default LeedForm;

