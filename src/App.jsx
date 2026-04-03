import { lazy, Suspense } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

// Lazy loading — компоненты загружаются только когда нужны
const MainPage = lazy(() => import('./Components/Main_page/Main_page'));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <MainPage />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
