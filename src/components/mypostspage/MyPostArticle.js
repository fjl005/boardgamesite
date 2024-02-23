import NavbarApp from "../allpages/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosConfig } from "../allpages/axiosConfig";

const MyPostArticle = () => {
    const { uniqueId } = useParams();
    const [articleData, setArticleData] = useState({});

    const fetchApiData = async () => {
        try {
            const response = await axiosConfig.get(`api/${uniqueId}`)
            setArticleData(response.data);
        } catch (error) {
            console.error('Error: ', error);
            alert('Sorry, there was an error loading the individual article for some reason. Please refresh the page and try again. If the problem persists, then please contact Frank!');
        }
    }

    useEffect(() => {
        fetchApiData();
    }, []);

    return (
        <>
            <NavbarApp />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>{articleData.title}</h1>
                        <h5>{articleData.subTitle}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>By {articleData.author}</p>
                        <p>Posted {articleData.submissionTime}, {articleData.date}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {(articleData.img !== 'null' && articleData.img !== undefined) && (<img
                            src={articleData.img}
                            alt={`image for ${articleData.title}`}
                            className='galore-post-img' />
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '16px' }}>
                            {articleData.paragraph}
                        </pre>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section-no-border'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/myposts`}>
                        Back to My Posts
                    </Link>
                    <Link to={`/galoreposts`}>
                        Back to Galore Posts
                    </Link>
                    <Link to={`/`}>
                        Back to Home Page
                    </Link>
                </div>
            </Container>
        </>
    )
}

export default MyPostArticle;