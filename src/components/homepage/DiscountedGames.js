import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from "../allpages/LoadingIcon";

const DiscountedGames = () => {
    const clientId = 'f24B6m6kXF';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []);

    const fetchData = async () => {
        const topDiscountedUrl = `https://api.boardgameatlas.com/api/search?order_by=discount&ascending=false&limit=25&client_id=${clientId}`;
        const response = await fetch(topDiscountedUrl);
        const jsonData = await response.json();
        setData(jsonData.games);
    };

    return (
        <Container className='homepage-section'>
            <Row>
                <Col>
                    <h2>Discounted Games</h2>

                    {isLoading ? (
                        <>
                            <h2>Loading...</h2>
                            <LoadingIcon />
                        </>
                    ) : (
                        <>
                            <InfiniteScroll
                                dataLength={data.length}
                                className='infinite-scroll-featured-games'
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
                                            <p className='link-no-decor-black' style={{ textDecoration: 'line-through' }}>
                                                <i>${game.msrp}</i>
                                            </p>
                                            <strong>
                                                <span className='link-no-decor-black' style={{ fontSize: '20px' }}>~{game.discount * 100}% off!</span>
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