import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './MapAndReviews.css';

const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2310.86!2d18.6443675!3d54.3585319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd737127f1c78f%3A0x72fedb70b40640db!2sWa%C5%82y%20Piastowskie%201%2C%2080-854%20Gda%C5%84sk!5e0!3m2!1spl!2spl!4v1716999999999';

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=Legal+Line+Gdansk';

const REVIEW_INDICES = [0, 1, 2] as const;

type ReviewCardProps = { index: (typeof REVIEW_INDICES)[number] };

const ReviewCard = ({ index }: ReviewCardProps) => {
  const { t } = useTranslation();
  return (
    <article className="review-card">
      <div className="review-card__stars" aria-label={t('reviews.starsAria')}>
        {'★'.repeat(5)}
      </div>
      <p className="review-card__text">{t(`reviews.${index}.text`)}</p>
      <footer className="review-card__footer">
        <span className="review-card__author">{t(`reviews.${index}.author`)}</span>
        <span className="review-card__city">{t(`reviews.${index}.city`)}</span>
      </footer>
    </article>
  );
};

const MapAndReviews = () => {
  const { t } = useTranslation();
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="map-reviews" id="map">
      <div className="map-reviews__grid">
        {/* Google Map */}
        <div className="map-reviews__map-col">
          <h2 className="map-reviews__heading">{t('map.title')}</h2>
          <div className="map-reviews__map-wrap">
            {mapLoaded ? (
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('map.title')}
              />
            ) : (
              /* Facade: no request reaches Google Maps until the visitor opts in
                 (faster first load + RODO). */
              <button type="button" className="map-facade" onClick={() => setMapLoaded(true)}>
                <svg
                  className="map-facade__pin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="map-facade__btn">{t('map.load')}</span>
                <span className="map-facade__hint">{t('map.address')}</span>
              </button>
            )}
          </div>
          <p className="map-reviews__address">{t('map.address')}</p>
        </div>

        {/* Reviews */}
        <div className="map-reviews__reviews-col">
          <h2 className="map-reviews__heading">{t('reviews.title')}</h2>
          <div className="map-reviews__reviews-list">
            {REVIEW_INDICES.map((i) => (
              <ReviewCard key={i} index={i} />
            ))}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="map-reviews__review-btn"
            >
              {t('reviews.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapAndReviews;
