import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameOfTheWeek = () => {
    const concordia = galorePostsData[0];

    return (
        <Container className='homepage-section galore-purple-bg text-center'>
            <Row>
                <Col>
                    <Link to={`/galoreposts/${concatTitle(concordia.title)}`} className='white-text'>
                        <h3 className='h3-white-text'>Game of the Week: Concordia</h3>
                        <div className='d-flex justify-content-center'>
                            <LazyLoadImage
                                src={concordia.img}
                                alt='A Game of Concordia'
                                width='85%'
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                                placeholderSrc={'https://res.cloudinary.com/da7edv0cg/image/upload/v1708451909/samples/lazyGrayImage_slfgga.png'}
                                effect='blur'
                            />
                        </div>
                        <p>Step into the grandeur of ancient Rome with Concordia, the thrilling strategy board game that will challenge your wit and cunning! Build your empire through colonization, settlement, and recruitment of characters with unique abilities. Outsmart your opponents and amass the most victory points to emerge as the undisputed ruler of Rome! For more info, check it out here.</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default GameOfTheWeek