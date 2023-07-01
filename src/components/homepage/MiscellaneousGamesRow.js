import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lazyGrayImage from '../../img/lazyGrayImage.png';
import penguins from '../../img/penguins.jpg';
import genericMeeples from '../../img/genericMeeples.jpg';
import alone from '../../img/alone.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';

const MiscellaneousGamesRow = () => {
    const [, wingspan, , , , , honestReview, aloneGames] = galorePostsData;

    return (
        <>
            <Container className='homepage-section-no-border'>
                <Row>
                    <Col sm='12' lg='6' className='no-left-padding'>
                        <Col className='homepage-card'>
                            <Link
                                to={`/galoreposts/${concatTitle(wingspan.title)}`}
                                className="link-no-decor-black"
                            >
                                <h3>Coming Soon... Wingspan Antarctica!</h3>
                                <LazyLoadImage
                                    src={penguins}
                                    width='100%'
                                    alt='Cute Penguins!'
                                    placeholderSrc={lazyGrayImage}
                                    effect='blur'
                                />
                                <p>"Well waddle you know, we're famous!"</p>
                            </Link>
                        </Col>
                    </Col>

                    <Col lg='6' className='no-right-padding'>
                        <Col className='homepage-card ml-5'>
                            <Link
                                to={`/galoreposts/${concatTitle(honestReview.title)}`}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <h3>Honest Review: The Best Game Ever?</h3>
                                <LazyLoadImage
                                    src={genericMeeples}
                                    width='100%'
                                    alt='Board Game Meeples'
                                    placeholderSrc={lazyGrayImage}
                                    effect='blur'
                                />
                                <p>Hint: it's not Monopoly.</p>
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section-no-border'>
                <Row>
                    <Col className='homepage-card'>
                        <Link
                            to={`/galoreposts/${concatTitle(aloneGames.title)}`}
                            className="link-no-decor-black"
                        >
                            <h3>Solo Games vs. with Friends?</h3>
                            <LazyLoadImage
                                src={alone}
                                alt='Alone Man'
                                width='100%'
                                style={{ height: '330px' }}
                                placeholderSrc={lazyGrayImage}
                                effect='blur'
                            />
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MiscellaneousGamesRow;