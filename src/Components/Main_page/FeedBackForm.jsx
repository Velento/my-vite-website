import React, { useState } from 'react';
import axios from 'axios';
import './FeedBackForm.css';
import { useTranslation } from 'react-i18next';

const FeedbackForm = ({ onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const isFormValid = name.trim() !== '' && phone.trim() !== '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = `Name: ${name}\nPhone: ${phone}`;
        const botToken = '7468472524:AAHqkzNo-VmM0DFmmtCDxF448jMgTnI_hK4';
        const chatId = '509830008';

        try {
            await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: message,
            });
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                onClose();
            }, 10000); // Закрыть сообщение и модальное окно через 10 секунд
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };

    return (
        <div className="feedback-modal" onClick={onClose}>
            <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{t('feedbackForm.title')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t('feedbackForm.name')}</label>
                        <input
                            type="text"
                            placeholder="Anna"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('feedbackForm.phone')}</label>
                        <input
                            type="text"
                            placeholder="+48123123123"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                {showMessage && (
                    <div className="message-alert">
                        {t('messageAlert')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackForm;
