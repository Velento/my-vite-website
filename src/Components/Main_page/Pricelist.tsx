import { useState, useMemo, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import './Pricelist.css';
import iconCheak from '../images/play_point.svg';
import iconPobit from '../images/icon_pricelist_pobit.svg';
import { trackPackageSelected, trackCTAClick } from '../../services/analytics';

const ContactModal = lazy(() => import('../Main_page/ContactModal'));

const FEATURE_COUNTS = {
  allInclusive: 6,
  standard: 3,
  ultra: 5,
  basic: 4,
} as const;

type PackageKey = keyof typeof FEATURE_COUNTS;
const PACKAGE_KEYS: PackageKey[] = ['allInclusive', 'standard', 'ultra', 'basic'];

const PACKAGE_VALUES: Record<PackageKey, number> = {
  basic: 750,
  standard: 1100,
  allInclusive: 1850,
  ultra: 2400,
};

type PackageCardProps = {
  pkg: PackageKey;
  t: TFunction;
  onOrder: (pkg: PackageKey) => void;
};

const PackageCard = ({ pkg, t, onOrder }: PackageCardProps) => {
  const badge = t(`packages.${pkg}.badge`, { defaultValue: '' });
  const oldPrice = t(`packages.${pkg}.oldPrice`, { defaultValue: '' });
  const note = t(`packages.${pkg}.note`, { defaultValue: '' });
  const featureCount = FEATURE_COUNTS[pkg];

  const features: string[] = [];
  for (let i = 0; i < featureCount; i++) {
    features.push(t(`packages.${pkg}.features.${i}`));
  }

  return (
    <div
      className={`pkg-card ${pkg === 'allInclusive' ? 'pkg-card--highlighted' : ''} ${pkg === 'ultra' ? 'pkg-card--ultra' : ''}`}
    >
      {badge && <span className="pkg-badge">{badge}</span>}
      <h3 className="pkg-title">{t(`packages.${pkg}.title`)}</h3>
      <div className="pkg-pricing">
        {oldPrice && <span className="pkg-old-price">{oldPrice}</span>}
        <span className="pkg-price">{t(`packages.${pkg}.price`)}</span>
      </div>
      <ul className="pkg-features">
        {features.map((f, i) => (
          <li key={i}>
            <img
              src={iconCheak}
              alt=""
              className="pkg-feature-icon"
              width={16}
              height={16}
              decoding="async"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {note && <p className="pkg-note">{note}</p>}
      <button type="button" className="pkg-order-btn" onClick={() => onOrder(pkg)}>
        {t('packages.orderBtn')}
      </button>
    </div>
  );
};

const Pricelist = () => {
  const { t } = useTranslation();
  const [showContactModal, setShowContactModal] = useState(false);

  const services = useMemo(
    () => [
      {
        title: t('pricelistservices.0.title'),
        points: [
          t('pricelistservices.0.points.0'),
          t('pricelistservices.0.points.1'),
          t('pricelistservices.0.points.2'),
          t('pricelistservices.0.points.3'),
        ],
        price: t('pricelistservices.0.price'),
      },
      {
        title: t('pricelistservices.1.title'),
        points: [],
        price: t('pricelistservices.1.price'),
      },
      {
        title: t('pricelistservices.2.title'),
        points: [t('pricelistservices.2.points.0'), t('pricelistservices.2.points.1')],
        price: t('pricelistservices.2.price'),
      },
      {
        title: t('pricelistservices.3.title'),
        points: [],
        price: t('pricelistservices.3.price'),
      },
      {
        title: t('pricelistservices.4.title'),
        points: [],
        price: t('pricelistservices.4.price'),
      },
      {
        title: t('pricelistservices.5.title'),
        points: [t('pricelistservices.5.points.0'), t('pricelistservices.5.points.1')],
        price: t('pricelistservices.5.price'),
      },
      {
        title: t('pricelistservices.6.title'),
        points: [t('pricelistservices.6.points.0'), t('pricelistservices.6.points.1')],
        price: t('pricelistservices.6.price'),
      },
    ],
    [t]
  );

  const handleShowModal = (pkg?: PackageKey) => {
    if (pkg) trackPackageSelected(pkg, PACKAGE_VALUES[pkg]);
    else trackCTAClick('pricelist_service');
    setShowContactModal(true);
  };
  const handleCloseModal = () => setShowContactModal(false);

  return (
    <section className="pricelist" id="pricelist">
      {/* ── Package Cards ── */}
      <h2 className="pricelist-heading">{t('packages.title')}</h2>
      <p className="pricelist-promo">{t('packages.promo')}</p>
      <div className="pkg-grid">
        {PACKAGE_KEYS.map((pkg) => (
          <PackageCard key={pkg} pkg={pkg} t={t} onOrder={(p) => handleShowModal(p)} />
        ))}
      </div>

      {/* ── Other Services ── */}
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service" key={index}>
            <div className="service-header">
              <img
                src={iconPobit}
                alt=""
                className="service-icon"
                width={40}
                height={40}
                decoding="async"
              />
              <h3 className="service-title">{service.title}</h3>
            </div>
            <ul className="service-points">
              {service.points.map((point, pointIndex) => (
                <li key={pointIndex}>
                  <img
                    src={iconCheak}
                    alt=""
                    className="point-icon"
                    width={18}
                    height={18}
                    decoding="async"
                  />
                  <span className="point-text">{point}</span>
                </li>
              ))}
            </ul>
            <div className="buttons">
              <button type="button" className="price-button" disabled>
                {service.price}
              </button>
              <button type="button" className="service-btn" onClick={() => handleShowModal()}>
                {t('consult_button')}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Suspense fallback={null}>
        <ContactModal show={showContactModal} onClose={handleCloseModal} />
      </Suspense>
    </section>
  );
};

export default Pricelist;
