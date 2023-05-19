import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


const DiscountedGames = () => {
    const clientId = 'f24B6m6kXF';

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(1);


    useEffect(() => {
        fetchData();
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
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchData}
                        hasMore={hasMore}
                        className='infinite-scroll-featured-games'
                    >

                        {data && data.map((game, idx) => (
                            <div key={idx} style={{ padding: '20px' }}>
                                <a href={game.url} target="_blank" style={{ textDecoration: 'none' }}>

                                    <img src={game.image_url} alt={`image of ${game.name}`} style={{ width: '200px', height: '200px', objectFit: 'cover', objectPosition: 'center' }} />
                                    <h5 className='text-center' style={{ paddingTop: '10px', color: 'teal' }}>{game.name}</h5>
                                    <h5 className='text-center'>
                                        ${game.price}
                                        <p style={{ textDecoration: 'line-through' }}>
                                            <i>${game.msrp}</i>
                                        </p>
                                        <h6>~{game.discount * 100}% off!</h6>


                                    </h5>
                                </a>
                            </div>
                        ))}
                    </InfiniteScroll>
                </Col>
            </Row>
        </Container>
    )
}

export default DiscountedGames