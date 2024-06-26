import React, { useState } from 'react';
import './MainService.css';
import Modal from './Modal';
import ContactModal from './ContactModal';
import { useTranslation } from 'react-i18next';

const ServiceDetails = ({ onShowCostDetails, onShowMoreInfo, onShowProcessingTime, onShowContactModal }) => {
    const { t } = useTranslation();
    
    return (
        <div className="service-details">
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowCostDetails(); }}>{t('services.cost')}</p>
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowProcessingTime(); }}>{t('services.terming')}</p>
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowMoreInfo(); }}>{t('services.learnMore')}</p>
            <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t('services.orderService')}</button>
            <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t('services.getConsultation')}</button>
        </div>
    );
};

const CostDetails = ({ onShowContactModal }) => {
    const { t } = useTranslation();

    return (
        <div className="cost-details">
            <div className="cost-column">
                <h3 className="services-h3">{t('services.basicPackage.title')}</h3>
                <p>{t('services.basicPackage.content')}</p>
                <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t('services.basicPackage.button')}</button>
            </div>
            <div className="cost-column">
                <h3 className="services-h3">{t('services.allInclusivePackage.title')}</h3>
                <p>{t('services.allInclusivePackage.content')}</p>
                <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t('services.allInclusivePackage.button')}</button>
            </div>
        </div>
    );
};

const MoreInfoService1 = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h3>{t('services.moreInfoService1.title')}</h3>
            <p>{t('services.moreInfoService1.content')}</p>
        </div>
    );
};

const MoreInfoService2 = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h3>{t('services.moreInfoService2.title')}</h3>
            <p>{t('services.moreInfoService2.content')}</p>
        </div>
    );
};

const ProcessingTime = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h3>{t('services.processingTime.title')}</h3>
            <p>{t('services.processingTime.content')}</p>
        </div>
    );
};

const Services = () => {
    const { t } = useTranslation();
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
            <h2 className="services-h">{t('services.servicesTitle')}</h2>
            <div
                className={`service-item ${activeService === 'Service1' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service1')}
            >
                {t('services.temporaryResidenceCard')}
                {activeService === 'Service1' && (
                    <ServiceDetails
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service2' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service2')}
            >
                {t('services.permanentResidenceCard')}
                {activeService === 'Service2' && (
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
                    {showMoreInfo && activeService === 'Service1' && <MoreInfoService1 />}
                    {showMoreInfo && activeService === 'Service2' && <MoreInfoService2 />}
                    {showProcessingTime && <ProcessingTime />}
                    {showContactModal && <ContactModal show={showContactModal} onClose={handleCloseModal} />}
                </Modal>
            )}
        </div>
    );
};

export default Services;




