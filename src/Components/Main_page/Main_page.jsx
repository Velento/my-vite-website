import React from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';
import Services from './MainService'; 
import ImageCarousel from './ImageCarousel';

const MainPage = () => {
  return (
    <div className="main-page">
      <SliderComponent />
      {/* <ImageCarousel /> */}
      <MainPageSections />
      <Services />
    </div>
  );
};

export default MainPage;


