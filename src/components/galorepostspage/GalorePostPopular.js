import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";

const GalorePostPopular = ({post}) => {
    return (
        <Container className='homepage-section' >
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(post.title)}`}
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
                        <img src={post.img} alt='concordia' style={{ width: '60%', height: 'auto' }} />
                    </Col>
                </Row>
            </Link>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <h5 style={{ width: '60%', margin: '20px' }}>{post.paragraph[0]}</h5>

                </Col>
            </Row>
        </Container>
    )
}

export default GalorePostPopular;


