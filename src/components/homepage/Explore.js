import { Container, Row, Col } from "reactstrap";
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { concatTitle } from "../../utils/concatTitle";
import { Link } from "react-router-dom";
import LazyLoadImageTemplate from "../allpages/LazyLoadImageTemplate";
import { LAZY_LOAD_TYPE } from "../allpages/LazyLoadImageTemplate";


const Explore = () => {
    const exploreListItems = galorePostsData.slice(4);

    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Explore</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm='12' md='6'>
                        <LazyLoadImageTemplate
                            src='https://res.cloudinary.com/da7edv0cg/image/upload/v1708451908/samples/boardGames_q9ee5v.jpg'
                            alt="Frank's board game collection"
                            width='100%'
                            height='400px'
                            postType={LAZY_LOAD_TYPE.exploreMain}
                        />

                        <h4>An Amateur's Collection</h4>
                        <p>This is Frank's collection of board games. Not included here is his recent obsession, Ark Nova! But weirdly, included are <i>The Bogleheads Guide to Investing</i> and Korean reading material (if you can see them that is!). It seems like Frank enjoys learning about investments and improving his Korean speaking skills in addition to playing board games with his girlfriend!</p>
                    </Col>

                    <Col sm='12' md='6' className='d-flex flex-column justify-content-center'>
                        <ul>
                            {exploreListItems.map((item, idx) => (
                                <li className='homepage-explore-list-items' key={idx}>
                                    <div className='d-flex align-items-center'>
                                        <Link
                                            to={`/galoreposts/${concatTitle(item.title)}`}
                                        >
                                            <LazyLoadImageTemplate
                                                key={idx}
                                                src={item.img}
                                                alt='Image from Galore Posts'
                                                postType={LAZY_LOAD_TYPE.exploreItemsList}
                                            />
                                        </Link>
                                        <Link
                                            to={`/galoreposts/${concatTitle(item.title)}`}
                                            className='link-no-decor-black'
                                        >
                                            <div className='d-flex flex-column '>
                                                <h5>{item.title}</h5>
                                                <p>by {item.author} </p>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Explore;