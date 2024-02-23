import NavbarApp from "../allpages/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { galorePostsData } from "./galorePostsData";
import { useParams } from "react-router-dom";
import { NAVBAR_HEADERS } from "../allpages/navbarHeaders";

const GalorePostTemplate = () => {
    const { title } = useParams();
    const articleJson = galorePostsData.find(data => data.title.replace(/\s/g, "").toLowerCase() === title);

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.galorePosts} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>{articleJson.title}</h1>
                        <h2 className='font-size-1-5'>{articleJson.subTitle}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='font-size-1-2 mb-0'>By {articleJson.author}</p>
                        <p>Posted {articleJson.submissionTime}, {articleJson.date}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <img
                            src={articleJson.img}
                            alt={articleJson.title}
                            className='galore-post-img' />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {articleJson.paragraph && articleJson.paragraph.map((paragraph, idx) => {
                            return paragraph.length < 50 ? (
                                <h4 key={idx}>{paragraph}</h4>
                            ) : (
                                <p key={idx}>{paragraph}</p>
                            )
                        })}
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section-no-border'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/galoreposts`}>Back to Galore Posts</Link>
                    <Link to={`/`}>Back to Home Page</Link>
                </div>
            </Container>
        </>

    )
}

export default GalorePostTemplate;