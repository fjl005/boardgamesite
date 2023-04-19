import Header from '../components/allpages/Header';
import FeaturedGamesList from '../components/homepage/FeaturedGamesList';
import Explore from '../components/homepage/Explore';
import MiscellaneousGamesRow from '../components/homepage/MiscellaneousGamesRow';
import GameOfTheWeek from '../components/homepage/GameOfTheWeek';
import Footer from '../components/allpages/Footer';
import TopRated from '../components/homepage/TopRated';
import DiscountedGames from '../components/homepage/DiscountedGames';

const HomePage = () => {

    return (
        <>
            <Header />
            <Explore />
            <MiscellaneousGamesRow />
            <GameOfTheWeek />
            <FeaturedGamesList />
            <TopRated />
            <DiscountedGames />
            <Footer />
        </>
    )
}

export default HomePage