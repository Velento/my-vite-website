import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import MainPage from './Components/Main_page/Main_page';

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;

