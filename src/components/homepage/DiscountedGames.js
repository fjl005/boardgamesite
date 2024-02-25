import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from "../allpages/LoadingIcon";

const DiscountedGames = () => {
    const clientId = 'f24B6m6kXF';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []);

    const fetchData = async () => {
        try {
            const topDiscountedUrl = `https://api.boardgameatlas.com/api/search?order_by=discount&ascending=false&limit=25&client_id=${clientId}`;
            // const topDiscountedUrl = `triggerFetchError`;
            const response = await fetch(topDiscountedUrl);
            const jsonData = await response.json();
            setData(jsonData.games);
            setFetchError(false);
        } catch (error) {
            console.log('Error: ', error);
            setFetchError(true);
        }

    };

    return (
        <Container className='homepage-section'>
            <Row>
                <Col>
                    <h2>Discounted Games</h2>

                    {isLoading ? (
                        <>
                            <h4>Loading...</h4>
                            <LoadingIcon />
                        </>
                    ) : fetchError ? (
                        <>
                            <h4>Sorry, there was an error fetching the data.</h4>
                            <p>Please refresh and try again. If the problem persists, then the BGA API might be down. </p>
                        </>
                    ) :
                        (
                            <>
                                <InfiniteScroll
                                    dataLength={data.length}
                                    className='d-flex'
                                >
                                    {data && data.map((game, idx) => (
                                        <div key={idx} style={{ padding: '20px' }} className='text-center'>
                                            <a href={game.url} target="_blank" style={{ textDecoration: 'none' }}>
                                                <img
                                                    src={game.image_url}
                                                    alt={`image of ${game.name}`}
                                                    style={{
                                                        width: '200px',
                                                        height: '200px',
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}
                                                />
                                                <h5 className='text-center' style={{ paddingTop: '10px' }}>{game.name}</h5>
                                                <h5><strong>${game.price}</strong></h5>
                                                <p className='black-text' style={{ textDecoration: 'line-through' }}>
                                                    <i>${game.msrp}</i>
                                                </p>
                                                <strong>
                                                    <span className='black-text' style={{ fontSize: '20px' }}>~{game.discount * 100}% off!</span>
                                                </strong>
                                            </a>
                                        </div>
                                    ))}
                                </InfiniteScroll>
                            </>
                        )}
                </Col>
            </Row>
        </Container>
    )
}

export default DiscountedGames