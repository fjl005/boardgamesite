import Header from "../allpages/Header";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { galorePostsData } from "./galorePostsData";
import { useParams } from "react-router-dom";

const GalorePostTemplate = () => {
    const { title } = useParams();
    const articleJson = galorePostsData.find((data) => data.title.replace(/\s/g, "").toLowerCase() === title);

    return (
        <>
            <Header />

            <Container className='homepage-section-no-border'>
                <div className='d-flex justify-content-between'>
                    <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts`}>
                        Back to Galore Posts
                    </Link>
                    <Link to={`${window.location.protocol}//${window.location.hostname}:3000/`}>
                        Back to Home Page
                    </Link>
                </div>
            </Container>

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>{articleJson.title}</h1>
                        <h5>{articleJson.subTitle}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>By {articleJson.author}</p>
                        <p>Posted {articleJson.submissionTime}, {articleJson.date}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <img
                            src={articleJson.img}
                            alt={`image for ${articleJson.title}`}
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
                    <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts`}>
                        Back to Galore Posts
                    </Link>
                    <Link to={`${window.location.protocol}//${window.location.hostname}:3000/`}>
                        Back to Home Page
                    </Link>
                </div>


            </Container>
        </>

    )
}

export default GalorePostTemplate;