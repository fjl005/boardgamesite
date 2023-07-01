import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { galorePostsData } from "../galorepostspage/galorePostsData";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lazyGrayImage from '../../img/lazyGrayImage.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GameOfTheWeek = () => {
    const concordia = galorePostsData[0];

    return (
        <Container
            className='homepage-section'
            style={{
                backgroundColor: 'rgb(97, 38, 144)',
                color: 'white',
                marginBottom: '25px'
            }}
        >
            <Row>
                <Col>
                    <Link
                        to={`/galoreposts/${concatTitle(concordia.title)}`}
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                        <h3 className='text-center' style={{ color: 'white' }}>Game of the Week: Concordia</h3>
                        <LazyLoadImage
                            src={concordia.img}
                            alt='A Game of Concordia'
                            width='100%'
                            height='600px'
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            placeholderSrc={lazyGrayImage}
                            effect='blur'
                        />
                        <p style={{ fontSize: '20px' }}>Step into the grandeur of ancient Rome with Concordia, the thrilling strategy board game that will challenge your wit and cunning! Build your empire through colonization, settlement, and recruitment of characters with unique abilities. Outsmart your opponents and amass the most victory points to emerge as the undisputed ruler of Rome! For more info, check it out here.</p>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default GameOfTheWeek