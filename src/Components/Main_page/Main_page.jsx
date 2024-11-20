import React from 'react';
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


