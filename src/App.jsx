import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Footer from './Components/Footer/Footer';
import MainPage from './Components/Main_page/Main_page';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import FeedbackForm from './Components/Main_page/FeedBackForm';

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

