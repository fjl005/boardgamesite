import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MiscellaneousGamesRow = () => {
    const gameIdsOfInterest = [1, 6, 7];
    const outerCol = [['homepage-card-pl-0', 'homepage-card-pr-0'], ['homepage-card-px-0']];
    const selectGamesData = galorePostsData.filter((gameData => gameIdsOfInterest.includes(gameData.id)));
    const updatedSelection = [selectGamesData.slice(0, 2), selectGamesData.slice(2)];

    return (
        <>
            {updatedSelection.map((selectionArr, index) => (
                <Container key={index} className='homepage-section-no-border'>
                    <Row>
                        {selectionArr.map((articleInfo, idx) => (
                            <Col
                                key={idx}
                                sm='12'
                                lg={index === 0 ? '6' : null}
                                className={outerCol[index][idx]}
                            >
                                <Col className='homepage-card'>
                                    <Link
                                        to={`/galoreposts/${concatTitle(articleInfo.title)}`}
                                        className='black-text'
                                    >
                                        <h3>{articleInfo.title}</h3>
                                        <LazyLoadImage
                                            src={articleInfo.img}
                                            width='100%'
                                            alt={articleInfo.title}
                                            placeholderSrc={'https://res.cloudinary.com/da7edv0cg/image/upload/v1708451909/samples/lazyGrayImage_slfgga.png'}
                                            effect='blur'
                                        />
                                    </Link>
                                    <p style={{ margin: '0.5rem auto' }}>{articleInfo.subTitle}</p>
                                </Col>

                            </Col>
                        ))}
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default MiscellaneousGamesRow;