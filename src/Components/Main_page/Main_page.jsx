import React, { useEffect } from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';
import Services from './MainService';
// import ImageCarousel from './ImageCarousel';
import Pricelist from './Pricelist';
import Promotions from './Promotions';
import Menu from './Menu';
import Team from './Team';
import LeedForm from './LeedForm';

const MainPage = () => {
  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (hash === '#leedform') {
        const targetElement = document.getElementById('leedform');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log('Элемент с id "leedform" не найден.');
        }
      }
    };
  
    // Запуск после полной загрузки DOM
    window.addEventListener('load', handleScrollToHash);
    return () => window.removeEventListener('load', handleScrollToHash);
  }, []);
  

  return (
    <div className="main-page">
      <Menu />
      <SliderComponent />
      {/* <ImageCarousel /> */}
      <Pricelist />
      <MainPageSections />
      <Promotions />
            <LeedForm />
            <Services />
      <Team />
    </div>
  );
};

export default MainPage;


