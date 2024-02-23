import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../../utils/concatTitle";
import LazyLoadImageTemplate from "../allpages/LazyLoadImageTemplate";
import { LAZY_LOAD_TYPE } from "../allpages/LazyLoadImageTemplate";

const GalorePostPopular = ({ post }) => {
    return (
        <Container className='homepage-section'>
            <Link to={`/galoreposts/${concatTitle(post.title)}`}
                className='galore-posts-styles-inherit text-center'
                onClick={() => window.scrollTo(0, 0)}
            >
                <Row>
                    <Col>
                        <h1>{post.title}</h1>
                        <p className='font-size-1-2'>Posted by {post.author}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center'>
                        <LazyLoadImageTemplate
                            src={post.img}
                            alt={post.title}
                            postType={LAZY_LOAD_TYPE.galorePost}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h5>{post.paragraph[0]}</h5>
                    </Col>
                </Row>
            </Link>
        </Container>
    )
}

export default GalorePostPopular;



