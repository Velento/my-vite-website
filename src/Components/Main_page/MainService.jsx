import React, { useState } from 'react';
import './MainService.css';
import Modal from './Modal';
import ContactModal from './ContactModal';
import { useTranslation } from 'react-i18next';

const ServiceDetails = ({ serviceName, onShowCostDetails, onShowMoreInfo, onShowProcessingTime, onShowContactModal, t }) => {
    return (
        <div className="service-details" id = "services">
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowCostDetails(); }}>{t(`services.${serviceName}.cost`)}</p>
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowProcessingTime(); }}>{t(`services.${serviceName}.terming`)}</p>
            <p className="service-p" onClick={(e) => { e.stopPropagation(); onShowMoreInfo(); }}>{t(`services.${serviceName}.learnMore`)}</p>
            <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t(`services.${serviceName}.orderService`)}</button>
            <button className="service-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t(`services.${serviceName}.getConsultation`)}</button>
        </div>
    );
};

const CostDetails = ({ serviceName, onShowContactModal, t }) => {
    return (
        <div className="cost-details">
            <div className="cost-column">
                <h3 className="services-h3">{t(`services.${serviceName}.basicPackage.title`)}</h3>
                <p>{t(`services.${serviceName}.basicPackage.content`)}</p>
                <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t(`services.${serviceName}.basicPackage.button`)}</button>
            </div>
            <div className="cost-column">
                <h3 className="services-h3">{t(`services.${serviceName}.allInclusivePackage.title`)}</h3>
                <p>{t(`services.${serviceName}.allInclusivePackage.content`)}</p>
                <button className="cost-details-btn" onClick={(e) => { e.stopPropagation(); onShowContactModal(); }}>{t(`services.${serviceName}.allInclusivePackage.button`)}</button>
            </div>
        </div>
    );
};

const MoreInfoService = ({ serviceName, t }) => {
    return (
        <div>
            <h3>{t(`services.${serviceName}.moreInfoService.title`)}</h3>
            <p>{t(`services.${serviceName}.moreInfoService.content`)}</p>
        </div>
    );
};

const ProcessingTime = ({ serviceName, t }) => {
    return (
        <div>
            <h3>{t(`services.${serviceName}.processingTime.title`)}</h3>
            <p>{t(`services.${serviceName}.processingTime.content`)}</p>
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
        setActiveService(serviceName === activeService ? null : serviceName);
        setShowCostDetails(false);
        setShowMoreInfo(false);
        setShowProcessingTime(false);
        setShowContactModal(false);
    };

    const handleShowCostDetails = () => {
        setShowCostDetails(true);
    };

    const handleShowMoreInfo = () => {
        setShowMoreInfo(true);
    };

    const handleShowProcessingTime = () => {
        setShowProcessingTime(true);
    };

    const handleShowContactModal = () => {
        setShowContactModal(true);
    };

    const handleCloseModal = () => {
        setShowCostDetails(false);
        setShowMoreInfo(false);
        setShowProcessingTime(false);
        setShowContactModal(false);
    };

    return (
        <div className="services" id="services">
            <h2 className="services-h">{t('services.servicesTitle')}</h2>
            <div
                className={`service-item ${activeService === 'Service1' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service1')}
            >
                {t('services.temporaryResidenceCard')}
                {activeService === 'Service1' && (
                    <ServiceDetails
                        serviceName="Service1"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
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
                        serviceName="Service2"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service3' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service3')}
            >
                {t('services.marriageAgreement')}
                {activeService === 'Service3' && (
                    <ServiceDetails
                        serviceName="Service3"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service4' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service4')}
            >
                {t('services.businessVisa')}
                {activeService === 'Service4' && (
                    <ServiceDetails
                        serviceName="Service4"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service5' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service5')}
            >
                {t('services.familyReunion')}
                {activeService === 'Service5' && (
                    <ServiceDetails
                        serviceName="Service5"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service6' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service6')}
            >
                {t('services.konsultation')}
                {activeService === 'Service6' && (
                    <ServiceDetails
                        serviceName="Service6"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service7' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service7')}
            >
                {t('services.resume')}
                {activeService === 'Service7' && (
                    <ServiceDetails
                        serviceName="Service7"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            <div
                className={`service-item ${activeService === 'Service8' ? 'active' : ''}`}
                onClick={() => handleServiceClick('Service8')}
            >
                {t('services.civilDocs')}
                {activeService === 'Service8' && (
                    <ServiceDetails
                        serviceName="Service8"
                        onShowCostDetails={handleShowCostDetails}
                        onShowMoreInfo={handleShowMoreInfo}
                        onShowProcessingTime={handleShowProcessingTime}
                        onShowContactModal={handleShowContactModal}
                        t={t}
                    />
                )}
            </div>
            {(showCostDetails || showMoreInfo || showProcessingTime || showContactModal) && (
                <Modal show={showCostDetails || showMoreInfo || showProcessingTime || showContactModal} onClose={handleCloseModal}>
                    {showCostDetails && <CostDetails serviceName={activeService} onShowContactModal={handleShowContactModal} t={t} />}
                    {showMoreInfo && <MoreInfoService serviceName={activeService} t={t} />}
                    {showProcessingTime && <ProcessingTime serviceName={activeService} t={t} />}
                    {showContactModal && <ContactModal show={showContactModal} onClose={handleCloseModal} />}
                </Modal>
            )}
        </div>
    );
};

export default Services;


