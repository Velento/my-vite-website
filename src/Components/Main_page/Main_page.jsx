import { useEffect, lazy, Suspense } from 'react';
import SliderComponent from './Slider';
import TrustBar from './TrustBar';
import MainPageSections from './MainPageSections';
import Pricelist from './Pricelist';
import Menu from './Menu';
import FadeInOnScroll from './FadeInOnScroll';

const LeedForm = lazy(() => import('./LeedForm'));
const Promotions = lazy(() => import('./Promotions'));
const Services = lazy(() => import('./MainService'));
const Team = lazy(() => import('./Team'));

const MainPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#leedform') {
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
      <FadeInOnScroll>
        <TrustBar />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <Pricelist />
      </FadeInOnScroll>
      <FadeInOnScroll>
        <MainPageSections />
      </FadeInOnScroll>
      <Suspense fallback={null}>
        <FadeInOnScroll>
          <Promotions />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <LeedForm />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Services />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Team />
        </FadeInOnScroll>
      </Suspense>
    </main>
  );
};

export default MainPage;
