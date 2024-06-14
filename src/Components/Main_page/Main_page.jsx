import React from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';

const MainPage = () => {
  return (
    <div className="main-page">
      <SliderComponent />
      <MainPageSections />
    </div>
  );
};

export default MainPage;
