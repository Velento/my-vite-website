import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, A11y } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './Slider.css';

const SliderComponent = () => {
  const { i18n, t } = useTranslation();

  return (
    <section className="slider-container" aria-label={t('slider.bannerLabel')}>
      <h1 className="visually-hidden">{t('seo.h1')}</h1>
      {/* `key={i18n.language}` forces Swiper to remount on language switch so
          the text inside CSS slides refreshes immediately. */}
      <Swiper
        key={i18n.language}
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={700}
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        slidesPerView={1}
      >
        {/* Slide 1 - hero positioning (CSS-only, dark navy + gold accent) */}
        <SwiperSlide>
          <div className="slide-hero" role="img" aria-label={t('slider.heroSlide.title')}>
            <div className="slide-hero__inner">
              <span className="slide-hero__badge">{t('slider.heroSlide.badge')}</span>
              <h2 className="slide-hero__title">{t('slider.heroSlide.title')}</h2>
              <p className="slide-hero__text">{t('slider.heroSlide.text')}</p>
              <div className="slide-hero__ctas">
                <a href="#leedform" className="slide-hero__cta">
                  {t('slider.heroSlide.ctaPrimary')}
                </a>
                <a
                  href="https://wa.me/48883734171"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slide-hero__cta slide-hero__cta--ghost"
                >
                  {t('slider.heroSlide.ctaSecondary')}
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - trust / guarantees (CSS-only, light card with bullets) */}
        <SwiperSlide>
          <div className="slide-trust" role="img" aria-label={t('slider.trustSlide.title')}>
            <div className="slide-trust__inner">
              <h2 className="slide-trust__title">{t('slider.trustSlide.title')}</h2>
              <ul className="slide-trust__list">
                {([0, 1, 2, 3] as const).map((i) => (
                  <li key={i} className="slide-trust__item">
                    {t(`slider.trustSlide.list.${i}`)}
                  </li>
                ))}
              </ul>
              <a href="#leedform" className="slide-trust__cta">
                {t('slider.trustSlide.cta')}
              </a>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - promotional pricing banner (CSS-only, no image needed) */}
        <SwiperSlide>
          <div className="slide-promo" role="img" aria-label={t('slider.promoSlide.title')}>
            <div className="slide-promo__inner">
              <div className="slide-promo__copy">
                <span className="slide-promo__badge">{t('slider.promoSlide.badge')}</span>
                <h2 className="slide-promo__title">
                  {t('slider.promoSlide.titleMain')}{' '}
                  <span>{t('slider.promoSlide.titlePrice')}</span>
                </h2>
                <p className="slide-promo__subtitle">{t('slider.promoSlide.subtitle')}</p>
                <div className="slide-promo__ctas">
                  <a href="#pricelist" className="slide-promo__cta">
                    {t('slider.promoSlide.cta')}
                  </a>
                  <a href="#leedform" className="slide-promo__cta slide-promo__cta--ghost">
                    {t('slider.promoSlide.ctaSecondary')}
                  </a>
                </div>
              </div>
              <div className="slide-promo__cards" aria-hidden="true">
                {([0, 1, 2] as const).map((i) => (
                  <div key={i} className="slide-promo__card">
                    <span className="slide-promo__card-dot" />
                    <span className="slide-promo__card-text">
                      {t(`slider.promoSlide.list.${i}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="hero-cta">
        <p className="hero-cta__subtitle">
          {t('slider.subtitle', 'Karta pobytu, legalizacja, dokumenty')}
        </p>
        <a href="#leedform" className="hero-cta__button">
          {t('slider.cta', 'Bezpłatna konsultacja')}
        </a>
      </div>
    </section>
  );
};

export default SliderComponent;
