import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

const TopRated = () => {
    const clientId = 'f24B6m6kXF';


    // GAMES

    // First, set the data and the setData to an empty array state
    const [gameData, setGameData] = useState([]);

    // Then, use useEffect as all api calls are side effects
    useEffect(() => {
        fetchGameData();
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

    // First, set the data and the setData to an empty array state
    const [forumData, setForumData] = useState([]);

    // Then, use useEffect as all api calls are side effects
    useEffect(() => {
        fetchForumData();
    }, []);

    // Now, define fetchgameData with an async function
    const fetchForumData = async () => {
        // This api requires the client id in order to fetch the gameData.
        const topForumUrl = `https://api.boardgameatlas.com/api/forum?limit=5&order_by=popularity&client_id=${clientId}`;
        // forum_posts: we're searching for forum posts instead of games
        // limit=10: specifies the maximum number of results to return, which is 10
        // order_by=popularity: order by popularity, most popular first
        // type=thread: we're looking for forum posts

        // With the URL set, let's fetch the gameData from the URL which will return a promise.
        const response = await fetch(topForumUrl);

        // Once promise is received, we will convert to JSON
        const jsonForumData = await response.json();

        // Lastly, update gameData state. The gameData we need is in the games property. 
        setForumData(jsonForumData.posts);
    }


    // Do this for Catan
    const [catanTopFour, setCatanTopFour] = useState([]);
    useEffect(() => {
        fetchCatanData();
    }, []);

    const fetchCatanData = async () => {
        const catanTopFourUrl = `https://api.boardgameatlas.com/api/search?name=Catan&order_by=popularity&ascending=false&limit=4&client_id=${clientId}`;
        const response = await fetch(catanTopFourUrl);
        const jsonCatanData = await response.json();
        setCatanTopFour(jsonCatanData.games);
    }


    return (
        <Container style={{ maxWidth: '80%' }}>
            <Row className='d-flex justify-content-between'>
                <Col sm='3' className='homepage-card'>
                    <h1 >Top Rated Games</h1>

                    {gameData && gameData.map((game, idx) => (
                        <div key={idx} className='d-flex'>
                            <img src={game.image_url} alt={`image of ${game.name}`} style={{ width: '100px', height: '100px', objectFit: 'cover', objectPosition: 'center', margin: '10px' }} />
                            <div className='d-flex flex-column justify-content-center' style={{ paddingLeft: '20px' }}>
                                <h5>{game.name}</h5>
                                <span>{game.year_published}, ${game.price}</span>
                            </div>
                        </div>
                    ))}

                </Col>
                <Col sm='4' className='homepage-card'>
                    <h1>Catan Varieties</h1>
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            {catanTopFour && catanTopFour.map((game, idx) => (
                                <Col key={idx} sm='5'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <img src={game.image_url} alt={`image of ${game.name}`} style={{ width: 'auto', height: '225px', objectFit: 'cover', objectPosition: 'center', margin: '10px' }} />
                                        <h4 className='text-center'>{game.name}</h4>
                                    </div>

                                </Col>

                            ))}
                        </Row>
                    </Container>

                </Col>

                <Col sm='4' className='homepage-card'>
                    <h1>Top Rated Forums</h1>

                    {forumData && forumData.map((forum, idx) => (
                        <div key={idx} className='d-flex'>
                            <img src={forum.image_url} alt={`image of ${forum.title}`} style={{ width: '100px', height: '100px', objectFit: 'cover', objectPosition: 'center', margin: '10px' }} />
                            <div className='d-flex flex-column justify-content-center' style={{ paddingLeft: '20px' }}>
                                <h5>{forum.title}</h5>
                                <span>By {forum.user.username}</span>
                            </div>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    )
}

export default TopRated;