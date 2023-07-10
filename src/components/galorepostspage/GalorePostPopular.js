import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import lazyGrayImage from '../../img/lazyGrayImage.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GalorePostPopular = ({ post }) => {
    return (
        <Container className='homepage-section' style={{ maxWidth: '1000px' }}>
            <Link to={`/galoreposts/${concatTitle(post.title)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => window.scrollTo(0, 0)}>
                <Row>
                    <Col>
                        <h1 className='text-center'>{post.title}</h1>
                        <p className='text-center'>Posted by {post.author}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <LazyLoadImage
                            src={post.img}
                            alt={post.title}
                            placeholderSrc={lazyGrayImage}
                            effect='blur'
                            className='galore-post-img' />
                    </Col>
                </Row>

                <Row>
                    <Col className='d-flex justify-content-center'>
                        <h5 style={{ width: '60%', margin: '20px' }}>{post.paragraph[0]}</h5>
                    </Col>
                </Row>
            </Link>
        </Container>
    )
}

export default GalorePostPopular;



