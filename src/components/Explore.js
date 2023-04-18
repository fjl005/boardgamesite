import { Container, Row, Col } from "reactstrap";
import boardGames from '../img/boardGames.jpg';

const Explore = () => {
    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <h1>Explore</h1>
                </Row>
                <Row>
                    <Col sm='6'>
                        <img src={boardGames} style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
                        <h4>An Amateur's Collection</h4>
                        <p>This is Frank's collection of board games. Not included here is his recent obsession, Ark Nova! But weirdly, included are <i>The Bogleheads Guide to Investing</i> and Korean reading material. It seems like Frank enjoys learning about investments and improving his Korean speaking skills in addition to playing board games with his girlfriend!</p>
                    </Col>

                    <Col sm='6' className='d-flex flex-column justify-content-center'>
                        <ul>
                            <li className='homepage-explore-list-items'>
                                <div className='d-flex align-items-center'>
                                    <img src={boardGames} style={{ width: '15%' }} />
                                    <div className='d-flex flex-column'>
                                        <h5>Top 10 Board Games to Play with Friends and Family This Holiday Season!</h5>
                                        <p>by Steven </p>
                                    </div>
                                </div>
                            </li>

                            <li className='homepage-explore-list-items'>
                                <div className='d-flex align-items-center'>
                                    <img src={boardGames} style={{ width: '15%' }} />
                                    <div className='d-flex flex-column'>
                                        <h5>Unlock the Secrets of Strategy: A Guide to Winning at Classic Board Games</h5>
                                        <p>by Erica </p>
                                    </div>
                                </div>
                            </li>

                            <li className='homepage-explore-list-items'>
                                <div className='d-flex align-items-center'>
                                    <img src={boardGames} style={{ width: '15%' }} />
                                    <div className='d-flex flex-column'>
                                        <h5>New Releases Alert: Get Your Hands on the Latest Board Game Titles Today!</h5>
                                        <p>by Elliot </p>
                                    </div>
                                </div>
                            </li>

                            <li className='homepage-explore-list-items'>
                                <div className='d-flex align-items-center'>
                                    <img src={boardGames} style={{ width: '15%' }} />
                                    <div className='d-flex flex-column'>
                                        <h5>Unleash Your Inner Game Master: Tips and Tricks for Creating Your Own Board Game Masterpiece</h5>
                                        <p>by "Anonymous" </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Explore;