import { lazy, Suspense } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import MainPage from './Components/Main_page/Main_page';
import FloatingWhatsApp from './Components/Floating/FloatingWhatsApp';
import StickyMobileBar from './Components/Floating/StickyMobileBar';
import ExitIntentPopup from './Components/Floating/ExitIntentPopup';
import ScrollToTop from './Components/Floating/ScrollToTop';

const CookieConsent = lazy(() => import('./Components/Main_page/CookieConsent'));

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
      <Footer />
      {/* Floating layer - mounted at the app root so position:fixed always
          anchors to the viewport, not a transformed/scrolled parent. */}
      <FloatingWhatsApp />
      <StickyMobileBar />
      <ScrollToTop />
      <ExitIntentPopup />
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}

export default App;
