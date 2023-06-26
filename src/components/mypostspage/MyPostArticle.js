import Header from "../allpages/Header";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'

const MyPostArticle = () => {
    const { uniqueId } = useParams();
    const [articleData, setArticleData] = useState({});
    const netlifyUrl = 'https://649642c1b48fbc0c7d5849ba--inspiring-profiterole-51c43d.netlify.app';

    const fetchApiData = async () => {
        try {
            // const response = await axios.get(`https://boardgames-api-attempt2.onrender.com/api/${uniqueId}`);
            const response = await axios.get(`http://localhost:5000/api/${uniqueId}`)
            setArticleData(response.data);
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetchApiData();
    }, []);

    return (
        <>
            <Header />

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
                        {console.log('article data: ', articleData)}
                    </Col>
                </Row>

                {articleData.imgUrl != 'https://boardgames-api-attempt2.onrender.com/undefined' ? (
                    <Row>
                        <Col>
                            {articleData.img && (<img
                                src={articleData.img}
                                alt={`image for ${articleData.title}`}
                                className='galore-post-img' />
                            )}
                        </Col>
                    </Row>
                ) : null}


                <Row>
                    <Col>
                        {/* {articleData.paragraph && articleData.paragraph.map((paragraph, idx) => {
                            return paragraph.length < 50 ? (
                                <h4 key={idx}>{paragraph}</h4>
                            ) : (
                                <p key={idx}>{paragraph}</p>
                            )
                        })} */}
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