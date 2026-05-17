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
// MapAndReviews carries a Google Maps iframe — load it last so it doesn't
// block the slider/forms above the fold.
const MapAndReviews = lazy(() => import('./MapAndReviews'));

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
    <main className="main-page" id="main-content">
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
        <FadeInOnScroll>
          <MapAndReviews />
        </FadeInOnScroll>
      </Suspense>
    </main>
  );
};

export default MainPage;
