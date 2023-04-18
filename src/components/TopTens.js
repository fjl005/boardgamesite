import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";

const TopTens = () => {

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
        const clientId = 'f24B6m6kXF';
        const topTenGameUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=true&limit=10&client_id=${clientId}`;

        // With the URL set, let's fetch the gameData from the URL which will return a promise.
        const response = await fetch(topTenGameUrl);

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
        const clientId = 'f24B6m6kXF';
        const topTenForumUrl = `https://api.boardgameatlas.com/api/forum?limit=10&order_by=popularity&client_id=${clientId}`;
        // forum_posts: we're searching for forum posts instead of games
        // limit=10: specifies the maximum number of results to return, which is 10
        // order_by=popularity: order by popularity, most popular first
        // type=thread: we're looking for forum posts

        // With the URL set, let's fetch the gameData from the URL which will return a promise.
        const response = await fetch(topTenForumUrl);

        // Once promise is received, we will convert to JSON
        const jsonForumData = await response.json();

        // Lastly, update gameData state. The gameData we need is in the games property. 
        setForumData(jsonForumData.posts);
    }



    return (
        <Container className='homepage-section'>
            <Row>
                <Col sm='6'>
                    <h1>Top Ten Games</h1>

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

                <Col sm='6'>
                    <h1>Top Ten Forums</h1>

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

export default TopTens