import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FeaturedGamesList from './components/FeaturedGamesList';
import Explore from './components/Explore';
import MiscellaneousGamesRow from './components/MiscellaneousGamesRow';
import GameOfTheWeek from './components/GameOfTheWeek';
import Footer from './components/Footer';
import TopTens from './components/TopTens';

function App() {


  return (
    <div className="App">

      <Header />
      <Explore />
      <MiscellaneousGamesRow />
      <FeaturedGamesList />
      <GameOfTheWeek />
      <TopTens />
      <Footer />

    </div>
  );
}

export default App;
