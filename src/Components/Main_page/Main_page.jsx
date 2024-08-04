import React from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';
import Services from './MainService'; 
import ImageCarousel from './ImageCarousel';
import Pricelist from './Pricelist';

const MainPage = () => {
  return (
    <div className="main-page">
      <SliderComponent />
      {/* <ImageCarousel /> */}
      <Pricelist />
      <MainPageSections />
      <Services />
    </div>
  );
};

export default MainPage;


