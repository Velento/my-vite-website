import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const SliderComponent = () => {
  const { i18n } = useTranslation(); // Получаем объект i18n
  const language = i18n.language; // Получаем текущий язык

  // Определяем картинки в зависимости от выбранного языка
  let slides, mobileSlides;

  switch (language) {
    case 'ua':
      slides = [slide1Ukr, slide2Ukr];
      mobileSlides = [mobileSlide1Ukr, mobileSlide2Ukr];
      break;
    case 'en':
      slides = [slide1Eng, slide2Eng];
      mobileSlides = [mobileSlide1Eng, mobileSlide2Eng];
      break;
    case 'pl':
      slides = [slide1Pl, slide2Pl];
      mobileSlides = [mobileSlide1Pl, mobileSlide2Pl];
      break;
    case 'by':
      slides = [slide1Blr, slide2Blr];
      mobileSlides = [mobileSlide1Blr, mobileSlide2Blr];
      break;
    default: // 'ru' — язык по умолчанию
      slides = [slide1Ru, slide2Ru];
      mobileSlides = [mobileSlide1Ru, mobileSlide2Ru];
      break;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <picture>
              <source media="(max-width: 480px)" srcSet={mobileSlides[index]} />
              <img src={slide} alt={`Slide ${index + 1}`} />
            </picture>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
