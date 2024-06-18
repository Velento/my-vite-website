import React from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';
import Services from './MainService'; // Импортируем новый компонент

const MainPage = () => {
  return (
    <div className="main-page">
      <SliderComponent />
      <MainPageSections />
      <Services />
    </div>
  );
};

export default MainPage;


