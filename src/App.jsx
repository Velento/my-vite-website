import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import Main_page from './Components/Main_page/Main_page';

function App() {
  return (
    <div className="App">
      <Header />
      <Main_page />
      <Footer />
    </div>
  );
}

export default App;

