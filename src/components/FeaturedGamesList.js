import React from 'react'
import { useState, useEffect } from 'react';
import { Card, CardImg, CardTitle, CardBody, Container, Row, Col, Carousel, CarouselCaption, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';


const FeaturedGamesList = () => {

    // For infinite scroll, we need a component state to track a flag to determine whether or not more data can be loaded.
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // ----------------  CAROUSEL CODE!!! ----------------
    // Initialize the data from the api as an empty array, as it will become an array with data over time.
    // Initialize the active index to 0, regarding the carousel
    // Initialize the animating to false.
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const clientId = 'f24B6m6kXF';
        const url = `https://api.boardgameatlas.com/api/search?name=Catan&client_id=${clientId}`;
        const topFeaturedUrl = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&pretty=true&client_id=${clientId}`;

        const response = await fetch(topFeaturedUrl);
        const jsonData = await response.json();
        setData(jsonData.games);
    };

    // ----------------  CAROUSEL CODE!!! ----------------
    // const next = () => {
    //     if (animating) return;
    //     // If the activeIndex is the last item, the next carousel item will be 0. Otherwise, we increase by 1.
    //     const nextIndex = (activeIndex === data.length - 1) ? (0) : (activeIndex + 1);
    //     setActiveIndex(nextIndex);
    // }

    // const previous = () => {
    //     if (animating) return;
    //     // If the active index is the first item, the previous item will be the last item. Otherwise, we decrease by 1.
    //     const nextIndex = (activeIndex === 0) ? (data.length - 1) : (activeIndex - 1);
    //     setActiveIndex(nextIndex);
    // }

    // const goToIndex = (newIndex) => {
    //     if (animating) return;
    //     setActiveIndex(newIndex);
    // }

    // const slides = data ? (
    //     data.map((game, idx) => (
    //         <CarouselItem key={idx}>
    //             <img src={game.image_url} alt={`image of ${game.name}`} />
    //             {console.log('hello')}
    //             <CarouselCaption>
    //                 <h2>{game.name}</h2>
    //                 <p>{game.description_preview}</p>
    //             </CarouselCaption>
    //         </CarouselItem>
    //     ))
    // ) : null;

    return (
        <>
            <Container className='homepage-section container-fluid'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h1>Featured Games</h1>
                    <span>See All</span>
                </div>

                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchData}
                    hasMore={hasMore}
                    className='infinite-scroll-featured-games'
                >

                    {data && data.map((game, idx) => (
                        <div key={idx}>
                            <img src={game.image_url} alt={`image of ${game.name}`} />
                            <h2>{game.name}</h2>
                            <p>{game.description_preview}</p>
                        </div>
                    ))}
                </InfiniteScroll>

                {/* <Row>
                    <Carousel
                    className='featured-games-carousel'
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}>
                        <CarouselIndicators items={data} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
                        <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
                    </Carousel>

                </Row> */}

                {/* <Row>
                    {data && data.map((game, idx) => (
                        <Card key={idx}>
                            <CardImg src={game.image_url} />
                            <CardTitle>
                                <h2>{game.name}</h2>
                            </CardTitle>

                            <CardBody>
                                <p>{game.description_preview}</p>
                            </CardBody>

                            <img src={game.image_url} />
                        </Card>
                    ))}
                </Row> */}

            </Container>

        </>
    );
};

export default FeaturedGamesList