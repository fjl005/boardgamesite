import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


const DiscountedGames = () => {
    const clientId = 'f24B6m6kXF';

    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);


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
                    <h2>Games on a Discount</h2>
                    <InfiniteScroll
                    dataLength={data.length}
                    next={fetchData}
                    hasMore={hasMore}
                    className='infinite-scroll-featured-games'
                >

                    {data && data.map((game, idx) => (
                        <div key={idx} style={{padding: '20px'}}>
                            <img src={game.image_url} alt={`image of ${game.name}`} style={{width: '300px', height: '300px', objectFit: 'cover', objectPosition: 'center'}}/>
                            <h4 className='text-center' style={{paddingTop: '10px'}}>{game.name}</h4>
                            {/* <p>{game.description_preview}</p> */}
                        </div>
                    ))}
                </InfiniteScroll>
                </Col>
            </Row>
        </Container>
    )
}

export default DiscountedGames