import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

// Импорт картинок для слайдера
import slide1Ru from '../images/slider1.jpg';
import slide2Ru from '../images/slider2.jpg';
import mobileSlide1Ru from '../images/image1.jpg';
import mobileSlide2Ru from '../images/image2.jpg';

// Картинки для украинского языка
import slide1Ukr from '../images/slider1-ukr.jpg';
import slide2Ukr from '../images/slider2-ukr.jpg';
import mobileSlide1Ukr from '../images/image1-ukr.jpg';
import mobileSlide2Ukr from '../images/image2-ukr.jpg';

// Картинки для английского языка
import slide1Eng from '../images/slider1-eng.jpg';
import slide2Eng from '../images/slider2-eng.jpg';
import mobileSlide1Eng from '../images/image1-eng.jpg';
import mobileSlide2Eng from '../images/image2-eng.jpg';

// Картинки для польского языка
import slide1Pl from '../images/slider1-pl.jpg';
import slide2Pl from '../images/slider2-pl.jpg';
import mobileSlide1Pl from '../images/image1-pl.jpg';
import mobileSlide2Pl from '../images/image2-pl.jpg';

// Картинки для белорусского языка
import slide1Blr from '../images/slider1-blr.jpg';
import slide2Blr from '../images/slider2-blr.jpg';
import mobileSlide1Blr from '../images/image1-blr.jpg';
import mobileSlide2Blr from '../images/image2-blr.jpg';

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

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
      <Slider {...SLIDER_SETTINGS}>
        {slides.map((slide, index) => (
          <div key={index}>
            <picture>
              <source media="(max-width: 480px)" srcSet={mobileSlides[index]} />
              <img
                src={slide}
                alt={t('slider.alt', { index: index + 1 })}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </picture>
          </div>
        ))}
      </Slider>
      <div className="slider-cta-overlay">
        <p className="slider-cta-subtitle">
          {t('slider.subtitle', 'Karta pobytu, legalizacja, dokumenty')}
        </p>
        <a href="#leedform" className="slider-cta-button">
          {t('slider.cta', 'Bezpłatna konsultacja')}
        </a>
      </div>
    </section>
  );
};

export default SliderComponent;
