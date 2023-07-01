import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import LoadingIcon from "../allpages/LoadingIcon";

const TopRated = () => {
    const clientId = 'f24B6m6kXF';
    const [gameData, setGameData] = useState([]);
    const [forumData, setForumData] = useState([]);
    const [catanTopFour, setCatanTopFour] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Then, use useEffect as all api calls are side effects
    useEffect(() => {
        fetchGameData();
        fetchForumData();
        fetchCatanData();
        setIsLoading(false);
    }, []);

    // Now, define fetchgameData with an async function
    const fetchGameData = async () => {
        // This api requires the client id in order to fetch the gameData.
        const topGameUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=true&limit=5&client_id=${clientId}`;

        // With the URL set, let's fetch the gameData from the URL which will return a promise.
        const response = await fetch(topGameUrl);

        // Once promise is received, we will convert to JSON
        const jsonGameData = await response.json();

        // Lastly, update gameData state. The gameData we need is in the games property. 
        setGameData(jsonGameData.games);
    }


    //  FORUMS
    const fetchForumData = async () => {
        const topForumUrl = `https://api.boardgameatlas.com/api/forum?limit=5&order_by=popularity&client_id=${clientId}`;
        // forum_posts: we're searching for forum posts instead of games
        // limit=5: specifies the maximum number of results to return, which is 5
        // order_by=popularity: order by popularity, most popular first
        // type=thread: we're looking for forum posts

        // With the URL set, let's fetch the gameData from the URL which will return a promise.
        const response = await fetch(topForumUrl);

        // Once promise is received, we will convert to JSON
        const jsonForumData = await response.json();

        // Lastly, update gameData state. The gameData we need is in the games property. 
        setForumData(jsonForumData.posts);
    }


    const fetchCatanData = async () => {
        const catanTopFourUrl = `https://api.boardgameatlas.com/api/search?name=Catan&order_by=popularity&ascending=false&skip=1&limit=4&client_id=${clientId}`;
        const response = await fetch(catanTopFourUrl);
        const jsonCatanData = await response.json();
        setCatanTopFour(jsonCatanData.games);
    }

    return (
        <Container className='homepage-section-no-border'>
            <Row className='d-flex justify-content-between'>
                <Col xs='12' md='3' className='homepage-card d-flex flex-column top-rated-xs-marginbottom'>
                    <h1 >Top Rated Games</h1>
                    {isLoading ? (
                        <>
                            <h2>Loading...</h2>
                            <LoadingIcon />
                        </>
                    ) : (

                        <ul style={{ paddingLeft: '0', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {/* Flex: 1 allows us to ul element to grow and take up the available vertical space within the container.  */}
                            {gameData && gameData.map((game, idx) => (
                                <li className='homepage-explore-list-items' key={idx}>
                                    <div className='d-flex top-rated-center-align'>
                                        <a href={game.url} target="_blank" >
                                            <img src={game.image_url} alt={`image of ${game.name}`} className='top-rated-img' />
                                        </a>
                                        <div className='d-flex flex-column justify-content-center' style={{ paddingLeft: '20px' }}>
                                            <a href={game.url} target="_blank" style={{ textDecoration: 'none' }}>
                                                <h5 style={{ textDecoration: 'none' }}>{game.name}</h5>
                                                <span className='top-rated-text link-no-decor-black'>{game.year_published}, ${game.price}</span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </Col>


                <Col xs='12' md='4' className='homepage-card d-flex flex-column top-rated-xs-marginbottom'>
                    <h1>Catan Varieties</h1>
                    <Container style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Row className='justify-content-center'>
                            {isLoading ? (
                                <>
                                    <h2>Loading...</h2>
                                    <LoadingIcon />
                                </>
                            ) : (
                                <>
                                    {catanTopFour && catanTopFour.map((game, idx) => (
                                        <Col key={idx} xl='5' md='12'>
                                            <div className='d-flex flex-column align-items-center'>
                                                <a href={game.url} target="_blank" style={{ textDecoration: 'none' }}>
                                                    <div className='text-center'>
                                                        <img
                                                            src={game.image_url}
                                                            alt={`image of ${game.name}`}
                                                            className='top-ranked-items'
                                                            style={{
                                                                width: '100%',
                                                                maxWidth: '130px',
                                                                height: 'auto',
                                                                objectFit: 'cover',
                                                                objectPosition: 'center',
                                                                margin: '10px'
                                                            }}
                                                        />
                                                        <h4 className='text-center'>{game.name}</h4>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                    ))}
                                </>
                            )}
                        </Row>
                    </Container>
                </Col>

                <Col xs='12' md='4' className='homepage-card d-flex flex-column top-rated-xs-marginbottom'>
                    <h1>Top Rated Forums</h1>
                    <ul style={{ paddingLeft: '0px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {isLoading ? (
                            <>
                                <h2>Loading...</h2>
                                <LoadingIcon />
                            </>
                        ) : (
                            <>
                                {forumData && forumData.map((forum, idx) => (
                                    <li className='homepage-explore-list-items' key={idx}>
                                        <div className='d-flex top-rated-center-align'>
                                            <a href={forum.url} target="_blank">
                                                <img src={forum.image_url} alt={`image of ${forum.title}`} className='top-rated-img' />
                                            </a>
                                            <div className='d-flex flex-column justify-content-center' style={{ paddingLeft: '20px' }}>
                                                <a href={forum.url} target="_blank" style={{ textDecoration: 'none' }}>
                                                    <h5>{forum.title}</h5>
                                                    <span className='top-rated-text' style={{ textDecoration: 'none', color: 'black' }}>By {forum.user.username}</span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </>)}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default TopRated;