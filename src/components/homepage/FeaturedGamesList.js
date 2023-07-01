import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingIcon from '../allpages/LoadingIcon';


const FeaturedGamesList = () => {
    const clientId = 'f24B6m6kXF';

    // For infinite scroll, we need a component state to track a flag to determine whether or not more data can be loaded.
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []);

    const fetchData = async () => {
        const topFeaturedUrl = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&pretty=true&client_id=${clientId}`;
        const response = await fetch(topFeaturedUrl);
        const jsonData = await response.json();
        setData(jsonData.games);
    };

    return (
        <>
            <Container className='homepage-section'>
                <h1>Featured Games</h1>
                {isLoading ? (
                    <>
                        <h2>Loading...</h2>
                        <LoadingIcon />
                    </>
                ) : (
                    data && (
                        <InfiniteScroll
                            dataLength={data.length}
                            className='infinite-scroll-featured-games'
                        >
                            {data.map((game, idx) => (
                                <div key={idx} style={{ padding: '20px' }}>
                                    <a href={game.url} target="_blank" style={{ textDecoration: 'none' }}>
                                        <img
                                            src={game.image_url}
                                            alt={`image of ${game.name}`}
                                            style={{ width: '200px', height: '200px', objectFit: 'cover', objectPosition: 'center' }}
                                        />
                                        <h5 className='text-center' style={{ paddingTop: '10px', color: 'teal' }}>{game.name}</h5>
                                    </a>
                                </div>
                            ))}
                        </InfiniteScroll>
                    )
                )}


            </Container>

        </>
    );
};

export default FeaturedGamesList