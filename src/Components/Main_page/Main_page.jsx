import { useEffect } from 'react';
import SliderComponent from './Slider';
import MainPageSections from './MainPageSections';
import Services from './MainService';
import Pricelist from './Pricelist';
import Promotions from './Promotions';
import Menu from './Menu';
import Team from './Team';
import LeedForm from './LeedForm';

const MainPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#leedform') {
      // Use requestAnimationFrame to ensure DOM is rendered
      requestAnimationFrame(() => {
        const targetElement = document.getElementById('leedform');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, []);

  return (
    <main className="main-page">
      <Menu />
      <SliderComponent />
      <Pricelist />
      <MainPageSections />
      <Promotions />
      <LeedForm />
      <Services />
      <Team />
    </main>
  );
};

export default MainPage;
