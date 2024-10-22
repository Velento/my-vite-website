// ThankYou.jsx
import React from 'react';
import './ThankYou.css'; // Добавьте стили, если необходимо
import { useTranslation } from 'react-i18next';

const ThankYou = ({ name, onClose }) => {
    const { t } = useTranslation();

    return (
        <div className="thank-you-modal" onClick={onClose}>
            <div className="thank-you-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h3>{t('textThankYou')}, { name }</h3>
                <p>{t('textThank')}</p>
            </div>
        </div>
    );
};

export default ThankYou;
