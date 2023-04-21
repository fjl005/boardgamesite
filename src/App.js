import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/allpages/Header';
import FeaturedGamesList from './components/homepage/FeaturedGamesList';
import Explore from './components/homepage/Explore';
import MiscellaneousGamesRow from './components/homepage/MiscellaneousGamesRow';
import GameOfTheWeek from './components/homepage/GameOfTheWeek';
import Footer from './components/allpages/Footer';
import TopTens from './components/homepage/TopRated';
import HomePage from './pages/HomePage';
import Browse from './pages/Browse';
import Forums from './pages/Forums';
import Help from './pages/Help';
import New from './pages/New';
import TopHits from './pages/TopHits';

function App() {


  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='browse/page/:currentPage' element={<Browse />} />
        <Route path='browse' element={<Browse />} />
        <Route path='browse/search/:boardGameName' element={<Browse />} />
        <Route path='browse/search/:boardGameName/page/:currentPage' element={<Browse />} />
        <Route path='forums' element={<Forums />} />
        <Route path='tophits' element={<TopHits />} />
        <Route path='new' element={<New />} />
        <Route path='help' element={<Help />} />
      </Routes>


    </div>
  );
}

export default App;
