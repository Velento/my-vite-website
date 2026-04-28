import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, A11y } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './Slider.css';

// Картинки для каждого языка
import slide1Ru from '../images/slider1.jpg';
import slide2Ru from '../images/slider2.jpg';
import mobileSlide1Ru from '../images/image1.jpg';
import mobileSlide2Ru from '../images/image2.jpg';

import slide1Ukr from '../images/slider1-ukr.jpg';
import slide2Ukr from '../images/slider2-ukr.jpg';
import mobileSlide1Ukr from '../images/image1-ukr.jpg';
import mobileSlide2Ukr from '../images/image2-ukr.jpg';

import slide1Eng from '../images/slider1-eng.jpg';
import slide2Eng from '../images/slider2-eng.jpg';
import mobileSlide1Eng from '../images/image1-eng.jpg';
import mobileSlide2Eng from '../images/image2-eng.jpg';

import slide1Pl from '../images/slider1-pl.jpg';
import slide2Pl from '../images/slider2-pl.jpg';
import mobileSlide1Pl from '../images/image1-pl.jpg';
import mobileSlide2Pl from '../images/image2-pl.jpg';

import slide1Blr from '../images/slider1-blr.jpg';
import slide2Blr from '../images/slider2-blr.jpg';
import mobileSlide1Blr from '../images/image1-blr.jpg';
import mobileSlide2Blr from '../images/image2-blr.jpg';

// Третий слайд — overlay с текстом, общий для всех языков
import slide3Bg from '../images/slider3.jpg';
import slide3BgMobile from '../images/slider3_768px.jpg';

const SLIDES_BY_LANG = {
  ua: { slides: [slide1Ukr, slide2Ukr], mobile: [mobileSlide1Ukr, mobileSlide2Ukr] },
  en: { slides: [slide1Eng, slide2Eng], mobile: [mobileSlide1Eng, mobileSlide2Eng] },
  pl: { slides: [slide1Pl, slide2Pl], mobile: [mobileSlide1Pl, mobileSlide2Pl] },
  by: { slides: [slide1Blr, slide2Blr], mobile: [mobileSlide1Blr, mobileSlide2Blr] },
  ru: { slides: [slide1Ru, slide2Ru], mobile: [mobileSlide1Ru, mobileSlide2Ru] },
};

const SliderComponent = () => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const { slides, mobile: mobileSlides } = SLIDES_BY_LANG[language] ?? SLIDES_BY_LANG.ru;

  return (
    <section className="slider-container" aria-label="Banner">
      <h1 className="visually-hidden">{t('seo.h1')}</h1>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        speed={700}
        pagination={{ clickable: true }}
        a11y={{ enabled: true }}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <picture>
              <source media="(max-width: 480px)" srcSet={mobileSlides[index]} />
              <img
                src={slide}
                alt={t('slider.alt', { index: index + 1 })}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <div className="slide-overlay">
            <picture>
              <source media="(max-width: 480px)" srcSet={slide3BgMobile} />
              <img
                src={slide3Bg}
                alt={t('slider.newSlide.title')}
                loading="lazy"
                className="slide-overlay__bg"
              />
            </picture>
            <div className="slide-overlay__content">
              <h2 className="slide-overlay__title">{t('slider.newSlide.title')}</h2>
              <p className="slide-overlay__text">{t('slider.newSlide.text')}</p>
              <a href="#pricelist" className="slide-overlay__btn">
                {t('packages.orderBtn')}
              </a>
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
