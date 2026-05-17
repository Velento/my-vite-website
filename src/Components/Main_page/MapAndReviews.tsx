import { useTranslation } from 'react-i18next';
import './MapAndReviews.css';

const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2324.5!2d18.6466!3d54.352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDIxJzA3LjIiTiAxOMKwMzgnNDcuOCJF!5e0!3m2!1spl!2spl!4v1700000000000';

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=Legal+Line+Gdansk';

const REVIEW_INDICES = [0, 1, 2] as const;

type ReviewCardProps = { index: (typeof REVIEW_INDICES)[number] };

const ReviewCard = ({ index }: ReviewCardProps) => {
  const { t } = useTranslation();
  return (
    <article className="review-card">
      <div className="review-card__stars" aria-label="5 na 5 gwiazdek">
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

  return (
    <section className="map-reviews" id="map">
      <div className="map-reviews__grid">
        {/* Google Map */}
        <div className="map-reviews__map-col">
          <h2 className="map-reviews__heading">{t('map.title')}</h2>
          <div className="map-reviews__map-wrap">
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
