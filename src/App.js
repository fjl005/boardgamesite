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
import BrowseUpdated from './pages/BrowseUpdated';
import ForumsUpdated from './pages/ForumsUpdated';

function App() {
    const routes = [
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/browse',
            element: <BrowseUpdated />,
        },
        {
            path: '/browse/search/:boardGameName/page/:currentPage',
            element: <Browse />,
        },
        {
            path: '/browse/search/:boardGameName',
            element: <Browse />,
        },
        {
            path: '/browse/page/:currentPage',
            element: <Browse />,
        },
        {
            path: '/forums/search/:forum/page/:currentPage',
            element: <Forums />,
        },
        {
            path: '/forums/search/:forum',
            element: <Forums />,
        },
        {
            path: '/forums/page/:currentPage',
            element: <Forums />,
        },
        {
            path: '/forums',
            element: <ForumsUpdated />,
        },
        {
            path: '/galoreposts/:title',
            element: <GalorePostTemplate />,
        },
        {
            path: '/galoreposts',
            element: <GalorePosts />,
        },
        {
            path: '/help',
            element: <Help />,
        },
        {
            path: '/makeapost',
            element: <MakePost />,
        },
        {
            path: '/myposts/:uniqueId',
            element: <MyPostArticle />,
        },
        {
            path: '/myposts',
            element: <MyPosts />,
        },
        {
            path: '/about',
            element: <About />,
        }
    ];

    return (
        <div className="App">
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
}


export default App;
