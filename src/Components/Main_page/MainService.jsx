import React, { useState } from 'react';
import './MainService.css';
import Modal from './Modal';
import ContactModal from './ContactModal';

const ServiceDetails = ({ onShowCostDetails, onShowMoreInfo, onShowProcessingTime, onShowContactModal }) => (
    <div className="service-details">
        <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowCostDetails(); }}>Стоимость</p>
        <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowProcessingTime(); }}>Срок получения карты</p>
        <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowMoreInfo(); }}>Узнать больше о карте</p>
        <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>Заказать услугу</button>
        <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>Получить консультацию</button>
    </div>
);

const CostDetails = ({ onShowContactModal }) => (
    <div className="cost-details">
        <div className="cost-column">
            <h3>Базовый пакет</h3>
            <p>В базовый пакет входит подготовка документов, запись на подачу документов.</p>
            <button onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>ХОЧУ БАЗОВЫЙ ПАКЕТ</button>
        </div>
        <div className="cost-column">
            <h3>Пакет "Под ключ"</h3>
            <p>В данный пакет входит подготовка, регистрация, сопровождение и другое.</p>
            <button onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>ХОЧУ ПАКЕТ "ПОД КЛЮЧ"</button>
        </div>
    </div>
);

const MoreInfo = () => (
    <div>
        <h3>Karta czasowego pobytu</h3>
        <p>Карта временного пребывания или ВНЖ — это документ, который подтверждает личность иностранца во время его пребывания на территории Польши, а также дает ему право неоднократно пересекать границу без получения визы, официально работать, приобретать движимое и недвижимое имущество в Польше.</p>
    </div>
);

const ProcessingTime = () => (
    <div>
        <h3>Срок получения</h3>
        <p>Срок получения Карты побыту В Гданьске в среднем составляет 7 месяцев.</p>
    </div>
);

const Services = () => {
    const [showServiceDetails, setShowServiceDetails] = useState(false);
    const [showCostDetails, setShowCostDetails] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showProcessingTime, setShowProcessingTime] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    const handleServiceClick = () => {
        console.log('Clicked on: Услуга 1');
        setShowServiceDetails(!showServiceDetails);
        setShowCostDetails(false); // Скрыть CostDetails при переключении услуги
        setShowMoreInfo(false); // Скрыть MoreInfo при переключении услуги
        setShowProcessingTime(false); // Скрыть ProcessingTime при переключении услуги
        setShowContactModal(false); // Скрыть ContactModal при переключении услуги
    };

    const handleShowCostDetails = () => {
        console.log("Show CostDetails");
        setShowCostDetails(true);
    };

    const handleShowMoreInfo = () => {
        console.log("Show More Info");
        setShowMoreInfo(true);
    };

    const handleShowProcessingTime = () => {
        console.log("Show Processing Time");
        setShowProcessingTime(true);
    };

    const handleShowContactModal = () => {
        console.log("Show Contact Modal");
        setShowContactModal(true);
    };

    const handleCloseModal = () => {
        console.log("Close Modal");
        setShowCostDetails(false);
        setShowMoreInfo(false);
        setShowProcessingTime(false);
        setShowContactModal(false);
    };

    return (
        <div className="services">
            <h2>Мы оказываем следующие услуги в Гданьске</h2>
            <div
                className={`service-item ${showServiceDetails ? 'active' : ''}`}
                onClick={handleServiceClick}
            >
                Услуга 1
                {showServiceDetails && (
                    <ServiceDetails
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                    />
                )}
            </div>
            {(showCostDetails || showMoreInfo || showProcessingTime || showContactModal) && (
                <Modal show={showCostDetails || showMoreInfo || showProcessingTime || showContactModal} onClose={handleCloseModal}>
                    {showCostDetails && <CostDetails onShowContactModal={handleShowContactModal} />}
                    {showMoreInfo && <MoreInfo />}
                    {showProcessingTime && <ProcessingTime />}
                    {showContactModal && <ContactModal show={showContactModal} onClose={handleCloseModal} />}
                </Modal>
            )}
        </div>
    );
};

export default Services;

