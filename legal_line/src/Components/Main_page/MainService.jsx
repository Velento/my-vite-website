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
            <h3 className="services-h3">Базовый пакет: 500 zl</h3>
            <p>1)Консультация. 2)Анализ актуальных документов и составление списка недостающих. 
                3)Проверка пакета документов перед подачей. 4)Сбор и изготовление полного пакета документов.
                5)Заполнение всех бланков. 6)Регистрация на личную подачу.</p>
            <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>ХОЧУ БАЗОВЫЙ ПАКЕТ</button>
        </div>
        <div className="cost-column">
            <h3 className="services-h3">Пакет "Под ключ": 1500 zl</h3>
            <p>1)Консультация. 2)Помощь в изготовлении документов от работодателя.  3)Сбор и изготовление полного пакета документов.
            4)Заполнение всех бланков. 5)Регистрация на личную подачу. 6)Получение печати в паспорт. 7)Сдача отпечатков. 
            8)Контроль дела, получение корреспонденции, донесение всех необходимых документов. 9)Контакт с инспектором, который ведет ваше дело.
            10)Комплексное сопровождение вашего дела до получения децизии. 11)Изготовление номер PESEL при необходимости.
            12)Регистрация профиля зауфанего (profil zaufany) при необходимости. 13)<strong>В случае негативной децизии по нашей вине, помощь в оформлении документов на апелляцию и полный возврат денежных средств.</strong></p>
            <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>ХОЧУ ПАКЕТ "ПОД КЛЮЧ"</button>
        </div>
    </div>
);

const MoreInfoService1 = () => (
    <div>
        <h3>Karta czasowego pobytu</h3>
        <p>Карта временного пребывания или ВНЖ — это документ, который подтверждает личность иностранца во время его пребывания на территории Польши, а также дает ему право неоднократно пересекать границу без получения визы, официально работать, приобретать движимое и недвижимое имущество в Польше.</p>
    </div>
);

const MoreInfoService2 = () => (
    <div>
        <h3>Karta stałego pobytu</h3>
        <p>Карта постоянного пребывания или ПМЖ – постоянный вид на жительство, документ дающий право без визы пересекать границу и легально находиться на территории Польши без ограничений, имея все права гражданина Польши.</p>
    </div>
);

const ProcessingTime = () => (
    <div>
        <h3>Срок получения</h3>
        <p>Срок получения Карты побыту В Гданьске в среднем составляет 7 месяцев.</p>
    </div>
);

const Services = () => {
    const [activeService, setActiveService] = useState(null);
    const [showCostDetails, setShowCostDetails] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showProcessingTime, setShowProcessingTime] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);

    const handleServiceClick = (serviceName) => {
        console.log('Clicked on:', serviceName);
        setActiveService(serviceName === activeService ? null : serviceName);
        setShowCostDetails(false);
        setShowMoreInfo(false);
        setShowProcessingTime(false);
        setShowContactModal(false);
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
            <h2 className="services-h">Мы оказываем следующие услуги в Гданьске</h2>
            <div
                className={`service-item ${activeService === 'Услуга 1' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Услуга 1')}
            >
                Karta czasowego pobytu
                {activeService === 'Услуга 1' && (
                    <ServiceDetails
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Услуга 2' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Услуга 2')}
            >
                Karta stałego pobytu
                {activeService === 'Услуга 2' && (
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
                    {showMoreInfo && activeService === 'Услуга 1' && <MoreInfoService1 />}
                    {showMoreInfo && activeService === 'Услуга 2' && <MoreInfoService2 />}
                    {showProcessingTime && <ProcessingTime />}
                    {showContactModal && <ContactModal show={showContactModal} onClose={handleCloseModal} />}
                </Modal>
            )}
        </div>
    );
};

export default Services;



