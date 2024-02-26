import NavbarApp from "../allpages/NavbarApp";
import { Container, } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosConfig } from "../allpages/axiosConfig";
import ArticleInfo from "./ArticleInfo";

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
                <ArticleInfo
                    title={articleData.title}
                    subTitle={articleData.subTitle}
                    author={articleData.author}
                    submissionTime={articleData.submissionTime}
                    date={articleData.date}
                    image={articleData.img}
                    paragraph={articleData.paragraph}
                />
            </Container>

            <Container className='homepage-section-no-border'>
                <div className='d-flex justify-content-between'>
                    <Link to={`/myposts`}>Back to My Posts</Link>
                    <Link to={`/galoreposts`}>Back to Galore Posts</Link>
                    <Link to={`/`}>Back to Home Page</Link>
                </div>
            </Container>
        </>
    )
}

export default MyPostArticle;