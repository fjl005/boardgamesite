import { Container, Row, Col } from "reactstrap";
import boardGames from '../../img/boardGames.jpg';
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { concatTitle } from "../../utils/concatTitle";
import { Link } from "react-router-dom";


const Explore = () => {
    const exploreListItems = galorePostsData.slice(2);

    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <h1>Explore</h1>
                </Row>
                <Row>
                    <Col sm='12' xl='6' >
                        <img src={boardGames} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                        <h4>An Amateur's Collection</h4>
                        <p>This is Frank's collection of board games. Not included here is his recent obsession, Ark Nova! But weirdly, included are <i>The Bogleheads Guide to Investing</i> and Korean reading material. It seems like Frank enjoys learning about investments and improving his Korean speaking skills in addition to playing board games with his girlfriend!</p>
                    </Col>

                    <Col xl='6' className='d-flex flex-column justify-content-center'>
                        <ul>

                            {exploreListItems.map((item, idx) => (
                                <li className='homepage-explore-list-items' key={idx}>
                                    <div className='d-flex align-items-center'>
                                        <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(item.title)}`}>
                                            <img src={item.img} className='explore-items-img' />
                                        </Link>
                                        <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(item.title)}`}>
                                            <div className='d-flex flex-column'>
                                                <h5>{item.title}</h5>
                                                <p>by {item.author} </p>
                                            </div>
                                        </Link>

                                    </div>
                                </li>
                            )
                            )}

                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Explore;