import Header from "../components/allpages/Header";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../utils/concatTitle";
import { galorePostsData } from "../components/galorepostspage/galorePostsData";
import GalorePostPopular from "../components/galorepostspage/GalorePostPopular";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import lazyGrayImage from '../img/lazyGrayImage.png';
// import 'react-lazy-load-image-component/src/effects/blur.css';

const GalorePosts = () => {
    const [concordiaPost, wingspanPost, strategyPost] = galorePostsData;

    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Posts from Bored Games Galore</h1>
                        <p>Welcome to the Galore Posts Section! <strong>This part of the site does NOT use the Board Game Atlas API.</strong> Instead, this is all data made by Frank. Trending and popular posts are shown here. If you want to contribute, then feel free to make a post in the "Make a Post" section. Your posts will be shown in the "My Posts" section. After careful review, your post may be eligible to the Trending and/or Popular Section!</p>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section-no-border'>
                <Row>
                    <Col>
                        <h4>Trending Today</h4>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12' lg='6' xl='4'>
                        <Link to={`/galoreposts/${concatTitle(concordiaPost.title)}`}>
                            <div
                                className="galore-posts-highlight-container">
                                <img
                                    src={concordiaPost.img}
                                    alt="Concordia"
                                />
                                <div class="galore-posts-img-overlay"></div>
                                <div className="image-text">
                                    <h2>Concordia</h2>
                                    <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
                                </div>
                            </div>
                        </Link>

                    </Col>

                    <Col sm='12' lg='6' xl='4'>
                        <Link to={`/galoreposts/${concatTitle(wingspanPost.title)}`}>
                            <div className="galore-posts-highlight-container">
                                <img src={wingspanPost.img} alt="penguins" />
                                <div class="galore-posts-img-overlay"></div>
                                <div className="image-text">
                                    <h2>Wingspan, Antartica</h2>
                                    <p style={{ fontSize: '20px' }}>Learn more about the new, icy cool Antarctica edition.</p>
                                </div>
                            </div>
                        </Link>
                    </Col>

                    <Col sm='12' lg='6' xl='4'>
                        <Link to={`/galoreposts/${concatTitle(strategyPost.title)}`}>
                            <div className="galore-posts-highlight-container">
                                <img src={strategyPost.img} alt="board game collection" />
                                <div class="galore-posts-img-overlay"></div>
                                <div className="image-text">
                                    <h2>Secret Strategies</h2>
                                    <p style={{ fontSize: '20px' }}>Beat your friends and never lose with these nuanced strategies for any classic game!</p>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4 style={{ marginTop: '30px' }}>Popular</h4>
                    </Col>
                </Row>
            </Container>

            {galorePostsData.map((post, idx) => (
                <GalorePostPopular post={post} key={idx} />
            ))}


        </>
    )
}

export default GalorePosts;