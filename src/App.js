import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Browse from './pages/Browse';
import Forums from './pages/Forums';
import Help from './pages/Help';
import GalorePosts from './pages/GalorePosts';
import GalorePostTemplate from './components/galorepostspage/GalorePostTemplate';
import MakePost from './pages/MakePost';
import MyPosts from './pages/MyPosts';
import MyPostArticle from './components/mypostspage/MyPostArticle';
import About from './pages/About';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse/search/:boardGameName/page/:currentPage" element={<Browse />} />
                <Route path="/browse/search/:boardGameName" element={<Browse />} />
                <Route path="/browse/page/:currentPage" element={<Browse />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/forums/search/:forum/page/:currentPage" element={<Forums />} />
                <Route path="/forums/search/:forum" element={<Forums />} />
                <Route path="/forums/page/:currentPage" element={<Forums />} />
                <Route path="/forums" element={<Forums />} />
                <Route path="/galoreposts/:title" element={<GalorePostTemplate />} />
                <Route path="/galoreposts" element={<GalorePosts />} />
                <Route path="/help" element={<Help />} />
                <Route path="/makeapost" element={<MakePost />} />
                <Route path="/myposts/:uniqueId" element={<MyPostArticle />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}


export default App;
