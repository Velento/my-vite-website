import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';

// Пример изображений для слайдера
import slide1 from '../images/slider1.jpg';
import slide2 from '../images/slider2.jpg';
import slide3 from '../images/slider3.jpg';

// Пример изображений для мобильных устройств
import mobileSlide1 from '../images/image1.jpg';
import mobileSlide2 from '../images/image2.jpg';
import mobileSlide3 from '../images/image3.jpg';

const SliderComponent = () => {
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
        <div>
          <picture>
            <source media="(max-width: 480px)" srcSet={mobileSlide1} />
            <img src={slide1} alt="Slide 1" />
          </picture>
        </div>
        <div>
          <picture>
            <source media="(max-width: 480px)" srcSet={mobileSlide2} />
            <img src={slide2} alt="Slide 2" />
          </picture>
        </div>
        <div>
          <picture>
            <source media="(max-width: 480px)" srcSet={mobileSlide3} />
            <img src={slide3} alt="Slide 3" />
          </picture>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
