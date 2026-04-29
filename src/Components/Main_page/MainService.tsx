import { useState } from 'react';
import './MainService.css';
import Modal from './Modal';
import ContactModal from './ContactModal';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

const SERVICE_KEYS = [
  { id: 'Service1', labelKey: 'services.temporaryResidenceCard' },
  { id: 'Service2', labelKey: 'services.permanentResidenceCard' },
  { id: 'Service3', labelKey: 'services.marriageAgreement' },
  { id: 'Service4', labelKey: 'services.businessVisa' },
  { id: 'Service5', labelKey: 'services.familyReunion' },
  { id: 'Service6', labelKey: 'services.konsultation' },
  { id: 'Service7', labelKey: 'services.resume' },
  { id: 'Service8', labelKey: 'services.civilDocs' },
] as const;

type ServiceId = (typeof SERVICE_KEYS)[number]['id'];

type ServiceDetailsProps = {
  serviceName: ServiceId;
  onShowCostDetails: () => void;
  onShowMoreInfo: () => void;
  onShowProcessingTime: () => void;
  onShowContactModal: () => void;
  t: TFunction;
};

const ServiceDetails = ({
  serviceName,
  onShowCostDetails,
  onShowMoreInfo,
  onShowProcessingTime,
  onShowContactModal,
  t,
}: ServiceDetailsProps) => {
  return (
    <div className="service-details">
      <button
        type="button"
        className="service-p"
        onClick={(e) => {
          e.stopPropagation();
          onShowCostDetails();
        }}
      >
        {t(`services.${serviceName}.cost`)}
      </button>
      <button
        type="button"
        className="service-p"
        onClick={(e) => {
          e.stopPropagation();
          onShowProcessingTime();
        }}
      >
        {t(`services.${serviceName}.terming`)}
      </button>
      <button
        type="button"
        className="service-p"
        onClick={(e) => {
          e.stopPropagation();
          onShowMoreInfo();
        }}
      >
        {t(`services.${serviceName}.learnMore`)}
      </button>
      <button
        type="button"
        className="service-btn"
        onClick={(e) => {
          e.stopPropagation();
          onShowContactModal();
        }}
      >
        {t(`services.${serviceName}.orderService`)}
      </button>
      <button
        type="button"
        className="service-btn"
        onClick={(e) => {
          e.stopPropagation();
          onShowContactModal();
        }}
      >
        {t(`services.${serviceName}.getConsultation`)}
      </button>
    </div>
  );
};

type CostDetailsProps = {
  serviceName: ServiceId;
  onShowContactModal: () => void;
  t: TFunction;
};

const CostDetails = ({ serviceName, onShowContactModal, t }: CostDetailsProps) => {
  return (
    <div className="cost-details">
      <div className="cost-column">
        <h3 className="services-h3">{t(`services.${serviceName}.basicPackage.title`)}</h3>
        <p>{t(`services.${serviceName}.basicPackage.content`)}</p>
        <button
          type="button"
          className="cost-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onShowContactModal();
          }}
        >
          {t(`services.${serviceName}.basicPackage.button`)}
        </button>
      </div>
      <div className="cost-column">
        <h3 className="services-h3">{t(`services.${serviceName}.allInclusivePackage.title`)}</h3>
        <p>{t(`services.${serviceName}.allInclusivePackage.content`)}</p>
        <button
          type="button"
          className="cost-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onShowContactModal();
          }}
        >
          {t(`services.${serviceName}.allInclusivePackage.button`)}
        </button>
      </div>
    </div>
  );
};

type SimpleServiceProps = { serviceName: ServiceId; t: TFunction };

const MoreInfoService = ({ serviceName, t }: SimpleServiceProps) => {
  return (
    <div>
      <h3>{t(`services.${serviceName}.moreInfoService.title`)}</h3>
      <p>{t(`services.${serviceName}.moreInfoService.content`)}</p>
    </div>
  );
};

const ProcessingTime = ({ serviceName, t }: SimpleServiceProps) => {
  return (
    <div>
      <h3>{t(`services.${serviceName}.processingTime.title`)}</h3>
      <p>{t(`services.${serviceName}.processingTime.content`)}</p>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<ServiceId | null>(null);
  const [showCostDetails, setShowCostDetails] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showProcessingTime, setShowProcessingTime] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleServiceClick = (serviceName: ServiceId) => {
    setActiveService(serviceName === activeService ? null : serviceName);
    setShowCostDetails(false);
    setShowMoreInfo(false);
    setShowProcessingTime(false);
    setShowContactModal(false);
  };

  const handleCloseModal = () => {
    setShowCostDetails(false);
    setShowMoreInfo(false);
    setShowProcessingTime(false);
    setShowContactModal(false);
  };

  return (
    <section className="services" id="services">
      <h2 className="services-h">{t('services.servicesTitle')}</h2>
      {SERVICE_KEYS.map(({ id, labelKey }) => (
        <div
          key={id}
          className={`service-item ${activeService === id ? 'active' : ''}`}
          onClick={() => handleServiceClick(id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleServiceClick(id);
            }
          }}
        >
          {t(labelKey)}
          {activeService === id && (
            <ServiceDetails
              serviceName={id}
              onShowCostDetails={() => setShowCostDetails(true)}
              onShowMoreInfo={() => setShowMoreInfo(true)}
              onShowProcessingTime={() => setShowProcessingTime(true)}
              onShowContactModal={() => setShowContactModal(true)}
              t={t}
            />
          )}
        </div>
      ))}
      {activeService &&
        (showCostDetails || showMoreInfo || showProcessingTime || showContactModal) && (
          <Modal
            show={showCostDetails || showMoreInfo || showProcessingTime || showContactModal}
            onClose={handleCloseModal}
          >
            {showCostDetails && (
              <CostDetails
                serviceName={activeService}
                onShowContactModal={() => setShowContactModal(true)}
                t={t}
              />
            )}
            {showMoreInfo && <MoreInfoService serviceName={activeService} t={t} />}
            {showProcessingTime && <ProcessingTime serviceName={activeService} t={t} />}
            {showContactModal && (
              <ContactModal show={showContactModal} onClose={handleCloseModal} />
            )}
          </Modal>
        )}
    </section>
  );
};

export default Services;
