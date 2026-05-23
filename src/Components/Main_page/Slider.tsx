import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_HREF } from '../../constants/contact';
import { prefersReducedMotion } from '../../utils/motion';
import './Slider.css';

const SLIDE_COUNT = 3;
const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Lightweight hero slider — a crossfade carousel for three CSS-only slides.
 * Replaces Swiper (~124 kB) since the banner has no images and only needs a
 * fade, autoplay, dots and touch swipe.
 */
const SliderComponent = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((index: number) => {
    setActive(((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  // Autoplay — the timer resets whenever `active` changes (autoplay or manual
  // nav) so a manual jump gets the full interval before the next advance.
  useEffect(() => {
    if (paused) return undefined;
    if (prefersReducedMotion()) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % SLIDE_COUNT), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(active + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const slideLabel = (n: number) =>
    t('slider.slideLabel', {
      number: n,
      total: SLIDE_COUNT,
      defaultValue: `${n} / ${SLIDE_COUNT}`,
    });

  return (
    <section
      className="slider-container"
      aria-label={t('slider.bannerLabel')}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h1 className="visually-hidden">{t('seo.h1')}</h1>
      <div className="slider-track" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Slide 1 - hero positioning (CSS-only, dark navy + gold accent) */}
        <div
          className={`slider-slide${active === 0 ? ' is-active' : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={slideLabel(1)}
          aria-hidden={active !== 0}
        >
          <div className="slide-hero">
            <div className="slide-hero__inner">
              <span className="slide-hero__badge">{t('slider.heroSlide.badge')}</span>
              <h2 className="slide-hero__title">{t('slider.heroSlide.title')}</h2>
              <p className="slide-hero__text">{t('slider.heroSlide.text')}</p>
              <div className="slide-hero__ctas">
                <a href="#leedform" className="slide-hero__cta">
                  {t('slider.heroSlide.ctaPrimary')}
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slide-hero__cta slide-hero__cta--ghost"
                >
                  {t('slider.heroSlide.ctaSecondary')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - trust / guarantees (CSS-only, light card with bullets) */}
        <div
          className={`slider-slide${active === 1 ? ' is-active' : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={slideLabel(2)}
          aria-hidden={active !== 1}
        >
          <div className="slide-trust">
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
        </div>

        {/* Slide 3 - promotional pricing banner (CSS-only, no image needed) */}
        <div
          className={`slider-slide${active === 2 ? ' is-active' : ''}`}
          role="group"
          aria-roledescription="slide"
          aria-label={slideLabel(3)}
          aria-hidden={active !== 2}
        >
          <div className="slide-promo">
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
        </div>

        {/* Pagination dots - inside the track so they overlay the slides,
            not the hero CTA block that follows. */}
        <div className="slider-dots">
          {([0, 1, 2] as const).map((i) => (
            <button
              key={i}
              type="button"
              className={`slider-dot${active === i ? ' is-active' : ''}`}
              aria-label={slideLabel(i + 1)}
              aria-current={active === i}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

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
