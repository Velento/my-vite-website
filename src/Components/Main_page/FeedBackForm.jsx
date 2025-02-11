import React, { useState } from 'react';
import axios from 'axios';
import './FeedBackForm.css';
import { useTranslation } from 'react-i18next';
import ThankYou from './ThankYou';

const FeedbackForm = ({ onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [promo, setPromo] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    const isNameValid = /^[A-Za-zА-Яа-яЁё\s]+$/.test(name);
    const isPhoneValid = /^[+\d][\d\s\-()]{8,}$/.test(phone);
    const isFormValid = isNameValid && isPhoneValid;

    // Функция для добавления данных в Google Таблицу
    // const appendToSheet = async (data) => {
    //     const accessToken = 'YOUR_ACCESS_TOKEN'; // Вставьте свой OAuth токен
    //     const spreadsheetId = '17cn8hwR1Qd1gp5vuXrLVU1mlfC8hO8n4HeEPAAHesH8';
    //     const range = 'Лист1!B:C,I:I';

    //     try {
    //         await axios.post(
    //             `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`,
    //             {
    //                 values: [[data.name, data.phone, data.promo]],
    //             },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //                 params: {
    //                     valueInputOption: 'RAW',
    //                 },
    //             }
    //         );
    //         console.log('Данные успешно отправлены в Google Таблицу');
    //     } catch (error) {
    //         console.error('Ошибка при отправке данных в Google Таблицу:', error);
    //         throw new Error('Failed to append data to Google Sheet');
    //     }
    // };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = `Name: ${name}\nPhone: ${phone}\nPromo: ${promo}`;
        const botToken = '7468472524:AAHqkzNo-VmM0DFmmtCDxF448jMgTnI_hK4';
        const chatId = '509830008';

        try {
            // Отправка данных в Telegram
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: message,
            });

            // Отправка данных в Google Таблицу
            // await appendToSheet({ name, phone, promo });

            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                setShowThankYou(true);
            }, 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };

    const handleThankYouClose = () => {
        setShowThankYou(false);
        onClose();
    };

    return (
        <div className="feedback-modal" id="feed-back" onClick={onClose}>
            <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{t('feedbackForm.title')}</h2>
                {!showThankYou ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>{t('feedbackForm.name')}</label>
                            <input
                                type="text"
                                placeholder="Anna"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {!isNameValid && name && (
                                <span className="error-message">{t('feedbackForm.nameError')}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{t('feedbackForm.phone')}</label>
                            <input
                                type="text"
                                placeholder="+48123123123"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {!isPhoneValid && phone && (
                                <span className="error-message">{t('feedbackForm.phoneError')}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{t('feedbackForm.promo')}</label>
                            <input
                                type="text"
                                value={promo}
                                onChange={(e) => setPromo(e.target.value)}
                            />
                        </div>
                        <div className="form-buttons">
                            <button type="submit" disabled={!isFormValid} className={`submit-button ${isFormValid ? 'active' : ''}`}>
                                {t('feedbackForm.submit')}
                            </button>
                            <button type="button" className="cancel-button" onClick={onClose}>
                                {t('feedbackForm.cancel')}
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
        </div>
    );
};

export default FeedbackForm;
