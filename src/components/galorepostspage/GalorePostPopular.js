import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const GalorePostPopular = ({ post }) => {
    return (
        <Container className='homepage-section'>
            <Link to={`/galoreposts/${concatTitle(post.title)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => window.scrollTo(0, 0)}>
                <Row>
                    <Col className='text-center'>
                        <h1>{post.title}</h1>
                        <p>Posted by {post.author}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <LazyLoadImage
                            src={post.img}
                            alt={post.title}
                            placeholderSrc={'https://res.cloudinary.com/da7edv0cg/image/upload/v1708451909/samples/lazyGrayImage_slfgga.png'}
                            effect='blur'
                            className='galore-post-img' />
                    </Col>
                </Row>

                <Row>
                    <Col className='d-flex justify-content-center'>
                        <h5>{post.paragraph[0]}</h5>
                    </Col>
                </Row>
            </Link>
        </Container>
    )
}

export default GalorePostPopular;



