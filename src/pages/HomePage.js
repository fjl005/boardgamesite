import NavbarApp from '../components/allpages/NavbarApp';
// import FeaturedGamesList from '../components/homepage/FeaturedGamesList';
import Explore from '../components/homepage/Explore';
import MiscellaneousGamesRow from '../components/homepage/MiscellaneousGamesRow';
import GameOfTheWeek from '../components/homepage/GameOfTheWeek';
// import TopRated from '../components/homepage/TopRated';
// import DiscountedGames from '../components/homepage/DiscountedGames';
import { NAVBAR_HEADERS } from '../components/allpages/navbarHeaders';

const HomePage = () => {

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.homepage} />
            <Explore />
            <MiscellaneousGamesRow />
            <GameOfTheWeek />
            {/* <FeaturedGamesList /> */}
            {/* <TopRated /> */}
            {/* <DiscountedGames /> */}
        </>
    )
}

export default HomePage